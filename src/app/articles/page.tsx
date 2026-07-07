import type { Metadata } from "next";
import { getFrontendSettings, getPublicArticlesWithFilters } from "@/lib/public-api";
import { getDictionary, withLocalePath } from "@/lib/i18n";
import { getRequestLocale } from "@/lib/i18n.server";
import { buildSeoMetadata } from "@/lib/seo";
import { InfiniteArticlesGrid } from "@/components/content/InfiniteArticlesGrid";
import type { Pagination, PublicArticleListItem } from "@/types/public-api";
import { ArticlesFilterForm } from "./sections/ArticlesFilterForm";
import { ArticlesPageHeader } from "./sections/ArticlesPageHeader";
import styles from "./articles.module.css";

export const revalidate = 90;

export async function generateMetadata({ searchParams }: ArticlesPageProps): Promise<Metadata> {
  const settings = await getFrontendSettings().catch(() => null);
  const locale = await getRequestLocale(settings);
  const dictionary = getDictionary(locale);
  const resolvedSearchParams = await searchParams;
  const q = (resolvedSearchParams.q || "").trim();
  const tag = (resolvedSearchParams.tag || "").trim();
  const page = parsePage(resolvedSearchParams.page);
  const hasFilters = Boolean(q || tag || page > 1);
  const title = hasFilters ? `${dictionary.articlesPage.filteredTitle}${q ? `: ${q}` : ""}` : dictionary.articlesPage.title;
  const description = hasFilters
    ? `Filtered article results${q ? ` for ${q}` : ""}${tag ? ` with tag ${tag}` : ""}.`
    : settings?.siteDescription || (locale === "id" ? "Insight, catatan, dan update dari Frimecraft." : "Insight, notes, and updates from Frimecraft.");

  return buildSeoMetadata({
    settings,
    path: withLocalePath(locale, "/articles"),
    title,
    description,
    keywords: settings?.seoKeywords,
    image: settings?.ogImageUrl,
    type: "website",
    noIndex: hasFilters,
  });
}

type ArticlesPageProps = {
  searchParams: Promise<{
    page?: string;
    q?: string;
    tag?: string;
  }>;
};

function parsePage(page?: string) {
  const parsed = Number(page || "1");
  if (!Number.isFinite(parsed) || parsed <= 0) return 1;
  return Math.floor(parsed);
}

export default async function ArticlesPage({ searchParams }: ArticlesPageProps) {
  const settings = await getFrontendSettings().catch(() => null);
  const locale = await getRequestLocale(settings);
  const resolvedSearchParams = await searchParams;
  const page = parsePage(resolvedSearchParams.page);
  const q = (resolvedSearchParams.q || "").trim();
  const tag = (resolvedSearchParams.tag || "").trim();

  const fallback = {
    items: [] as PublicArticleListItem[],
    pagination: {
      page,
      pageSize: 9,
      total: 0,
      totalPages: 1,
    } as Pagination,
  };

  const { items, pagination } = await getPublicArticlesWithFilters({
    page,
    pageSize: 9,
    q: q || undefined,
    tag: tag || undefined,
    locale,
  }).catch(() => fallback);
  
  const dictionary = getDictionary(locale);

  return (
    <main className={`${styles.pageRoot} mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 py-16`}>
      <ArticlesPageHeader dictionary={dictionary} />
      <ArticlesFilterForm q={q} tag={tag} dictionary={dictionary} />

      <InfiniteArticlesGrid
        key={`articles:${page}:${q}:${tag}`}
        initialItems={items}
        initialPagination={pagination}
        q={q || undefined}
        tag={tag || undefined}
        locale={locale}
      />
    </main>
  );
}
