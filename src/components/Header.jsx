import { useEffect, useState } from "react";
import { Menu, MessageCircle, ShoppingBag, X } from "lucide-react";
import { BUSINESS, PRIMARY_PHONE } from "../config.js";
import { buildWhatsAppUrl, GENERAL_MESSAGE } from "../utils/whatsapp.js";
import { btnRed } from "./ui.jsx";

export const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#menu", label: "Menu" },
  { href: "#deals", label: "Deals" },
  { href: "#sides", label: "Sides" },
  { href: "#contact", label: "Contact" },
];

// Highlights the section currently under the sticky header.
function useActiveSection() {
  const [active, setActive] = useState("#home");
  useEffect(() => {
    const update = () => {
      let best = "#home";
      let bestTop = -Infinity;
      for (const { href } of NAV_LINKS) {
        const el = document.getElementById(href.slice(1));
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= 160 && top > bestTop) {
          best = href;
          bestTop = top;
        }
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) best = "#contact";
      setActive(best);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  return active;
}

export default function Header({ cartCount, onOpenCart }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection();
  const waUrl = buildWhatsAppUrl(PRIMARY_PHONE.intl, GENERAL_MESSAGE);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={`sticky top-0 z-40 border-b-2 border-ink backdrop-blur transition-all duration-300 ${scrolled ? "bg-cream/90 shadow-lg" : "bg-cream"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2">
        <a href="#home" className="shrink-0" aria-label={`${BUSINESS.name} - home`}>
          <img
            src="/images/logo-240.webp"
            srcSet="/images/logo-240.webp 240w, /images/logo-480.webp 480w"
            sizes="64px"
            width="240"
            height="237"
            alt={`${BUSINESS.name} logo`}
            className={`w-auto transition-all duration-300 ${scrolled ? "h-11 sm:h-12" : "h-14 sm:h-16"}`}
          />
        </a>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              aria-current={active === l.href ? "location" : undefined}
              className={`rounded-full px-4 py-2 font-bold transition duration-200 hover:-translate-y-0.5 hover:bg-gold ${active === l.href ? "bg-gold" : ""}`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenCart}
            className="relative flex h-12 w-12 items-center justify-center rounded-full border-2 border-ink bg-white transition duration-200 hover:-translate-y-0.5 hover:bg-gold"
            aria-label={`Open your order, ${cartCount} ${cartCount === 1 ? "item" : "items"}`}
          >
            <ShoppingBag size={22} aria-hidden="true" />
            {cartCount > 0 && (
              <span key={cartCount} className="bump absolute -right-1 -top-1 flex h-6 min-w-6 items-center justify-center rounded-full bg-tomato px-1 text-xs font-extrabold text-white">
                {cartCount}
              </span>
            )}
          </button>
          <a href={waUrl} target="_blank" rel="noopener noreferrer" className={`${btnRed} !py-2 max-sm:hidden`}>
            <MessageCircle size={18} aria-hidden="true" /> Order on WhatsApp
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-ink bg-white lg:hidden"
          >
            {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t-2 border-ink bg-cream px-4 pb-4 lg:hidden">
          <ul className="grid gap-1 py-2">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  aria-current={active === l.href ? "location" : undefined}
                  className={`flex min-h-12 items-center rounded-xl px-3 text-lg font-bold active:bg-gold ${active === l.href ? "bg-gold" : ""}`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a href={waUrl} target="_blank" rel="noopener noreferrer" className={`${btnRed} w-full`}>
            <MessageCircle size={20} aria-hidden="true" /> Order on WhatsApp
          </a>
        </nav>
      )}
    </header>
  );
}
