import { SectionHeader } from "@/components/ui/section-header";
import type { AppDictionary } from "@/lib/i18n";

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
    <section id="rl-services" className="section-fade-rise mt-20">
      <SectionHeader
        eyebrow={dictionary.common.services}
        title={dictionary.homePage.servicesTitle}
        titleClassName="font-serif-display text-4xl"
        className="mb-8"
      />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <article
            key={service.title}
            className="rounded-2xl border border-black/10 bg-white/80 p-6 shadow-[0_8px_20px_rgba(0,0,0,0.05)]"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <p className="text-xs uppercase tracking-[0.2em] text-black/45">0{index + 1}</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight">{service.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-black/62">{service.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}