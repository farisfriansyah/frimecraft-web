import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { LOCALE_COOKIE_NAME, LOCALE_HEADER_NAME, normalizeLocale, SUPPORTED_LOCALES } from "@/lib/i18n";

const PUBLIC_FILE = /\.(.*)$/;

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

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (isExcluded(pathname)) {
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);
  const maybeLocale = segments[0]?.toLowerCase();

  if (maybeLocale && (SUPPORTED_LOCALES as readonly string[]).includes(maybeLocale)) {
    const locale = normalizeLocale(maybeLocale);
    const rewriteUrl = request.nextUrl.clone();
    const strippedPath = `/${segments.slice(1).join("/")}`.replace(/\/$/, "") || "/";
    rewriteUrl.pathname = strippedPath === "" ? "/" : strippedPath;

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set(LOCALE_HEADER_NAME, locale);

    const response = NextResponse.rewrite(rewriteUrl, {
      request: { headers: requestHeaders },
    });
    response.cookies.set(LOCALE_COOKIE_NAME, locale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
    return response;
  }

  const cookieLocale = request.cookies.get(LOCALE_COOKIE_NAME)?.value;
  const locale = normalizeLocale(cookieLocale || "id");
  const redirectUrl = request.nextUrl.clone();
  redirectUrl.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  redirectUrl.search = search;
  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};