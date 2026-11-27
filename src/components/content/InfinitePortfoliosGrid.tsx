"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { Pagination, PublicPortfolio } from "@/types/public-api";
import { useInfiniteAutoLoad } from "@/hooks/use-infinite-auto-load";
import { getDictionary } from "@/lib/i18n";
import { fetchPortfolios } from "@/lib/portfolio-client";
import { deduplicatePortfolios } from "@/lib/portfolio-dedupe";

type InfinitePortfoliosGridProps = {
  initialItems: PublicPortfolio[];
  initialPagination: Pagination;
  q?: string;
  tag?: string;
  featured?: boolean;
  locale?: "id" | "en";
};

function PortfolioCardSkeleton() {
  return (
    <article aria-hidden="true">
      <div className="h-48 animate-pulse rounded-2xl bg-black/10" />
      <div className="pt-4">
        <div className="animate-pulse">
          <div className="h-5 w-4/5 rounded bg-black/10" />
          <div className="mt-3 h-3 w-1/2 rounded bg-black/10" />
          <div className="mt-4 h-3 w-full rounded bg-black/10" />
          <div className="mt-2 h-3 w-5/6 rounded bg-black/10" />
        </div>
      </div>
    </article>
  );
}

export function PortfolioGridSkeleton({ locale }: { locale: "id" | "en" }) {
  return (
    <div role="status" aria-label={locale === "en" ? "Loading portfolios" : "Memuat portofolio"}>
      <div className="grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
        <PortfolioCardSkeleton />
        <PortfolioCardSkeleton />
        <PortfolioCardSkeleton />
      </div>
    </div>
  );
}

export function InfinitePortfoliosGrid({
  initialItems,
  initialPagination,
  q,
  tag,
  featured,
  locale,
}: InfinitePortfoliosGridProps) {
  const dictionary = getDictionary(locale || "id");
  const [items, setItems] = useState(() => deduplicatePortfolios(initialItems));
  const [pagination, setPagination] = useState(initialPagination);
  const [loadError, setLoadError] = useState(false);
  const { page, setPage, isLoading, setIsLoading, hasMore, triggerRef } = useInfiniteAutoLoad(
    pagination.totalPages,
    initialPagination.page,
    !loadError,
  );

  useEffect(() => {
    if (!isLoading) return;
    if (page >= pagination.totalPages) {
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();

    const run = async () => {
      try {
        const nextPage = page + 1;
        const result = await fetchPortfolios(
          { q: q || "", tag: tag || "", featured: Boolean(featured), page: nextPage, locale: locale || "id" },
          controller.signal,
        );
        if (controller.signal.aborted) return;
        setItems((prev) => deduplicatePortfolios([...prev, ...result.items]));
        setPagination(result.pagination);
        setPage(nextPage);
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error("Failed to load more portfolios", error);
          setLoadError(true);
        }
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    };

    run();
    return () => controller.abort();
  }, [featured, isLoading, locale, page, pagination.totalPages, q, setIsLoading, setPage, tag]);

  const statusText = useMemo(() => {
    return locale === "en"
      ? `Showing ${items.length} of ${pagination.total} portfolios.`
      : `Menampilkan ${items.length} dari ${pagination.total} portofolio.`;
  }, [items.length, locale, pagination.total]);

  return (
    <>
      <section className="grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <article key={item.id} className="group min-w-0">
            {item.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={item.imageUrl} alt={item.title} loading="lazy" decoding="async" className="h-48 w-full rounded-2xl object-cover transition-transform duration-300 group-hover:scale-[1.015]" />
            ) : (
              <div className="flex h-48 items-center justify-center rounded-2xl bg-[#f0f1f5] text-sm text-[color:var(--muted)]">{dictionary.common.noPreviewImage}</div>
            )}
            <div className="pt-4">
              <h2 className="text-lg leading-snug font-semibold text-[color:var(--ink)]">{item.title}</h2>
              {item.sortNumber !== null ? (
                <p className="mt-2 text-xs font-semibold uppercase text-black/45">Sort #{item.sortNumber}</p>
              ) : null}
              <p className="mt-1.5 text-sm text-[color:var(--muted)]">{(item.workFor?.name || dictionary.common.client) + " / " + (item.workAt?.name || dictionary.common.work)}</p>
              <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[color:var(--muted)]">{item.description || dictionary.common.noDescription}</p>
              <div className="mt-3 flex flex-wrap gap-4">
                {item.slug ? (
                  <Link href={`/portfolios/${item.slug}`} className="inline-block text-sm font-semibold text-[color:var(--accent)]">
                    {dictionary.common.viewDetails}
                  </Link>
                ) : null}
                {item.projectUrl ? (
                  <a href={item.projectUrl} target="_blank" rel="noreferrer" className="inline-block text-sm font-semibold text-black/70">
                    {dictionary.common.liveProject}
                  </a>
                ) : null}
              </div>
            </div>
          </article>
        ))}

        {isLoading ? (
          <>
            <PortfolioCardSkeleton />
            <PortfolioCardSkeleton />
            <PortfolioCardSkeleton />
          </>
        ) : null}
      </section>

      {items.length === 0 ? (
        <p className="mt-10 border-t border-[color:var(--line)] py-5 text-sm text-[color:var(--muted)]">
          {q || tag || featured
            ? (locale === "en" ? "No portfolios match your filters." : "Tidak ada portofolio yang sesuai dengan filter.")
            : (locale === "en" ? "No published portfolios yet." : "Belum ada portofolio yang dipublish.")}
        </p>
      ) : null}

      <footer className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-[color:var(--line)] py-5 text-sm text-[color:var(--muted)]">
        <p>
          {statusText}
          <span className="ml-2">
            <Link href="/" className="font-semibold text-[color:var(--accent)]">{dictionary.common.backToHome}</Link>
          </span>
        </p>
        {hasMore ? (
          <div className="flex items-center gap-3">
            {loadError ? <p role="alert">{locale === "en" ? "Could not load more portfolios." : "Gagal memuat portofolio berikutnya."}</p> : null}
            <button
              type="button"
              disabled={isLoading}
              onClick={() => { setLoadError(false); setIsLoading(true); }}
              className="font-semibold text-[color:var(--accent)] disabled:opacity-50"
            >
              {isLoading ? (locale === "en" ? "Loading..." : "Memuat...") : loadError ? (locale === "en" ? "Try again" : "Coba lagi") : (locale === "en" ? "Load more" : "Muat lagi")}
            </button>
          </div>
        ) : <p>{locale === "en" ? "All portfolios loaded." : "Semua portofolio sudah dimuat."}</p>}
      </footer>

      {hasMore ? <div ref={triggerRef} className="h-10" /> : null}
    </>
  );
}
