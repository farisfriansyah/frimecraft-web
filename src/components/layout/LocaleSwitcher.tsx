"use client";

import { LOCALE_COOKIE_NAME, type AppLocale } from "@/lib/i18n";

type LocaleSwitcherProps = {
  locale: AppLocale;
  label: string;
  indonesianLabel: string;
  englishLabel: string;
};

export function LocaleSwitcher({ locale, label, indonesianLabel, englishLabel }: LocaleSwitcherProps) {
  const handleChange = (nextLocale: AppLocale) => {
    document.cookie = `${LOCALE_COOKIE_NAME}=${nextLocale}; path=/; max-age=31536000; samesite=lax`;

    const url = new URL(window.location.href);
    url.searchParams.delete("lang");
    const strippedPath = url.pathname.replace(/^\/(?:id|en)(?=\/|$)/, "") || "/";
    const nextPath = `/${nextLocale}${strippedPath === "/" ? "" : strippedPath}`;
    window.location.assign(`${nextPath}${url.search}${url.hash}`);
  };

  return (
    <div className="inline-flex items-center gap-2 border-l border-[color:var(--line)] pl-4 text-xs font-medium">
      <span className="sr-only">{label}</span>
      <button
        type="button"
        onClick={() => handleChange("id")}
        className={`py-1 transition ${locale === "id" ? "font-semibold text-[color:var(--accent-strong)]" : "text-[color:var(--muted)] hover:text-[color:var(--ink)]"}`}
      >
        {indonesianLabel}
      </button>
      <button
        type="button"
        onClick={() => handleChange("en")}
        className={`py-1 transition ${locale === "en" ? "font-semibold text-[color:var(--accent-strong)]" : "text-[color:var(--muted)] hover:text-[color:var(--ink)]"}`}
      >
        {englishLabel}
      </button>
    </div>
  );
}