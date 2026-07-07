import type { Metadata } from "next";
import { getFrontendSettings, getPublicProfileSummary } from "@/lib/public-api";
import { getDictionary, withLocalePath } from "@/lib/i18n";
import { getRequestLocale } from "@/lib/i18n.server";
import { buildAbsoluteUrl, buildSeoMetadata, getOrganizationName, getSocialProfileUrls } from "@/lib/seo";
import { ProfileScrollspyNav } from "@/components/profile/ProfileScrollspyNav";
import { ProfileInfiniteSections } from "@/components/profile/ProfileInfiniteSections";
import { ProfileAboutSection } from "./sections/ProfileAboutSection";
import { ProfileEmptyState } from "./sections/ProfileEmptyState";
import { ProfilePageHeader } from "./sections/ProfilePageHeader";
import styles from "./profile.module.css";

export const revalidate = 120;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getFrontendSettings().catch(() => null);
  const locale = await getRequestLocale(settings);
  const profile = await getPublicProfileSummary(locale).catch(() => null);

  return buildSeoMetadata({
    settings,
    path: withLocalePath(locale, "/profile"),
    title: profile ? `${profile.name} Profile` : "Profile",
    description:
      profile?.about ||
      settings?.siteDescription ||
      "Professional profile, experiences, education, certificates, and skills.",
    keywords: settings?.seoKeywords,
    image: settings?.ogImageUrl,
    type: "profile",
  });
}

const profileNavItems = [
  { id: "item-profile", label: "About Me" },
  { id: "item-jobs", label: "Job Experiences" },
  { id: "item-education", label: "Educations" },
  { id: "item-certificate", label: "Certificates" },
  { id: "item-skill", label: "Skills" },
];

export default async function ProfilePage() {
  const settings = await getFrontendSettings().catch(() => null);
  const locale = await getRequestLocale(settings);
  const [profile] = await Promise.all([
    getPublicProfileSummary(locale).catch(() => null),
  ]);
  const dictionary = getDictionary(locale);

  const personJsonLd = profile
    ? {
        "@context": "https://schema.org",
        "@type": "Person",
        name: profile.name,
        email: profile.email,
        description: profile.about,
        jobTitle: profile.headline,
        url: buildAbsoluteUrl("/profile", settings),
        sameAs: getSocialProfileUrls(settings),
        worksFor: {
          "@type": "Organization",
          name: getOrganizationName(settings),
        },
      }
    : null;

  if (!profile) {
    return <ProfileEmptyState dictionary={dictionary} />;
  }

  return (
    <main className={`${styles.pageRoot} mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 py-16`}>
      {personJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      ) : null}
      <ProfilePageHeader profile={profile} dictionary={dictionary} />

      <section className={`${styles.contentGrid} grid gap-6`}>
        <aside className="h-max rounded-2xl border border-black/10 bg-[color:var(--paper)] p-4 lg:sticky lg:top-20">
          <ProfileScrollspyNav items={profileNavItems} />
        </aside>

        <div className="space-y-10">
          <ProfileAboutSection about={profile.about} dictionary={dictionary} />
          <ProfileInfiniteSections
            experiences={profile.experiences}
            educations={profile.educations}
            certifications={profile.certifications}
            skills={profile.skills}
          />
        </div>
      </section>
    </main>
  );
}