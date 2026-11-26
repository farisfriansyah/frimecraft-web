"use client";

import { useEffect, useState } from "react";
import { InfinitePortfoliosGrid, PortfolioGridSkeleton } from "@/components/content/InfinitePortfoliosGrid";
import { fetchPortfolios } from "@/lib/portfolio-client";
import { getDictionary, type AppLocale } from "@/lib/i18n";
import type { Pagination, PublicPortfolio } from "@/types/public-api";
import { PortfoliosFilterForm } from "./PortfoliosFilterForm";

type Filters = { q: string; tag: string; featured: boolean; page: number };

type PortfoliosExplorerProps = {
  initialFilters: Filters;
  initialItems: PublicPortfolio[];
  initialPagination: Pagination;
  initialError: boolean;
  locale: AppLocale;
};

function filterKey(filters: Filters) {
  return JSON.stringify(filters);
}

export function PortfoliosExplorer({ initialFilters, initialItems, initialPagination, initialError, locale }: PortfoliosExplorerProps) {
  const [filters, setFilters] = useState(initialFilters);
  const [attempt, setAttempt] = useState(0);
  const [result, setResult] = useState({
    key: filterKey(initialFilters),
    attempt: 0,
    items: initialItems,
    pagination: initialPagination,
  });
  const [error, setError] = useState<{ key: string; attempt: number } | null>(
    initialError ? { key: filterKey(initialFilters), attempt: 0 } : null,
  );
  const key = filterKey(filters);
  const currentError = error?.key === key && error.attempt === attempt;
  const loading = !currentError && (result.key !== key || result.attempt !== attempt);

  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const page = Number(params.get("page") || "1");
      setFilters({
        q: params.get("q") || "",
        tag: params.get("tag") || "",
        featured: params.get("featured") === "true",
        page: Number.isFinite(page) && page > 0 ? Math.floor(page) : 1,
      });
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    if (result.key === key && result.attempt === attempt) return;

    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      try {
        const next = await fetchPortfolios({ ...filters, locale }, controller.signal);
        if (!controller.signal.aborted) setResult({ ...next, key, attempt });
      } catch (caught) {
        if (!controller.signal.aborted) {
          console.error("Failed to search portfolios", caught);
          setError({ key, attempt });
        }
      }
    }, 350);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [attempt, filters, key, locale, result.attempt, result.key]);

  function updateFilter(field: "q" | "tag" | "featured", value: string) {
    const next = { ...filters, [field]: field === "featured" ? value === "true" : value, page: 1 };
    setFilters(next);
    const url = new URL(window.location.href);
    if (field === "featured") {
      if (next.featured) url.searchParams.set("featured", "true");
      else url.searchParams.delete("featured");
    } else if (value) {
      url.searchParams.set(field, value);
    } else {
      url.searchParams.delete(field);
    }
    url.searchParams.delete("page");
    window.history.replaceState(null, "", url);
  }

  return (
    <>
      <PortfoliosFilterForm {...filters} dictionary={getDictionary(locale)} onChange={updateFilter} />
      {loading ? (
        <PortfolioGridSkeleton locale={locale} />
      ) : currentError ? (
        <div role="alert" className="rounded-xl border border-[color:var(--line)] bg-white p-5 text-sm text-[color:var(--muted)]">
          <p>{locale === "en" ? "Could not load portfolios." : "Gagal memuat portofolio."}</p>
          <button type="button" onClick={() => setAttempt((value) => value + 1)} className="mt-3 font-semibold text-[color:var(--accent)]">
            {locale === "en" ? "Try again" : "Coba lagi"}
          </button>
        </div>
      ) : (
        <InfinitePortfoliosGrid
          key={`${result.key}:${result.attempt}`}
          initialItems={result.items}
          initialPagination={result.pagination}
          q={filters.q}
          tag={filters.tag}
          featured={filters.featured}
          locale={locale}
        />
      )}
    </>
  );
}
