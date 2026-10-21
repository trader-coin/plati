"use client";

import { useEffect, useState } from "react";
import { T } from "@/components/I18nProvider";

export default function CategoryPanel({ categories, activeCategory }) {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const toggle = () => setOpen((current) => !current);
    document.addEventListener("toggle-categories", toggle);
    return () => document.removeEventListener("toggle-categories", toggle);
  }, []);

  return (
    <details className="category-panel" open={open} onToggle={(event) => setOpen(event.currentTarget.open)}>
      <summary><T id="categories" /></summary>
      <nav>
        <a href="/" className={!activeCategory ? "on" : ""}><T id="all" /></a>
        {categories.map((category) => (
          <a key={category.id} href={`/?cat=${category.id}`} className={activeCategory === category.id ? "on" : ""}>{category.name}</a>
        ))}
      </nav>
    </details>
  );
}
