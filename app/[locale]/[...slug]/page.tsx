import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, LOCALES, type Locale } from "@/lib/i18n";
import { products, services, local } from "@/content/vo";
import { AboutPage, ConfirmationPage, InquiryPage, ProductPage, ServicePage } from "@/components/vo/Pages";
import CreatioPage from "@/components/vo/CreatioPage";
import JoinTeamPage from "@/components/vo/JoinTeamPage";

const routes = ["about", "creatio", "get-consultant", "join-team", "request-product", "ask", "confirmation-page", ...services.map((s) => s.path), ...products.map((p) => `solutions-products/${p.id}`)];
export const dynamicParams = false;
export function generateStaticParams() {
  return LOCALES.flatMap((locale) => routes.map((route) => ({ locale, slug: route.split("/") })));
}
type Props = { params: Promise<{ locale: string; slug: string[] }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const route = slug.join("/");
  const label = {
    about: { en: "About VO", ar: "عن فو" },
    creatio: { en: "Creatio", ar: "كرياشو" },
    "get-consultant": { en: "Get Consultant", ar: "احصل على استشارة" },
    "join-team": { en: "Join VO Team", ar: "انضم إلى فريق فو" },
    "request-product": { en: "Request Product", ar: "اطلب منتجًا" },
    ask: { en: "Ask VO", ar: "اسأل فو" },
    "confirmation-page": { en: "Thank You", ar: "شكرًا لك" },
  }[route];
  const title = services.find((s) => s.path === route)?.name ?? products.find((p) => slug[0] === "solutions-products" && p.id === slug[1])?.name ?? label;
  return { title: `${isLocale(locale) && title ? local(locale, title) : "VO for Technology"} | VO Technology` };
}
export default async function Page({ params }: Props) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const l: Locale = locale;
  const route = slug.join("/");
  if (route === "about") return <AboutPage l={l} />;
  if (route === "creatio") return <CreatioPage l={l} />;
  if (route === "join-team") return <JoinTeamPage l={l} />;
  if (route === "confirmation-page") return <ConfirmationPage l={l} />;
  const kind = { "get-consultant": "consultant", "request-product": "product", ask: "ask" } as const;
  if (route in kind) return <InquiryPage l={l} kind={kind[route as keyof typeof kind]} />;
  if (services.some((s) => s.path === route)) return <ServicePage l={l} slug={route} />;
  if (slug[0] === "solutions-products" && products.some((p) => p.id === slug[1])) return <ProductPage l={l} id={slug[1]} />;
  notFound();
}
