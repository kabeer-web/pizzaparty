import { MessageCircle, ShoppingBag } from "lucide-react";
import { PRIMARY_PHONE } from "../config.js";
import { Parallax, Reveal } from "../hooks/parallax.jsx";
import { formatPKR } from "../utils/format.js";
import { buildWhatsAppUrl, GENERAL_MESSAGE } from "../utils/whatsapp.js";
import { btnInk, btnRed } from "./ui.jsx";

// Closing call-to-action. The two slices slide in towards the centre as you scroll.
export default function OrderBanner({ count, total, onOpenCart }) {
  return (
    <section className="relative overflow-hidden bg-hero py-20 sm:py-28" aria-labelledby="banner-title">
      <Parallax x={260} rotate={14} speed={0.05} className="pointer-events-none absolute -left-24 top-1/2 w-52 -translate-y-1/2 sm:-left-8 sm:w-72 lg:w-96" aria-hidden="true">
        <img src="/images/slice-420.webp" alt="" width="420" height="346" loading="lazy" className="-scale-x-100" />
      </Parallax>
      <Parallax x={-260} rotate={-14} speed={0.05} className="pointer-events-none absolute -right-24 top-1/2 hidden w-52 -translate-y-1/2 sm:-right-8 sm:block sm:w-72 lg:w-96" aria-hidden="true">
        <img src="/images/slice-420.webp" alt="" width="420" height="346" loading="lazy" />
      </Parallax>

      <Reveal className="relative mx-auto max-w-2xl px-6 text-center">
        <h2 id="banner-title" className="outline-text font-display text-4xl leading-tight sm:text-6xl">
          Hungry? Your Pizza Party is one tap away.
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-lg font-medium">
          Pick your pizzas or a deal, then send the order on WhatsApp.
        </p>
        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          {count > 0 ? (
            <button type="button" onClick={onOpenCart} className={btnRed}>
              <ShoppingBag size={20} aria-hidden="true" /> Open my order ({formatPKR(total)})
            </button>
          ) : (
            <a href="#builder" className={btnRed}>Start my order</a>
          )}
          <a href={buildWhatsAppUrl(PRIMARY_PHONE.intl, GENERAL_MESSAGE)} target="_blank" rel="noopener noreferrer" className={btnInk}>
            <MessageCircle size={20} aria-hidden="true" /> Chat on WhatsApp
          </a>
        </div>
      </Reveal>
    </section>
  );
}
