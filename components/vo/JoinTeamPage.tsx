"use client";

import { useRef, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { PageShell } from "./Pages";

export default function JoinTeamPage({ l }: { l: Locale }) {
  const ar = l === "ar";
  const t = (en: string, arabic: string) => ar ? arabic : en;
  const input = useRef<HTMLInputElement>(null);
  const [filename, setFilename] = useState("");
  const [category, setCategory] = useState("");
  const [jobType, setJobType] = useState("");
  const [level, setLevel] = useState("");
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(1000000);
  const visible = (!category || category === "backend") && (!jobType || jobType === "remote") && (!level || level === "senior") && min <= 160000 && max >= 145000;
  const clear = () => { setCategory(""); setJobType(""); setLevel(""); setMin(0); setMax(1000000); };
  return <PageShell l={l}>
    <section className="vo-page-hero vo-join-hero"><div className="vo-page-intro"><span className="vo-eyebrow">{t("JOIN VO TEAM", "انضم إلى فريق فو")}</span><h1>{t("Find Your Perfect Job — Upload Your CV", "اكتشف وظيفتك المثالية — ارفع سيرتك الذاتية")}</h1><p>{t("Upload your CV and let us review it to find the most suitable job opportunities for you. You’ll receive a detailed report with matching positions directly to your email.", "ارفع سيرتك الذاتية ودعنا نراجعها لاختيار أفضل فرص العمل المناسبة لك. سنرسل لك تقريرًا تفصيليًا يحتوي على الوظائف المتوافقة مع خبراتك عبر البريد الإلكتروني.")}</p><div className="vo-upload" id="upload-cv"><input ref={input} type="file" accept=".pdf" aria-label={t("Upload CV PDF", "ارفع سيرتك الذاتية PDF")} onChange={(e) => setFilename(e.target.files?.[0]?.name ?? "")} /><button className="vo-action" type="button" onClick={() => input.current?.click()}>{t("Upload CV", "ارفع سيرتك الذاتية")} <span>↗</span></button>{filename && <p role="status">{t("Selected", "تم اختيار")}: {filename}. {t("Preview only — this file has not been uploaded or saved.", "نسخة استعراضية — لم يُرفع الملف أو يُحفظ.")}</p>}</div></div><div className="vo-page-hero-media"><img src="/vo/team.png" alt="" /></div></section>
    <section className="vo-jobs"><div className="vo-jobs-header"><span className="vo-eyebrow">{t("OPEN POSITIONS", "الوظائف المتاحة")}</span><h2>{t("Work that moves us forward.", "عمل يدفعنا للأمام.")}</h2><p>{visible ? "1" : "0"} {t("Jobs available", "وظائف متاحة")}</p></div><div className="vo-jobs-layout"><details className="vo-job-filters" open><summary>{t("All Filters", "كل الفلاتر")}</summary><label>{t("Category", "الفئة")}<select value={category} onChange={(e) => setCategory(e.target.value)}><option value="">{t("All categories", "كل الفئات")}</option><option value="backend">{t("Backend Developer", "مطور Backend")} (1)</option></select></label><div className="vo-job-salary"><span>{t("Salary", "الراتب")}</span><div><label>{t("Min Salary", "الحد الأدنى")}<input type="number" min={0} max={1000000} value={min} onChange={(e) => setMin(Number(e.target.value))} /></label><label>{t("Max Salary", "الحد الأقصى")}<input type="number" min={0} max={1000000} value={max} onChange={(e) => setMax(Number(e.target.value))} /></label></div></div><label>{t("Job Type", "نوع الوظيفة")}<select value={jobType} onChange={(e) => setJobType(e.target.value)}><option value="">{t("All types", "كل الأنواع")}</option><option value="remote">Remote (1)</option></select></label><label>{t("Level", "المستوى")}<select value={level} onChange={(e) => setLevel(e.target.value)}><option value="">{t("All levels", "كل المستويات")}</option><option value="senior">Senior (1)</option></select></label><button type="button" onClick={clear}>{t("Clear", "مسح الفلاتر")}</button></details><div className="vo-job-results">{visible ? <a href="#upload-cv" className="vo-job-card"><div><span className="vo-eyebrow">VO TECHNOLOGY / {t("OPEN ROLE", "وظيفة متاحة")}</span><h3>{t("Backend Developer", "مطور Backend")}</h3><p>Vo Technology</p></div><div className="vo-job-meta"><span>$145k–$160k</span><span>Senior</span><span>Remote</span><span>1-5 Days</span><span aria-hidden="true">↗</span></div></a> : <p className="vo-jobs-empty">{t("No roles match these filters. Try clearing your selection.", "لا توجد وظائف مطابقة لهذه الفلاتر. جرّب مسح الخيارات.")}</p>}</div></div></section>
  </PageShell>;
}
