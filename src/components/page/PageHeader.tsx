import type { ReactNode } from "react";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
  actions?: ReactNode;
};

export function PageHeader({ eyebrow, title, description, className = "mb-10", actions }: PageHeaderProps) {
  return (
    <header className={`pb-2 ${className}`}>
      <p className="text-xs font-semibold uppercase text-[color:var(--accent-strong)]">{eyebrow}</p>
      <h1 className="mt-3 text-4xl font-semibold text-[color:var(--ink)] md:text-5xl">{title}</h1>
      {description ? <p className="mt-3 max-w-3xl leading-relaxed text-[color:var(--muted)]">{description}</p> : null}
      {actions ? <div className="mt-5 flex flex-wrap gap-3">{actions}</div> : null}
    </header>
  );
}