import type { AppDictionary } from "@/lib/i18n";

type SiteFooterProps = {
  footerText?: string | null;
  dictionary: AppDictionary;
};

export function SiteFooter({ footerText, dictionary }: SiteFooterProps) {
  return (
    <footer className="mt-20 border-t border-[color:var(--line)] bg-white/75">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-6 py-8 text-sm text-[color:var(--muted)] md:flex-row md:items-center md:justify-between">
        <p className="font-medium text-[color:var(--ink)]">{footerText || "Frimecraft. Build clear products with sharp execution."}</p>
        <p>{dictionary.footer.poweredBy}</p>
      </div>
    </footer>
  );
}
