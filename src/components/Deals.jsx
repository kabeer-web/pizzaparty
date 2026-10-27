import { useState } from "react";
import { Check, Plus } from "lucide-react";
import { DEALS, hasDrink, isPizzaOnlyDeal, separatePizzaTotal, LOWEST_DEAL_PRICE } from "../data/menu.js";
import { Parallax, Reveal } from "../hooks/parallax.jsx";
import { formatPKR } from "../utils/format.js";
import { SectionHeading } from "./ui.jsx";

const FILTERS = [
  { id: "all", label: "All deals", test: () => true },
  { id: "pizza", label: "Pizza only", test: isPizzaOnlyDeal },
  { id: "drink", label: "With cold drink", test: hasDrink },
];

function DealCard({ deal, onAdd }) {
  const separate = separatePizzaTotal(deal);
  return (
    <div className="pop-card-gold group flex h-full flex-col rounded-3xl bg-white p-4 text-ink sm:p-5">
      <div className="flex items-start justify-between gap-2">
       <div className="flex flex-wrap items-center gap-2">
        <h3 className="self-start rounded-xl bg-gold px-3 py-1 font-display text-lg transition duration-300 group-hover:-rotate-6 group-hover:scale-110">
          Deal {deal.number}
        </h3>
        {deal.isNew && (
          <span className="rounded-full bg-tomato px-3 py-1 text-sm font-extrabold uppercase tracking-wide text-white">New</span>
        )}
       </div>
        <img src="/images/slice-260.webp" alt="" width="260" height="214" loading="lazy" className="-mt-1 h-12 w-auto shrink-0 -rotate-6" />
      </div>

      <ul className="mt-4 flex-1 space-y-2">
        {deal.items.map((item) => (
          <li key={item.text} className="flex items-start gap-2 font-semibold leading-snug">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-tomato text-white">
              <Check size={13} strokeWidth={3.5} aria-hidden="true" />
            </span>
            {item.text}
          </li>
        ))}
      </ul>

      <div className="mt-5">
        <p className="origin-left font-display text-4xl leading-none text-tomato transition duration-300 group-hover:scale-110">
          {formatPKR(deal.price)}
        </p>
        <p className="mt-1 text-sm text-ink/70 sm:min-h-10">
          {separate ? `Same pizzas bought separately: ${formatPKR(separate)}` : ""}
        </p>
        <button
          type="button"
          onClick={() => onAdd({ type: "deal", refId: deal.id }, 1, `Deal ${deal.number}`)}
          className="btn-shine mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-ink px-4 font-extrabold text-white transition duration-300 hover:bg-tomato active:scale-95"
          aria-label={`Add Deal ${deal.number} to order, ${formatPKR(deal.price)}`}
        >
          <Plus size={18} aria-hidden="true" /> Add Deal {deal.number}
        </button>
      </div>
    </div>
  );
}

export default function Deals({ onAdd }) {
  const [filterId, setFilterId] = useState("all");
  const filter = FILTERS.find((f) => f.id === filterId);
  const shown = DEALS.filter(filter.test);

  return (
    <section id="deals" className="relative overflow-hidden bg-ink py-16 text-white sm:py-24" aria-labelledby="deals-title">
      <Parallax speed={0.18} className="pointer-events-none absolute inset-0" innerClassName="slice-pattern absolute -inset-x-4 -bottom-48 -top-48" aria-hidden="true">
        <span />
      </Parallax>

      <div className="relative mx-auto max-w-7xl px-4">
        <SectionHeading
          id="deals-title"
          tone="dark"
          sub={`${DEALS.length} pizza deals for one, for friends and for the whole family, starting at ${formatPKR(LOWEST_DEAL_PRICE)}.`}
        >
          Pizza deals in Baldia, Karachi
        </SectionHeading>

        <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter deals">
          {FILTERS.map((f) => {
            const n = DEALS.filter(f.test).length;
            return (
              <button
                key={f.id}
                type="button"
                aria-pressed={filterId === f.id}
                onClick={() => setFilterId(f.id)}
                className={`min-h-11 rounded-full border-2 px-4 py-2 font-bold transition duration-300 hover:-translate-y-0.5 ${
                  filterId === f.id ? "border-gold bg-gold text-ink" : "border-white/40 text-white hover:border-gold"
                }`}
              >
                {f.label} ({n})
              </button>
            );
          })}
        </div>

        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {shown.map((deal, i) => (
            <Reveal as="li" key={deal.id} delay={(i % 4) * 90}>
              <DealCard deal={deal} onAdd={onAdd} />
            </Reveal>
          ))}
        </ul>

        <p className="mt-10 max-w-3xl text-white/80">
          Tell us your pizza flavours in the order notes or on WhatsApp. Deals and prices are as shown on the Pizza
          Party menu.
        </p>
      </div>
    </section>
  );
}
