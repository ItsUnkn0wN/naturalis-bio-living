import { cn } from "@/lib/utils";

/** Hand-lettered "Naturalis" wordmark with a sun rising above the horizon. */
export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)} aria-label="Naturalis">
      <svg viewBox="0 0 64 64" className="h-9 w-9 shrink-0" aria-hidden="true">
        <defs>
          <clipPath id="naturalis-sun-horizon">
            <rect x="0" y="0" width="64" height="42" />
          </clipPath>
        </defs>
        <g clipPath="url(#naturalis-sun-horizon)">
          <g className="origin-[32px_29px] animate-[spin_12s_linear_infinite] motion-reduce:animate-none">
            {Array.from({ length: 16 }).map((_, i) => {
              const a = (i * 22.5) * (Math.PI / 180);
              const x1 = Number((32 + Math.cos(a) * 13).toFixed(5));
              const y1 = Number((29 + Math.sin(a) * 13).toFixed(5));
              const x2 = Number((32 + Math.cos(a) * 18).toFixed(5));
              const y2 = Number((29 + Math.sin(a) * 18).toFixed(5));
              return (
                <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="2.8" strokeLinecap="round" className="stroke-sun" />
              );
            })}
          </g>
          <circle cx="32" cy="29" r="9" className="fill-sun" />
        </g>
        <path d="M7 43H57" fill="none" strokeWidth="4" strokeLinecap="round" className="stroke-primary" />
      </svg>
      {!compact && (
        <span className="font-display text-2xl font-semibold italic leading-none tracking-tight text-primary">
          Naturalis
        </span>
      )}
    </span>
  );
}
