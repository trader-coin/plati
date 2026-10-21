import { notFound } from "next/navigation";
import { db } from "@/lib/db";

export const revalidate = 300;

export default async function Product({ params }) {
  const { rows } = await db.execute({ sql: "SELECT * FROM products WHERE id = ?", args: [params.id] });
  const p = rows[0];
  if (!p) notFound();

  // Kiểm tra tham số affiliate (?ai=) đúng với tài liệu partner của Plati trước khi dùng.
  const buy = `https://plati.market/itm/${p.id}?ai=${process.env.PLATI_PARTNER_ID || ""}`;
  const price = new Intl.NumberFormat("vi-VN", { style: "currency", currency: p.currency || "USD" }).format(p.price);

  return (
    <div className="detail">
      <div className="img big">{p.image ? <img src={p.image} alt="" /> : null}</div>
      <div>
        <a href="/" className="back">← Quay lại danh sách</a>
        <h1>{p.name}</h1>
        <p className="muted">Người bán: {p.seller_name} · đã bán {p.sales} · ★ {Number(p.rating).toFixed(1)} ({p.reviews} đánh giá)</p>
        <div className="buybox">
          <strong className="price">{price}</strong>
          <a className="btn" href={buy} target="_blank" rel="noopener sponsored">Mua trên Plati</a>
        </div>
        {p.description && <p className="desc">{p.description}</p>}
      </div>
    </div>
  );
}
