import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import BeerFlowLogo from "./BeerFlowLogo.jsx";
import {
  BUILDER_EMAIL,
  BUILDER_NAME,
  BUILDER_WHATSAPP,
  BUSINESS,
  FULL_ADDRESS,
  PHONES,
  PRIMARY_PHONE,
} from "../config.js";
import { buildWhatsAppUrl, GENERAL_MESSAGE } from "../utils/whatsapp.js";
import { NAV_LINKS } from "./Header.jsx";

const builderMsg = `Hi ${BUILDER_NAME}, I saw the ${BUSINESS.name} website. I want a website / POS for my business.`;

const EXPLORE_LINKS = [...NAV_LINKS.slice(0, 4), { href: "#story", label: "Our Story" }, { href: "#location", label: "Location" }, NAV_LINKS[4]];

const MENU_LINKS = [
  { href: "#builder", label: "Build your pizza" },
  { href: "#sides", label: "Pasta, lasagna and fries" },
  { href: "#deals", label: "Pizza deals" },
];

const linkCls = "inline-flex min-h-9 items-center text-white/80 hover:text-gold hover:underline";

export default function Footer({ onOpenCart }) {
  return (
    <footer className="bg-ink text-white">
      <div className="gingham" aria-hidden="true" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <span className="inline-block rounded-3xl bg-cream p-3">
            <img
              src="/images/logo-240.webp"
              width="240"
              height="237"
              loading="lazy"
              alt={`${BUSINESS.name} logo`}
              className="h-24 w-auto"
            />
          </span>
          <p className="mt-4 font-display text-xl text-gold">{BUSINESS.tagline}</p>
          <p className="text-white/80">{BUSINESS.slogan}</p>
        </div>

        <nav aria-label="Footer">
          <h2 className="font-display text-xl text-gold">Explore</h2>
          <ul className="mt-3">
            {EXPLORE_LINKS.map((l) => (
              <li key={l.href}><a href={l.href} className={linkCls}>{l.label}</a></li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Menu links">
          <h2 className="font-display text-xl text-gold">Menu</h2>
          <ul className="mt-3">
            {MENU_LINKS.map((l) => (
              <li key={l.href}><a href={l.href} className={linkCls}>{l.label}</a></li>
            ))}
            <li><button type="button" onClick={onOpenCart} className={linkCls}>Your order</button></li>
          </ul>
        </nav>

        <div>
          <h2 className="font-display text-xl text-gold">Visit and order</h2>
          <address className="mt-3 flex gap-2 not-italic text-white/80">
            <MapPin size={18} className="mt-1 shrink-0 text-gold" aria-hidden="true" />
            {FULL_ADDRESS}
          </address>
          <ul className="mt-3 space-y-1">
            {PHONES.map((p) => (
              <li key={p.intl}>
                <a href={`tel:${p.tel}`} className={linkCls}>
                  <Phone size={16} className="mr-2 text-gold" aria-hidden="true" /> {p.display}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={buildWhatsAppUrl(PRIMARY_PHONE.intl, GENERAL_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full bg-tomato px-5 font-extrabold hover:bg-[#C81E25]"
          >
            <MessageCircle size={18} aria-hidden="true" /> Order on WhatsApp
          </a>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 md:grid-cols-[1fr_auto] md:items-center">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs font-semibold tracking-widest text-gray-400">WEBSITE DEVELOPED BY</p>
            <div className="mt-3">
              <BeerFlowLogo />
            </div>
            <p className="mt-3 text-sm text-gray-400">
              Need a website, restaurant POS or custom software for your business?
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href={`https://wa.me/${BUILDER_WHATSAPP}?text=${encodeURIComponent(builderMsg)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-11 items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 px-4 text-sm font-semibold text-white hover:opacity-90"
              >
                <MessageCircle size={16} aria-hidden="true" /> Chat on WhatsApp
              </a>
              <a
                href={`mailto:${BUILDER_EMAIL}`}
                className="flex min-h-11 items-center gap-2 rounded-full border border-white/20 px-4 text-sm font-semibold text-white hover:bg-white/10"
              >
                <Mail size={16} aria-hidden="true" /> Email us
              </a>
            </div>
          </div>
          <p className="text-sm text-white/60">
            &copy; {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.
            <br />
            Built by {BUILDER_NAME}.
          </p>
        </div>
      </div>
    </footer>
  );
}
