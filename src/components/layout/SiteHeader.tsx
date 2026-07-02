"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { href: "/#rl-hero", label: "Home" },
  { href: "/#rl-about", label: "About" },
  { href: "/#rl-services", label: "Services" },
  { href: "/profile", label: "Profile" },
  { href: "/#rl-portfolio", label: "Portfolio" },
  { href: "/articles", label: "Articles" },
  { href: "/#rl-hireme", label: "Hire Me" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-30 border-b border-black/10 bg-[color:var(--paper)]/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="tracking-tight text-xl font-semibold">
          frimecraft
        </Link>
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-black/15 bg-white text-lg md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? "x" : "|||"}
        </button>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-[color:var(--accent)] transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>
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
              <p className="text-base font-semibold">Frimenu</p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-black/15"
                aria-label="Close menu"
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
          </aside>
        </div>
      ) : null}
    </header>
  );
}
