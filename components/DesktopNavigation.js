"use client";

import HeaderControls from "@/components/HeaderControls";
import LocalizedSearch from "@/components/LocalizedSearch";

function Icon({ type }) {
  const paths = {
    grid: <><rect x="4" y="4" width="6" height="6" rx="1" /><rect x="14" y="4" width="6" height="6" rx="1" /><rect x="4" y="14" width="6" height="6" rx="1" /><rect x="14" y="14" width="6" height="6" rx="1" /></>,
    chat: <><path d="M5 6.5h14v9H11l-4 3v-3H5z" /><path d="M9 10h6" /></>,
    bag: <><path d="M6 8h12l1 12H5z" /><path d="M9 8a3 3 0 0 1 6 0" /></>,
    heart: <path d="M12 20S4 15.5 4 9.5A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 8 2.5C20 15.5 12 20 12 20Z" />,
    cart: <><path d="M4 6h2l1.5 9h9L19 9H7" /><path d="M10 19.5h.01M17 19.5h.01" /></>,
    game: <><path d="M6 9h12a4 4 0 0 1 3 6l-1 2a2 2 0 0 1-3.5.2L15 15H9l-1.5 2.2A2 2 0 0 1 4 17l-1-2a4 4 0 0 1 3-6Z" /><path d="M8 11v4M6 13h4M16 12h.01M18 14h.01" /></>,
    card: <><rect x="3" y="6" width="18" height="13" rx="2" /><path d="M3 10h18" /></>,
    software: <><rect x="4" y="4" width="16" height="13" rx="2" /><path d="M8 21h8M12 17v4" /></>,
    apple: <><path d="M15.5 5.5c.8-1 .8-2 .8-2s-1.5.1-2.5 1.1c-.8.8-.8 1.8-.8 1.8s1.5.1 2.5-.9Z" /><path d="M17.5 12.5c0-2.4 2-3.5 2-3.5a4.3 4.3 0 0 0-3.4-1.8c-1.4-.1-2.7.8-3.4.8s-1.7-.8-2.8-.8A4.2 4.2 0 0 0 6.4 9.3c-1.5 2.6-.4 6.5 1 8.6.7 1 1.5 2 2.5 2s1.3-.6 2.5-.6 1.5.6 2.5.6 1.7-.9 2.4-1.9c.8-1.1 1.2-2.2 1.2-2.3s-2.5-1-2.5-3.2Z" /></>,
    account: <><circle cx="12" cy="8" r="3" /><path d="M5 20a7 7 0 0 1 14 0" /></>,
    network: <><circle cx="6" cy="12" r="2" /><circle cx="18" cy="6" r="2" /><circle cx="18" cy="18" r="2" /><path d="m8 11 8-4M8 13l8 4" /></>,
    mobile: <><rect x="7" y="3" width="10" height="18" rx="2" /><path d="M10 6h4M11 18h2" /></>,
  };

  return <svg className="desktop-icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8">{paths[type]}</svg>;
}

const actions = [
  ["chat", "Chat"],
  ["bag", "Purchases"],
  ["heart", "Favorites"],
  ["cart", "Cart"],
];

const categories = [
  ["game", "Games"],
  ["card", "Cards"],
  ["software", "Software for PC"],
  ["apple", "iTunes & App Store"],
  ["account", "Gaming accounts"],
  ["network", "Social networks"],
  ["mobile", "Mobile software"],
];

export default function DesktopNavigation() {
  return (
    <div className="desktop-navigation">
      <div className="desktop-utility">
        <div className="desktop-utility-inner wrap">
          <nav className="utility-links" aria-label="Marketplace links">
            <a href="#buyers">Buyers</a>
            <a href="#sellers">Sellers</a>
            <a href="#affiliates">Affiliates</a>
          </nav>
          <div className="desktop-preferences">
            <span>USD</span>
            <span className="utility-dot">•</span>
            <HeaderControls />
          </div>
        </div>
      </div>

      <div className="desktop-main wrap">
        <a href="/" className="desktop-logo" aria-label="Plati home">PLATI</a>
        <a href="/" className="catalog-button"><Icon type="grid" />Catalog</a>
        <LocalizedSearch />
        <div className="desktop-actions">
          {actions.map(([type, label]) => (
            <a key={type} href={`#${type}`} className="desktop-action">
              <Icon type={type} />
              <span>{label}</span>
            </a>
          ))}
        </div>
      </div>

      <nav className="desktop-categories" aria-label="Product categories">
        <div className="desktop-categories-inner wrap">
          {categories.map(([type, label]) => (
            <a key={type} href={`/?category=${encodeURIComponent(label)}`}><Icon type={type} /><span>{label}</span></a>
          ))}
        </div>
      </nav>
    </div>
  );
}
