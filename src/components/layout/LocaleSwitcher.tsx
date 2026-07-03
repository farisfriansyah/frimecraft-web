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
    window.location.reload();
  };

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs font-medium">
      <span className="text-black/55">{label}</span>
      <button
        type="button"
        onClick={() => handleChange("id")}
        className={`rounded-full px-2 py-1 transition ${locale === "id" ? "bg-black text-white" : "text-black/65 hover:bg-black/5"}`}
      >
        {indonesianLabel}
      </button>
      <button
        type="button"
        onClick={() => handleChange("en")}
        className={`rounded-full px-2 py-1 transition ${locale === "en" ? "bg-black text-white" : "text-black/65 hover:bg-black/5"}`}
      >
        {englishLabel}
      </button>
    </div>
  );
}