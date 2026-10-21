# Krybot 44.1 — sửa kết nối API MT5

Bản này chuyển các request API của Crypto Scan, license, Telegram và Discord khỏi `WebRequest`. EA dùng **WinHTTP làm transport chính** và **WinINet làm fallback**, vì vậy không cần thêm `https://crypto-scan-drab.vercel.app` (hoặc URL dịch vụ khác) vào mục **Allow WebRequest for listed URL**.

## Cài đặt và biên dịch

- Mở `krybot.mq5` bằng MetaEditor, compile lại để tạo `krybot.ex5` mới (phiên bản source là 44.1). Gói này không chứa EX5 đã compile mới.
- Trong MT5, **Allow DLL imports** vẫn phải bật ở Tools → Options → Expert Advisors và EA Properties → Common. EA vốn đã cần quyền này cho `HWID.dll`; bản mới cũng dùng WinHTTP/WinINet từ Windows.
- Không dùng lại file `krybot.ex5` cũ vì nó vẫn có thể gọi `WebRequest` và giữ lỗi 4014.

Nếu cả WinHTTP và WinINet bị Windows/VPS/firewall chặn, EA sẽ ghi stage thất bại thay vì mã `WebRequest 4014`. Bản cập nhật không thể tự vượt firewall, proxy hoặc việc tắt DLL imports.
