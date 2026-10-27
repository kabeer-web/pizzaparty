# Pizza Party - Baldia, Karachi

Restaurant website with a WhatsApp ordering cart. React + Vite + Tailwind CSS.
Built by **BeerFlow Technologies**.

## Run
    npm install
    npm run dev        # local preview
    npm run build      # production build -> dist/
    npm test           # menu, deals, cart and WhatsApp tests (no extra dependencies)

## Where to edit things
| What | File |
|------|------|
| Menu, sizes, flavours, deals, prices (single source of truth) | `src/data/menu.js` |
| Address, phone numbers, opening hours, social links, coordinates | `src/config.js` |
| Developer credit (BeerFlow) | `src/config.js` (BUILDER_*) and `src/components/Footer.jsx` |
| SEO (JSON-LD, sitemap, robots, canonical) | `plugins/seo.js` + `index.html` |

Phone numbers are written in local format (`0300-3718090`, `0312-2280406`); the WhatsApp (`wa.me`) and `tel:` formats
are derived automatically. The default WhatsApp number for every button and for the order form is
`PRIMARY_WHATSAPP_DISPLAY` in `src/config.js` (currently `0312-2280406` -> `https://wa.me/923122280406`).

## Deploy
The site address defaults to `https://pizzaparty.vercel.app` (`SITE_URL` in `src/config.js`), so canonical/Open Graph URLs,
JSON-LD, `sitemap.xml` and `robots.txt` are correct without any setup.
1. Push this folder to GitHub and import it in Vercel (Framework: Vite, build `npm run build`, output `dist`).
   Or from a terminal: `npm i -g vercel`, then `vercel --prod`.
2. If you later move to a custom domain, set `VITE_SITE_URL=https://your-domain.com` in the Vercel project settings and redeploy.
3. Add the site in Google Search Console, verify ownership, submit `https://pizzaparty.vercel.app/sitemap.xml`.
4. Link the website from the Google Business Profile (if the shop has one).

## Menu rules (src/data/menu.js)
- Deals shown: 01-07, 10, 11, 13. Deals 08, 09 and 12 were withdrawn; numbers are never reused or renumbered.
- Deal prices are fixed menu prices and are never calculated from the items.
- Flavours: Tikka, Fajita, Tandoori, Malai Boti, Afghani Boti, Creamy Mayo Pizza Special, Crown Pizza.
- Everything (cards, builder, cart, WhatsApp text, SEO, JSON-LD, meta counts) reads from this one file.

## Not filled in on purpose (needs the owner's confirmation)
Opening hours (`openingHours`), map coordinates (`geo`) and social profiles (`socialLinks`) in `src/config.js`.
Once set, they appear in the structured data automatically.
