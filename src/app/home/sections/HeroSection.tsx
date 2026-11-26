import Image from "next/image";
import { CtaButtonLink } from "@/components/ui/cta-button";
import type { AppDictionary, AppLocale } from "@/lib/i18n";
import { withLocalePath } from "@/lib/i18n";
import styles from "../home.module.css";

type HeroSectionProps = {
  dictionary: AppDictionary;
  locale: AppLocale;
};

export function HeroSection({ dictionary, locale }: HeroSectionProps) {
  return (
    <section id="rl-hero" className={`section-fade-rise ${styles.heroSection}`}>
      <div className={styles.heroOverlay} />
      <div className={`${styles.heroContent} mx-auto flex w-full max-w-6xl items-center px-6 py-14 md:py-16`}>
        <div className="grid w-full items-center gap-6 md:grid-cols-2">
          <div className={`order-2 mx-auto text-center md:order-1 md:mx-0 md:text-left ${styles.heroCopy}`}>
            <span className={styles.heroBadge}>{dictionary.homePage.heroBadge}</span>
            <h1 className="mt-5 text-4xl font-bold leading-[1.05] text-[color:var(--ink)] sm:text-5xl md:text-[3.75rem]">
              {dictionary.homePage.heroTitleLead}
              <br />
              <span className="bg-gradient-to-r from-[color:var(--accent)] to-[#8b73ef] bg-clip-text text-transparent">{dictionary.homePage.heroTitleAccent}</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-[color:var(--muted)] md:mx-0 md:mt-6 md:text-lg md:leading-8">
              {dictionary.homePage.heroDescription}
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
              <CtaButtonLink href={withLocalePath(locale, "/portfolios")} size="lg">{dictionary.homePage.seeMyPortfolios}</CtaButtonLink>
              <CtaButtonLink href={`${withLocalePath(locale, "/")}#rl-hireme`} size="lg" variant="secondary">{dictionary.homePage.contactAction}</CtaButtonLink>
            </div>
          </div>

          <div className={`order-1 mx-auto w-full max-w-[620px] text-center md:order-2 ${styles.heroArtwork}`}>
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