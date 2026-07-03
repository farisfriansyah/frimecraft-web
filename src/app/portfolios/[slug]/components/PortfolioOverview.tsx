import styles from "../portfolio-detail.module.css";

type PortfolioOverviewProps = {
  description: string | null;
  tags: string | null;
  projectUrl: string | null;
};

export function PortfolioOverview({ description, tags, projectUrl }: PortfolioOverviewProps) {
  return (
    <section className="mt-8 rounded-2xl border border-black/10 bg-white/80 p-6">
      <h2 className="text-xl font-semibold">Project Overview</h2>
      <p className={`${styles.overview} mt-3 text-sm leading-relaxed text-black/68`}>
        {description || "No description provided."}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {(tags || "")
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean)
          .map((tag) => (
            <span key={tag} className="rounded-full border border-black/15 bg-black/5 px-3 py-1 text-xs font-medium">
              {tag}
            </span>
          ))}
      </div>

      {projectUrl ? (
        <a
          href={projectUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-block rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white"
        >
          Visit Live Project
        </a>
      ) : null}
    </section>
  );
}