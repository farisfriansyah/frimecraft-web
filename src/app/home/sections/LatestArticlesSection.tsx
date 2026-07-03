import Link from "next/link";
import type { PublicArticleListItem } from "@/types/public-api";
import type { AppDictionary, AppLocale } from "@/lib/i18n";
import { SectionHeader } from "@/components/ui/section-header";

type LatestArticlesSectionProps = {
  items: PublicArticleListItem[];
  dictionary: AppDictionary;
  locale: AppLocale;
};

export function LatestArticlesSection({ items, dictionary, locale }: LatestArticlesSectionProps) {
  return (
    <section id="rl-articles" className="section-fade-rise mt-20">
      <SectionHeader
        eyebrow={dictionary.homePage.latestUpdate}
        title={dictionary.homePage.latestArticlesTitle}
        actions={(
          <Link href="/articles" className="text-sm font-semibold text-[color:var(--accent)]">
            {dictionary.common.seeAll}
          </Link>
        )}
      />
      <div className="grid gap-5 md:grid-cols-3">
        {items.map((article) => (
          <article key={article.id} className="rounded-2xl border border-black/10 bg-[color:var(--paper)] p-6">
            <p className="text-xs uppercase tracking-[0.18em] text-black/45">
              {new Date(article.createdAt).toLocaleDateString(locale === "id" ? "id-ID" : "en-US", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>
            <h3 className="mt-3 text-xl font-semibold leading-tight">{article.title}</h3>
            <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-black/62">{article.excerpt || dictionary.common.noExcerpt}</p>
            <Link href={`/articles/${article.slug}`} className="mt-4 inline-block text-sm font-semibold text-[color:var(--accent)]">
              {dictionary.common.readMore}
            </Link>
          </article>
        ))}
        {items.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-black/25 bg-white/60 p-6 text-sm text-black/60 md:col-span-3">
            {dictionary.homePage.noPublishedArticles}
          </div>
        ) : null}
      </div>
    </section>
  );
}