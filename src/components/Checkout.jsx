import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { PHONES, PRIMARY_PHONE_INDEX } from "../config.js";
import { buildOrderMessage, buildWhatsAppUrl } from "../utils/whatsapp.js";
import { btnRed } from "./ui.jsx";

const EMPTY = { name: "", orderType: "delivery", address: "", notes: "", phoneIdx: PRIMARY_PHONE_INDEX };

function validate(f) {
  const e = {};
  if (f.name.trim().length < 2) e.name = "Enter your name.";
  if (f.orderType === "delivery" && f.address.trim().length < 8) e.address = "Enter your full delivery address.";
  return e;
}

const field =
  "mt-1 w-full rounded-xl border-2 bg-white px-3 py-3 text-base focus:border-ink focus:outline-none";

export default function Checkout({ cart }) {
  const { lines } = cart;
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [sentUrl, setSentUrl] = useState(null);

  const set = (name, value) => {
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((e) => ({ ...e, [name]: undefined }));
    setSentUrl(null);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (lines.length === 0) return;
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length) {
      document.getElementById(found.name ? "co-name" : "co-address")?.focus();
      return;
    }
    const message = buildOrderMessage({
      lines,
      orderType: form.orderType,
      name: form.name.trim(),
      address: form.address.trim(),
      notes: form.notes.trim(),
    });
    const url = buildWhatsAppUrl(PHONES[form.phoneIdx].intl, message);
    setSentUrl(url);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-3xl border-2 border-ink bg-white p-5 shadow-[0_6px_0_#171717] sm:p-6"
    >
      <h3 className="font-display text-2xl">Send your order</h3>

      {lines.length === 0 ? (
        <p className="py-10 text-center text-ink/70">Add something to your cart, then fill in your details here.</p>
      ) : (
        <div className="mt-4 space-y-5">
          <div>
            <label htmlFor="co-name" className="font-bold">Your name</label>
            <input
              id="co-name"
              value={form.name}
              maxLength={60}
              onChange={(e) => set("name", e.target.value)}
              autoComplete="name"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "co-name-err" : undefined}
              className={`${field} ${errors.name ? "border-tomato" : "border-ink/30"}`}
            />
            {errors.name && <p id="co-name-err" className="mt-1 text-sm font-semibold text-tomato">{errors.name}</p>}
          </div>

          <fieldset>
            <legend className="font-bold">Delivery or pickup?</legend>
            <div className="mt-2 grid grid-cols-2 gap-3">
              {[
                ["delivery", "Delivery"],
                ["pickup", "Pickup"],
              ].map(([value, label]) => (
                <label
                  key={value}
                  className={`flex min-h-12 cursor-pointer items-center justify-center rounded-xl border-2 font-bold has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-gold ${
                    form.orderType === value ? "border-ink bg-ink text-gold" : "border-ink/30 hover:border-ink"
                  }`}
                >
                  <input
                    type="radio"
                    name="orderType"
                    value={value}
                    checked={form.orderType === value}
                    onChange={() => set("orderType", value)}
                    className="sr-only"
                  />
                  {label}
                </label>
              ))}
            </div>
          </fieldset>

          {form.orderType === "delivery" && (
            <div>
              <label htmlFor="co-address" className="font-bold">Delivery address</label>
              <textarea
                id="co-address"
                rows={3}
                value={form.address}
                maxLength={250}
                onChange={(e) => set("address", e.target.value)}
                autoComplete="street-address"
                aria-invalid={Boolean(errors.address)}
                aria-describedby={errors.address ? "co-address-err" : undefined}
                className={`${field} ${errors.address ? "border-tomato" : "border-ink/30"}`}
              />
              {errors.address && (
                <p id="co-address-err" className="mt-1 text-sm font-semibold text-tomato">{errors.address}</p>
              )}
            </div>
          )}

          <div>
            <label htmlFor="co-notes" className="font-bold">
              Notes <span className="font-normal text-ink/60">(optional)</span>
            </label>
            <textarea
              id="co-notes"
              rows={2}
              value={form.notes}
              maxLength={300}
              onChange={(e) => set("notes", e.target.value)}
              placeholder="Pizza flavours for your deal, extra topping, etc."
              className={`${field} border-ink/30`}
            />
          </div>

          <fieldset>
            <legend className="font-bold">Send to this WhatsApp number</legend>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {PHONES.map((p, i) => (
                <label
                  key={p.intl}
                  className={`flex min-h-12 cursor-pointer items-center justify-center rounded-xl border-2 font-bold has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-gold ${
                    form.phoneIdx === i ? "border-ink bg-ink text-gold" : "border-ink/30 hover:border-ink"
                  }`}
                >
                  <input
                    type="radio"
                    name="phone"
                    checked={form.phoneIdx === i}
                    onChange={() => set("phoneIdx", i)}
                    className="sr-only"
                  />
                  {p.display}
                </label>
              ))}
            </div>
          </fieldset>

          <details className="rounded-xl border-2 border-ink/20 bg-cream p-3">
            <summary className="min-h-9 cursor-pointer font-bold">Preview the message that will be sent</summary>
            <pre className="mt-3 whitespace-pre-wrap break-words font-sans text-sm leading-relaxed">
              {buildOrderMessage({
                lines,
                orderType: form.orderType,
                name: form.name.trim() || "(your name)",
                address: form.address.trim() || "(your address)",
                notes: form.notes.trim(),
              })}
            </pre>
          </details>

          <button type="submit" className={`${btnRed} w-full`}>
            <MessageCircle size={20} aria-hidden="true" /> Send order on WhatsApp
          </button>
          <p className="text-sm leading-relaxed text-ink/70">
            This opens WhatsApp with your order already written. Your order is not placed until you press Send there.
            We confirm the final total and timing on WhatsApp.
          </p>

          {sentUrl && (
            <p role="status" className="rounded-xl bg-cream p-3 text-sm font-semibold">
              WhatsApp should now be open with your order. Press Send to finish. Nothing opened?{" "}
              <a href={sentUrl} target="_blank" rel="noopener noreferrer" className="text-tomato underline">
                Open WhatsApp
              </a>
              .
            </p>
          )}
        </div>
      )}
    </form>
  );
}
