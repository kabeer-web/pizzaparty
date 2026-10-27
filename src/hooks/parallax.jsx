import { useEffect, useRef, useState } from "react";

// ---------------------------------------------------------------------------
// Tiny scroll-linked parallax + reveal helpers (no dependencies).
// One shared scroll listener, updated once per animation frame.
// ---------------------------------------------------------------------------
const items = new Set();
let queued = false;
let listening = false;

const reduceMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function update() {
  queued = false;
  const vh = window.innerHeight;
  items.forEach((it) => {
    const r = it.outer.getBoundingClientRect();
    if (r.bottom < -vh * 0.5 || r.top > vh * 1.5) return; // far off-screen: skip
    const c = r.top + r.height / 2 - vh / 2; // 0 when centred in the viewport
    const t = c / vh;
    it.inner.style.transform = `translate3d(${(-t * it.x).toFixed(1)}px, ${(-c * it.speed).toFixed(1)}px, 0) rotate(${(t * it.rotate).toFixed(2)}deg)`;
  });
}
function schedule() {
  if (queued) return;
  queued = true;
  requestAnimationFrame(update);
}
function listen() {
  if (listening) return;
  listening = true;
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
}

/**
 * Moves its children while the page scrolls.
 * speed: vertical drift (0.1 = moves 10% of the distance from screen centre)
 * x / rotate: horizontal px and degrees applied across one screen of scroll
 */
export function Parallax({ speed = 0.1, x = 0, rotate = 0, className = "", innerClassName = "", style, children, ...rest }) {
  const outer = useRef(null);
  const inner = useRef(null);
  useEffect(() => {
    if (reduceMotion()) return undefined;
    const it = { outer: outer.current, inner: inner.current, speed, x, rotate };
    items.add(it);
    listen();
    schedule();
    return () => {
      items.delete(it);
      if (inner.current) inner.current.style.transform = "";
    };
  }, [speed, x, rotate]);
  return (
    <div ref={outer} className={className} style={style} {...rest}>
      <div ref={inner} className={`will-change-transform ${innerClassName}`}>
        {children}
      </div>
    </div>
  );
}

/** Fades + lifts its content in once, when it scrolls into view. */
export function Reveal({ as: Tag = "div", delay = 0, className = "", style, children, ...rest }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || reduceMotion() || typeof IntersectionObserver === "undefined") {
      setShown(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag
      ref={ref}
      className={`reveal ${shown ? "is-in" : ""} ${className}`}
      style={{ transitionDelay: shown ? `${delay}ms` : "0ms", ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
