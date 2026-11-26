import styles from "../portfolios.module.css";
import { FilterPanel } from "@/components/page/FilterPanel";
import type { AppDictionary } from "@/lib/i18n";

type PortfoliosFilterFormProps = {
  q: string;
  tag: string;
  featured: boolean;
  dictionary: AppDictionary;
  onChange: (field: "q" | "tag" | "featured", value: string) => void;
};

export function PortfoliosFilterForm({ q, tag, featured, dictionary, onChange }: PortfoliosFilterFormProps) {
  return (
    <FilterPanel className={styles.filterForm}>
      <input
        type="text"
        name="q"
        value={q}
        onChange={(event) => onChange("q", event.target.value)}
        aria-label={dictionary.portfoliosPage.searchPlaceholder}
        placeholder={dictionary.portfoliosPage.searchPlaceholder}
        className="rounded-xl border border-[color:var(--line)] bg-[color:var(--fog)] px-4 py-3 text-sm text-[color:var(--ink)] outline-none transition placeholder:text-[color:var(--muted)] focus:border-[color:var(--accent)] focus:bg-white focus:ring-4 focus:ring-[color:var(--accent)]/10"
      />
      <input
        type="text"
        name="tag"
        value={tag}
        onChange={(event) => onChange("tag", event.target.value)}
        aria-label={dictionary.portfoliosPage.tagPlaceholder}
        placeholder={dictionary.portfoliosPage.tagPlaceholder}
        className="rounded-xl border border-[color:var(--line)] bg-[color:var(--fog)] px-4 py-3 text-sm text-[color:var(--ink)] outline-none transition placeholder:text-[color:var(--muted)] focus:border-[color:var(--accent)] focus:bg-white focus:ring-4 focus:ring-[color:var(--accent)]/10"
      />
      <select
        name="featured"
        value={String(featured)}
        onChange={(event) => onChange("featured", event.target.value)}
        aria-label={dictionary.portfoliosPage.featuredFilterLabel}
        className={`${styles.featuredSelect} rounded-xl border border-[color:var(--line)] bg-[color:var(--fog)] px-4 py-3 text-sm text-[color:var(--ink)] outline-none transition focus:border-[color:var(--accent)] focus:bg-white focus:ring-4 focus:ring-[color:var(--accent)]/10`}
      >
        <option value="false">{dictionary.portfoliosPage.allPortfoliosOption}</option>
        <option value="true">{dictionary.portfoliosPage.featuredOnlyOption}</option>
      </select>
      <button type="submit" className="rounded-lg bg-[color:var(--accent)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[color:var(--accent-strong)]">
        {dictionary.common.apply}
      </button>
    </FilterPanel>
  );
}