import type { Metadata } from "next";
import { Space_Grotesk, Newsreader } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { getFrontendSettings } from "@/lib/public-api";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getFrontendSettings().catch(() => null);

  return {
    metadataBase: new URL("https://frimecraft.com"),
    title: {
      default: settings?.seoTitle || settings?.siteTitle || "Frimecraft",
      template: `%s | ${settings?.siteTitle || "Frimecraft"}`,
    },
    description:
      settings?.seoDescription ||
      settings?.siteDescription ||
      "Frimecraft digital profile and journal.",
    keywords: settings?.seoKeywords || undefined,
    alternates: {
      canonical: settings?.canonicalUrl || "https://frimecraft.com",
    },
    openGraph: {
      title: settings?.seoTitle || settings?.siteTitle || "Frimecraft",
      description: settings?.seoDescription || settings?.siteDescription || undefined,
      images: settings?.ogImageUrl ? [settings.ogImageUrl] : undefined,
    },
  };
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getFrontendSettings().catch(() => null);

  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${newsreader.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[color:var(--fog)] text-black">
        <SiteHeader />
        {children}
        <SiteFooter footerText={settings?.footerText} />
      </body>
    </html>
  );
}
