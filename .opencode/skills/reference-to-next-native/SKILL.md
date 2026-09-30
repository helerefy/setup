---
name: reference-to-next-native
description: Use when converting an authorized reference website, URL, static HTML export, or Framer site into an editable native Next.js/React application with closely matched layouts, motion, responsive behavior, and interactions.
---

# Reference Website to Native Next.js

Use this procedure to *rebuild* an authorized reference, not to embed its HTML, run its proprietary runtime, or claim unmeasured pixel perfection. Work within the existing project's conventions. Read `EXAMPLES.md` in this directory for executable capture/measurement templates and concrete patterns from the VO Technology port. The examples distinguish observed repository code from proposed repeatable procedures.

## Contract and limits

- Obtain permission to reuse the reference's design, code, copy, logos, fonts, and media. If rights are unclear, recreate with licensed substitutes and document deviations. Do not copy tracking scripts, API credentials, or private endpoints.
- Define the required routes, user journeys, locales, interactions, and target viewport/browser matrix with the user. If the reference is ambiguous or inaccessible, ask rather than inventing behavior. A URL alone may not expose authenticated/hover/mobile states.
- "Native" means Next.js owns routes and React renders semantic elements from components/data. Captured HTML can be an offline observation input, not the shipped page or `dangerouslySetInnerHTML` for whole sections. A serialized *small animated subtree* rendered through React elements can be appropriate when measured state topology is complex; prefer direct JSX for regular content.
- This is a fidelity process, not a guarantee: fonts, assets, dynamic content, video codecs, browser engines, viewport, scrollbar, and network affect appearance. Say exactly which states were compared and what remains unverified. Do not say "1:1" without side-by-side evidence.
- A build alone proves compilation, not fidelity. Keep the reference and candidate available for comparison until validation finishes. Don't disable accessibility or core behavior just to match a screenshot.

## 1. Establish the evidence set

1. Inspect the current repo, its scripts, existing app architecture, and worktree changes. Do not overwrite user modifications. Write a route/state inventory before implementing. For a URL, inspect the rendered browser DOM, computed styles, resources, and accessible UI. For supplied HTML, inventory linked CSS, JS, assets and their availability; a standalone HTML file can omit externally loaded behaviors. Use original Framer scripts only to *observe* the reference, never as the final runtime.
2. Capture at identical viewport dimensions and browser engine for reference and candidate. At minimum: desktop (for example 1440x900), tablet (768x1024 or the real breakpoint), mobile (390x844), plus any extra CSS breakpoint and a short-height viewport. Record full-page and viewport screenshots at load, after fonts/media settle, at each major scroll section, and in menus/hover/focus/drag/form states. Disable or control nondeterminism such as rotating testimonials and network-dependent media. Record timestamps of intro keyframes (0 ms, each visual transition, end), video state, scroll offsets and scroll direction.
3. Build a table per region: source selector/component, DOM hierarchy, bounding boxes, computed font family/size/weight/line-height, colors, spacing, border/radius, backgrounds, assets, responsive variants, animation state/timing/easing, and interaction destination. Record visible and hidden variants separately. Capture actual breakpoints from CSS rather than assuming 768/1200. Measure dynamic positioning (sticky, clip, overflow, viewport units), not just pixel coordinates.
4. Inventory every requested asset by URL, type, intrinsic dimensions, license, and local destination. Fonts and their weight files matter as much as images. Inspect `<picture>`/`srcset`, SVG `<use>` symbols, video poster/intro/loop clips, and CSS background URLs. Map every referenced asset to a permitted local copy or an explicitly documented replacement. Verify HTTP 200 and real rendering; an image tag with an empty/broken image is not success.

Evidence format (keep in project notes during the task):

```text
route /en | desktop 1440x900 | Chromium | after 4.1s
hero: title box x=..., y=..., w=..., h=...; font=... 72px/0.95
hero intro: card 0-1533ms, split 1533-3071ms, reveal 3071-4017ms
menu: pointer/keyboard open, close on Escape/outside, route destinations
unknown: mobile video codec on Safari (not tested)
```

Do not treat example numbers as universal reference values; derive them from the target. If live site and static export differ, specify which is authoritative.

## 2. Plan the React replacement

1. Start with the site's route graph and semantic composition (`app/[locale]/...`, layout, header, sections, footer, dynamic detail pages). Retain needed DOM wrapper structure and class selectors when the original CSS depends on them; preserve layout mechanics, not inert `data-framer-*` or opaque generated class names without reason. Map repeated content to typed arrays instead of copying whole sections. Keep content separate from geometry where practical.
2. Port CSS in layers: reset and font faces; original/derived layout rules and media queries; targeted overrides. Preserve container queries, grid/flex sizing, sticky ancestors and overflow. Avoid `!important` patches as the first response to a mismatch. If retaining captured Framer CSS, check for missing selector context, autogenerated responsive `hidden-*` classes, and `display: contents` behavior. Use ordinary React `style` props for state-specific inline values. Never import original client-side Framer JS into the released app.
3. Implement static sections first as real JSX with semantic links/buttons and accessible names. Use a small data-driven React renderer only for animation subtrees that have many observed variants. Its captured representation can store tag, stable key, classes, inline styles, attributes, and children. Preserve stable sibling keys across states; attach interactive React components as slots. Do not make the entire site a black-box JSON/HTML renderer if ordinary JSX is clearer.
4. Establish a route/content mapping if adapting a design to new copy. Map original text only as a transitional keyed overlay; for greenfield work use explicit typed content. Re-map all internal links, anchors and buttons. Set `lang`/`dir` and verify RTL layout; do not assume a text swap automatically mirrors geometry.
5. Build only the services the application actually requires. Reuse repository commands. Do not conflate a development preview with a deployable production build; avoid committing generated HTML, copied third-party runtimes, `node_modules`, secrets or temporary screenshots.

## 3. Reproduce state and motion, not just the resting screenshot

- Classify each effect: CSS-only hover/transition, enter/exit variant, timed intro, scroll-linked transform, sticky/pinned section, video, carousel, menu, form. For each: record source state, destination state, trigger, duration/delay, easing or spring parameters, interrupt behavior, reduced-motion behavior and cleanup on unmount.
- Timed intro: store measured timestamps and stable DOM states, then change React state on a *single scheduled timeline*. Animate changed properties with Motion/layout or CSS as appropriate. Start clip playback at the observed moment, not opportunistically during SSR. Cancel timers; on route remount decide explicitly whether the intro replays. Test at all responsive breakpoints.
- Hover/layout: CSS `:hover`/`:focus-visible` is enough for simple color or scale; use Motion layout or FLIP when DOM geometry changes. Capture before/after bounding boxes, move text without scaling glyphs, cancel competing animations and restore original inline values after transitions. Make click targets work for keyboard/touch; don't create a hover-only affordance.
- Scroll-linked: measure a target element relative to the viewport and compute clamped progress `p = clamp((threshold * viewportHeight - targetTop) / targetHeight, 0, 1)`. Animate from/to values using measured spring/ease. Account for sticky containers, direction hysteresis, resizing, native scroll restoration and browser back navigation.
- Video: distinguish short intro from loop. Preload/play only visible responsive variant; mute + `playsInline` for autoplay; transition to loop on `ended`, recover on visibility changes, avoid posters flashing at the handoff. A codec is not universal; test required browsers. Honor reduced motion where appropriate.
- Carousel: replicate arrows, drag threshold, momentum and snap separately from CSS. For an infinite track, render buffered copies, rebase native scrolling by exactly one card-set period, preserve focus and a single accessible/tabbable copy per item, and reinitialize on *individual breakpoint media-query changes*. Test both directions, touch, RTL, outside-release/cancel, resize, keyboard and link-click after drag. Never rely solely on a screenshot of the first card.

## 4. Compare and iterate systematically

1. Boot the actual Next.js app (in Docker if the project requires it). Run a production build separately. Use Playwright to exercise real routes, not an HTML mock or a screenshot file as the app.
2. Compare reference and candidate at the same browser, viewport, zoom, device scale factor, loaded fonts, scroll coordinates, media time and interaction state. Capture aligned screenshots and inspect side by side; optionally use a pixel diff with dynamic areas masked. Visual mismatch priority: missing content/assets -> fonts/wrapping -> main geometry -> breakpoints -> motion -> details. Avoid tweaking small decorative differences while the page silhouette is wrong.
3. Measure bounding boxes/computed styles when an element is off by a few pixels. Fix the governing layout rule rather than applying absolute offsets to every child. Check overflow and title clipping at narrow *and short* viewports. Compare scroll heights and section starts, not just the first viewport.
4. Re-run reference/candidate checks after every meaningful change: initial load, post-intro, middle and footer scroll positions, hover/focus/menu, click/drag, direct deep link, history navigation, tablet-to-mobile *without reload*, both locales if applicable. Check browser console and network requests for runtime errors, hydration issues, broken images and failed videos.
5. If any state cannot be reached or observed, document the limitation and do not invent a claim of exact matching. Require the user to choose how to handle inaccessible paid/authenticated behavior.

## Release gate

- `npm ci`, typecheck/lint when configured, `npm run build`, and the real production start command succeed in the target runtime. Confirm routes, redirect, assets/PDF downloads, menu/form behavior and no obvious console/network errors. Audit dependencies where feasible.
- Interaction matrix passes mouse, keyboard, touch and RTL where relevant; responsive transitions work *without a reload*. No stray copied scripts, entire-page `dangerouslySetInnerHTML`, live credential, inaccessible clone focus targets, or pretend-working forms.
- Cross-check the files actually staged/published against the validated working tree. Confirm the deployment source repository, branch, host configuration and build command. A successful push does NOT establish an automatic deployment without checking the host. Do not publish local sandbox/agent setup as website code unless requested.
- Report the evidence and residual gaps: tested browser/viewport/state matrix, measured differences if available, inaccessible behavior, assets substituted, licenses, and deployment not verified if the host is unknown.

## When stuck

- Text wraps differently: verify the exact font file, weight, letter spacing and containing width before changing font size.
- Something is invisible: inspect responsive ancestor display/opacity/clipping and whether the active variant is actually mounted.
- Animation jumps: check stable React keys, competing CSS transform, Motion layout on text, and when video starts relative to hydration.
- Scroll effect triggers early: inspect target rect, sticky ancestor, threshold and listener reinitialization.
- A carousel stops or duplicates tab stops: measure set period including gaps, verify rebase and accessible ownership after scroll/resize.
- Builds pass but preview differs: verify build hash/branch and preview server; a stale build or a different repository is not visual regressions.
