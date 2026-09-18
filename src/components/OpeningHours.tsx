import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { STORE, fmtHours } from "@/data/products";
import { t, useLang } from "@/lib/i18n";
import { belgradeNow, isOpenNow } from "@/lib/hours";
import { cn } from "@/lib/utils";

export function OpeningHours({ className }: { className?: string }) {
  const { tr, lang } = useLang();
  const [today, setToday] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setToday(belgradeNow().day);
    setOpen(isOpenNow());
  }, []);

  return (
    <div className={cn("rounded-3xl border border-border bg-card p-5 shadow-soft", className)}>
      <div className="flex items-center justify-between gap-3">
        <h3 className="flex items-center gap-2 font-display text-lg"><Clock className="h-4 w-4 text-accent" /> {tr(t.contact.hours)}</h3>
        {today !== null && (
          <span className={cn("rounded-full px-2.5 py-1 text-xs font-semibold", open ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground")}>
            {open ? tr(t.hero.openNow) : tr(t.hero.closedNow)}
          </span>
        )}
      </div>
      <ul className="mt-4 divide-y divide-border text-sm">
        {STORE.hours.map((h, i) => (
          <li key={i} className={cn("flex items-center justify-between py-2", today === i && "font-semibold text-primary")}>
            <span>
              {t.days[lang][i]}
              {today === i && <span className="ml-2 rounded-full bg-sun/30 px-2 py-0.5 text-[10px] uppercase tracking-wider">{tr(t.contact.today)}</span>}
            </span>
            <span className={cn(!h && "text-muted-foreground")}>{fmtHours(h, tr(t.contact.closed))}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
