import Link from "next/link";
import type { AppDictionary } from "@/lib/i18n";

type PortfolioBackLinkProps = {
  dictionary: AppDictionary;
};

export function PortfolioBackLink({ dictionary }: PortfolioBackLinkProps) {
  return (
    <Link href="/portfolios" className="text-sm font-semibold text-[color:var(--accent)]">
      {dictionary.portfolioDetail.backToPortfolios}
    </Link>
  );
}