import { useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { Facebook, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { t, useLang } from "@/lib/i18n";
import { STORE, fmtHours } from "@/data/products";

export function SiteFooter() {
  const { tr, lang } = useLang();
  const [email, setEmail] = useState("");

  const subscribe = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent("Naturalis – saveti iz prirode");
    const body = encodeURIComponent(`Molim vas dodajte me na listu: ${email}`);
    window.location.href = `mailto:${STORE.email}?subject=${subject}&body=${body}`;
  };

  return (
    <footer className="mt-24 border-t border-border bg-sand-deep/60">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.3fr_1fr_1.2fr]">
        <div className="min-w-0">
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">{tr(t.footer.blurb)}</p>
          <ul className="mt-5 space-y-2 text-sm">
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" /><span>{STORE.street}, {STORE.city}</span></li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 shrink-0 text-accent" /><a className="hover:underline" href={`tel:${STORE.phoneTel}`}>{STORE.phone}</a> · <a className="hover:underline" href={`tel:${STORE.mobileTel}`}>{STORE.mobile}</a></li>
            <li className="flex items-center gap-2 min-w-0"><Mail className="h-4 w-4 shrink-0 text-accent" /><a className="truncate hover:underline" href={`mailto:${STORE.email}`}>{STORE.email}</a></li>
          </ul>
          <a href={STORE.facebook} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
            <Facebook className="h-4 w-4" /> Facebook
          </a>
        </div>

        <div>
          <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">{tr(t.footer.links)}</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/proizvodi" search={(p) => p} className="hover:text-primary">{tr(t.nav.products)}</Link></li>
            <li><Link to="/" hash="bio-match" search={(p) => p} className="hover:text-primary">{tr(t.nav.quiz)}</Link></li>
            <li><Link to="/prica" search={(p) => p} className="hover:text-primary">{tr(t.nav.story)}</Link></li>
            <li><Link to="/kontakt" search={(p) => p} className="hover:text-primary">{tr(t.nav.contact)}</Link></li>
          </ul>
          <h3 className="mt-8 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">{tr(t.contact.hours)}</h3>
          <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
            <li>{t.days[lang][0]} – {t.days[lang][4]}: <span className="text-foreground">{fmtHours(STORE.hours[0], "")}</span></li>
            <li>{t.days[lang][5]}: <span className="text-foreground">{fmtHours(STORE.hours[5], "")}</span></li>
            <li>{t.days[lang][6]}: <span className="text-foreground">{tr(t.contact.closed)}</span></li>
          </ul>
        </div>

        <div>
          <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">{tr(t.footer.tips)}</h3>
          <p className="mt-4 text-sm text-muted-foreground">{tr(t.footer.tipsSub)}</p>
          <form onSubmit={subscribe} className="mt-4 flex gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={tr(t.footer.emailPh)}
              className="min-w-0 flex-1 rounded-full border border-input bg-card px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
            <button type="submit" className="shrink-0 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-forest-deep">
              {tr(t.footer.subscribe)}
            </button>
          </form>
          <div className="mt-8 rounded-2xl border border-border bg-card/60 p-4 text-xs leading-relaxed text-muted-foreground">
            <p className="font-medium text-foreground">{tr(t.footer.legal)}</p>
            <p>MB {STORE.mb} · PIB {STORE.pib}</p>
            <p>{tr(t.story.owner)}: {STORE.owner} · {STORE.since}–</p>
          </div>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Naturalis Mali Iđoš. {tr(t.footer.rights)}
      </div>
    </footer>
  );
}
