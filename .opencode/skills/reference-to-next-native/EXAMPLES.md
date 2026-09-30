# Worked Examples and Repeatable Templates

Examples marked **Observed** come from this repository at the time this skill was written. **Template** is a method for a future reference, *not* a historical claim. Copy the principle, not VO-specific URLs, class names, assets, timestamps or private design rights.

## 1. Convert a reference into a testable inventory (Template)

For a URL, use a browser with a fixed viewport, wait for fonts and media, and collect boxes/styles. For a static HTML file, serve it with its CSS/assets first; `file://` changes resource and CORS behavior. Capture screenshots of every important state separately.

```ts
import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await page.goto(process.env.REFERENCE_URL!, { waitUntil: "domcontentloaded" });
await page.evaluate(() => document.fonts.ready);
const hero = await page.locator("h1").first().evaluate((el) => {
  const rect = el.getBoundingClientRect();
  const css = getComputedStyle(el);
  return { rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
    font: css.font, letterSpacing: css.letterSpacing, lineHeight: css.lineHeight,
    color: css.color, parentOverflow: getComputedStyle(el.parentElement!).overflow };
});
console.log(hero); // inspect before writing candidate CSS
await page.screenshot({ path: "/tmp/reference-hero.png" });
await browser.close();
```

Run again at each observed breakpoint and after the intro, scroll, menu, hover and form states. Collect URLs of actual fonts/images/video from the browser network log. A single `networkidle` wait is unreliable on sites with looping requests; use explicit state/time waits. Never commit the reference capture unless permissions require it.

## 2. Separate page structure from the reference runtime (Observed)

The current `components/home/Home.tsx` uses actual React components for section order:

```tsx
<NavContainer />
<HeroWrapper />
<Partners l={l} />
<PrefaceGridSection l={l} />
<ChapterSlides l={l} />
<CasesHighlight l={l} />
<VOFooter l={l} />
<HomeEffects />
```

Earlier history used `dangerouslySetInnerHTML` for an entire captured page; commit `ead1245` introduced the native home composition. The current JSX keeps selected original `framer-*` wrapper classes where `styles/home.css` relies on them. This preserves geometry without shipping the original Framer browser bundle. For a fresh project, use understandable classes where CSS can be rewritten safely.

## 3. Port a repeated static DOM group to JSX (Observed)

`components/home/sections/Partners.tsx` keeps the logo-wrapper layout but replaces repeated inert images with typed link data:

```tsx
const clients = [
  { name: "B.Tech", url: "https://btech.com/en" },
  { name: "Royal Commission for Riyadh City", url: "https://www.rcrc.gov.sa/" },
] as const;
<div className="framer-9dpxa0" data-framer-name="logos-wrapper">
  {clients.map((client, i) => (
    <a key={client.name} href={client.url} target="_blank" rel="noopener noreferrer" aria-label={client.name}>
      <img src={`/vo/clients/c${i + 1}.webp`} alt="" />
    </a>
  ))}
</div>
```

Build the file map with real assets; in the actual component there are eleven clients, not merely the two abbreviated here. Preserve intrinsic image dimensions and responsive grid sizing when measuring fidelity.

## 4. Record dynamic variant states, then render React nodes (Observed + Template)

`components/morph/types.ts` defines the actual compact state shape: `t` tag, `k` stable key, `c` classes, `s` inline styles, `a` attributes, `ch` children, optional `h` raw SVG/style HTML. `components/morph/MorphTree.tsx` renders it with React `createElement` or Motion components, remaps assets/links/text, supports `slots`/`bind`/`replace`, and animates changed style/layout. The large state arrays in `components/home/data/hero_*.ts` were checked in; their state-capture generator is **not available** in this repository. A future agent can create one by sampling DOM states in the reference browser:

```ts
// Browser-side Template: capture only the smallest subtree that changes.
function capture(el: Element, path = "0"): unknown {
  const html = el as HTMLElement;
  return {
    t: el.tagName.toLowerCase(), k: path, c: html.className,
    s: Object.fromEntries([...html.style].map((name) => [name, html.style.getPropertyValue(name)])),
    a: Object.fromEntries([...el.attributes]
      .filter((a) => !["class", "style"].includes(a.name)).map((a) => [a.name, a.value])),
    ch: [...el.childNodes].map((n, i) => n.nodeType === Node.TEXT_NODE
      ? n.textContent : n instanceof Element ? capture(n, `${path}.${i}`) : null).filter((n) => n != null),
  };
}
```

This serializer is illustrative, not drop-in for SVG, pseudo-elements, accessible attributes, videos, unique IDs or animations. Capture computed styles separately; inline styles alone omit the stylesheet. Do not blindly serialize script nodes or dangerous HTML. Reconcile keys by semantic identity when siblings reorder, instead of relying on the sample index path.

## 5. Timed hero and intro-to-loop video (Observed)

`components/home/hero/HeroIntro.tsx` chooses per-breakpoint state arrays. The desktop sequence is recorded in the port as `[0, 0, 1533, 3071, 4017]` ms with a cubic-bezier easing; the nav has its own `[0, 3020, 3716]` ms sequence. Timers set a React state index; `MorphTree` animates layout and opacity. The code sets `video.muted`, plays the intro, then on `ended` swaps the *same element* to the loop asset and calls `play()` again, avoiding a frozen handoff. A template for another site:

```tsx
const frames = [0, 450, 1250, 2300]; // replace with measured times
useEffect(() => {
  const ids = frames.slice(1).map((at, index) => window.setTimeout(() => setFrame(index + 1), at));
  return () => ids.forEach(clearTimeout);
}, []);
useEffect(() => {
  const video = videoRef.current;
  if (!video) return;
  const loop = () => { video.src = "/media/hero-loop.webm"; video.loop = true; void video.play().catch(() => {}); };
  video.addEventListener("ended", loop);
  return () => video.removeEventListener("ended", loop);
}, []);
```

Use `autoPlay`, `muted`, `playsInline` and a suitable format/fallback. Do not start playback during SSR; test page visibility, autoplay rejection and route changes. The VO code also prevents inactive breakpoint videos from downloading.

## 6. Responsive variants and hydration (Observed)

`lib/breakpoint.ts` uses `max-width: 767.98px` for mobile, `768px..1199.98px` for tablet, otherwise desktop. `HeroWrapper.tsx` renders all variants for SSR (CSS hides inactive ones); after mount it keeps only the currently active variant. This prevents an empty first paint but limits playback to one variant. For a new design, first determine real breakpoint CSS and prefer a single fluid tree if content/state topology does not change. For stateful alternate trees, pair CSS visibility with individual `matchMedia` change listeners, and verify 768 -> 390 -> 1440 **without reloading**. A comma-separated media query may remain true on both sides of a transition and fail to fire `change`; the corrected `HomeEffects.tsx` listens to each boundary separately.

## 7. Scroll-linked transforms (Observed)

`lib/scrollTarget.ts` implements:

```ts
const r = target.getBoundingClientRect();
const p = Math.min(1, Math.max(0,
  (innerHeight * threshold - r.top) / Math.max(1, r.height)));
const value = from + (to - from) * p;
```

`components/home/fx/ScrollEffects.tsx` drives `.framer-1qdhugg` from scale 2 to 1 relative to `#home-quote` with `{type: "spring", stiffness: 500, damping: 60, mass: 1}`. `components/home/nav/NavContainer.tsx` uses the `#swap` scroll marker to slide in a fixed nav, with a separate 20px direction threshold to hide it on downward scrolling. These are distinct state machines; do not replace both with a generic intersection observer if fidelity depends on continuous scroll position.

## 8. Hover reflow with FLIP (Observed)

`lib/hover-diffs.json` records class/style changes between observed states. `HoverEffects.tsx` applies the change on pointer entry/exit, then `lib/flip.ts` snapshots descendant boxes and animates positional deltas back to zero. Text wrappers are moved without scaling glyph shapes. A small layout-changing card can instead use Motion directly:

```tsx
<motion.a layout href="/products/1" whileHover={{ backgroundColor: "#f7f6f4" }}
  whileFocus={{ backgroundColor: "#f7f6f4" }}>
  <motion.span layout>Product title</motion.span>
</motion.a>
```

Do not apply Motion `layout` to every text node indiscriminately; compare wrapping, glyph distortion and mouse/touch/focus parity. The native port later removed the product-card spring because it caused unwanted overlap.

## 9. Keep assets and translated links under explicit control (Observed)

`lib/media.ts` maps captured Framer video URLs to local `/media/*.webm`, and original report image *filenames* to VO `/vo/*` replacements. `ms` handles `srcset` for mapped imagery. An unmatched URL returns unchanged; therefore this project is **not** proof that every asset is locally hosted. `styles/fonts.css` defines local Beausite weights. `components/SvgTemplates.tsx` supplies shared SVG symbols used by ported markup.

`lib/i18n.ts` maps original strings and routes to VO content. Examples: `/chapters/tools` -> `/${locale}/outsourcing`, `/cases/sierra` -> `/${locale}/solutions-products/1`; translation normalizes whitespace while preserving leading/trailing spaces. `app/[locale]/layout.tsx` sets `lang` and `dir`. Audit *every* locale, hash and external destination after adapting the content; don't let a fallback silently link back to an unrelated reference domain.

## 10. Infinite carousel without dead ends (Observed)

The current `lib/carousel.ts` clones a seven-card set before and after the real set, starts in the middle, computes a period from corresponding card start positions (including gaps), and rebases scroll position by a period. Arrows, pointer drag, momentum, native touch scrolling and snap have separate handlers. `aria-hidden`/`tabIndex` ownership changes so each product has one reachable copy. `HomeEffects.tsx` reinitializes on actual responsive boundary changes. Reusing only the visual cloning step creates triple tab stops and broken clicks; read the complete implementation before adapting it. A test must assert initial 21 children, a rebase near either edge, one keyboard-accessible copy per item, correct RTL arrow movement, and 21 children after resizing tablet -> mobile without reload.

## 11. Visual comparison loop and failure report (Template)

Use the same browser context and viewport for both pages; put captures outside the repo. Fix the highest-impact mismatch first. Example investigation:

```ts
const result = await page.locator("h1").evaluate((el) => {
  const box = el.getBoundingClientRect(), parent = el.parentElement!.getBoundingClientRect();
  return { textBottom: box.bottom, parentBottom: parent.bottom,
    clipped: box.bottom > parent.bottom, font: getComputedStyle(el).font };
});
```

In this repo a short tablet hero needed a targeted `min-height: 0` rule on `.framer-QJhm9.framer-v-clp1ub .framer-1gr8y9h` after viewport tests, not a global font shrink. Verify desktop/tablet/mobile and both short and tall heights after such a rule. Compare frames of motion at matched times, not just end states. Log: route, viewport, state/time, reference/candidate boxes, screenshot paths, differences, errors, and fix.

## 12. Release and deployment are separate assertions (Observed)

Here `package.json` defines `npm ci`, `next build`, and `next start -p 3000`; `next.config.mjs` redirects `/` to `/en`. A production Docker build of the website export generated the locale pages and passed TypeScript. The published export was checked file-for-file against the source website; only `.alloy/environment.json` and `docker-compose.alloy.yaml` were intentionally source-only. This validates *which files were pushed*, not which external hosting account deploys them. There is no checked-in deploy workflow or host configuration in this project, so an agent must verify the host's connected repository, branch, build command and actual live deployment before saying the deployment contains every update.

## 13. Assert routes, missing media and carousel ownership (Template)

This browser check is a starting point for an app with locale routes and an infinite seven-item carousel. Adjust the selectors and expected routes to the actual site, and wait for its intended ready state rather than an arbitrary delay:

```ts
import { test, expect } from "@playwright/test";

test("routes, assets and responsive carousel", async ({ page }) => {
  const badResponses: string[] = [];
  page.on("response", (r) => {
    if (r.status() >= 400 && r.url().startsWith("http://localhost:3000")) badResponses.push(r.url());
  });
  await page.setViewportSize({ width: 768, height: 600 });
  await page.goto("http://localhost:3000/en");
  await expect(page.getByRole("heading", { name: "VO for Technology", exact: true })).toBeVisible();
  const carousel = page.locator(".framer-n4ix6 .framer-qiwajr:visible");
  await expect(carousel.locator(":scope > *")).toHaveCount(21);
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(carousel.locator(":scope > *")).toHaveCount(21);
  await page.goto("http://localhost:3000/ar");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  expect(badResponses).toEqual([]);
});
```

For focus ownership, inspect the *visible* scroller, group copies by product URL, and require one copy per group without `aria-hidden` and with a focusable link. Check that first and last arrow actions continue cycling rather than clamping. Distinguish failed optional external requests from broken local assets; check image `complete && naturalWidth > 0` and video playback separately. A test that only counts clones can pass while navigation or focus is broken.

## 14. Map a capture to editable content and semantic behavior (Template)

If a screenshot shows three product cards with titles and descriptions, do not serialize the whole layout into an opaque HTML string. Use data and semantic JSX; preserve the measured CSS grid and real links:

```tsx
type Product = { slug: string; title: string; description: string; image: string };
const products: Product[] = [
  { slug: "atlas", title: "Atlas", description: "Explore regional data.", image: "/products/atlas.webp" },
];

export function Products({ items = products }: { items?: Product[] }) {
  return <section aria-labelledby="products-heading">
    <h2 id="products-heading">Products</h2>
    <div className="product-grid">{items.map((product) =>
      <a key={product.slug} href={`/products/${product.slug}`} className="product-card">
        <img src={product.image} alt="" />
        <h3>{product.title}</h3><p>{product.description}</p>
      </a>
    )}</div>
  </section>;
}
```

Treat user-facing text, product list, and asset paths as content. If a reference form visually exists but no backend exists, label the interaction preview-only (as `components/vo/VOFooter.tsx` does) or implement a real validated backend with consent; never claim a message was sent when it was not.

## Evidence boundary for this case

Git history shows an initial HTML injection/external-asset phase, then commits `ead1245` (native home/intro), `b92126b` (scroll/preface/nav) and `ecd07e8` (hover/carousel). It does not preserve a DOM-state generator or pixel-diff automation. Current VO content, menus, video teaser and form behavior deliberately diverge from the original reference: a claim that all original functionality or every frame is objectively identical is not supported. Use the procedure above to achieve and *demonstrate* the requested fidelity for each new authorized project.
