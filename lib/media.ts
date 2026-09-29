import map from "./media-map.json";

const MEDIA = map as Record<string, string>;

/** VO imagery replacing the original report's photos (matched by file name). */
const VO_IMAGES: Record<string, string> = {
  "ytblsBi2O0C6jtd1PYCTXAczI.jpg": "/vo/employees.webp",
  "ILvJ4Wz4i6yJ8F12oB7DbSiYhI.png": "/vo/team.png",
  "maxresdefault.webp": "/vo/team.png",
  "BjnduoVw73i89zvx0jvqhBI6pY.png": "/vo/products/1.jpg",
  "aoiJOJb5U9lPHiXQOrywfzn8ftQ.png": "/vo/products/2.jpg",
  "sVDqVYB6apEiCQWv3SUiu02DuE.jpg": "/vo/products/3.jpg",
  "9q6atfyxUQWgbbNEpOcKeKHVMo8.png": "/vo/products/4.jpg",
  "qsqwQqO5XlCp5ZWs7hJuiL0Y.png": "/vo/products/5.jpg",
  "vdlaU7hXYvHA03hPLaBqE2TMTIA.jpg": "/vo/products/7.jpg",
  "rd6RC3C2g354mvaTXc22Z8hsrkI.png": "/vo/products/8.jpg",
};
const fileOf = (url: string) => url.split("?")[0].split("/").pop() ?? "";

/** Resolves an asset URL of the original design to the locally hosted (or VO replacement) file. */
export function m(url: string): string {
  return VO_IMAGES[fileOf(url)] ?? MEDIA[url] ?? url;
}

/** Same as `m` for every URL inside a srcset string. */
export function ms(srcset: string): string {
  const parts = srcset.split(",").map((p) => p.trim().split(/\s+/));
  const first = parts[0]?.[0] ?? "";
  if (VO_IMAGES[fileOf(first)]) return VO_IMAGES[fileOf(first)];
  return srcset.replace(/https:\/\/(framerusercontent\.com|i\.ytimg\.com)\/\S+/g, (u) => m(u));
}
