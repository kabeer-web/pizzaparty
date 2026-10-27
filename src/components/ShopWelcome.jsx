import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { SHOP_HOURS } from "../config.js";
import { formatClock, getShopStatus } from "../utils/shopStatus.js";
import ShopStatus from "./ShopStatus.jsx";
import { btnRed } from "./ui.jsx";

const KEY = "pp-welcome-shown";
const FALL = ["\uD83C\uDF55", "\uD83E\uDDC0", "\uD83C\uDF55", "\uD83C\uDF55", "\uD83C\uDF45", "\uD83C\uDF55", "\uD83E\uDDC0", "\uD83C\uDF55", "\uD83C\uDF55", "\uD83C\uDF45"];

// Shown once per visit. Closed -> friendly "sorry" pop-up (dismissible, never blocks ordering).
// Open -> a short falling-pizza animation + chip that fades by itself and ignores clicks.
export default function ShopWelcome() {
  const [mode, setMode] = useState(null); // "closed" | "open" | null
  const okRef = useRef(null);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(KEY)) return;
      sessionStorage.setItem(KEY, "1");
    } catch {
      /* storage blocked: just show it */
    }
    setMode(getShopStatus().open ? "open" : "closed");
  }, []);

  useEffect(() => {
    if (mode !== "open") return;
    const id = setTimeout(() => setMode(null), 4700);
    return () => clearTimeout(id);
  }, [mode]);

  useEffect(() => {
    if (mode !== "closed") return;
    okRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && setMode(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mode]);

  if (mode === "open") {
    return (
      <div className="pointer-events-none fixed inset-0 z-[60] overflow-hidden" aria-hidden="true">
        {FALL.map((e, i) => (
          <span
            key={i}
            className="pizza-fall absolute top-0 text-3xl"
            style={{ left: `${6 + i * 9.5}%`, animationDelay: `${(i % 5) * 0.25}s`, fontSize: `${1.6 + (i % 3) * 0.5}rem` }}
          >
            {e}
          </span>
        ))}
        <p className="open-chip absolute left-1/2 top-24 whitespace-nowrap rounded-full border-2 border-ink bg-gold px-5 py-2 font-display text-base shadow-[0_4px_0_#171717] sm:text-lg">
          {"\uD83C\uDF55"} We&apos;re open! Let the party start
        </p>
      </div>
    );
  }

  if (mode !== "closed") return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/70 p-4 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && setMode(null)}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="closed-title"
        className="welcome-pop relative w-full max-w-sm rounded-3xl border-2 border-ink bg-cream p-6 text-center shadow-[0_8px_0_#FFD21F]"
      >
        <button
          type="button"
          onClick={() => setMode(null)}
          aria-label="Close"
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink bg-white hover:bg-gold"
        >
          <X size={18} aria-hidden="true" />
        </button>

        <div className="relative mx-auto mt-2 h-20 w-20 text-6xl leading-[5rem]" aria-hidden="true">
          <span className="sorry-emoji">{"\uD83E\uDD7A"}</span>
          <span className="tear absolute left-[1.35rem] top-10 text-xl">{"\uD83D\uDCA7"}</span>
          <span className="zzz absolute -right-3 top-0 text-xl">{"\uD83D\uDCA4"}</span>
        </div>

        <h2 id="closed-title" className="mt-2 font-display text-2xl leading-tight">
          Sorry, we&apos;re closed right now
        </h2>
        <ShopStatus theme="light" className="mt-3" />

        <div className="mt-4 grid grid-cols-2 gap-2 text-sm font-bold">
          <div className="rounded-2xl bg-white p-3">
            <p className="text-ink/60">Opens</p>
            <p className="font-display text-xl">{formatClock(SHOP_HOURS.open)}</p>
          </div>
          <div className="rounded-2xl bg-white p-3">
            <p className="text-ink/60">Closes</p>
            <p className="font-display text-xl">{formatClock(SHOP_HOURS.close)}</p>
          </div>
        </div>

        <p className="mt-4 rounded-2xl bg-gold/60 px-4 py-3 text-sm font-semibold leading-snug">
          {"\uD83C\uDF55"} You can still place an order. It will be confirmed later and sent to you once we open, not right now.
        </p>

        <button ref={okRef} type="button" onClick={() => setMode(null)} className={`${btnRed} mt-5 w-full`}>
          Okay, let me browse
        </button>
      </div>
    </div>
  );
}
