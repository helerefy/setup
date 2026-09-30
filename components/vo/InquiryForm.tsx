"use client";

import { useState, type FormEvent } from "react";
import type { Locale } from "@/lib/i18n";

const requirements = [
  ["Cybersecurity", "الأمن السيبراني"], ["Digital marketing", "التسويق الرقمي"],
  ["Software development", "تطوير البرمجيات"], ["ERP", "تخطيط موارد المؤسسات"],
  ["CRM", "إدارة علاقات العملاء"], ["Odoo", "أودو"], ["Creatio", "كرياشو"],
  ["Cloud", "السحابة"], ["Mobile Applications", "تطبيقات الجوال"],
] as const;

function Success({ l }: { l: Locale }) {
  const ar = l === "ar";
  return <div className="vo-form-success" role="status"><span className="vo-check">✓</span><h2>{ar ? "شكرًا لتواصلك معنا." : "Thanks for reaching out."}</h2><p>{ar ? "هذه نسخة استعراضية، ولم تُرسل أو تُحفظ بياناتك. تواصل معنا مباشرة عبر info@vo.technology." : "This is a preview. Your details were not sent or saved. You can contact us directly at info@vo.technology."}</p><a href="mailto:info@vo.technology">info@vo.technology ↗</a></div>;
}

function Note({ l }: { l: Locale }) {
  return <p className="vo-form-note">{l === "ar" ? "نسخة استعراضية: لن تُرسل أو تُحفظ أي بيانات." : "Preview only: no information is sent or saved."}</p>;
}

export default function InquiryForm({ l, kind }: { l: Locale; kind: "consultant" | "product" | "ask" }) {
  const [sent, setSent] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [expanded, setExpanded] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const ar = l === "ar";
  const t = (en: string, arabic: string) => ar ? arabic : en;
  if (sent) return <Success l={l} />;

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (kind === "consultant") {
      const form = new FormData(e.currentTarget);
      const next: Record<string, string> = {};
      if (!String(form.get("name") || "").trim()) next.name = t("Name is required", "الاسم مطلوب");
      if (!selected.length) next.requirement = t("Select at least one requirement", "اختر متطلبًا واحدًا على الأقل");
      const email = String(form.get("email") || "").trim();
      if (!email) next.email = t("Email is required", "البريد مطلوب");
      else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) next.email = t("Enter a valid email", "أدخل بريدًا إلكترونيًا صالحًا");
      if (!String(form.get("phone") || "").trim()) next.phone = t("Phone is required", "الهاتف مطلوب");
      if (!String(form.get("message") || "").trim()) next.message = t("Message is required", "الرسالة مطلوبة");
      setErrors(next);
      if (Object.keys(next).length) return;
    }
    setSent(true);
  };

  const field = (key: string, en: string, arabic: string, type = "text", wide = false) => <label className={wide ? "vo-form-wide" : ""} key={key}>
    {t(en, arabic)}
    <input name={key} type={type} autoComplete={key === "name" ? "name" : key === "email" ? "email" : key === "phone" ? "tel" : undefined} placeholder={t(key === "name" ? "Name" : key === "email" ? "Enter Email" : "Enter Phone", key === "name" ? "الاسم" : key === "email" ? "أدخل البريد الإلكتروني" : "أدخل الهاتف")} required={kind !== "consultant" && key !== "phone"} aria-invalid={!!errors[key]} onInput={() => setErrors((prev) => ({ ...prev, [key]: "" }))} />
    {errors[key] && <span className="vo-form-error" role="alert">{errors[key]}</span>}
  </label>;

  return <form className="vo-form" onSubmit={submit} noValidate={kind === "consultant"}>
    {field("name", kind === "product" ? "Full Name" : "Name", kind === "product" ? "الاسم الكامل" : "الاسم", "text", kind === "ask" || kind === "product")}
    {kind === "consultant" && <div className="vo-requirement">
      <span>{t("Requirement", "المتطلبات")}</span>
      <button type="button" className="vo-requirement-toggle" aria-expanded={expanded} onClick={() => setExpanded((v) => !v)}>{selected.length ? selected.map((s) => requirements.find(([en]) => en === s)?.[ar ? 1 : 0]).join(", ") : t("Nothing selected", "لم يتم اختيار أي شيء")} <span>⌄</span></button>
      {expanded && <div className="vo-requirement-options">{requirements.map(([en, arabic]) => <label key={en}><input type="checkbox" value={en} checked={selected.includes(en)} onChange={() => { setSelected((prev) => prev.includes(en) ? prev.filter((v) => v !== en) : [...prev, en]); setErrors((prev) => ({ ...prev, requirement: "" })); }} />{t(en, arabic)}</label>)}</div>}
      {errors.requirement && <span className="vo-form-error" role="alert">{errors.requirement}</span>}
    </div>}
    {field("email", kind === "product" ? "Email Address" : "Email", "البريد الإلكتروني", "email")}
    {field("phone", kind === "ask" ? "Phone" : "Phone", kind === "ask" ? "رقم الهاتف" : "الهاتف", "tel")}
    <label className="vo-form-wide">{t(kind === "product" ? "Product Details" : "Messages", kind === "product" ? "تفاصيل المنتج" : "الرسائل")}
      <textarea name="message" rows={6} placeholder={t("Description", "الوصف")} required={kind !== "consultant"} aria-invalid={!!errors.message} onInput={() => setErrors((prev) => ({ ...prev, message: "" }))} />
      {errors.message && <span className="vo-form-error" role="alert">{errors.message}</span>}
    </label>
    <button className="vo-action" type="submit">{t(kind === "consultant" ? "Consult me" : kind === "product" ? "Send Request" : "Send Messages", "إرسال الرسائل")}<span aria-hidden="true">↗</span></button>
    <Note l={l} />
  </form>;
}
