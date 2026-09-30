"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "@/components/LocaleProvider";

const services = [
  { path: "/outsourcing", en: "Outsourcing", ar: "التعهيد" },
  { path: "/solutions-products", en: "Solutions & Products", ar: "الحلول والمنتجات" },
  { path: "/data-analysis-ai", en: "Data Analysis & AI", ar: "تحليل البيانات والذكاء الاصطناعي" },
];
const products = [
  { path: "/solutions-products/1", en: "GeoBank", ar: "بنك المعلومات الجغرافي" },
  { path: "/solutions-products/2", en: "Geo Sales Manager", ar: "مدير المبيعات الجغرافي" },
  { path: "/solutions-products/3", en: "Vehicle Tracking", ar: "تتبع المركبات" },
  { path: "/solutions-products/4", en: "GEO ETL", ar: "جيو ETL" },
  { path: "/solutions-products/5", en: "ISignage Pro", ar: "آي ساينج برو" },
  { path: "/solutions-products/6", en: "Automotive ERP", ar: "نظام موارد السيارات" },
  { path: "/solutions-products/7", en: "PMO Cloud", ar: "PMO كلاود" },
  { path: "/solutions-products/8", en: "Correspondence", ar: "إدارة المراسلات" },
];
const pages = [
  { path: "/about", en: "About", ar: "من نحن" },
  { path: "/creatio", en: "Creatio", ar: "كرياشو" },
  { path: "/get-consultant", en: "Consultant", ar: "استشارة" },
  { path: "/join-team", en: "Join Team", ar: "انضم لفريقنا" },
  { path: "/ask", en: "Ask VO", ar: "اسأل فو" },
];

export default function VONav() {
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState<"services" | "products" | "menu" | null>(null);
  useEffect(() => {
    const close = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
  const toggle = (name: typeof open) => setOpen((current) => current === name ? null : name);
  const other = locale === "en" ? "ar" : "en";
  const currentPath = pathname.replace(/^\/(?:en|ar)/, "");
  const label = (item: { en: string; ar: string }) => item[locale];
  return (
    <nav className="vo-nav" aria-label={locale === "en" ? "Main navigation" : "القائمة الرئيسية"} dir={locale === "ar" ? "rtl" : "ltr"}>
      <Link className="vo-nav-logo" href={`/${locale}`} onClick={() => setOpen(null)} aria-label="VO Technology home">VO <span>Technology</span></Link>
      <button className="vo-nav-service" type="button" onClick={() => toggle("services")} aria-expanded={open === "services"}>
        {locale === "en" ? "Our Services" : "خدماتنا"}<span aria-hidden="true">{open === "services" ? "×" : "+"}</span>
      </button>
      <div className="vo-nav-links">
        {pages.map((item) => <Link href={`/${locale}${item.path}`} key={item.path} onClick={() => setOpen(null)}>{label(item)}</Link>)}
        <button type="button" onClick={() => toggle("products")} aria-expanded={open === "products"}>{locale === "en" ? "Products" : "المنتجات"} <span aria-hidden="true">{open === "products" ? "×" : "+"}</span></button>
        <Link href={`/${other}${currentPath}`} hrefLang={other} aria-label={other === "ar" ? "العربية" : "English"}>{other === "ar" ? "عربي" : "EN"}</Link>
      </div>
      <button className="vo-nav-mobile" type="button" onClick={() => toggle("menu")} aria-expanded={open !== null}>{locale === "en" ? "Menu" : "القائمة"} <span aria-hidden="true">{open ? "×" : "+"}</span></button>
      {open && <div className={`vo-nav-panel vo-nav-panel-${open}`}>
        {open === "menu" ? <>
          <button type="button" onClick={() => setOpen("services")}>{locale === "en" ? "Our Services" : "خدماتنا"} <span>+</span></button>
          <button type="button" onClick={() => setOpen("products")}>{locale === "en" ? "Products" : "المنتجات"} <span>+</span></button>
          {pages.map((item) => <Link href={`/${locale}${item.path}`} key={item.path} onClick={() => setOpen(null)}>{label(item)}</Link>)}
          <Link href={`/${other}${currentPath}`} hrefLang={other}>{other === "ar" ? "عربي" : "English"}</Link>
        </> : <>
          <button className="vo-nav-back" type="button" onClick={() => setOpen("menu")}>{locale === "en" ? "← Back" : "رجوع →"}</button>
          {(open === "services" ? services : products).map((item, i) => <Link href={`/${locale}${item.path}`} key={item.path} onClick={() => setOpen(null)}>{label(item)}<span>{String(i + 1).padStart(2, "0")}</span></Link>)}
        </>}
      </div>}
    </nav>
  );
}
