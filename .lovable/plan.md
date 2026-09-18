# Naturalis Mali Iđoš – bio shop website (SR / HU / EN)

## What we build

A warm, handmade-feeling website for the Naturalis health-food shop at Zanatlijska 10, Mali Iđoš. Not a generic "AI startup" template: it should feel like the actual shop – wooden shelves, hand-lettered green logo with the sun, the tagline **"Inspirisano prirodom" / "A természet ihlette" / "Inspired by nature"**. Copy sells the bio lifestyle (real food, herbal remedies, local trust since 2012), written natively in Serbian, Hungarian and English – Serbian is the default language.

## Research findings (used as facts)

- Store: Robert Lenart PR Trgovinska radnja Naturalis, Zanatlijska 10, 24321 Mali Iđoš. Active since 14 March 2012. MB 62766492, PIB 107474144.
- Phone 024 731608 / mobile 063 547580, email lenart.robert.magda@gmail.com.
- Hours: Mon–Fri 8:00–15:00, Sat 8:00–12:00, Sun closed.
- Facebook page "Naturalis": new Hedera Vita face creams & serums (Face Fluid Awakening Energy, Anti-Ox eye serum), "stock refilled, lots of news".
- Photos show the assortment: cold-pressed oils, herbal tinctures/drops, teas, spices, honey and jams, gluten-free and diet foods, healthy snacks, vitamins and supplements, natural cosmetics, bulk herbs/nuts/dried fruit in jars.
- No official online product list exists (naturalis.rs and other "Naturalis" hits belong to unrelated companies in Croatia), so the catalogue shows **product categories and representative items without invented prices**; each card leads to "Ask / Call" instead of a cart.

## Pages (each its own URL, shared header + footer)

```text
/            Home: hero, category strip, Bio-Match quiz, featured products, story teaser, visit-us block
/proizvodi   Products: filter tabs (All, Healthy food, Oils & tinctures, Teas & herbs, Supplements, Natural cosmetics, Eco home), quick-view dialog, favourites (heart, saved in browser)
/prica       Our story: Robert Lenart, since 2012, animated counters (13+ years, 100% selected quality, 1 local address), shop photos
/kontakt     Visit & contact: map of Zanatlijska 10, call / email / directions buttons, opening hours, short inquiry form (opens prepared email – no backend needed)
```

Language is a URL search param (`?lang=hu`) remembered in the browser; header has an SR / HU / EN switcher. All text lives in one translations file, written by hand per language (no machine-translated feel).

## Key sections and components

- **Header**: sticky, frosted glass, real logo (recreated as SVG: green hand-lettered wordmark + sun), links Proizvodi · Bio-Match · Priča · Kontakt, language switcher, "Pozovi" call button on mobile.
- **Hero**: headline in the tone of "Zdravlje počinje na polici pored vas" (Health starts on the shelf next to you), subline about certified bio food, herbal remedies and local advice; primary CTA "Pogledaj ponudu", secondary "Pozovi 024 731608". Soft floating leaf/seed particles (CSS, lightweight).
- **Bio-Match quiz** (3 steps): what you're looking for → your goal (immunity, digestion, energy, skin & beauty, gluten-free living, eco home) → 3 recommended categories/products with "Ask in store" action. State kept with React state; result also offers WhatsApp/tel link.
- **Product grid**: cards with image, eco labels ("Bio", "Bez glutena", "Domaće", "Hladno ceđeno"), heart favourite, quick-view dialog with description, usage tips and call/email buttons.
- **Story**: split layout with shop photos (from your uploads via Lovable assets) and counters.
- **Contact hub**: embedded map, one-tap actions (`tel:+38124731608`, `tel:+38163547580`, `mailto:`, Google Maps directions), hours card marking today, inquiry form.
- **Footer**: 3 compact columns (shop info + registration numbers, links, hours) and a "natural tips" email signup field (stores nothing yet – just a mailto until a backend is wanted). No fake social links; Facebook link only.

## Visual direction

- Palette from your brief: Forest Emerald `#1F4E3D`, Soft Sage `#8DAA91`, Warm Sand `#F9F8F3`, Terracotta `#D37B58`, Charcoal `#1C2520`, plus **Sun Yellow** taken from the real logo for small accents.
- Fonts: Playfair Display (headings) + Plus Jakarta Sans (body), loaded via link tag.
- Rounded but restrained corners, paper-like sand background with a subtle grain, soft shadows, gentle fade/slide reveals on scroll (Motion). Mobile-first (your preview is a phone) – every row uses grid + truncation so nothing overflows at 390px.
- Product and hero imagery: AI-generated shots in a consistent warm, natural-light style, plus your 5 uploaded shop photos.

## Technical notes

- TanStack Start routes: `index.tsx`, `proizvodi.tsx`, `prica.tsx`, `kontakt.tsx`, each with its own `head()` title/description/og tags per language.
- `src/lib/i18n.ts` (translations + `useLang` hook reading `?lang` and localStorage after hydration), `src/data/products.ts` (categories, products, quiz mapping).
- Components: `SiteHeader`, `SiteFooter`, `Hero`, `BioMatchQuiz`, `ProductGrid`, `ProductCard`, `ProductQuickView`, `StoryCounters`, `ContactHub`, `OpeningHours`, `LanguageSwitcher`, `Logo`.
- shadcn: Dialog, Tabs, Button, Tooltip, Input, Textarea. Icons: lucide-react. Animation: `motion`. Favourites in localStorage behind a hydration guard.
- Design tokens added to `src/styles.css` in oklch via `@theme inline`; no hardcoded colours in components.
- Map: Google Maps embed via a Google Maps connection if you approve it during build; otherwise a static OpenStreetMap embed with a directions link. No database needed for v1.

## Open points (I will assume the defaults unless you say otherwise)

1. Phone: your Google listing shows "024 4731608" while the business record shows "024 731608". Default: show **024 731608** and mobile 063 547580.
2. Logo: recreate the green wordmark + sun as SVG (default) or use only the photo of the sign.
3. Newsletter/inquiry form: mailto-only for now (default); Lovable Cloud can be added later to store signups.
