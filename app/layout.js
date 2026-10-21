import { Manrope } from "next/font/google";
import "./globals.css";

const font = Manrope({ subsets: ["latin", "cyrillic", "vietnamese"] });

export const metadata = { title: "Digital Store", description: "Cửa hàng sản phẩm số" };

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body className={font.className}>
        <header className="top">
          <div className="wrap bar">
            <a href="/" className="brand">Digital<b>Store</b></a>
            <form action="/" className="search" role="search">
              <input name="q" placeholder="Tìm game, key, tài khoản, phần mềm…" aria-label="Tìm kiếm" />
              <button>Tìm</button>
            </form>
          </div>
        </header>
        <main className="wrap">{children}</main>
        <footer className="wrap foot">Thanh toán và giao hàng được xử lý bởi nền tảng Plati.Market.</footer>
      </body>
    </html>
  );
}
