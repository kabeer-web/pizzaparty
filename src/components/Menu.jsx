import PizzaBuilder from "./PizzaBuilder.jsx";
import Sides from "./Sides.jsx";

export default function Menu({ onAdd }) {
  return (
    <section id="menu" className="bg-cream pb-16 pt-12 sm:pb-24 sm:pt-16" aria-label="Menu">
      <div className="mx-auto max-w-7xl space-y-20 px-4 sm:space-y-24">
        <PizzaBuilder onAdd={onAdd} />
        <Sides onAdd={onAdd} />
      </div>
    </section>
  );
}
