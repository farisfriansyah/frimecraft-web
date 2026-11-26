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
    heroBadge: string;
    heroTitleLead: string;
    heroTitleAccent: string;
    heroDescription: string;
    seeMyPortfolios: string;
    contactAction: string;
    whatsappAction: string;
    whatsappPrefill: string;
    upworkAction: string;
    fiverrAction: string;
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
    featuredFilterLabel: string;
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
      poweredBy: "Dibuat dengan ❤️ oleh Frime Craft Studio",
    },
    homePage: {
      heroBadge: "Studio digital · desain & pengembangan",
      heroTitleLead: "Ubah ide menjadi",
      heroTitleAccent: "produk digital yang siap digunakan.",
      heroDescription: "Saya merancang UI/UX dan membangun website serta produk digital. Jelajahi karya pilihan, lalu hubungi saya untuk membahas proyek Anda.",
      seeMyPortfolios: "Lihat portofolio",
      contactAction: "Diskusikan proyek",
      whatsappAction: "Diskusikan via WhatsApp",
      whatsappPrefill: "Halo, saya ingin berdiskusi tentang proyek saya.",
      upworkAction: "Hubungi saya di Upwork",
      fiverrAction: "Lihat layanan di Fiverr",
      aboutTitle: "Dari ide menjadi produk digital",
      aboutBodyOne: "Saya menggabungkan desain, teknologi, dan pemecahan masalah untuk membangun pengalaman digital yang mudah dipahami dan digunakan.",
      aboutBodyTwo: "Portofolio ini menampilkan karya di berbagai bidang, termasuk SaaS, e-learning, CRM, Web3, dan website—serta proses desain dan pengembangan di baliknya.",
      servicesTitle: "Yang Bisa Saya Bantu Bangun",
      profileTitle: "Tentang Saya dan Ringkasan Profesional",
      profileAction: "Buka halaman profil lengkap",
      latestUpdate: "Update Terbaru",
      latestArticlesTitle: "Terbaru dari Jurnal",
      featuredPortfoliosTitle: "Portofolio Unggulan",
      featuredPortfoliosDescription: "Jelajahi proyek pilihan dari berbagai bidang dan lihat bagaimana desain serta pengembangan diterapkan di tiap proyek.",
      hireTitle: "Punya proyek yang ingin Anda wujudkan?",
      hireDescription: "Ceritakan tujuan dan kebutuhan proyek Anda. Kita bisa mulai dengan percakapan singkat untuk melihat bagaimana saya dapat membantu.",
      noFeaturedPortfolio: "Karya pilihan akan segera hadir. Sementara itu, jelajahi semua portofolio.",
      noPublishedArticles: "Artikel baru akan hadir di sini.",
      profileUnavailable: "Ringkasan profil sedang diperbarui.",
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
      featuredFilterLabel: "Filter portofolio unggulan",
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
      english: "English",
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
      poweredBy: "Made with ❤️ by Frime Craft Studio",
    },
    homePage: {
      heroBadge: "Digital studio · design & development",
      heroTitleLead: "Turn ideas into",
      heroTitleAccent: "digital products people can use.",
      heroDescription: "I design user experiences and build websites and digital products. Explore selected work, then get in touch to discuss your project.",
      seeMyPortfolios: "Explore portfolio",
      contactAction: "Discuss a project",
      whatsappAction: "Discuss via WhatsApp",
      whatsappPrefill: "Hi, I'd like to discuss a project.",
      upworkAction: "Contact me on Upwork",
      fiverrAction: "View services on Fiverr",
      aboutTitle: "From ideas to digital products",
      aboutBodyOne: "I bring design, technology, and problem-solving together to build digital experiences that are clear and easy to use.",
      aboutBodyTwo: "This portfolio features work across SaaS, e-learning, CRM, Web3, and websites—along with the design and development behind each project.",
      servicesTitle: "What I Can Help You Build",
      profileTitle: "About Me and Professional Snapshot",
      profileAction: "Open full profile page",
      latestUpdate: "Latest Update",
      latestArticlesTitle: "Fresh From Journal",
      featuredPortfoliosTitle: "Featured Portfolios",
      featuredPortfoliosDescription: "Explore selected projects across industries and see how design and development come together in each one.",
      hireTitle: "Have a project you'd like to bring to life?",
      hireDescription: "Tell me about your goals and project needs. We can start with a short conversation to see how I can help.",
      noFeaturedPortfolio: "Selected work is coming soon. In the meantime, explore all portfolios.",
      noPublishedArticles: "New articles will appear here soon.",
      profileUnavailable: "The professional profile is being updated.",
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
      featuredFilterLabel: "Filter featured portfolios",
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

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const [withoutHash, hash = ""] = normalizedPath.split("#");
  const [pathnamePart, queryPart = ""] = withoutHash.split("?");

  const withoutLocalePrefix = pathnamePart.replace(/^\/(?:id|en)(?=\/|$)/, "") || "/";
  let result = `/${locale}${withoutLocalePrefix === "/" ? "" : withoutLocalePrefix}`;
  if (queryPart) result += `?${queryPart}`;
  if (hash) result += `#${hash}`;

  return result;
}

export function getDictionary(locale: AppLocale): AppDictionary {
  return dictionaries[locale];
}