import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";
import { legalPages } from "@/data/legal";
import { langFromSearch } from "@/lib/i18n";

export const Route = createFileRoute("/uslovi-koriscenja")({
  head: ({ match }) => {
    const lang = langFromSearch(match.search);
    return { meta: [{ title: legalPages.terms.title[lang] }] };
  },
  component: () => <LegalPage pageId="terms" />,
});
