import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import Cart from "./Cart.jsx";
import Checkout from "./Checkout.jsx";

// Slide-in order panel: the cart and the "send on WhatsApp" form in one place.
export default function CartDrawer({ open, onClose, cart }) {
  const closeBtn = useRef(null);
  const opener = useRef(null);
  const panel = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    opener.current = document.activeElement;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => closeBtn.current?.focus(), 50);
    const onKey = (e) => {
      if (e.key === "Escape") return onClose();
      if (e.key !== "Tab" || !panel.current) return undefined;
      const focusable = panel.current.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable.length) return undefined;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
      return undefined;
    };
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      opener.current?.focus?.();
    };
  }, [open, onClose]);

  return (
    <>
      <div className={`drawer-scrim fixed inset-0 z-[60] bg-black/55 backdrop-blur-sm ${open ? "open" : ""}`} onClick={onClose} aria-hidden="true" />
      <aside
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
        inert={open ? undefined : ""}
        className={`drawer-panel fixed inset-y-0 right-0 z-[70] flex w-full max-w-lg flex-col border-l-2 border-ink bg-cream ${open ? "open" : ""}`}
      >
        <div className="flex items-center justify-between border-b-2 border-ink bg-gold px-5 py-3">
          <h2 id="drawer-title" className="font-display text-2xl">Your order</h2>
          <button
            ref={closeBtn}
            type="button"
            onClick={onClose}
            aria-label="Close order"
            className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-ink bg-white transition hover:rotate-90 hover:bg-cream"
          >
            <X size={22} aria-hidden="true" />
          </button>
        </div>
        <div className="flex-1 space-y-5 overflow-y-auto px-4 py-5 pb-10">
          <Cart cart={cart} onNavigate={onClose} />
          <Checkout cart={cart} />
        </div>
      </aside>
    </>
  );
}
