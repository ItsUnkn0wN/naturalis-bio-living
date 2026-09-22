import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { STORE, fmtHours } from "@/data/products";
import { t, useLang } from "@/lib/i18n";
import { belgradeNow, getStoreStatus, type StoreStatus } from "@/lib/hours";
import { cn } from "@/lib/utils";

const formatHour = (hour: number) => `${String(hour).padStart(2, "0")}:00`;

export function OpeningHours({
  className,
  large = false,
}: {
  className?: string;
  large?: boolean;
}) {
  const { tr, lang } = useLang();
  const [today, setToday] = useState<number | null>(null);
  const [status, setStatus] = useState<StoreStatus | null>(null);

  useEffect(() => {
    const updateStatus = () => {
      setToday(belgradeNow().day);
      setStatus(getStoreStatus());
    };

    updateStatus();
    const intervalId = window.setInterval(updateStatus, 60_000);
    return () => window.clearInterval(intervalId);
  }, []);

  const statusLabel =
    status?.kind === "open"
      ? tr(t.hero.openNow)
      : status?.kind === "before-open"
        ? `${tr(t.hero.opensLater)} ${formatHour(status.opensAt)}`
        : tr(t.hero.closedNow);

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card shadow-soft",
        large ? "p-7 sm:p-9" : "p-5",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className={cn("flex items-center gap-2 font-display", large ? "text-2xl" : "text-lg")}>
          <Clock className="h-4 w-4 text-accent" /> {tr(t.contact.hours)}
        </h3>
        {status && (
          <span
            className={cn(
              "rounded-full px-2.5 py-1 text-xs font-semibold",
              status.kind === "open"
                ? "bg-secondary text-secondary-foreground"
                : "bg-muted text-muted-foreground",
            )}
          >
            {statusLabel}
          </span>
        )}
      </div>
      <ul className={cn("mt-4 divide-y divide-border", large ? "text-base" : "text-sm")}>
        {STORE.hours.map((hours, index) => (
          <li
            key={index}
            className={cn(
              cn("flex items-center justify-between", large ? "py-3" : "py-2"),
              today === index && "font-semibold text-primary",
            )}
          >
            <span>
              {t.days[lang][index]}
              {today === index && (
                <span className="ml-2 rounded-full bg-sun/30 px-2 py-0.5 text-[10px] uppercase tracking-wider">
                  {tr(t.contact.today)}
                </span>
              )}
            </span>
            <span className={cn(!hours && "text-muted-foreground")}>
              {fmtHours(hours, tr(t.contact.closed))}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
