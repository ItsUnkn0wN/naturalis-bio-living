import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";
import { legalPages } from "@/data/legal";
import { langFromSearch } from "@/lib/i18n";

export const Route = createFileRoute("/pravno-obavestenje")({
  head: ({ match }) => {
    const lang = langFromSearch(match.search);
    return { meta: [{ title: legalPages.notice.title[lang] }] };
  },
  component: () => <LegalPage pageId="notice" />,
});
