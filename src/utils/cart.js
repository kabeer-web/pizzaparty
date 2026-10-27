import { getDeal, getFlavour, getSide, getSize } from "../data/menu.js";

export const MAX_QTY = 50;

export const clampQty = (n) => Math.min(MAX_QTY, Math.max(1, Math.floor(Number(n)) || 1));

/** Unique key per cart line. */
export function keyFor(ref) {
  if (ref.type === "pizza") return `pizza:${ref.flavourId}:${ref.sizeId}`;
  return `${ref.type}:${ref.refId}`;
}

/**
 * Turns a stored reference into display data. Names and prices ALWAYS come from
 * src/data/menu.js, so a withdrawn item (e.g. an old deal in a saved cart) simply
 * resolves to null and is dropped, and a deal always keeps its fixed menu price.
 *
 * Returns { name, variant, displayName, detail, unitPrice }:
 *  - pizza: name "Tikka Pizza", variant "Small", displayName "Tikka Pizza (Small)"
 *  - deal:  name "Deal 13", detail "1 Small Pizza, 1 Regular Pizza, 1 Large Pizza"
 */
export function resolveLine(ref) {
  if (!ref || typeof ref !== "object") return null;
  if (ref.type === "pizza") {
    const flavour = getFlavour(ref.flavourId);
    const size = getSize(ref.sizeId);
    if (!flavour || !size) return null;
    return {
      name: flavour.itemName,
      variant: size.name,
      displayName: `${flavour.itemName} (${size.name})`,
      detail: "",
      unitPrice: size.price,
    };
  }
  if (ref.type === "deal") {
    const deal = getDeal(ref.refId);
    if (!deal) return null;
    const name = `Deal ${deal.number}`;
    return {
      name,
      variant: "",
      displayName: name,
      detail: deal.items.map((i) => i.text).join(", "),
      unitPrice: deal.price, // fixed menu price, never the sum of the items
    };
  }
  if (ref.type === "side") {
    const side = getSide(ref.refId);
    if (!side) return null;
    return { name: side.name, variant: "", displayName: side.name, detail: "", unitPrice: side.price };
  }
  return null;
}

/** Resolves stored refs into cart lines and totals. Unknown items are skipped. */
export function summarize(refs) {
  const lines = [];
  for (const r of refs) {
    const resolved = resolveLine(r);
    if (resolved) lines.push({ key: r.key ?? keyFor(r), qty: clampQty(r.qty), ...resolved });
  }
  return {
    lines,
    count: lines.reduce((s, l) => s + l.qty, 0),
    subtotal: lines.reduce((s, l) => s + l.unitPrice * l.qty, 0),
  };
}
