import type { Metadata } from "next";
import type { FrontendSettings } from "@/types/public-api";

type SeoInput = {
  settings?: FrontendSettings | null;
  path?: string;
  title?: string | null;
  description?: string | null;
  keywords?: string | string[] | null;
  image?: string | null;
  siteName?: string | null;
  type?: "website" | "article" | "profile";
  noIndex?: boolean;
};

type DetailOpenGraphInput = {
  settings?: FrontendSettings | null;
  path: string;
  title: string;
  description?: string | null;
  image?: string | null;
  type?: "website" | "article" | "profile";
  publishedTime?: string;
  modifiedTime?: string;
};

function normalizeBaseUrl(settings?: FrontendSettings | null) {
  const value = settings?.canonicalUrl?.trim() || "https://frimecraft.com";
  return value.replace(/\/$/, "");
}

export function buildAbsoluteUrl(path = "/", settings?: FrontendSettings | null) {
  const baseUrl = normalizeBaseUrl(settings);
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return path === "/" ? baseUrl : `${baseUrl}${normalizedPath}`;
}

function normalizeKeywords(keywords?: string | string[] | null) {
  if (!keywords) return undefined;
  if (Array.isArray(keywords)) {
    return keywords.map((item) => item.trim()).filter(Boolean);
  }

  return keywords
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function getDefaultAuthorName(settings?: FrontendSettings | null) {
  return settings?.defaultAuthorName || settings?.organizationName || settings?.siteTitle || "Frimecraft";
}

export function getOrganizationName(settings?: FrontendSettings | null) {
  return settings?.organizationName || settings?.siteTitle || "Frimecraft";
}

export function getSocialProfileUrls(settings?: FrontendSettings | null) {
  if (!settings?.socialProfileUrls) return [];

  return settings.socialProfileUrls
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function getLocale(settings?: FrontendSettings | null) {
  return settings?.defaultLocale || "id_ID";
}

function normalizeTwitterHandle(value?: string | null) {
  if (!value) return undefined;
  return value.startsWith("@") ? value : `@${value}`;
}

export function buildDetailOpenGraph({
  settings,
  path,
  title,
  description,
  image,
  type = "website",
  publishedTime,
  modifiedTime,
}: DetailOpenGraphInput) {
  const resolvedImage = image || settings?.ogImageUrl || null;

  return {
    type,
    url: buildAbsoluteUrl(path, settings),
    locale: getLocale(settings),
    siteName: settings?.siteTitle || "Frimecraft",
    title,
    description: description || undefined,
    images: resolvedImage
      ? [
          {
            url: resolvedImage,
            alt: settings?.ogImageAlt || title,
          },
        ]
      : undefined,
    publishedTime,
    modifiedTime,
  };
}

export function buildSeoMetadata({
  settings,
  path = "/",
  title,
  description,
  keywords,
  image,
  siteName,
  type = "website",
  noIndex = false,
}: SeoInput): Metadata {
  const resolvedSiteName = siteName || settings?.siteTitle || "Frimecraft";
  const resolvedTitle = title || settings?.seoTitle || resolvedSiteName;
  const resolvedDescription =
    description || settings?.seoDescription || settings?.siteDescription || "Frimecraft digital profile and journal.";
  const resolvedKeywords = normalizeKeywords(keywords || settings?.seoKeywords);
  const canonical = buildAbsoluteUrl(path, settings);
  const resolvedImage = image || settings?.ogImageUrl || null;
  const resolvedAuthorName = getDefaultAuthorName(settings);
  const resolvedOrganizationName = getOrganizationName(settings);
  const resolvedLocale = getLocale(settings);
  const resolvedTwitterHandle = normalizeTwitterHandle(settings?.twitterHandle);

  return {
    title: resolvedTitle,
    applicationName: resolvedOrganizationName,
    description: resolvedDescription,
    keywords: resolvedKeywords,
    authors: [{ name: resolvedAuthorName, url: canonical }],
    creator: resolvedAuthorName,
    publisher: resolvedOrganizationName,
    alternates: {
      canonical,
    },
    verification: {
      google: settings?.googleSiteVerification || undefined,
      other: settings?.bingSiteVerification
        ? {
            "msvalidate.01": settings.bingSiteVerification,
          }
        : undefined,
    },
    themeColor: settings?.themeColor || undefined,
    robots: {
      index: !noIndex,
      follow: true,
      googleBot: {
        index: !noIndex,
        follow: true,
      },
    },
    openGraph: {
      type,
      url: canonical,
      locale: resolvedLocale,
      siteName: resolvedSiteName,
      title: resolvedTitle,
      description: resolvedDescription,
      images: resolvedImage
        ? [
            {
              url: resolvedImage,
              alt: settings?.ogImageAlt || resolvedTitle,
            },
          ]
        : undefined,
    },
    twitter: {
      card: resolvedImage ? "summary_large_image" : "summary",
      site: resolvedTwitterHandle,
      creator: resolvedTwitterHandle,
      title: resolvedTitle,
      description: resolvedDescription,
      images: resolvedImage ? [resolvedImage] : undefined,
    },
  };
}