"use client";

import { useCallback, useEffect, useState } from "react";
import type { Transition } from "motion/react";
import MorphTree, { type Bind } from "@/components/morph/MorphTree";
import type { MorphNode } from "@/components/morph/types";
import type { Breakpoint } from "@/lib/breakpoint";
import { navbar_dsk } from "@/components/home/data/navbar_dsk";
import { navbar_tab } from "@/components/home/data/navbar_tab";
import { navbar_mob } from "@/components/home/data/navbar_mob";

type NavState = "collapsed" | "chapters" | "cases" | "menu" | "menuChapters" | "menuCases";
const STATES: Record<Breakpoint, MorphNode[]> = { dsk: navbar_dsk, tab: navbar_tab, mob: navbar_mob };
const MENU_TRANSITION: Transition = { duration: 0.5, ease: [0.59, 0, 0.38, 1] };

export function navbarNode(bp: Breakpoint, state: NavState): MorphNode {
  const list = STATES[bp] as (MorphNode & { name?: string })[];
  return list.find((s) => s.name === state) ?? list.find((s) => s.name === "collapsed")!;
}

const text = (n: MorphNode): string =>
  (n.ch ?? []).map((c) => (typeof c === "string" ? c : text(c))).join(" ");

/** Interaction wiring for the captured navbar: toggles between its open/closed states. */
export function useNavbar(bp: Breakpoint) {
  const [state, setState] = useState<NavState>("collapsed");
  const toggle = useCallback((s: NavState) => setState((cur) => (cur === s ? "collapsed" : s)), []);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setState("collapsed");
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  const bind: Bind = (n) => {
    const c = n.c ?? "";
    const click = (s: NavState) => ({
      onClick: (e: React.MouseEvent) => { e.preventDefault(); e.stopPropagation(); toggle(s); },
      style: { cursor: "pointer" },
    });
    if (bp === "dsk") {
      if (c.includes("framer-pq78dt")) return click("chapters");
      if (c.includes("framer-alTDd") && /Case Studies/.test(text(n))) return click("cases");
      if (c.includes("framer-bg6jc3")) return { onClick: () => setState("collapsed") };
    } else {
      const go = (s: NavState) => ({
        onClick: (e: React.MouseEvent) => { e.preventDefault(); e.stopPropagation(); setState(s); },
        style: { cursor: "pointer" },
      });
      if (c.includes("framer-pq78dt")) return go(state === "collapsed" ? "menu" : "collapsed");
      if (c.includes("framer-108duzj-container")) return go("menuChapters");
      if (c.includes("framer-iqp5fg-container")) return go("menuCases");
      if (c.includes("framer-1rbqwms-container") || c.includes("framer-n30z0i")) return go("menu");
    }
    return undefined;
  };
  return { state, node: navbarNode(bp, state), bind, transition: MENU_TRANSITION };
}

export default function Navbar({ bp }: { bp: Breakpoint }) {
  const { node, bind, transition } = useNavbar(bp);
  return <MorphTree node={node} bind={bind} transition={transition} />;
}
