import { MessageCircle, Pizza, ShoppingBag } from "lucide-react";
import { Reveal } from "../hooks/parallax.jsx";

const STEPS = [
  { icon: Pizza, title: "Pick your pizza or deal", text: "Choose a flavour and size, or grab one of the ready-made deals." },
  { icon: ShoppingBag, title: "Add it to your order", text: "Change quantities any time. The total updates as you go." },
  { icon: MessageCircle, title: "Send it on WhatsApp", text: "One tap opens WhatsApp with your order written. Press Send and we confirm." },
];

export default function HowToOrder() {
  return (
    <section className="relative z-10 -mt-6 px-4 pb-4 sm:-mt-10" aria-labelledby="how-title">
      <Reveal className="pop-card mx-auto max-w-6xl rounded-3xl bg-white p-6 sm:p-8">
        <h2 id="how-title" className="font-display text-2xl sm:text-3xl">How to order</h2>
        <ol className="mt-5 grid gap-5 md:grid-cols-3">
          {STEPS.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="group relative flex gap-4">
              <span className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gold transition duration-300 group-hover:-rotate-6 group-hover:scale-110">
                <Icon size={26} aria-hidden="true" />
                <span className="absolute -left-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-ink text-sm font-extrabold text-gold">
                  {i + 1}
                </span>
              </span>
              <div>
                <h3 className="text-lg font-extrabold leading-snug">{title}</h3>
                <p className="mt-1 leading-snug text-ink/75">{text}</p>
              </div>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}
