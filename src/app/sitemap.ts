import type { MetadataRoute } from "next";
import {
  getAllPublicArticlesForSitemap,
  getAllPublicPortfoliosForSitemap,
  getFrontendSettings,
} from "@/lib/public-api";
import { buildAbsoluteUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const settings = await getFrontendSettings().catch(() => null);
  const [articles, portfolios] = await Promise.all([
    getAllPublicArticlesForSitemap().catch(() => []),
    getAllPublicPortfoliosForSitemap().catch(() => []),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: buildAbsoluteUrl("/", settings),
      lastModified: settings?.updatedAt || new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: buildAbsoluteUrl("/profile", settings),
      lastModified: settings?.updatedAt || new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: buildAbsoluteUrl("/articles", settings),
      lastModified: articles[0]?.updatedAt || settings?.updatedAt || new Date().toISOString(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: buildAbsoluteUrl("/portfolios", settings),
      lastModified: portfolios[0]?.updatedAt || settings?.updatedAt || new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: buildAbsoluteUrl(`/articles/${article.slug}`, settings),
    lastModified: article.updatedAt,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const portfolioRoutes: MetadataRoute.Sitemap = portfolios
    .filter((portfolio) => Boolean(portfolio.slug))
    .map((portfolio) => ({
      url: buildAbsoluteUrl(`/portfolios/${portfolio.slug}`, settings),
      lastModified: portfolio.updatedAt,
      changeFrequency: "monthly",
      priority: portfolio.featured ? 0.85 : 0.65,
    }));

  return [...staticRoutes, ...articleRoutes, ...portfolioRoutes];
}
