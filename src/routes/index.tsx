import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, Leaf, Phone } from "lucide-react";
import { BioMatchQuiz } from "@/components/BioMatchQuiz";
import { ProductGrid } from "@/components/ProductGrid";
import { Reveal } from "@/components/Reveal";
import { StoryCounters } from "@/components/StoryCounters";
import { OpeningHours } from "@/components/OpeningHours";
import { ReviewsMarquee } from "@/components/ReviewsMarquee";
import { STORE, categories, featuredProducts } from "@/data/products";
import { t, useLang, langFromSearch } from "@/lib/i18n";
import { getStoreStatus, type StoreStatus } from "@/lib/hours";
const shopShelves = { url: "/images/shop-shelves.webp" };
const homepageCategories = categories.filter((category) => category.id !== "eco");

export const Route = createFileRoute("/")({
  head: ({ match }) => {
    const l = langFromSearch(match.search);
    return {
      meta: [
        { title: t.seo.home.title[l] },
        { name: "description", content: t.seo.home.desc[l] },
        { property: "og:title", content: t.seo.home.title[l] },
        { property: "og:description", content: t.seo.home.desc[l] },
      ],
    };
  },
  component: Index,
});

const leaves = Array.from({ length: 10 }).map((_, i) => ({
  left: `${8 + ((i * 37) % 84)}%`,
  bottom: `${-10 + ((i * 23) % 40)}%`,
  delay: `${(i * 1.7) % 12}s`,
  size: 14 + ((i * 5) % 14),
}));

const heroPhotos = [
  { src: "/images/hero-storefront.jpg", alt: "Naturalis tabla ispred radnje" },
  { src: "/images/hero-entrance.png", alt: "Ulaz u prodavnicu Naturalis" },
  { src: "/images/hero-interior.png", alt: "Enterijer prodavnice Naturalis" },
];

function HeroCarousel({ photos }: { photos: typeof heroPhotos }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % photos.length);
    }, 2800);
    return () => window.clearInterval(id);
  }, [photos.length]);

  return (
    <>
      <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-card/70 bg-card/35 shadow-lift backdrop-blur-sm">
        {photos.map((photo, i) => (
          <img
            key={photo.src}
            src={photo.src}
            alt={i === index ? photo.alt : ""}
            width={1024}
            height={1280}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
            fetchPriority={i === 0 ? "high" : undefined}
            loading={i === 0 ? "eager" : "lazy"}
          />
        ))}
        <div className="pointer-events-none absolute inset-0 border border-card/40 bg-gradient-to-t from-forest-deep/15 via-transparent to-card/10" />
      </div>
      <div
        className="mt-4 flex items-center justify-center gap-1"
        role="tablist"
        aria-label="Fotografije radnje"
      >
        {photos.map((photo, i) => {
          const isActive = index === i;
          return (
            <button
              key={photo.src}
              type="button"
              role="tab"
              aria-label={photo.alt}
              aria-selected={isActive}
              onClick={() => setIndex(i)}
              className="grid h-8 w-8 place-items-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
    </>
  );
}

function Index() {
  const { tr } = useLang();
  const [status, setStatus] = useState<StoreStatus | null>(null);

  useEffect(() => {
    const updateStatus = () => setStatus(getStoreStatus());
    updateStatus();
    const intervalId = window.setInterval(updateStatus, 60_000);
    return () => window.clearInterval(intervalId);
  }, []);

  const statusText =
    status?.kind === "open"
      ? tr(t.hero.openNow)
      : status?.kind === "before-open"
        ? `${tr(t.hero.opensLater)} ${String(status.opensAt).padStart(2, "0")}:00`
        : tr(t.hero.closedNow);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
          {leaves.map((l, i) => (
            <Leaf
              key={i}
              className="absolute text-sage/50"
              style={{
                left: l.left,
                bottom: l.bottom,
                width: l.size,
                height: l.size,
                transform: `rotate(${i * 31}deg)`,
              }}
            />
          ))}
        </div>
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 pt-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-12 lg:pt-16 xl:gap-16">
          <motion.div
            data-hero-grid="fixed"
            className="min-w-0 rounded-[2rem] glass p-7 shadow-soft sm:p-10 lg:flex lg:h-[48rem] lg:min-h-0 lg:flex-col lg:justify-center lg:p-12 xl:p-14"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="font-display text-6xl font-medium leading-[1.02] text-foreground sm:text-7xl lg:text-[4.5rem] xl:text-[4.75rem]">
              {tr(t.hero.title)}
            </h1>
            <p className="mt-9 max-w-2xl text-xl leading-[1.7] text-foreground/80 sm:text-[1.35rem] lg:text-[1.25rem] lg:leading-[1.6]">
              {tr(t.hero.sub)}
            </p>
            <div className="mt-11 flex flex-wrap items-center gap-4">
              <Link
                to="/proizvodi"
                search={(p) => p}
                className="relative z-10 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-base font-semibold text-primary-foreground shadow-lift transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                {tr(t.hero.cta)} <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={`tel:${STORE.phoneTel}`}
                className="relative z-10 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-card/70 px-7 py-4 text-base font-semibold text-primary shadow-sm transition-all hover:-translate-y-0.5 hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <Phone className="h-4 w-4" /> {tr(t.hero.call)}
              </a>
            </div>
            {status && (
              <p className="mt-9 flex items-center gap-2 text-base font-medium text-primary">
                <span
                  className={`h-2 w-2 rounded-full ${status.kind === "open" ? "bg-sage animate-pulse" : "bg-muted-foreground"}`}
                />
                {statusText}
              </p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full min-w-0 max-w-md lg:max-w-none"
          >
            <HeroCarousel photos={heroPhotos} />
          </motion.div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="eyebrow">{tr(t.products.eyebrow)}</span>
            <h2 className="mt-3 font-display text-3xl font-medium sm:text-4xl">
              {tr(t.products.featuredTitle)}
            </h2>
          </div>
          <Link
            to="/proizvodi"
            search={(p) => p}
            className="inline-flex items-center gap-2 font-semibold text-primary hover:underline"
          >
            {tr(t.products.viewAll)} <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
        <div className="mt-8">
          <ProductGrid items={featuredProducts.slice(0, 6)} showFilters={false} />
        </div>
      </section>

      {/* BIO-MATCH */}
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <Reveal>
          <BioMatchQuiz />
        </Reveal>
      </section>

      <ReviewsMarquee />

      {/* CATEGORIES */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Reveal>
          <h2 className="font-display text-3xl font-medium sm:text-4xl">
            {tr(t.categories.title)}
          </h2>
          <p className="mt-4 max-w-2xl text-foreground/70">{tr(t.categories.sub)}</p>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-6">
          {homepageCategories.map((c, i) => (
            <Reveal
              key={c.id}
              delay={i * 0.05}
              className={`md:col-span-2 ${i === 3 ? "md:col-start-2" : ""} ${i === 4 ? "col-span-2 mx-auto w-1/2 sm:w-full md:col-start-4 md:mx-0 md:w-full" : ""}`}
            >
              <Link
                to="/proizvodi"
                search={(p) => p}
                className="group relative block aspect-[4/5] overflow-hidden rounded-3xl shadow-soft sm:aspect-[5/4]"
              >
                <img
                  src={c.image}
                  alt=""
                  width={816}
                  height={816}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/85 via-forest-deep/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-5">
                  <h3 className="font-display text-lg leading-tight sm:text-xl">{tr(c.label)}</h3>
                  <p className="mt-1 hidden text-xs text-white/80 sm:block">{tr(c.blurb)}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* STORY TEASER */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <div className="relative">
              <img
                src={shopShelves.url}
                alt="Police u radnji Naturalis"
                width={784}
                height={588}
                loading="lazy"
                className="w-full rounded-[2rem] object-cover shadow-lift"
              />
              <div className="absolute -bottom-6 right-4 max-w-[220px] rounded-2xl bg-sun p-4 font-display text-sm italic leading-snug text-forest-deep shadow-soft sm:right-8">
                „{tr(t.nav.tagline)}“
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <span className="eyebrow">{tr(t.story.eyebrow)}</span>
            <h2 className="mt-3 font-display text-3xl font-medium sm:text-4xl">
              {tr(t.story.title)}
            </h2>
            <p className="mt-5 leading-relaxed text-foreground/75">{tr(t.story.p1)}</p>
            <div className="mt-8">
              <StoryCounters />
            </div>
            <Link
              to="/prica"
              search={(p) => p}
              className="mt-8 inline-flex items-center gap-2 font-semibold text-primary hover:underline"
            >
              {tr(t.nav.story)} <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* VISIT */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-8 rounded-[2rem] border border-border bg-card/60 p-6 sm:p-10 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <span className="eyebrow">{tr(t.contact.eyebrow)}</span>
            <h2 className="mt-3 font-display text-3xl font-medium sm:text-4xl">
              {tr(t.contact.title)}
            </h2>
            <p className="mt-4 max-w-md text-foreground/70">{tr(t.contact.sub)}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={`tel:${STORE.phoneTel}`}
                className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 font-semibold text-accent-foreground shadow-soft"
              >
                <Phone className="h-4 w-4" /> {STORE.phone}
              </a>
              <Link
                to="/kontakt"
                search={(p) => p}
                className="inline-flex items-center gap-2 rounded-full border border-primary/30 px-5 py-3 font-semibold text-primary hover:bg-secondary"
              >
                {tr(t.contact.directions)} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <OpeningHours />
          </Reveal>
        </div>
      </section>
    </>
  );
}
