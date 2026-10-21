import { createClient } from "@libsql/client";

export const db = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

export async function ensureSchema() {
  await db.batch([
    `CREATE TABLE IF NOT EXISTS categories (
       id TEXT PRIMARY KEY, name TEXT NOT NULL, parent_id TEXT, sort INTEGER DEFAULT 0)`,
    `CREATE TABLE IF NOT EXISTS products (
       id TEXT PRIMARY KEY, name TEXT NOT NULL, description TEXT,
       price REAL, currency TEXT DEFAULT 'USD', image TEXT,
       category_id TEXT, seller_id TEXT, seller_name TEXT,
       sales INTEGER DEFAULT 0, rating REAL DEFAULT 0, reviews INTEGER DEFAULT 0,
       score REAL DEFAULT 0, featured INTEGER DEFAULT 0, updated_at TEXT)`,
    `CREATE INDEX IF NOT EXISTS idx_products_feat ON products(featured, score DESC)`,
    `CREATE INDEX IF NOT EXISTS idx_products_cat ON products(category_id)`,
  ], "write");
}
