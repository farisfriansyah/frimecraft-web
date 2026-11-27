import type { Pagination, PublicPortfolio } from "@/types/public-api";
import { deduplicatePortfolios } from "@/lib/portfolio-dedupe";

type PortfoliosPayload = {
  success?: boolean;
  data?: PublicPortfolio[];
  pagination?: Pagination;
};

export async function fetchPortfolios(
  filters: { q: string; tag: string; featured: boolean; page: number; locale: "id" | "en" },
  signal: AbortSignal,
) {
  const params = new URLSearchParams({
    featured: String(filters.featured),
    page: String(filters.page),
    pageSize: "12",
    lang: filters.locale,
  });
  if (filters.q.trim()) params.set("q", filters.q.trim());
  if (filters.tag.trim()) params.set("tag", filters.tag.trim());

  const response = await fetch(`/api/public/portfolios?${params}`, {
    signal,
    headers: { Accept: "application/json" },
  });
  if (!response.ok) throw new Error(`Failed to load portfolios: ${response.status}`);

  const payload = (await response.json()) as PortfoliosPayload;
  if (payload.success === false || !Array.isArray(payload.data) || !payload.pagination) {
    throw new Error("Invalid portfolios response");
  }

  return {
    items: deduplicatePortfolios(payload.data.map((item) => ({
      ...item,
      imageUrl: item.imageUrl ? new URL(item.imageUrl, window.location.origin).href : null,
    }))),
    pagination: payload.pagination,
  };
}
