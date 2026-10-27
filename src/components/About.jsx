import { BUSINESS } from "../config.js";
import { FLAVOURS, SIZES } from "../data/menu.js";
import { Parallax } from "../hooks/parallax.jsx";
import { SectionHeading } from "./ui.jsx";

export default function About() {
  return (
    <section id="story" className="bg-cream py-14 sm:py-20" aria-labelledby="story-title">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <Parallax speed={0.08} rotate={6} className="mx-auto w-full max-w-sm">
          <img
            src="/images/logo-480.webp"
            srcSet="/images/logo-480.webp 480w, /images/logo-720.webp 720w"
            sizes="(min-width: 768px) 384px, 80vw"
            width="720"
            height="711"
            loading="lazy"
            alt={`${BUSINESS.name} logo: a cheesy pizza slice above the words Pizza Party, with the slogan Slice, Smile, Repeat`}
            className="h-auto w-full"
          />
        </Parallax>
        <div>
          <SectionHeading id="story-title">Our story: One Bite, Pure Happiness</SectionHeading>
          <div className="mt-6 max-w-xl space-y-4 text-lg leading-relaxed">
            <p>
              {BUSINESS.name} is a local pizza and food spot in {BUSINESS.address.area}, {BUSINESS.address.city}. We
              serve pizza in {SIZES.length} sizes and {FLAVOURS.length} flavours, along with pasta, lasagna, spaghetti and pizza fries.
            </p>
            <p>
              Ordering for yourself or for the whole table? Our deals put pizzas, sides and cold drinks together at one
              clear price.
            </p>
            <p className="font-display text-2xl">{BUSINESS.slogan}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
