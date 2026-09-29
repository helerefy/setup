import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { local, products, services } from "@/content/vo";
import VONav from "@/components/nav/VONav";
import InquiryForm from "./InquiryForm";

const text = (l: Locale, en: string, ar: string) => l === "ar" ? ar : en;
const url = (l: Locale, path: string) => `/${l}${path}`;

function PageShell({ l, children }: { l: Locale; children: React.ReactNode }) {
  return <div className="vo-page"><header className="vo-page-header"><VONav /></header>{children}<footer className="vo-page-footer"><div className="vo-page-footer-top"><Link href={url(l, "")} className="vo-page-footer-brand">VO Technology</Link><div><p>{text(l, "Let’s build what’s next.", "لنبنِ المستقبل معًا.")}</p><a href="mailto:info@vo.technology">info@vo.technology ↗</a><a href="tel:+966590088250">+966 59 008 8250</a></div></div><div className="vo-page-footer-bottom"><span>© 2025 VO for Technology</span><Link href={url(l, "/ask")}>{text(l, "Ask VO", "اسأل فو")}</Link><a href="/vo/VO-Technology-Profile.pdf" download>{text(l, "Download company profile", "حمّل ملف الشركة")}</a></div></footer></div>;
}

function PageHero({ l, label, headline, description, image, index }: { l: Locale; label: string; headline: string; description: string; image?: string; index?: string }) {
  return <section className="vo-page-hero"><div className="vo-page-intro"><span className="vo-eyebrow">{index ? `${index}. ` : ""}{label}</span><h1>{headline}</h1><p>{description}</p></div>{image && <div className="vo-page-hero-media"><img src={image} alt="" /></div>}</section>;
}

export function ServicePage({ l, slug }: { l: Locale; slug: string }) {
  const item = services.find((s) => s.path === slug)!;
  return <PageShell l={l}>
    <PageHero l={l} label={local(l, item.name)} index={item.number} headline={local(l, item.headline)} description={local(l, item.description)} image={item.image} />
    <section className="vo-feature-section" style={{ background: item.color }}><div className="vo-section-heading"><span className="vo-eyebrow">{text(l, "WHAT WE DELIVER", "ما نقدمه")}</span><h2>{local(l, item.name)}</h2></div><div className="vo-feature-list">{item.items.map((feature, i) => <div className="vo-feature-row" key={feature.en}><span>{String(i + 1).padStart(2, "0")}</span><h3>{local(l, feature)}</h3><span aria-hidden="true">↗</span></div>)}</div></section>
    {slug === "outsourcing" && <section className="vo-detail-section"><span className="vo-eyebrow">{text(l, "FOCUSED INDUSTRIES", "القطاعات التي نخدمها")}</span><h2>{text(l, "Expertise that crosses industries.", "خبرات تتجاوز القطاعات.")}</h2><div className="vo-chip-grid">{item.sectors.map((s) => <span key={s.en}>{local(l, s)}</span>)}</div></section>}
    {slug === "solutions-products" && <ProductGrid l={l} />}
    {slug === "data-analysis-ai" && <section className="vo-detail-section"><span className="vo-eyebrow">{text(l, "FROM DATA TO ACTION", "من البيانات إلى الفعل")}</span><h2>{text(l, "Intelligence for real decisions.", "ذكاء يدعم قرارات حقيقية.")}</h2><div className="vo-chip-grid">{item.sectors.map((s) => <span key={s.en}>{local(l, s)}</span>)}</div></section>}
    <CallToAction l={l} title={text(l, "Let’s solve the next challenge together.", "لنواجه التحدي القادم معًا.")} to="/get-consultant" />
  </PageShell>;
}

function ProductGrid({ l }: { l: Locale }) {
  return <section className="vo-detail-section" id="products"><span className="vo-eyebrow">{text(l, "VO PRODUCTS", "منتجات فو")}</span><h2>{text(l, "Seven solutions. Built for work that matters.", "سبعة حلول. صُنعت للعمل المؤثر.")}</h2><div className="vo-product-grid">{products.map((product, i) => <Link className="vo-product-card" href={url(l, `/solutions-products/${product.id}`)} key={product.id}><img src={product.image} alt="" /><div><span className="vo-eyebrow">{String(i + 1).padStart(2, "0")}</span><h3>{local(l, product.name)}</h3><p>{local(l, product.subtitle)}</p><span aria-hidden="true">↗</span></div></Link>)}</div></section>;
}

export function ProductPage({ l, id }: { l: Locale; id: string }) {
  const item = products.find((p) => p.id === id)!;
  return <PageShell l={l}>
    <PageHero l={l} label={text(l, "VO PRODUCTS", "منتجات فو")} headline={local(l, item.name)} description={local(l, item.subtitle)} image={item.image} />
    <section className="vo-story-grid"><div><span className="vo-eyebrow">{text(l, "THE PRODUCT", "عن المنتج")}</span><h2>{local(l, item.subtitle)}</h2></div><p>{local(l, item.description)}</p></section>
    <section className="vo-feature-section vo-feature-purple"><div className="vo-section-heading"><span className="vo-eyebrow">{text(l, "CAPABILITIES", "المزايا")}</span><h2>{text(l, "Built to make the work easier.", "مصمم لتسهيل العمل.")}</h2></div><div className="vo-feature-list">{item.features.map((f, i) => <div className="vo-feature-row" key={i}><span>{String(i + 1).padStart(2, "0")}</span><h3>{local(l, f)}</h3></div>)}</div></section>
    <CallToAction l={l} title={text(l, "Could this work for your team?", "هل يناسب هذا الحل فريقك؟")} to="/request-product" />
    <section className="vo-detail-section"><span className="vo-eyebrow">{text(l, "KEEP EXPLORING", "تابع الاستكشاف")}</span><Link className="vo-big-link" href={url(l, "/solutions-products#products")}>{text(l, "All products", "كل المنتجات")} <span>↗</span></Link></section>
  </PageShell>;
}

export function AboutPage({ l }: { l: Locale }) {
  return <PageShell l={l}>
    <PageHero l={l} label={text(l, "ABOUT VO", "عن فو")} headline={text(l, "Built for the next era of intelligent enterprise.", "صُممنا للعصر القادم من المؤسسات الذكية.")} description={text(l, "VO for Technology is an emerging technology partner specializing in AI solutions, intelligent software and data-driven systems — built for enterprises that demand more.", "فو للتكنولوجيا شريك تقني ناشئ متخصص في حلول الذكاء الاصطناعي والبرمجيات الذكية والأنظمة المعتمدة على البيانات للمؤسسات الطموحة.")} image="/vo/employees.webp" />
    <section className="vo-story-grid"><div><span className="vo-eyebrow">{text(l, "WHAT WE DO", "ما نقوم به")}</span><h2>{text(l, "Intelligence engineered. Outcomes delivered.", "ذكاء مُهندَس. نتائج مُحقَّقة.")}</h2></div><p>{text(l, "We deliver IT consulting, software engineering and AI-powered solutions to organizations across the Middle East and beyond. We bridge complex technology and real business results.", "نقدم استشارات تقنية وهندسة برمجيات وحلولًا مدعومة بالذكاء الاصطناعي للمؤسسات في الشرق الأوسط وخارجه. نربط بين التقنية المعقدة ونتائج الأعمال الحقيقية.")}</p></section>
    <section className="vo-feature-section vo-feature-purple"><div className="vo-section-heading"><span className="vo-eyebrow">{text(l, "OUR PURPOSE", "هدفنا")}</span><h2>{text(l, "One direction. Lasting impact.", "اتجاه واحد. أثر مستدام.")}</h2></div><div className="vo-feature-list"><div className="vo-feature-row"><span>01</span><div><h3>{text(l, "Mission", "مهمتنا")}</h3><p>{text(l, "Empower organizations with intelligent, scalable technology that drives measurable growth and competitive advantage.", "تمكين المؤسسات بتقنيات ذكية وقابلة للتوسع تدفع نموًا ملموسًا وميزة تنافسية.")}</p></div></div><div className="vo-feature-row"><span>02</span><div><h3>{text(l, "Vision", "رؤيتنا")}</h3><p>{text(l, "To be the most trusted technology partner for enterprises navigating digital transformation in the region.", "أن نكون الشريك التقني الأكثر ثقة للمؤسسات في رحلة التحول الرقمي في المنطقة.")}</p></div></div></div></section>
    <section className="vo-detail-section"><span className="vo-eyebrow">{text(l, "OUR VALUES", "قيمنا")}</span><h2>{text(l, "The way we work matters.", "طريقتنا في العمل تصنع الفارق.")}</h2><div className="vo-value-grid">{[
      ["Innovation", "الابتكار", "Pursuing technology frontiers so clients never fall behind.", "نستكشف آفاق التقنية كي لا يتخلف عملاؤنا."],
      ["Integrity", "النزاهة", "Transparent partnerships built on trust and accountability.", "شراكات شفافة قائمة على الثقة والمسؤولية."],
      ["Agility", "المرونة", "Fast delivery cycles that keep pace with evolving needs.", "دورات تسليم سريعة تواكب الاحتياجات المتغيرة."],
      ["Partnership", "الشراكة", "Long-term relationships, not just one-time projects.", "علاقات طويلة الأمد، لا مجرد مشاريع عابرة."],
    ].map(([en, ar, descEn, descAr], i) => <article key={en}><span className="vo-eyebrow">0{i + 1}</span><h3>{text(l, en, ar)}</h3><p>{text(l, descEn, descAr)}</p></article>)}</div></section>
    <section className="vo-profile-band"><div><span className="vo-eyebrow">{text(l, "COMPANY PROFILE · 2025", "الملف التعريفي · 2025")}</span><h2>{text(l, "Get to know VO.", "تعرّف على فو.")}</h2></div><a className="vo-action" href="/vo/VO-Technology-Profile.pdf" download>{text(l, "Download profile", "حمّل الملف التعريفي")} <span>↗</span></a></section>
  </PageShell>;
}

export function CreatioPage({ l }: { l: Locale }) {
  return <PageShell l={l}>
    <PageHero l={l} label="CREATIO" headline={text(l, "A new era of digital talent.", "عصر جديد من المواهب الرقمية.")} description={text(l, "Creatio is a no-code and low-code platform for automating workflows, enhancing productivity and accelerating digital transformation.", "تُمكّن كرياشو أعمالك بمنصة دون كود ومنخفضة الكود لأتمتة العمليات ورفع الإنتاجية وتسريع التحول الرقمي.")} image="/vo/creatio.webp" />
    <section className="vo-feature-section vo-feature-orange"><div className="vo-section-heading"><span className="vo-eyebrow">{text(l, "THE PLATFORM", "المنصة")}</span><h2>{text(l, "Make room for what’s next.", "افتح المجال للخطوة القادمة.")}</h2></div><div className="vo-feature-list">{[
      ["Automate processes without heavy development", "أتمت العمليات دون تطوير برمجي مكثف"],
      ["Connect customer journeys across your business", "اربط رحلات العملاء عبر أعمالك"],
      ["Build and adapt applications with no-code tools", "أنشئ التطبيقات وطوّرها بأدوات دون كود"],
    ].map(([en, ar], i) => <div className="vo-feature-row" key={en}><span>0{i + 1}</span><h3>{text(l, en, ar)}</h3></div>)}</div></section>
    <CallToAction l={l} title={text(l, "Explore what Creatio could do for you.", "اكتشف إمكانات كرياشو لأعمالك.")} to="/get-consultant" />
  </PageShell>;
}

export function InquiryPage({ l, kind }: { l: Locale; kind: "consultant" | "team" | "product" | "ask" }) {
  const copy = {
    consultant: { label: ["GET CONSULTANT", "احصل على استشارة"], title: ["Find the right way forward.", "ابحث عن الخطوة الأنسب."], desc: ["Tell us about your technology challenge. Our consultants can help you solve problems, improve performance and make confident decisions.", "أخبرنا عن تحديك التقني. يساعدك مستشارونا على حل المشكلات وتحسين الأداء واتخاذ قرارات واثقة."], image: "/vo/consultant.png" },
    team: { label: ["JOIN VO TEAM", "انضم إلى فريق فو"], title: ["Build the next chapter with us.", "ابنِ الفصل القادم معنا."], desc: ["Join a team working on intelligent software, data systems and digital transformation. Share your experience and CV to start the conversation.", "انضم إلى فريق يعمل على البرمجيات الذكية وأنظمة البيانات والتحول الرقمي. شارك خبراتك وسيرتك الذاتية لبدء الحديث."], image: "/vo/team.png" },
    product: { label: ["REQUEST A PRODUCT", "اطلب منتجًا"], title: ["Let’s find the right solution.", "لنجد الحل المناسب."], desc: ["Tell us which VO product you’re interested in and what your organization needs.", "أخبرنا بالمنتج الذي يهمك من منتجات فو وما تحتاجه مؤسستك."], image: "/vo/solutions.png" },
    ask: { label: ["ASK VO", "اسأل فو"], title: ["Tell us what’s on your mind.", "أخبرنا بما يدور في ذهنك."], desc: ["We’d love to talk about how we can help you. Tell us about your project, challenge or question.", "يسعدنا الحديث عن كيفية مساعدتك. أخبرنا بمشروعك أو تحديك أو سؤالك."], image: "/vo/data-ai.jpeg" },
  }[kind];
  const part = (arr: string[]) => arr[l === "ar" ? 1 : 0];
  return <PageShell l={l}><PageHero l={l} label={part(copy.label)} headline={part(copy.title)} description={part(copy.desc)} image={copy.image} /><section className="vo-inquiry"><div><span className="vo-eyebrow">{text(l, "START A CONVERSATION", "لنبدأ الحديث")}</span><h2>{text(l, "How can we help?", "كيف يمكننا مساعدتك؟")}</h2><p>{text(l, "Prefer to write directly? Our team is at info@vo.technology.", "تفضل المراسلة المباشرة؟ فريقنا عبر info@vo.technology.")}</p></div><InquiryForm l={l} kind={kind} products={products.map((p) => local(l, p.name))} /></section></PageShell>;
}

export function ConfirmationPage({ l }: { l: Locale }) {
  return <PageShell l={l}><section className="vo-confirm"><div className="vo-check">✓</div><span className="vo-eyebrow">VO TECHNOLOGY</span><h1>{text(l, "Thanks for getting in touch.", "شكرًا لتواصلك معنا.")}</h1><p>{text(l, "This is a preview: no information was sent or saved. You can download our company profile below.", "هذه نسخة استعراضية: لم تُرسل أو تُحفظ أي بيانات. يمكنك تحميل ملفنا التعريفي أدناه.")}</p><a className="vo-action" href="/vo/VO-Technology-Profile.pdf" download>{text(l, "Download profile", "حمّل الملف التعريفي")} <span>↓</span></a></section></PageShell>;
}

function CallToAction({ l, title, to }: { l: Locale; title: string; to: string }) {
  return <section className="vo-cta"><div><span className="vo-eyebrow">{text(l, "READY TO TALK?", "هل أنت مستعد للحديث؟")}</span><h2>{title}</h2></div><Link className="vo-action" href={url(l, to)}>{text(l, "Start a conversation", "ابدأ الحديث")} <span>↗</span></Link></section>;
}
