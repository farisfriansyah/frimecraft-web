import type { PublicPortfolio } from "@/types/public-api";

function getImageIdentity(imageUrl: string | null) {
  if (!imageUrl) return null;

  try {
    const url = new URL(imageUrl, "https://portfolio.local");
    return `${url.pathname}${url.search}`;
  } catch {
    return imageUrl.trim();
  }
}

function normalizeText(value: string | null | undefined) {
  return value?.trim().replace(/\s+/g, " ").toLowerCase() || "";
}

function getPortfolioIdentity(portfolio: PublicPortfolio) {
  const slug = normalizeText(portfolio.slug);
  if (slug) return `slug:${slug}`;

  const title = normalizeText(portfolio.title);
  const imageUrl = getImageIdentity(portfolio.imageUrl);
  const content = [
    imageUrl,
    normalizeText(portfolio.description),
    normalizeText(portfolio.projectUrl),
    normalizeText(portfolio.tags),
    normalizeText(portfolio.workFor?.name),
    normalizeText(portfolio.workAt?.name),
  ];

  if (title && content.some(Boolean)) {
    return `content:${JSON.stringify([title, ...content])}`;
  }

  return `id:${portfolio.id}`;
}

export function deduplicatePortfolios(portfolios: PublicPortfolio[]) {
  const seen = new Set<string>();

  return portfolios.filter((portfolio) => {
    const identity = getPortfolioIdentity(portfolio);
    if (seen.has(identity)) return false;
    seen.add(identity);
    return true;
  });
}
