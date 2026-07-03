import type { MetadataRoute } from "next";
import { getFrontendSettings } from "@/lib/public-api";
import { buildAbsoluteUrl } from "@/lib/seo";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const settings = await getFrontendSettings().catch(() => null);
  const host = buildAbsoluteUrl("/", settings);

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/login", "/api/"],
      },
    ],
    sitemap: `${host}/sitemap.xml`,
    host,
  };
}
