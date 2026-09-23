import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";
import { legalPages } from "@/data/legal";
import { langFromSearch } from "@/lib/i18n";

export const Route = createFileRoute("/impressum")({
  head: ({ match }) => {
    const lang = langFromSearch(match.search);
    return { meta: [{ title: legalPages.impressum.title[lang] }] };
  },
  component: () => <LegalPage pageId="impressum" />,
});
