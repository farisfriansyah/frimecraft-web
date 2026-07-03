import { CtaButtonExternal } from "@/components/ui/cta-button";
import type { AppDictionary } from "@/lib/i18n";
import styles from "../home.module.css";

type HireMeSectionProps = {
  dictionary: AppDictionary;
};

export function HireMeSection({ dictionary }: HireMeSectionProps) {
  return (
    <section id="rl-hireme" className="section-fade-rise mt-20">
      <div className={`${styles.hirePanel} rounded-xl p-8 md:p-12`}>
        <div className="max-w-xl">
          <h2 className="mb-3 text-5xl font-bold leading-tight">{dictionary.homePage.hireTitle}</h2>
          <p className="mb-4 text-[#848484]">{dictionary.homePage.hireDescription}</p>
          <div className="flex flex-wrap gap-2">
            <CtaButtonExternal href="https://www.upwork.com/freelancers/~01aa058426d4641c68">Upwork</CtaButtonExternal>
            <CtaButtonExternal href="https://www.fiverr.com/farisfriansyah">Fiverr</CtaButtonExternal>
            <CtaButtonExternal href="https://wa.me/6285791006488?text=Hi%20Faris%20Let's%20discuss%20about%20my%20project!">Whatsapp</CtaButtonExternal>
          </div>
        </div>
      </div>
    </section>
  );
}