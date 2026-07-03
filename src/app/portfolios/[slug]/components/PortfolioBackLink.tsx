import Link from "next/link";

export function PortfolioBackLink() {
  return (
    <Link href="/portfolios" className="text-sm font-semibold text-[color:var(--accent)]">
      Back to portfolios
    </Link>
  );
}