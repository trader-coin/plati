import { notFound } from "next/navigation";
import { db } from "@/lib/db";

export const revalidate = 300;

export default async function Product({ params }) {
  const { rows } = await db.execute({ sql: "SELECT * FROM products WHERE id = ?", args: [params.id] });
  const p = rows[0];
  if (!p) notFound();

  // Verify the affiliate parameter (?ai=) against Plati's partner documentation before use.
  const buy = `https://plati.market/itm/${p.id}?ai=${process.env.PLATI_PARTNER_ID || ""}`;
  const price = new Intl.NumberFormat("en-US", { style: "currency", currency: p.currency || "USD" }).format(p.price);

  return (
    <div className="detail">
      <div className="img big">{p.image ? <img src={p.image} alt="" /> : null}</div>
      <div>
        <a href="/" className="back">← Back to catalog</a>
        <h1>{p.name}</h1>
        <p className="muted">Seller: {p.seller_name} · {p.sales} sold · ★ {Number(p.rating).toFixed(1)} ({p.reviews} reviews)</p>
        <div className="buybox">
          <strong className="price">{price}</strong>
          <a className="btn" href={buy} target="_blank" rel="noopener sponsored">Buy on Plati</a>
        </div>
        {p.description && <p className="desc">{p.description}</p>}
      </div>
    </div>
  );
}
