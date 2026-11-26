import type { AppDictionary } from "@/lib/i18n";

type ProfileAboutSectionProps = {
  about: string;
  dictionary: AppDictionary;
};

export function ProfileAboutSection({ about, dictionary }: ProfileAboutSectionProps) {
  return (
    <article id="item-profile" className="border-b border-[color:var(--line)] pb-8">
      <h2 className="text-2xl font-semibold text-[color:var(--ink)]">{dictionary.profilePage.aboutMe}</h2>
      <p className="mt-4 max-w-3xl leading-relaxed text-[color:var(--muted)]">{about}</p>
    </article>
  );
}