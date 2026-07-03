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
      <header className="mt-5 rounded-3xl border border-black/10 bg-[color:var(--paper)] p-8">
        <p className="text-xs uppercase tracking-[0.2em] text-black/55">{dictionary.portfolioDetail.detailEyebrow}</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-3 text-sm text-black/60">
          {(workForName || dictionary.common.client) + " / " + (workAtName || dictionary.common.work)}
          {authorName ? ` / ${authorName}` : ""}
        </p>
      </header>

      {imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageUrl}
          alt={title}
          className="mt-8 h-auto w-full rounded-2xl border border-black/10 object-cover"
        />
      ) : null}
    </>
  );
}