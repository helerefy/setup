"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { animate, useInView, useMotionValue } from "motion/react";

/** Number that counts from 0 to `end` once 60% of it is visible (same as the original Counter). */
export default function CountUp({ end, duration = 1, style }: { end: number; duration?: number; style?: CSSProperties }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { amount: 0.6, once: true });
  const value = useMotionValue(0);
  const [shown, setShown] = useState(0);
  useEffect(() => value.on("change", (v) => setShown(Math.round(v))), [value]);
  useEffect(() => {
    if (inView) animate(value, end, { duration });
  }, [inView, end, duration, value]);
  return (
    <span ref={ref} style={style}>
      {shown}
    </span>
  );
}
