import { SectionHeader } from "@/components/ui/section-header";
import type { AppDictionary } from "@/lib/i18n";

type AboutSectionProps = {
  dictionary: AppDictionary;
};

export function AboutSection({ dictionary }: AboutSectionProps) {
  return (
    <section id="rl-about" className="section-fade-rise mt-16">
      <SectionHeader
        eyebrow={dictionary.common.about}
        title={dictionary.homePage.aboutTitle}
        titleClassName="font-serif-display text-4xl"
        className="mb-8"
      />
      <div className="grid gap-5 md:grid-cols-2">
        <article className="rounded-2xl border border-black/10 bg-white/80 p-6 shadow-[0_8px_20px_rgba(0,0,0,0.05)]">
          <p className="text-sm leading-relaxed text-black/68">{dictionary.homePage.aboutBodyOne}</p>
        </article>
        <article className="rounded-2xl border border-black/10 bg-white/80 p-6 shadow-[0_8px_20px_rgba(0,0,0,0.05)]">
          <p className="text-sm leading-relaxed text-black/68">{dictionary.homePage.aboutBodyTwo}</p>
        </article>
      </div>
    </section>
  );
}