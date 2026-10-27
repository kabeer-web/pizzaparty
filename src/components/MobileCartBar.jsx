import { MessageCircle, ShoppingBag } from "lucide-react";
import { PRIMARY_PHONE } from "../config.js";
import { formatPKR } from "../utils/format.js";
import { buildWhatsAppUrl, GENERAL_MESSAGE } from "../utils/whatsapp.js";

// Sticky bottom bar, phones and small tablets only.
export default function MobileCartBar({ count, total, onOpen }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t-2 border-ink bg-cream p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden">
      {count > 0 ? (
        <button
          type="button"
          onClick={onOpen}
          className="btn-shine flex min-h-12 w-full items-center justify-between rounded-full bg-tomato px-5 font-extrabold text-white shadow-[0_3px_0_#B3161D]"
        >
          <span className="flex items-center gap-2">
            <ShoppingBag size={20} aria-hidden="true" /> View order ({count} {count === 1 ? "item" : "items"})
          </span>
          <span className="font-display text-lg">{formatPKR(total)}</span>
        </button>
      ) : (
        <a
          href={buildWhatsAppUrl(PRIMARY_PHONE.intl, GENERAL_MESSAGE)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-tomato px-5 font-extrabold text-white shadow-[0_3px_0_#B3161D]"
        >
          <MessageCircle size={20} aria-hidden="true" /> Order on WhatsApp
        </a>
      )}
    </div>
  );
}
