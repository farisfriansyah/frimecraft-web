import type { AppDictionary } from "@/lib/i18n";

type SiteFooterProps = {
  footerText?: string | null;
  dictionary: AppDictionary;
};

export function SiteFooter({ footerText, dictionary }: SiteFooterProps) {
  return (
    <footer className="mt-16 border-t border-black/10 bg-[color:var(--paper)]/85">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-6 py-8 text-sm text-black/65">
        <p>{footerText || "Frimecraft. Build clear products with sharp execution."}</p>
        <p>{dictionary.footer.poweredBy}</p>
      </div>
    </footer>
  );
}
