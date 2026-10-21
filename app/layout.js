import { Manrope } from "next/font/google";
import HeaderControls from "@/components/HeaderControls";
import I18nProvider, { T } from "@/components/I18nProvider";
import LocalizedSearch from "@/components/LocalizedSearch";
import MobileNavigation from "@/components/MobileNavigation";
import "./globals.css";

const font = Manrope({ subsets: ["latin", "cyrillic", "vietnamese"] });

export const metadata = { title: "Digital Store", description: "A marketplace for digital products" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={font.className}>
        <I18nProvider>
          <header className="top">
            <div className="wrap bar">
              <MobileNavigation />
              <a href="/" className="brand">Digital<b>Store</b></a>
              <LocalizedSearch />
              <div className="header-actions">
                <HeaderControls />
                <button type="button" className="login"><T id="login" /></button>
              </div>
            </div>
          </header>
          <main className="wrap">{children}</main>
          <footer className="wrap foot"><T id="footer" /></footer>
        </I18nProvider>
      </body>
    </html>
  );
}
