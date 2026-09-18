import { LANGS, useLang, type Lang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const names: Record<Lang, string> = { sr: "SR", hu: "HU", en: "EN" };

export function LanguageSwitcher({ className }: { className?: string }) {
  const { lang, setLang } = useLang();
  return (
    <div className={cn("inline-flex items-center rounded-full border border-border bg-card/70 p-0.5 text-xs font-semibold", className)} role="group" aria-label="Language">
      {LANGS.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={cn(
            "rounded-full px-2.5 py-1 transition-colors",
            lang === l ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
          )}
        >
          {names[l]}
        </button>
      ))}
    </div>
  );
}
