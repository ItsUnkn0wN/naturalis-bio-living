import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowDown, ArrowUp, Heart, Search, X } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { ProductQuickView } from "./ProductQuickView";
import {
  getProductTags,
  products,
  tagLabels,
  tagOrder,
  type Product,
  type Tag,
} from "@/data/products";
import { t, useLang } from "@/lib/i18n";
import { useFavorites } from "@/lib/useFavorites";
import { cn } from "@/lib/utils";

type Filter = "all" | "fav" | Tag;
type Sort = "default" | "lowest" | "highest";
const MAX_SEARCH_LENGTH = 80;
const MAX_SUGGESTIONS = 6;

const normalizeSearch = (value: string) =>
  value
    .slice(0, MAX_SEARCH_LENGTH)
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/đ|dj/g, "d")
    .replace(/\s+/g, " ")
    .trim();

export function ProductGrid({
  items = products,
  showFilters = true,
  initialTag,
}: {
  items?: Product[];
  showFilters?: boolean;
  initialTag?: Tag;
}) {
  const { lang, tr } = useLang();
  const favs = useFavorites();
  const [filter, setFilter] = useState<Filter>(initialTag ?? "all");
  const [sort, setSort] = useState<Sort>("default");
  const [open, setOpen] = useState<Product | null>(null);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const availableTags = tagOrder.filter((tag) =>
    items.some((product) => getProductTags(product).includes(tag)),
  );

  useEffect(() => {
    if (initialTag) setFilter(initialTag);
  }, [initialTag]);

  useEffect(() => {
    const timeout = window.setTimeout(() => setDebouncedQuery(query), 120);
    return () => window.clearTimeout(timeout);
  }, [query]);

  const indexedItems = useMemo(
    () =>
      items.map((product, index) => {
        const names = [product.name.sr, product.name.hu, product.name.en].map(normalizeSearch);
        return {
          product,
          index,
          names,
          searchable: normalizeSearch(`${names.join(" ")} ${product.id}`),
        };
      }),
    [items],
  );

  const normalizedQuery = normalizeSearch(debouncedQuery);
  const searchMatches = useMemo(() => {
    if (!normalizedQuery) return [];

    const terms = normalizedQuery.split(" ").filter(Boolean);
    return indexedItems
      .map((item) => {
        if (!terms.every((term) => item.searchable.includes(term))) return null;
        const score = item.names.some((name) => name === normalizedQuery)
          ? 0
          : item.names.some((name) => name.startsWith(normalizedQuery))
            ? 1
            : item.names.some((name) => name.includes(normalizedQuery))
              ? 2
              : 3;
        return { product: item.product, index: item.index, score };
      })
      .filter((match): match is NonNullable<typeof match> => match !== null)
      .sort((a, b) => a.score - b.score || a.index - b.index)
      .map(({ product }) => product);
  }, [indexedItems, normalizedQuery]);

  const suggestions = searchMatches.slice(0, MAX_SUGGESTIONS);
  const hasSearch = normalizedQuery.length > 0;

  const setTagFilter = (next: Filter) => {
    setFilter(next);
    if (next !== "all") {
      setQuery("");
      setDebouncedQuery("");
      setSuggestionsOpen(false);
      setActiveSuggestion(-1);
    }
  };

  const chooseSuggestion = (product: Product) => {
    const name = tr(product.name);
    setFilter("all");
    setQuery(name.slice(0, MAX_SEARCH_LENGTH));
    setDebouncedQuery(name.slice(0, MAX_SEARCH_LENGTH));
    setSuggestionsOpen(false);
    setActiveSuggestion(-1);
    setOpen(product);
  };

  const handleSearchKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown" && suggestions.length > 0) {
      event.preventDefault();
      setSuggestionsOpen(true);
      setActiveSuggestion((current) => (current + 1) % suggestions.length);
    } else if (event.key === "ArrowUp" && suggestions.length > 0) {
      event.preventDefault();
      setSuggestionsOpen(true);
      setActiveSuggestion((current) => (current <= 0 ? suggestions.length - 1 : current - 1));
    } else if (event.key === "Enter") {
      if (suggestionsOpen && activeSuggestion >= 0 && suggestions[activeSuggestion]) {
        event.preventDefault();
        chooseSuggestion(suggestions[activeSuggestion]);
      } else {
        setSuggestionsOpen(false);
        setActiveSuggestion(-1);
      }
    } else if (event.key === "Escape") {
      setSuggestionsOpen(false);
      setActiveSuggestion(-1);
    }
  };

  const filtered =
    filter === "all"
      ? items
      : filter === "fav"
        ? items.filter((p) => favs.has(p.id))
        : items.filter((p) => getProductTags(p).includes(filter));

  const visible = hasSearch
    ? sort === "default"
      ? searchMatches
      : [...searchMatches].sort((a, b) =>
          sort === "lowest" ? a.priceRsd - b.priceRsd : b.priceRsd - a.priceRsd,
        )
    : sort === "default"
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
          <div
            className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0"
            role="group"
            aria-label={tr(t.products.filterByTags)}
          >
            <button
              type="button"
              className={pill(filter === "all")}
              aria-pressed={filter === "all"}
              onClick={() => setTagFilter("all")}
            >
              {tr(t.products.all)}
            </button>
            {availableTags.map((tag) => (
              <button
                key={tag}
                type="button"
                aria-pressed={filter === tag}
                className={pill(filter === tag)}
                onClick={() => setTagFilter(tag)}
              >
                {tr(tagLabels[tag])}
              </button>
            ))}
            <button
              type="button"
              className={cn(pill(filter === "fav"), "inline-flex items-center gap-1.5")}
              aria-pressed={filter === "fav"}
              onClick={() => setTagFilter("fav")}
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
          <div
            className="relative z-20"
            role="search"
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                setSuggestionsOpen(false);
                setActiveSuggestion(-1);
              }
            }}
          >
            <label htmlFor="product-search" className="sr-only">
              {tr(t.products.search)}
            </label>
            <div className="relative">
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
              />
              <input
                ref={searchInputRef}
                id="product-search"
                type="text"
                role="combobox"
                aria-autocomplete="list"
                aria-expanded={suggestionsOpen && hasSearch && suggestions.length > 0}
                aria-controls={
                  suggestionsOpen && hasSearch && suggestions.length > 0
                    ? "product-search-suggestions"
                    : undefined
                }
                aria-activedescendant={
                  activeSuggestion >= 0 ? `product-search-option-${activeSuggestion}` : undefined
                }
                autoComplete="off"
                autoCapitalize="none"
                spellCheck={false}
                maxLength={MAX_SEARCH_LENGTH}
                value={query}
                placeholder={tr(t.products.searchPlaceholder)}
                onFocus={() => setSuggestionsOpen(true)}
                onChange={(event) => {
                  setQuery(event.currentTarget.value.slice(0, MAX_SEARCH_LENGTH));
                  setFilter("all");
                  setSuggestionsOpen(true);
                  setActiveSuggestion(-1);
                }}
                onKeyDown={handleSearchKeyDown}
                className="min-h-12 w-full rounded-2xl border border-border/80 bg-card/70 py-3 pl-12 pr-12 text-sm text-foreground shadow-sm outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/15"
              />
              {query && (
                <button
                  type="button"
                  aria-label={tr(t.products.searchClear)}
                  onClick={() => {
                    setQuery("");
                    setDebouncedQuery("");
                    setSuggestionsOpen(false);
                    setActiveSuggestion(-1);
                    searchInputRef.current?.focus();
                  }}
                  className="absolute right-3 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full text-muted-foreground transition hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <X aria-hidden="true" className="h-4 w-4" />
                </button>
              )}
            </div>
            {hasSearch && (
              <p className="mt-2 px-1 text-xs text-muted-foreground" aria-live="polite">
                {searchMatches.length}{" "}
                {tr(
                  searchMatches.length === 1 ? t.products.searchResult : t.products.searchResults,
                )}
              </p>
            )}
            {suggestionsOpen && hasSearch && suggestions.length > 0 && (
              <div
                id="product-search-suggestions"
                role="listbox"
                aria-label={tr(t.products.searchSuggestions)}
                className="absolute left-0 right-0 top-full z-50 mt-2 max-h-80 overflow-y-auto rounded-2xl border border-border bg-card p-2 shadow-lift"
              >
                {suggestions.map((product, index) => (
                  <button
                    key={product.id}
                    id={`product-search-option-${index}`}
                    type="button"
                    role="option"
                    aria-selected={activeSuggestion === index}
                    onMouseDown={(event) => event.preventDefault()}
                    onMouseEnter={() => setActiveSuggestion(index)}
                    onClick={() => chooseSuggestion(product)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl p-2 text-left transition-colors",
                      activeSuggestion === index ? "bg-secondary" : "hover:bg-secondary/70",
                    )}
                  >
                    {product.image ? (
                      <img
                        src={product.image}
                        alt=""
                        width={48}
                        height={48}
                        loading="lazy"
                        decoding="async"
                        className="h-12 w-12 shrink-0 rounded-lg bg-white/60 object-contain p-1"
                      />
                    ) : (
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-secondary">
                        <Search aria-hidden="true" className="h-4 w-4 text-muted-foreground" />
                      </span>
                    )}
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-foreground">
                        {tr(product.name)}
                      </span>
                      <span className="mt-0.5 block text-xs text-muted-foreground">
                        {product.priceRsd.toLocaleString(
                          lang === "en" ? "en-US" : lang === "hu" ? "hu-HU" : "sr-Latn-RS",
                        )}{" "}
                        RSD
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {visible.length === 0 ? (
        <p className="rounded-3xl border border-dashed border-border p-10 text-center text-muted-foreground">
          {hasSearch
            ? tr(t.products.searchNoResults)
            : filter === "fav"
              ? tr(t.products.noFav)
              : tr(t.products.empty)}
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
                {...(showFilters ? { onTagSelect: setTagFilter } : {})}
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      <ProductQuickView
        product={open}
        onClose={() => setOpen(null)}
        {...(showFilters
          ? {
              onTagSelect: (tag: Tag) => {
                setTagFilter(tag);
                setOpen(null);
              },
            }
          : {})}
      />
    </div>
  );
}
