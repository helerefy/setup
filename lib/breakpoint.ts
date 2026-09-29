"use client";

import { useEffect, useState } from "react";

/** Site breakpoints (same media queries as the original). */
export type Breakpoint = "dsk" | "tab" | "mob";
const QUERIES: [Breakpoint, string][] = [
  ["mob", "(max-width: 767.98px)"],
  ["tab", "(min-width: 768px) and (max-width: 1199.98px)"],
];

function current(): Breakpoint {
  for (const [bp, q] of QUERIES) if (window.matchMedia(q).matches) return bp;
  return "dsk";
}

/** Returns null during SSR/first render (render every variant, CSS picks one), then the active breakpoint. */
export function useBreakpoint(): Breakpoint | null {
  const [bp, setBp] = useState<Breakpoint | null>(null);
  useEffect(() => {
    const update = () => setBp(current());
    update();
    const mqs = QUERIES.map(([, q]) => window.matchMedia(q));
    mqs.forEach((mq) => mq.addEventListener("change", update));
    return () => mqs.forEach((mq) => mq.removeEventListener("change", update));
  }, []);
  return bp;
}
