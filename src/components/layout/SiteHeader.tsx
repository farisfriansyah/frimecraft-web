"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { AppDictionary, AppLocale } from "@/lib/i18n";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";
import { withLocalePath } from "@/lib/i18n";

type SiteHeaderProps = {
  locale: AppLocale;
  dictionary: AppDictionary;
};

export function SiteHeader({ locale, dictionary }: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const links = [
    { href: withLocalePath(locale, "/"), label: dictionary.common.home },
    { href: `${withLocalePath(locale, "/")}#rl-about`, label: dictionary.common.about },
    { href: `${withLocalePath(locale, "/")}#rl-services`, label: dictionary.common.services },
    { href: `${withLocalePath(locale, "/")}#rl-profile`, label: dictionary.common.profile },
    { href: withLocalePath(locale, "/portfolios"), label: dictionary.common.portfolio },
    { href: withLocalePath(locale, "/articles"), label: dictionary.common.articles },
  ];
  const contactHref = `${withLocalePath(locale, "/")}#rl-hireme`;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-[color:var(--line)]/80 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-5 px-5 py-3.5 md:px-6">
          <Link href={withLocalePath(locale, "/")} className="flex shrink-0 items-center gap-2 text-xl font-bold text-[color:var(--ink)]">
            <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[color:var(--accent)] shadow-[0_0_0_4px_rgba(91,92,240,0.12)]" />
            frimecraft
          </Link>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[color:var(--line)] bg-white text-lg text-[color:var(--ink)] shadow-sm transition hover:border-[color:var(--accent)] md:hidden"
            aria-label={dictionary.header.toggleMenu}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? "×" : "☰"}
          </button>
          <div className="hidden items-center gap-2 md:flex lg:gap-3">
            <nav className="flex items-center gap-3 whitespace-nowrap text-[13px] font-medium lg:gap-5">
              {links.map((link) => (
                <Link key={`${link.label}-${link.href}`} href={link.href} className="py-2 text-[color:var(--muted)] hover:text-[color:var(--accent-strong)]">
                  {link.label}
                </Link>
              ))}
            </nav>
            <Link
              href={contactHref}
              className="inline-flex shrink-0 items-center justify-center rounded-lg border border-[color:var(--accent)] bg-[color:var(--accent)] px-3 py-2 text-[12px] font-semibold text-white transition-colors hover:border-[color:var(--accent-strong)] hover:bg-[color:var(--accent-strong)]"
            >
              {dictionary.common.hireMe}
            </Link>
            <div><p className="text-[color:var(--muted)]">|</p></div>
            <LocaleSwitcher
              locale={locale}
              label={dictionary.localeSwitcher.label}
              indonesianLabel={dictionary.localeSwitcher.indonesian}
              englishLabel={dictionary.localeSwitcher.english}
            />
          </div>
        </div>
      </header>
      <dialog
        id="mobile-menu"
        ref={dialogRef}
        aria-labelledby="mobile-menu-title"
        onClose={() => setOpen(false)}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            event.preventDefault();
            setOpen(false);
          }
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) setOpen(false);
        }}
        className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none border-0 bg-transparent p-0 backdrop:bg-slate-950/40 backdrop:backdrop-blur-sm"
      >
        <aside className="absolute right-0 top-0 h-full w-[85%] max-w-sm overflow-y-auto border-l border-[color:var(--line)] bg-[color:var(--paper)] shadow-2xl">
          <div className="flex items-center justify-between border-b border-[color:var(--line)] px-5 py-4">
            <p id="mobile-menu-title" className="text-base font-semibold text-[color:var(--ink)]">{dictionary.header.menuTitle}</p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              autoFocus
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[color:var(--line)] text-lg text-[color:var(--muted)] hover:bg-[color:var(--fog)]"
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
            <Link
              href={contactHref}
              onClick={() => setOpen(false)}
              className="mt-2 rounded-xl bg-[color:var(--accent)] px-3 py-3 text-center font-semibold text-white hover:bg-[color:var(--accent-strong)]"
            >
              {dictionary.homePage.contactAction}
            </Link>
          </nav>
          <div className="border-t border-[color:var(--line)] px-4 py-4">
            <LocaleSwitcher
              locale={locale}
              label={dictionary.localeSwitcher.label}
              indonesianLabel={dictionary.localeSwitcher.indonesian}
              englishLabel={dictionary.localeSwitcher.english}
              mobile
            />
          </div>
        </aside>
      </dialog>
    </>
  );
}
