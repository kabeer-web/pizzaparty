// BeerFlow Technologies logo: dark rounded square with gradient "B" + wordmark
export default function BeerFlowLogo({ size = 40, dark = true }) {
  return (
    <span className="inline-flex items-center gap-3">
      <span
        style={{ width: size, height: size }}
        className="flex items-center justify-center rounded-xl bg-gray-950 ring-1 ring-white/15"
      >
        <span
          style={{ fontSize: size * 0.58 }}
          className="bg-gradient-to-br from-indigo-500 to-cyan-400 bg-clip-text font-extrabold leading-none text-transparent"
        >
          B
        </span>
      </span>
      <span className="leading-tight">
        <span className="block text-lg font-extrabold tracking-tight">
          <span className={dark ? "text-white" : "text-gray-900"}>beer</span>
          <span className="bg-gradient-to-r from-indigo-400 to-cyan-300 bg-clip-text text-transparent">flow</span>
        </span>
        <span className="block text-[10px] font-semibold tracking-widest text-gray-400">CUSTOM POS &amp; SOFTWARE</span>
      </span>
    </span>
  );
}
