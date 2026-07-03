import { PageHeader } from "@/components/page/PageHeader";
import type { AppDictionary } from "@/lib/i18n";

type ArticlesPageHeaderProps = {
  dictionary: AppDictionary;
};

export function ArticlesPageHeader({ dictionary }: ArticlesPageHeaderProps) {
  return <PageHeader eyebrow={dictionary.articlesPage.eyebrow} title={dictionary.articlesPage.title} />;
}