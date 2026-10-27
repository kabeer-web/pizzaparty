import { Minus, Plus } from "lucide-react";
import { Reveal } from "../hooks/parallax.jsx";

// Shared button styles (hard "pressed" shadow echoes the printed menu look)
const BTN =
  "btn-shine inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-extrabold transition duration-200 hover:-translate-y-1 hover:shadow-xl active:translate-y-0.5 disabled:translate-y-0 disabled:cursor-not-allowed";
export const btnRed = `${BTN} bg-tomato text-white shadow-[0_4px_0_#B3161D] hover:bg-[#C81E25] active:shadow-none disabled:bg-gray-300 disabled:text-gray-600 disabled:shadow-none`;
export const btnInk = `${BTN} bg-ink text-white shadow-[0_4px_0_rgba(0,0,0,0.35)] hover:bg-[#2a2a2a] active:shadow-none`;
export const btnLight = `${BTN} border-2 border-ink bg-white text-ink hover:bg-cream`;
export const btnSmallRed =
  "inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full bg-tomato px-4 py-2 text-sm font-extrabold text-white transition hover:bg-[#C81E25] active:scale-95";

export function SectionHeading({ id, children, sub, tone = "light", className = "" }) {
  return (
    <Reveal className={className}>
      <h2
        id={id}
        className="brush inline-block -rotate-1 bg-gold px-9 py-4 font-display text-3xl leading-tight text-ink sm:text-4xl"
      >
        {children}
      </h2>
      {sub && (
        <p className={`mt-4 max-w-2xl text-lg ${tone === "dark" ? "text-white/80" : "text-ink/75"}`}>{sub}</p>
      )}
    </Reveal>
  );
}

export function Stepper({ value, onChange, min = 1, max = 50, label, dark = false }) {
  const btn = dark
    ? "border-white/40 text-white hover:bg-white/10"
    : "border-ink/30 text-ink hover:bg-cream";
  return (
    <div className="inline-flex items-center gap-1" role="group" aria-label={label}>
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label={`Decrease ${label}`}
        className={`flex h-11 w-11 items-center justify-center rounded-full border-2 transition disabled:opacity-40 ${btn}`}
      >
        <Minus size={18} aria-hidden="true" />
      </button>
      <span className="w-10 text-center text-lg font-extrabold tabular-nums" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label={`Increase ${label}`}
        className={`flex h-11 w-11 items-center justify-center rounded-full border-2 transition disabled:opacity-40 ${btn}`}
      >
        <Plus size={18} aria-hidden="true" />
      </button>
    </div>
  );
}

// Plain cheese slice with crust - an illustration, no toppings implied.
export function SliceIcon({ className = "", rotate = 0 }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      style={{ transform: `rotate(${rotate}deg)` }}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M50 94 L9 24 Q50 6 91 24 Z" fill="#FFD21F" stroke="#171717" strokeWidth="4" strokeLinejoin="round" />
      <path d="M8 22 Q50 2 92 22" fill="none" stroke="#171717" strokeWidth="14" strokeLinecap="round" />
      <path d="M8 22 Q50 2 92 22" fill="none" stroke="#E8912D" strokeWidth="8" strokeLinecap="round" />
      <path d="M26 40 q0 10 6 10 q6 0 6 -10 M58 38 q0 12 7 12 q7 0 7 -12" fill="none" stroke="#fff3b0" strokeWidth="5" strokeLinecap="round" />
      <circle cx="46" cy="62" r="3.5" fill="#E8912D" />
      <circle cx="56" cy="74" r="2.5" fill="#E8912D" />
      <circle cx="40" cy="48" r="2.5" fill="#E8912D" />
    </svg>
  );
}
