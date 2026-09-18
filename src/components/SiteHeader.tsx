import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import { t, useLang } from "@/lib/i18n";
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
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:px-6 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
        <Link to="/" search={(p) => p} className="flex min-w-0 items-center justify-self-start" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav className="hidden items-center justify-self-center md:flex" aria-label="Main">
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
        </nav>

        <div className="hidden items-center justify-self-end gap-2 md:flex">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>

        <div className="flex items-center justify-self-end gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border bg-card/70 transition-colors hover:bg-secondary"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div className={cn("overflow-hidden transition-[max-height] duration-300 md:hidden", open ? "max-h-96" : "max-h-0")}>
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
