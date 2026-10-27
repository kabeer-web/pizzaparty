import { useRef, useState } from "react";
import { Check } from "lucide-react";
import { FLAVOURS, SIZES, getFlavour, getSize } from "../data/menu.js";
import { Reveal } from "../hooks/parallax.jsx";
import { formatPKR } from "../utils/format.js";
import { SectionHeading, Stepper, btnRed } from "./ui.jsx";

// Card colours rotate through the brand palette
const LOOKS = [
  { card: "bg-gold text-ink", tilt: -8, flip: false },
  { card: "bg-white text-ink", tilt: 6, flip: true },
  { card: "bg-tomato text-white", tilt: -5, flip: false },
  { card: "bg-cream text-ink", tilt: 9, flip: true },
  { card: "bg-gold text-ink", tilt: -10, flip: true },
  { card: "bg-ink text-gold", tilt: 5, flip: false },
];

function StepLabel({ n, id, children, hint }) {
  return (
    <div>
      <h3 id={id} className="flex items-center gap-3 font-display text-2xl">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-lg text-gold" aria-hidden="true">
          {n}
        </span>
        {children}
      </h3>
      {hint && <p className="ml-12 text-ink/70">{hint}</p>}
    </div>
  );
}

export default function PizzaBuilder({ onAdd }) {
  const [flavourId, setFlavourId] = useState(null);
  const [sizeId, setSizeId] = useState(null);
  const [qty, setQty] = useState(1);
  const sizeRef = useRef(null);

  const flavour = getFlavour(flavourId);
  const size = getSize(sizeId);
  const ready = Boolean(flavour && size);

  const pickFlavour = (id) => {
    const first = !flavourId && !sizeId;
    setFlavourId(id);
    // guide the customer to the next step the first time
    if (first) setTimeout(() => sizeRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 150);
  };

  const handleAdd = () => {
    if (!ready) return;
    onAdd({ type: "pizza", flavourId, sizeId }, qty, `${qty} x ${flavour.itemName} (${size.name})`);
    setQty(1);
  };

  return (
    <div id="builder">
      <SectionHeading id="builder-title" sub={`Pizza in Baldia, Karachi: ${FLAVOURS.length} flavours, ${SIZES.length} sizes. Pick one, pick a size, add it.`}>
        Build your pizza
      </SectionHeading>

      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <div className="space-y-10">
          <div>
            <StepLabel n="1" id="step-flavour" hint="Required. Tap the flavour you want.">Pick a flavour</StepLabel>
            <ul className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3" aria-labelledby="step-flavour">
              {FLAVOURS.map((f, i) => {
                const look = LOOKS[i % LOOKS.length];
                const active = flavourId === f.id;
                return (
                  <Reveal as="li" key={f.id} delay={(i % 3) * 90} className="max-sm:last:odd:col-span-2">
                    <button
                      type="button"
                      aria-pressed={active}
                      onClick={() => pickFlavour(f.id)}
                      className={`pop-card group relative flex w-full flex-col items-center overflow-hidden rounded-3xl px-3 pb-4 pt-5 text-center ${look.card} ${
                        active ? "ring-4 ring-tomato ring-offset-2 ring-offset-cream" : ""
                      }`}
                    >
                      {active && (
                        <span className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-ink text-gold">
                          <Check size={16} strokeWidth={3.5} aria-hidden="true" />
                        </span>
                      )}
                      <img
                        src="/images/slice-260.webp"
                        alt=""
                        width="260"
                        height="214"
                        loading="lazy"
                        className="h-24 w-auto transition duration-500 ease-out [transition-timing-function:cubic-bezier(.2,.9,.3,1.5)] group-hover:scale-125 group-hover:rotate-[var(--r)] sm:h-28"
                        style={{ "--r": `${-look.tilt * 2}deg`, transform: `rotate(${look.tilt}deg) scaleX(${look.flip ? -1 : 1})` }}
                      />
                      <span className="mt-2 font-display text-xl leading-tight [overflow-wrap:anywhere] sm:text-2xl">{f.name}</span>
                      <span className={`mt-1 text-sm font-bold ${active ? "" : "opacity-70"}`}>{active ? "Selected" : "Tap to pick"}</span>
                    </button>
                  </Reveal>
                );
              })}
            </ul>
          </div>

          <div ref={sizeRef} className="scroll-mt-32">
            <StepLabel n="2" id="step-size" hint="Required. Prices are as on the Pizza Party menu.">Pick a size</StepLabel>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4" role="group" aria-labelledby="step-size">
              {SIZES.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  aria-pressed={sizeId === s.id}
                  onClick={() => setSizeId(s.id)}
                  className={`rounded-2xl border-2 px-2 py-4 text-center transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_6px_0_#171717] active:translate-y-0 ${
                    sizeId === s.id ? "border-ink bg-tomato text-white shadow-[0_6px_0_#171717]" : "border-ink bg-white"
                  }`}
                >
                  <span className="block font-bold">{s.name}</span>
                  <span className="block font-display text-2xl">{formatPKR(s.price)}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <StepLabel n="3" id="step-qty">How many?</StepLabel>
            <div className="ml-12 mt-3">
              <Stepper value={qty} onChange={setQty} label="pizza quantity" />
            </div>
          </div>
        </div>

        <aside className="lg:sticky lg:top-28">
          <div className="pop-card flex flex-col rounded-3xl bg-ink p-6 text-white" style={{ boxShadow: "0 6px 0 #E3262E" }}>
            <p className="text-sm font-bold text-gold">Your pizza</p>
            <div aria-live="polite" className="mt-2 min-h-32">
              {ready ? (
                <>
                  <p className="font-display text-3xl leading-tight [overflow-wrap:anywhere]">{flavour.itemName}</p>
                  <p className="text-lg text-white/80">{size.name}</p>
                  <p className="mt-4 text-white/80">{formatPKR(size.price)} x {qty}</p>
                  <p className="font-display text-5xl text-gold">{formatPKR(size.price * qty)}</p>
                </>
              ) : (
                <p className="text-lg text-white/80">
                  {!flavour ? "Start with step 1: pick a flavour." : "Now pick a size in step 2."}
                </p>
              )}
            </div>
            <button type="button" onClick={handleAdd} disabled={!ready} className={`${btnRed} mt-5 w-full`}>
              Add to order
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
