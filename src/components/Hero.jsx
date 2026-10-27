import { SIZES } from "../data/menu.js";
import { BUSINESS } from "../config.js";
import { Parallax } from "../hooks/parallax.jsx";
import { btnInk, btnRed } from "./ui.jsx";

const TITLE = ["Your", "Pizza", "Party", "Starts", "Here!"];
const MASK = "radial-gradient(ellipse 52% 54% at 50% 50%, #000 64%, transparent 100%)";

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-hero pb-10 sm:pb-14" aria-labelledby="hero-title">
      {/* floating slices: drift at different speeds as you scroll */}
      <Parallax speed={0.32} rotate={-22} className="pointer-events-none absolute -right-10 top-4 z-0 hidden w-48 sm:block lg:w-56" aria-hidden="true">
        <img src="/images/slice-260.webp" alt="" width="260" height="214" className="bob opacity-90" style={{ animationDelay: "-2s" }} />
      </Parallax>

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-2 px-4 pt-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-6 lg:pt-14">
        <div>
          <h1 id="hero-title" className="outline-text font-display text-[2.9rem] leading-[1.02] sm:text-6xl xl:text-7xl">
            {TITLE.map((w, i) => (
              <span key={w} className="word-rise mr-[0.28em]" style={{ animationDelay: `${i * 90}ms` }}>
                {w}
              </span>
            ))}
          </h1>
          <p className="mt-6 max-w-xl text-lg font-medium leading-relaxed sm:text-xl">
            Delicious pizzas, irresistible deals, and happiness in every bite. Find your favourite flavour and order
            from {BUSINESS.name} in {BUSINESS.address.area}, {BUSINESS.address.city}.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a href="#builder" className={btnRed}>Order Now</a>
            <a href="#deals" className={btnInk}>Explore Deals</a>
          </div>

          <ul className="mt-8 grid max-w-xl grid-cols-4 gap-2 sm:gap-3" aria-label="Pizza sizes and prices">
            {SIZES.map((s) => (
              <li key={s.id}>
                <a
                  href="#builder"
                  className="block rounded-2xl border-2 border-ink bg-white/90 px-1 py-2 text-center transition duration-300 hover:-translate-y-1.5 hover:rotate-1 hover:bg-white hover:shadow-[0_6px_0_#171717]"
                >
                  <span className="block text-sm font-bold">{s.name}</span>
                  <span className="block font-display text-xl sm:text-2xl">{s.price.toLocaleString("en-US")}</span>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-sm font-semibold">Prices in Pakistani rupees (Rs.).</p>
        </div>

        <Parallax speed={0.07} className="-mx-4 lg:mx-0">
          <div className="pop-in">
            <img
              src="/images/hero-960.webp"
              srcSet="/images/hero-640.webp 640w, /images/hero-960.webp 960w, /images/hero-1320.webp 1320w"
              sizes="(min-width: 1024px) 56vw, 100vw"
              width="1320"
              height="730"
              fetchpriority="high"
              alt="Cheesy Pizza Party pizza slices with melted cheese stretching between them, next to the Pizza Party logo"
              className="mx-auto h-auto w-full"
              style={{ WebkitMaskImage: MASK, maskImage: MASK }}
            />
          </div>
        </Parallax>
      </div>
      <div className="gingham absolute inset-x-0 bottom-0" aria-hidden="true" />
    </section>
  );
}
