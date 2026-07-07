import { cookies, headers } from "next/headers";
import type { FrontendSettings } from "@/types/public-api";
import {
  LOCALE_COOKIE_NAME,
  LOCALE_HEADER_NAME,
  normalizeLocale,
  type AppLocale,
} from "./i18n";

export async function getRequestLocale(
  settings?: FrontendSettings | null
): Promise<AppLocale> {
  const requestHeaders = await headers();
  const headerValue = requestHeaders.get(LOCALE_HEADER_NAME);
  if (headerValue) return normalizeLocale(headerValue);

  const store = await cookies();
  const cookieValue = store.get(LOCALE_COOKIE_NAME)?.value;
  return normalizeLocale(cookieValue || settings?.defaultLocale || "id");
}