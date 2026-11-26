import Link from "next/link";
import type { PublicProfileSummary } from "@/types/public-api";
import type { AppDictionary, AppLocale } from "@/lib/i18n";
import { withLocalePath } from "@/lib/i18n";
import { ProfileScrollspyNav } from "@/components/profile/ProfileScrollspyNav";
import { SectionHeader } from "@/components/ui/section-header";
import styles from "../home.module.css";

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
    <section id="rl-profile" className={`section-fade-rise mt-20 ${styles.contentSection}`}>
      <SectionHeader
        eyebrow={dictionary.common.profile}
        title={dictionary.homePage.profileTitle}
        className="mb-8"
        actions={(
          <Link href={withLocalePath(locale, "/profile")} className="text-sm font-semibold text-[color:var(--accent)]">
            {dictionary.homePage.profileAction}
          </Link>
        )}
      />

      {profile ? (
        <div className="grid gap-8 lg:grid-cols-[180px_minmax(0,1fr)] lg:gap-12">
          <aside className="h-max border-b border-[color:var(--line)] pb-4 lg:sticky lg:top-24 lg:border-0 lg:pb-0">
            <ProfileScrollspyNav items={navItems} />
          </aside>

          <div className="space-y-10">
            <article id="item-profile" className="border-b border-[color:var(--line)] pb-8">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[color:var(--accent-soft)] text-xl font-semibold text-[color:var(--accent-strong)]">
                  {profile.name.slice(0, 1).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[color:var(--ink)]">{profile.name}</h3>
                  <p className="text-sm text-[color:var(--muted)]">{profile.headline}</p>
                </div>
              </div>
              <p className="mt-4 max-w-3xl leading-relaxed text-[color:var(--muted)]">{profile.about}</p>
            </article>

            <article id="item-jobs">
              <h3 className="text-2xl font-semibold">{dictionary.homePage.jobExperiences}</h3>
              <div className="timeline-list mt-4">
                {profile.experiences.slice(0, 8).map((item) => (
                  <div key={item.id} className="timeline-item">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h4 className="text-lg font-semibold">{item.position}</h4>
                        <p className="text-sm text-[color:var(--muted)]">{item.company?.name || dictionary.homePage.unknownCompany}{item.location ? ` - ${item.location}` : ""}</p>
                      </div>
                      <p className="text-xs font-medium uppercase text-[color:var(--muted)]">
                        {formatExpDate(item.startMonth, item.startYear, item.endMonth, item.endYear, item.isCurrent)}
                      </p>
                    </div>
                    {item.description ? <p className="mt-2 text-sm leading-relaxed text-[color:var(--muted)]">{item.description}</p> : null}
                  </div>
                ))}
                {profile.experiences.length === 0 ? <p className="text-sm text-black/60">{dictionary.homePage.noWorkExperience}</p> : null}
              </div>
            </article>

            <article id="item-education">
              <h3 className="text-2xl font-semibold">{dictionary.homePage.educations}</h3>
              <div className="mt-3">
                {profile.educations.slice(0, 6).map((item) => (
                  <div key={item.id} className="border-t border-[color:var(--line)] py-5 first:border-0 first:pt-0">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h4 className="text-lg font-semibold">{item.institution}</h4>
                          <p className="text-sm text-[color:var(--muted)]">{item.degree || dictionary.homePage.degreeNotSpecified}</p>
                      </div>
                      <p className="text-xs font-medium uppercase text-[color:var(--muted)]">
                        {formatMonthDate(item.startDate)} - {formatMonthDate(item.endDate)}
                      </p>
                    </div>
                    {item.description ? <p className="mt-2 text-sm leading-relaxed text-[color:var(--muted)]">{item.description}</p> : null}
                  </div>
                ))}
                {profile.educations.length === 0 ? <p className="text-sm text-black/60">{dictionary.homePage.noEducation}</p> : null}
              </div>
            </article>

            <article id="item-certificate">
              <h3 className="text-2xl font-semibold">{dictionary.homePage.certificates}</h3>
              <div className="mt-3">
                {profile.certifications.slice(0, 8).map((item) => (
                  <div key={item.id} className="border-t border-[color:var(--line)] py-5 first:border-0 first:pt-0">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h4 className="text-lg font-semibold">{item.title}</h4>
                          <p className="text-sm text-[color:var(--muted)]">{item.issuer || dictionary.homePage.issuerNotSpecified}</p>
                      </div>
                      <p className="text-xs font-medium uppercase text-[color:var(--muted)]">
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
              <h3 className="text-2xl font-semibold">{dictionary.homePage.skills}</h3>
              <div className="mt-4 grid gap-x-8 md:grid-cols-2">
                {profile.skills.slice(0, 12).map((item) => (
                  <div key={item.id} className="border-t border-[color:var(--line)] py-4">
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-xs text-[color:var(--muted)]">{item.level ?? 0}%</p>
                    </div>
                    <div className="h-1 rounded-full bg-black/10">
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
        <div className="border-t border-[color:var(--line)] py-5 text-sm text-[color:var(--muted)]">
          {dictionary.homePage.profileUnavailable}
        </div>
      )}
    </section>
  );
}