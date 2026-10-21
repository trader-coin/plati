"use client";

import { useI18n } from "@/components/I18nProvider";

export default function LocalizedSearch() {
  const { t } = useI18n();

  return (
    <form action="/" className="search" role="search">
      <input name="q" placeholder={t("searchPlaceholder")} aria-label={t("search")} />
    </form>
  );
}
