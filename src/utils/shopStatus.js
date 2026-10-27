import { SHOP_HOURS } from "../config.js";

const toMinutes = (hhmm) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};
const OPEN = toMinutes(SHOP_HOURS.open);
const CLOSE = toMinutes(SHOP_HOURS.close);

// "18:00" -> "6:00 PM"
export function formatClock(hhmm) {
  const [h, m] = hhmm.split(":").map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`;
}

export const HOURS_LABEL = `${formatClock(SHOP_HOURS.open)} \u2013 ${formatClock(SHOP_HOURS.close)}`;

// Minutes since midnight in the SHOP's time zone, so visitors anywhere see the right status.
function shopMinutes(date) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: SHOP_HOURS.timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (type) => Number(parts.find((p) => p.type === type).value);
  return get("hour") * 60 + get("minute");
}

export function getShopStatus(date = new Date()) {
  const now = shopMinutes(date);
  const overnight = CLOSE < OPEN;
  const open = overnight ? now >= OPEN || now < CLOSE : now >= OPEN && now < CLOSE;

  if (open) {
    const left = (CLOSE - now + 1440) % 1440;
    const soon = left <= 60;
    return {
      open: true,
      tone: soon ? "warn" : "open",
      text: `${soon ? "Closing soon" : "Open now"} \u00b7 till ${formatClock(SHOP_HOURS.close)}`,
    };
  }
  const until = (OPEN - now + 1440) % 1440;
  return {
    open: false,
    tone: "closed",
    text:
      until <= 60
        ? `Opening soon \u00b7 at ${formatClock(SHOP_HOURS.open)}`
        : `Closed right now \u00b7 opens at ${formatClock(SHOP_HOURS.open)}`,
  };
}
