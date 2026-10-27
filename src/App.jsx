import { useCallback, useEffect, useRef, useState } from "react";
import Announcement from "./components/Announcement.jsx";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import HowToOrder from "./components/HowToOrder.jsx";
import Menu from "./components/Menu.jsx";
import Marquee from "./components/Marquee.jsx";
import Deals from "./components/Deals.jsx";
import OrderBanner from "./components/OrderBanner.jsx";
import Why from "./components/Why.jsx";
import About from "./components/About.jsx";
import Location from "./components/Location.jsx";
import Footer from "./components/Footer.jsx";
import MobileCartBar from "./components/MobileCartBar.jsx";
import CartDrawer from "./components/CartDrawer.jsx";
import Toast from "./components/Toast.jsx";
import ShopWelcome from "./components/ShopWelcome.jsx";
import useCart from "./hooks/useCart.js";

export default function App() {
  const cart = useCart();
  const [toast, setToast] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const timer = useRef(null);

  const openCart = useCallback(() => {
    setToast(null);
    setCartOpen(true);
  }, []);
  const closeCart = useCallback(() => setCartOpen(false), []);

  const { addItem } = cart;
  const handleAdd = useCallback(
    (ref, qty, label) => {
      addItem(ref, qty);
      setToast({ id: Date.now(), text: label });
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setToast(null), 3800);
    },
    [addItem]
  );
  useEffect(() => () => clearTimeout(timer.current), []);

  // old "#order" links still open the order panel
  useEffect(() => {
    const check = () => window.location.hash === "#order" && setCartOpen(true);
    check();
    window.addEventListener("hashchange", check);
    return () => window.removeEventListener("hashchange", check);
  }, []);

  return (
    <div className="min-h-screen pb-20 lg:pb-0">
      <a
        href="#builder"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[80] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to ordering
      </a>
      <Announcement />
      <Header cartCount={cart.count} onOpenCart={openCart} />
      <main>
        <Hero />
        <HowToOrder />
        <Menu onAdd={handleAdd} />
        <Marquee />
        <Deals onAdd={handleAdd} />
        <OrderBanner count={cart.count} total={cart.total} onOpenCart={openCart} />
        <Why />
        <About />
        <Location />
      </main>
      <Footer onOpenCart={openCart} />
      <Toast toast={toast} onOpen={openCart} />
      <ShopWelcome />
      <MobileCartBar count={cart.count} total={cart.total} onOpen={openCart} />
      <CartDrawer open={cartOpen} onClose={closeCart} cart={cart} />
    </div>
  );
}
