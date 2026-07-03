import type { AppDictionary } from "@/lib/i18n";

type ProfileAboutSectionProps = {
  about: string;
  dictionary: AppDictionary;
};

export function ProfileAboutSection({ about, dictionary }: ProfileAboutSectionProps) {
  return (
    <article id="item-profile" className="rounded-2xl border border-black/10 bg-[color:var(--paper)] p-6">
      <h2 className="text-2xl font-semibold tracking-tight">{dictionary.profilePage.aboutMe}</h2>
      <p className="mt-4 leading-relaxed text-black/70">{about}</p>
    </article>
  );
}