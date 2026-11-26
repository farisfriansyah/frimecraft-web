import { CtaButtonExternal } from "@/components/ui/cta-button";
import type { AppDictionary } from "@/lib/i18n";
import styles from "../home.module.css";

type HireMeSectionProps = {
  dictionary: AppDictionary;
};

export function HireMeSection({ dictionary }: HireMeSectionProps) {
  const whatsappHref = `https://wa.me/6285791006488?text=${encodeURIComponent(dictionary.homePage.whatsappPrefill)}`;

  return (
    <section id="rl-hireme" className="section-fade-rise mt-20 pb-2">
      <div className={`${styles.hirePanel} mx-auto w-[calc(100%-3rem)] max-w-6xl`}>
        <div className="relative z-10 max-w-2xl">
          <h2 className="mb-3 text-3xl font-semibold leading-tight md:text-4xl">{dictionary.homePage.hireTitle}</h2>
          <p className="mb-6 max-w-lg leading-relaxed text-[color:var(--muted)]">{dictionary.homePage.hireDescription}</p>
          <div className="flex flex-wrap gap-3">
            <CtaButtonExternal href={whatsappHref} size="lg">{dictionary.homePage.whatsappAction}</CtaButtonExternal>
            <CtaButtonExternal href="https://www.upwork.com/freelancers/~01aa058426d4641c68" variant="secondary">{dictionary.homePage.upworkAction}</CtaButtonExternal>
            <CtaButtonExternal href="https://www.fiverr.com/farisfriansyah" variant="secondary">{dictionary.homePage.fiverrAction}</CtaButtonExternal>
          </div>
        </div>
      </div>
    </section>
  );
}