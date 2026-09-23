import { createFileRoute } from "@tanstack/react-router";
import { Phone } from "lucide-react";
import { ProductGrid } from "@/components/ProductGrid";
import { Reveal } from "@/components/Reveal";
import { STORE } from "@/data/products";
import { t, useLang, langFromSearch } from "@/lib/i18n";

export const Route = createFileRoute("/proizvodi")({
  head: ({ match }) => {
    const l = langFromSearch(match.search);
    return {
      meta: [
        { title: t.seo.products.title[l] },
        { name: "description", content: t.seo.products.desc[l] },
        { property: "og:title", content: t.seo.products.title[l] },
        { property: "og:description", content: t.seo.products.desc[l] },
      ],
    };
  },
  component: ProductsPage,
});

function ProductsPage() {
  const { tr } = useLang();
  const search = Route.useSearch();
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
      <Reveal className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <span className="eyebrow">{tr(t.products.eyebrow)}</span>
          <h1 className="mt-3 font-display text-4xl font-medium sm:text-5xl">{tr(t.products.pageTitle)}</h1>
          <p className="mt-4 max-w-2xl text-foreground/70">{tr(t.products.pageSub)}</p>
        </div>
        <a href={`tel:${STORE.phoneTel}`} className="inline-flex w-fit items-center gap-2 rounded-full bg-accent px-5 py-3 font-semibold text-accent-foreground shadow-soft">
          <Phone className="h-4 w-4" /> {STORE.phone}
        </a>
      </Reveal>
      <div className="mt-10">
        <ProductGrid initialTag={search.tag} />
      </div>
    </div>
  );
}
