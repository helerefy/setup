/**
 * VO for Technology content, keyed by the text it replaces in the original page design.
 * Sources: vo.technology (EN/AR) and the VO company profile (2025).
 */
type T = { en: string; ar: string };

export const STRINGS: Record<string, T> = {
  // ── Hero ───────────────────────────────────────────────────────────────
  "How designers are evolving their tools, craft, and teams with AI": {
    en: "An emerging technology partner for AI solutions, intelligent software and data-driven systems",
    ar: "شريك تقني ناشئ متخصص في حلول الذكاء الاصطناعي والبرمجيات الذكية والأنظمة المعتمدة على البيانات",
  },
  "AI in Design Report 2026": { en: "VO for Technology", ar: "فو للتكنولوجيا" },
  "By Designer Fund in partnership with Foundation Capital": {
    en: "Intelligence engineered. Outcomes delivered.",
    ar: "ذكاء مُهندَس. نتائج مُحقَّقة.",
  },
  "Scroll to read": { en: "Scroll to explore", ar: "مرّر للاستكشاف" },

  // ── Navigation ────────────────────────────────────────────────────────
  "Read the Report": { en: "Our Services", ar: "خدماتنا" },
  "Report Chapters": { en: "Our Services", ar: "خدماتنا" },
  "Case Studies": { en: "Products", ar: "المنتجات" },
  About: { en: "About", ar: "من نحن" },
  Menu: { en: "Menu", ar: "القائمة" },
  Close: { en: "Close", ar: "إغلاق" },
  Back: { en: "Back", ar: "رجوع" },
  Tools: { en: "Outsourcing", ar: "التعهيد" },
  Craft: { en: "Solutions", ar: "الحلول" },
  Teams: { en: "Data & AI", ar: "البيانات والذكاء" },
  "©2026 Designer Fund, Foundation Capital. All rights reserved": {
    en: "© 2025 VO for Technology. All rights reserved",
    ar: "© 2025 فو للتكنولوجيا. جميع الحقوق محفوظة",
  },

  // ── Products (case studies in the original) ───────────────────────────
  Sierra: { en: "GeoBank", ar: "جيو بنك" },
  Linear: { en: "Geo Sales Manager", ar: "جيو سيلز مانجر" },
  Shopify: { en: "Vehicle Tracking", ar: "تتبع المركبات" },
  Stripe: { en: "GEO ETL", ar: "جيو ETL" },
  Anthropic: { en: "ISignage Pro", ar: "آي ساينج برو" },
  Notion: { en: "PMO Cloud", ar: "PMO كلاود" },
  Framer: { en: "Correspondence", ar: "المراسلات" },
  "Scaling the system while sweating the details": {
    en: "Spatial analytics for ArcGIS",
    ar: "تحليلات مكانية لمنصة ArcGIS",
  },
  "How does a small design team supporting 100+ engineers scale its impact without lowering the bar?": {
    en: "Map, analyze and share geographic data with secure, multi-level administration built for ArcGIS 10.x.",
    ar: "أنشئ الخرائط وحلّل البيانات الجغرافية وشاركها مع صلاحيات إدارية متعددة المستويات لمنصة ArcGIS.",
  },
  "Protecting the thinking behind great design": {
    en: "Sales Force E-Supervisor",
    ar: "المشرف الإلكتروني لفرق المبيعات",
  },
  "As software becomes easier to build, how should design teams preserve their judgment?": {
    en: "Supervise field sales teams in real time with location-aware tracking, visits and reporting.",
    ar: "أشرف على فرق المبيعات الميدانية لحظيًا من خلال التتبع الجغرافي والزيارات والتقارير.",
  },
  "Growing as a designer": { en: "Fleet & AVL tracking", ar: "تتبع الأسطول والمركبات" },
  "In a moment when the tools, skills, and expectations are all shifting at once, how can designers grow and thrive?": {
    en: "Monitor every vehicle live, optimize routes and cut operating costs across your fleet.",
    ar: "راقب كل مركبة مباشرة، وحسّن المسارات، وخفّض تكاليف تشغيل أسطولك.",
  },
  "Creating the conditions for experimentation": {
    en: "Extract, transform, load",
    ar: "استخراج وتحويل وتحميل",
  },
  "How do you build a culture that enables AI adoption instead of dictating the playbook?": {
    en: "Move spatial and business data between systems with reliable, automated ETL pipelines.",
    ar: "انقل البيانات المكانية وبيانات الأعمال بين الأنظمة عبر مسارات ETL موثوقة ومؤتمتة.",
  },
  "When code is no longer the constraint": {
    en: "Smart interactive signage",
    ar: "لوحات عرض ذكية وتفاعلية",
  },
  "When AI writes most of the code, how should the design team operate?": {
    en: "Manage digital screens and interactive content from one central, cloud-based platform.",
    ar: "أدر الشاشات الرقمية والمحتوى التفاعلي من منصة سحابية مركزية واحدة.",
  },
  "Working alongside agents": {
    en: "Project management office",
    ar: "مكتب إدارة المشاريع",
  },
  "What does it feel like to design alongside agents when the tools and workflows change but the philosophy doesn't?": {
    en: "Plan, track and report on portfolios, projects and resources in a single PMO system.",
    ar: "خطط وتابع المحافظ والمشاريع والموارد وأعدّ تقاريرها في نظام PMO واحد.",
  },
  "Designing the design tools": {
    en: "Correspondence tracking & management",
    ar: "تتبع وإدارة المراسلات",
  },
  "When most AI tools optimize for generation, what does it look like to build one that protects design control instead?": {
    en: "Register, route and archive official correspondence with full traceability and workflows.",
    ar: "سجّل المراسلات الرسمية ووجّهها وأرشفها مع تتبع كامل وسير عمل واضح.",
  },
  "Coming soon": { en: "Featured", ar: "مميز" },
  "Get notified": { en: "View product", ar: "عرض المنتج" },
  "Video Case Studies": { en: "Our Products", ar: "منتجاتنا" },
  "Seven companies. Seven ways of navigating the same shift.": {
    en: "Products for the work behind the work.",
    ar: "منتجات تدعم تفاصيل أعمالك.",
  },

  // ── Clients / preface ─────────────────────────────────────────────────
  "Our partners": { en: "Our clients", ar: "عملاؤنا" },
  "An Inflection Point": { en: "About the company", ar: "عن الشركة" },
  "In 2025, designers were experimenting with AI. In 2026, they’re rebuilding around it.": {
    en: "Built for the next era of intelligent enterprise.",
    ar: "صُممنا للعصر القادم من المؤسسات الذكية.",
  },
  "Designers surveyed in 60+ countries.": {
    en: "Government & enterprise clients across the region.",
    ar: "عميل حكومي ومؤسسي في المنطقة.",
  },
  "Designers surveyed in 60+ countries": {
    en: "Government & enterprise clients across the region",
    ar: "عميل حكومي ومؤسسي في المنطقة",
  },
  "Interviews with practitioners and leaders": {
    en: "Frameworks & platforms our engineers master",
    ar: "إطار عمل ومنصة يتقنها مهندسونا",
  },
  "AI in Design 2026 aims to capture how AI is transforming tech design across designers’ desks and within their teams.": {
    en: "VO for Technology delivers cutting-edge IT consulting, software engineering and AI-powered solutions to organizations across the Middle East and beyond.",
    ar: "تقدم فو للتكنولوجيا استشارات تقنية متقدمة وهندسة برمجيات وحلولًا مدعومة بالذكاء الاصطناعي للمؤسسات في الشرق الأوسط وخارجه.",
  },
  "We ran our first AI in Design survey in early 2025 because we consistently heard designers and leaders ask, “How are others doing this, and what’s working?” A year later, we’re attempting to get a sense for what’s changed and share firsthand perspectives.": {
    en: "Our mission is to help organizations grow with practical software that connects complex systems to everyday work.",
    ar: "مهمتنا تمكين المؤسسات بتقنيات ذكية وقابلة للتوسع تحقق نموًا ملموسًا وميزة تنافسية، وتربط بين التقنية المعقدة ونتائج الأعمال الحقيقية.",
  },
  "The answers come from over 900 designers at startups, enterprises, and agencies who work across disciplines like product design, brand design, research, and design engineering. We also conducted over 20 interviews with leaders at companies actively navigating this shift.": {
    en: "Our vision is to be the most trusted technology partner for enterprises navigating digital transformation in the region, with senior engineers across .Net Core, Node.js, Laravel, Creatio, Odoo, cloud, cybersecurity and mobile.",
    ar: "رؤيتنا أن نكون الشريك التقني الأكثر ثقة للمؤسسات في رحلة التحول الرقمي في المنطقة، بفريق من كبار المهندسين في .Net Core وNode.js وLaravel وCreatio وOdoo والسحابة والأمن السيبراني وتطبيقات الجوال.",
  },
  "Given how quickly practices are evolving, we’ll continue to release new findings throughout the year, including case studies about design at companies like Anthropic, Sierra, Stripe, Notion, Shopify, Linear, and Framer.": {
    en: "Our four values are innovation, integrity, agility and partnership. We focus on lasting relationships rather than one-time projects.",
    ar: "نلتزم بأربع قيم: الابتكار والنزاهة والمرونة والشراكة، ونبني علاقات طويلة الأمد لا مشاريع لمرة واحدة.",
  },
  "Sign up for new releases.": { en: "Talk to our team.", ar: "تحدث مع فريقنا." },
  "AI is sparking a creative renaissance in design. With new instruments, it’s our chance to compose wholly new music.": {
    en: "We connect complex technology to the results enterprises need.",
    ar: "نربط بين التقنية المعقدة ونتائج الأعمال الحقيقية، للمؤسسات التي تطلب المزيد.",
  },
  "Katie Dill": { en: "VO for Technology", ar: "فو للتكنولوجيا" },
  "Head of Design, STRIPE": { en: "Company profile, 2025", ar: "الملف التعريفي 2025" },

  // ── Services (chapters in the original) ───────────────────────────────
  "The great toolstack shakeup": {
    en: "Senior talent, embedded in your teams",
    ar: "كفاءات خبيرة ضمن فرقك",
  },
  "AI usage has surged, but the toolstack is still in flux. Designers are using double the number of off-the-shelf tools than they did in 2025, and they’re building custom software with AI that matches how they like to work. As everyone rushes to keep up with new releases, reliable output quality remains the largest area for improvement.": {
    en: "Senior engineers and consultants join your team when you need them, from individual specialists to complete engineering teams.",
    ar: "مهندسون ومستشارون خبراء ينضمون إلى فرقك دون أعباء التوظيف الدائم. توسّع أو قلّص بمرونة، من دعم الكوادر إلى فرق هندسية متكاملة.",
  },
  "In this chapter, we’ll cover:": { en: "What we deliver:", ar: "ما نقدمه:" },
  "The most-used AI design tools": {
    en: "IT application development & maintenance",
    ar: "تطوير التطبيقات وصيانتها",
  },
  "The toolstack that's multiplying": {
    en: "IT infrastructure, helpdesk & networks",
    ar: "البنية التحتية والدعم الفني والشبكات",
  },
  "What makes tools stick (+ why many don’t)": {
    en: "IT consulting & system integration",
    ar: "الاستشارات التقنية وتكامل الأنظمة",
  },
  "Designers as builders of their own tools": {
    en: "Digital services: mobile, cloud, RPA, IoT",
    ar: "خدمات رقمية: الجوال والسحابة وأتمتة العمليات وإنترنت الأشياء",
  },
  "Tool fatigue and the pressure to keep up": {
    en: "Engineering, R&D and analytics services",
    ar: "الهندسة والبحث والتطوير والتحليلات",
  },
  "Read the Tools Chapter": { en: "Explore Outsourcing", ar: "استكشف التعهيد" },
  "Craft in the age of infinite output": {
    en: "End-to-end software on proven frameworks",
    ar: "برمجيات متكاملة على أطر عمل موثوقة",
  },
  "Everyone is shipping faster. But is speed good for craft? AI has unlocked a new gear for designers: they’re ideating faster, prototyping more, and learning to code. Half of respondents have pushed AI-generated code to production. At the same time, we hear concerns about craft atrophy and the loneliness of designing alongside AI instead of teammates.": {
    en: "We build CRM and ERP platforms, custom enterprise applications and mobile tools using established frameworks. We also offer ready-to-deploy products.",
    ar: "تطوير برمجيات متكامل باستخدام أطر عمل رائدة، من منصات CRM وERP إلى تطبيقات المؤسسات المخصصة وتجارب الجوال، إلى جانب منتجاتنا الجاهزة للتشغيل.",
  },
  "Coding as a core design skill": { en: ".Net Core, Node.js & Laravel platforms", ar: "منصات .Net Core وNode.js وLaravel" },
  "Prototyping as a default output": { en: "CRM & ERP with Creatio and Odoo", ar: "أنظمة CRM وERP عبر Creatio وOdoo" },
  "The tension between speed and quality": { en: "Custom enterprise applications", ar: "تطبيقات مؤسسية مخصصة" },
  "Preserving judgment and taste": { en: "Mobile experiences", ar: "تجارب تطبيقات الجوال" },
  "Preserving judgment, taste, and skill development": { en: "Mobile experiences", ar: "تجارب تطبيقات الجوال" },
  "The trend toward designers as builders": { en: "Cloud & cybersecurity built in", ar: "السحابة والأمن السيبراني ضمن الحل" },
  "Read the Craft Chapter": { en: "Explore Solutions & Products", ar: "استكشف الحلول والمنتجات" },
  "Redesigning the design org": {
    en: "From raw data to intelligent decisions",
    ar: "من البيانات الخام إلى قرارات ذكية",
  },
  "Companies have stepped up their support for AI adoption, but most of the learning is still happening between peers. The organizations seeing the most momentum are creating the conditions for tinkering. They’re also rethinking collaboration rituals for a world where anyone can spin up a prototype, but the AI tools they’re using haven’t yet been designed for multiplayer work.": {
    en: "Turn operational data into useful information with machine learning, automation and analytics. Deploy in the cloud, on-premise or both.",
    ar: "أنظمة ذكية تحوّل البيانات الخام إلى قرارات استراتيجية: تعلّم آلي ومسارات أتمتة وتحليلات مدعومة بالذكاء الاصطناعي على مستوى المؤسسات، سحابيًا أو محليًا أو هجينًا.",
  },
  "AI gave designers new powers. Now organizations need to adapt. Roles are blurring as designers take on PM and engineering work, and vice versa. Hiring managers want AI fluency alongside a high bar for craft, vision, and storytelling. But few companies have updated performance reviews, team structures, or hiring practices to match how the work has changed.": {
    en: "Turn operational data into useful information with machine learning, automation and analytics. Deploy in the cloud, on-premise or both.",
    ar: "أنظمة ذكية تحوّل البيانات الخام إلى قرارات استراتيجية: تعلّم آلي ومسارات أتمتة وتحليلات مدعومة بالذكاء الاصطناعي على مستوى المؤسسات، سحابيًا أو محليًا أو هجينًا.",
  },
  "How companies support AI adoption": { en: "Data collection & integration", ar: "جمع البيانات وتكاملها" },
  "Blurring of design, PM, and engineering": { en: "Data processing pipelines", ar: "مسارات معالجة البيانات" },
  "The messy nature of collaboration": { en: "Machine learning & AI models", ar: "نماذج التعلم الآلي والذكاء الاصطناعي" },
  "Changing expectations and company policy": { en: "Insights & decision support", ar: "الرؤى ودعم القرار" },
  "What hiring managers are now looking for": { en: "Cloud, on-premise or hybrid deployment", ar: "نشر سحابي أو محلي أو هجين" },
  "Read the Teams Chapter": { en: "Explore Data Analysis & AI", ar: "استكشف تحليل البيانات والذكاء الاصطناعي" },

  // ── Highlight ─────────────────────────────────────────────────────────
  "Inside AI-native design teams": { en: "We’re here to help", ar: "نحن هنا لمساعدتك" },
  "Seven video case studies with the design teams at Anthropic, Framer, Linear, Notion, Shopify, Sierra, and Stripe. Go inside the workflows they've rebuilt, the tradeoffs they're navigating, and how they’re operating differently as a team.": {
    en: "A consultant provides expert advice in business, finance, marketing or technology. Tell us about your challenge and our consultants will help you solve problems, improve performance and make confident strategic decisions.",
    ar: "يقدم المستشار نصائح متخصصة في الأعمال أو التمويل أو التسويق أو التقنية. أخبرنا بتحديك وسيساعدك مستشارونا على حل المشكلات وتحسين الأداء واتخاذ قرارات استراتيجية بثقة.",
  },
  "Get notified when they’re released": { en: "Get a consultant", ar: "احصل على استشارة" },

  // ── Footer ────────────────────────────────────────────────────────────
  "Get new case studies & report markdown": {
    en: "Get the VO company profile",
    ar: "احصل على الملف التعريفي لفو",
  },
  "Download the markdown version of the report, ready to drop into any tool. Get notified as new case studies go live.": {
    en: "Download our 2025 company profile and be the first to hear about new products and services.",
    ar: "حمّل ملفنا التعريفي لعام 2025 وكن أول من يعرف عن منتجاتنا وخدماتنا الجديدة.",
  },
  "By subscribing, you agree to receive communications from": {
    en: "By subscribing, you agree to receive communications from",
    ar: "بالاشتراك، أنت توافق على تلقي رسائل من",
  },
  "Designer Fund": { en: "VO for Technology", ar: "فو للتكنولوجيا" },
  Designer: { en: "VO for", ar: "فو" },
  Fund: { en: "Technology", ar: "للتكنولوجيا" },
  and: { en: "and", ar: "و" },
  "Foundation Capital": { en: "its partners", ar: "شركائها" },
  "in accordance with their privacy policies.": {
    en: "in accordance with their privacy policies.",
    ar: "وفقًا لسياسات الخصوصية الخاصة بهم.",
  },
  Submit: { en: "Submit", ar: "إرسال" },
  Methodology: { en: "Our reach", ar: "حضورنا" },
  "This report draws from": { en: "VO delivers with", ar: "تعمل فو بـ" },
  "Survey responses": { en: "Skills across our frameworks", ar: "مهارة عبر أطر العمل" },
  Interviews: { en: "Government & enterprise clients", ar: "عميل حكومي ومؤسسي" },
  "Public sources": { en: "Ready-to-deploy products", ar: "منتج جاهز للتشغيل" },
  "Report Partners": { en: "Our Products", ar: "منتجاتنا" },
  Report: { en: "Company", ar: "الشركة" },
  "Made in Framer by ++hellohello": {
    en: "info@vo.technology · +966 59 008 8250",
    ar: "info@vo.technology · ‎+966 59 008 8250",
  },
};
