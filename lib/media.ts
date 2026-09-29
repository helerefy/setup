import map from "./media-map.json";

const MEDIA = map as Record<string, string>;

/** Resolves an original asset URL to its locally hosted copy in /public/media. */
export function m(url: string): string {
  return MEDIA[url] ?? url;
}

/** Same as `m` for every URL inside a srcset string. */
export function ms(srcset: string): string {
  return srcset.replace(/https:\/\/framerusercontent\.com\/\S+/g, (u) => m(u));
}
