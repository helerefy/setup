"use client";

import { useEffect } from "react";
import { setupCarousels } from "@/lib/carousel";

/** Page-level behaviours of the original runtime that the ported markup needs:
 *  - videos without autoplay play while visible (Framer Video "play in view")
 *  - non-anchor elements with data-href act as links
 *  - case-study carousels (drag + arrows)
 *  - the YouTube facade in the highlight section */
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
      // YouTube facade: the thumbnail + play button turn into the autoplaying player
      const yt = (e.target as HTMLElement).closest<HTMLElement>("article[role=presentation]");
      const frame = yt?.querySelector<HTMLIFrameElement>("iframe[title='Youtube Video']");
      if (yt && frame) {
        frame.src = frame.src.replace("autoplay=0", "autoplay=1");
        frame.style.display = "block";
        yt.querySelectorAll("img, button").forEach((n) => n.remove());
        return;
      }
      const el = (e.target as HTMLElement).closest<HTMLElement>("[data-href]");
      if (!el || (e.target as HTMLElement).closest("a")) return;
      window.location.href = el.dataset.href!;
    };
    document.addEventListener("click", onClick);
    // newsletter form: submit, then show the confirmation page (as the original does)
    const onSubmit = async (e: SubmitEvent) => {
      const form = e.target as HTMLFormElement;
      if (!form.closest("#main")) return;
      e.preventDefault();
      const res = await fetch("/api/subscribe", { method: "POST", body: new FormData(form) }).catch(() => null);
      if (res?.ok) window.location.href = "/confirmation-page";
    };
    document.addEventListener("submit", onSubmit);
    const onInput = (e: Event) => {
      const el = e.target as HTMLInputElement;
      if (el.classList?.contains("framer-form-input")) el.classList.toggle("framer-form-input-empty", !el.value);
    };
    document.addEventListener("input", onInput);
    const main = document.getElementById("main")!;
    let stopCarousels = setupCarousels(main);
    const onResize = () => { stopCarousels(); stopCarousels = setupCarousels(main); };
    const mq = window.matchMedia("(max-width: 767.98px), (min-width: 768px) and (max-width: 1199.98px)");
    mq.addEventListener("change", onResize);
    return () => {
      stopCarousels();
      mq.removeEventListener("change", onResize);
      io.disconnect();
      document.removeEventListener("click", onClick);
      document.removeEventListener("submit", onSubmit);
      document.removeEventListener("input", onInput);
    };
  }, []);
  return null;
}
