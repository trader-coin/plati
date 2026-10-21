"use client";

import { useState } from "react";
import HeaderControls from "@/components/HeaderControls";
import { T } from "@/components/I18nProvider";

function MenuIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
      <path d="M4 6h16M4 12h16M4 18h16" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
    </svg>
  );
}

export default function MobileNavigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleCategories() {
    document.dispatchEvent(new CustomEvent("toggle-categories"));
  }

  return (
    <div className="mobile-navigation">
      <button type="button" className="mobile-icon-button" onClick={toggleCategories} aria-label="Toggle categories">
        <MenuIcon />
      </button>
      <a href="/" className="mobile-brand">Digital<b>Store</b></a>
      <div className="mobile-menu-wrap">
        <button
          type="button"
          className="mobile-icon-button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Open menu"
          aria-expanded={menuOpen}
        >
          <MenuIcon />
        </button>
        {menuOpen && (
          <div className="mobile-menu" role="menu">
            <div className="mobile-menu-controls">
              <HeaderControls />
            </div>
            <button type="button" className="mobile-login" role="menuitem"><T id="login" /></button>
          </div>
        )}
      </div>
    </div>
  );
}
