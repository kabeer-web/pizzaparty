import test from "node:test";
import assert from "node:assert/strict";
import { BUSINESS, PHONES, PRIMARY_PHONE, SITE_URL, toInternational } from "../src/config.js";
import { buildOrderMessage, buildWhatsAppUrl } from "../src/utils/whatsapp.js";
import { summarize, keyFor } from "../src/utils/cart.js";

test("displayed phone numbers are unchanged", () => {
  assert.deepEqual(BUSINESS.phones, ["0300-3718090", "0312-2280406"]);
});

test("primary WhatsApp number is 0312-2280406 and wa.me digits are derived from it", () => {
  assert.equal(PRIMARY_PHONE.display, "0312-2280406");
  assert.equal(PRIMARY_PHONE.intl, "923122280406");
  assert.equal(toInternational("0312-2280406"), "923122280406");
  assert.equal(PHONES.find((p) => p.display === "0300-3718090").intl, "923003718090");
  assert.ok(buildWhatsAppUrl(PRIMARY_PHONE.intl, "hi").startsWith("https://wa.me/923122280406?text="));
});

test("site URL", () => assert.equal(SITE_URL, "https://pizzaparty.vercel.app"));

test("order message has items, prices, subtotal, customer details; round-trips through URL encoding", () => {
  const mk = (r) => ({ ...r, key: keyFor(r) });
  const { lines, subtotal } = summarize([
    mk({ type: "pizza", flavourId: "creamy-mayo", sizeId: "regular", qty: 2 }),
    mk({ type: "deal", refId: "deal-13", qty: 1 }),
    mk({ type: "side", refId: "pasta", qty: 1 }),
  ]);
  assert.equal(subtotal, 1200 + 1500 + 600);
  const msg = buildOrderMessage({ lines, orderType: "delivery", name: "Ali *Khan*", address: "House 1,\nBaldia", notes: "Fajita & Tikka" });
  assert.match(msg, /Creamy Mayo Pizza Special \(Regular\) x 2/);
  assert.match(msg, /Rs\. 600 each = Rs\. 1,200/);
  assert.match(msg, /Deal 13 x 1/);
  assert.match(msg, /1 Small Pizza, 1 Regular Pizza, 1 Large Pizza/);
  assert.match(msg, /Rs\. 1,500 each = Rs\. 1,500/);
  assert.match(msg, /Pasta x 1/);
  assert.match(msg, /Items total: Rs\. 3,300/);
  assert.match(msg, /Name: Ali Khan/); // markup characters stripped
  assert.match(msg, /Order type: Delivery/);
  assert.match(msg, /Notes: Fajita & Tikka/);
  assert.doesNotMatch(msg, /supreme/i);
  const url = new URL(buildWhatsAppUrl(PRIMARY_PHONE.intl, msg));
  assert.equal(url.host, "wa.me");
  assert.equal(url.pathname, "/923122280406");
  assert.equal(url.searchParams.get("text"), msg); // properly encoded
});

test("pickup orders omit the address line", () => {
  const { lines } = summarize([{ type: "side", refId: "pasta", qty: 1, key: "side:pasta" }]);
  const msg = buildOrderMessage({ lines, orderType: "pickup", name: "Sara", address: "ignored", notes: "" });
  assert.doesNotMatch(msg, /Address:/);
  assert.match(msg, /Order type: Pickup/);
});
