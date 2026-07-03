import { cookies, headers } from "next/headers";
import type { FrontendSettings } from "@/types/public-api";

export const LOCALE_COOKIE_NAME = "frimecraft_locale";
export const LOCALE_HEADER_NAME = "x-frimecraft-locale";
export const SUPPORTED_LOCALES = ["id", "en"] as const;

export type AppLocale = (typeof SUPPORTED_LOCALES)[number];

export type AppDictionary = {
  common: {
    home: string;
    about: string;
    services: string;
    profile: string;
    portfolio: string;
    articles: string;
    hireMe: string;
    apply: string;
    viewDetails: string;
    readMore: string;
    liveProject: string;
    backToHome: string;
    allPortfolios: string;
    seeAll: string;
    noPreviewImage: string;
    noExcerpt: string;
    noDescription: string;
    client: string;
    work: string;
  };
  header: {
    toggleMenu: string;
    closeMenu: string;
    menuTitle: string;
  };
  footer: {
    poweredBy: string;
  };
  homePage: {
    heroFallback: string;
    seeMyPortfolios: string;
    downloadProposal: string;
    aboutTitle: string;
    aboutBodyOne: string;
    aboutBodyTwo: string;
    servicesTitle: string;
    profileTitle: string;
    profileAction: string;
    latestUpdate: string;
    latestArticlesTitle: string;
    featuredPortfoliosTitle: string;
    featuredPortfoliosDescription: string;
    hireTitle: string;
    hireDescription: string;
    noFeaturedPortfolio: string;
    noPublishedArticles: string;
    profileUnavailable: string;
    jobExperiences: string;
    educations: string;
    certificates: string;
    skills: string;
    unknownCompany: string;
    degreeNotSpecified: string;
    issuerNotSpecified: string;
    openCertificate: string;
    noWorkExperience: string;
    noEducation: string;
    noCertificates: string;
    noSkills: string;
  };
  profilePage: {
    publicProfile: string;
    unavailable: string;
    aboutMe: string;
    backToHomeSection: string;
    viewPortfolios: string;
  };
  articlesPage: {
    eyebrow: string;
    title: string;
    searchPlaceholder: string;
    tagPlaceholder: string;
    filteredTitle: string;
  };
  portfoliosPage: {
    eyebrow: string;
    title: string;
    searchPlaceholder: string;
    tagPlaceholder: string;
    allPortfoliosOption: string;
    featuredOnlyOption: string;
    filteredTitle: string;
  };
  articleDetail: {
    fallbackTitle: string;
  };
  portfolioDetail: {
    fallbackTitle: string;
    backToPortfolios: string;
    detailEyebrow: string;
    overviewTitle: string;
    visitLiveProject: string;
  };
  localeSwitcher: {
    label: string;
    indonesian: string;
    english: string;
  };
};

const dictionaries: Record<AppLocale, AppDictionary> = {
  id: {
    common: {
      home: "Beranda",
      about: "Tentang",
      services: "Layanan",
      profile: "Profil",
      portfolio: "Portofolio",
      articles: "Artikel",
      hireMe: "Hubungi Saya",
      apply: "Terapkan",
      viewDetails: "Lihat detail",
      readMore: "Baca selengkapnya",
      liveProject: "Live project",
      backToHome: "Kembali ke beranda",
      allPortfolios: "Semua portofolio",
      seeAll: "Lihat semua",
      noPreviewImage: "Tidak ada gambar pratinjau",
      noExcerpt: "Belum ada ringkasan.",
      noDescription: "Belum ada deskripsi.",
      client: "Klien",
      work: "Pekerjaan",
    },
    header: {
      toggleMenu: "Buka menu",
      closeMenu: "Tutup menu",
      menuTitle: "Menu",
    },
    footer: {
      poweredBy: "Ditenagai oleh frontend Next.js dan Frimecraft Admin sebagai sumber konten.",
    },
    homePage: {
      heroFallback: "Merancang, membangun, dan menyelesaikan masalah dengan ide kreatif di berbagai jenis proyek.",
      seeMyPortfolios: "Lihat portofolio saya",
      downloadProposal: "Unduh proposal",
      aboutTitle: "Apa itu Frime Craft Studio?",
      aboutBodyOne: "Website ini adalah pusat portofolio yang memuat proyek-proyek di NFT, SaaS, e-learning, CRM, pemerintahan, dan produk pendidikan. Fokusnya adalah eksekusi yang praktis: belajar cepat, menyelesaikan batasan, dan mengirim hasil berkualitas.",
      aboutBodyTwo: "Craft ini menggabungkan keputusan desain, riset UX, dan implementasi frontend/backend. Misinya adalah membangun antarmuka yang modern, intuitif, dan tetap mudah dirawat dalam operasi produk nyata.",
      servicesTitle: "Yang Bisa Saya Bantu Bangun",
      profileTitle: "Tentang Saya dan Ringkasan Profesional",
      profileAction: "Buka halaman profil lengkap",
      latestUpdate: "Update Terbaru",
      latestArticlesTitle: "Terbaru dari Jurnal",
      featuredPortfoliosTitle: "Portofolio Unggulan",
      featuredPortfoliosDescription: "Berikut adalah karya pilihan yang dipublikasikan dari Frimecraft Admin.",
      hireTitle: "Ajak saya berkolaborasi",
      hireDescription: "Terbuka untuk kolaborasi di product design, frontend architecture, dan fullstack execution.",
      noFeaturedPortfolio: "Belum ada portofolio featured. Tandai portofolio sebagai featured di admin untuk menampilkan di sini.",
      noPublishedArticles: "Belum ada artikel publish. Setelah Anda publish artikel dari admin, daftar di sini akan otomatis muncul.",
      profileUnavailable: "Profil publik belum tersedia. Pastikan data experience, education, certification, dan skills sudah terisi di admin.",
      jobExperiences: "Pengalaman Kerja",
      educations: "Pendidikan",
      certificates: "Sertifikat",
      skills: "Keahlian",
      unknownCompany: "Perusahaan tidak diketahui",
      degreeNotSpecified: "Gelar belum ditentukan",
      issuerNotSpecified: "Penerbit belum ditentukan",
      openCertificate: "Buka sertifikat",
      noWorkExperience: "Belum ada pengalaman kerja.",
      noEducation: "Belum ada data pendidikan.",
      noCertificates: "Belum ada sertifikat.",
      noSkills: "Belum ada data skill.",
    },
    profilePage: {
      publicProfile: "Profil Publik",
      unavailable: "Profil publik belum tersedia. Pastikan data profile sudah terisi di admin.",
      aboutMe: "Tentang Saya",
      backToHomeSection: "Kembali ke section beranda",
      viewPortfolios: "Lihat portofolio",
    },
    articlesPage: {
      eyebrow: "Jurnal",
      title: "Artikel Terbaru",
      searchPlaceholder: "Cari judul/konten artikel",
      tagPlaceholder: "Filter tag",
      filteredTitle: "Hasil Pencarian Artikel",
    },
    portfoliosPage: {
      eyebrow: "Portofolio",
      title: "Karya Proyek",
      searchPlaceholder: "Cari portofolio",
      tagPlaceholder: "Filter tag",
      allPortfoliosOption: "Semua portofolio",
      featuredOnlyOption: "Hanya featured",
      filteredTitle: "Hasil Pencarian Portofolio",
    },
    articleDetail: {
      fallbackTitle: "Artikel",
    },
    portfolioDetail: {
      fallbackTitle: "Portofolio",
      backToPortfolios: "Kembali ke portofolio",
      detailEyebrow: "Detail Portofolio",
      overviewTitle: "Gambaran Proyek",
      visitLiveProject: "Kunjungi live project",
    },
    localeSwitcher: {
      label: "Bahasa",
      indonesian: "Indonesia",
      english: "Inggris",
    },
  },
  en: {
    common: {
      home: "Home",
      about: "About",
      services: "Services",
      profile: "Profile",
      portfolio: "Portfolio",
      articles: "Articles",
      hireMe: "Hire Me",
      apply: "Apply",
      viewDetails: "View details",
      readMore: "Read more",
      liveProject: "Live project",
      backToHome: "Back to home",
      allPortfolios: "All portfolios",
      seeAll: "See all",
      noPreviewImage: "No preview image",
      noExcerpt: "No excerpt.",
      noDescription: "No description.",
      client: "Client",
      work: "Work",
    },
    header: {
      toggleMenu: "Toggle menu",
      closeMenu: "Close menu",
      menuTitle: "Menu",
    },
    footer: {
      poweredBy: "Powered by Next.js frontend and Frimecraft Admin as content source.",
    },
    homePage: {
      heroFallback: "Designing, crafting, and solving problems with creative ideas across various project types.",
      seeMyPortfolios: "See My Portfolios",
      downloadProposal: "Download Proposal",
      aboutTitle: "What is Frime Craft Studio?",
      aboutBodyOne: "This website is a portfolio hub containing projects delivered across NFT, SaaS, e-learning, CRM, government, and education products. The focus is practical execution: learn fast, solve constraints, and ship with quality.",
      aboutBodyTwo: "The craft combines design decisions, UX research, and frontend/backend implementation. The mission is to build interfaces that look modern, feel intuitive, and stay maintainable in real product operations.",
      servicesTitle: "What I Can Help You Build",
      profileTitle: "About Me and Professional Snapshot",
      profileAction: "Open full profile page",
      latestUpdate: "Latest Update",
      latestArticlesTitle: "Fresh From Journal",
      featuredPortfoliosTitle: "Featured Portfolios",
      featuredPortfoliosDescription: "Here are selected project works published from Frimecraft Admin.",
      hireTitle: "Hire me to collaborate",
      hireDescription: "Open for collaboration on product design, frontend architecture, and fullstack execution.",
      noFeaturedPortfolio: "No featured portfolios yet. Mark a portfolio as featured in admin to show it here.",
      noPublishedArticles: "No published articles yet. Once you publish articles from admin, the list will appear here automatically.",
      profileUnavailable: "Public profile is not available yet. Make sure experience, education, certification, and skills data are filled in admin.",
      jobExperiences: "Job Experiences",
      educations: "Educations",
      certificates: "Certificates",
      skills: "Skills",
      unknownCompany: "Unknown company",
      degreeNotSpecified: "Degree not specified",
      issuerNotSpecified: "Issuer not specified",
      openCertificate: "Open certificate",
      noWorkExperience: "No work experiences yet.",
      noEducation: "No education data yet.",
      noCertificates: "No certificates yet.",
      noSkills: "No skills data yet.",
    },
    profilePage: {
      publicProfile: "Public Profile",
      unavailable: "Public profile is not available yet. Make sure profile data is filled in admin.",
      aboutMe: "About Me",
      backToHomeSection: "Back to Home Section",
      viewPortfolios: "View Portfolios",
    },
    articlesPage: {
      eyebrow: "Journal",
      title: "Latest Articles",
      searchPlaceholder: "Search article title/content",
      tagPlaceholder: "Filter tag",
      filteredTitle: "Search Articles",
    },
    portfoliosPage: {
      eyebrow: "Portfolio",
      title: "Project Works",
      searchPlaceholder: "Search portfolio",
      tagPlaceholder: "Filter tag",
      allPortfoliosOption: "All portfolios",
      featuredOnlyOption: "Featured only",
      filteredTitle: "Search Portfolios",
    },
    articleDetail: {
      fallbackTitle: "Article",
    },
    portfolioDetail: {
      fallbackTitle: "Portfolio",
      backToPortfolios: "Back to portfolios",
      detailEyebrow: "Portfolio Detail",
      overviewTitle: "Project Overview",
      visitLiveProject: "Visit Live Project",
    },
    localeSwitcher: {
      label: "Language",
      indonesian: "Indonesian",
      english: "English",
    },
  },
};

export function normalizeLocale(value?: string | null): AppLocale {
  if (!value) return "id";
  const short = value.toLowerCase().split(/[-_]/)[0];
  return short === "en" ? "en" : "id";
}

export function withLocalePath(locale: AppLocale, path: string) {
  if (/^(https?:|mailto:|tel:)/.test(path)) return path;
  if (path.startsWith(`#`)) return `/${locale}/${path}`;
  if (path === "/") return `/${locale}`;
  return `/${locale}${path.startsWith("/") ? path : `/${path}`}`;
}

export async function getRequestLocale(settings?: FrontendSettings | null): Promise<AppLocale> {
  const requestHeaders = await headers();
  const headerValue = requestHeaders.get(LOCALE_HEADER_NAME);
  if (headerValue) return normalizeLocale(headerValue);

  const store = await cookies();
  const cookieValue = store.get(LOCALE_COOKIE_NAME)?.value;
  return normalizeLocale(cookieValue || settings?.defaultLocale || "id");
}

export function getDictionary(locale: AppLocale): AppDictionary {
  return dictionaries[locale];
}