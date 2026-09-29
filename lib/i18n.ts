import { STRINGS } from "@/content/strings";

export const LOCALES = ["en", "ar"] as const;
export type Locale = (typeof LOCALES)[number];
export const isLocale = (v: string): v is Locale => (LOCALES as readonly string[]).includes(v);
export const dir = (l: Locale) => (l === "ar" ? "rtl" : "ltr");

const norm = (s: string) => s.replace(/\s+/g, " ").trim();
const TABLE = new Map(Object.entries(STRINGS).map(([k, v]) => [norm(k), v]));

/** Replaces a string of the original design with VO content for the locale (keeps edge spaces). */
export function tr(l: Locale, s: string): string {
  const hit = TABLE.get(norm(s));
  if (!hit) return s;
  const lead = /^\s/.test(s) ? " " : "", trail = /\s$/.test(s) ? " " : "";
  return lead + hit[l] + trail;
}

/** Maps links of the original design to the VO pages. */
const ROUTES: Record<string, string> = {
  "/": "",
  "/chapters/tools": "/outsourcing",
  "/chapters/craft": "/solutions-products",
  "/chapters/teams": "/data-analysis-ai",
  "/about": "/about",
  "/cases/sierra": "/solutions-products/1",
  "/cases/linear": "/solutions-products/2",
  "/cases/shopify": "/solutions-products/3",
  "/cases/stripe": "/solutions-products/4",
  "/cases/anthropic": "/solutions-products/5",
  "/cases/notion": "/solutions-products/7",
  "/cases/framer": "/solutions-products/8",
  "https://sierra.ai": "/solutions-products/1",
  "https://linear.app": "/solutions-products/2",
  "https://shopify.com": "/solutions-products/3",
  "https://stripe.com": "/solutions-products/4",
  "https://anthropic.com": "/solutions-products/5",
  "https://www.notion.com": "/solutions-products/7",
  "https://www.framer.com": "/solutions-products/8",
  "https://designerfund.com/privacy": "/ask",
  "https://foundationcapital.com/privacy-policy": "/ask",
  "https://foundationcapital.com/privacy-policy/": "/ask",
  "https://designerfund.com": "",
  "https://foundationcapital.com": "",
};
export function hr(l: Locale, href: string): string {
  if (href === "https://www.hellohello.is/") return "mailto:info@vo.technology";
  const clean = href.replace(/^\.\//, "/").replace(/^\.\.\//, "/");
  const [path, hash] = clean.split("#");
  const key = path === "" ? "/" : path.replace(/\/$/, "") || "/";
  if (key in ROUTES) return `/${l}${ROUTES[key]}${hash ? "#" + hash : ""}`;
  if (clean.startsWith("/#")) return `/${l}${clean.slice(1)}`;
  if (clean.startsWith("/") && !/^\/(en|ar)(\/|$)/.test(clean)) return `/${l}${clean}`;
  return href;
}

export const productLink = (l: Locale, id: string) => `/${l}/solutions-products/${id}`;
