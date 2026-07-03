import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublicArticleBySlug, getFrontendSettings } from "@/lib/public-api";
import { getDictionary, getRequestLocale, withLocalePath } from "@/lib/i18n";
import { buildDetailOpenGraph, buildSeoMetadata } from "@/lib/seo";
import { buildArticleStructuredData } from "@/lib/structured-data";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { ArticleContent } from "./sections/ArticleContent";
import { ArticleHero } from "./sections/ArticleHero";
import { ArticleMeta } from "./sections/ArticleMeta";
import styles from "./article-detail.module.css";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 60;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const [{ slug }, settings] = await Promise.all([
    params,
    getFrontendSettings().catch(() => null),
  ]);
  const locale = await getRequestLocale(settings);
  const dictionary = getDictionary(locale);

  try {
    const article = await getPublicArticleBySlug(slug, locale);

    return {
      ...buildSeoMetadata({
        settings,
        path: withLocalePath(locale, `/articles/${article.slug}`),
        title: article.seoTitle || article.title,
        description:
          article.seoDescription ||
          article.excerpt ||
          settings?.seoDescription ||
          (locale === "id" ? "Artikel Frimecraft" : "Frimecraft article"),
        keywords: article.keywords || article.tags,
        image: article.featuredImage,
        type: "article",
      }),
      openGraph: buildDetailOpenGraph({
        settings,
        path: withLocalePath(locale, `/articles/${article.slug}`),
        title: article.seoTitle || article.title,
        description: article.seoDescription || article.excerpt || undefined,
        image: article.featuredImage,
        type: "article",
        publishedTime: article.createdAt,
        modifiedTime: article.updatedAt,
      }),
    };
  } catch {
    return {
      title: dictionary.articleDetail.fallbackTitle,
    };
  }
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;

  let article;
  const settings = await getFrontendSettings().catch(() => null);
  const locale = await getRequestLocale(settings);
  try {
    article = await getPublicArticleBySlug(slug, locale);
  } catch {
    notFound();
  }

  const articleJsonLd = buildArticleStructuredData(article, settings);

  return (
    <main className={`${styles.pageRoot} mx-auto flex w-full max-w-3xl flex-1 flex-col px-6 py-16`}>
      <JsonLdScript data={articleJsonLd} />
      <ArticleMeta createdAt={article.createdAt} locale={locale} />
      <ArticleHero title={article.title} excerpt={article.excerpt} featuredImage={article.featuredImage} />
      <ArticleContent content={article.content} />
    </main>
  );
}
