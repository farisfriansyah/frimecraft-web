import Link from "next/link";
import type { PublicPortfolio } from "@/types/public-api";
import type { AppDictionary } from "@/lib/i18n";
import { SectionHeader } from "@/components/ui/section-header";
import styles from "../home.module.css";

type FeaturedPortfoliosSectionProps = {
  items: PublicPortfolio[];
  dictionary: AppDictionary;
};

export function FeaturedPortfoliosSection({ items, dictionary }: FeaturedPortfoliosSectionProps) {
  return (
    <section id="rl-portfolio" className={`section-fade-rise mt-20 ${styles.contentSection}`}>
      <SectionHeader
        eyebrow={dictionary.common.portfolio}
        title={dictionary.homePage.featuredPortfoliosTitle}
        description={dictionary.homePage.featuredPortfoliosDescription}
        actions={(
          <Link href="/portfolios" className="text-sm font-semibold text-[color:var(--accent)]">
            {dictionary.common.allPortfolios}
          </Link>
        )}
      />
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <article key={item.id} className="group min-w-0">
            {item.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={item.imageUrl} alt={item.title} className="h-48 w-full rounded-2xl object-cover transition-transform duration-300 group-hover:scale-[1.015]" />
            ) : (
              <div className="flex h-48 items-center justify-center rounded-2xl bg-[#f0f1f5] text-sm text-[color:var(--muted)]">{dictionary.common.noPreviewImage}</div>
            )}
            <div className="pt-4">
              <h3 className="text-lg font-semibold leading-tight text-[color:var(--ink)]">{item.title}</h3>
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
        {items.length === 0 ? (
          <div className="border-t border-[color:var(--line)] py-5 text-sm text-[color:var(--muted)] md:col-span-3">
            {dictionary.homePage.noFeaturedPortfolio}
          </div>
        ) : null}
      </div>
    </section>
  );
}