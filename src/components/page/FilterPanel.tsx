import type { ReactNode } from "react";

type FilterPanelProps = {
  children: ReactNode;
  className?: string;
};

export function FilterPanel({ children, className = "" }: FilterPanelProps) {
  return (
    <form className={`${className} mb-10 grid gap-3 border-b border-[color:var(--line)] pb-6 md:mb-12 md:grid-cols-[minmax(0,1fr)_220px_auto] md:items-center`}>
      {children}
    </form>
  );
}