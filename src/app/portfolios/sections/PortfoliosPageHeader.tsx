import { PageHeader } from "@/components/page/PageHeader";
import type { AppDictionary } from "@/lib/i18n";

type PortfoliosPageHeaderProps = {
  dictionary: AppDictionary;
};

export function PortfoliosPageHeader({ dictionary }: PortfoliosPageHeaderProps) {
  return <PageHeader eyebrow={dictionary.portfoliosPage.eyebrow} title={dictionary.portfoliosPage.title} />;
}