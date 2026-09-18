import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Star } from "lucide-react";
import { t, useLang } from "@/lib/i18n";

const reviews = [
  { name: "Atila H***", quote: "A legjobb bio bolt Rengeteg áruval Ajánlom mindenkinek." },
  { name: "Béla B***", quote: "Nagyon jól felszerelt üzlet, kitűnő kiszolgálás!" },
  { name: "Zsolt R***", quote: "Legjobb!! Csak ajánlani tudom mindenkinek!" },
  { name: "Robert L***", quote: "Ellátott szaküzlet, biobolt, érdemes benézni!" },
] as const;

const REVIEW_SET_COUNT = 4;

export function ReviewsMarquee() {
  const { tr } = useLang();
  const setRef = useRef<HTMLDivElement>(null);
  const [setWidth, setSetWidth] = useState(0);

  useEffect(() => {
    const element = setRef.current;
    if (!element) return;
    const measure = () => setSetWidth(element.getBoundingClientRect().width);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const trackStyle = { "--review-set-width": `${setWidth}px` } as CSSProperties;

  return (
    <section aria-labelledby="reviews-title" className="overflow-hidden py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <span className="eyebrow">{tr(t.reviews.eyebrow)}</span>
        <h2 id="reviews-title" className="mt-3 font-display text-3xl font-medium sm:text-4xl">{tr(t.reviews.title)}</h2>
      </div>
      <div className="relative mt-8 overflow-hidden" aria-label={tr(t.reviews.ariaLabel)}>
        <div className="review-marquee-track flex w-max" data-review-set-count={REVIEW_SET_COUNT} style={trackStyle}>
          {Array.from({ length: REVIEW_SET_COUNT }, (_, setIndex) => (
            <div
              key={setIndex}
              ref={setIndex === 0 ? setRef : undefined}
              className="flex shrink-0 gap-4 pr-4 pl-4 sm:pl-6 sm:pr-6"
              aria-hidden={setIndex === 1}
            >
              {reviews.map((review) => (
                <article key={`${setIndex}-${review.name}`} className="glass w-[min(19rem,78vw)] shrink-0 rounded-3xl p-5 shadow-soft transition-transform hover:-translate-y-1">
                  <div className="flex items-center gap-1 text-sun" aria-label="5 stars">
                    {Array.from({ length: 5 }).map((_, starIndex) => <Star key={starIndex} className="h-3.5 w-3.5 fill-current" aria-hidden="true" />)}
                  </div>
                  <p className="mt-4 min-h-16 text-sm leading-relaxed text-foreground/90">&quot;{review.quote}&quot;</p>
                  <p className="mt-4 text-sm font-semibold text-primary">{review.name}</p>
                </article>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
