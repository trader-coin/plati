# Plati Store (Next.js + Turso + Vercel)

## Chạy local
    npm i && cp .env.example .env.local   # điền biến môi trường
    npm run dev
    curl -H "Authorization: Bearer $CRON_SECRET" localhost:3000/api/sync   # nạp dữ liệu lần đầu

## Deploy
1. Push lên GitHub.
2. Vercel → Import repo → thêm các biến trong `.env.example`.
3. Cron trong `vercel.json` tự gọi `/api/sync` mỗi 6 giờ.

## Việc cần chỉnh
`lib/plati.js`: tên tham số và tên thẻ XML là giả định. Gọi thử API thật rồi sửa
`normalizeCategory`, `normalizeProduct`, `getProducts`.
