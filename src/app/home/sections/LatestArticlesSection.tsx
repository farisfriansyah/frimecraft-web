import Link from "next/link";
import type { PublicArticleListItem } from "@/types/public-api";
import type { AppDictionary, AppLocale } from "@/lib/i18n";
import { SectionHeader } from "@/components/ui/section-header";
import styles from "../home.module.css";

type LatestArticlesSectionProps = {
  items: PublicArticleListItem[];
  dictionary: AppDictionary;
  locale: AppLocale;
};

export function LatestArticlesSection({ items, dictionary, locale }: LatestArticlesSectionProps) {
  return (
    <section id="rl-articles" className={`section-fade-rise mt-20 ${styles.contentSection}`}>
      <SectionHeader
        eyebrow={dictionary.homePage.latestUpdate}
        title={dictionary.homePage.latestArticlesTitle}
        actions={(
          <Link href="/articles" className="text-sm font-semibold text-[color:var(--accent)]">
            {dictionary.common.seeAll}
          </Link>
        )}
      />
      <div className="grid gap-x-8 md:grid-cols-3">
        {items.map((article) => (
          <article key={article.id} className="border-t border-[color:var(--line)] py-5">
            <p className="text-xs font-medium uppercase text-[color:var(--muted)]">
              {new Date(article.createdAt).toLocaleDateString(locale === "id" ? "id-ID" : "en-US", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>
            <h3 className="mt-3 text-lg font-semibold leading-snug text-[color:var(--ink)]">{article.title}</h3>
            <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[color:var(--muted)]">{article.excerpt || dictionary.common.noExcerpt}</p>
            <Link href={`/articles/${article.slug}`} className="mt-3 inline-block text-sm font-semibold text-[color:var(--accent-strong)]">
              {dictionary.common.readMore}
            </Link>
          </article>
        ))}
        {items.length === 0 ? (
          <div className="border-t border-[color:var(--line)] py-5 text-sm text-[color:var(--muted)] md:col-span-3">
            {dictionary.homePage.noPublishedArticles}
          </div>
        ) : null}
      </div>
    </section>
  );
}