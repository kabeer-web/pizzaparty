import { MapPin, MessageCircle, Phone } from "lucide-react";
import { BUSINESS, MAPS_SEARCH_URL, PHONES } from "../config.js";
import { buildWhatsAppUrl, GENERAL_MESSAGE } from "../utils/whatsapp.js";
import { Reveal } from "../hooks/parallax.jsx";
import { SectionHeading, btnInk, btnLight, btnRed } from "./ui.jsx";

export default function Location() {
  const a = BUSINESS.address;
  return (
    <section id="location" className="bg-white py-14 sm:py-20" aria-labelledby="location-title">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading id="location-title" sub="Visit us, call us or message us on WhatsApp.">
          Find us in Baldia, Karachi
        </SectionHeading>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Reveal className="pop-card rounded-3xl bg-cream p-6 sm:p-8">
            <h3 className="flex items-center gap-2 font-display text-2xl">
              <MapPin aria-hidden="true" /> Address
            </h3>
            <address className="mt-4 text-xl font-bold not-italic leading-snug">
              {BUSINESS.name}
              <br />
              {a.street}
              <br />
              {a.area}, {a.city}, {a.country}
            </address>
            <a href={MAPS_SEARCH_URL} target="_blank" rel="noopener noreferrer" className={`${btnLight} mt-6`}>
              <MapPin size={18} aria-hidden="true" /> Search on Google Maps
            </a>
          </Reveal>

          <Reveal delay={120} id="contact" className="pop-card rounded-3xl bg-gold p-6 sm:p-8">
            <h3 className="font-display text-2xl">Contact and WhatsApp ordering</h3>
            <ul className="mt-4 space-y-4">
              {PHONES.map((p) => (
                <li key={p.intl} className="rounded-2xl bg-white p-4">
                  <p className="font-display text-2xl">{p.display}</p>
                  <div className="mt-3 flex flex-wrap gap-3">
                    <a href={`tel:${p.tel}`} className={`${btnInk} !px-5`} aria-label={`Call ${p.display}`}>
                      <Phone size={18} aria-hidden="true" /> Call
                    </a>
                    <a
                      href={buildWhatsAppUrl(p.intl, GENERAL_MESSAGE)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${btnRed} !px-5`}
                      aria-label={`WhatsApp ${p.display}`}
                    >
                      <MessageCircle size={18} aria-hidden="true" /> WhatsApp
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
