import type { Metadata } from "next";
import { Space_Grotesk, Newsreader } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { getFrontendSettings } from "@/lib/public-api";
import { buildSeoMetadata, buildAbsoluteUrl } from "@/lib/seo";
import { getDictionary } from "@/lib/i18n";
import { getRequestLocale } from "@/lib/i18n.server";

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
    metadataBase: new URL(buildAbsoluteUrl("/", settings)),
    manifest: "/manifest.webmanifest",
    title: {
      default: settings?.seoTitle || settings?.siteTitle || "Frimecraft",
      template: `%s | ${settings?.siteTitle || "Frimecraft"}`,
    },
    appleWebApp: {
      capable: true,
      title: settings?.siteTitle || "Frimecraft",
      statusBarStyle: "default",
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
      ],
      apple: [
        { url: "/favicon.ico", sizes: "180x180" },
      ],
      shortcut: ["/favicon.ico"],
    },
    ...buildSeoMetadata({ settings, path: "/" }),
  };
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getFrontendSettings().catch(() => null);
  const locale = await getRequestLocale(settings);
  const dictionary = getDictionary(locale);

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      className={`${spaceGrotesk.variable} ${newsreader.variable} h-full antialiased`}
    >
      {settings?.clarityProjectId ? (
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "${settings.clarityProjectId}");`}
        </Script>
      ) : null}
      <body className="min-h-full flex flex-col bg-[color:var(--fog)] text-black">
        <SiteHeader locale={locale} dictionary={dictionary} />
        {children}
        <SiteFooter footerText={settings?.footerText} dictionary={dictionary} />
      </body>
    </html>
  );
}
