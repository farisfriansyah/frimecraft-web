import type { Metadata } from "next";
import Link from "next/link";
import { getFrontendSettings, getPublicProfileSummary } from "@/lib/public-api";
import { ProfileScrollspyNav } from "@/components/profile/ProfileScrollspyNav";
import { ProfileInfiniteSections } from "@/components/profile/ProfileInfiniteSections";

export const revalidate = 120;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getFrontendSettings().catch(() => null);

  return {
    title: `Profile | ${settings?.siteTitle || "Frimecraft"}`,
    description:
      settings?.siteDescription ||
      "Professional profile, experiences, education, certificates, and skills.",
  };
}

const profileNavItems = [
  { id: "item-profile", label: "About Me" },
  { id: "item-jobs", label: "Job Experiences" },
  { id: "item-education", label: "Educations" },
  { id: "item-certificate", label: "Certificates" },
  { id: "item-skill", label: "Skills" },
];

export default async function ProfilePage() {
  const profile = await getPublicProfileSummary().catch(() => null);

  if (!profile) {
    return (
      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-6 py-16">
        <h1 className="text-4xl font-semibold tracking-tight">Public Profile</h1>
        <p className="mt-4 rounded-2xl border border-dashed border-black/25 bg-white/60 p-6 text-sm text-black/60">
          Profil publik belum tersedia. Pastikan data profile sudah terisi di admin.
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 py-16">
      <header className="mb-8 rounded-[2rem] border border-black/10 bg-[color:var(--paper)] p-8 shadow-[0_12px_30px_rgba(0,0,0,0.06)]">
        <p className="text-xs uppercase tracking-[0.22em] text-black/55">Profile</p>
        <h1 className="mt-3 font-serif-display text-5xl tracking-tight">{profile.name}</h1>
        <p className="mt-3 text-black/70">{profile.headline}</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/#rl-profile"
            className="rounded-full border border-black/20 bg-white px-5 py-2 text-sm font-semibold transition hover:bg-black hover:text-white"
          >
            Back to Home Section
          </Link>
          <Link
            href="/portfolios"
            className="rounded-full bg-black px-5 py-2 text-sm font-semibold text-white"
          >
            View Portfolios
          </Link>
        </div>
      </header>

      <section className="grid gap-6 lg:grid-cols-[240px_1fr]">
        <aside className="h-max rounded-2xl border border-black/10 bg-[color:var(--paper)] p-4 lg:sticky lg:top-20">
          <ProfileScrollspyNav items={profileNavItems} />
        </aside>

        <div className="space-y-10">
          <article id="item-profile" className="rounded-2xl border border-black/10 bg-[color:var(--paper)] p-6">
            <h2 className="text-2xl font-semibold tracking-tight">About Me</h2>
            <p className="mt-4 leading-relaxed text-black/70">{profile.about}</p>
          </article>
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
