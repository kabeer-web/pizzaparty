// ---------------------------------------------------------------------------
// SEO build plugin (Pizza Party) - built by BeerFlow Technologies.
//  - injects canonical / Open Graph URLs (needs VITE_SITE_URL)
//  - injects Restaurant JSON-LD generated from src/config.js + src/data/menu.js
//  - injects a plain-HTML copy of the key business info + menu into #root so it
//    is readable without JavaScript (React replaces it on load)
//  - emits robots.txt and sitemap.xml
// Menu/prices/contact details are NEVER duplicated here: they come from the
// same data files the website uses.
// ---------------------------------------------------------------------------
import { loadEnv } from "vite";
import { BUSINESS, FULL_ADDRESS, PHONES, SITE_URL } from "../src/config.js";
import { DEALS, FLAVOURS, SIDES, SIZES } from "../src/data/menu.js";

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const rs = (n) => `Rs. ${Number(n).toLocaleString("en-US")}`;

function normaliseSiteUrl(raw) {
  if (!raw) return "";
  const url = String(raw).trim().replace(/\/+$/, "");
  return /^https?:\/\/[^\s/]+/.test(url) ? url : "";
}

const offer = (price) => ({ "@type": "Offer", price: String(price), priceCurrency: "PKR" });

function buildJsonLd(site) {
  const a = BUSINESS.address;
  const allPrices = [...SIZES.map((s) => s.price), ...SIDES.map((s) => s.price), ...DEALS.map((d) => d.price)];

  const data = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: BUSINESS.name,
    description: `${BUSINESS.name} is a pizza restaurant in ${a.area}, ${a.city}. ${BUSINESS.tagline}.`,
    slogan: BUSINESS.tagline,
    servesCuisine: ["Pizza"],
    address: {
      "@type": "PostalAddress",
      streetAddress: `${a.street}, ${a.area}`,
      addressLocality: a.city,
      addressRegion: a.region,
      addressCountry: a.countryCode,
    },
    telephone: PHONES[0].tel,
    contactPoint: PHONES.map((p) => ({ "@type": "ContactPoint", telephone: p.tel, contactType: "customer service" })),
    priceRange: `PKR ${Math.min(...allPrices)} - PKR ${Math.max(...allPrices)}`,
    hasMenu: {
      "@type": "Menu",
      name: `${BUSINESS.name} menu`,
      hasMenuSection: [
        {
          "@type": "MenuSection",
          name: "Pizza",
          description: `Flavours: ${FLAVOURS.map((f) => f.name).join(", ")}.`,
          hasMenuItem: SIZES.map((s) => ({
            "@type": "MenuItem",
            name: `${s.name} Pizza`,
            description: `Choose from ${FLAVOURS.map((f) => f.name).join(", ")}.`,
            offers: offer(s.price),
          })),
        },
        {
          "@type": "MenuSection",
          name: "Pasta, lasagna and pizza fries",
          hasMenuItem: SIDES.map((s) => ({ "@type": "MenuItem", name: s.name, offers: offer(s.price) })),
        },
        {
          "@type": "MenuSection",
          name: "Pizza deals",
          hasMenuItem: DEALS.map((d) => ({
            "@type": "MenuItem",
            name: `Deal ${d.number}`,
            description: d.items.map((i) => i.text).join(", "),
            offers: offer(d.price),
          })),
        },
      ],
    },
  };

  if (site) {
    data["@id"] = `${site}/#restaurant`;
    data.url = `${site}/`;
    data.logo = `${site}/images/logo-512.png`;
    data.image = [`${site}/og-image.jpg`];
    data.hasMenu.url = `${site}/#menu`;
  }
  // Only include these once the owner has confirmed them in src/config.js.
  if (BUSINESS.geo) {
    data.geo = { "@type": "GeoCoordinates", latitude: BUSINESS.geo.latitude, longitude: BUSINESS.geo.longitude };
  }
  if (BUSINESS.openingHours?.length) data.openingHours = BUSINESS.openingHours;
  if (BUSINESS.socialLinks?.length) data.sameAs = BUSINESS.socialLinks;

  return JSON.stringify(data).replace(/</g, "\\u003c");
}

function buildHead(site) {
  const lines = [];
  if (site) {
    lines.push(
      `<link rel="canonical" href="${site}/" />`,
      `<meta property="og:url" content="${site}/" />`,
      `<meta property="og:image" content="${site}/og-image.jpg" />`,
      `<meta property="og:image:width" content="1200" />`,
      `<meta property="og:image:height" content="630" />`,
      `<meta property="og:image:alt" content="Pizza Party - cheesy pizza slices and the Pizza Party logo" />`,
      `<meta name="twitter:image" content="${site}/og-image.jpg" />`
    );
  }
  lines.push(`<script type="application/ld+json">${buildJsonLd(site)}</script>`);
  return lines.join("\n    ");
}

function buildStaticHtml() {
  const a = BUSINESS.address;
  const li = (items) => `<ul>${items.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>`;
  return `
<div style="max-width:860px;margin:0 auto;padding:24px 16px;font-family:system-ui,sans-serif;line-height:1.5;color:#111">
  <h1>${esc(BUSINESS.name)} - pizza in ${esc(a.area)}, ${esc(a.city)}</h1>
  <p>${esc(BUSINESS.tagline)}. ${esc(BUSINESS.slogan)}. Pizza deals, pizza menu and prices in ${esc(a.area)}, ${esc(a.city)}. Order on WhatsApp.</p>
  <h2>Address and contact</h2>
  <p>${esc(FULL_ADDRESS)}</p>
  ${li(PHONES.map((p) => `${p.display} (call or WhatsApp)`))}
  <h2>Pizza sizes and prices</h2>
  ${li(SIZES.map((s) => `${s.name}: ${rs(s.price)}`))}
  <h2>Pizza flavours</h2>
  ${li(FLAVOURS.map((f) => f.name))}
  <h2>Pasta, lasagna and pizza fries</h2>
  ${li(SIDES.map((s) => `${s.name}: ${rs(s.price)}`))}
  <h2>Pizza deals</h2>
  ${li(DEALS.map((d) => `Deal ${d.number}: ${d.items.map((i) => i.text).join(", ")} - ${rs(d.price)}`))}
  <p>Loading the ordering page&hellip;</p>
</div>`;
}

export default function seoPlugin() {
  let site = "";
  return {
    name: "pizza-party-seo",
    configResolved(config) {
      const env = loadEnv(config.mode, config.root, "VITE_");
      // VITE_SITE_URL overrides the default (e.g. when a custom domain is added later).
      site = normaliseSiteUrl(env.VITE_SITE_URL) || normaliseSiteUrl(SITE_URL);
      if (!site && config.command === "build") {
        console.warn(
          "\n[seo] VITE_SITE_URL is not set: canonical URL, og:url/og:image, JSON-LD url/logo/image and sitemap.xml are skipped.\n" +
            "      Set it to the final domain (e.g. VITE_SITE_URL=https://your-domain.com) and rebuild.\n"
        );
      }
    },
    transformIndexHtml(html) {
      const tokens = {
        "{{MIN_PIZZA_PRICE}}": String(Math.min(...SIZES.map((s) => s.price))),
        "{{FLAVOUR_COUNT}}": String(FLAVOURS.length),
        "{{DEAL_COUNT}}": String(DEALS.length),
      };
      let out = html.replace("<!--SEO_HEAD-->", buildHead(site)).replace("<!--SEO_STATIC-->", buildStaticHtml());
      for (const [token, value] of Object.entries(tokens)) out = out.split(token).join(value);
      return out;
    },
    generateBundle() {
      const robots = ["User-agent: *", "Allow: /", ...(site ? ["", `Sitemap: ${site}/sitemap.xml`] : []), ""].join("\n");
      this.emitFile({ type: "asset", fileName: "robots.txt", source: robots });
      if (site) {
        const lastmod = new Date().toISOString().slice(0, 10);
        const sitemap =
          `<?xml version="1.0" encoding="UTF-8"?>\n` +
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
          `  <url>\n    <loc>${site}/</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>1.0</priority>\n  </url>\n` +
          `</urlset>\n`;
        this.emitFile({ type: "asset", fileName: "sitemap.xml", source: sitemap });
      }
    },
  };
}
