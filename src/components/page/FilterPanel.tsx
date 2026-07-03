import type { ReactNode } from "react";

type FilterPanelProps = {
  children: ReactNode;
  className?: string;
};

export function FilterPanel({ children, className = "" }: FilterPanelProps) {
  return (
    <form className={`${className} mb-8 grid gap-3 rounded-2xl border border-black/10 bg-white/75 p-4`}>
      {children}
    </form>
  );
}