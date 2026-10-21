"use client";

import { useEffect, useState } from "react";
import HeaderControls from "@/components/HeaderControls";
import { T } from "@/components/I18nProvider";

function CloseIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2.2" /></svg>;
}

function SearchIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="10.8" cy="10.8" r="5.8" fill="none" stroke="currentColor" strokeWidth="2" /><path d="m15.2 15.2 4.4 4.4" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" /></svg>;
}

export default function CategoryPanel({ categories, activeCategory }) {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(max-width: 560px)").matches) setOpen(false);
    const toggle = () => setOpen((current) => !current);
    document.addEventListener("toggle-categories", toggle);
    return () => document.removeEventListener("toggle-categories", toggle);
  }, []);

  return (
    <div className="category-drawer">
      <div className="category-drawer-header">
        <button type="button" className="category-drawer-icon category-drawer-close" onClick={() => setOpen(false)} aria-label="Close categories"><CloseIcon /></button>
        <a href="/" className="category-drawer-logo">PLATI<span>▲</span></a>
        <button type="button" className="category-drawer-icon" aria-label="Search"><SearchIcon /></button>
      </div>
      <details className="category-panel" open={open} onToggle={(event) => setOpen(event.currentTarget.open)}>
        <summary><T id="categories" /></summary>
        <ul className="category-list">
          <li><a href="/" className={!activeCategory ? "on" : ""}><T id="all" /></a></li>
          {categories.map((category) => (
            <li key={category.id}><a href={`/?cat=${category.id}`} className={activeCategory === category.id ? "on" : ""}>{category.name}</a></li>
          ))}
        </ul>
      </details>
      <div className="category-drawer-preferences">
        <span className="category-currency">USD <i>•</i> <span>English</span></span>
        <HeaderControls />
      </div>
    </div>
  );
}
