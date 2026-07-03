export type FrontendSettings = {
  siteTitle: string | null;
  siteDescription: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  seoKeywords: string | null;
  canonicalUrl: string | null;
  ogImageUrl: string | null;
  ogImageAlt: string | null;
  organizationName: string | null;
  organizationLogoUrl: string | null;
  defaultAuthorName: string | null;
  defaultLocale: string | null;
  twitterHandle: string | null;
  socialProfileUrls: string | null;
  clarityProjectId: string | null;
  googleSiteVerification: string | null;
  bingSiteVerification: string | null;
  themeColor: string | null;
  footerText: string | null;
  updatedAt: string;
};

export type PublicArticleListItem = {
  id: number;
  title: string;
  slug: string;
  sortNumber: number | null;
  excerpt: string | null;
  featuredImage: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  tags: string | null;
  createdAt: string;
  updatedAt: string;
};

export type PublicArticleDetail = PublicArticleListItem & {
  content: string;
  keywords: string | null;
};

export type Pagination = {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

export type PublicPortfolio = {
  id: number;
  title: string;
  slug: string | null;
  sortNumber: number | null;
  description: string | null;
  imageUrl: string | null;
  projectUrl: string | null;
  tags: string | null;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
  workFor: { name: string } | null;
  workAt: { name: string } | null;
};

export type PublicPortfolioDetail = PublicPortfolio & {
  seoTitle: string | null;
  seoDescription: string | null;
  keywords: string | null;
  authorName: string | null;
};

export type PublicProfileExperience = {
  id: number;
  position: string;
  location: string | null;
  startMonth: number;
  startYear: number;
  endMonth: number | null;
  endYear: number | null;
  isCurrent: boolean;
  description: string | null;
  company: { name: string } | null;
};

export type PublicProfileEducation = {
  id: number;
  institution: string;
  degree: string | null;
  startDate: string | null;
  endDate: string | null;
  description: string | null;
};

export type PublicProfileCertification = {
  id: number;
  title: string;
  issuer: string | null;
  issueDate: string | null;
  url: string | null;
};

export type PublicProfileSkill = {
  id: number;
  name: string;
  level: number | null;
  notes: string | null;
};

export type PublicProfileSummary = {
  id: number;
  name: string;
  email: string;
  avatar: string | null;
  headline: string;
  about: string;
  role: string;
  experiences: PublicProfileExperience[];
  educations: PublicProfileEducation[];
  certifications: PublicProfileCertification[];
  skills: PublicProfileSkill[];
};
