import { useEffect, useState } from "react";
import { getShopStatus } from "../utils/shopStatus.js";

const DOT = { open: "bg-emerald-400", warn: "bg-gold", closed: "bg-tomato" };

// Live "Open now / Closed" badge. Re-checks every 30s so it flips by itself.
// theme="dark" sits on the dark announcement bar, theme="light" on cream/white cards.
export default function ShopStatus({ theme = "dark", className = "" }) {
  const [status, setStatus] = useState(() => getShopStatus());
  useEffect(() => {
    const id = setInterval(() => setStatus(getShopStatus()), 30000);
    return () => clearInterval(id);
  }, []);

  const skin =
    theme === "dark" ? "border-white/25 bg-white/10 text-white" : "border-ink bg-white text-ink";

  return (
    <span
      role="status"
      className={`inline-flex items-center gap-2 rounded-full border-2 px-3 py-1 text-sm font-bold ${skin} ${className}`}
    >
      <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
        {status.open && (
          <span className={`absolute inline-flex h-full w-full rounded-full opacity-70 motion-safe:animate-ping ${DOT[status.tone]}`} />
        )}
        <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${DOT[status.tone]}`} />
      </span>
      {status.text}
    </span>
  );
}
