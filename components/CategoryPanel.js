"use client";

import { useEffect, useState } from "react";
import { T } from "@/components/I18nProvider";

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
      <summary><T id="categories" /></summary>
      <ul className="category-list">
        <li><a href="/" className={!activeCategory ? "on" : ""}><T id="all" /></a></li>
        {categories.map((category) => (
          <li key={category.id}><a href={`/?cat=${category.id}`} className={activeCategory === category.id ? "on" : ""}>{category.name}</a></li>
        ))}
      </ul>
    </details>
  );
}
