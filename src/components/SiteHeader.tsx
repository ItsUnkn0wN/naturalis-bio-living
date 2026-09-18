import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, Phone, X } from "lucide-react";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { t, useLang } from "@/lib/i18n";
import { STORE } from "@/data/products";
import { cn } from "@/lib/utils";

const links = [
  { to: "/proizvodi", label: t.nav.products },
  { to: "/prica", label: t.nav.story },
  { to: "/kontakt", label: t.nav.contact },
] as const;

export function SiteHeader() {
  const { tr } = useLang();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 glass">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:px-6">
        <Link to="/" search={(p) => p} className="flex min-w-0 items-center" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              search={(p) => p}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "bg-secondary text-foreground" }}
            >
              {tr(l.label)}
            </Link>
          ))}
          <Link
            to="/"
            hash="bio-match"
            search={(p) => p}
            className="rounded-full px-3.5 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground"
          >
            {tr(t.nav.quiz)}
          </Link>
          <LanguageSwitcher className="ml-2" />
          <a
            href={`tel:${STORE.phoneTel}`}
            className="ml-2 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground shadow-soft transition-transform hover:-translate-y-0.5"
          >
            <Phone className="h-4 w-4" /> {STORE.phone}
          </a>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <a
            href={`tel:${STORE.phoneTel}`}
            aria-label={tr(t.nav.call)}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground shadow-soft"
          >
            <Phone className="h-4 w-4" />
          </a>
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border bg-card/70"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div className={cn("md:hidden overflow-hidden transition-[max-height] duration-300", open ? "max-h-96" : "max-h-0")}>
        <nav className="flex flex-col gap-1 border-t border-border px-4 pb-4 pt-3" aria-label="Mobile">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              search={(p) => p}
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-3 text-base font-medium hover:bg-secondary"
              activeProps={{ className: "bg-secondary" }}
            >
              {tr(l.label)}
            </Link>
          ))}
          <Link to="/" hash="bio-match" search={(p) => p} onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 text-base font-medium hover:bg-secondary">
            {tr(t.nav.quiz)}
          </Link>
          <div className="mt-2 flex items-center justify-between px-3">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">SR · HU · EN</span>
            <LanguageSwitcher />
          </div>
        </nav>
      </div>
    </header>
  );
}
