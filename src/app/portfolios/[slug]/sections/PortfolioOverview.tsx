import styles from "../portfolio-detail.module.css";
import type { AppDictionary } from "@/lib/i18n";

type PortfolioOverviewProps = {
  description: string | null;
  tags: string | null;
  projectUrl: string | null;
  dictionary: AppDictionary;
};

export function PortfolioOverview({ description, tags, projectUrl, dictionary }: PortfolioOverviewProps) {
  return (
    <section className="mt-10 border-t border-[color:var(--line)] pt-8">
      <h2 className="text-xl font-semibold text-[color:var(--ink)]">{dictionary.portfolioDetail.overviewTitle}</h2>
      <p className={`${styles.overview} mt-3 text-sm leading-relaxed text-[color:var(--muted)]`}>
        {description || dictionary.common.noDescription}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {(tags || "")
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean)
          .map((tag) => (
            <span key={tag} className="rounded-full border border-[color:var(--line)] bg-[color:var(--fog)] px-3 py-1 text-xs font-medium text-[color:var(--muted)]">
              {tag}
            </span>
          ))}
      </div>

      {projectUrl ? (
        <a
          href={projectUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-block rounded-lg bg-[color:var(--accent)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[color:var(--accent-strong)]"
        >
          {dictionary.portfolioDetail.visitLiveProject}
        </a>
      ) : null}
    </section>
  );
}