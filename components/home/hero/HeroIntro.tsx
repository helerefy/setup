"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { m } from "@/lib/media";
import type { Transition } from "motion/react";
import MorphTree from "@/components/morph/MorphTree";
import type { MorphNode } from "@/components/morph/types";
import type { Breakpoint } from "@/lib/breakpoint";
import VONav from "@/components/nav/VONav";
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
  dsk: [[0, t(0)], [680, t(1)], [2213, t(1)], [3751, t(1)], [4697, t(0.2)]],
  tab: [[0, t(0)], [680, t(1)], [2244, t(1)], [3791, t(1)], [4667, t(0.3)]],
  mob: [[0, t(0)], [680, t(1)], [2219, t(1)], [3777, t(1)], [3834, t(0.2)]],
};

/** The intro navbar (NavContainer) runs on its own clock: [start ms, transition] per captured state. */
const NAV_TIMELINE: Record<Breakpoint, [number, Transition][]> = {
  dsk: [[0, t(0)], [3700, t(0.7)], [4396, t(0)]],
  tab: [[0, t(0)], [3890, t(0.7)], [4590, t(0)]],
  mob: [[0, t(0)], [4040, t(0.7)], [4740, t(0)]],
};

const INTRO = "framer-6fryqe-container";
const LOOP = "framer-1tmdk75-container";
const LOOP_CLIP: Record<Breakpoint, string> = {
  dsk: "https://framerusercontent.com/assets/60TSo4WrKzA27Mp4KCDTmVbhc.webm",
  tab: "https://framerusercontent.com/assets/60TSo4WrKzA27Mp4KCDTmVbhc.webm",
  mob: "https://framerusercontent.com/assets/Egmkpbap1BsPBzttkhndGBGHLQ.webm",
};

/** Once the intro clip has ended its element keeps playing the looping clip, so the hero video never
 * stands still; the separate loop layer is then not needed. */
function continuous(n: MorphNode): MorphNode {
  const cls = n.c ?? "";
  if (cls.includes(INTRO)) return { ...n, s: { ...n.s, opacity: "1" } };
  if (cls.includes(LOOP)) return { ...n, s: { ...n.s, opacity: "0" } };
  return n.ch ? { ...n, ch: n.ch.map((c) => (typeof c === "string" ? c : continuous(c))) } : n;
}

/** The intro plays once per page lifetime (the original skips it on in-app navigation). */
let introShown = false;

export default function HeroIntro({ bp }: { bp: Breakpoint }) {
  const states = HERO[bp];
  const last = states.length - 1;
  const navLast = NAV_TIMELINE[bp].length - 1;
  const [step, setStep] = useState(() => (introShown ? last : 0));
  const [navStep, setNavStep] = useState(() => (introShown ? navLast : 0));

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

  // intro clip -> looping clip hand-over inside the same <video>
  const root = useRef<HTMLSpanElement>(null);
  const [looping, setLooping] = useState(false);
  useEffect(() => {
    const video = root.current?.parentElement?.querySelector<HTMLVideoElement>(`.${INTRO} video`);
    if (!video || !root.current?.parentElement?.getBoundingClientRect().width) return;
    const toLoop = () => {
      video.src = m(LOOP_CLIP[bp]);
      video.loop = true;
      video.autoplay = true;
      video.play().catch(() => {});
      setLooping(true);
    };
    video.muted = true;
    video.currentTime = 0;
    video.play().catch(() => {});
    if (video.ended) toLoop();
    video.addEventListener("ended", toLoop);
    return () => video.removeEventListener("ended", toLoop);
  }, [bp]);

  const hero = useMemo(() => (looping ? continuous(states[step]) : states[step]), [looping, states, step]);
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
  const nav = navContainer;
  const transition = TIMELINE[bp][step][1];

  return (
    <>
      <span ref={root} hidden />
      <MorphTree
      node={hero}
      transition={transition}
        slots={{ nav: interactive ? <VONav /> : <MorphTree node={nav} transition={navTransition} /> }}
      />
    </>
  );
}
