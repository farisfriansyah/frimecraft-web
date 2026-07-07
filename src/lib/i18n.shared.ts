export const LOCALE_COOKIE_NAME = "frimecraft_locale";
export type FrontendSettings = { /* ... */ };

// helper murni tanpa next/headers, aman dipakai client & server
export function resolveLocale(input?: string) {
  return input === "en" ? "en" : "id";
}