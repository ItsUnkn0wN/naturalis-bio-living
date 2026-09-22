import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { STORE } from "@/data/products";
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
  return <span ref={ref}>{v}{suffix}</span>;
}

export function StoryCounters() {
  const { tr } = useLang();
  const years = new Date().getFullYear() - STORE.since;
  const items = [
    { value: <Counter to={years} suffix="+" />, label: tr(t.story.years) },
  ];
  return (
    <dl className="grid max-w-[18rem] grid-cols-1 gap-4">
      {items.map((it, i) => (
        <div key={i} className="rounded-3xl border border-border bg-card p-5 text-center shadow-soft">
          <dt className="order-2 mt-1 text-xs text-muted-foreground">{it.label}</dt>
          <dd className="font-display text-4xl font-medium text-primary">{it.value}</dd>
        </div>
      ))}
    </dl>
  );
}
