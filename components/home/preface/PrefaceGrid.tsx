"use client";

import { useMotionValue, type Transition } from "motion/react";
import MorphTree, { type Bind } from "@/components/morph/MorphTree";
import type { MorphNode } from "@/components/morph/types";
import type { Breakpoint } from "@/lib/breakpoint";
import { useScrollLinked, useScrollTarget } from "@/lib/scrollTarget";
import CountUp from "../fx/CountUp";
import { prefaceGrid_dsk } from "../data/prefaceGrid_dsk";
import { prefaceGrid_tab } from "../data/prefaceGrid_tab";
import { prefaceGrid_mob } from "../data/prefaceGrid_mob";

const STATES: Record<Breakpoint, MorphNode[]> = { dsk: prefaceGrid_dsk, tab: prefaceGrid_tab, mob: prefaceGrid_mob };
type Bezier = [number, number, number, number];
const tween = (duration: number, ease: Bezier, delay = 0): Transition => ({ duration, ease, delay });
const EASE: Bezier = [0.59, 0.01, 0.29, 0.99];

/** Transitions of the original HO-PrefaceGrid when switching to its expanded state. */
const EXPAND: [string, Transition][] = [
  ["framer-pltj1g-container", tween(0.8, EASE, 0.2)],
  ["framer-styles-preset-1qemfv6", tween(0.8, EASE, 0.3)],
  ["framer-1s0udrg-container", tween(0.8, EASE, 0.4)],
  ["framer-riu8mt", tween(0.8, EASE, 0.5)],
  ["framer-bfnstw", tween(1.5, EASE)],
];
const COLLAPSE_DEFAULT = tween(1, [0.62, -0.01, 0.36, 0.99]);
const EXPAND_DEFAULT = tween(1, [0.62, -0.01, 0.38, 1]);
const IMAGE_SPRING: Transition = { type: "spring", stiffness: 351, damping: 60, mass: 1 };

/** Preface image + stats. The image rises into place (scroll-linked) as #preface-target-2 enters
 * the viewport; on desktop the stat cards slide in once it reaches the top. */
export default function PrefaceGrid({ bp }: { bp: Breakpoint }) {
  const states = STATES[bp];
  const top = useScrollTarget("#preface-target-2", 0);
  const expanded = states.length > 1 && top;

  const y = useMotionValue(600);
  const scale = useMotionValue(1.5);
  useScrollLinked(
    "#preface-target-2",
    1,
    [{ value: y, from: 600, to: 0 }, { value: scale, from: 1.5, to: 1 }],
    IMAGE_SPRING,
    !expanded,
  );

  const bind: Bind = (n) => ((n.c ?? "").split(" ").includes("framer-bfnstw") ? { style: { y, scale } as never } : undefined);

  return (
    <MorphTree
      node={states[expanded ? 1 : 0]}
      transition={expanded ? EXPAND_DEFAULT : COLLAPSE_DEFAULT}
      transitions={expanded ? EXPAND : undefined}
      bind={bind}
      replace={(n, key) => {
        const end = n.a?.["data-count-end"];
        if (!end) return undefined;
        const span = n.ch?.find((c) => typeof c !== "string" && c.t === "span") as MorphNode | undefined;
        const rest = n.ch?.filter((c) => c !== span) ?? [];
        return (
          <div key={key} style={{ display: "inline-flex", alignItems: "baseline", color: n.s?.color }}>
            <CountUp end={Number(end)} style={Object.fromEntries(Object.entries(span?.s ?? {}).map(([k, v]) => [k.replace(/-([a-z])/g, (_, c) => c.toUpperCase()), v]))} />
            {rest.map((c, i) =>
              typeof c === "string" ? c : <span key={i} style={Object.fromEntries(Object.entries(c.s ?? {}).map(([k, v]) => [k.replace(/-([a-z])/g, (_, ch) => ch.toUpperCase()), v]))}>{(c.ch ?? []).join("")}</span>,
            )}
          </div>
        );
      }}
    />
  );
}
