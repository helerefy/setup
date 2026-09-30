"use client";

import { useEffect } from "react";
import { animate, motionValue, type Transition } from "motion/react";
import { scrollProgress } from "@/lib/scrollTarget";

type TargetFX = {
  /** elements to animate */
  selector: string;
  /** element whose position triggers the effect */
  target: string;
  /** fraction of the viewport height the target's top must pass */
  threshold: number;
  from: Record<string, number>;
  to: Record<string, number>;
  transition: Transition;
};

/** Scroll-linked "on scroll target" effects of the original page, smoothed by its spring. */
const TARGET_FX: TargetFX[] = [
  {
    selector: ".framer-1qdhugg",
    target: "#home-quote",
    threshold: 1,
    from: { scale: 2 },
    to: { scale: 1 },
    transition: { type: "spring", stiffness: 500, damping: 60, mass: 1 },
  },
];

const visible = (e: Element) => e.getBoundingClientRect().height > 0;

export default function ScrollEffects() {
  useEffect(() => {
    const cleanups: (() => void)[] = [];
    for (const fx of TARGET_FX) {
      const els = [...document.querySelectorAll<HTMLElement>(fx.selector)];
      const values = Object.fromEntries(Object.keys(fx.from).map((k) => [k, motionValue(fx.from[k])]));
      const apply = () => els.forEach((el) => {
        const v = Object.fromEntries(Object.entries(values).map(([k, mv]) => [k, mv.get()]));
        const t = [v.y !== undefined ? `translateY(${v.y}px)` : "", v.scale !== undefined ? `scale(${v.scale})` : ""].join(" ").trim();
        if (t) el.style.transform = t;
        if (v.opacity !== undefined) el.style.opacity = String(v.opacity);
      });
      Object.values(values).forEach((mv) => cleanups.push(mv.on("change", apply)));
      const check = (instant = false) => {
        const t = [...document.querySelectorAll(fx.target)].find(visible);
        if (!t) return;
        const p = scrollProgress(t, fx.threshold);
        for (const [k, mv] of Object.entries(values)) {
          const v = fx.from[k] + (fx.to[k] - fx.from[k]) * p;
          if (instant) mv.jump(v);
          else animate(mv, v, fx.transition);
        }
        if (instant) apply();
      };
      check(true);
      const onScroll = () => check();
      window.addEventListener("scroll", onScroll, { passive: true });
      cleanups.push(() => window.removeEventListener("scroll", onScroll));
    }
    return () => cleanups.forEach((c) => c());
  }, []);
  return null;
}
