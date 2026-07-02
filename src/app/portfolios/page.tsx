import type { Metadata } from "next";
import { getFrontendSettings, getPublicPortfoliosWithFilters } from "@/lib/public-api";
import { InfinitePortfoliosGrid } from "@/components/content/InfinitePortfoliosGrid";
import type { Pagination, PublicPortfolio } from "@/types/public-api";

export const revalidate = 120;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getFrontendSettings().catch(() => null);

  return {
    title: `Portfolios | ${settings?.siteTitle || "Frimecraft"}`,
    description:
      settings?.siteDescription || "Selected portfolio projects from Frimecraft.",
  };
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
  }).catch(() => fallback);

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 py-16">
      <header className="mb-10">
        <p className="text-sm uppercase tracking-[0.2em] text-black/55">Portfolio</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">Project Works</h1>
      </header>

      <form className="mb-8 grid gap-3 rounded-2xl border border-black/10 bg-white/75 p-4 md:grid-cols-[1fr_200px_180px_auto]">
        <input
          type="text"
          name="q"
          defaultValue={q}
          placeholder="Search portfolio"
          className="rounded-xl border border-black/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-[color:var(--accent)]"
        />
        <input
          type="text"
          name="tag"
          defaultValue={tag}
          placeholder="Filter tag"
          className="rounded-xl border border-black/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-[color:var(--accent)]"
        />
        <select
          name="featured"
          defaultValue={String(featured)}
          className="rounded-xl border border-black/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-[color:var(--accent)]"
        >
          <option value="false">All portfolios</option>
          <option value="true">Featured only</option>
        </select>
        <button
          type="submit"
          className="rounded-xl bg-black px-4 py-2.5 text-sm font-semibold text-white"
        >
          Apply
        </button>
      </form>

      <InfinitePortfoliosGrid
        key={`portfolios:${page}:${q}:${tag}:${featured}`}
        initialItems={items}
        initialPagination={pagination}
        q={q || undefined}
        tag={tag || undefined}
        featured={featured}
      />
    </main>
  );
}
