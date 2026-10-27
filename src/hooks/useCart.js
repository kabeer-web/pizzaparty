import { useCallback, useEffect, useMemo, useState } from "react";
import { MAX_QTY, clampQty, keyFor, resolveLine, summarize } from "../utils/cart.js";

const STORAGE_KEY = "pizza-party-cart-v1";

/**
 * The cart stores only references (what + how many). Names and prices are
 * always looked up from src/data/menu.js, so a price change there can never
 * leave a stale price in a customer's saved cart, and withdrawn items
 * (old deals or flavours) are dropped automatically from saved carts.
 */
function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!Array.isArray(saved)) return [];
    const seen = new Set();
    const refs = [];
    for (const r of saved) {
      if (!r || typeof r !== "object" || !resolveLine(r)) continue;
      const key = keyFor(r);
      if (seen.has(key)) continue;
      seen.add(key);
      refs.push({ ...r, key, qty: clampQty(r.qty) });
    }
    return refs;
  } catch {
    return [];
  }
}

export default function useCart() {
  const [refs, setRefs] = useState(loadCart);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(refs));
    } catch {
      /* storage blocked or full - the cart still works for this visit */
    }
  }, [refs]);

  // ref: { type: "pizza", flavourId, sizeId } | { type: "deal"|"side", refId }
  const addItem = useCallback((ref, qty = 1) => {
    if (!resolveLine(ref)) return;
    const key = keyFor(ref);
    setRefs((prev) => {
      const found = prev.find((r) => r.key === key);
      if (found) return prev.map((r) => (r.key === key ? { ...r, qty: clampQty(r.qty + qty) } : r));
      return [...prev, { ...ref, key, qty: clampQty(qty) }];
    });
  }, []);

  const changeQty = useCallback(
    (key, delta) => setRefs((prev) => prev.map((r) => (r.key === key ? { ...r, qty: clampQty(r.qty + delta) } : r))),
    []
  );
  const removeItem = useCallback((key) => setRefs((prev) => prev.filter((r) => r.key !== key)), []);
  const clearCart = useCallback(() => setRefs([]), []);

  const { lines, count, subtotal } = useMemo(() => summarize(refs), [refs]);

  return { lines, count, subtotal, total: subtotal, addItem, changeQty, removeItem, clearCart, MAX_QTY };
}
