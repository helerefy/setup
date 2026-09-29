/**
 * Horizontal case-study carousel (port of the original site's custom carousel code):
 * drag with momentum + snapping on the scroller, arrow buttons stepping one item.
 */
const CONFIG = {
  arrowInactiveOpacity: 0.5,
  arrowTransitionMs: 200,
  disableDragOnTouchDevices: true,
  dragThresholdPx: 5,
  momentumFriction: 0.95,
  momentumStopThreshold: 0.9,
  edgeEpsilonPx: 0.5,
  visibilityEpsilonPx: 1,
  leftSnapInsetPx: 0,
  itemResolveMaxDepth: 4,
};

const padX = (e: Element) => {
  const s = getComputedStyle(e);
  return { pl: parseFloat(s.paddingLeft) || 0, pr: parseFloat(s.paddingRight) || 0 };
};
const contentRect = (e: Element) => {
  const r = e.getBoundingClientRect(), { pl, pr } = padX(e);
  return { left: r.left + pl, right: r.right - pr };
};
const leftSnapOffset = (e: Element) => padX(e).pl + CONFIG.leftSnapInsetPx;
const visibleChildren = (e: Element) =>
  [...e.children].filter((c): c is HTMLElement => {
    if (!(c instanceof HTMLElement) || c.tagName === "STYLE") return false;
    const s = getComputedStyle(c);
    return s.display !== "none" && s.visibility !== "hidden";
  });
function metricRect(e: Element) {
  const r = e.getBoundingClientRect();
  if (r.width > 0 || r.height > 0) return r;
  const kids = [...e.querySelectorAll("*")].map((k) => k.getBoundingClientRect()).filter((k) => k.width > 0 || k.height > 0);
  if (!kids.length) return r;
  const left = Math.min(...kids.map((k) => k.left)), right = Math.max(...kids.map((k) => k.right));
  return { left, right, width: right - left } as DOMRect;
}
function itemsHost(e: Element) {
  let t = e;
  for (let i = 0; i < CONFIG.itemResolveMaxDepth; i++) {
    const kids = visibleChildren(t);
    if (kids.length !== 1 || visibleChildren(kids[0]).length === 0) break;
    t = kids[0];
  }
  return t;
}
function items(e: HTMLElement) {
  const box = e.getBoundingClientRect();
  return visibleChildren(itemsHost(e)).map((item) => {
    const s = getComputedStyle(item);
    const ml = parseFloat(s.marginLeft) || 0, mr = parseFloat(s.marginRight) || 0;
    const r = metricRect(item);
    const left = r.left - box.left + e.scrollLeft + ml;
    const width = r.width + ml + mr;
    return { left, right: left + width, width };
  });
}
const clamp = (i: number, n: number) => Math.max(0, Math.min(n - 1, i));
function nearestIndex(e: HTMLElement) {
  const m = items(e);
  if (!m.length) return -1;
  const x = e.scrollLeft + leftSnapOffset(e);
  let best = 0, d = Math.abs(m[0].left - x);
  m.forEach((it, i) => { const dd = Math.abs(it.left - x); if (dd < d) { best = i; d = dd; } });
  return best;
}
const maxScroll = (e: HTMLElement) => Math.max(0, e.scrollWidth - e.clientWidth);
const scrollable = (e: HTMLElement) => e.scrollWidth > e.clientWidth + CONFIG.visibilityEpsilonPx;
function scrollToIndex(e: HTMLElement, i: number) {
  const m = items(e);
  if (!m.length) return;
  const max = maxScroll(e);
  const target = Math.max(0, Math.min(max, m[clamp(i, m.length)].left - leftSnapOffset(e)));
  const avg = m.reduce((a, it) => a + it.width, 0) / m.length;
  e.scrollTo({ left: max - target < avg * 0.3 ? max : target, behavior: "smooth" });
}
function step(e: HTMLElement, dir: 1 | -1) {
  const m = items(e);
  if (!m.length) return;
  if (Math.abs(e.scrollLeft - maxScroll(e)) < CONFIG.edgeEpsilonPx && dir > 0) return;
  const i = clamp(Math.max(0, nearestIndex(e)) + dir, m.length);
  if (i === 0) e.scrollTo({ left: 0, behavior: "smooth" });
  else scrollToIndex(e, i);
}
function snap(e: HTMLElement) {
  if (Math.abs(e.scrollLeft - maxScroll(e)) < CONFIG.edgeEpsilonPx) return;
  const i = nearestIndex(e);
  if (i >= 0) scrollToIndex(e, i);
}
function firstVisible(e: HTMLElement) {
  const m = items(e);
  return !m.length || e.getBoundingClientRect().left + (m[0].left - e.scrollLeft) >= contentRect(e).left - CONFIG.visibilityEpsilonPx;
}
function lastVisible(e: HTMLElement) {
  const m = items(e);
  return !m.length || e.getBoundingClientRect().left + (m[m.length - 1].right - e.scrollLeft) <= contentRect(e).right + CONFIG.visibilityEpsilonPx;
}
const canScroll = (e: HTMLElement, dir: "left" | "right") =>
  scrollable(e) && (dir === "right" ? !lastVisible(e) : e.scrollLeft > CONFIG.edgeEpsilonPx || !firstVisible(e));

/** Makes the scroller full-bleed (content keeps its column alignment) and draggable. */
function setupScroller(e: HTMLElement) {
  const cleanups: (() => void)[] = [];
  e.style.setProperty("overflow-x", "auto", "important");
  e.style.setProperty("overflow-y", "hidden", "important");
  Object.assign(e.style, { cursor: "grab", whiteSpace: "nowrap", scrollbarWidth: "none" });
  const parent = e.parentElement;
  if (parent) {
    parent.style.setProperty("overflow", "visible", "important");
    parent.style.setProperty("position", "relative", "important");
    parent.parentElement?.style.setProperty("overflow", "visible", "important");
    const bleed = () => {
      if (!e.isConnected) return;
      e.style.paddingLeft = e.style.paddingRight = "";
      const s = getComputedStyle(e);
      const pl = parseFloat(s.paddingLeft) || 0, pr = parseFloat(s.paddingRight) || 0;
      const r = parent.getBoundingClientRect();
      const left = r.left, right = window.innerWidth - r.right;
      Object.assign(e.style, {
        position: "relative", width: "100vw", marginLeft: `calc(-1 * ${left}px)`, marginRight: `calc(-1 * ${right}px)`,
        left: "0", transform: "none", paddingLeft: `${left + pl}px`, paddingRight: `${right + pr}px`, boxSizing: "border-box",
      });
    };
    requestAnimationFrame(bleed);
    window.addEventListener("resize", bleed);
    cleanups.push(() => window.removeEventListener("resize", bleed));
  }
  const touch = CONFIG.disableDragOnTouchDevices && ("ontouchstart" in window || navigator.maxTouchPoints > 0);
  if (!touch) {
    let down = false, dragged = false, startX = 0, startLeft = 0, velocity = 0, raf = 0;
    const draggable = (on: boolean) => e.querySelectorAll("a, img").forEach((n) => (on ? n.removeAttribute("draggable") : n.setAttribute("draggable", "false")));
    const onDown = (ev: PointerEvent) => { down = true; dragged = false; startX = ev.clientX; startLeft = e.scrollLeft; velocity = 0; cancelAnimationFrame(raf); draggable(false); };
    const onMove = (ev: PointerEvent) => {
      if (!down) return;
      const dx = ev.clientX - startX;
      if (Math.abs(dx) > CONFIG.dragThresholdPx) {
        if (!dragged) try { e.setPointerCapture(ev.pointerId); } catch {}
        dragged = true;
        const next = startLeft - dx;
        velocity = next - e.scrollLeft;
        e.scrollLeft = next;
      }
    };
    const onUp = (ev?: PointerEvent) => {
      if (!down) return;
      down = false;
      if (ev) try { e.releasePointerCapture(ev.pointerId); } catch {}
      if (dragged) {
        const glide = () => {
          if (Math.abs(velocity) <= CONFIG.momentumStopThreshold) { velocity = 0; snap(e); return; }
          const max = maxScroll(e), before = e.scrollLeft;
          if ((before <= 0 && velocity < 0) || (before >= max && velocity > 0)) { velocity = 0; snap(e); return; }
          e.scrollLeft += velocity;
          if (e.scrollLeft <= 0 || e.scrollLeft >= max) { velocity = 0; return; }
          if (e.scrollLeft === before) { velocity = 0; snap(e); return; }
          velocity *= CONFIG.momentumFriction;
          raf = requestAnimationFrame(glide);
        };
        glide();
      }
      draggable(true);
    };
    const onClickCapture = (ev: MouseEvent) => { if (dragged) { ev.stopPropagation(); ev.preventDefault(); dragged = false; } };
    const up = (ev: PointerEvent) => onUp(ev), leave = () => onUp();
    e.addEventListener("pointerdown", onDown);
    e.addEventListener("pointermove", onMove);
    e.addEventListener("pointerup", up);
    e.addEventListener("pointerleave", leave);
    e.addEventListener("click", onClickCapture, true);
    cleanups.push(() => {
      cancelAnimationFrame(raf);
      e.removeEventListener("pointerdown", onDown);
      e.removeEventListener("pointermove", onMove);
      e.removeEventListener("pointerup", up);
      e.removeEventListener("pointerleave", leave);
      e.removeEventListener("click", onClickCapture, true);
    });
  }
  return () => cleanups.forEach((c) => c());
}

function setupArrow(arrow: HTMLElement, scroller: HTMLElement, dir: "left" | "right") {
  arrow.style.userSelect = "none";
  arrow.style.touchAction = "manipulation";
  arrow.style.transition = `${arrow.style.transition ? arrow.style.transition + ", " : ""}opacity ${CONFIG.arrowTransitionMs}ms ease`;
  const display = getComputedStyle(arrow).display === "none" ? "block" : getComputedStyle(arrow).display;
  const holder = arrow.parentElement;
  const holderDisplay = holder ? (getComputedStyle(holder).display === "none" ? "block" : getComputedStyle(holder).display) : "block";
  const update = () => {
    if (!scrollable(scroller)) { arrow.style.display = "none"; if (holder) holder.style.display = "none"; return; }
    if (holder) holder.style.display = holderDisplay;
    const on = canScroll(scroller, dir);
    Object.assign(arrow.style, { display, opacity: on ? "1" : String(CONFIG.arrowInactiveOpacity), pointerEvents: on ? "auto" : "none", cursor: on ? "pointer" : "default" });
  };
  const click = () => { if (canScroll(scroller, dir)) { step(scroller, dir === "right" ? 1 : -1); update(); } };
  arrow.addEventListener("click", click);
  scroller.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  const ro = new ResizeObserver(update);
  ro.observe(scroller);
  requestAnimationFrame(update);
  [0, 50, 200, 800].forEach((t) => setTimeout(update, t));
  return () => {
    arrow.removeEventListener("click", click);
    scroller.removeEventListener("scroll", update);
    window.removeEventListener("resize", update);
    ro.disconnect();
  };
}

const visible = (e: Element) => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0; };

/** Wires every carousel inside `root`. */
export function setupCarousels(root: ParentNode, sel = { scroller: ".framer-qiwajr", left: ".framer-gafstv", right: ".framer-1bv66m5" }) {
  const cleanups: (() => void)[] = [];
  root.querySelectorAll<HTMLElement>(sel.scroller).forEach((s) => {
    if (!visible(s)) return;
    s.setAttribute("data-hscroll-owner", "true");
    cleanups.push(setupScroller(s));
  });
  const nearest = (arrow: HTMLElement) => {
    for (let n: HTMLElement | null = arrow; n; n = n.parentElement) {
      const found = [...n.querySelectorAll<HTMLElement>('[data-hscroll-owner="true"]')].filter(visible);
      if (found.length) return found[0];
    }
    return null;
  };
  for (const [s, dir] of [[sel.left, "left"], [sel.right, "right"]] as const)
    root.querySelectorAll<HTMLElement>(s).forEach((a) => {
      if (!visible(a)) return;
      const sc = nearest(a);
      if (sc) cleanups.push(setupArrow(a, sc, dir));
    });
  return () => cleanups.forEach((c) => c());
}
