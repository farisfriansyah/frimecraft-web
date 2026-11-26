import { SectionHeader } from "@/components/ui/section-header";
import type { AppDictionary } from "@/lib/i18n";
import styles from "../home.module.css";

type AboutSectionProps = {
  dictionary: AppDictionary;
};

export function AboutSection({ dictionary }: AboutSectionProps) {
  return (
    <section id="rl-about" className={`section-fade-rise mt-16 ${styles.contentSection}`}>
      <SectionHeader
        eyebrow={dictionary.common.about}
        title={dictionary.homePage.aboutTitle}
        className="mb-8"
      />
      <div className="grid gap-8 md:grid-cols-2 md:gap-12">
        <p className="max-w-prose text-base leading-7 text-[color:var(--muted)]">{dictionary.homePage.aboutBodyOne}</p>
        <p className="max-w-prose text-base leading-7 text-[color:var(--muted)]">{dictionary.homePage.aboutBodyTwo}</p>
      </div>
    </section>
  );
}