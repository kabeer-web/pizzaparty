import test from "node:test";
import assert from "node:assert/strict";
import { MAX_QTY, clampQty, keyFor, resolveLine, summarize } from "../src/utils/cart.js";

const refs = (...r) => r.map((x) => ({ ...x, key: keyFor(x) }));

test("deal keeps its fixed price (never the sum of its items)", () => {
  // Deal 13: items would total Rs. 1750 separately, but the deal price is Rs. 1500
  const { subtotal, lines } = summarize(refs({ type: "deal", refId: "deal-13", qty: 2 }));
  assert.equal(lines[0].unitPrice, 1500);
  assert.equal(subtotal, 3000);
  assert.equal(lines[0].displayName, "Deal 13");
  assert.equal(lines[0].detail, "1 Small Pizza, 1 Regular Pizza, 1 Large Pizza");
});

test("mixed cart totals", () => {
  const { subtotal, count } = summarize(
    refs(
      { type: "pizza", flavourId: "tikka", sizeId: "small", qty: 2 }, // 600
      { type: "pizza", flavourId: "crown", sizeId: "jumbo", qty: 1 }, // 1200
      { type: "deal", refId: "deal-10", qty: 1 }, // 2200
      { type: "side", refId: "fries-regular", qty: 3 } // 1500
    )
  );
  assert.equal(subtotal, 600 + 1200 + 2200 + 1500);
  assert.equal(count, 7);
});

test("pizza lines show flavour and size, new flavours named correctly", () => {
  assert.equal(resolveLine({ type: "pizza", flavourId: "creamy-mayo", sizeId: "regular" }).displayName, "Creamy Mayo Pizza Special (Regular)");
  assert.equal(resolveLine({ type: "pizza", flavourId: "crown", sizeId: "large" }).displayName, "Crown Pizza (Large)");
  assert.equal(resolveLine({ type: "pizza", flavourId: "tikka", sizeId: "small" }).displayName, "Tikka Pizza (Small)");
});

test("withdrawn items in an old saved cart are dropped", () => {
  assert.equal(resolveLine({ type: "pizza", flavourId: "supreme", sizeId: "small" }), null);
  for (const id of ["deal-08", "deal-09", "deal-12"]) assert.equal(resolveLine({ type: "deal", refId: id }), null);
  const { lines } = summarize([
    { type: "deal", refId: "deal-12", qty: 1 },
    { type: "pizza", flavourId: "supreme", sizeId: "small", qty: 1 },
    { type: "deal", refId: "deal-11", qty: 1 },
  ]);
  assert.deepEqual(lines.map((l) => l.name), ["Deal 11"]);
});

test("quantities can never go below 1 or above the maximum", () => {
  assert.equal(clampQty(0), 1);
  assert.equal(clampQty(-5), 1);
  assert.equal(clampQty("abc"), 1);
  assert.equal(clampQty(2.9), 2);
  assert.equal(clampQty(10_000), MAX_QTY);
});
