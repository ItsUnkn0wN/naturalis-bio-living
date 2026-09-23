import { Heart } from "lucide-react";
import { motion } from "motion/react";
import { getProductTags, tagLabels, type Product, type Tag } from "@/data/products";
import { t, useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { ProductPlaceholder } from "./ProductPlaceholder";

export function ProductCard({
  product,
  fav,
  onFav,
  onOpen,
  onTagSelect,
}: {
  product: Product;
  fav: boolean;
  onFav: () => void;
  onOpen: () => void;
  onTagSelect?: (tag: Tag) => void;
}) {
  const { lang, tr } = useLang();
  const productTags = getProductTags(product);
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-shadow hover:shadow-lift"
    >
      <div className="relative aspect-square overflow-hidden">
        <button
          type="button"
          onClick={onOpen}
          aria-label={`${tr(t.products.quickView)}: ${tr(product.name)}`}
          className="block h-full w-full text-left"
        >
          {product.image ? (
            <img
              src={product.image}
              alt={tr(product.name)}
              width={816}
              height={816}
              loading="lazy"
              className="h-full w-full object-contain object-center bg-white/35 p-4 transition-transform duration-700 group-hover:scale-[1.03] dark:bg-black/10"
            />
          ) : (
            <ProductPlaceholder category={product.category} />
          )}
        </button>
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {productTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => onTagSelect?.(tag)}
              aria-label={`${tr(t.products.filterByTags)}: ${tr(tagLabels[tag])}`}
              disabled={!onTagSelect}
              className={cn(
                "rounded-full px-2.5 py-1 text-[11px] font-semibold backdrop-blur transition-transform hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-default disabled:hover:scale-100",
                tag === "new" ? "bg-accent text-accent-foreground" : "bg-sand/85 text-foreground",
              )}
            >
              {tr(tagLabels[tag])}
            </button>
          ))}
        </div>
      </div>
      <button
        type="button"
        onClick={onFav}
        aria-label={fav ? tr(t.products.unfav) : tr(t.products.fav)}
        aria-pressed={fav}
        className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-sand/85 backdrop-blur transition-transform hover:scale-110"
      >
        <Heart
          className={cn(
            "h-4 w-4 transition-colors",
            fav ? "fill-accent text-accent" : "text-foreground",
          )}
        />
      </button>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display text-lg leading-snug">{tr(product.name)}</h3>
        <p className="mt-1.5 text-sm text-muted-foreground">{tr(product.short)}</p>
        <p className="mt-3 text-base font-semibold text-primary">
          {tr(t.products.price)}:{" "}
          {product.priceRsd.toLocaleString(
            lang === "en" ? "en-US" : lang === "hu" ? "hu-HU" : "sr-Latn-RS",
          )}{" "}
          RSD
        </p>
        <button
          type="button"
          onClick={onOpen}
          className="mt-4 self-start text-sm font-semibold text-primary underline-offset-4 hover:underline"
        >
          {tr(t.products.quickView)} →
        </button>
      </div>
    </motion.article>
  );
}
