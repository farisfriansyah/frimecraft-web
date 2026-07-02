import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublicArticleBySlug, getFrontendSettings } from "@/lib/public-api";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 60;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const [{ slug }, settings] = await Promise.all([
    params,
    getFrontendSettings().catch(() => null),
  ]);

  try {
    const article = await getPublicArticleBySlug(slug);

    return {
      title: article.seoTitle || article.title,
      description:
        article.seoDescription ||
        article.excerpt ||
        settings?.seoDescription ||
        "Frimecraft article",
      openGraph: {
        title: article.seoTitle || article.title,
        description: article.seoDescription || article.excerpt || undefined,
        images: article.featuredImage ? [article.featuredImage] : undefined,
      },
    };
  } catch {
    return {
      title: `Article | ${settings?.siteTitle || "Frimecraft"}`,
    };
  }
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;

  let article;
  try {
    article = await getPublicArticleBySlug(slug);
  } catch {
    notFound();
  }

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.seoTitle || article.title,
    description: article.seoDescription || article.excerpt || undefined,
    datePublished: article.createdAt,
    dateModified: article.updatedAt,
    image: article.featuredImage || undefined,
    author: {
      "@type": "Person",
      name: "Faris Friansyah",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `/articles/${article.slug}`,
    },
  };

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <p className="text-xs uppercase tracking-[0.18em] text-black/50">
        {new Date(article.createdAt).toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })}
      </p>
      <h1 className="mt-3 text-4xl leading-tight font-semibold tracking-tight">{article.title}</h1>
      {article.excerpt ? <p className="mt-4 text-lg text-black/65">{article.excerpt}</p> : null}

      {article.featuredImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={article.featuredImage}
          alt={article.title}
          className="mt-8 h-auto w-full rounded-2xl border border-black/10 object-cover"
        />
      ) : null}

      <article
        className="prose prose-zinc mt-10 max-w-none"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </main>
  );
}
