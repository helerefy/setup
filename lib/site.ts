import fs from "node:fs";
import path from "node:path";

// Captured deployment of https://stateofaidesign.com (see site/README.md).
export const SITE_DIR = path.join(process.cwd(), "site");
const PAGES_DIR = path.join(SITE_DIR, "stateofaidesign.com");

// Hosts whose captured files are served locally from /ext/<host>/...
const LOCAL_HOSTS = ["framerusercontent.com", "fonts.gstatic.com", "framer.com", "i.ytimg.com"];

// Third-party analytics/tracking from the original deployment is not reproduced.
const STRIP = [
  /<script[^>]*src="https:\/\/www\.googletagmanager\.com[^"]*"[^>]*><\/script>/g,
  /<script[^>]*src="https:\/\/events\.framer\.com[^"]*"[^>]*><\/script>/g,
  /<script>\s*window\.dataLayer[\s\S]*?<\/script>/g,
  /<script>[^<]*adora-cdn\.com[\s\S]*?<\/script>/g,
];

export function rewriteUrls(text: string) {
  for (const h of LOCAL_HOSTS) text = text.split(`https://${h}/`).join(`/ext/${h}/`);
  return text;
}

export type HeadNode = { tag: string; attrs: Record<string, string>; html?: string };
export type Page = { title: string; description: string; head: HeadNode[]; body: string };

const attrs = (a: string) =>
  Object.fromEntries([...a.matchAll(/([\w:-]+)(?:="([^"]*)")?/g)].map((m) => [m[1], m[2] ?? ""]));

export function listRoutes(): string[][] {
  const out: string[][] = [];
  const walk = (dir: string, parts: string[]) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      if (e.isDirectory()) walk(path.join(dir, e.name), [...parts, e.name]);
      else if (e.name === "index.html") out.push(parts);
    }
  };
  walk(PAGES_DIR, []);
  return out;
}

const cache = new Map<string, Page | null>();

export function loadPage(slug: string[] = []): Page | null {
  const key = slug.join("/");
  if (cache.has(key) && process.env.NODE_ENV === "production") return cache.get(key)!;
  if (slug.some((s) => s.includes(".."))) return null;
  const file = path.join(PAGES_DIR, ...slug, "index.html");
  if (!fs.existsSync(file)) return null;
  let s = fs.readFileSync(file, "utf8");
  for (const re of STRIP) s = s.replace(re, "");
  s = rewriteUrls(s);
  const headHtml = s.slice(s.indexOf("<head>") + 6, s.indexOf("</head>"));
  const body = s.slice(s.indexOf("<body>") + 6, s.lastIndexOf("</body>"));
  const head: HeadNode[] = [];
  const re = /<(style|script)([^>]*)>([\s\S]*?)<\/\1>|<(meta|link)([^>]*)>/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(headHtml))) {
    if (m[1]) head.push({ tag: m[1], attrs: attrs(m[2]), html: m[3] });
    else if (!/charset|name="viewport"|name="description"/.test(m[5])) head.push({ tag: m[4], attrs: attrs(m[5]) });
  }
  const page = {
    title: (headHtml.match(/<title>([^<]*)<\/title>/) || [])[1] ?? "",
    description: (headHtml.match(/<meta name="description" content="([^"]*)"/) || [])[1] ?? "",
    head,
    body,
  };
  cache.set(key, page);
  return page;
}

// Map of original asset URL -> captured file path, from the capture inventory.
let inventory: Map<string, string> | null = null;
export function assetPath(url: string): string | null {
  if (!inventory) {
    const inv = JSON.parse(fs.readFileSync(path.join(SITE_DIR, "AID_INVENTORY.json"), "utf8"));
    inventory = new Map();
    for (const f of inv.files) inventory.set(f.url.replace(/&amp;/g, "&"), f.path);
  }
  const p = inventory.get(url);
  return p ? path.join(SITE_DIR, p) : null;
}
