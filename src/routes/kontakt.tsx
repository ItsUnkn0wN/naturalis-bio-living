import { createFileRoute } from "@tanstack/react-router";
import { ContactHub } from "@/components/ContactHub";
import { Reveal } from "@/components/Reveal";
import { STORE } from "@/data/products";
import { t, useLang, langFromSearch } from "@/lib/i18n";

export const Route = createFileRoute("/kontakt")({
  head: ({ match }) => {
    const l = langFromSearch(match.search);
    return {
      meta: [
        { title: t.seo.contact.title[l] },
        { name: "description", content: t.seo.contact.desc[l] },
        { property: "og:title", content: t.seo.contact.title[l] },
        { property: "og:description", content: t.seo.contact.desc[l] },
      ],
    };
  },
  component: ContactPage,
});

function ContactPage() {
  const { tr } = useLang();
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
      <Reveal>
        <span className="eyebrow">{tr(t.contact.eyebrow)}</span>
        <h1 className="mt-3 font-display text-4xl font-medium sm:text-5xl">{tr(t.contact.title)}</h1>
        <p className="mt-4 max-w-2xl text-foreground/70">{tr(t.contact.sub)}</p>
      </Reveal>
      <Reveal className="mt-10" delay={0.1}>
        <ContactHub />
      </Reveal>
      <Reveal className="mt-10">
        <div className="rounded-3xl border border-border bg-card/60 p-6 text-sm text-muted-foreground">
          <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.2em]">{tr(t.contact.company)}</h2>
          <p className="mt-3 font-medium text-foreground">{STORE.legal}</p>
          <p>{STORE.street}, {STORE.city}</p>
          <p>MB {STORE.mb} · PIB {STORE.pib} · {STORE.since}</p>
        </div>
      </Reveal>
    </div>
  );
}
