import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { LOCALES, dir, isLocale } from "@/lib/i18n";
import LocaleProvider from "@/components/LocaleProvider";
import ScrollToTop from "@/components/ScrollToTop";
import "@/styles/fonts.css";
import "@/styles/brand-fonts.css";
import "@/styles/home.css";
import "@/styles/vo.css";

export const viewport: Viewport = { width: "device-width", themeColor: "#0B1F3A" };
export const metadata: Metadata = {
  title: "VO for Technology | IT & AI Solutions",
  description: "VO for Technology delivers IT consulting, software engineering and AI-powered solutions to organizations across the Middle East and beyond.",
  metadataBase: new URL("https://vo.technology"),
  icons: {
    icon: [{ url: "/vo/brand/favicon.svg", type: "image/svg+xml" }, { url: "/vo/brand/favicon.ico", sizes: "any" }],
    apple: "/vo/brand/apple-touch-icon.png",
  },
  openGraph: { title: "VO for Technology", description: "Engineering, software, and AI for what's next.", images: [{ url: "/vo/brand/og-image.png", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", images: ["/vo/brand/og-image.png"] },
};
export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <html lang={locale} dir={dir(locale)} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <LocaleProvider locale={locale}><ScrollToTop />{children}</LocaleProvider>
      </body>
    </html>
  );
}
