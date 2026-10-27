// ---------------------------------------------------------------------------
// SINGLE SOURCE OF TRUTH for the menu, prices and deals.
// Taken from the Pizza Party menu poster. Change prices here only.
// ---------------------------------------------------------------------------

export const SIZES = [
  { id: "small", name: "Small", price: 300 },
  { id: "regular", name: "Regular", price: 600 },
  { id: "large", name: "Large", price: 850 },
  { id: "jumbo", name: "Jumbo", price: 1200 },
];

// `name` is the flavour label; `itemName` is the full name shown in the cart, toasts
// and WhatsApp order (so "Creamy Mayo Pizza Special" never becomes "... Pizza Special Pizza").
const flavour = (id, name, itemName = `${name} Pizza`) => ({ id, name, itemName });

export const FLAVOURS = [
  flavour("tikka", "Tikka"),
  flavour("fajita", "Fajita"),
  flavour("tandoori", "Tandoori"),
  flavour("malai-boti", "Malai Boti"),
  flavour("afghani-boti", "Afghani Boti"),
  flavour("creamy-mayo", "Creamy Mayo Pizza Special", "Creamy Mayo Pizza Special"),
  flavour("crown", "Crown Pizza", "Crown Pizza"),
];

export const SIDES = [
  { id: "pasta", name: "Pasta", price: 600 },
  { id: "lasagna", name: "Lasagna", price: 600 },
  { id: "spaghetti", name: "Spaghetti", price: 600 },
  { id: "fries-small", name: "Pizza Fries Small", price: 300 },
  { id: "fries-regular", name: "Pizza Fries Regular", price: 500 },
];

// kind: pizza | pasta | fries | drink.  `size` is set for pizzas so we can show
// the "bought separately" total on pizza-only deals.
const pizza = (qty, size, text) => ({ qty, kind: "pizza", size, text });
const other = (qty, kind, text) => ({ qty, kind, text });

// Deal numbers are the original menu numbers and are never renumbered.
// Deals 08, 09 and 12 were withdrawn and must not appear anywhere. Prices are
// FIXED menu prices: they are never calculated from the items.
// `isNew` only drives the small "New" tag; delete it to remove the tag.
export const DEALS = [
  { id: "deal-01", number: "01", price: 500, items: [pizza(2, "small", "2 Small Pizzas")] },
  { id: "deal-02", number: "02", price: 1000, items: [pizza(2, "regular", "2 Regular Pizzas")] },
  { id: "deal-03", number: "03", price: 1000, items: [pizza(4, "small", "4 Small Pizzas")] },
  { id: "deal-04", number: "04", price: 1400, items: [pizza(3, "regular", "3 Regular Pizzas")] },
  {
    id: "deal-05",
    number: "05",
    price: 1400,
    items: [
      other(1, "pasta", "1 Pasta"),
      other(1, "fries", "1 Small Pizza Fries"),
      pizza(1, "small", "1 Small Pizza"),
      pizza(1, "regular", "1 Regular Pizza"),
      other(1, "drink", "500 ml Cold Drink"),
    ],
  },
  {
    id: "deal-06",
    number: "06",
    price: 1500,
    items: [pizza(2, "regular", "2 Regular Pizzas"), other(1, "pasta", "1 Pasta"), other(1, "drink", "1 Litre Cold Drink")],
  },
  {
    id: "deal-07",
    number: "07",
    price: 1750,
    items: [pizza(2, "large", "2 Large Pizzas"), other(1, "drink", "1 Litre Cold Drink")],
  },
  { id: "deal-10", number: "10", price: 2200, items: [pizza(2, "jumbo", "2 Jumbo Pizzas")] },
  { id: "deal-11", number: "11", price: 2250, items: [pizza(3, "large", "3 Large Pizzas")] },
  {
    id: "deal-13",
    number: "13",
    price: 1500,
    isNew: true,
    items: [pizza(1, "small", "1 Small Pizza"), pizza(1, "regular", "1 Regular Pizza"), pizza(1, "large", "1 Large Pizza")],
  },
];

// ---- Helpers (derived data, never hard-coded) ----
export const getSize = (id) => SIZES.find((s) => s.id === id);
export const getFlavour = (id) => FLAVOURS.find((f) => f.id === id);
export const getSide = (id) => SIDES.find((s) => s.id === id);
export const getDeal = (id) => DEALS.find((d) => d.id === id);

export const isPizzaOnlyDeal = (deal) => deal.items.every((i) => i.kind === "pizza");
export const hasDrink = (deal) => deal.items.some((i) => i.kind === "drink");

/** What the same pizzas would cost bought separately (pizza-only deals). */
export const separatePizzaTotal = (deal) =>
  isPizzaOnlyDeal(deal) ? deal.items.reduce((sum, i) => sum + i.qty * getSize(i.size).price, 0) : null;

export const LOWEST_DEAL_PRICE = Math.min(...DEALS.map((d) => d.price));
export const HIGHEST_DEAL_PRICE = Math.max(...DEALS.map((d) => d.price));
