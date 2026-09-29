"use client";

import { useEffect } from "react";
import type { Transition } from "motion/react";
import { flip } from "@/lib/flip";
import DIFFS from "@/lib/hover-diffs.json";

type Diff = { path: number[]; style: Record<string, [string | null, string | null]>; class?: [string, string]; href?: [string, string] };
const HOVER = DIFFS as Record<string, Diff[]>;

const ease = (duration: number, e = [0.12, 0.23, 0.5, 1]): Transition => ({ duration, ease: e });
/** Hover transitions of the original components, by component class. */
const TRANSITIONS: [string, Transition][] = [
  ["framer-alTDd", { duration: 0.4, ease: [0.59, 0, 0.38, 1] }],
  ["framer-vE4nx", { duration: 0.4, ease: [0.59, 0, 0.38, 1] }],
  ["framer-CFeAC", ease(0.2)],
  ["framer-1oGtc", { type: "spring", bounce: 0, duration: 0.6 }],
  ["framer-AkUGB", ease(0.3)],
  ["framer-NvcHQ", ease(0.3)],
  ["framer-GFdRC", ease(0.3)],
  ["framer-g1bt4", ease(0.3)],
];
const ROOT_SELECTOR = TRANSITIONS.map(([c]) => `.${c}`).join(",");

const at = (root: Element, path: number[]) => path.reduce<Element | undefined>((el, i) => el?.children[i], root);
const hovered = new WeakMap<HTMLElement, string>();

function apply(root: HTMLElement, on: boolean) {
  const base = on ? root.className : hovered.get(root);
  const diffs = base ? HOVER[base] : undefined;
  if (!diffs) return false;
  if (on) hovered.set(root, base!);
  else hovered.delete(root);
  for (const d of diffs) {
    const el = at(root, d.path) as HTMLElement | undefined;
    if (!el) continue;
    if (d.class) el.setAttribute("class", on ? d.class[1] : d.class[0]);
    if (d.href) el.setAttribute("href", on ? d.href[1] : d.href[0]);
    for (const [k, [from, to]] of Object.entries(d.style)) {
      const v = on ? to : from;
      if (v === null) el.style.removeProperty(k);
      else el.style.setProperty(k, v);
    }
  }
  return true;
}

/** Reproduces hover states of the original components (captured default/hover differences),
 * animating layout and colour changes. */
export default function HoverEffects() {
  useEffect(() => {
    const handler = (on: boolean) => (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const root = (e.target as HTMLElement).closest?.<HTMLElement>(ROOT_SELECTOR);
      if (!root || (e.relatedTarget instanceof Node && root.contains(e.relatedTarget))) return;
      if (on === hovered.has(root)) return;
      const transition = TRANSITIONS.find(([c]) => root.classList.contains(c))![1];
      flip(root, () => apply(root, on), transition);
    };
    const over = handler(true), out = handler(false);
    document.addEventListener("pointerover", over);
    document.addEventListener("pointerout", out);
    return () => {
      document.removeEventListener("pointerover", over);
      document.removeEventListener("pointerout", out);
    };
  }, []);
  return null;
}
