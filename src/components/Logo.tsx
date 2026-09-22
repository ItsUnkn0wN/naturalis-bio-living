import { cn } from "@/lib/utils";

/** Hand-lettered "Naturalis" wordmark with a sun rising above the horizon. */
export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)} aria-label="Naturalis">
      <svg viewBox="0 0 64 64" className="h-9 w-9 shrink-0" aria-hidden="true">
        <defs>
          <linearGradient id="naturalis-sun-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--sun)" />
            <stop offset="1" stopColor="var(--terracotta)" />
          </linearGradient>
          <radialGradient id="naturalis-sun-glow">
            <stop offset="0" stopColor="var(--sun)" stopOpacity="0.3" />
            <stop offset="1" stopColor="var(--sun)" stopOpacity="0" />
          </radialGradient>
          <clipPath id="naturalis-sun-horizon">
            <rect x="0" y="0" width="64" height="42" />
          </clipPath>
        </defs>
        <g clipPath="url(#naturalis-sun-horizon)">
          <circle cx="32" cy="29" r="19" fill="url(#naturalis-sun-glow)" />
          <g className="origin-[32px_29px] animate-[spin_16s_linear_infinite] motion-reduce:animate-none">
            {Array.from({ length: 12 }).map((_, i) => {
              const a = (i * 30) * (Math.PI / 180);
              const x1 = Number((32 + Math.cos(a) * 14.5).toFixed(5));
              const y1 = Number((29 + Math.sin(a) * 14.5).toFixed(5));
              const x2 = Number((32 + Math.cos(a) * 18.5).toFixed(5));
              const y2 = Number((29 + Math.sin(a) * 18.5).toFixed(5));
              return (
                <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="2.3" strokeLinecap="round" className="stroke-sun" />
              );
            })}
          </g>
          <circle cx="32" cy="29" r="10" fill="url(#naturalis-sun-fill)" />
          <path d="M25 27.5c3.5-3 10.5-3.5 14.5-.5" fill="none" stroke="var(--sand)" strokeWidth="1.4" strokeLinecap="round" opacity="0.45" />
        </g>
        <path d="M6 43c10-1.5 17-1.5 26 0s18 1.5 26 0" fill="none" strokeWidth="3.8" strokeLinecap="round" className="stroke-primary" />
        <path d="M18 48c5-.8 9-.8 14 0s9 .8 14 0" fill="none" strokeWidth="1.5" strokeLinecap="round" className="stroke-sage" opacity="0.75" />
      </svg>
      {!compact && (
        <span className="font-display text-2xl font-semibold italic leading-none tracking-tight text-primary">
          Naturalis
        </span>
      )}
    </span>
  );
}
