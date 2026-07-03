import type { Metadata } from "next";
import { getFrontendSettings, getPublicPortfoliosWithFilters } from "@/lib/public-api";
import { getDictionary, getRequestLocale, withLocalePath } from "@/lib/i18n";
import { buildSeoMetadata } from "@/lib/seo";
import { InfinitePortfoliosGrid } from "@/components/content/InfinitePortfoliosGrid";
import type { Pagination, PublicPortfolio } from "@/types/public-api";
import { PortfoliosFilterForm } from "./sections/PortfoliosFilterForm";
import { PortfoliosPageHeader } from "./sections/PortfoliosPageHeader";
import styles from "./portfolios.module.css";

export const revalidate = 120;

export async function generateMetadata({ searchParams }: PortfoliosPageProps): Promise<Metadata> {
  const settings = await getFrontendSettings().catch(() => null);
  const locale = await getRequestLocale(settings);
  const dictionary = getDictionary(locale);
  const resolvedSearchParams = await searchParams;
  const q = (resolvedSearchParams.q || "").trim();
  const tag = (resolvedSearchParams.tag || "").trim();
  const featured = parseFeatured(resolvedSearchParams.featured);
  const page = parsePage(resolvedSearchParams.page);
  const hasFilters = Boolean(q || tag || featured || page > 1);
  const title = hasFilters ? `${dictionary.portfoliosPage.filteredTitle}${q ? `: ${q}` : ""}` : dictionary.portfoliosPage.title;
  const description = hasFilters
    ? `Filtered portfolio results${q ? ` for ${q}` : ""}${tag ? ` with tag ${tag}` : ""}${featured ? ` in featured projects` : ""}.`
    : settings?.siteDescription || (locale === "id" ? "Pilihan karya portofolio dari Frimecraft." : "Selected portfolio projects from Frimecraft.");

  return buildSeoMetadata({
    settings,
    path: withLocalePath(locale, "/portfolios"),
    title,
    description,
    keywords: settings?.seoKeywords,
    image: settings?.ogImageUrl,
    type: "website",
    noIndex: hasFilters,
  });
}

type PortfoliosPageProps = {
  searchParams: Promise<{
    page?: string;
    q?: string;
    tag?: string;
    featured?: string;
  }>;
};

function parsePage(page?: string) {
  const parsed = Number(page || "1");
  if (!Number.isFinite(parsed) || parsed <= 0) return 1;
  return Math.floor(parsed);
}

function parseFeatured(value?: string) {
  if (!value) return false;
  return value === "true";
}

export default async function PortfoliosPage({ searchParams }: PortfoliosPageProps) {
  const resolvedSearchParams = await searchParams;
  const page = parsePage(resolvedSearchParams.page);
  const q = (resolvedSearchParams.q || "").trim();
  const tag = (resolvedSearchParams.tag || "").trim();
  const featured = parseFeatured(resolvedSearchParams.featured);

  const fallback = {
    items: [] as PublicPortfolio[],
    pagination: {
      page,
      pageSize: 12,
      total: 0,
      totalPages: 1,
    } as Pagination,
  };

  const { items, pagination } = await getPublicPortfoliosWithFilters({
    featuredOnly: featured,
    page,
    pageSize: 12,
    q: q || undefined,
    tag: tag || undefined,
    locale,
  }).catch(() => fallback);

  const dictionary = getDictionary(locale);

  return (
    <main className={`${styles.pageRoot} mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 py-16`}>
      <PortfoliosPageHeader dictionary={dictionary} />
      <PortfoliosFilterForm q={q} tag={tag} featured={featured} dictionary={dictionary} />

      <InfinitePortfoliosGrid
        key={`portfolios:${page}:${q}:${tag}:${featured}`}
        initialItems={items}
        initialPagination={pagination}
        q={q || undefined}
        tag={tag || undefined}
        featured={featured}
        locale={locale}
      />
    </main>
  );
}
