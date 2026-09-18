import { Heart } from "lucide-react";
import { motion } from "motion/react";
import { tagLabels, type Product } from "@/data/products";
import { t, useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function ProductCard({
  product,
  fav,
  onFav,
  onOpen,
}: {
  product: Product;
  fav: boolean;
  onFav: () => void;
  onOpen: () => void;
}) {
  const { tr } = useLang();
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-shadow hover:shadow-lift"
    >
      <button type="button" onClick={onOpen} className="relative block aspect-square overflow-hidden text-left">
        <img
          src={product.image}
          alt={tr(product.name)}
          width={816}
          height={816}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className={cn(
                "rounded-full px-2.5 py-1 text-[11px] font-semibold backdrop-blur",
                tag === "new" ? "bg-accent text-accent-foreground" : "bg-sand/85 text-foreground",
              )}
            >
              {tr(tagLabels[tag])}
            </span>
          ))}
        </div>
      </button>
      <button
        type="button"
        onClick={onFav}
        aria-label={fav ? tr(t.products.unfav) : tr(t.products.fav)}
        aria-pressed={fav}
        className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-sand/85 backdrop-blur transition-transform hover:scale-110"
      >
        <Heart className={cn("h-4 w-4 transition-colors", fav ? "fill-accent text-accent" : "text-foreground")} />
      </button>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display text-lg leading-snug">{tr(product.name)}</h3>
        <p className="mt-1.5 text-sm text-muted-foreground">{tr(product.short)}</p>
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
