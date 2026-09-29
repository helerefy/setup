"use client";

import { useEffect } from "react";

/** Page-level behaviours of the original runtime that the ported markup needs:
 *  - videos without autoplay play while visible (Framer Video "play in view")
 *  - non-anchor elements with data-href act as links */
export default function HomeEffects() {
  useEffect(() => {
    const videos = [...document.querySelectorAll<HTMLVideoElement>("#main video")].filter((v) => !v.autoplay);
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach(({ target, isIntersecting }) => {
          const v = target as HTMLVideoElement;
          v.muted = true;
          if (isIntersecting) v.play().catch(() => {});
          else v.pause();
        }),
      { threshold: 0 },
    );
    videos.forEach((v) => io.observe(v));
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>("[data-href]");
      if (!el || (e.target as HTMLElement).closest("a")) return;
      window.location.href = el.dataset.href!;
    };
    document.addEventListener("click", onClick);
    return () => {
      io.disconnect();
      document.removeEventListener("click", onClick);
    };
  }, []);
  return null;
}
