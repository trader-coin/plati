"use client";

import { useEffect, useState } from "react";
import { T } from "@/components/I18nProvider";

function MenuIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
      <path d="M4 6h16M4 12h16M4 18h16" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
    </svg>
  );
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
    <details className="category-panel" open={open} onToggle={(event) => setOpen(event.currentTarget.open)}>
      <summary>
        <span><T id="categories" /></span>
        <button
          type="button"
          className="category-action"
          aria-label="Close categories"
          title="Close categories"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            setOpen(false);
          }}
        >
          <MenuIcon />
        </button>
      </summary>
      <nav>
        <a href="/" className={!activeCategory ? "on" : ""}><T id="all" /></a>
        {categories.map((category) => (
          <a key={category.id} href={`/?cat=${category.id}`} className={activeCategory === category.id ? "on" : ""}>{category.name}</a>
        ))}
      </nav>
    </details>
  );
}
