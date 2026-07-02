import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getFrontendSettings, getPublicPortfolioBySlug } from "@/lib/public-api";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 120;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const settings = await getFrontendSettings().catch(() => null);

  try {
    const portfolio = await getPublicPortfolioBySlug(slug);
    return {
      title: portfolio.seoTitle || portfolio.title,
      description:
        portfolio.seoDescription ||
        portfolio.description ||
        settings?.siteDescription ||
        "Frimecraft portfolio detail",
      keywords: portfolio.keywords || undefined,
      openGraph: {
        title: portfolio.seoTitle || portfolio.title,
        description: portfolio.seoDescription || portfolio.description || undefined,
        images: portfolio.imageUrl ? [portfolio.imageUrl] : undefined,
      },
    };
  } catch {
    return {
      title: `Portfolio | ${settings?.siteTitle || "Frimecraft"}`,
    };
  }
}

export default async function PortfolioDetailPage({ params }: PageProps) {
  const { slug } = await params;

  let portfolio;
  try {
    portfolio = await getPublicPortfolioBySlug(slug);
  } catch {
    notFound();
  }

  const portfolioJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: portfolio.seoTitle || portfolio.title,
    description: portfolio.seoDescription || portfolio.description || undefined,
    datePublished: portfolio.createdAt,
    dateModified: portfolio.updatedAt,
    image: portfolio.imageUrl || undefined,
    creator: {
      "@type": "Person",
      name: portfolio.authorName || "Faris Friansyah",
    },
    keywords: portfolio.keywords || undefined,
    url: portfolio.projectUrl || undefined,
  };

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(portfolioJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Link href="/portfolios" className="text-sm font-semibold text-[color:var(--accent)]">
        Back to portfolios
      </Link>

      <header className="mt-5 rounded-3xl border border-black/10 bg-[color:var(--paper)] p-8">
        <p className="text-xs uppercase tracking-[0.2em] text-black/55">Portfolio Detail</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">{portfolio.title}</h1>
        <p className="mt-3 text-sm text-black/60">
          {(portfolio.workFor?.name || "Client") + " / " + (portfolio.workAt?.name || "Work")}
          {portfolio.authorName ? ` / by ${portfolio.authorName}` : ""}
        </p>
      </header>

      {portfolio.imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={portfolio.imageUrl}
          alt={portfolio.title}
          className="mt-8 h-auto w-full rounded-2xl border border-black/10 object-cover"
        />
      ) : null}

      <section className="mt-8 rounded-2xl border border-black/10 bg-white/80 p-6">
        <h2 className="text-xl font-semibold">Project Overview</h2>
        <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-black/68">
          {portfolio.description || "No description provided."}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {(portfolio.tags || "")
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean)
            .map((tag) => (
              <span key={tag} className="rounded-full border border-black/15 bg-black/5 px-3 py-1 text-xs font-medium">
                {tag}
              </span>
            ))}
        </div>

        {portfolio.projectUrl ? (
          <a
            href={portfolio.projectUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-block rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white"
          >
            Visit Live Project
          </a>
        ) : null}
      </section>
    </main>
  );
}
