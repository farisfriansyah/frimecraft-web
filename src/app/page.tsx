import Link from "next/link";
import Image from "next/image";
import {
  getFrontendSettings,
  getPublicArticles,
  getPublicProfileSummary,
  getPublicPortfolios,
} from "@/lib/public-api";
import { ProfileScrollspyNav } from "@/components/profile/ProfileScrollspyNav";
import { CtaButtonExternal, CtaButtonLink } from "@/components/ui/cta-button";
import { SectionHeader } from "@/components/ui/section-header";

export const revalidate = 90;

export default async function Home() {
  const [settings, articlesResponse, portfoliosResponse, profile] = await Promise.all([
    getFrontendSettings().catch(() => null),
    getPublicArticles(1, 3).catch(() => ({ items: [], pagination: { page: 1, pageSize: 3, total: 0, totalPages: 1 } })),
    getPublicPortfolios(true, 1, 6).catch(() => ({ items: [], pagination: { page: 1, pageSize: 6, total: 0, totalPages: 1 } })),
    getPublicProfileSummary().catch(() => null),
  ]);

  const latestArticles = articlesResponse.items;
  const featuredPortfolios = portfoliosResponse.items;
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const formatExpDate = (startMonth: number, startYear: number, endMonth: number | null, endYear: number | null, isCurrent: boolean) => {
    const start = `${monthNames[Math.max(Math.min(startMonth, 12), 1) - 1]} ${startYear}`;
    const end = isCurrent || endMonth === null || endYear === null
      ? "Now"
      : `${monthNames[Math.max(Math.min(endMonth, 12), 1) - 1]} ${endYear}`;
    return `${start} - ${end}`;
  };

  const formatMonthDate = (value: string | null) => {
    if (!value) return "-";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "-";
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };
  const services = [
    {
      title: "Web Designer",
      description: "Modern visual-first interfaces with strong UI hierarchy and clarity.",
    },
    {
      title: "UI/UX Designer",
      description: "Product flows designed through real problem-solving and user behavior patterns.",
    },
    {
      title: "Frontend Developer",
      description: "Production-grade frontend architecture with reusable components and fast delivery.",
    },
    {
      title: "Backend Developer",
      description: "Structured API and data models that remain maintainable as product scope grows.",
    },
    {
      title: "Web3 & NFT",
      description: "Smart-contract and Web3 product collaboration for experimental and emerging ideas.",
    },
    {
      title: "Other Explorations",
      description: "Constantly exploring new stacks and workflows to solve unfamiliar problems quickly.",
    },
  ];

  const profileNavItems = [
    { id: "item-profile", label: "About Me" },
    { id: "item-jobs", label: "Job Experiences" },
    { id: "item-education", label: "Educations" },
    { id: "item-certificate", label: "Certificates" },
    { id: "item-skill", label: "Skills" },
  ];

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 py-14 lg:py-20">
      <section
        id="rl-hero"
        className="section-fade-rise relative min-h-[88vh] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/assets/img/main/bg.png')" }}
      >
        <div className="absolute inset-0 bg-white/80" />
        <div className="relative mx-auto flex min-h-[88vh] w-full max-w-6xl items-center px-6 py-10">
          <div className="grid w-full items-center gap-6 md:grid-cols-2">
            <div className="order-2 text-center md:order-1 md:text-left">
              <h1 className="text-[3rem] font-bold leading-[1] md:text-[4.5rem] md:leading-[1.05]">
                Frime Craft
                <br />
                Studio
              </h1>
              <p className="mt-5 text-base leading-relaxed md:mt-6 md:text-lg">
                {settings?.siteDescription ||
                  "Designing, crafting, and solving problems with creative ideas across various project types."}
              </p>

              <div className="mt-7 flex flex-wrap justify-center gap-2 md:justify-start">
                <CtaButtonLink href="#rl-portfolio" size="lg">See My Portfolios</CtaButtonLink>

                <CtaButtonLink href="#rl-hireme" size="lg">Download Proposal</CtaButtonLink>
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

      <section id="rl-about" className="section-fade-rise mt-16">
        <SectionHeader
          eyebrow="About"
          title="What is Frime Craft Studio?"
          titleClassName="font-serif-display text-4xl"
          className="mb-8"
        />
        <div className="grid gap-5 md:grid-cols-2">
          <article
            className="rounded-2xl border border-black/10 bg-white/80 p-6 shadow-[0_8px_20px_rgba(0,0,0,0.05)]"
          >
            <p className="text-sm leading-relaxed text-black/68">
              This website is a portfolio hub containing projects delivered across NFT, SaaS, e-learning,
              CRM, government, and education products. The focus is practical execution: learn fast,
              solve constraints, and ship with quality.
            </p>
          </article>
          <article className="rounded-2xl border border-black/10 bg-white/80 p-6 shadow-[0_8px_20px_rgba(0,0,0,0.05)]">
            <p className="text-sm leading-relaxed text-black/68">
              The craft combines design decisions, UX research, and frontend/backend implementation.
              The mission is to build interfaces that look modern, feel intuitive, and stay maintainable
              in real product operations.
            </p>
          </article>
        </div>
      </section>

      <section id="rl-services" className="section-fade-rise mt-20">
        <SectionHeader
          eyebrow="Services"
          title="What I Can Help You Build"
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

      <section id="rl-profile" className="section-fade-rise mt-20 rounded-[2rem] border border-black/10 bg-white/72 p-6 lg:p-8">
        <SectionHeader
          eyebrow="Profile"
          title="About Me and Professional Snapshot"
          titleClassName="font-serif-display text-4xl"
          className="mb-8"
          actions={(
            <Link href="/profile" className="text-sm font-semibold text-[color:var(--accent)]">
              Open full profile page
            </Link>
          )}
        />

        {profile ? (
          <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
            <aside className="h-max rounded-2xl border border-black/10 bg-[color:var(--paper)] p-4 lg:sticky lg:top-20">
              <ProfileScrollspyNav items={profileNavItems} />
            </aside>

            <div className="space-y-10">
              <article id="item-profile" className="rounded-2xl border border-black/10 bg-[color:var(--paper)] p-6">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black/10 text-xl font-semibold">
                    {profile.name.slice(0, 1).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold tracking-tight">{profile.name}</h3>
                    <p className="text-sm text-black/55">{profile.headline}</p>
                  </div>
                </div>
                <p className="mt-4 leading-relaxed text-black/70">{profile.about}</p>
              </article>

              <article id="item-jobs">
                <h3 className="text-2xl font-semibold tracking-tight">Job Experiences</h3>
                <div className="mt-4 space-y-4">
                  {profile.experiences.slice(0, 8).map((item) => (
                    <div key={item.id} className="rounded-2xl border border-black/10 bg-white/80 p-5">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <h4 className="text-lg font-semibold">{item.position}</h4>
                          <p className="text-sm text-black/55">{item.company?.name || "Unknown company"}{item.location ? ` - ${item.location}` : ""}</p>
                        </div>
                        <p className="text-xs uppercase tracking-[0.14em] text-black/50">
                          {formatExpDate(item.startMonth, item.startYear, item.endMonth, item.endYear, item.isCurrent)}
                        </p>
                      </div>
                      {item.description ? <p className="mt-3 text-sm leading-relaxed text-black/68">{item.description}</p> : null}
                    </div>
                  ))}
                  {profile.experiences.length === 0 ? <p className="text-sm text-black/60">Belum ada pengalaman kerja.</p> : null}
                </div>
              </article>

              <article id="item-education">
                <h3 className="text-2xl font-semibold tracking-tight">Educations</h3>
                <div className="mt-4 space-y-4">
                  {profile.educations.slice(0, 6).map((item) => (
                    <div key={item.id} className="rounded-2xl border border-black/10 bg-white/80 p-5">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <h4 className="text-lg font-semibold">{item.institution}</h4>
                          <p className="text-sm text-black/55">{item.degree || "Degree not specified"}</p>
                        </div>
                        <p className="text-xs uppercase tracking-[0.14em] text-black/50">
                          {formatMonthDate(item.startDate)} - {formatMonthDate(item.endDate)}
                        </p>
                      </div>
                      {item.description ? <p className="mt-3 text-sm leading-relaxed text-black/68">{item.description}</p> : null}
                    </div>
                  ))}
                  {profile.educations.length === 0 ? <p className="text-sm text-black/60">Belum ada data pendidikan.</p> : null}
                </div>
              </article>

              <article id="item-certificate">
                <h3 className="text-2xl font-semibold tracking-tight">Certificates</h3>
                <div className="mt-4 space-y-3">
                  {profile.certifications.slice(0, 8).map((item) => (
                    <div key={item.id} className="rounded-2xl border border-black/10 bg-white/80 p-5">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <h4 className="text-lg font-semibold">{item.title}</h4>
                          <p className="text-sm text-black/55">{item.issuer || "Issuer not specified"}</p>
                        </div>
                        <p className="text-xs uppercase tracking-[0.14em] text-black/50">
                          {formatMonthDate(item.issueDate)}
                        </p>
                      </div>
                      {item.url ? (
                        <a href={item.url} target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm font-semibold text-[color:var(--accent)]">
                          Open certificate
                        </a>
                      ) : null}
                    </div>
                  ))}
                  {profile.certifications.length === 0 ? <p className="text-sm text-black/60">Belum ada sertifikat.</p> : null}
                </div>
              </article>

              <article id="item-skill">
                <h3 className="text-2xl font-semibold tracking-tight">Skills</h3>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  {profile.skills.slice(0, 12).map((item) => (
                    <div key={item.id} className="rounded-2xl border border-black/10 bg-white/80 p-4">
                      <div className="mb-2 flex items-center justify-between gap-2">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-xs text-black/55">{item.level ?? 0}%</p>
                      </div>
                      <div className="h-2 rounded-full bg-black/10">
                        <div className="h-full rounded-full bg-[color:var(--accent)]" style={{ width: `${Math.max(Math.min(item.level ?? 0, 100), 0)}%` }} />
                      </div>
                    </div>
                  ))}
                  {profile.skills.length === 0 ? <p className="text-sm text-black/60">Belum ada data skill.</p> : null}
                </div>
              </article>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-black/25 bg-white/60 p-6 text-sm text-black/60">
            Profil publik belum tersedia. Pastikan data experience, education, certification, dan skills sudah terisi di admin.
          </div>
        )}
      </section>

      <section id="rl-portfolio" className="section-fade-rise mt-20">
        <SectionHeader
          eyebrow="Portfolio"
          title="Featured Portfolios"
          description="Here are selected project works published from Frimecraft Admin."
          actions={(
            <Link href="/portfolios" className="text-sm font-semibold text-[color:var(--accent)]">
              All portfolios
            </Link>
          )}
        />
        <div className="grid gap-5 md:grid-cols-3">
          {featuredPortfolios.map((item) => (
            <article key={item.id} className="overflow-hidden rounded-2xl border border-black/10 bg-[color:var(--paper)]">
              {item.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.imageUrl} alt={item.title} className="h-44 w-full object-cover" />
              ) : (
                <div className="flex h-44 items-center justify-center bg-black/5 text-sm text-black/45">No preview image</div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-semibold leading-tight">{item.title}</h3>
                <p className="mt-2 text-sm text-black/62">
                  {(item.workFor?.name || "Client") + " / " + (item.workAt?.name || "Work")}
                </p>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-black/62">
                  {item.description || "No description."}
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {item.slug ? (
                    <Link href={`/portfolios/${item.slug}`} className="inline-block text-sm font-semibold text-[color:var(--accent)]">
                      View details
                    </Link>
                  ) : null}
                  {item.projectUrl ? (
                    <a
                      href={item.projectUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block text-sm font-semibold text-black/70"
                    >
                      Live project
                    </a>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
          {featuredPortfolios.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-black/25 bg-white/60 p-6 text-sm text-black/60 md:col-span-3">
              Belum ada portfolio featured. Tandai portfolio sebagai featured di admin untuk menampilkan di sini.
            </div>
          ) : null}
        </div>
      </section>

      <section id="rl-articles" className="section-fade-rise mt-20">
        <SectionHeader
          eyebrow="Latest Update"
          title="Fresh From Journal"
          actions={(
            <Link href="/articles" className="text-sm font-semibold text-[color:var(--accent)]">
              See all
            </Link>
          )}
        />
        <div className="grid gap-5 md:grid-cols-3">
          {latestArticles.map((article) => (
            <article key={article.id} className="rounded-2xl border border-black/10 bg-[color:var(--paper)] p-6">
              <p className="text-xs uppercase tracking-[0.18em] text-black/45">
                {new Date(article.createdAt).toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>
              <h3 className="mt-3 text-xl font-semibold leading-tight">{article.title}</h3>
              <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-black/62">
                {article.excerpt || "No excerpt."}
              </p>
              <Link href={`/articles/${article.slug}`} className="mt-4 inline-block text-sm font-semibold text-[color:var(--accent)]">
                Read more
              </Link>
            </article>
          ))}
          {latestArticles.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-black/25 bg-white/60 p-6 text-sm text-black/60 md:col-span-3">
              Belum ada artikel publish. Setelah Anda publish artikel dari admin, daftar di sini akan otomatis muncul.
            </div>
          ) : null}
        </div>
      </section>

      <section id="rl-hireme" className="section-fade-rise mt-20">
        <div
          className="rounded-xl bg-[#f1f1f1] bg-[url('/assets/img/main/hire.png')] bg-right-bottom bg-no-repeat p-8 md:p-12"
          style={{ backgroundSize: "50% auto" }}
        >
          <div className="max-w-xl">
            <h2 className="mb-3 text-5xl font-bold leading-tight">Hire me to collaborate</h2>
            <p className="mb-4 text-[#848484]">
              Open for collaboration on product design, frontend architecture, and fullstack execution.
            </p>
            <div className="flex flex-wrap gap-2">
              <CtaButtonExternal href="https://www.upwork.com/freelancers/~01aa058426d4641c68">Upwork</CtaButtonExternal>
              <CtaButtonExternal href="https://www.fiverr.com/farisfriansyah">Fiverr</CtaButtonExternal>
              <CtaButtonExternal href="https://wa.me/6285791006488?text=Hi%20Faris%20Let's%20discuss%20about%20my%20project!">Whatsapp</CtaButtonExternal>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
