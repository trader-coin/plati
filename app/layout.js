import { Manrope } from "next/font/google";
import "./globals.css";

const font = Manrope({ subsets: ["latin", "cyrillic", "vietnamese"] });

export const metadata = { title: "Digital Store", description: "A marketplace for digital products" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={font.className}>
        <header className="top">
          <div className="wrap bar">
            <a href="/" className="brand">Digital<b>Store</b></a>
            <form action="/" className="search" role="search">
              <input name="q" placeholder="Search games, keys, accounts, software…" aria-label="Search" />
              <button>Search</button>
            </form>
          </div>
        </header>
        <main className="wrap">{children}</main>
        <footer className="wrap foot">Payment and delivery are handled by the Plati.Market platform.</footer>
      </body>
    </html>
  );
}
