"use client";

import { createElement, type ReactNode } from "react";
import { motion, type Transition } from "motion/react";
import { m, ms } from "@/lib/media";
import type { MorphNode } from "./types";
import { useLocale } from "@/components/LocaleProvider";
import { hr, tr, type Locale } from "@/lib/i18n";

/** Style properties animated between states; everything else is applied as-is. */
const ANIMATED = new Set(["opacity", "background-color", "color"]);
const camel = (k: string) => (k.startsWith("--") ? k : k.replace(/-([a-z])/g, (_, c) => c.toUpperCase()));
const BOOL = new Set(["autoplay", "muted", "loop", "playsinline", "required", "allowfullscreen"]);
const ATTR: Record<string, string> = {
  autoplay: "autoPlay", playsinline: "playsInline", srcset: "srcSet", tabindex: "tabIndex",
  autocomplete: "autoComplete", frameborder: "frameBorder", allowfullscreen: "allowFullScreen",
};

export type Bind = (node: MorphNode) => Record<string, unknown> | undefined;

type Props = {
  node: MorphNode;
  transition?: Transition;
  /** attach extra props (event handlers, refs) to specific nodes */
  bind?: Bind;
  /** set to false to render without layout animations */
  layout?: boolean;
  /** content injected into nodes carrying a `data-slot` attribute */
  slots?: Record<string, ReactNode>;
  /** per-subtree transitions: the first rule whose class token matches a node applies to it and its descendants */
  transitions?: [string, Transition][];
  /** replace the rendering of specific nodes (return undefined to keep the default) */
  replace?: (node: MorphNode, key?: string) => ReactNode | undefined;
};

const cache = new Map<string, unknown>();
function motionTag(tag: string) {
  if (!cache.has(tag)) cache.set(tag, (motion as unknown as Record<string, unknown>)[tag] ?? motion.div);
  return cache.get(tag) as React.ElementType;
}

function render(n: MorphNode | string, p: Omit<Props, "node"> & { l: Locale }, key?: string): ReactNode {
  if (typeof n === "string") return tr(p.l, n);
  if (n.t === "style") return <style key={key} dangerouslySetInnerHTML={{ __html: n.h ?? "" }} />;
  const replaced = p.replace?.(n, key);
  if (replaced !== undefined) return replaced;
  const tokens = (n.c ?? "").split(" ");
  const rule = p.transitions?.find(([cls]) => tokens.includes(cls));
  if (rule) p = { ...p, transition: rule[1] };
  const style: Record<string, string> = {};
  const animate: Record<string, string | number> = {};
  let template: string | undefined;
  for (const [k, v] of Object.entries(n.s ?? {})) {
    if (k === "transform") template = v;
    else if (ANIMATED.has(k)) animate[camel(k)] = k === "opacity" ? Number(v) : v;
    else style[camel(k)] = v;
  }
  const props: Record<string, unknown> = { key, className: n.c, style };
  for (const [k, v] of Object.entries(n.a ?? {})) {
    const name = ATTR[k] ?? k;
    if (BOOL.has(k)) props[name] = true;
    else if (k === "src" || k === "poster") props[name] = m(v);
    else if (k === "srcset") props[name] = ms(v);
    else if (k === "href") props[name] = hr(p.l, v);
    else props[name] = v;
  }
  if (n.t === "video") {
    props.muted = true;
    // The intro animation is scheduled by HeroIntro after hydration. Starting the
    // short clip during SSR can leave it frozen before the black-card animation ends.
    if (/11fQjZ8SBLFtf9GDiGqEbzqKI8|vMHevGIeALFuIZsCH4NOQ9K5FRM/.test(n.a?.src ?? "")) {
      props.autoPlay = false;
      props.preload = "auto";
    }
    // React does not emit the `muted` attribute, which autoplay requires.
    props.ref = (el: HTMLVideoElement | null) => {
      if (el && !el.muted) el.muted = true;
      if (el && el.autoplay && el.paused) el.play().catch(() => {});
    };
  }
  const isMotion = p.layout !== false;
  if (isMotion) {
    props.initial = false;
    props.animate = animate;
    props.transition = p.transition;
    // Rich text blocks only animate their position (as on the original); their size snaps.
    const isText = (n.c ?? "").split(" ").includes("framer-text");
    const hasText = n.ch?.some((c) => typeof c !== "string" && (c.c ?? "").split(" ").includes("framer-text"));
    props.layout = isText ? false : hasText ? "position" : true;
    if (template) props.transformTemplate = (_: unknown, generated: string) => `${template} ${generated === "none" ? "" : generated}`;
  } else {
    Object.assign(style, animate);
    if (template) style.transform = template;
  }
  const extra = p.bind?.(n);
  if (extra) {
    const { style: extraStyle, ...rest } = extra as { style?: Record<string, string> };
    Object.assign(style, extraStyle);
    Object.assign(props, rest);
  }
  if (n.h !== undefined) props.dangerouslySetInnerHTML = { __html: n.h };
  const slot = n.a?.["data-slot"];
  const children =
    slot !== undefined
      ? p.slots?.[slot]
      : n.h !== undefined
        ? undefined
        : n.ch?.map((c, i) => render(c, p, typeof c === "string" ? `t${i}` : c.k));
  return createElement(isMotion ? motionTag(n.t) : n.t, props, children);
}

/** Renders one captured component state; switching `node` between states of the same
 * component animates layout/style differences the way the original site does. */
export default function MorphTree({ node, ...rest }: Props) {
  const l = useLocale();
  return <>{render(node, { ...rest, l }, node.k ?? "root")}</>;
}
