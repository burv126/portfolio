import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";

import { JsonLd } from "@/components/seo/JsonLd";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { siteConfig } from "@/config/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  keywords: [
    "Full-Stack разработчик",
    "AI разработчик",
    "разработка SaaS",
    "веб-приложения для бизнеса",
    "интеграция LLM",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#060910",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  if (process.env.NODE_ENV === "production" && siteConfig.url.includes("localhost")) {
    console.warn("NEXT_PUBLIC_SITE_URL is not set. Canonical URLs point at localhost.");
  }

  return (
    <html lang="ru" className={`${inter.variable} ${manrope.variable} h-full antialiased`}>
      <body className="min-h-full bg-background text-foreground">
        <a className="skip-link" href="#content">
          Перейти к содержанию
        </a>
        <div className="site-grid pointer-events-none fixed inset-0 z-0" aria-hidden="true" />
        <div className="relative z-10 flex min-h-dvh flex-col">
          <Header />
          <div className="flex flex-1 flex-col">{children}</div>
          <Footer />
        </div>
        <JsonLd />
      </body>
    </html>
  );
}
