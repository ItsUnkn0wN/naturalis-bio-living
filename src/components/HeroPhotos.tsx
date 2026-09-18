import { useEffect, useRef, useState } from "react";

type HeroPhoto = {
  src: string;
  alt: string;
};

const SPEED_PX_PER_SEC = 32;

export function HeroPhotos({ photos }: { photos: HeroPhoto[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const [active, setActive] = useState(0);
  const slides = [...photos, ...photos];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const stepWidth = () => {
      const first = track.firstElementChild as HTMLElement | null;
      if (!first) return 0;
      const gap = Number.parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap) || 0;
      return first.getBoundingClientRect().width + gap;
    };

    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(0.048, (now - last) / 1000);
      last = now;
      const step = stepWidth();
      const loop = step * photos.length;
      if (loop > 0) {
        offsetRef.current += SPEED_PX_PER_SEC * dt;
        if (offsetRef.current >= loop) offsetRef.current -= loop;
        if (offsetRef.current < 0) offsetRef.current += loop;
        track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
        const next = Math.floor((offsetRef.current + step * 0.45) / step) % photos.length;
        setActive((prev) => (prev === next ? prev : next));
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [photos.length]);

  const jumpTo = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const first = track.firstElementChild as HTMLElement | null;
    if (!first) return;
    const gap = Number.parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap) || 0;
    const step = first.getBoundingClientRect().width + gap;
    offsetRef.current = index * step;
    track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
    setActive(index);
  };

  return (
    <div className="relative">
      <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        <div ref={trackRef} className="flex w-max gap-4 will-change-transform">
          {slides.map((photo, i) => (
            <figure
              key={`${photo.src}-${i}`}
              className="relative w-[min(88vw,22rem)] shrink-0 overflow-hidden rounded-[1.75rem] border border-white/45 bg-card/25 p-1.5 shadow-lift backdrop-blur-md sm:w-[20rem]"
            >
              <img
                src={photo.src}
                alt={i < photos.length ? photo.alt : ""}
                width={1024}
                height={1280}
                className="aspect-[4/5] w-full rounded-[1.35rem] object-cover"
                fetchPriority={i === 0 ? "high" : undefined}
                loading={i === 0 ? "eager" : "lazy"}
                draggable={false}
              />
              <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] bg-gradient-to-t from-forest-deep/15 via-transparent to-white/15 ring-1 ring-inset ring-white/35" />
            </figure>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-1" role="tablist" aria-label="Fotografije radnje">
        {photos.map((photo, i) => {
          const isActive = active === i;
          return (
            <button
              key={photo.src}
              type="button"
              role="tab"
              aria-label={photo.alt}
              aria-selected={isActive}
              onClick={() => jumpTo(i)}
              className="grid h-8 w-8 place-items-center"
            >
              <span
                className={`block h-2.5 rounded-full transition-all duration-300 ${
                  isActive ? "w-7 bg-primary" : "w-2.5 bg-primary/30 hover:bg-primary/55"
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
