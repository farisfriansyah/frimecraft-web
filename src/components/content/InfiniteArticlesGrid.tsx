"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { Pagination, PublicArticleListItem } from "@/types/public-api";
import { useInfiniteAutoLoad } from "@/hooks/use-infinite-auto-load";
import { getDictionary } from "@/lib/i18n";

type InfiniteArticlesGridProps = {
  initialItems: PublicArticleListItem[];
  initialPagination: Pagination;
  q?: string;
  tag?: string;
  locale?: "id" | "en";
};

type ArticlesPayload = {
  data?: PublicArticleListItem[];
  pagination?: Pagination;
};

function ArticleCardSkeleton() {
  return (
    <article className="rounded-2xl border border-black/10 bg-white/70 p-6 shadow-[0_8px_24px_rgba(0,0,0,0.05)]">
      <div className="animate-pulse">
        <div className="h-3 w-2/5 rounded bg-black/10" />
        <div className="mt-4 h-5 w-4/5 rounded bg-black/10" />
        <div className="mt-3 h-3 w-full rounded bg-black/10" />
        <div className="mt-2 h-3 w-5/6 rounded bg-black/10" />
        <div className="mt-2 h-3 w-3/5 rounded bg-black/10" />
        <div className="mt-5 h-4 w-24 rounded bg-black/10" />
      </div>
    </article>
  );
}

export function InfiniteArticlesGrid({
  initialItems,
  initialPagination,
  q,
  tag,
  locale,
}: InfiniteArticlesGridProps) {
  const dictionary = getDictionary(locale || "id");
  const [items, setItems] = useState(initialItems);
  const [pagination, setPagination] = useState(initialPagination);
  const { page, setPage, isLoading, setIsLoading, hasMore, triggerRef } = useInfiniteAutoLoad(
    initialPagination.totalPages,
    initialPagination.page,
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
        const params = new URLSearchParams({
          page: String(nextPage),
          pageSize: String(initialPagination.pageSize),
        });
        if (q) params.set("q", q);
        if (tag) params.set("tag", tag);
        if (locale) params.set("lang", locale);

        const response = await fetch(`/api/public/articles?${params.toString()}`, {
          signal: controller.signal,
          headers: { Accept: "application/json" },
        });

        if (!response.ok) throw new Error(`Failed to load articles: ${response.status}`);

        const payload = (await response.json()) as ArticlesPayload;
        const nextItems = payload.data;
        const nextPagination = payload.pagination;
        if (!Array.isArray(nextItems) || !nextPagination) throw new Error("Invalid articles payload");

        setItems((prev) => [...prev, ...nextItems]);
        setPagination(nextPagination);
        setPage(nextPage);
      } catch {
        // Keep existing items and stop loading on request failure.
      } finally {
        setIsLoading(false);
      }
    };

    run();
    return () => controller.abort();
  }, [initialPagination.pageSize, isLoading, locale, page, pagination.totalPages, q, setIsLoading, setPage, tag]);

  const statusText = useMemo(() => {
    return locale === "en"
      ? `Showing ${items.length} of ${pagination.total} articles.`
      : `Menampilkan ${items.length} dari ${pagination.total} artikel.`;
  }, [items.length, locale, pagination.total]);

  return (
    <>
      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((article) => (
          <article key={article.id} className="rounded-2xl border border-black/10 bg-white/80 p-6 shadow-[0_8px_24px_rgba(0,0,0,0.05)]">
            <p className="text-xs uppercase tracking-[0.18em] text-black/40">
              {new Date(article.createdAt).toLocaleDateString("id-ID", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>
            <h2 className="mt-3 text-xl leading-tight font-semibold">{article.title}</h2>
            {article.sortNumber !== null ? (
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-black/45">Sort #{article.sortNumber}</p>
            ) : null}
            <p className="mt-2 line-clamp-3 text-sm text-black/60">{article.excerpt || dictionary.common.noExcerpt}</p>
            <Link href={`/articles/${article.slug}`} className="mt-5 inline-block text-sm font-semibold text-[color:var(--accent)]">
              {locale === "en" ? "Read article" : "Baca artikel"}
            </Link>
          </article>
        ))}

        {isLoading ? (
          <>
            <ArticleCardSkeleton />
            <ArticleCardSkeleton />
            <ArticleCardSkeleton />
          </>
        ) : null}
      </section>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-3 text-sm text-black/50">
        <p>{statusText}</p>
        {hasMore ? <p>{locale === "en" ? "Scroll down to load more..." : "Scroll ke bawah untuk memuat lagi..."}</p> : <p>{locale === "en" ? "All articles loaded." : "Semua artikel sudah dimuat."}</p>}
      </div>

      {hasMore ? <div ref={triggerRef} className="h-10" /> : null}
    </>
  );
}
