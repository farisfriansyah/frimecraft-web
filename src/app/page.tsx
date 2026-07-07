import {
  getFrontendSettings,
  getPublicArticlesWithFilters,
  getPublicProfileSummary,
  getPublicPortfoliosWithFilters,
} from "@/lib/public-api";
import { getDictionary, withLocalePath } from "@/lib/i18n";
import { getRequestLocale } from "@/lib/i18n.server";
import { buildAbsoluteUrl, buildSeoMetadata, getOrganizationName, getSocialProfileUrls } from "@/lib/seo";
import type { Metadata } from "next";
import { AboutSection } from "./home/sections/AboutSection";
import { FeaturedPortfoliosSection } from "./home/sections/FeaturedPortfoliosSection";
import { HeroSection } from "./home/sections/HeroSection";
import { HireMeSection } from "./home/sections/HireMeSection";
import { LatestArticlesSection } from "./home/sections/LatestArticlesSection";
import { ProfileSection } from "./home/sections/ProfileSection";
import { ServicesSection } from "./home/sections/ServicesSection";
import styles from "./home/home.module.css";

export const revalidate = 90;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getFrontendSettings().catch(() => null);
  const locale = await getRequestLocale(settings);

  const metadata = buildSeoMetadata({
    settings,
    path: withLocalePath(locale, "/"),
    title: settings?.seoTitle || settings?.siteTitle || "Frimecraft",
    description:
      settings?.seoDescription ||
      settings?.siteDescription ||
      "Frimecraft studio profile, featured portfolios, articles, and professional background.",
    keywords: settings?.seoKeywords,
    image: settings?.ogImageUrl,
    type: "website",
  });

  return {
    ...metadata,
    title: {
      absolute: settings?.seoTitle || settings?.siteTitle || "Frimecraft",
    },
  };
}

export default async function Home() {
  const settings = await getFrontendSettings().catch(() => null);
  const locale = await getRequestLocale(settings);
  const dictionary = getDictionary(locale);
  const [profile] = await Promise.all([
    getPublicProfileSummary(locale).catch(() => null),
  ]);
  const [localizedArticlesResponse, localizedPortfoliosResponse] = await Promise.all([
    getPublicArticlesWithFilters({ page: 1, pageSize: 3, locale }).catch(() => ({ items: [], pagination: { page: 1, pageSize: 3, total: 0, totalPages: 1 } })),
    getPublicPortfoliosWithFilters({ featuredOnly: true, page: 1, pageSize: 6, locale }).catch(() => ({ items: [], pagination: { page: 1, pageSize: 6, total: 0, totalPages: 1 } })),
  ]);

  const latestArticles = localizedArticlesResponse.items;
  const featuredPortfolios = localizedPortfoliosResponse.items;
  const dateLocale = locale === "id" ? "id-ID" : "en-US";

  const formatExpDate = (startMonth: number, startYear: number, endMonth: number | null, endYear: number | null, isCurrent: boolean) => {
    const startDate = new Date(startYear, Math.max(Math.min(startMonth, 12), 1) - 1, 1);
    const start = startDate.toLocaleDateString(dateLocale, { month: "short", year: "numeric" });
    const end = isCurrent || endMonth === null || endYear === null
      ? (locale === "id" ? "Sekarang" : "Now")
      : new Date(endYear, Math.max(Math.min(endMonth, 12), 1) - 1, 1).toLocaleDateString(dateLocale, { month: "short", year: "numeric" });
    return `${start} - ${end}`;
  };

  const formatMonthDate = (value: string | null) => {
    if (!value) return "-";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "-";
    return date.toLocaleDateString(dateLocale, { month: "short", year: "numeric" });
  };
  const services = locale === "en"
    ? [
        { title: "Web Designer", description: "Modern visual-first interfaces with strong UI hierarchy and clarity." },
        { title: "UI/UX Designer", description: "Product flows designed through real problem-solving and user behavior patterns." },
        { title: "Frontend Developer", description: "Production-grade frontend architecture with reusable components and fast delivery." },
        { title: "Backend Developer", description: "Structured API and data models that remain maintainable as product scope grows." },
        { title: "Web3 & NFT", description: "Smart-contract and Web3 product collaboration for experimental and emerging ideas." },
        { title: "Other Explorations", description: "Constantly exploring new stacks and workflows to solve unfamiliar problems quickly." },
      ]
    : [
        { title: "Desainer Web", description: "Antarmuka visual modern dengan hirarki UI yang kuat dan jelas." },
        { title: "Desainer UI/UX", description: "Alur produk yang dirancang lewat pemecahan masalah nyata dan pola perilaku pengguna." },
        { title: "Frontend Developer", description: "Arsitektur frontend siap produksi dengan komponen reusable dan eksekusi cepat." },
        { title: "Backend Developer", description: "Struktur API dan model data yang tetap mudah dirawat saat cakupan produk berkembang." },
        { title: "Web3 & NFT", description: "Kolaborasi produk Web3 dan smart contract untuk ide eksperimental dan emerging." },
        { title: "Eksplorasi Lainnya", description: "Terus mengeksplorasi stack dan workflow baru untuk menyelesaikan masalah yang belum familiar." },
      ];

  const profileNavItems = [
    { id: "item-profile", label: "About Me" },
    { id: "item-jobs", label: "Job Experiences" },
    { id: "item-education", label: "Educations" },
    { id: "item-certificate", label: "Certificates" },
    { id: "item-skill", label: "Skills" },
  ];

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: settings?.siteTitle || "Frimecraft",
    description:
      settings?.seoDescription ||
      settings?.siteDescription ||
      "Frimecraft studio profile, featured portfolios, articles, and professional background.",
    url: buildAbsoluteUrl("/", settings),
    publisher: {
      "@type": "Organization",
      name: getOrganizationName(settings),
      logo: settings?.organizationLogoUrl || settings?.ogImageUrl || undefined,
      sameAs: getSocialProfileUrls(settings),
    },
  };

  const personJsonLd = profile
    ? {
        "@context": "https://schema.org",
        "@type": "Person",
        name: profile.name,
        email: profile.email,
        jobTitle: profile.headline,
        description: profile.about,
        url: buildAbsoluteUrl("/profile", settings),
        worksFor: {
          "@type": "Organization",
          name: getOrganizationName(settings),
        },
      }
    : null;

  return (
    <main className={`${styles.pageRoot} mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 py-14 lg:py-20`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      {personJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      ) : null}
      <HeroSection siteDescription={settings?.siteDescription || null} dictionary={dictionary} locale={locale} />
      <AboutSection dictionary={dictionary} />
      <ServicesSection services={services} dictionary={dictionary} />
      <ProfileSection
        profile={profile}
        navItems={profileNavItems}
        formatExpDate={formatExpDate}
        formatMonthDate={formatMonthDate}
        dictionary={dictionary}
        locale={locale}
      />
      <FeaturedPortfoliosSection items={featuredPortfolios} dictionary={dictionary} />
      <LatestArticlesSection items={latestArticles} dictionary={dictionary} locale={locale} />
      <HireMeSection dictionary={dictionary} />
    </main>
  );
}
