import { useEffect, useState } from "react";
import { Check, ChevronDown, Cookie } from "lucide-react";

import { Button } from "@/components/ui/button";
import { t, useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const CONSENT_KEY = "naturalis-cookie-consent";

type Consent = {
  required: true;
  preferences: boolean;
};

export function CookieConsent() {
  const { tr } = useLang();
  const [visible, setVisible] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [preferences, setPreferences] = useState(true);

  useEffect(() => {
    setVisible(localStorage.getItem(CONSENT_KEY) === null);
  }, []);

  const save = (consent: Consent) => {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <aside
      aria-labelledby="cookie-consent-title"
      className="fixed bottom-2 left-2 z-50 max-h-[calc(100dvh-1rem)] w-[calc(100%-1rem)] max-w-[25rem] animate-fade-in overflow-y-auto overflow-x-hidden rounded-2xl border border-border/80 bg-card/85 shadow-lift backdrop-blur-xl sm:bottom-5 sm:left-5 sm:w-[calc(100%-2rem)]"
    >
      <div className="h-1 bg-primary" />
      <div className="p-3.5 sm:p-5">
        <div className="flex items-start gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-secondary text-primary">
            <Cookie className="h-5 w-5" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="eyebrow">{tr(t.cookies.eyebrow)}</p>
            <h2
              id="cookie-consent-title"
              className="mt-1 text-lg font-semibold leading-snug text-foreground sm:text-xl"
            >
              {tr(t.cookies.title)}
            </h2>
          </div>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {tr(t.cookies.description)}
        </p>

        <button
          type="button"
          aria-expanded={detailsOpen}
          onClick={() => setDetailsOpen((open) => !open)}
          className="mt-3 flex w-full items-center justify-between border-y border-border/70 py-2.5 text-left text-sm font-semibold text-foreground"
        >
          {tr(t.cookies.details)}
          <ChevronDown
            className={cn("h-4 w-4 transition-transform", detailsOpen && "rotate-180")}
            aria-hidden="true"
          />
        </button>

        {detailsOpen && (
          <div className="space-y-3 border-b border-border/70 py-3">
            <ConsentRow
              label={tr(t.cookies.required)}
              description={tr(t.cookies.requiredInfo)}
              checked
              disabled
              onChange={() => undefined}
            />
            <ConsentRow
              label={tr(t.cookies.preferences)}
              description={tr(t.cookies.preferencesInfo)}
              checked={preferences}
              onChange={setPreferences}
            />
          </div>
        )}

        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <Button
            className="h-auto min-h-11 rounded-full px-4 py-2.5 leading-snug whitespace-normal break-words text-center"
            onClick={() => save({ required: true, preferences: true })}
          >
            {tr(t.cookies.acceptAll)}
          </Button>
          <Button
            variant="outline"
            className="h-auto min-h-11 rounded-full bg-card/60 px-4 py-2.5 leading-snug whitespace-normal break-words text-center"
            onClick={() => save({ required: true, preferences: false })}
          >
            {tr(t.cookies.requiredOnly)}
          </Button>
        </div>

        {detailsOpen && preferences !== true && (
          <Button
            variant="ghost"
            className="mt-2 h-9 w-full rounded-full text-primary"
            onClick={() => save({ required: true, preferences })}
          >
            <Check className="h-4 w-4" aria-hidden="true" />
            {tr(t.cookies.saveSelection)}
          </Button>
        )}
      </div>
    </aside>
  );
}

function ConsentRow({
  label,
  description,
  checked,
  disabled = false,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className={cn("flex items-start gap-3", disabled ? "cursor-default" : "cursor-pointer")}>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange(event.target.checked)}
        className="mt-0.5 h-4 w-4 shrink-0 accent-primary"
      />
      <span className="min-w-0">
        <span className="block text-sm font-semibold text-foreground">{label}</span>
        <span className="block text-xs leading-relaxed text-muted-foreground">{description}</span>
      </span>
    </label>
  );
}
