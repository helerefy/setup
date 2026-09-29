"use client";
import { useEffect } from "react";

// Replaces the Framer runtime's scroll/appear animations: elements exported with
// an initial hidden state (opacity:0 / offset transform) fade in when they enter the viewport.
export default function Reveal() {
  useEffect(() => {
    const hidden = Array.from(document.querySelectorAll<HTMLElement>("#main [style]")).filter(
      (el) => el.style.opacity === "0" || el.style.opacity === "0.001"
    );
    const show = (el: HTMLElement) => {
      el.style.transition = "opacity 0.8s cubic-bezier(.44,0,.56,1), transform 0.8s cubic-bezier(.44,0,.56,1)";
      el.style.opacity = "1";
      el.style.transform = "none";
    };
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && (show(e.target as HTMLElement), io.unobserve(e.target))),
      { rootMargin: "0px 0px -10% 0px" }
    );
    hidden.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
