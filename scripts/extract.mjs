// Splits the Framer export (source/index.html) into pieces rendered natively by Next.js.
import fs from "node:fs";
const s = fs.readFileSync("source/index.html", "utf8");
const head = s.slice(s.indexOf("<head>") + 6, s.indexOf("</head>"));
// Drop the Framer runtime bundle: it re-hydrates with the original CMS content and overwrites this export's text.
const body = s
  .slice(s.indexOf("<body>") + 6, s.lastIndexOf("</body>"))
  .replace(/<script type="module"[^>]*data-framer-bundle="main"[^>]*><\/script>/, "");
const nodes = [];
const re = /<(style|script)([^>]*)>([\s\S]*?)<\/\1>|<(meta|link)([^>]*)>/g;
const attrs = (a) => Object.fromEntries([...a.matchAll(/([\w:-]+)(?:="([^"]*)")?/g)].map((m) => [m[1], m[2] ?? ""]));
let m;
while ((m = re.exec(head))) {
  if (m[1]) nodes.push({ tag: m[1], attrs: attrs(m[2]), html: m[3] });
  else if (!/charset|name="viewport"/.test(m[5])) nodes.push({ tag: m[4], attrs: attrs(m[5]) });
}
fs.mkdirSync("app/framer", { recursive: true });
fs.writeFileSync("app/framer/head.json", JSON.stringify(nodes));
fs.writeFileSync("app/framer/body.html", body);
console.log(nodes.length, "head nodes;", body.length, "body bytes");
