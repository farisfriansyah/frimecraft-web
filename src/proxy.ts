import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { LOCALE_COOKIE_NAME, LOCALE_HEADER_NAME, normalizeLocale, SUPPORTED_LOCALES } from "@/lib/i18n";

const PUBLIC_FILE = /\.(.*)$/;
const LEGACY_PATH_ALIASES: Array<{ from: RegExp; to: string }> = [
  { from: /^\/portfolio(\/.*)?$/i, to: "/portfolios" },
  { from: /^\/article(\/.*)?$/i, to: "/articles" },
];

function isExcluded(pathname: string) {
  return (
    pathname.startsWith("/frime-admin") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname === "/manifest.webmanifest" ||
    pathname === "/favicon.ico" ||
    PUBLIC_FILE.test(pathname)
  );
}

function resolveLegacyAlias(pathname: string) {
  for (const alias of LEGACY_PATH_ALIASES) {
    const match = pathname.match(alias.from);
    if (!match) continue;

    const suffix = match[1] || "";
    return `${alias.to}${suffix}`;
  }

  return pathname;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isExcluded(pathname)) {
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);
  const maybeLocale = segments[0]?.toLowerCase();
  const urlLang = request.nextUrl.searchParams.get("lang");

  const localeFromPath = maybeLocale && (SUPPORTED_LOCALES as readonly string[]).includes(maybeLocale)
    ? normalizeLocale(maybeLocale)
    : null;

  const cookieLocale = request.cookies.get(LOCALE_COOKIE_NAME)?.value;
  const resolvedLocale = normalizeLocale(urlLang || localeFromPath || cookieLocale || "id");

  const rawPath = localeFromPath
    ? `/${segments.slice(1).join("/")}`.replace(/\/$/, "") || "/"
    : pathname;
  const aliasedPath = resolveLegacyAlias(rawPath);

  if (!localeFromPath || urlLang) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = `/${resolvedLocale}${aliasedPath === "/" ? "" : aliasedPath}`;
    redirectUrl.searchParams.delete("lang");
    const response = NextResponse.redirect(redirectUrl, 308);
    response.cookies.set(LOCALE_COOKIE_NAME, resolvedLocale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
    return response;
  }

  if (aliasedPath !== rawPath) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = `/${localeFromPath}${aliasedPath === "/" ? "" : aliasedPath}`;
    const response = NextResponse.redirect(redirectUrl, 308);
    response.cookies.set(LOCALE_COOKIE_NAME, localeFromPath, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
    return response;
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(LOCALE_HEADER_NAME, localeFromPath);

  const rewriteUrl = request.nextUrl.clone();
  rewriteUrl.pathname = rawPath;

  const response = NextResponse.rewrite(rewriteUrl, {
    request: { headers: requestHeaders },
  });
  response.cookies.set(LOCALE_COOKIE_NAME, localeFromPath, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
