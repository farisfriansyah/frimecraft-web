"use client";

import type { AppLocale } from "@/lib/i18n";

type LocaleSwitcherProps = {
  locale: AppLocale;
  label: string;
  indonesianLabel: string;
  englishLabel: string;
  mobile?: boolean;
};

export function LocaleSwitcher({ locale, label, indonesianLabel, englishLabel, mobile = false }: LocaleSwitcherProps) {
  const handleChange = (nextLocale: AppLocale) => {
    const url = new URL(window.location.href);
    url.searchParams.delete("lang");
    const strippedPath = url.pathname.replace(/^\/(?:id|en)(?=\/|$)/, "") || "/";
    const nextPath = `/${nextLocale}${strippedPath === "/" ? "" : strippedPath}`;
    window.location.assign(`${nextPath}${url.search}${url.hash}`);
  };

  const globeIcon = (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
    </svg>
  );
  const options = [
    { value: "id" as const, label: indonesianLabel },
    { value: "en" as const, label: englishLabel },
  ];

  const buttons = (compact: boolean) => (
    <div role="group" aria-label={label} className={`inline-flex rounded-lg border border-[color:var(--line)] bg-[color:var(--fog)] p-0.5 ${compact ? "" : "w-full"}`}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => handleChange(option.value)}
          aria-pressed={locale === option.value}
          className={`min-h-9 ${compact ? "px-2.5 text-xs" : "flex-1 px-3 text-sm"} rounded-md whitespace-nowrap transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)] ${
            locale === option.value
              ? "bg-[color:var(--accent)] font-semibold text-white"
              : "text-[color:var(--muted)] hover:bg-white hover:text-[color:var(--ink)]"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );

  if (mobile) {
    return (
      <div className="flex w-full items-center justify-between gap-3 font-medium">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[color:var(--muted)]">
          {globeIcon}
          {label}
        </span>
        {buttons(false)}
      </div>
    );
  }

  const activeLabel = options.find((option) => option.value === locale)?.label;

  return (
    <details className="group relative">
      <summary
        aria-label={`${label}: ${activeLabel}`}
        title={`${label}: ${activeLabel}`}
        className="flex h-9 w-9 cursor-pointer list-none items-center justify-center rounded-lg border border-[color:var(--line)] bg-white text-[color:var(--muted)] transition hover:border-[color:var(--accent)] hover:bg-[color:var(--accent-soft)] hover:text-[color:var(--accent-strong)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)] [&::-webkit-details-marker]:hidden"
      >
        {globeIcon}
      </summary>
      <div className="absolute right-0 top-full z-50 mt-2 min-w-36 rounded-xl border border-[color:var(--line)] bg-white p-1.5 shadow-lg">
        {buttons(true)}
      </div>
    </details>
  );
}
