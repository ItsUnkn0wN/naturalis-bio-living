import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowDown, ArrowUp, Heart } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { ProductQuickView } from "./ProductQuickView";
import { categories, products, type CategoryId, type Product } from "@/data/products";
import { t, useLang } from "@/lib/i18n";
import { useFavorites } from "@/lib/useFavorites";
import { cn } from "@/lib/utils";

type Filter = "all" | "fav" | CategoryId;
type Sort = "default" | "lowest" | "highest";

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
  const [sort, setSort] = useState<Sort>("default");
  const [open, setOpen] = useState<Product | null>(null);

  const filtered =
    filter === "all"
      ? items
      : filter === "fav"
        ? items.filter((p) => favs.has(p.id))
        : items.filter((p) => p.category === filter);

  const visible =
    sort === "default"
      ? filtered
      : [...filtered].sort((a, b) =>
          sort === "lowest" ? a.priceRsd - b.priceRsd : b.priceRsd - a.priceRsd,
        );

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
        <div className="mb-8 space-y-4">
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
            <button
              type="button"
              className={pill(filter === "all")}
              onClick={() => setFilter("all")}
            >
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
          <motion.div
            layout
            className="grid gap-2 rounded-2xl border border-border/70 bg-card/50 p-2.5 shadow-sm sm:flex sm:flex-wrap sm:items-center"
          >
            <span className="px-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground sm:px-2 sm:text-xs">
              {tr(t.products.sort)}
            </span>
            <button
              type="button"
              aria-pressed={sort === "lowest"}
              className={cn(
                pill(sort === "lowest"),
                "inline-flex min-h-10 w-full items-center justify-center gap-1.5 px-3 py-1.5 text-xs sm:w-auto",
              )}
              onClick={() => setSort(sort === "lowest" ? "default" : "lowest")}
            >
              <ArrowUp className="h-3.5 w-3.5" /> {tr(t.products.lowestPrice)}
            </button>
            <button
              type="button"
              aria-pressed={sort === "highest"}
              className={cn(
                pill(sort === "highest"),
                "inline-flex min-h-10 w-full items-center justify-center gap-1.5 px-3 py-1.5 text-xs sm:w-auto",
              )}
              onClick={() => setSort(sort === "highest" ? "default" : "highest")}
            >
              <ArrowDown className="h-3.5 w-3.5" /> {tr(t.products.highestPrice)}
            </button>
            {sort !== "default" && (
              <button
                type="button"
                className="min-h-9 px-2 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground sm:w-auto"
                onClick={() => setSort("default")}
              >
                {tr(t.products.sortDefault)}
              </button>
            )}
          </motion.div>
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
