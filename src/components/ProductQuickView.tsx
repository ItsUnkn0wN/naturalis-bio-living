import { Mail, Phone } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { STORE, categories, tagLabels, type Product } from "@/data/products";
import { t, useLang } from "@/lib/i18n";

export function ProductQuickView({ product, onClose }: { product: Product | null; onClose: () => void }) {
  const { tr } = useLang();
  const cat = product ? categories.find((c) => c.id === product.category) : null;
  const mail = product
    ? `mailto:${STORE.email}?subject=${encodeURIComponent(`Naturalis – ${tr(product.name)}`)}&body=${encodeURIComponent(`${tr(t.products.ask)}: ${tr(product.name)}\n\n`)}`
    : "#";

  return (
    <Dialog open={!!product} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-3xl p-0 sm:max-w-2xl">
        {product && (
          <div className="grid sm:grid-cols-[1fr_1.2fr]">
            <img src={product.image} alt={tr(product.name)} width={816} height={816} className="aspect-square h-full w-full object-cover sm:rounded-l-3xl" />
            <div className="p-6">
              <DialogHeader className="text-left">
                {cat && <span className="eyebrow">{tr(cat.label)}</span>}
                <DialogTitle className="font-display text-2xl font-medium leading-tight">{tr(product.name)}</DialogTitle>
                <DialogDescription className="text-base text-foreground/80">{tr(product.desc)}</DialogDescription>
              </DialogHeader>
              {product.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {product.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-semibold text-secondary-foreground">
                      {tr(tagLabels[tag])}
                    </span>
                  ))}
                </div>
              )}
              <div className="mt-5 rounded-2xl bg-sand-deep/70 p-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{tr(t.products.usage)}</p>
                <p className="mt-1.5 text-sm leading-relaxed">{tr(product.usage)}</p>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <a href={`tel:${STORE.phoneTel}`} className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground">
                  <Phone className="h-4 w-4" /> {tr(t.products.callStore)}
                </a>
                <a href={mail} className="inline-flex items-center gap-2 rounded-full border border-primary px-4 py-2.5 text-sm font-semibold text-primary hover:bg-secondary">
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
