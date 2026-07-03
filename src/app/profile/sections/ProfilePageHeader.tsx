import Link from "next/link";
import type { PublicProfileSummary } from "@/types/public-api";
import { PageHeader } from "@/components/page/PageHeader";
import type { AppDictionary } from "@/lib/i18n";

type ProfilePageHeaderProps = {
  profile: PublicProfileSummary;
  dictionary: AppDictionary;
};

export function ProfilePageHeader({ profile, dictionary }: ProfilePageHeaderProps) {
  return (
    <PageHeader
      eyebrow={dictionary.common.profile}
      title={profile.name}
      description={profile.headline}
      className="mb-8 rounded-[2rem] border border-black/10 bg-[color:var(--paper)] p-8 shadow-[0_12px_30px_rgba(0,0,0,0.06)]"
      actions={(
        <>
          <Link href="/#rl-profile" className="rounded-full border border-black/20 bg-white px-5 py-2 text-sm font-semibold transition hover:bg-black hover:text-white">
            {dictionary.profilePage.backToHomeSection}
          </Link>
          <Link href="/portfolios" className="rounded-full bg-black px-5 py-2 text-sm font-semibold text-white">
            {dictionary.profilePage.viewPortfolios}
          </Link>
        </>
      )}
    />
  );
}