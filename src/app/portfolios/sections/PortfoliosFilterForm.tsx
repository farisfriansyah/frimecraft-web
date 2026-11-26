import styles from "../portfolios.module.css";
import { FilterPanel } from "@/components/page/FilterPanel";
import type { AppDictionary } from "@/lib/i18n";

type PortfoliosFilterFormProps = {
  q: string;
  tag: string;
  featured: boolean;
  dictionary: AppDictionary;
};

export function PortfoliosFilterForm({ q, tag, featured, dictionary }: PortfoliosFilterFormProps) {
  return (
    <FilterPanel className={styles.filterForm}>
      <input
        type="text"
        name="q"
        defaultValue={q}
        placeholder={dictionary.portfoliosPage.searchPlaceholder}
        className="rounded-xl border border-[color:var(--line)] bg-[color:var(--fog)] px-4 py-3 text-sm text-[color:var(--ink)] outline-none transition placeholder:text-[color:var(--muted)] focus:border-[color:var(--accent)] focus:bg-white focus:ring-4 focus:ring-[color:var(--accent)]/10"
      />
      <input
        type="text"
        name="tag"
        defaultValue={tag}
        placeholder={dictionary.portfoliosPage.tagPlaceholder}
        className="rounded-xl border border-[color:var(--line)] bg-[color:var(--fog)] px-4 py-3 text-sm text-[color:var(--ink)] outline-none transition placeholder:text-[color:var(--muted)] focus:border-[color:var(--accent)] focus:bg-white focus:ring-4 focus:ring-[color:var(--accent)]/10"
      />
      <select
        name="featured"
        defaultValue={String(featured)}
        className="rounded-xl border border-[color:var(--line)] bg-[color:var(--fog)] px-4 py-3 text-sm text-[color:var(--ink)] outline-none transition focus:border-[color:var(--accent)] focus:bg-white focus:ring-4 focus:ring-[color:var(--accent)]/10"
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