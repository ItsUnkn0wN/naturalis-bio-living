import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { Heart } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { ProductQuickView } from "./ProductQuickView";
import { categories, products, type CategoryId, type Product } from "@/data/products";
import { t, useLang } from "@/lib/i18n";
import { useFavorites } from "@/lib/useFavorites";
import { cn } from "@/lib/utils";

type Filter = "all" | "fav" | CategoryId;

export function ProductGrid({
  items = products,
  showFilters = true,
}: {
  items?: Product[];
  showFilters?: boolean;
}) {
  const { tr } = useLang();
  const favs = useFavorites();
  const [filter, setFilter] = useState<Filter>("all");
  const [open, setOpen] = useState<Product | null>(null);

  const visible =
    filter === "all"
      ? items
      : filter === "fav"
        ? items.filter((p) => favs.has(p.id))
        : items.filter((p) => p.category === filter);

  const pill = (active: boolean) =>
    cn(
      "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
      active
        ? "border-primary bg-primary text-primary-foreground"
        : "border-border bg-card/70 text-foreground/80 hover:bg-secondary",
    );

  return (
    <div>
      {showFilters && (
        <div className="-mx-4 mb-8 flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
          <button type="button" className={pill(filter === "all")} onClick={() => setFilter("all")}>
            {tr(t.products.all)}
          </button>
          {categories
            .filter((c) => c.id !== "eco")
            .map((c) => (
              <button
                key={c.id}
                type="button"
                className={pill(filter === c.id)}
                onClick={() => setFilter(c.id)}
              >
                {tr(c.label)}
              </button>
            ))}
          <button
            type="button"
            className={cn(pill(filter === "fav"), "inline-flex items-center gap-1.5")}
            onClick={() => setFilter("fav")}
          >
            <Heart
              className={cn("h-3.5 w-3.5", favs.ids.length > 0 && "fill-accent text-accent")}
            />{" "}
            {tr(t.products.favorites)}
            {favs.ready && favs.ids.length > 0 && (
              <span className="rounded-full bg-accent px-1.5 text-[10px] text-accent-foreground">
                {favs.ids.length}
              </span>
            )}
          </button>
        </div>
      )}

      {visible.length === 0 ? (
        <p className="rounded-3xl border border-dashed border-border p-10 text-center text-muted-foreground">
          {filter === "fav" ? tr(t.products.noFav) : tr(t.products.empty)}
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                fav={favs.has(p.id)}
                onFav={() => favs.toggle(p.id)}
                onOpen={() => setOpen(p)}
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      <ProductQuickView product={open} onClose={() => setOpen(null)} />
    </div>
  );
}
