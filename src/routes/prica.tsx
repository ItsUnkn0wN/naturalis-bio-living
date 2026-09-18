import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Handshake, Leaf, Search } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { StoryCounters } from "@/components/StoryCounters";
import { STORE } from "@/data/products";
import { t, useLang, langFromSearch } from "@/lib/i18n";
import shopSign from "@/assets/shop-sign.webp.asset.json";
import shopShelves from "@/assets/shop-shelves.webp.asset.json";
import shopCounter from "@/assets/shop-counter.webp.asset.json";
import shopCollage from "@/assets/shop-logo-collage.jpg.asset.json";

export const Route = createFileRoute("/prica")({
  head: ({ match }) => {
    const l = langFromSearch(match.search);
    return {
      meta: [
        { title: t.seo.story.title[l] },
        { name: "description", content: t.seo.story.desc[l] },
        { property: "og:title", content: t.seo.story.title[l] },
        { property: "og:description", content: t.seo.story.desc[l] },
      ],
    };
  },
  component: StoryPage,
});

function StoryPage() {
  const { tr } = useLang();
  const values = [
    { icon: Search, title: t.story.v1t, text: t.story.v1 },
    { icon: Leaf, title: t.story.v2t, text: t.story.v2 },
    { icon: Handshake, title: t.story.v3t, text: t.story.v3 },
  ];
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
      <div className="grid items-start gap-10 lg:grid-cols-[1fr_0.9fr]">
        <Reveal>
          <span className="eyebrow">{tr(t.story.eyebrow)}</span>
          <h1 className="mt-3 font-display text-4xl font-medium leading-tight sm:text-5xl">{tr(t.story.title)}</h1>
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-foreground/80">
            <p>{tr(t.story.p1)}</p>
            <p>{tr(t.story.p2)}</p>
            <p className="font-display text-xl italic text-forest-deep">{tr(t.story.p3)}</p>
          </div>
          <div className="mt-8 flex items-center gap-4 rounded-3xl border border-border bg-card p-4 shadow-soft">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-sun font-display text-xl text-forest-deep">RL</span>
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">{tr(t.story.owner)}</p>
              <p className="truncate font-semibold">{STORE.owner}</p>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="grid grid-cols-2 gap-3">
          <img src={shopSign.url} alt="Tabla Naturalis ispred radnje" width={784} height={1045} loading="lazy" className="row-span-2 h-full w-full rounded-3xl object-cover shadow-soft" />
          <img src={shopCounter.url} alt="Pult sa teglama bilja" width={784} height={588} loading="lazy" className="aspect-[4/3] w-full rounded-3xl object-cover shadow-soft" />
          <img src={shopShelves.url} alt="Police sa uljima i čajevima" width={784} height={588} loading="lazy" className="aspect-[4/3] w-full rounded-3xl object-cover shadow-soft" />
        </Reveal>
      </div>

      <Reveal className="mt-16"><StoryCounters /></Reveal>

      <section className="mt-20">
        <Reveal>
          <h2 className="font-display text-3xl font-medium sm:text-4xl">{tr(t.story.values)}</h2>
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {values.map((v, i) => (
            <Reveal key={i} delay={i * 0.07}>
              <div className="h-full rounded-3xl border border-border bg-card p-6 shadow-soft">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-secondary text-primary"><v.icon className="h-5 w-5" /></span>
                <h3 className="mt-4 font-display text-xl">{tr(v.title)}</h3>
                <p className="mt-2 text-foreground/70">{tr(v.text)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <Reveal>
          <h2 className="font-display text-3xl font-medium sm:text-4xl">{tr(t.story.gallery)}</h2>
          <img src={shopCollage.url} alt="Naturalis logo i unutrašnjost radnje" width={1080} height={1030} loading="lazy" className="mt-6 w-full rounded-[2rem] object-cover shadow-lift" />
        </Reveal>
        <Reveal className="mt-10 text-center">
          <Link to="/kontakt" search={(p) => p} className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 font-semibold text-primary-foreground shadow-lift">
            {tr(t.nav.contact)} <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
