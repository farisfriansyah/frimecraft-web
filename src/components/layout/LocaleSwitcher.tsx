"use client";

import { LOCALE_COOKIE_NAME, type AppLocale } from "@/lib/i18n";

type LocaleSwitcherProps = {
  locale: AppLocale;
  label: string;
  indonesianLabel: string;
  englishLabel: string;
  mobile?: boolean;
};

export function LocaleSwitcher({ locale, label, indonesianLabel, englishLabel, mobile = false }: LocaleSwitcherProps) {
  const handleChange = (nextLocale: AppLocale) => {
    document.cookie = `${LOCALE_COOKIE_NAME}=${nextLocale}; path=/; max-age=31536000; samesite=lax`;

    const url = new URL(window.location.href);
    url.searchParams.delete("lang");
    const strippedPath = url.pathname.replace(/^\/(?:id|en)(?=\/|$)/, "") || "/";
    const nextPath = `/${nextLocale}${strippedPath === "/" ? "" : strippedPath}`;
    window.location.assign(`${nextPath}${url.search}${url.hash}`);
  };

  const buttonClass = `${mobile ? "min-h-11 flex-1 px-3" : "min-h-8 px-2"} rounded-lg whitespace-nowrap transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)]`;

  return (
    <div className={`flex flex-row items-center gap-1 font-medium ${mobile ? "w-full text-sm" : "text-xs"}`}>
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[color:var(--muted)]">
        <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
        </svg>
        {label}
      </span>
      <div role="group" aria-label={label} className={`inline-flex rounded-xl border border-[color:var(--line)] bg-[color:var(--fog)] p-0.5 ${mobile ? "w-full" : ""}`}>
        <button
          type="button"
          onClick={() => handleChange("id")}
          aria-pressed={locale === "id"}
          className={`${buttonClass} ${locale === "id" ? "bg-[color:var(--accent)] font-semibold text-white" : "text-[color:var(--muted)] hover:bg-white hover:text-[color:var(--ink)]"}`}
        >
          {indonesianLabel}
        </button>
        <button
          type="button"
          onClick={() => handleChange("en")}
          aria-pressed={locale === "en"}
          className={`${buttonClass} ${locale === "en" ? "bg-[color:var(--accent)] font-semibold text-white" : "text-[color:var(--muted)] hover:bg-white hover:text-[color:var(--ink)]"}`}
        >
          {englishLabel}
        </button>
      </div>
    </div>
  );
}