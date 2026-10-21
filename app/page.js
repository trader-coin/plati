import { db, ensureSchema } from "@/lib/db";

export const revalidate = 300;

const money = (v, cur) => new Intl.NumberFormat("en-US", { style: "currency", currency: cur || "USD" }).format(v);

export default async function Home({ searchParams }) {
  await ensureSchema();
  const q = (searchParams.q || "").trim();
  const cat = searchParams.cat || "";
  const sort = searchParams.sort || "popular";
  const limit = Number(process.env.MAX_PRODUCTS || 100);

  const order = { popular: "score DESC", cheap: "price ASC", pricey: "price DESC" }[sort] || "score DESC";
  const where = ["featured = 1"], args = [];
  if (cat) { where.push("category_id = ?"); args.push(cat); }
  if (q) { where.push("name LIKE ?"); args.push(`%${q}%`); }

  const [cats, prods] = await Promise.all([
    db.execute("SELECT id,name FROM categories WHERE id IN (SELECT DISTINCT category_id FROM products WHERE featured=1) ORDER BY sort"),
    db.execute({ sql: `SELECT * FROM products WHERE ${where.join(" AND ")} ORDER BY ${order} LIMIT ${limit}`, args }),
  ]);

  const href = (o) => "/?" + new URLSearchParams({ ...(q && { q }), ...(cat && { cat }), sort, ...o }).toString();

  return (
    <div className="layout">
      <aside className="side">
        <details className="category-panel" open>
          <summary>Categories</summary>
          <nav>
            <a href="/" className={!cat ? "on" : ""}>All</a>
            {cats.rows.map((c) => (
              <a key={c.id} href={`/?cat=${c.id}`} className={cat === c.id ? "on" : ""}>{c.name}</a>
            ))}
          </nav>
        </details>
      </aside>

      <section>
        <div className="tools">
          <span>{prods.rows.length} products</span>
          <div className="sort">
            <a href={href({ sort: "popular" })} className={sort === "popular" ? "on" : ""}>Popular</a>
            <a href={href({ sort: "cheap" })} className={sort === "cheap" ? "on" : ""}>Lowest price</a>
            <a href={href({ sort: "pricey" })} className={sort === "pricey" ? "on" : ""}>Highest price</a>
          </div>
        </div>

        {prods.rows.length === 0 ? (
          <p className="empty">No products found. Run /api/sync to load data, or clear the current filters.</p>
        ) : (
          <div className="grid">
            {prods.rows.map((p) => (
              <a key={p.id} href={`/product/${p.id}`} className="card">
                <div className="img">{p.image ? <img src={p.image} alt="" loading="lazy" /> : null}</div>
                <h3>{p.name}</h3>
                <div className="meta">
                  <strong>{money(p.price, p.currency)}</strong>
                  {p.rating > 0 && <span>★ {Number(p.rating).toFixed(1)}</span>}
                </div>
                <small>{p.seller_name} · {p.sales} sold</small>
              </a>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
