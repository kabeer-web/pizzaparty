// ---------------------------------------------------------------------------
// Pizza Party - business settings. Edit here; everything else reads from this.
// Website built by BeerFlow Technologies.
// ---------------------------------------------------------------------------

export const BUSINESS = {
  name: "Pizza Party",
  tagline: "One Bite, Pure Happiness",
  slogan: "Slice \u2022 Smile \u2022 Repeat",
  cuisine: "Pizza",
  address: {
    street: "Sector Block A, Near Meezan Bank",
    area: "Baldia",
    city: "Karachi",
    region: "Sindh",
    country: "Pakistan",
    countryCode: "PK",
  },
  // Local format. International (wa.me / tel:) versions are derived below.
  phones: ["0300-3718090", "0312-2280406"],
  // Fill these in ONLY once the owner confirms them. Left empty on purpose.
  openingHours: [], // e.g. ["Mo-Su 12:00-23:00"] (schema.org format)
  socialLinks: [], // verified profile URLs only
  geo: null, // { latitude: 24.xxxx, longitude: 66.xxxx } once verified
};

// "0300-3718090" -> "923003718090" (digits only, country code 92, no leading 0)
export function toInternational(local) {
  const digits = String(local).replace(/\D/g, "");
  if (digits.startsWith("92")) return digits;
  return "92" + digits.replace(/^0+/, "");
}

export const PHONES = BUSINESS.phones.map((display) => {
  const intl = toInternational(display);
  return { display, intl, tel: `+${intl}` };
});

// Number that WhatsApp buttons, the order form and the QR/links use by default.
// Must be one of BUSINESS.phones. International form is derived automatically:
// 0312-2280406 -> 923122280406 (wa.me/923122280406).
export const PRIMARY_WHATSAPP_DISPLAY = "0312-2280406";
export const PRIMARY_PHONE = PHONES.find((p) => p.display === PRIMARY_WHATSAPP_DISPLAY) ?? PHONES[0];
export const PRIMARY_PHONE_INDEX = Math.max(0, PHONES.indexOf(PRIMARY_PHONE));

// Public website address (used for canonical URL, Open Graph, sitemap).
export const SITE_URL = "https://pizzaparty.vercel.app";

export const FULL_ADDRESS = `${BUSINESS.address.street}, ${BUSINESS.address.area}, ${BUSINESS.address.city}, ${BUSINESS.address.country}`;

// A Google Maps *search* link (no invented coordinates or listing ID).
export const MAPS_SEARCH_URL =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent(`${BUSINESS.name}, ${FULL_ADDRESS}`);

// ---- Developer credit (shown in the footer) ----
export const BUILDER_NAME = "BeerFlow Technologies";
export const BUILDER_TAGLINE = "CUSTOM POS & SOFTWARE";
export const BUILDER_WHATSAPP = "923222301920";
export const BUILDER_EMAIL = "beerflowtechnologies@gmail.com";
