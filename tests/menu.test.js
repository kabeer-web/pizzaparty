import test from "node:test";
import assert from "node:assert/strict";
import { DEALS, FLAVOURS, SIDES, SIZES, getDeal } from "../src/data/menu.js";

const deal = (n) => DEALS.find((d) => d.number === n);
const texts = (d) => d.items.map((i) => i.text);

test("pizza sizes and prices", () => {
  assert.deepEqual(SIZES.map((s) => [s.name, s.price]), [["Small", 300], ["Regular", 600], ["Large", 850], ["Jumbo", 1200]]);
});

test("exactly the 7 approved flavours, no Supreme", () => {
  assert.deepEqual(FLAVOURS.map((f) => f.name), [
    "Tikka", "Fajita", "Tandoori", "Malai Boti", "Afghani Boti", "Creamy Mayo Pizza Special", "Crown Pizza",
  ]);
  assert.ok(!FLAVOURS.some((f) => /supreme/i.test(f.id + f.name + f.itemName)));
});

test("full item names (cart / WhatsApp) never double the word Pizza", () => {
  const names = FLAVOURS.map((f) => f.itemName);
  assert.deepEqual(names, [
    "Tikka Pizza", "Fajita Pizza", "Tandoori Pizza", "Malai Boti Pizza", "Afghani Boti Pizza",
    "Creamy Mayo Pizza Special", "Crown Pizza",
  ]);
});

test("sides and prices", () => {
  assert.deepEqual(SIDES.map((s) => [s.name, s.price]), [
    ["Pasta", 600], ["Lasagna", 600], ["Spaghetti", 600], ["Pizza Fries Small", 300], ["Pizza Fries Regular", 500],
  ]);
});

test("only deals 01-07, 10, 11, 13 exist, in that order", () => {
  assert.deepEqual(DEALS.map((d) => d.number), ["01", "02", "03", "04", "05", "06", "07", "10", "11", "13"]);
  for (const gone of ["08", "09", "12"]) {
    assert.equal(deal(gone), undefined);
    assert.equal(getDeal(`deal-${gone}`), undefined);
  }
  assert.equal(new Set(DEALS.map((d) => d.id)).size, DEALS.length);
});

test("deal prices and contents match the approved menu", () => {
  const expected = {
    "01": [500, ["2 Small Pizzas"]],
    "02": [1000, ["2 Regular Pizzas"]],
    "03": [1000, ["4 Small Pizzas"]],
    "04": [1400, ["3 Regular Pizzas"]],
    "05": [1400, ["1 Pasta", "1 Small Pizza Fries", "1 Small Pizza", "1 Regular Pizza", "500 ml Cold Drink"]],
    "06": [1500, ["2 Regular Pizzas", "1 Pasta", "1 Litre Cold Drink"]],
    "07": [1750, ["2 Large Pizzas", "1 Litre Cold Drink"]],
    "10": [2200, ["2 Jumbo Pizzas"]],
    "11": [2250, ["3 Large Pizzas"]],
    "13": [1500, ["1 Small Pizza", "1 Regular Pizza", "1 Large Pizza"]],
  };
  for (const [n, [price, items]] of Object.entries(expected)) {
    assert.equal(deal(n).price, price, `Deal ${n} price`);
    assert.deepEqual(texts(deal(n)), items, `Deal ${n} items`);
  }
});

test("deal 13 did not replace deal 10 or 11", () => {
  assert.equal(deal("10").price, 2200);
  assert.deepEqual(texts(deal("10")), ["2 Jumbo Pizzas"]);
  assert.equal(deal("11").price, 2250);
  assert.deepEqual(texts(deal("11")), ["3 Large Pizzas"]);
});
