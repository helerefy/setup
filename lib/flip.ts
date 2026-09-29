import { animate, type Transition } from "motion/react";

type Snap = { el: HTMLElement; rect: DOMRect; bg: string; color: string; opacity: string; inline: { bg: string; color: string } };

const snapshot = (root: HTMLElement): Snap[] =>
  [root, ...root.querySelectorAll<HTMLElement>("*")]
    .filter((el) => !(el instanceof SVGElement) || el.tagName.toLowerCase() === "svg")
    .map((el) => {
      const cs = getComputedStyle(el);
      return { el, rect: el.getBoundingClientRect(), bg: cs.backgroundColor, color: cs.color, opacity: cs.opacity, inline: { bg: el.style.backgroundColor, color: el.style.color } };
    });

// boxes containing text only move (scaling them would distort the glyphs)
const isText = (el: HTMLElement) => el.classList.contains("framer-text") || !!el.querySelector(".framer-text");

/** Applies a DOM change (e.g. a variant class swap) and animates every element from its previous
 * box/colours to the new ones — the same visual result as the original layout animations. */
export function flip(root: HTMLElement, change: () => void, transition: Transition) {
  const before = snapshot(root);
  change();
  for (const { el, rect, bg, color, opacity, inline } of before) {
    if (!el.isConnected) continue;
    const now = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    const kf: Record<string, unknown> = {};
    const dx = rect.left - now.left, dy = rect.top - now.top;
    const sx = now.width ? rect.width / now.width : 1, sy = now.height ? rect.height / now.height : 1;
    if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5 || Math.abs(sx - 1) > 0.005 || Math.abs(sy - 1) > 0.005) {
      // keep authored rotations (e.g. flipped arrow icons) while animating
      const rot = /rotate\((-?[\d.]+)deg\)/.exec(el.style.transform);
      if (rot) kf.rotate = Number(rot[1]);
      else el.style.transformOrigin = "0 0";
      kf.x = [dx, 0];
      kf.y = [dy, 0];
      if (!isText(el)) {
        kf.scaleX = [sx, 1];
        kf.scaleY = [sy, 1];
      }
    }
    if (bg !== cs.backgroundColor) kf.backgroundColor = [bg, cs.backgroundColor];
    if (color !== cs.color) kf.color = [color, cs.color];
    if (opacity !== cs.opacity) kf.opacity = [Number(opacity), Number(cs.opacity)];
    if (Object.keys(kf).length) {
      // colours are animated inline, then handed back to the stylesheet / authored inline value
      const target = { bg: el.style.backgroundColor, color: el.style.color };
      animate(el, kf as never, transition).then(() => {
        if (kf.backgroundColor) el.style.backgroundColor = target.bg || inline.bg;
        if (kf.color) el.style.color = target.color || inline.color;
      });
    }
  }
}
