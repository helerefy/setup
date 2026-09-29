"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import VONav from "@/components/nav/VONav";
import { useBreakpoint } from "@/lib/breakpoint";
import { scrollProgress } from "@/lib/scrollTarget";

/** px of continuous scrolling in one direction before the bar reacts */
const DIRECTION_THRESHOLD = 20;

/** Fixed navbar: slides down (scroll-linked) as the `#swap` marker at the top of Partners passes the
 * top of the viewport; afterwards it hides while scrolling down and returns while scrolling up. */
export default function NavContainer() {
  const bp = useBreakpoint();
  const base = useMotionValue(-60);
  const dir = useMotionValue(0);
  const baseY = useSpring(base, { stiffness: 500, damping: 60, mass: 1 });
  const dirY = useSpring(dir, { stiffness: 307, damping: 36, mass: 1.1 });
  const y = useTransform(() => baseY.get() + dirY.get());

  useEffect(() => {
    let last = window.scrollY;
    let acc = 0;
    const onScroll = () => {
      const swap = document.getElementById("swap");
      base.set(-60 + 60 * (swap ? scrollProgress(swap, 0) : 0));
      const d = window.scrollY - last;
      last = window.scrollY;
      if (d === 0) return;
      acc = Math.sign(d) === Math.sign(acc) ? acc + d : d;
      if (Math.abs(acc) >= DIRECTION_THRESHOLD) dir.set(acc > 0 ? -58 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [base, dir]);

  return (
    <motion.div className="framer-3azmvu" data-framer-name="Nav Container" style={{ y, opacity: 1, willChange: "transform" }}>
      <div className="framer-wy04pl-container"><VONav /></div>
    </motion.div>
  );
}
