import Link from "next/link";
import type { PublicProfileSummary } from "@/types/public-api";
import { PageHeader } from "@/components/page/PageHeader";
import { withLocalePath, type AppDictionary, type AppLocale } from "@/lib/i18n";

type ProfilePageHeaderProps = {
  profile: PublicProfileSummary;
  dictionary: AppDictionary;
  locale: AppLocale;
};

export function ProfilePageHeader({ profile, dictionary, locale }: ProfilePageHeaderProps) {
  return (
    <PageHeader
      eyebrow={dictionary.common.profile}
      title={profile.name}
      description={profile.headline}
      className="mx-auto mb-2 w-full max-w-6xl"
      actions={(
        <>
          <Link href={withLocalePath(locale, "/")} className="py-2 text-sm font-semibold text-[color:var(--muted)] hover:text-[color:var(--accent-strong)]">
            {dictionary.profilePage.backToHomeSection}
          </Link>
          <Link href={withLocalePath(locale, "/portfolios")} className="rounded-lg bg-[color:var(--accent)] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[color:var(--accent-strong)]">
            {dictionary.profilePage.viewPortfolios}
          </Link>
        </>
      )}
    />
  );
}