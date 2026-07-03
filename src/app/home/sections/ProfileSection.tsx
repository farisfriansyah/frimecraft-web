import Link from "next/link";
import type { PublicProfileSummary } from "@/types/public-api";
import type { AppDictionary, AppLocale } from "@/lib/i18n";
import { withLocalePath } from "@/lib/i18n";
import { ProfileScrollspyNav } from "@/components/profile/ProfileScrollspyNav";
import { SectionHeader } from "@/components/ui/section-header";

type ProfileSectionProps = {
  profile: PublicProfileSummary | null;
  navItems: Array<{ id: string; label: string }>;
  formatExpDate: (startMonth: number, startYear: number, endMonth: number | null, endYear: number | null, isCurrent: boolean) => string;
  formatMonthDate: (value: string | null) => string;
  dictionary: AppDictionary;
  locale: AppLocale;
};

export function ProfileSection({ profile, navItems, formatExpDate, formatMonthDate, dictionary, locale }: ProfileSectionProps) {
  return (
    <section id="rl-profile" className="section-fade-rise mt-20 rounded-[2rem] border border-black/10 bg-white/72 p-6 lg:p-8">
      <SectionHeader
        eyebrow={dictionary.common.profile}
        title={dictionary.homePage.profileTitle}
        titleClassName="font-serif-display text-4xl"
        className="mb-8"
        actions={(
          <Link href={withLocalePath(locale, "/profile")} className="text-sm font-semibold text-[color:var(--accent)]">
            {dictionary.homePage.profileAction}
          </Link>
        )}
      />

      {profile ? (
        <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
          <aside className="h-max rounded-2xl border border-black/10 bg-[color:var(--paper)] p-4 lg:sticky lg:top-20">
            <ProfileScrollspyNav items={navItems} />
          </aside>

          <div className="space-y-10">
            <article id="item-profile" className="rounded-2xl border border-black/10 bg-[color:var(--paper)] p-6">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black/10 text-xl font-semibold">
                  {profile.name.slice(0, 1).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-2xl font-semibold tracking-tight">{profile.name}</h3>
                  <p className="text-sm text-black/55">{profile.headline}</p>
                </div>
              </div>
              <p className="mt-4 leading-relaxed text-black/70">{profile.about}</p>
            </article>

            <article id="item-jobs">
              <h3 className="text-2xl font-semibold tracking-tight">{dictionary.homePage.jobExperiences}</h3>
              <div className="mt-4 space-y-4">
                {profile.experiences.slice(0, 8).map((item) => (
                  <div key={item.id} className="rounded-2xl border border-black/10 bg-white/80 p-5">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h4 className="text-lg font-semibold">{item.position}</h4>
                        <p className="text-sm text-black/55">{item.company?.name || dictionary.homePage.unknownCompany}{item.location ? ` - ${item.location}` : ""}</p>
                      </div>
                      <p className="text-xs uppercase tracking-[0.14em] text-black/50">
                        {formatExpDate(item.startMonth, item.startYear, item.endMonth, item.endYear, item.isCurrent)}
                      </p>
                    </div>
                    {item.description ? <p className="mt-3 text-sm leading-relaxed text-black/68">{item.description}</p> : null}
                  </div>
                ))}
                {profile.experiences.length === 0 ? <p className="text-sm text-black/60">{dictionary.homePage.noWorkExperience}</p> : null}
              </div>
            </article>

            <article id="item-education">
              <h3 className="text-2xl font-semibold tracking-tight">{dictionary.homePage.educations}</h3>
              <div className="mt-4 space-y-4">
                {profile.educations.slice(0, 6).map((item) => (
                  <div key={item.id} className="rounded-2xl border border-black/10 bg-white/80 p-5">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h4 className="text-lg font-semibold">{item.institution}</h4>
                          <p className="text-sm text-black/55">{item.degree || dictionary.homePage.degreeNotSpecified}</p>
                      </div>
                      <p className="text-xs uppercase tracking-[0.14em] text-black/50">
                        {formatMonthDate(item.startDate)} - {formatMonthDate(item.endDate)}
                      </p>
                    </div>
                    {item.description ? <p className="mt-3 text-sm leading-relaxed text-black/68">{item.description}</p> : null}
                  </div>
                ))}
                {profile.educations.length === 0 ? <p className="text-sm text-black/60">{dictionary.homePage.noEducation}</p> : null}
              </div>
            </article>

            <article id="item-certificate">
              <h3 className="text-2xl font-semibold tracking-tight">{dictionary.homePage.certificates}</h3>
              <div className="mt-4 space-y-3">
                {profile.certifications.slice(0, 8).map((item) => (
                  <div key={item.id} className="rounded-2xl border border-black/10 bg-white/80 p-5">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h4 className="text-lg font-semibold">{item.title}</h4>
                          <p className="text-sm text-black/55">{item.issuer || dictionary.homePage.issuerNotSpecified}</p>
                      </div>
                      <p className="text-xs uppercase tracking-[0.14em] text-black/50">
                        {formatMonthDate(item.issueDate)}
                      </p>
                    </div>
                    {item.url ? (
                      <a href={item.url} target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm font-semibold text-[color:var(--accent)]">
                        {dictionary.homePage.openCertificate}
                      </a>
                    ) : null}
                  </div>
                ))}
                {profile.certifications.length === 0 ? <p className="text-sm text-black/60">{dictionary.homePage.noCertificates}</p> : null}
              </div>
            </article>

            <article id="item-skill">
              <h3 className="text-2xl font-semibold tracking-tight">{dictionary.homePage.skills}</h3>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {profile.skills.slice(0, 12).map((item) => (
                  <div key={item.id} className="rounded-2xl border border-black/10 bg-white/80 p-4">
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-xs text-black/55">{item.level ?? 0}%</p>
                    </div>
                    <div className="h-2 rounded-full bg-black/10">
                      <div className="h-full rounded-full bg-[color:var(--accent)]" style={{ width: `${Math.max(Math.min(item.level ?? 0, 100), 0)}%` }} />
                    </div>
                  </div>
                ))}
                {profile.skills.length === 0 ? <p className="text-sm text-black/60">{dictionary.homePage.noSkills}</p> : null}
              </div>
            </article>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-black/25 bg-white/60 p-6 text-sm text-black/60">
          {dictionary.homePage.profileUnavailable}
        </div>
      )}
    </section>
  );
}