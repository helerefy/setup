import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { LOCALES, dir, isLocale } from "@/lib/i18n";
import LocaleProvider from "@/components/LocaleProvider";
import ScrollToTop from "@/components/ScrollToTop";
import "@/styles/fonts.css";
import "@/styles/home.css";
import "@/styles/vo.css";

export const viewport: Viewport = { width: "device-width" };
export const metadata: Metadata = {
  title: "VO for Technology | IT & AI Solutions",
  description: "VO for Technology delivers IT consulting, software engineering and AI-powered solutions to organizations across the Middle East and beyond.",
  icons: { icon: "/vo/logo.png" },
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
