import type { AppDictionary } from "@/lib/i18n";

type PortfolioHeroProps = {
  title: string;
  workForName: string | null;
  workAtName: string | null;
  authorName: string | null;
  imageUrl: string | null;
  dictionary: AppDictionary;
};

export function PortfolioHero({ title, workForName, workAtName, authorName, imageUrl, dictionary }: PortfolioHeroProps) {
  return (
    <>
      <header className="mt-5">
        <p className="text-xs font-semibold uppercase text-[color:var(--accent-strong)]">{dictionary.portfolioDetail.detailEyebrow}</p>
        <h1 className="mt-3 text-4xl font-semibold text-[color:var(--ink)] md:text-5xl">{title}</h1>
        <p className="mt-4 text-sm text-[color:var(--muted)]">
          {(workForName || dictionary.common.client) + " / " + (workAtName || dictionary.common.work)}
          {authorName ? ` / ${authorName}` : ""}
        </p>
      </header>

      {imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageUrl}
          alt={title}
          className="mt-8 h-auto max-h-[38rem] w-full rounded-2xl object-cover"
        />
      ) : null}
    </>
  );
}