import { ImageOff } from "lucide-react";
import { categories, type CategoryId } from "@/data/products";
import { t, useLang } from "@/lib/i18n";

export function ProductPlaceholder({ category }: { category: CategoryId }) {
  const { tr } = useLang();
  const label = categories.find((item) => item.id === category);
  return (
    <div className="grid h-full w-full place-items-center bg-secondary/60 text-secondary-foreground">
      <div className="flex flex-col items-center gap-2 p-6 text-center">
        <ImageOff className="h-8 w-8 opacity-60" aria-hidden="true" />
        <span className="text-xs font-semibold uppercase tracking-[0.16em] opacity-70">
          {label ? tr(label.label) : tr(t.products.pageTitle)}
        </span>
        <span className="text-sm opacity-70">{tr(t.products.imagePending)}</span>
      </div>
    </div>
  );
}
