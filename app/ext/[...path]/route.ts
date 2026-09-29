import fs from "node:fs";
import nodePath from "node:path";
import { SITE_DIR, assetPath, rewriteUrls } from "@/lib/site";

const TYPES: Record<string, string> = {
  mjs: "text/javascript", js: "text/javascript", css: "text/css", json: "application/json",
  woff2: "font/woff2", woff: "font/woff", ttf: "font/ttf", png: "image/png", jpg: "image/jpeg",
  jpeg: "image/jpeg", webp: "image/webp", avif: "image/avif", gif: "image/gif", svg: "image/svg+xml",
  webm: "video/webm", mp4: "video/mp4", ico: "image/x-icon",
};

// Script modules must be served from the same origin as the rest of the bundle: if a chunk were
// redirected to framerusercontent.com, its relative imports would pull a second copy of React.
// Chunks missing from the capture are therefore fetched once from the origin and saved into site/.
const MODULE_EXT = new Set(["mjs", "js", "json"]);

async function backfill(original: string, target: string) {
  const res = await fetch(original);
  if (!res.ok) return null;
  const buf = Buffer.from(await res.arrayBuffer());
  fs.mkdirSync(nodePath.dirname(target), { recursive: true });
  fs.writeFileSync(target, buf);
  return target;
}

// Serves captured Framer assets locally; non-module assets missing from the capture redirect to their origin.
export async function GET(req: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  const { search } = new URL(req.url);
  const original = `https://${path.join("/")}${search}`;
  const ext = (path[path.length - 1].split(".").pop() || "").toLowerCase();
  if (path.some((p) => p.includes(".."))) return new Response("Bad request", { status: 400 });
  const direct = nodePath.join(SITE_DIR, ...path);
  let file = assetPath(original) ?? (!search && fs.existsSync(direct) ? direct : null);
  if ((!file || !fs.existsSync(file)) && MODULE_EXT.has(ext) && !search) file = await backfill(original, direct);
  if (!file || !fs.existsSync(file)) return Response.redirect(original, 302);
  const type = TYPES[ext] ?? "application/octet-stream";
  const headers = { "content-type": type, "cache-control": "public, max-age=31536000, immutable" };
  if (ext === "css") return new Response(rewriteUrls(fs.readFileSync(file, "utf8")), { headers });
  return new Response(fs.readFileSync(file), { headers });
}
