import styles from "../articles.module.css";
import { FilterPanel } from "@/components/page/FilterPanel";
import type { AppDictionary } from "@/lib/i18n";

type ArticlesFilterFormProps = {
  q: string;
  tag: string;
  dictionary: AppDictionary;
};

export function ArticlesFilterForm({ q, tag, dictionary }: ArticlesFilterFormProps) {
  return (
    <FilterPanel className={styles.filterForm}>
      <input
        type="text"
        name="q"
        defaultValue={q}
        placeholder={dictionary.articlesPage.searchPlaceholder}
        className="rounded-xl border border-black/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-[color:var(--accent)]"
      />
      <input
        type="text"
        name="tag"
        defaultValue={tag}
        placeholder={dictionary.articlesPage.tagPlaceholder}
        className="rounded-xl border border-black/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-[color:var(--accent)]"
      />
      <button type="submit" className="rounded-xl bg-black px-4 py-2.5 text-sm font-semibold text-white">
        {dictionary.common.apply}
      </button>
    </FilterPanel>
  );
}