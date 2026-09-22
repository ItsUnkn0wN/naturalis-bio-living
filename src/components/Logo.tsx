import { cn } from "@/lib/utils";

/** Hand-lettered "Naturalis" wordmark with the rising sun from the shop sign. */
export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)} aria-label="Naturalis">
      <svg viewBox="0 0 64 64" className="h-9 w-9 shrink-0" aria-hidden="true">
        <defs>
          <clipPath id="naturalis-sun-horizon">
            <path d="M0 0H64V37C47 31 20 34 4 43L0 45Z" />
          </clipPath>
        </defs>
        <g clipPath="url(#naturalis-sun-horizon)">
          <g className="origin-[32px_40px] animate-[spin_40s_linear_infinite] motion-reduce:animate-none" style={{ transformBox: "fill-box", transformOrigin: "center 70%" }}>
            {Array.from({ length: 18 }).map((_, i) => {
              const a = (i * 20) * (Math.PI / 180);
              const x1 = Number((32 + Math.cos(a) * 18).toFixed(5));
              const y1 = Number((40 + Math.sin(a) * 18).toFixed(5));
              const x2 = Number((32 + Math.cos(a) * 27).toFixed(5));
              const y2 = Number((40 + Math.sin(a) * 27).toFixed(5));
              return (
                <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="3.2" strokeLinecap="round" className="stroke-sun" />
              );
            })}
          </g>
        </g>
        <path d="M18 40a14 14 0 0 1 28 0z" className="fill-sun" />
        <path d="M6 44c14-8 38-10 52-4" fill="none" strokeWidth="5" strokeLinecap="round" className="stroke-primary" />
      </svg>
      {!compact && (
        <span className="font-display text-2xl font-semibold italic leading-none tracking-tight text-primary">
          Naturalis
        </span>
      )}
    </span>
  );
}
