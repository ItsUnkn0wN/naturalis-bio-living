import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";
import { legalNav, legalPages, type LegalPageId } from "@/data/legal";
import { t, useLang } from "@/lib/i18n";

export type LegalRoutePath =
  | "/impressum"
  | "/pravno-obavestenje"
  | "/uslovi-koriscenja"
  | "/politika-privatnosti"
  | "/politika-kolacica";

export const legalPath = (id: LegalPageId): LegalRoutePath => {
  const paths: Record<LegalPageId, LegalRoutePath> = {
    impressum: "/impressum",
    notice: "/pravno-obavestenje",
    terms: "/uslovi-koriscenja",
    privacy: "/politika-privatnosti",
    cookies: "/politika-kolacica",
  };
  return paths[id];
};

export function LegalPage({ pageId }: { pageId: LegalPageId }) {
  const { tr } = useLang();
  const page = legalPages[pageId];
  const currentIndex = legalNav.findIndex((item) => item.id === pageId);
  const previous = legalNav[currentIndex - 1];
  const next = legalNav[currentIndex + 1];

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
      <div className="grid gap-10 lg:grid-cols-[15rem_minmax(0,1fr)] lg:items-start">
        <aside className="lg:sticky lg:top-28">
          <div className="rounded-3xl border border-border bg-card/70 p-4 shadow-soft">
            <div className="flex items-center gap-2 px-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-accent" aria-hidden="true" />
              {tr(t.legal.sectionLabel)}
            </div>
            <nav className="mt-3 grid gap-1" aria-label={tr(t.legal.sectionLabel)}>
              {legalNav.map((item) => (
                <Link
                  key={item.id}
                  to={legalPath(item.id)}
                  search={(p) => p}
                  className={`rounded-2xl px-3 py-2.5 text-sm transition-colors ${
                    item.id === pageId
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground/75 hover:bg-secondary hover:text-foreground"
                  }`}
                  aria-current={item.id === pageId ? "page" : undefined}
                >
                  {tr(item.label)}
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        <article className="min-w-0">
          <Link
            to="/"
            search={(p) => p}
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> {tr(t.legal.backHome)}
          </Link>
          <header className="mt-8 border-b border-border pb-8">
            <span className="eyebrow">{tr(page.eyebrow)}</span>
            <h1 className="mt-3 max-w-4xl font-display text-4xl font-medium leading-tight sm:text-5xl">
              {tr(page.title)}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-foreground/75">
              {tr(page.intro)}
            </p>
            <p className="mt-4 text-xs text-muted-foreground">
              {tr(t.legal.lastUpdated)}: 23.09.2026
            </p>
          </header>

          <div className="mt-8 space-y-8">
            {page.sections.map((section) => (
              <section
                key={section.title.en}
                className="rounded-3xl border border-border bg-card/45 p-6 shadow-soft sm:p-8"
              >
                <h2 className="font-display text-2xl font-medium sm:text-3xl">
                  {tr(section.title)}
                </h2>
                {section.paragraphs?.map((paragraph, index) => (
                  <p key={index} className="mt-4 leading-relaxed text-foreground/80">
                    {tr(paragraph)}
                  </p>
                ))}
                {section.items && (
                  <ul className="mt-4 space-y-3">
                    {section.items.map((item, index) => (
                      <li key={index} className="flex gap-3 leading-relaxed text-foreground/80">
                        <span
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                          aria-hidden="true"
                        />
                        <span>{tr(item)}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <nav
            className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6"
            aria-label={tr(t.legal.pageNavigation)}
          >
            {previous ? (
              <Link
                to={legalPath(previous.id)}
                search={(p) => p}
                className="inline-flex max-w-[48%] items-center gap-2 text-sm font-semibold text-primary hover:underline"
              >
                <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span className="truncate">{tr(previous.label)}</span>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link
                to={legalPath(next.id)}
                search={(p) => p}
                className="ml-auto inline-flex max-w-[48%] items-center gap-2 text-right text-sm font-semibold text-primary hover:underline"
              >
                <span className="truncate">{tr(next.label)}</span>
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </Link>
            )}
          </nav>
          {(pageId === "cookies" || pageId === "terms") && (
            <p className="mt-8 border-t border-border pt-4 text-center text-xs text-muted-foreground/80">
              Website made by Kalmár Alex
            </p>
          )}
        </article>
      </div>
    </div>
  );
}
