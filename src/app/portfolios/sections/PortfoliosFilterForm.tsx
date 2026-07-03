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
        className="rounded-xl border border-black/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-[color:var(--accent)]"
      />
      <input
        type="text"
        name="tag"
        defaultValue={tag}
        placeholder={dictionary.portfoliosPage.tagPlaceholder}
        className="rounded-xl border border-black/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-[color:var(--accent)]"
      />
      <select
        name="featured"
        defaultValue={String(featured)}
        className="rounded-xl border border-black/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-[color:var(--accent)]"
      >
        <option value="false">{dictionary.portfoliosPage.allPortfoliosOption}</option>
        <option value="true">{dictionary.portfoliosPage.featuredOnlyOption}</option>
      </select>
      <button type="submit" className="rounded-xl bg-black px-4 py-2.5 text-sm font-semibold text-white">
        {dictionary.common.apply}
      </button>
    </FilterPanel>
  );
}