import { BUSINESS } from "../config.js";

const WORDS = ["Slice", "Smile", "Repeat", BUSINESS.tagline];

export default function Marquee() {
  const row = [...WORDS, ...WORDS];
  return (
    <div className="marquee overflow-hidden border-y-2 border-ink bg-tomato py-3 text-white" aria-hidden="true">
      <div className="marquee-track">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center">
            {row.map((w, i) => (
              <span key={`${k}-${i}`} className="flex items-center font-display text-2xl sm:text-3xl">
                <span className="px-6">{w}</span>
                <span className="h-3 w-3 rotate-45 bg-gold" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
