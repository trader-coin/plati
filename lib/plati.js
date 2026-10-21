import { XMLParser } from "fast-xml-parser";

const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: "" });

async function call(f, params = {}) {
  const url = new URL(process.env.PLATI_API_BASE || "https://plati.market/api/");
  url.searchParams.set("show", "xml");
  url.searchParams.set("f", String(f));
  if (process.env.PLATI_API_KEY) url.searchParams.set("apikey", process.env.PLATI_API_KEY);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, String(v));
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Plati API ${f}: HTTP ${res.status}`);
  return parser.parse(await res.text());
}

const arr = (x) => (x == null ? [] : Array.isArray(x) ? x : [x]);
const pick = (o, ...keys) => { for (const k of keys) if (o?.[k] != null) return o[k]; };

/* ===== ADAPTER =====
 * Tên thẻ/tham số bên dưới là GIẢ ĐỊNH. Gọi thử từng endpoint, xem XML thật
 * rồi sửa các hàm normalize* và tên tham số cho khớp (chỉ cần sửa file này). */
const normalizeCategory = (c) => ({
  id: String(pick(c, "id", "ID", "id_cat")),
  name: String(pick(c, "name", "Name", "name_cat") ?? ""),
  parent: pick(c, "parent", "parent_id", "id_parent"),
});

const normalizeProduct = (p, categoryId) => ({
  id: String(pick(p, "id", "ID", "id_d")),
  name: String(pick(p, "name", "Name", "name_goods") ?? ""),
  price: Number(pick(p, "price", "Price", "price_usd") ?? 0),
  currency: pick(p, "currency", "cur") ?? "USD",
  image: pick(p, "image", "img", "preview") ?? null,
  sellerId: pick(p, "seller_id", "id_seller") ?? null,
  sellerName: pick(p, "seller_name", "seller", "name_seller") ?? null,
  sales: Number(pick(p, "cnt_sell", "sales", "sold") ?? 0),
  rating: Number(pick(p, "rating", "rate") ?? 0),
  reviews: Number(pick(p, "cnt_review", "reviews") ?? 0),
  categoryId,
});

export async function getCategories() {
  const data = await call(1);
  return arr(data?.response?.categories?.category ?? data?.categories?.category).map(normalizeCategory);
}

export async function getProducts(categoryId, page = 1, rows = 100) {
  const data = await call(2, { id_cat: categoryId, page, rows });
  const list = data?.response?.rows?.row ?? data?.products?.product;
  return arr(list).map((p) => normalizeProduct(p, categoryId));
}
