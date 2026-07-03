import type { MetadataRoute } from "next";
import { getFrontendSettings } from "@/lib/public-api";
import { buildAbsoluteUrl } from "@/lib/seo";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const settings = await getFrontendSettings().catch(() => null);
  const name = settings?.siteTitle || "Frimecraft";
  const description =
    settings?.seoDescription ||
    settings?.siteDescription ||
    "Frimecraft digital profile, portfolio showcase, and journal.";
  const themeColor = settings?.themeColor || "#2f55d4";
  const startUrl = buildAbsoluteUrl("/", settings);

  return {
    id: startUrl,
    name,
    short_name: name,
    description,
    start_url: startUrl,
    scope: buildAbsoluteUrl("/", settings),
    display: "standalone",
    background_color: "#f2f4f6",
    theme_color: themeColor,
    orientation: "portrait",
    lang: settings?.defaultLocale?.startsWith("id") ? "id" : "en",
    categories: ["portfolio", "business", "design", "productivity"],
    icons: [
      {
        src: "/favicon.ico",
        sizes: "16x16 32x32 48x48",
        type: "image/x-icon",
      },
      {
        src: "/assets/img/main/hero.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
    shortcuts: [
      {
        name: "Profile",
        short_name: "Profile",
        description: "Open the public profile page",
        url: "/profile",
      },
      {
        name: "Articles",
        short_name: "Articles",
        description: "Browse published articles",
        url: "/articles",
      },
      {
        name: "Portfolios",
        short_name: "Portfolios",
        description: "Browse project portfolios",
        url: "/portfolios",
      },
    ],
  };
}
