import { Star } from "lucide-react";
import { t, useLang } from "@/lib/i18n";

const reviews = [
  { name: "Atila H***", quote: "A legjobb bio bolt Rengeteg áruval Ajánlom mindenkinek." },
  { name: "Béla B***", quote: "Nagyon jól felszerelt üzlet, kitűnő kiszolgálás!" },
  { name: "Zsolt R***", quote: "Legjobb!! Csak ajánlani tudom mindenkinek!" },
  { name: "Robert ***", quote: "Ellátott szaküzlet, biobolt, érdemes benézni!" },
] as const;

export function ReviewsMarquee() {
  const { tr } = useLang();
  const loop = [...reviews, ...reviews];

  return (
    <section aria-labelledby="reviews-title" className="overflow-hidden py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <span className="eyebrow">{tr(t.reviews.eyebrow)}</span>
        <h2 id="reviews-title" className="mt-3 font-display text-3xl font-medium sm:text-4xl">{tr(t.reviews.title)}</h2>
      </div>
      <div className="relative mt-8 overflow-hidden" aria-label={tr(t.reviews.ariaLabel)}>
        <div className="review-marquee-track flex w-max gap-4 px-4 sm:px-6">
          {loop.map((review, index) => (
            <article key={`${review.name}-${index}`} className="glass w-[min(19rem,78vw)] shrink-0 rounded-3xl p-5 shadow-soft transition-transform hover:-translate-y-1">
              <div className="flex items-center gap-1 text-sun" aria-label="5 stars">
                {Array.from({ length: 5 }).map((_, starIndex) => <Star key={starIndex} className="h-3.5 w-3.5 fill-current" aria-hidden="true" />)}
              </div>
              <p className="mt-4 min-h-16 text-sm leading-relaxed text-foreground/90">&quot;{review.quote}&quot;</p>
              <p className="mt-4 text-sm font-semibold text-primary">{review.name}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
