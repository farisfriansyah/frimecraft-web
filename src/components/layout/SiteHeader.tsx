"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { AppDictionary, AppLocale } from "@/lib/i18n";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";
import { withLocalePath } from "@/lib/i18n";

type SiteHeaderProps = {
  locale: AppLocale;
  dictionary: AppDictionary;
};

export function SiteHeader({ locale, dictionary }: SiteHeaderProps) {
  const [open, setOpen] = useState(false);

  const links = [
    { href: withLocalePath(locale, "/"), label: dictionary.common.home },
    { href: `${withLocalePath(locale, "/")}#rl-about`, label: dictionary.common.about },
    { href: `${withLocalePath(locale, "/")}#rl-services`, label: dictionary.common.services },
    { href: `${withLocalePath(locale, "/")}#rl-profile`, label: dictionary.common.profile },
    { href: withLocalePath(locale, "/portfolios"), label: dictionary.common.portfolio },
    { href: withLocalePath(locale, "/articles"), label: dictionary.common.articles },
    { href: `${withLocalePath(locale, "/")}#rl-hireme`, label: dictionary.common.hireMe },
  ];

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-30 border-b border-[color:var(--line)]/80 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-5 px-5 py-3.5 md:px-6">
        <Link href={withLocalePath(locale, "/")} className="flex shrink-0 items-center gap-2 text-xl font-bold text-[color:var(--ink)]">
          <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[color:var(--accent)] shadow-[0_0_0_4px_rgba(91,92,240,0.12)]" />
          frimecraft
        </Link>
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[color:var(--line)] bg-white text-lg text-[color:var(--ink)] shadow-sm transition hover:border-[color:var(--accent)] md:hidden"
          aria-label={dictionary.header.toggleMenu}
          aria-expanded={open}
        >
          {open ? "×" : "☰"}
        </button>
        <div className="hidden items-center gap-3 md:flex">
          <nav className="flex items-center gap-5 text-[13px] font-medium">
            {links.map((link) => (
              <Link key={`${link.label}-${link.href}`} href={link.href} className="py-2 text-[color:var(--muted)] hover:text-[color:var(--accent-strong)]">
                {link.label}
              </Link>
            ))}
          </nav>
          <LocaleSwitcher
            locale={locale}
            label={dictionary.localeSwitcher.label}
            indonesianLabel={dictionary.localeSwitcher.indonesian}
            englishLabel={dictionary.localeSwitcher.english}
          />
        </div>
      </div>
      {open ? (
        <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true">
          <button
            type="button"
            aria-label="Close menu backdrop"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
          />
          <aside className="absolute right-0 top-0 h-full w-[82%] max-w-sm border-l border-[color:var(--line)] bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-[color:var(--line)] px-5 py-4">
              <p className="text-base font-semibold text-[color:var(--ink)]">{dictionary.header.menuTitle}</p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[color:var(--line)] text-lg text-[color:var(--muted)] hover:bg-[color:var(--fog)]"
                aria-label={dictionary.header.closeMenu}
              >
                ×
              </button>
            </div>
            <nav className="flex flex-col gap-1 px-4 py-4 text-sm font-medium">
              {links.map((link) => (
                <Link
                  key={`${link.label}-${link.href}`}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 text-[color:var(--ink)] hover:bg-[color:var(--accent-soft)] hover:text-[color:var(--accent-strong)]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="border-t border-[color:var(--line)] px-4 py-4">
              <LocaleSwitcher
                locale={locale}
                label={dictionary.localeSwitcher.label}
                indonesianLabel={dictionary.localeSwitcher.indonesian}
                englishLabel={dictionary.localeSwitcher.english}
              />
            </div>
          </aside>
        </div>
      ) : null}
    </header>
  );
}
