"use client";

import { useEffect } from "react";
import { setupCarousels } from "@/lib/carousel";
import { products, local } from "@/content/vo";
import type { Locale } from "@/lib/i18n";

/** Page-level behaviours of the original runtime that the ported markup needs:
 *  - videos without autoplay play while visible (Framer Video "play in view")
 *  - non-anchor elements with data-href act as links
 *  - case-study carousels (drag + arrows)
 *  - the VO consultant teaser in the highlight section */
export default function HomeEffects() {
  useEffect(() => {
    const videos = [...document.querySelectorAll<HTMLVideoElement>("#main video")].filter((v) => !v.autoplay && !v.closest(".framer-QJhm9"));
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
    // the hero's looping background behaves like a GIF: it never stays paused
    const keepPlaying = (e: Event) => {
      const v = e.target as HTMLVideoElement;
      if (v instanceof HTMLVideoElement && v.loop && v.autoplay && !document.hidden) v.play().catch(() => {});
    };
    const resume = () => {
      if (document.hidden) return;
      document.querySelectorAll<HTMLVideoElement>("#main .framer-QJhm9 video").forEach((v) => {
        if (v.paused && !v.ended && v.getBoundingClientRect().width) v.play().catch(() => {});
      });
    };
    document.addEventListener("pause", keepPlaying, true);
    document.addEventListener("visibilitychange", resume);
    const onClick = (e: MouseEvent) => {
      const card = (e.target as HTMLElement).closest<HTMLAnchorElement>("a.framer-1oGtc");
      if (card && (card.href.includes("#scroll-to-subscribe") || card.href.includes("#case-studies"))) {
        const locale: Locale = window.location.pathname.startsWith("/ar") ? "ar" : "en";
        const product = products.find((p) => card.textContent?.includes(local(locale, p.name)));
        if (product) {
          e.preventDefault();
          window.location.href = `/${locale}/solutions-products/${product.id}`;
          return;
        }
      }
      // The old video teaser now links to VO's consultant page.
      const teaser = (e.target as HTMLElement).closest<HTMLElement>("article[role=presentation]");
      if (teaser) {
        window.location.href = `/${window.location.pathname.split("/")[1]}/get-consultant`;
        return;
      }
      const el = (e.target as HTMLElement).closest<HTMLElement>("[data-href]");
      if (!el || (e.target as HTMLElement).closest("a")) return;
      window.location.href = el.dataset.href!;
    };
    document.addEventListener("click", onClick);
    const main = document.getElementById("main")!;
    let stopCarousels = setupCarousels(main);
    const onResize = () => { stopCarousels(); stopCarousels = setupCarousels(main); };
    const breakpoints = ["(max-width: 767.98px)", "(min-width: 1200px)", "(min-width: 2560px)"].map((query) => window.matchMedia(query));
    breakpoints.forEach((mq) => mq.addEventListener("change", onResize));
    return () => {
      stopCarousels();
      breakpoints.forEach((mq) => mq.removeEventListener("change", onResize));
      io.disconnect();
      document.removeEventListener("pause", keepPlaying, true);
      document.removeEventListener("visibilitychange", resume);
      document.removeEventListener("click", onClick);
    };
  }, []);
  return null;
}
