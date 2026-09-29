import type { Locale } from "@/lib/i18n";

type Bi = { en: string; ar: string };
export const local = (locale: Locale, value: Bi) => value[locale];

export const products = [
  {
    id: "1", image: "/vo/products/1.jpg",
    name: { en: "GeoBank", ar: "بنك المعلومات الجغرافي" },
    subtitle: { en: "Spatial intelligence, at your fingertips.", ar: "ذكاء مكاني بين يديك." },
    description: { en: "A specialized ArcGIS desktop tool for creating maps, extracting geographic data and uncovering spatial insights. GeoBank protects sensitive GIS sources while enabling teams to search, analyze and share their work.", ar: "أداة متخصصة لمنصة ArcGIS لإنشاء الخرائط واستخراج البيانات الجغرافية واكتشاف الرؤى المكانية، مع حماية مصادر البيانات وتمكين الفرق من البحث والتحليل والمشاركة." },
    features: [
      { en: "Create maps and extract data from multiple sources", ar: "أنشئ الخرائط واستخرج البيانات من مصادر متعددة" },
      { en: "Analyze spatial patterns and relationships", ar: "حلّل الأنماط والعلاقات المكانية" },
      { en: "Control access with administrator permissions", ar: "تحكم في الوصول بصلاحيات إدارية" },
      { en: "Search GIS layers in multiple languages", ar: "ابحث في طبقات GIS بعدة لغات" },
    ],
  },
  {
    id: "2", image: "/vo/products/2.jpg",
    name: { en: "Geo Sales Manager", ar: "مدير المبيعات الجغرافي" },
    subtitle: { en: "Know where every sales opportunity stands.", ar: "تابع كل فرصة مبيعات ميدانيًا." },
    description: { en: "A geographic platform for supervising field-sales activity and improving productivity with real-time visibility into representatives, customer visits and performance.", ar: "منصة جغرافية لإدارة أنشطة فرق المبيعات الميدانية ورفع إنتاجيتها مع رؤية لحظية لمواقع المندوبين وزيارات العملاء والأداء." },
    features: [
      { en: "Mobile app for field representatives", ar: "تطبيق جوال للمندوبين الميدانيين" },
      { en: "Manager and administrator dashboards", ar: "لوحات معلومات للمديرين والمشرفين" },
      { en: "Location-aware team tracking", ar: "تتبع الفرق وفق المواقع الجغرافية" },
      { en: "Review visits and update customer records", ar: "راجع الزيارات وحدّث بيانات العملاء" },
    ],
  },
  {
    id: "3", image: "/vo/products/3.jpg",
    name: { en: "Vehicle Tracking System", ar: "نظام تتبع المركبات" },
    subtitle: { en: "Fleet visibility, built on GIS.", ar: "رؤية شاملة للأسطول مع GIS." },
    description: { en: "A GIS-based automatic vehicle location system for monitoring and managing transport fleets through a dedicated portal and management unit.", ar: "نظام تحديد مواقع المركبات آليًا مبني على GIS لمراقبة وإدارة أساطيل النقل عبر بوابة متابعة ووحدة إدارة مخصصة." },
    features: [
      { en: "Automatic vehicle location (AVL)", ar: "تحديد مواقع المركبات تلقائيًا" },
      { en: "Fleet monitoring portal", ar: "بوابة مراقبة الأسطول" },
      { en: "Dedicated management unit", ar: "وحدة إدارة مخصصة" },
    ],
  },
  {
    id: "4", image: "/vo/products/4.jpg",
    name: { en: "GEO ETL", ar: "استخراج وتحويل وتحميل البيانات الجغرافية" },
    subtitle: { en: "Connect and transform geographic data.", ar: "اربط البيانات الجغرافية وحوّلها." },
    description: { en: "An application that automates the extraction, transformation and loading of geographic data between source and target systems, simplifying integration and data-model maintenance.", ar: "تطبيق يؤتمت استخراج البيانات الجغرافية وتحويلها وتحميلها بين الأنظمة، ليسهّل تكامل البيانات وصيانة نماذجها." },
    features: [
      { en: "Link and compare SDE XML and Oracle data", ar: "اربط بيانات SDE XML وOracle وقارن بينها" },
      { en: "Edit schemas with an ArcGIS-style tree view", ar: "عدّل بنية البيانات بعرض شجري مشابه لـ ArcGIS" },
      { en: "Validate naming rules and search data models", ar: "تحقق من قواعد التسمية وابحث في نماذج البيانات" },
    ],
  },
  {
    id: "5", image: "/vo/products/5.jpg",
    name: { en: "ISignage Pro", ar: "آي ساينج برو" },
    subtitle: { en: "Interactive signage without the code.", ar: "شاشات تفاعلية دون برمجة." },
    description: { en: "A no-code platform for creating, scheduling, publishing and managing interactive digital signage across a network of screens.", ar: "منصة دون برمجة لإنشاء محتوى الشاشات الرقمية التفاعلية وجدولته ونشره وإدارته عبر شبكة من الشاشات." },
    features: [
      { en: "Distribute content across screen networks", ar: "وزّع المحتوى عبر شبكة الشاشات" },
      { en: "Create with templates and automate schedules", ar: "أنشئ بالقوالب وجدول العرض تلقائيًا" },
      { en: "Monitor devices and measure content delivery", ar: "راقب الأجهزة وقِس وصول المحتوى" },
      { en: "Integrate with Active Directory", ar: "تكامل مع Active Directory" },
    ],
  },
  {
    id: "7", image: "/vo/products/7.jpg",
    name: { en: "PMO Cloud", ar: "PMO كلاود" },
    subtitle: { en: "A clearer view of every project.", ar: "رؤية أوضح لكل مشروع." },
    description: { en: "A cloud platform for planning, collaboration, monitoring and project delivery, bringing schedules, budgets, contractors and documentation into one workspace.", ar: "منصة سحابية للتخطيط والتعاون ومتابعة المشاريع وتسليمها، تجمع الجداول والميزانيات والمقاولين والمستندات في مساحة عمل واحدة." },
    features: [
      { en: "Oversee contractors and project schedules", ar: "أشرف على المقاولين والجداول الزمنية" },
      { en: "Manage contracts, budgets and costs", ar: "أدر العقود والميزانيات والتكاليف" },
      { en: "Streamline documents and approvals", ar: "نظّم المستندات والموافقات" },
      { en: "Track progress through reporting", ar: "تابع التقدم عبر التقارير" },
    ],
  },
  {
    id: "8", image: "/vo/products/8.jpg",
    name: { en: "Correspondence Tracking", ar: "إدارة وتتبع المراسلات" },
    subtitle: { en: "Every conversation, accounted for.", ar: "كل مراسلة موثقة ومتاحة." },
    description: { en: "A browser-based system to register, manage, route and document project correspondence with traceable tasks, attachments and status reporting.", ar: "نظام عبر المتصفح لتسجيل مراسلات المشاريع وإدارتها وتوجيهها وتوثيقها مع تتبع المهام والمرفقات وتقارير الحالة." },
    features: [
      { en: "Organize correspondence folders and linked tasks", ar: "نظّم ملفات المراسلات والمهام المرتبطة بها" },
      { en: "Control printing, downloads and attachments", ar: "تحكم في الطباعة والتنزيل والمرفقات" },
      { en: "Track overdue items with status reports", ar: "تابع العناصر المتأخرة بتقارير الحالة" },
    ],
  },
];

export const services = [
  {
    path: "outsourcing", number: "01", image: "/vo/outsourcing.jpeg", color: "#fe7141",
    name: { en: "Outsourcing", ar: "التعهيد" },
    headline: { en: "Senior expertise, exactly when you need it.", ar: "خبرات متقدمة حين تحتاج إليها." },
    description: { en: "Dedicated senior engineers and consultants embedded into your teams, without the overhead of full-time hiring. Scale up or down with the agility your work demands.", ar: "مهندسون ومستشارون خبراء ينضمون إلى فرقك دون أعباء التوظيف الدائم. وسّع قدراتك أو قلّصها بمرونة حسب احتياجات العمل." },
    items: [
      { en: "Application development & maintenance", ar: "تطوير التطبيقات وصيانتها" },
      { en: "IT infrastructure, networks & helpdesk", ar: "البنية التحتية والشبكات والدعم الفني" },
      { en: "Consulting, integration & customization", ar: "الاستشارات والتكامل والتخصيص" },
      { en: "Cloud, mobile, RPA & IoT services", ar: "الخدمات السحابية والجوال والأتمتة وإنترنت الأشياء" },
      { en: "Engineering, R&D and analytics", ar: "الهندسة والبحث والتطوير والتحليلات" },
    ],
    sectors: [
      { en: "Banking & Capital Markets", ar: "البنوك والأسواق المالية" },
      { en: "Healthcare & Insurance", ar: "الصحة والتأمين" },
      { en: "Retail & Education", ar: "التجزئة والتعليم" },
      { en: "Telecoms & Media", ar: "الاتصالات والإعلام" },
      { en: "Transport, Construction & Manufacturing", ar: "النقل والإنشاءات والتصنيع" },
    ],
  },
  {
    path: "solutions-products", number: "02", image: "/vo/solutions.png", color: "#cdabfe",
    name: { en: "Solutions & Products", ar: "الحلول والمنتجات" },
    headline: { en: "Software that works for the way you work.", ar: "برمجيات تواكب طريقة عملك." },
    description: { en: "End-to-end development with industry-leading frameworks. From CRM and ERP platforms to enterprise applications, mobile experiences and ready-to-deploy products.", ar: "تطوير برمجي متكامل بأطر عمل رائدة، من منصات CRM وERP إلى تطبيقات المؤسسات وتجارب الجوال والمنتجات الجاهزة للتشغيل." },
    items: [
      { en: ".Net Core, Node.js & Laravel", ar: ".Net Core وNode.js وLaravel" },
      { en: "Creatio & Odoo platforms", ar: "منصات Creatio وOdoo" },
      { en: "Custom enterprise & mobile applications", ar: "تطبيقات المؤسسات والجوال المخصصة" },
      { en: "Cloud & cybersecurity", ar: "الخدمات السحابية والأمن السيبراني" },
    ],
    sectors: [],
  },
  {
    path: "data-analysis-ai", number: "03", image: "/vo/data-ai.jpeg", color: "#d5e0d7",
    name: { en: "Data Analysis & AI", ar: "تحليل البيانات والذكاء الاصطناعي" },
    headline: { en: "From raw data to intelligent decisions.", ar: "من البيانات الخام إلى قرارات ذكية." },
    description: { en: "Data-driven methods and intelligent algorithms that generate insights, automate processes and solve complex business problems, deployed at enterprise scale.", ar: "أساليب معتمدة على البيانات وخوارزميات ذكية تولّد الرؤى وتؤتمت العمليات وتحل مشكلات الأعمال المعقدة على مستوى المؤسسات." },
    items: [
      { en: "Data collection and integration", ar: "جمع البيانات وتكاملها" },
      { en: "Predictive models and anomaly detection", ar: "النماذج التنبؤية واكتشاف الشذوذ" },
      { en: "Natural language and computer vision", ar: "معالجة اللغة الطبيعية والرؤية الحاسوبية" },
      { en: "Real-time dashboards and reporting", ar: "لوحات المعلومات والتقارير اللحظية" },
      { en: "Cloud, on-premise or hybrid deployment", ar: "نشر سحابي أو محلي أو هجين" },
    ],
    sectors: [
      { en: "Government & smart cities", ar: "الحكومة والمدن الذكية" },
      { en: "Financial services", ar: "الخدمات المالية" },
      { en: "Retail & e-commerce", ar: "التجزئة والتجارة الإلكترونية" },
      { en: "Public services", ar: "الخدمات العامة" },
    ],
  },
];
