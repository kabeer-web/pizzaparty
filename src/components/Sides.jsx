import { Plus } from "lucide-react";
import { SIDES } from "../data/menu.js";
import { Reveal } from "../hooks/parallax.jsx";
import { formatPKR } from "../utils/format.js";
import { SectionHeading, btnSmallRed } from "./ui.jsx";

export default function Sides({ onAdd }) {
  return (
    <div id="sides">
      <SectionHeading id="sides-title" sub="Pasta, lasagna, spaghetti and pizza fries to go with your pizza.">
        Pasta, lasagna and pizza fries
      </SectionHeading>

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <ul aria-labelledby="sides-title" className="rounded-3xl border-2 border-ink bg-white px-3 py-2 shadow-[0_6px_0_#171717] sm:px-5">
          {SIDES.map((s, i) => (
            <Reveal as="li" key={s.id} delay={i * 70}>
              <div className="group flex items-center gap-3 rounded-2xl px-3 py-4 transition duration-300 hover:bg-gold/30 sm:px-4">
                <div className="flex min-w-0 flex-1 items-baseline gap-2">
                  <h3 className="font-display text-xl transition-transform duration-300 group-hover:translate-x-1 sm:text-2xl">{s.name}</h3>
                  <span className="mb-1 hidden flex-1 border-b-2 border-dotted border-ink/30 sm:block" aria-hidden="true" />
                </div>
                <span className="font-display text-xl text-tomato sm:text-2xl">{formatPKR(s.price)}</span>
                <button
                  type="button"
                  onClick={() => onAdd({ type: "side", refId: s.id }, 1, s.name)}
                  className={`${btnSmallRed} btn-shine`}
                  aria-label={`Add ${s.name} to order`}
                >
                  <Plus size={16} aria-hidden="true" /> Add
                </button>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={150}>
          <aside className="pop-card flex h-full flex-col justify-center rounded-3xl bg-tomato p-7 text-white">
            <h3 className="font-display text-3xl leading-tight">Extra topping by choice</h3>
            <p className="mt-3 text-lg leading-relaxed text-white/95">
              Want more on your pizza? Add your topping request in the order notes, or ask us on WhatsApp.
              We will confirm the price there.
            </p>
          </aside>
        </Reveal>
      </div>
    </div>
  );
}
