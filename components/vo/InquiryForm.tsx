"use client";

import { useState, type FormEvent } from "react";
import type { Locale } from "@/lib/i18n";

export default function InquiryForm({ l, kind, products = [] }: { l: Locale; kind: "consultant" | "team" | "product" | "ask"; products?: string[] }) {
  const [sent, setSent] = useState(false);
  const ar = l === "ar";
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };
  if (sent) return <div className="vo-form-success" role="status"><span className="vo-check">✓</span><h2>{ar ? "شكرًا لتواصلك معنا." : "Thanks for reaching out."}</h2><p>{ar ? "هذه نسخة استعراضية، ولم تُرسل بياناتك. تواصل معنا مباشرة عبر info@vo.technology." : "This is a preview. Your details were not sent. You can contact us directly at info@vo.technology."}</p><a href="mailto:info@vo.technology">info@vo.technology ↗</a></div>;
  return <form className="vo-form" onSubmit={submit}>
    <label>{ar ? "الاسم الكامل" : "Full name"}<input name="name" autoComplete="name" required placeholder={ar ? "الاسم الكامل" : "Your name"} /></label>
    <label>{ar ? "البريد الإلكتروني" : "Email address"}<input name="email" type="email" autoComplete="email" required placeholder="name@company.com" /></label>
    <label>{ar ? "رقم الهاتف" : "Phone number"}<input name="phone" type="tel" autoComplete="tel" placeholder="+966" /></label>
    {kind === "consultant" && <label>{ar ? "مجال الاستشارة" : "What do you need help with?"}<select name="category" required defaultValue=""><option value="" disabled>{ar ? "اختر المجال" : "Choose a category"}</option>{["Cybersecurity", "Software development", "ERP", "CRM", "Odoo", "Creatio", "Cloud", "Mobile applications"].map((x) => <option key={x}>{x}</option>)}</select></label>}
    {kind === "product" && <label>{ar ? "المنتج" : "Product"}<select name="product" required defaultValue=""><option value="" disabled>{ar ? "اختر المنتج" : "Choose a product"}</option>{products.map((x) => <option key={x}>{x}</option>)}</select></label>}
    {kind === "team" && <label>{ar ? "السيرة الذاتية" : "Your CV"}<input name="cv" type="file" accept=".pdf,.doc,.docx" required /></label>}
    <label className="vo-form-wide">{kind === "team" ? (ar ? "حدثنا عن خبراتك" : "Tell us about your experience") : (ar ? "كيف يمكننا مساعدتك؟" : "Tell us what you need")}<textarea name="message" rows={4} required placeholder={ar ? "اكتب رسالتك هنا" : "Tell us about your project or question"} /></label>
    <button className="vo-action" type="submit">{ar ? "إظهار التأكيد" : "Show confirmation"}<span aria-hidden="true">↗</span></button>
    <p className="vo-form-note">{ar ? "نسخة استعراضية: لن تُرسل أو تُحفظ أي بيانات." : "Preview only: no information is sent or saved."}</p>
  </form>;
}
