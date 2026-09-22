import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { t, useLang } from "@/lib/i18n";

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1400;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return (
    <span ref={ref}>
      {v}
      {suffix}
    </span>
  );
}

export function StoryCounters() {
  const { tr } = useLang();
  const items = [
    { value: <Counter to={17} suffix="+" />, label: tr(t.story.years) },
    { value: <Counter to={5} />, suffix: "★", label: tr(t.story.fiveStarReviews) },
    { value: <Counter to={100} suffix="%" />, label: tr(t.story.genuineProducts) },
  ];
  return (
    <dl className="grid w-full grid-cols-3 gap-2 sm:gap-4">
      {items.map((it, i) => (
        <div
          key={i}
          className="flex min-h-32 flex-col items-center justify-center rounded-2xl border border-border bg-card px-2 py-5 text-center shadow-soft sm:min-h-40 sm:rounded-3xl sm:px-4"
        >
          <dt className="order-2 mt-2 text-xs font-medium leading-snug text-muted-foreground sm:text-sm">{it.label}</dt>
          <dd className="font-display text-3xl font-semibold text-primary sm:text-5xl">
            {it.value}{it.suffix}
          </dd>
        </div>
      ))}
    </dl>
  );
}
