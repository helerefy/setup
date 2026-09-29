import fs from "node:fs";
import { assetPath, rewriteUrls } from "@/lib/site";

const TYPES: Record<string, string> = {
  mjs: "text/javascript", js: "text/javascript", css: "text/css", json: "application/json",
  woff2: "font/woff2", woff: "font/woff", ttf: "font/ttf", png: "image/png", jpg: "image/jpeg",
  jpeg: "image/jpeg", webp: "image/webp", avif: "image/avif", gif: "image/gif", svg: "image/svg+xml",
  webm: "video/webm", mp4: "video/mp4", ico: "image/x-icon",
};

// Serves captured Framer assets locally; anything not in the capture falls back to its origin.
export async function GET(req: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  const { search } = new URL(req.url);
  const original = `https://${path.join("/")}${search}`;
  const file = assetPath(original);
  if (!file || !fs.existsSync(file)) return Response.redirect(original, 302);
  const ext = (path[path.length - 1].split(".").pop() || "").toLowerCase();
  const type = TYPES[ext] ?? "application/octet-stream";
  const headers = { "content-type": type, "cache-control": "public, max-age=31536000, immutable" };
  if (ext === "css") return new Response(rewriteUrls(fs.readFileSync(file, "utf8")), { headers });
  return new Response(fs.readFileSync(file), { headers });
}
