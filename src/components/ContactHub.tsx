import { Mail, MapPin, Navigation, Phone } from "lucide-react";
import { OpeningHours } from "./OpeningHours";
import { STORE } from "@/data/products";
import { t, useLang } from "@/lib/i18n";

export function ContactHub() {
  const { tr } = useLang();

  const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(STORE.mapsQuery)}`;
  const bbox = `${STORE.lng - 0.006},${STORE.lat - 0.003},${STORE.lng + 0.006},${STORE.lat + 0.003}`;
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${STORE.lat},${STORE.lng}`;

  const action =
    "flex items-center gap-3 rounded-2xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:shadow-soft";

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
      <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
        <iframe
          title="Naturalis – Zanatlijska 10, Mali Iđoš"
          src={mapSrc}
          className="h-64 w-full sm:h-80"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div className="grid gap-3 p-4 sm:grid-cols-2">
          <a href={`tel:${STORE.phoneTel}`} className={action}>
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
              <Phone className="h-5 w-5" />
            </span>
            <span className="min-w-0">
              <span className="block text-xs text-muted-foreground">{tr(t.contact.call)}</span>
              <span className="block font-semibold">{STORE.phone}</span>
            </span>
          </a>
          <a href={`mailto:${STORE.email}`} className={action}>
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-secondary text-primary">
              <Mail className="h-5 w-5" />
            </span>
            <span className="min-w-0">
              <span className="block text-xs text-muted-foreground">{tr(t.contact.email)}</span>
              <span className="block truncate text-sm font-semibold">{STORE.email}</span>
            </span>
          </a>
          <a href={directions} target="_blank" rel="noreferrer" className={action}>
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-secondary text-primary">
              <Navigation className="h-5 w-5" />
            </span>
            <span className="min-w-0">
              <span className="block text-xs text-muted-foreground">
                {tr(t.contact.directions)}
              </span>
              <span className="block truncate font-semibold">
                <MapPin className="mr-1 inline h-3.5 w-3.5" />
                {STORE.street}
              </span>
            </span>
          </a>
        </div>
      </div>

      <div>
        <OpeningHours className="h-full" large />
      </div>
    </div>
  );
}
