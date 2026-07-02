import type { Metadata } from "next";
import { getFrontendSettings, getPublicArticlesWithFilters } from "@/lib/public-api";
import { InfiniteArticlesGrid } from "@/components/content/InfiniteArticlesGrid";
import type { Pagination, PublicArticleListItem } from "@/types/public-api";

export const revalidate = 90;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getFrontendSettings().catch(() => null);

  return {
    title: `Articles | ${settings?.siteTitle || "Frimecraft"}`,
    description: settings?.siteDescription || "Insight, notes, and updates from Frimecraft.",
  };
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
  }).catch(() => fallback);

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 py-16">
      <header className="mb-10">
        <p className="text-sm uppercase tracking-[0.2em] text-black/55">Journal</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">Latest Articles</h1>
      </header>

      <form className="mb-8 grid gap-3 rounded-2xl border border-black/10 bg-white/75 p-4 md:grid-cols-[1fr_220px_auto]">
        <input
          type="text"
          name="q"
          defaultValue={q}
          placeholder="Search article title/content"
          className="rounded-xl border border-black/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-[color:var(--accent)]"
        />
        <input
          type="text"
          name="tag"
          defaultValue={tag}
          placeholder="Filter tag"
          className="rounded-xl border border-black/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-[color:var(--accent)]"
        />
        <button
          type="submit"
          className="rounded-xl bg-black px-4 py-2.5 text-sm font-semibold text-white"
        >
          Apply
        </button>
      </form>

      <InfiniteArticlesGrid
        key={`articles:${page}:${q}:${tag}`}
        initialItems={items}
        initialPagination={pagination}
        q={q || undefined}
        tag={tag || undefined}
      />
    </main>
  );
}
