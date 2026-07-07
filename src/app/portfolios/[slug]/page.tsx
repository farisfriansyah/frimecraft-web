import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getFrontendSettings, getPublicPortfolioBySlug } from "@/lib/public-api";
import { buildDetailOpenGraph, buildSeoMetadata } from "@/lib/seo";
import { getDictionary, withLocalePath } from "@/lib/i18n";
import { getRequestLocale } from "@/lib/i18n.server";
import { buildPortfolioStructuredData } from "@/lib/structured-data";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { PortfolioBackLink } from "./sections/PortfolioBackLink";
import { PortfolioHero } from "./sections/PortfolioHero";
import { PortfolioOverview } from "./sections/PortfolioOverview";
import styles from "./portfolio-detail.module.css";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 120;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const settings = await getFrontendSettings().catch(() => null);
  const locale = await getRequestLocale(settings);
  const dictionary = getDictionary(locale);

  try {
    const portfolio = await getPublicPortfolioBySlug(slug, locale);
    return {
      ...buildSeoMetadata({
        settings,
        path: withLocalePath(locale, `/portfolios/${portfolio.slug || slug}`),
        title: portfolio.seoTitle || portfolio.title,
        description:
          portfolio.seoDescription ||
          portfolio.description ||
          settings?.siteDescription ||
          (locale === "id" ? "Detail portofolio Frimecraft" : "Frimecraft portfolio detail"),
        keywords: portfolio.keywords || portfolio.tags,
        image: portfolio.imageUrl,
        type: "website",
      }),
      openGraph: buildDetailOpenGraph({
        settings,
        path: withLocalePath(locale, `/portfolios/${portfolio.slug || slug}`),
        title: portfolio.seoTitle || portfolio.title,
        description: portfolio.seoDescription || portfolio.description || undefined,
        image: portfolio.imageUrl,
        type: "website",
      }),
    };
  } catch {
    return {
      title: dictionary.portfolioDetail.fallbackTitle,
    };
  }
}

export default async function PortfolioDetailPage({ params }: PageProps) {
  const { slug } = await params;

  let portfolio;
  const settings = await getFrontendSettings().catch(() => null);
  const locale = await getRequestLocale(settings);
  const dictionary = getDictionary(locale);
  try {
    portfolio = await getPublicPortfolioBySlug(slug, locale);
  } catch {
    notFound();
  }

  const portfolioJsonLd = buildPortfolioStructuredData(portfolio, slug, settings);

  return (
    <main className={`${styles.pageRoot} mx-auto flex w-full max-w-5xl flex-1 flex-col px-6 py-16`}>
      <JsonLdScript data={portfolioJsonLd} />
      <PortfolioBackLink dictionary={dictionary} />
      <PortfolioHero
        title={portfolio.title}
        workForName={portfolio.workFor?.name || null}
        workAtName={portfolio.workAt?.name || null}
        authorName={portfolio.authorName || null}
        imageUrl={portfolio.imageUrl}
        dictionary={dictionary}
      />
      <PortfolioOverview description={portfolio.description} tags={portfolio.tags} projectUrl={portfolio.projectUrl} dictionary={dictionary} />
    </main>
  );
}
