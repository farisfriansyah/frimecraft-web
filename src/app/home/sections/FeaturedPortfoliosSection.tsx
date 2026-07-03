import Link from "next/link";
import type { PublicPortfolio } from "@/types/public-api";
import type { AppDictionary } from "@/lib/i18n";
import { SectionHeader } from "@/components/ui/section-header";

type FeaturedPortfoliosSectionProps = {
  items: PublicPortfolio[];
  dictionary: AppDictionary;
};

export function FeaturedPortfoliosSection({ items, dictionary }: FeaturedPortfoliosSectionProps) {
  return (
    <section id="rl-portfolio" className="section-fade-rise mt-20">
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
      <div className="grid gap-5 md:grid-cols-3">
        {items.map((item) => (
          <article key={item.id} className="overflow-hidden rounded-2xl border border-black/10 bg-[color:var(--paper)]">
            {item.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={item.imageUrl} alt={item.title} className="h-44 w-full object-cover" />
            ) : (
              <div className="flex h-44 items-center justify-center bg-black/5 text-sm text-black/45">{dictionary.common.noPreviewImage}</div>
            )}
            <div className="p-6">
              <h3 className="text-xl font-semibold leading-tight">{item.title}</h3>
              <p className="mt-2 text-sm text-black/62">{(item.workFor?.name || dictionary.common.client) + " / " + (item.workAt?.name || dictionary.common.work)}</p>
              <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-black/62">{item.description || dictionary.common.noDescription}</p>
              <div className="mt-4 flex flex-wrap gap-3">
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
          <div className="rounded-2xl border border-dashed border-black/25 bg-white/60 p-6 text-sm text-black/60 md:col-span-3">
            {dictionary.homePage.noFeaturedPortfolio}
          </div>
        ) : null}
      </div>
    </section>
  );
}