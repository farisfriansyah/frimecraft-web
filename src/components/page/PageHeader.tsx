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
    <header className={className}>
      <p className="text-sm uppercase tracking-[0.2em] text-black/55">{eyebrow}</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">{title}</h1>
      {description ? <p className="mt-3 max-w-3xl text-black/70">{description}</p> : null}
      {actions ? <div className="mt-5 flex flex-wrap gap-3">{actions}</div> : null}
    </header>
  );
}