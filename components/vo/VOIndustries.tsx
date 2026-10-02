import type { Locale } from "@/lib/i18n";

/** Industry application areas from the 2025 company profile. */
const industries = [
  { sector: { en: "Government", ar: "الحكومة" }, title: { en: "Smart city operations", ar: "عمليات المدن الذكية" }, text: { en: "Dashboards for municipal resource management and urban planning.", ar: "لوحات معلومات لإدارة موارد البلديات والتخطيط العمراني." } },
  { sector: { en: "Finance", ar: "المالية" }, title: { en: "Risk and fraud detection", ar: "كشف المخاطر والاحتيال" }, text: { en: "Transaction-pattern analysis and anomaly detection for financial institutions.", ar: "تحليل أنماط المعاملات واكتشاف الحالات الشاذة للمؤسسات المالية." } },
  { sector: { en: "Agriculture", ar: "الزراعة" }, title: { en: "Resource planning", ar: "تخطيط الموارد" }, text: { en: "Water and crop planning using satellite data and predictive models.", ar: "تخطيط المياه والمحاصيل باستخدام بيانات الأقمار الصناعية والنماذج التنبؤية." } },
  { sector: { en: "Retail", ar: "التجزئة" }, title: { en: "Demand forecasting", ar: "التنبؤ بالطلب" }, text: { en: "Inventory and demand prediction for retail and logistics.", ar: "التنبؤ بالمخزون والطلب لقطاعي التجزئة والخدمات اللوجستية." } },
  { sector: { en: "Public sector", ar: "القطاع العام" }, title: { en: "Digital services", ar: "الخدمات الرقمية" }, text: { en: "Citizen-service platforms and cross-department workflows.", ar: "منصات خدمة المواطنين وسير العمل بين الإدارات." } },
  { sector: { en: "Hajj", ar: "الحج" }, title: { en: "Crowd and logistics", ar: "الحشود والخدمات اللوجستية" }, text: { en: "Crowd analytics and logistics planning for mass gatherings.", ar: "تحليلات الحشود وتخطيط الخدمات اللوجستية للتجمعات الكبرى." } },
] as const;

export default function VOIndustries({ l }: { l: Locale }) {
  const ar = l === "ar";
  return <section className="vo-industries" aria-labelledby="vo-industries-title">
    <span className="vo-industries-eyebrow">{ar ? "التطبيقات القطاعية" : "Industry applications"}</span>
    <h2 id="vo-industries-title">{ar ? "أين ينطبق عملنا." : "Where the work applies."}</h2>
    <div className="vo-industries-grid">{industries.map((item) => <article key={item.title.en}>
      <span>{item.sector[l]}</span><h3>{item.title[l]}</h3><p>{item.text[l]}</p>
    </article>)}</div>
    <p className="vo-industries-note">{ar ? "مجالات تطبيق وردت في ملف 2025، وليست دراسات حالة لمشاريع موثقة." : "Application areas described in the 2025 profile. They are not presented as verified project case studies."}</p>
  </section>;
}
