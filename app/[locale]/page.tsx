import type { Metadata } from "next";
import Home from "@/components/home/Home";
import type { Locale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return { title: locale === "ar" ? "فو للتكنولوجيا | حلول تقنية وذكاء اصطناعي" : "VO for Technology | IT & AI Solutions" };
}

export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return <Home l={locale} />;
}
