import { SectionHeader } from "@/components/ui/section-header";
import type { AppDictionary } from "@/lib/i18n";
import styles from "../home.module.css";

type ServiceItem = {
  title: string;
  description: string;
};

type ServicesSectionProps = {
  services: ServiceItem[];
  dictionary: AppDictionary;
};

export function ServicesSection({ services, dictionary }: ServicesSectionProps) {
  return (
    <section id="rl-services" className={`section-fade-rise mt-20 ${styles.contentSection}`}>
      <SectionHeader
        eyebrow={dictionary.common.services}
        title={dictionary.homePage.servicesTitle}
        className="mb-8"
      />
      <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <article
            key={service.title}
            className={styles.serviceItem}
          >
            <span className={styles.serviceNumber}>0{index + 1}</span>
            <h3 className="mt-4 text-xl font-semibold text-[color:var(--ink)]">{service.title}</h3>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-[color:var(--muted)]">{service.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}