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
        className="rounded-xl border border-[color:var(--line)] bg-[color:var(--fog)] px-4 py-3 text-sm text-[color:var(--ink)] outline-none transition placeholder:text-[color:var(--muted)] focus:border-[color:var(--accent)] focus:bg-white focus:ring-4 focus:ring-[color:var(--accent)]/10"
      />
      <input
        type="text"
        name="tag"
        defaultValue={tag}
        placeholder={dictionary.articlesPage.tagPlaceholder}
        className="rounded-xl border border-[color:var(--line)] bg-[color:var(--fog)] px-4 py-3 text-sm text-[color:var(--ink)] outline-none transition placeholder:text-[color:var(--muted)] focus:border-[color:var(--accent)] focus:bg-white focus:ring-4 focus:ring-[color:var(--accent)]/10"
      />
      <button type="submit" className="rounded-lg bg-[color:var(--accent)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[color:var(--accent-strong)]">
        {dictionary.common.apply}
      </button>
    </FilterPanel>
  );
}