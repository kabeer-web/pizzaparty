import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { formatPKR } from "../utils/format.js";

export default function Cart({ cart, onNavigate }) {
  const { lines, subtotal, changeQty, removeItem, clearCart, MAX_QTY } = cart;

  return (
    <div className="rounded-3xl border-2 border-ink bg-white p-5 shadow-[0_6px_0_#171717] sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-display text-2xl">Your cart</h3>
        {lines.length > 0 && (
          <button type="button" onClick={clearCart} className="min-h-11 px-2 text-sm font-bold text-tomato hover:underline">
            Clear cart
          </button>
        )}
      </div>

      {lines.length === 0 ? (
        <div className="flex flex-col items-center py-10 text-center">
          <ShoppingBag size={46} className="text-tomato" aria-hidden="true" />
          <p className="mt-3 text-lg font-bold">Your cart is empty</p>
          <p className="text-ink/70">Pick a pizza or a deal to start your order.</p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <a href="#builder" onClick={onNavigate} className="rounded-full bg-tomato px-5 py-3 font-bold text-white transition hover:-translate-y-0.5">Build a pizza</a>
            <a href="#deals" onClick={onNavigate} className="rounded-full border-2 border-ink px-5 py-3 font-bold transition hover:-translate-y-0.5 hover:bg-cream">See deals</a>
          </div>
        </div>
      ) : (
        <>
          <ul className="mt-3 divide-y divide-ink/15">
            {lines.map((l) => (
              <li key={l.key} className="py-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-extrabold leading-snug">{l.displayName}</p>
                    {l.detail && <p className="mt-0.5 text-sm leading-snug text-ink/70">{l.detail}</p>}
                    <p className="mt-0.5 text-sm text-ink/70">{formatPKR(l.unitPrice)} each{l.detail ? " (fixed deal price)" : ""}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(l.key)}
                    aria-label={`Remove ${l.displayName}`}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-ink/60 hover:bg-cream hover:text-tomato"
                  >
                    <Trash2 size={19} aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="inline-flex items-center gap-1" role="group" aria-label={`Quantity of ${l.displayName}`}>
                    <button
                      type="button"
                      onClick={() => changeQty(l.key, -1)}
                      disabled={l.qty <= 1}
                      aria-label={`Decrease ${l.displayName}`}
                      className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-ink/30 hover:bg-cream disabled:opacity-40"
                    >
                      <Minus size={16} aria-hidden="true" />
                    </button>
                    <span className="w-9 text-center text-lg font-extrabold tabular-nums">{l.qty}</span>
                    <button
                      type="button"
                      onClick={() => changeQty(l.key, 1)}
                      disabled={l.qty >= MAX_QTY}
                      aria-label={`Increase ${l.displayName}`}
                      className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-ink/30 hover:bg-cream disabled:opacity-40"
                    >
                      <Plus size={16} aria-hidden="true" />
                    </button>
                  </div>
                  <p className="font-display text-xl">{formatPKR(l.unitPrice * l.qty)}</p>
                </div>
              </li>
            ))}
          </ul>

          <dl className="mt-2 space-y-1 border-t-2 border-ink pt-4">
            <div className="flex justify-between text-ink/80">
              <dt>Subtotal</dt>
              <dd>{formatPKR(subtotal)}</dd>
            </div>
            <div className="flex items-baseline justify-between">
              <dt className="text-lg font-extrabold">Total</dt>
              <dd className="font-display text-3xl text-tomato">{formatPKR(cart.total)}</dd>
            </div>
          </dl>
          <p className="mt-2 text-sm text-ink/70">Delivery charges, if any, are confirmed on WhatsApp.</p>
        </>
      )}
    </div>
  );
}
