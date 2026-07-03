import Image from "next/image";
import { CtaButtonLink } from "@/components/ui/cta-button";
import type { AppDictionary, AppLocale } from "@/lib/i18n";
import { withLocalePath } from "@/lib/i18n";
import styles from "../home.module.css";

type HeroSectionProps = {
  siteDescription: string | null;
  dictionary: AppDictionary;
  locale: AppLocale;
};

export function HeroSection({ siteDescription, dictionary, locale }: HeroSectionProps) {
  return (
    <section id="rl-hero" className={`section-fade-rise ${styles.heroSection}`}>
      <div className={styles.heroOverlay} />
      <div className={`${styles.heroContent} mx-auto flex min-h-[88vh] w-full max-w-6xl items-center px-6 py-10`}>
        <div className="grid w-full items-center gap-6 md:grid-cols-2">
          <div className="order-2 text-center md:order-1 md:text-left">
            <h1 className="text-[3rem] font-bold leading-[1] md:text-[4.5rem] md:leading-[1.05]">
              Frime Craft
              <br />
              Studio
            </h1>
            <p className="mt-5 text-base leading-relaxed md:mt-6 md:text-lg">
              {siteDescription || dictionary.homePage.heroFallback}
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-2 md:justify-start">
              <CtaButtonLink href={withLocalePath(locale, "/#rl-portfolio")} size="lg">{dictionary.homePage.seeMyPortfolios}</CtaButtonLink>
              <CtaButtonLink href={withLocalePath(locale, "/#rl-hireme")} size="lg">{dictionary.homePage.downloadProposal}</CtaButtonLink>
            </div>
          </div>

          <div className="order-1 mx-auto w-full max-w-[620px] text-center md:order-2">
            <Image
              src="/assets/img/main/hero.svg"
              alt="Frimecraft hero illustration"
              width={960}
              height={720}
              priority
              className="h-auto w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}