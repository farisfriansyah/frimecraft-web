import type {
  FrontendSettings,
  Pagination,
  PublicArticleDetail,
  PublicArticleListItem,
  PublicProfileSummary,
  PublicPortfolioDetail,
  PublicPortfolio,
} from "@/types/public-api";

const DEFAULT_PUBLIC_API_BASE = "http://localhost:3000/api/public";

export function getPublicApiBaseUrl() {
  return (process.env.FRIMECRAFT_ADMIN_PUBLIC_API_BASE || DEFAULT_PUBLIC_API_BASE).replace(/\/$/, "");
}

function normalizeImageUrl(value: string | null): string | null {
  if (!value) return null;
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  return `${getPublicApiBaseUrl().replace(/\/api\/public$/, "")}${value.startsWith("/") ? value : `/${value}`}`;
}

async function requestJson<T>(path: string, revalidateSeconds = 120): Promise<T> {
  const response = await fetch(`${getPublicApiBaseUrl()}${path}`, {
    next: { revalidate: revalidateSeconds },
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Public API request failed: ${response.status} ${response.statusText}`);
  }

  const payload = (await response.json()) as { data?: T };
  if (!payload || payload.data === undefined) {
    throw new Error("Public API response has invalid shape");
  }

  return payload.data;
}

export async function getFrontendSettings(): Promise<FrontendSettings | null> {
  const data = await requestJson<FrontendSettings | null>("/frontend-settings", 90);
  return data;
}

export async function getPublicArticles(page = 1, pageSize = 9): Promise<{
  items: PublicArticleListItem[];
  pagination: Pagination;
}> {
  return getPublicArticlesWithFilters({ page, pageSize });
}

export async function getPublicArticlesWithFilters(options?: {
  page?: number;
  pageSize?: number;
  q?: string;
  tag?: string;
  locale?: "id" | "en";
}): Promise<{
  items: PublicArticleListItem[];
  pagination: Pagination;
}> {
  const page = options?.page || 1;
  const pageSize = options?.pageSize || 9;
  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
  });

  if (options?.q) params.set("q", options.q);
  if (options?.tag) params.set("tag", options.tag);
  if (options?.locale) params.set("lang", options.locale);

  const response = await fetch(
    `${getPublicApiBaseUrl()}/articles?${params.toString()}`,
    {
      next: { revalidate: 90 },
      headers: { Accept: "application/json" },
    },
  );

  if (!response.ok) {
    throw new Error(`Public API articles request failed: ${response.status}`);
  }

  const payload = (await response.json()) as {
    data?: PublicArticleListItem[];
    pagination?: Pagination;
  };

  if (!payload.data || !payload.pagination) {
    throw new Error("Public API articles response has invalid shape");
  }

  return {
    items: payload.data.map((item) => ({
      ...item,
      featuredImage: normalizeImageUrl(item.featuredImage),
    })),
    pagination: payload.pagination,
  };
}

export async function getPublicArticleBySlug(slug: string, locale?: "id" | "en"): Promise<PublicArticleDetail> {
  const query = locale ? `?lang=${locale}` : "";
  const data = await requestJson<PublicArticleDetail>(`/articles/${slug}${query}`, 60);
  return {
    ...data,
    featuredImage: normalizeImageUrl(data.featuredImage),
  };
}

export async function getPublicPortfolios(featuredOnly = true, page = 1, pageSize = 6): Promise<{
  items: PublicPortfolio[];
  pagination: Pagination;
}> {
  return getPublicPortfoliosWithFilters({ featuredOnly, page, pageSize });
}

export async function getPublicPortfoliosWithFilters(options?: {
  featuredOnly?: boolean;
  page?: number;
  pageSize?: number;
  q?: string;
  tag?: string;
  locale?: "id" | "en";
}): Promise<{
  items: PublicPortfolio[];
  pagination: Pagination;
}> {
  const featuredOnly = options?.featuredOnly ?? true;
  const page = options?.page || 1;
  const pageSize = options?.pageSize || 6;
  const params = new URLSearchParams({
    featured: String(featuredOnly),
    page: String(page),
    pageSize: String(pageSize),
  });

  if (options?.q) params.set("q", options.q);
  if (options?.tag) params.set("tag", options.tag);
  if (options?.locale) params.set("lang", options.locale);

  const response = await fetch(
    `${getPublicApiBaseUrl()}/portfolios?${params.toString()}`,
    {
      next: { revalidate: 120 },
      headers: { Accept: "application/json" },
    },
  );

  if (!response.ok) {
    throw new Error(`Public API portfolios request failed: ${response.status}`);
  }

  const payload = (await response.json()) as {
    data?: PublicPortfolio[];
    pagination?: Pagination;
  };

  if (!payload.data || !payload.pagination) {
    throw new Error("Public API portfolios response has invalid shape");
  }

  return {
    items: payload.data.map((item) => ({
      ...item,
      imageUrl: normalizeImageUrl(item.imageUrl),
    })),
    pagination: payload.pagination,
  };
}

export async function getPublicProfileSummary(locale?: "id" | "en"): Promise<PublicProfileSummary> {
  const query = locale ? `?lang=${locale}` : "";
  return requestJson<PublicProfileSummary>(`/profile-summary${query}`, 120);
}

export async function getPublicPortfolioBySlug(slug: string, locale?: "id" | "en"): Promise<PublicPortfolioDetail> {
  const query = locale ? `?lang=${locale}` : "";
  const data = await requestJson<PublicPortfolioDetail>(`/portfolios/${slug}${query}`, 120);
  return {
    ...data,
    imageUrl: normalizeImageUrl(data.imageUrl),
  };
}

export async function getAllPublicArticlesForSitemap(): Promise<PublicArticleListItem[]> {
  const items: PublicArticleListItem[] = [];
  let page = 1;
  let totalPages = 1;

  do {
    const result = await getPublicArticles(page, 30);
    items.push(...result.items);
    totalPages = result.pagination.totalPages;
    page += 1;
  } while (page <= totalPages);

  return items;
}

export async function getAllPublicPortfoliosForSitemap(): Promise<PublicPortfolio[]> {
  const items: PublicPortfolio[] = [];
  let page = 1;
  let totalPages = 1;

  do {
    const result = await getPublicPortfolios(false, page, 30);
    items.push(...result.items);
    totalPages = result.pagination.totalPages;
    page += 1;
  } while (page <= totalPages);

  return items;
}
