"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import CountUp from "@/components/home/fx/CountUp";
import type { Locale } from "@/lib/i18n";
import { products, local } from "@/content/vo";

export default function VOFooter({ l }: { l: Locale }) {
  const [confirmed, setConfirmed] = useState(false);
  const ar = l === "ar";
  const submit = (e: FormEvent<HTMLFormElement>) => { e.preventDefault(); setConfirmed(true); };
  return <footer className="vo-home-footer" id="scroll-to-subscribe" style={{ width: "100%", alignSelf: "stretch" }}>
    <div className="vo-home-footer-form">
      <span className="vo-eyebrow">{ar ? "الملف التعريفي" : "COMPANY PROFILE"}</span>
      <h2>{ar ? "تعرّف على فو للتكنولوجيا" : "Get to know VO Technology"}</h2>
      <p>{ar ? "استكشف خدماتنا ومنتجاتنا وقدراتنا في ملفنا التعريفي لعام 2025." : "Explore our services, products and capabilities in the 2025 company profile."}</p>
      {confirmed ? <div role="status"><p>{ar ? "شكرًا لك. لم تُرسل أو تُحفظ بياناتك." : "Thank you. Your information was not sent or saved."}</p><a className="vo-action" href="/vo/VO-Technology-Profile.pdf" download>{ar ? "حمّل الملف التعريفي" : "Download the profile"}<span>↓</span></a></div> : <form onSubmit={submit}><label className="sr-only" htmlFor="vo-email">{ar ? "البريد الإلكتروني" : "Email"}</label><input id="vo-email" name="email" type="email" required placeholder={ar ? "بريدك الإلكتروني" : "Your email"} /><button type="submit">{ar ? "تابع" : "Continue"} ↗</button></form>}
      <small>{ar ? "نسخة استعراضية، لا تُرسل بياناتك إلى أي جهة." : "Preview only. Your email is not transmitted or saved."}</small>
    </div>
    <div className="vo-home-footer-stats">
      <div><span className="vo-eyebrow">{ar ? "قدراتنا" : "OUR REACH"}</span><p>{ar ? "خبراتنا في أرقام" : "The expertise behind our work"}</p></div>
      <div><strong><CountUp end={1800} />+</strong><span>{ar ? "مهارة عبر أطر العمل" : "Framework skills"}</span></div>
      <div><strong><CountUp end={20} />+</strong><span>{ar ? "عميل حكومي ومؤسسي" : "Enterprise clients"}</span></div>
      <div><strong><CountUp end={products.length} /></strong><span>{ar ? "منتجات جاهزة" : "Ready-to-deploy products"}</span></div>
    </div>
    <div className="vo-home-footer-brand">VO Technology</div>
    <div className="vo-home-footer-links"><div><span className="vo-eyebrow">{ar ? "منتجاتنا" : "OUR PRODUCTS"}</span>{products.map((p) => <Link href={`/${l}/solutions-products/${p.id}`} key={p.id}>{local(l, p.name)}</Link>)}</div><div><span className="vo-eyebrow">{ar ? "الشركة" : "COMPANY"}</span><Link href={`/${l}/about`}>{ar ? "من نحن" : "About"}</Link><Link href={`/${l}/creatio`}>Creatio</Link><Link href={`/${l}/get-consultant`}>{ar ? "استشارة" : "Get consultant"}</Link><Link href={`/${l}/join-team`}>{ar ? "انضم لفريقنا" : "Join team"}</Link><Link href={`/${l}/ask`}>{ar ? "اسأل فو" : "Ask VO"}</Link></div><div><span className="vo-eyebrow">{ar ? "تواصل معنا" : "CONTACT"}</span><a href="mailto:info@vo.technology">info@vo.technology</a><a href="tel:+966590088250">+966 59 008 8250</a></div></div>
    <div className="vo-home-footer-bottom"><span>© 2025 VO for Technology. {ar ? "جميع الحقوق محفوظة" : "All rights reserved"}</span><span>{ar ? "طوّره وصمّمه: Hazem Elerefy" : "developed and designed by : Hazem Elerefy"}</span><a href="/vo/VO-Technology-Profile.pdf" download>{ar ? "حمّل ملف الشركة" : "Download company profile"} ↓</a><Link href={`/${l}/ask`}>{ar ? "تواصل معنا" : "Contact us"} ↗</Link></div>
  </footer>;
}
