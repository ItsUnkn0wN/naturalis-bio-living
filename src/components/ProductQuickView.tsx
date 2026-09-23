import { Mail, Phone } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  STORE,
  categories,
  getProductTags,
  tagLabels,
  type Product,
  type Tag,
} from "@/data/products";
import { t, useLang } from "@/lib/i18n";
import { ProductPlaceholder } from "./ProductPlaceholder";

export function ProductQuickView({
  product,
  onClose,
  onTagSelect,
}: {
  product: Product | null;
  onClose: () => void;
  onTagSelect?: (tag: Tag) => void;
}) {
  const { lang, tr } = useLang();
  const cat = product ? categories.find((c) => c.id === product.category) : null;
  const productTags = product ? getProductTags(product) : [];
  const mail = product
    ? `mailto:${STORE.email}?subject=${encodeURIComponent(`Naturalis – ${tr(product.name)}`)}&body=${encodeURIComponent(`${tr(t.products.ask)}: ${tr(product.name)}\n\n`)}`
    : "#";

  return (
    <Dialog open={!!product} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="w-[calc(100%-1rem)] max-h-[94vh] max-w-6xl overflow-x-hidden overflow-y-auto rounded-[2rem] border-white/10 bg-forest-deep p-0 text-white shadow-2xl backdrop-blur-xl sm:w-[calc(100%-2rem)]">
        {product && (
          <div className="grid min-w-0 overflow-hidden rounded-[2rem] lg:min-h-[38rem] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            {product.image ? (
              <img
                src={product.image}
                alt={tr(product.name)}
                width={816}
                height={816}
                className="aspect-[4/3] h-full w-full bg-sage-soft object-contain object-center p-8 sm:aspect-[5/4] lg:aspect-auto lg:min-h-[38rem]"
              />
            ) : (
              <div className="aspect-[4/3] sm:aspect-[5/4] lg:min-h-[38rem] lg:rounded-l-[2rem]">
                <ProductPlaceholder category={product.category} />
              </div>
            )}
            <div className="min-w-0 bg-forest-deep p-6 text-white sm:p-9 lg:p-12">
              <DialogHeader className="text-left">
                {cat && <span className="eyebrow">{tr(cat.label)}</span>}
                <DialogTitle className="font-display text-2xl font-medium leading-tight">
                  {tr(product.name)}
                </DialogTitle>
                <DialogDescription className="text-base text-white/75">
                  {tr(product.desc)}
                </DialogDescription>
              </DialogHeader>
              <p className="mt-3 text-lg font-semibold text-sage">
                {tr(t.products.price)}:{" "}
                {product.priceRsd.toLocaleString(
                  lang === "en" ? "en-US" : lang === "hu" ? "hu-HU" : "sr-Latn-RS",
                )}{" "}
                RSD
              </p>
              {productTags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {productTags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => onTagSelect?.(tag)}
                      aria-label={`${tr(t.products.filterByTags)}: ${tr(tagLabels[tag])}`}
                      disabled={!onTagSelect}
                      className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-white transition-transform hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:cursor-default disabled:hover:scale-100"
                    >
                      {tr(tagLabels[tag])}
                    </button>
                  ))}
                </div>
              )}
              <div className="mt-6 rounded-2xl border border-white/10 bg-black/15 p-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-white/55">
                  {tr(t.products.usage)}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-white/85">{tr(product.usage)}</p>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <a
                  href={`tel:${STORE.phoneTel}`}
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground"
                >
                  <Phone className="h-4 w-4" /> {tr(t.products.callStore)}
                </a>
                <a
                  href={mail}
                  className="inline-flex items-center gap-2 rounded-full border border-white/35 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  <Mail className="h-4 w-4" /> {tr(t.products.ask)}
                </a>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
