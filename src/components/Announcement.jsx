import { MessageCircle } from "lucide-react";
import { DEALS, LOWEST_DEAL_PRICE } from "../data/menu.js";
import { PRIMARY_PHONE } from "../config.js";
import { formatPKR } from "../utils/format.js";
import { buildWhatsAppUrl, GENERAL_MESSAGE } from "../utils/whatsapp.js";
import ShopStatus from "./ShopStatus.jsx";

export default function Announcement() {
  return (
    <div className="bg-ink text-sm text-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-4 gap-y-1 px-4 py-2 text-center">
        <p className="font-semibold">
          {DEALS.length} ready-made pizza deals, starting at{" "}
          <span className="text-gold">{formatPKR(LOWEST_DEAL_PRICE)}</span>.
        </p>
        <ShopStatus theme="dark" />
        <a
          href={buildWhatsAppUrl(PRIMARY_PHONE.intl, GENERAL_MESSAGE)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-8 items-center gap-1.5 font-bold text-gold underline-offset-4 hover:underline"
        >
          <MessageCircle size={15} aria-hidden="true" /> Order on WhatsApp: {PRIMARY_PHONE.display}
        </a>
      </div>
    </div>
  );
}
