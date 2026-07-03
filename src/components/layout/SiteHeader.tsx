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
    { href: withLocalePath(locale, "/#rl-hero"), label: dictionary.common.home },
    { href: withLocalePath(locale, "/#rl-about"), label: dictionary.common.about },
    { href: withLocalePath(locale, "/#rl-services"), label: dictionary.common.services },
    { href: withLocalePath(locale, "/profile"), label: dictionary.common.profile },
    { href: withLocalePath(locale, "/#rl-portfolio"), label: dictionary.common.portfolio },
    { href: withLocalePath(locale, "/articles"), label: dictionary.common.articles },
    { href: withLocalePath(locale, "/#rl-hireme"), label: dictionary.common.hireMe },
  ];

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-30 border-b border-black/10 bg-[color:var(--paper)]/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link href={withLocalePath(locale, "/")} className="tracking-tight text-xl font-semibold">
          frimecraft
        </Link>
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-black/15 bg-white text-lg md:hidden"
          aria-label={dictionary.header.toggleMenu}
          aria-expanded={open}
        >
          {open ? "x" : "|||"}
        </button>
        <div className="hidden items-center gap-4 md:flex">
          <nav className="items-center gap-6 text-sm font-medium md:flex">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-[color:var(--accent)] transition-colors">
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
            className="absolute inset-0 bg-black/35"
          />
          <aside className="absolute right-0 top-0 h-full w-[78%] max-w-sm border-l border-black/10 bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-black/10 px-5 py-4">
              <p className="text-base font-semibold">{dictionary.header.menuTitle}</p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-black/15"
                aria-label={dictionary.header.closeMenu}
              >
                x
              </button>
            </div>
            <nav className="flex flex-col gap-1 px-4 py-4 text-sm font-medium">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 hover:bg-black/5"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="border-t border-black/10 px-4 py-4">
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
