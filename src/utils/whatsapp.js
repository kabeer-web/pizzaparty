import { BUSINESS } from "../config.js";
import { formatPKR } from "./format.js";

export const buildWhatsAppUrl = (intlNumber, message) =>
  `https://wa.me/${intlNumber}?text=${encodeURIComponent(message)}`;

export const GENERAL_MESSAGE = `Hello ${BUSINESS.name}, I'd like to place an order.`;

// Customer text goes into a WhatsApp message: flatten line breaks in single-line
// fields and drop characters WhatsApp would read as bold/italic markup.
export const cleanInline = (s) => String(s ?? "").replace(/[*_~`]/g, "").replace(/\s+/g, " ").trim();
export const cleanBlock = (s) => String(s ?? "").replace(/[*_~`]/g, "").replace(/[ \t]+/g, " ").trim();

/**
 * Builds the pre-filled order message.
 * lines: resolved cart lines ({ displayName, detail, unitPrice, qty })
 * The subtotal is recomputed from the lines so the message can never disagree
 * with the items it lists.
 */
export function buildOrderMessage({ lines, orderType, name, address, notes }) {
  const subtotal = lines.reduce((sum, l) => sum + l.unitPrice * l.qty, 0);
  const itemLines = lines.map((l, i) => {
    const head = `${i + 1}. ${l.displayName} x ${l.qty}`;
    const detail = l.detail ? `\n    (${l.detail})` : "";
    return `${head}${detail}\n    ${formatPKR(l.unitPrice)} each = ${formatPKR(l.unitPrice * l.qty)}`;
  });

  const parts = [
    `*${BUSINESS.name} - New Order*`,
    "",
    `Name: ${cleanInline(name)}`,
    `Order type: ${orderType === "delivery" ? "Delivery" : "Pickup"}`,
  ];
  if (orderType === "delivery") parts.push(`Address: ${cleanBlock(address)}`);
  if (cleanBlock(notes)) parts.push(`Notes: ${cleanBlock(notes)}`);
  parts.push("", "*Items*", ...itemLines, "", `*Items total: ${formatPKR(subtotal)}*`, "");
  parts.push("Please confirm my order, the final total and the time. Thank you!");
  return parts.join("\n");
}
