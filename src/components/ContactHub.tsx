import { useState, type FormEvent } from "react";
import { Mail, MapPin, Navigation, Phone, Smartphone } from "lucide-react";
import { OpeningHours } from "./OpeningHours";
import { STORE } from "@/data/products";
import { t, useLang } from "@/lib/i18n";

export function ContactHub({ compact = false }: { compact?: boolean }) {
  const { tr } = useLang();
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");

  const send = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Naturalis – ${tr(t.contact.formTitle)} (${name})`);
    const body = encodeURIComponent(`${msg}\n\n— ${name}`);
    window.location.href = `mailto:${STORE.email}?subject=${subject}&body=${body}`;
  };

  const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(STORE.mapsQuery)}`;
  const bbox = `${STORE.lng - 0.006},${STORE.lat - 0.003},${STORE.lng + 0.006},${STORE.lat + 0.003}`;
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${STORE.lat},${STORE.lng}`;

  const action = "flex items-center gap-3 rounded-2xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:shadow-soft";

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
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground"><Phone className="h-5 w-5" /></span>
            <span className="min-w-0"><span className="block text-xs text-muted-foreground">{tr(t.contact.call)}</span><span className="block font-semibold">{STORE.phone}</span></span>
          </a>
          <a href={`tel:${STORE.mobileTel}`} className={action}>
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-secondary text-primary"><Smartphone className="h-5 w-5" /></span>
            <span className="min-w-0"><span className="block text-xs text-muted-foreground">{tr(t.contact.mobile)}</span><span className="block font-semibold">{STORE.mobile}</span></span>
          </a>
          <a href={`mailto:${STORE.email}`} className={action}>
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-secondary text-primary"><Mail className="h-5 w-5" /></span>
            <span className="min-w-0"><span className="block text-xs text-muted-foreground">{tr(t.contact.email)}</span><span className="block truncate text-sm font-semibold">{STORE.email}</span></span>
          </a>
          <a href={directions} target="_blank" rel="noreferrer" className={action}>
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-secondary text-primary"><Navigation className="h-5 w-5" /></span>
            <span className="min-w-0"><span className="block text-xs text-muted-foreground">{tr(t.contact.directions)}</span><span className="block truncate font-semibold"><MapPin className="mr-1 inline h-3.5 w-3.5" />{STORE.street}</span></span>
          </a>
        </div>
      </div>

      <div className="space-y-6">
        <OpeningHours />
        {!compact && (
          <form onSubmit={send} className="rounded-3xl border border-border bg-card p-5 shadow-soft">
            <h3 className="font-display text-lg">{tr(t.contact.formTitle)}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{tr(t.contact.formSub)}</p>
            <div className="mt-4 space-y-3">
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={tr(t.contact.name)}
                className="w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-ring"
              />
              <textarea
                required
                rows={4}
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                placeholder={tr(t.contact.message)}
                className="w-full resize-none rounded-2xl border border-input bg-background px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-ring"
              />
              <button type="submit" className="w-full rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
                {tr(t.contact.send)}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
