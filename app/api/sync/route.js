import { db, ensureSchema } from "@/lib/db";
import { getCategories, getProducts } from "@/lib/plati";

export const maxDuration = 60;

export async function GET(req) {
  if (req.headers.get("authorization") !== `Bearer ${process.env.CRON_SECRET}`)
    return new Response("Unauthorized", { status: 401 });

  await ensureSchema();
  const max = Number(process.env.MAX_PRODUCTS || 100);
  const catIds = (process.env.CATEGORY_IDS || "").split(",").filter(Boolean);
  const now = new Date().toISOString();

  const cats = await getCategories();
  if (cats.length) {
    await db.batch(
      cats.map((c, i) => ({
        sql: "INSERT INTO categories(id,name,parent_id,sort) VALUES(?,?,?,?) ON CONFLICT(id) DO UPDATE SET name=excluded.name, parent_id=excluded.parent_id",
        args: [c.id, c.name, c.parent ?? null, i],
      })),
      "write"
    );
  }

  const all = [];
  for (const id of catIds) all.push(...(await getProducts(id)));

  // Rank by sales and ratings. Mark only the top N items to match Digiseller's limit.
  const scored = all
    .map((p) => ({ ...p, score: p.sales + p.rating * 10 + Math.log1p(p.reviews) * 5 }))
    .sort((a, b) => b.score - a.score);
  const top = new Set(scored.slice(0, max).map((p) => p.id));

  await db.execute("UPDATE products SET featured = 0");
  const BATCH = 50;
  for (let i = 0; i < scored.length; i += BATCH) {
    await db.batch(
      scored.slice(i, i + BATCH).map((p) => ({
        sql: `INSERT INTO products(id,name,price,currency,image,category_id,seller_id,seller_name,sales,rating,reviews,score,featured,updated_at)
              VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)
              ON CONFLICT(id) DO UPDATE SET name=excluded.name, price=excluded.price, image=excluded.image,
                sales=excluded.sales, rating=excluded.rating, reviews=excluded.reviews,
                score=excluded.score, featured=excluded.featured, updated_at=excluded.updated_at`,
        args: [p.id, p.name, p.price, p.currency, p.image, p.categoryId, p.sellerId, p.sellerName,
               p.sales, p.rating, p.reviews, p.score, top.has(p.id) ? 1 : 0, now],
      })),
      "write"
    );
  }
  return Response.json({ categories: cats.length, fetched: all.length, featured: top.size });
}
