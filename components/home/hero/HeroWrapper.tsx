"use client";

import { useBreakpoint } from "@/lib/breakpoint";
import HeroIntro from "./HeroIntro";

/** Hero + intro preloader. Every breakpoint variant is rendered for SSR (CSS shows the right
 * one); after mount only the active breakpoint stays mounted and plays its intro. */
export default function HeroWrapper() {
  const bp = useBreakpoint();
  return (
    <div className="framer-1pvi92h" data-framer-name="Hero Wrapper">
      {(bp === null || bp === "dsk") && (
        <div className="framer-u5ru7r-container hidden-t69d6d hidden-12sschj">
          <HeroIntro bp="dsk" />
        </div>
      )}
      {(bp === null || bp === "tab") && (
        <div className="ssr-variant">
          <div className="framer-1uo1g5e-container hidden-72rtr7 hidden-12sschj hidden-miin9m">
            <HeroIntro bp="tab" />
          </div>
        </div>
      )}
      {(bp === null || bp === "mob") && (
        <div className="ssr-variant">
          <div className="framer-154x0up-container hidden-72rtr7 hidden-t69d6d hidden-miin9m">
            <HeroIntro bp="mob" />
          </div>
        </div>
      )}
    </div>
  );
}
