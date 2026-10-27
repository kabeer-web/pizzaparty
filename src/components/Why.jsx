import { LayoutGrid, Smartphone, Tag } from "lucide-react";
import { DEALS, FLAVOURS, SIZES } from "../data/menu.js";
import { Reveal } from "../hooks/parallax.jsx";
import { SectionHeading } from "./ui.jsx";

const REASONS = [
  {
    icon: Tag,
    title: "Prices you can see",
    text: "Every size, side and deal is listed with its price right on the menu. No guessing before you order.",
  },
  {
    icon: LayoutGrid,
    title: "Plenty to pick from",
    text: `${FLAVOURS.length} flavours in ${SIZES.length} sizes, plus pasta, lasagna, spaghetti, pizza fries and ${DEALS.length} ready-made deals.`,
  },
  {
    icon: Smartphone,
    title: "Order from your phone",
    text: "Build your order here and send it in one tap. It opens in WhatsApp, ready for you to press Send.",
  },
];

export default function Why() {
  return (
    <section className="bg-tomato py-14 text-white sm:py-20" aria-labelledby="why-title">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading id="why-title">Why choose Pizza Party?</SectionHeading>
        <ul className="mt-9 grid gap-5 md:grid-cols-3">
          {REASONS.map(({ icon: Icon, title, text }, i) => (
            <Reveal as="li" key={title} delay={i * 110}>
            <div className="pop-card group h-full rounded-3xl bg-white p-6 text-ink">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold transition duration-300 group-hover:rotate-12 group-hover:scale-110">
                <Icon size={24} aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-display text-2xl leading-tight">{title}</h3>
              <p className="mt-2 text-lg leading-relaxed text-ink/80">{text}</p>
            </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
