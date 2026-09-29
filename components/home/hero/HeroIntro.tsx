"use client";

import { useEffect, useMemo, useState } from "react";
import type { Transition } from "motion/react";
import MorphTree from "@/components/morph/MorphTree";
import type { MorphNode } from "@/components/morph/types";
import type { Breakpoint } from "@/lib/breakpoint";
import { useNavbar } from "@/components/nav/Navbar";
import { hero_dsk } from "../data/hero_dsk";
import { hero_tab } from "../data/hero_tab";
import { hero_mob } from "../data/hero_mob";
import { heroNav_dsk } from "../data/heroNav_dsk";
import { heroNav_tab } from "../data/heroNav_tab";
import { heroNav_mob } from "../data/heroNav_mob";

const HERO: Record<Breakpoint, MorphNode[]> = { dsk: hero_dsk, tab: hero_tab, mob: hero_mob };
const NAV: Record<Breakpoint, MorphNode[]> = { dsk: heroNav_dsk, tab: heroNav_tab, mob: heroNav_mob };

const ease = [0.68, 0, 0.36, 1] as const;
const t = (duration: number): Transition => ({ duration, ease: [...ease] });

/** Intro timeline per breakpoint: when each captured state starts (ms) and how it animates in.
 * Timings/easings come from the original HeroIntro + NavContainer components; the first step waits
 * as long as the original page does before its intro starts. */
const TIMELINE: Record<Breakpoint, [number, Transition][]> = {
  dsk: [[0, t(0)], [980, t(1)], [2513, t(1)], [4051, t(1)], [4997, t(0.2)]],
  tab: [[0, t(0)], [980, t(1)], [2544, t(1)], [4091, t(1)], [4967, t(0.3)]],
  mob: [[0, t(0)], [980, t(1)], [2519, t(1)], [4077, t(1)], [4134, t(0.2)]],
};

/** The intro navbar (NavContainer) runs on its own clock: [start ms, transition] per captured state. */
const NAV_TIMELINE: Record<Breakpoint, [number, Transition][]> = {
  dsk: [[0, t(0)], [4000, t(0.7)], [4696, t(0)]],
  tab: [[0, t(0)], [4190, t(0.7)], [4890, t(0)]],
  mob: [[0, t(0)], [4340, t(0.7)], [5040, t(0)]],
};

/** The intro plays once per page lifetime (the original skips it on in-app navigation). */
let introShown = false;

/** Swaps the navbar inside the intro nav container for the interactive navbar state. */
function withNavbar(container: MorphNode, navbar: MorphNode): MorphNode {
  const swap = (n: MorphNode): MorphNode => {
    if ((n.c ?? "").includes("framer-g5d54")) return { ...navbar, k: n.k };
    return n.ch ? { ...n, ch: n.ch.map((c) => (typeof c === "string" ? c : swap(c))) } : n;
  };
  return swap(container);
}

export default function HeroIntro({ bp }: { bp: Breakpoint }) {
  const states = HERO[bp];
  const last = states.length - 1;
  const navLast = NAV_TIMELINE[bp].length - 1;
  const [step, setStep] = useState(() => (introShown ? last : 0));
  const [navStep, setNavStep] = useState(() => (introShown ? navLast : 0));
  const navbar = useNavbar(bp);

  useEffect(() => {
    if (step === last) return;
    const timers = [
      ...TIMELINE[bp].map(([at], i) => (i === 0 ? 0 : window.setTimeout(() => setStep(i), at))),
      ...NAV_TIMELINE[bp].map(([at], i) => (i === 0 ? 0 : window.setTimeout(() => setNavStep(i), at))),
    ];
    return () => timers.forEach((id) => id && clearTimeout(id));
    // run once per breakpoint mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bp]);
  useEffect(() => {
    if (step === last && navStep === navLast) introShown = true;
  }, [step, last, navStep, navLast]);

  const hero = states[step];
  const navTransition = NAV_TIMELINE[bp][navStep][1];
  const done = navStep === navLast;
  // menu interactions start after the final intro step has been applied
  const [interactive, setInteractive] = useState(false);
  useEffect(() => {
    if (!done) return;
    const id = requestAnimationFrame(() => setInteractive(true));
    return () => cancelAnimationFrame(id);
  }, [done]);
  const navContainer = NAV[bp][navStep];
  const nav = useMemo(() => (interactive ? withNavbar(navContainer, navbar.node) : navContainer), [interactive, navContainer, navbar.node]);
  const transition = TIMELINE[bp][step][1];

  return (
    <MorphTree
      node={hero}
      transition={transition}
      slots={{ nav: <MorphTree node={nav} transition={interactive ? navbar.transition : navTransition} bind={interactive ? navbar.bind : undefined} /> }}
    />
  );
}
