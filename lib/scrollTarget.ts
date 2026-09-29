"use client";

import { useEffect, useState } from "react";
import { animate, type MotionValue, type Transition } from "motion/react";

const visible = (e: Element) => e.getBoundingClientRect().height > 0;
const find = (selector: string) => [...document.querySelectorAll(selector)].find(visible);

/** Progress (0..1) of an "on scroll target" effect: 0 until the target's top reaches
 * `threshold` × viewport height, 1 once it has travelled its own height past that line. */
export function scrollProgress(target: Element, threshold: number) {
  const r = target.getBoundingClientRect();
  return Math.min(1, Math.max(0, (window.innerHeight * threshold - r.top) / Math.max(1, r.height)));
}

/** True once the target passed the threshold line (reverts when scrolling back). */
export function useScrollTarget(selector: string, threshold: number) {
  const [reached, setReached] = useState(false);
  useEffect(() => {
    const check = () => {
      const el = find(selector);
      if (el) setReached(el.getBoundingClientRect().top <= window.innerHeight * threshold);
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [selector, threshold]);
  return reached;
}

export type Track = { value: MotionValue<number>; from: number; to: number };

/** Drives motion values from scroll progress through `target`, smoothed by `transition`
 * (the original's spring). `enabled=false` holds the final values. */
export function useScrollLinked(selector: string, threshold: number, tracks: Track[], transition: Transition, enabled = true) {
  useEffect(() => {
    const update = (instant = false) => {
      const el = find(selector);
      const p = !enabled ? 1 : el ? scrollProgress(el, threshold) : 0;
      for (const t of tracks) {
        const v = t.from + (t.to - t.from) * p;
        if (instant) t.value.jump(v);
        else animate(t.value, v, transition);
      }
    };
    update(true);
    const onScroll = () => update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
    // tracks are stable motion values created by the caller
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selector, threshold, enabled]);
}
