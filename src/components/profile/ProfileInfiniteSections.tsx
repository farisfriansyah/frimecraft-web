"use client";

import { useEffect, useRef, useState } from "react";
import type {
  PublicProfileCertification,
  PublicProfileEducation,
  PublicProfileExperience,
  PublicProfileSkill,
} from "@/types/public-api";

type ProfileInfiniteSectionsProps = {
  experiences: PublicProfileExperience[];
  educations: PublicProfileEducation[];
  certifications: PublicProfileCertification[];
  skills: PublicProfileSkill[];
};

function formatExpDate(
  startMonth: number,
  startYear: number,
  endMonth: number | null,
  endYear: number | null,
  isCurrent: boolean,
): string {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const safeStartMonth = Math.max(Math.min(startMonth, 12), 1);
  const start = `${monthNames[safeStartMonth - 1]} ${startYear}`;

  if (isCurrent || endMonth === null || endYear === null) {
    return `${start} - Now`;
  }

  const safeEndMonth = Math.max(Math.min(endMonth, 12), 1);
  return `${start} - ${monthNames[safeEndMonth - 1]} ${endYear}`;
}

function formatMonthDate(value: string | null): string {
  if (!value) return "-";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";

  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function useAutoLoad(total: number, chunkSize: number) {
  const [visibleCount, setVisibleCount] = useState(() => Math.min(chunkSize, total));
  const [isLoading, setIsLoading] = useState(false);
  const triggerRef = useRef<HTMLDivElement | null>(null);

  const safeVisibleCount = Math.min(visibleCount, total);
  const hasMore = safeVisibleCount < total;

  useEffect(() => {
    if (!hasMore || isLoading) return;

    const node = triggerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsLoading(true);
        }
      },
      { rootMargin: "160px 0px" },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [hasMore, isLoading]);

  useEffect(() => {
    if (!isLoading) return;

    const timer = setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + chunkSize, total));
      setIsLoading(false);
    }, 450);

    return () => clearTimeout(timer);
  }, [isLoading, chunkSize, total]);

  return [safeVisibleCount, isLoading, hasMore, triggerRef] as const;
}

function BlockSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white/70 p-5">
      <div className="animate-pulse">
        <div className="h-5 w-2/5 rounded bg-black/10" />
        <div className="mt-3 h-3 w-1/3 rounded bg-black/10" />
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className="mt-2 h-3 rounded bg-black/10"
            style={{ width: `${92 - index * 8}%` }}
          />
        ))}
      </div>
    </div>
  );
}

export function ProfileInfiniteSections({
  experiences,
  educations,
  certifications,
  skills,
}: ProfileInfiniteSectionsProps) {
  const [visibleExperienceCount, experiencesLoading, experiencesHasMore, experiencesTriggerRef] = useAutoLoad(experiences.length, 4);
  const [visibleEducationCount, educationsLoading, educationsHasMore, educationsTriggerRef] = useAutoLoad(educations.length, 3);
  const [visibleCertificationCount, certificationsLoading, certificationsHasMore, certificationsTriggerRef] = useAutoLoad(certifications.length, 4);
  const [visibleSkillCount, skillsLoading, skillsHasMore, skillsTriggerRef] = useAutoLoad(skills.length, 8);

  const visibleExperiences = experiences.slice(0, visibleExperienceCount);
  const visibleEducations = educations.slice(0, visibleEducationCount);
  const visibleCertifications = certifications.slice(0, visibleCertificationCount);
  const visibleSkills = skills.slice(0, visibleSkillCount);

  return (
    <div className="space-y-10">
      <article id="item-jobs">
        <h2 className="text-2xl font-semibold tracking-tight">Job Experiences</h2>
        <div className="mt-4 space-y-4">
          {visibleExperiences.map((item) => (
            <div key={item.id} className="rounded-2xl border border-black/10 bg-white/80 p-5">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 className="text-lg font-semibold">{item.position}</h3>
                  <p className="text-sm text-black/55">
                    {item.company?.name || "Unknown company"}
                    {item.location ? ` - ${item.location}` : ""}
                  </p>
                </div>
                <p className="text-xs uppercase tracking-[0.14em] text-black/50">
                  {formatExpDate(item.startMonth, item.startYear, item.endMonth, item.endYear, item.isCurrent)}
                </p>
              </div>
              {item.description ? <p className="mt-3 text-sm leading-relaxed text-black/68">{item.description}</p> : null}
            </div>
          ))}

          {experiences.length === 0 ? <p className="text-sm text-black/60">Belum ada pengalaman kerja.</p> : null}

          {experiencesLoading ? (
            <>
              <BlockSkeleton lines={3} />
              <BlockSkeleton lines={2} />
            </>
          ) : null}

          {experiencesHasMore ? <div ref={experiencesTriggerRef} className="h-8" /> : null}
        </div>
      </article>

      <article id="item-education">
        <h2 className="text-2xl font-semibold tracking-tight">Educations</h2>
        <div className="mt-4 space-y-4">
          {visibleEducations.map((item) => (
            <div key={item.id} className="rounded-2xl border border-black/10 bg-white/80 p-5">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 className="text-lg font-semibold">{item.institution}</h3>
                  <p className="text-sm text-black/55">{item.degree || "Degree not specified"}</p>
                </div>
                <p className="text-xs uppercase tracking-[0.14em] text-black/50">
                  {formatMonthDate(item.startDate)} - {formatMonthDate(item.endDate)}
                </p>
              </div>
              {item.description ? <p className="mt-3 text-sm leading-relaxed text-black/68">{item.description}</p> : null}
            </div>
          ))}

          {educations.length === 0 ? <p className="text-sm text-black/60">Belum ada data pendidikan.</p> : null}

          {educationsLoading ? (
            <>
              <BlockSkeleton lines={3} />
              <BlockSkeleton lines={2} />
            </>
          ) : null}

          {educationsHasMore ? <div ref={educationsTriggerRef} className="h-8" /> : null}
        </div>
      </article>

      <article id="item-certificate">
        <h2 className="text-2xl font-semibold tracking-tight">Certificates</h2>
        <div className="mt-4 space-y-3">
          {visibleCertifications.map((item) => (
            <div key={item.id} className="rounded-2xl border border-black/10 bg-white/80 p-5">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-black/55">{item.issuer || "Issuer not specified"}</p>
                </div>
                <p className="text-xs uppercase tracking-[0.14em] text-black/50">{formatMonthDate(item.issueDate)}</p>
              </div>
              {item.url ? (
                <a href={item.url} target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm font-semibold text-[color:var(--accent)]">
                  Open certificate
                </a>
              ) : null}
            </div>
          ))}

          {certifications.length === 0 ? <p className="text-sm text-black/60">Belum ada sertifikat.</p> : null}

          {certificationsLoading ? (
            <>
              <BlockSkeleton lines={2} />
              <BlockSkeleton lines={2} />
            </>
          ) : null}

          {certificationsHasMore ? <div ref={certificationsTriggerRef} className="h-8" /> : null}
        </div>
      </article>

      <article id="item-skill">
        <h2 className="text-2xl font-semibold tracking-tight">Skills</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {visibleSkills.map((item) => (
            <div key={item.id} className="rounded-2xl border border-black/10 bg-white/80 p-4">
              <div className="mb-2 flex items-center justify-between gap-2">
                <p className="font-medium">{item.name}</p>
                <p className="text-xs text-black/55">{item.level ?? 0}%</p>
              </div>
              <div className="h-2 rounded-full bg-black/10">
                <div
                  className="h-full rounded-full bg-[color:var(--accent)]"
                  style={{ width: `${Math.max(Math.min(item.level ?? 0, 100), 0)}%` }}
                />
              </div>
            </div>
          ))}

          {skills.length === 0 ? <p className="text-sm text-black/60 md:col-span-2">Belum ada data skill.</p> : null}

          {skillsLoading ? (
            <>
              <BlockSkeleton lines={1} />
              <BlockSkeleton lines={1} />
            </>
          ) : null}
        </div>

        {skillsHasMore ? <div ref={skillsTriggerRef} className="h-8" /> : null}
      </article>
    </div>
  );
}
