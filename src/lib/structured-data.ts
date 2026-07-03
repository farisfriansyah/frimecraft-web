import type { FrontendSettings, PublicArticleDetail, PublicPortfolioDetail } from "@/types/public-api";
import { buildAbsoluteUrl, getDefaultAuthorName, getOrganizationName } from "@/lib/seo";

export function buildArticleStructuredData(article: PublicArticleDetail, settings?: FrontendSettings | null) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.seoTitle || article.title,
    description: article.seoDescription || article.excerpt || undefined,
    datePublished: article.createdAt,
    dateModified: article.updatedAt,
    image: article.featuredImage || undefined,
    author: {
      "@type": "Person",
      name: getDefaultAuthorName(settings),
    },
    publisher: {
      "@type": "Organization",
      name: getOrganizationName(settings),
      logo: settings?.organizationLogoUrl || settings?.ogImageUrl || undefined,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": buildAbsoluteUrl(`/articles/${article.slug}`, settings),
    },
    keywords: article.keywords || article.tags || undefined,
    url: buildAbsoluteUrl(`/articles/${article.slug}`, settings),
  };
}

export function buildPortfolioStructuredData(portfolio: PublicPortfolioDetail, slug: string, settings?: FrontendSettings | null) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: portfolio.seoTitle || portfolio.title,
    description: portfolio.seoDescription || portfolio.description || undefined,
    datePublished: portfolio.createdAt,
    dateModified: portfolio.updatedAt,
    image: portfolio.imageUrl || undefined,
    creator: {
      "@type": "Person",
      name: portfolio.authorName || getDefaultAuthorName(settings),
    },
    publisher: {
      "@type": "Organization",
      name: getOrganizationName(settings),
      logo: settings?.organizationLogoUrl || settings?.ogImageUrl || undefined,
    },
    keywords: portfolio.keywords || undefined,
    url: buildAbsoluteUrl(`/portfolios/${portfolio.slug || slug}`, settings),
  };
}