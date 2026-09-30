/** Continuous, full-bleed case-study carousel with one accessible copy per card. */
const DRAG_THRESHOLD = 5;
const FRICTION = 0.95;

const visible = (e: Element) => {
  const r = e.getBoundingClientRect();
  return r.width > 0 && r.height > 0;
};

function setupScroller(e: HTMLElement) {
  const original = [...e.children].filter((c): c is HTMLElement => c instanceof HTMLElement && c.tagName !== "STYLE");
  if (!original.length) return { step: (_dir: number) => {}, scrollable: () => false, cleanup: () => {} };
  const parent = e.parentElement;
  const grandparent = parent?.parentElement;
  const styles = [e, parent, grandparent].map((node) => node?.getAttribute("style"));
  const rtl = getComputedStyle(e).direction === "rtl";
  const sign = rtl ? -1 : 1;
  const position = () => sign * e.scrollLeft;
  const setPosition = (x: number) => { e.scrollLeft = sign * x; };
  const start = (item: Element) => {
    const box = e.getBoundingClientRect(), rect = item.getBoundingClientRect();
    return position() + (rtl ? box.right - rect.right : rect.left - box.left);
  };
  const inset = () => {
    const s = getComputedStyle(e);
    return parseFloat(rtl ? s.paddingRight : s.paddingLeft) || 0;
  };

  e.style.setProperty("overflow-x", "auto", "important");
  e.style.setProperty("overflow-y", "hidden", "important");
  Object.assign(e.style, { cursor: "grab", whiteSpace: "nowrap", scrollbarWidth: "none", scrollBehavior: "auto" });
  const bleed = () => {
    if (!e.isConnected || !parent) return;
    e.style.paddingLeft = e.style.paddingRight = "";
    const s = getComputedStyle(e);
    const pl = parseFloat(s.paddingLeft) || 0, pr = parseFloat(s.paddingRight) || 0;
    const r = parent.getBoundingClientRect();
    const left = r.left, right = window.innerWidth - r.right;
    Object.assign(e.style, {
      position: "relative", width: "100vw", marginLeft: `calc(-1 * ${left}px)`,
      marginRight: `calc(-1 * ${right}px)`, left: "0", transform: "none",
      paddingLeft: `${left + pl}px`, paddingRight: `${right + pr}px`, boxSizing: "border-box",
    });
  };
  if (parent) {
    parent.style.setProperty("overflow", "visible", "important");
    parent.style.setProperty("position", "relative", "important");
    grandparent?.style.setProperty("overflow", "visible", "important");
    bleed();
  }

  const clone = (item: HTMLElement) => {
    const copy = item.cloneNode(true) as HTMLElement;
    copy.setAttribute("aria-hidden", "true");
    copy.querySelectorAll<HTMLElement>("[id]").forEach((n) => n.removeAttribute("id"));
    copy.removeAttribute("id");
    copy.querySelectorAll<HTMLElement>("a, button, input, select, textarea, [tabindex]")
      .forEach((n) => { n.tabIndex = -1; });
    return copy;
  };
  const before = original.map(clone), after = original.map(clone);
  e.prepend(...before);
  e.append(...after);

  const focusable = "a, button, input, select, textarea, summary, [tabindex], [contenteditable]";
  const controls = (card: HTMLElement) => [
    ...(card.matches(focusable) ? [card] : []),
    ...card.querySelectorAll<HTMLElement>(focusable),
  ];
  const copies = original.map((card, i) => [before[i], card, after[i]]);
  const attributes = original.map((card) => ({
    hidden: card.getAttribute("aria-hidden"),
    tabs: controls(card).map((node) => node.getAttribute("tabindex")),
  }));
  const selected = original.map(() => 1);
  const setAccessible = (i: number, copy: number, enabled: boolean) => {
    const card = copies[i][copy];
    if (enabled) {
      if (attributes[i].hidden === null) card.removeAttribute("aria-hidden");
      else card.setAttribute("aria-hidden", attributes[i].hidden);
    } else card.setAttribute("aria-hidden", "true");
    controls(card).forEach((node, j) => {
      const tab = enabled ? attributes[i].tabs[j] : "-1";
      if (tab == null) node.removeAttribute("tabindex");
      else node.setAttribute("tabindex", tab);
    });
  };
  const updateAccessible = () => {
    const viewport = e.getBoundingClientRect();
    for (let i = 0; i < copies.length; i++) {
      const coverage = copies[i].map((card) => {
        const r = card.getBoundingClientRect();
        const overlap = Math.min(r.right, viewport.right) - Math.max(r.left, viewport.left);
        return overlap > 0 ? overlap : -Math.max(viewport.left - r.right, r.left - viewport.right, 0);
      });
      let best = selected[i];
      for (let j = 0; j < 3; j++) {
        if (coverage[j] > coverage[best] + 0.5) best = j;
      }
      const focused = copies[i].findIndex((card) => card.contains(document.activeElement));
      if (focused >= 0 && coverage[focused] > 0) best = focused;
      if (best === selected[i]) continue;
      const oldControls = controls(copies[i][selected[i]]);
      const focusIndex = focused === selected[i] ? oldControls.findIndex((node) => node === document.activeElement) : -1;
      setAccessible(i, best, true);
      if (focusIndex >= 0) controls(copies[i][best])[focusIndex]?.focus({ preventScroll: true });
      setAccessible(i, selected[i], false);
      selected[i] = best;
    }
  };

  // Compare matching rendered wrappers, not summed widths: this includes flex gaps.
  const period = () => start(after[0]) - start(original[0]);
  const center = () => start(original[0]) - inset();
  setPosition(center());
  updateAccessible();
  let dragging = false, moved = false, down = false, lastX = 0, lastTime = 0, activePointer = -1;
  let velocity = 0, raf = 0, snapTimer = 0, animating = false;
  const wrap = () => {
    const p = period();
    if (p <= 0) return;
    const mid = center();
    const x = position();
    // Rebase at the halfway point so both sides retain a viewport's buffer.
    const shift = Math.floor((x - mid + p / 2) / p);
    if (shift) setPosition(x - shift * p);
    updateAccessible();
  };
  const nearest = () => {
    const x = position() + inset();
    const starts = [...before, ...original, ...after].map(start);
    let best = 0;
    starts.forEach((v, i) => { if (Math.abs(v - x) < Math.abs(starts[best] - x)) best = i; });
    return best;
  };
  const stop = () => { cancelAnimationFrame(raf); animating = false; window.clearTimeout(snapTimer); };
  const animate = (target: number) => {
    stop();
    const from = position(), distance = target - from;
    if (Math.abs(distance) < 0.5) { wrap(); return; }
    animating = true;
    const begun = performance.now();
    const frame = (now: number) => {
      const t = Math.min(1, (now - begun) / 320);
      const ease = 1 - Math.pow(1 - t, 3);
      setPosition(from + distance * ease);
      updateAccessible();
      if (t < 1) raf = requestAnimationFrame(frame);
      else { animating = false; wrap(); }
    };
    raf = requestAnimationFrame(frame);
  };
  const snap = () => {
    if (down || animating) return;
    const all = [...before, ...original, ...after];
    animate(start(all[nearest()]) - inset());
  };
  const step = (dir: number) => {
    const all = [...before, ...original, ...after];
    const i = nearest();
    const next = Math.max(0, Math.min(all.length - 1, i + dir * sign));
    animate(start(all[next]) - inset());
  };
  const onScroll = () => {
    if (!e.isConnected) return;
    // Animation and pointer movement use their own coordinates; native touch scroll rebases here.
    if (!animating) wrap();
    else updateAccessible();
    if (!down && !animating) {
      window.clearTimeout(snapTimer);
      snapTimer = window.setTimeout(snap, 160);
    }
  };
  const onDown = (ev: PointerEvent) => {
    if (ev.pointerType === "touch" || ev.button !== 0 || down) return;
    stop();
    down = true; dragging = false; moved = false; velocity = 0;
    activePointer = ev.pointerId;
    lastX = ev.clientX; lastTime = performance.now();
    try { e.setPointerCapture(ev.pointerId); } catch {}
  };
  const onMove = (ev: PointerEvent) => {
    if (!down || ev.pointerId !== activePointer) return;
    const dx = ev.clientX - lastX;
    const now = performance.now();
    if (!dragging && Math.abs(dx) <= DRAG_THRESHOLD) return;
    if (!dragging) {
      dragging = true;
      e.style.cursor = "grabbing";
    }
    moved = true;
    velocity = -sign * dx * Math.min(3, 16 / Math.max(1, now - lastTime));
    setPosition(position() - sign * dx);
    wrap();
    lastX = ev.clientX; lastTime = now;
  };
  const onUp = (ev: PointerEvent) => {
    if (!down || ev.pointerId !== activePointer) return;
    down = false;
    activePointer = -1;
    try { e.releasePointerCapture(ev.pointerId); } catch {}
    if (dragging) {
      e.style.cursor = "grab";
      const glide = () => {
        if (Math.abs(velocity) < 0.9) { snap(); return; }
        setPosition(position() + velocity);
        wrap();
        velocity *= FRICTION;
        raf = requestAnimationFrame(glide);
      };
      raf = requestAnimationFrame(glide);
    }
    dragging = false;
  };
  const onCancel = (ev: PointerEvent) => {
    if (!down || ev.pointerId !== activePointer) return;
    down = false; dragging = false; moved = false; activePointer = -1; velocity = 0;
    stop();
    e.style.cursor = "grab";
    try { e.releasePointerCapture(ev.pointerId); } catch {}
  };
  const onLostCapture = (ev: PointerEvent) => { if (down) onCancel(ev); };
  const onClick = (ev: MouseEvent) => {
    if (moved) { ev.preventDefault(); ev.stopPropagation(); moved = false; }
  };
  const onDragStart = (ev: DragEvent) => { if (down || moved) ev.preventDefault(); };
  const onResize = () => { stop(); bleed(); setPosition(center()); wrap(); };
  e.addEventListener("scroll", onScroll, { passive: true });
  e.addEventListener("pointerdown", onDown);
  e.addEventListener("pointermove", onMove);
  e.addEventListener("pointerup", onUp);
  e.addEventListener("pointercancel", onCancel);
  e.addEventListener("lostpointercapture", onLostCapture);
  window.addEventListener("pointerup", onUp);
  window.addEventListener("pointercancel", onCancel);
  e.addEventListener("click", onClick, true);
  e.addEventListener("dragstart", onDragStart);
  window.addEventListener("resize", onResize);
  return {
    step,
    scrollable: () => period() > 1 && e.scrollWidth > e.clientWidth + 1,
    cleanup: () => {
      stop();
      window.removeEventListener("resize", onResize);
      e.removeEventListener("scroll", onScroll);
      e.removeEventListener("pointerdown", onDown);
      e.removeEventListener("pointermove", onMove);
      e.removeEventListener("pointerup", onUp);
      e.removeEventListener("pointercancel", onCancel);
      e.removeEventListener("lostpointercapture", onLostCapture);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onCancel);
      e.removeEventListener("click", onClick, true);
      e.removeEventListener("dragstart", onDragStart);
      const focusedClone = [...before, ...after].find((card) => card.contains(document.activeElement));
      const focusedIndex = focusedClone && controls(focusedClone).findIndex((node) => node === document.activeElement);
      original.forEach((_, i) => setAccessible(i, 1, true));
      if (focusedClone && focusedIndex !== undefined && focusedIndex >= 0) {
        const i = [...before, ...after].indexOf(focusedClone) % original.length;
        if (visible(original[i])) controls(original[i])[focusedIndex]?.focus({ preventScroll: true });
      }
      [...before, ...after].forEach((n) => n.remove());
      [e, parent, grandparent].forEach((node, i) => {
        if (node) { if (styles[i] === null) node.removeAttribute("style"); else if (styles[i] !== undefined) node.setAttribute("style", styles[i]); }
      });
    },
  };
}

/** Wire only the visible responsive variant and its own arrows. */
export function setupCarousels(root: ParentNode, sel = { scroller: ".framer-qiwajr", left: ".framer-gafstv", right: ".framer-1bv66m5" }) {
  const scrollers = new Map<HTMLElement, ReturnType<typeof setupScroller>>();
  root.querySelectorAll<HTMLElement>(sel.scroller).forEach((s) => { if (visible(s)) scrollers.set(s, setupScroller(s)); });
  const cleanups: (() => void)[] = [];
  for (const [selector, dir] of [[sel.left, -1], [sel.right, 1]] as const) {
    root.querySelectorAll<HTMLElement>(selector).forEach((arrow) => {
      if (!visible(arrow)) return;
      let scroller: HTMLElement | undefined;
      for (let node: HTMLElement | null = arrow; node && !scroller; node = node.parentElement) {
        scroller = [...scrollers.keys()].find((s) => node!.contains(s));
      }
      if (!scroller) return;
      const controller = scrollers.get(scroller)!;
      const previous = arrow.getAttribute("style");
      const holder = arrow.parentElement, holderStyle = holder?.getAttribute("style");
      arrow.style.userSelect = "none";
      arrow.style.touchAction = "manipulation";
      const update = () => {
        const enabled = controller.scrollable();
        arrow.style.opacity = enabled ? "1" : "0.5";
        arrow.style.pointerEvents = enabled ? "auto" : "none";
        arrow.style.cursor = enabled ? "pointer" : "default";
      };
      const click = () => { if (controller.scrollable()) controller.step(dir); };
      const key = (ev: KeyboardEvent) => { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); click(); } };
      arrow.addEventListener("click", click);
      arrow.addEventListener("keydown", key);
      window.addEventListener("resize", update);
      const ro = new ResizeObserver(update);
      ro.observe(scroller);
      update();
      cleanups.push(() => {
        arrow.removeEventListener("click", click);
        arrow.removeEventListener("keydown", key);
        window.removeEventListener("resize", update);
        ro.disconnect();
        if (previous === null) arrow.removeAttribute("style"); else arrow.setAttribute("style", previous);
        if (holder) { if (holderStyle === null) holder.removeAttribute("style"); else if (holderStyle !== undefined) holder.setAttribute("style", holderStyle); }
      });
    });
  }
  return () => {
    cleanups.forEach((c) => c());
    scrollers.forEach((c) => c.cleanup());
  };
}
