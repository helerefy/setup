"use client";

import type { CSSProperties } from "react";

/** Show the real statistic in SSR instead of an initial zero waiting for scroll. */
export default function CountUp({ end, style }: { end: number; style?: CSSProperties }) {
  return (
    <span style={style}>
      {end}
    </span>
  );
}
