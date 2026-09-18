import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { useRouter, useSearch } from "@tanstack/react-router";

export type Lang = "sr" | "hu" | "en";
export const LANGS: Lang[] = ["sr", "hu", "en"];
export type Localized = Record<Lang, string>;

export const isLang = (v: unknown): v is Lang => v === "sr" || v === "hu" || v === "en";

const STORAGE_KEY = "naturalis-lang";

export const t = {
  nav: {
    products: { sr: "Proizvodi", hu: "Termékek", en: "Products" },
    quiz: { sr: "Bio Match", hu: "Bio Match", en: "Bio Match" },
    story: { sr: "Naša priča", hu: "Történetünk", en: "Our story" },
    contact: { sr: "Posetite nas", hu: "Látogasson el", en: "Visit us" },
    call: { sr: "Pozovi", hu: "Hívás", en: "Call" },
    tagline: { sr: "Inspirisano prirodom", hu: "A természet ihlette", en: "Inspired by nature" },
    useDarkTheme: { sr: "Uključi tamni režim", hu: "Sötét mód bekapcsolása", en: "Use dark mode" },
    useLightTheme: { sr: "Uključi svetli režim", hu: "Világos mód bekapcsolása", en: "Use light mode" },
  },
  hero: {
    title: {
      sr: "Zdravlje počinje na polici pored vas.",
      hu: "Az egészség a szomszéd polcon kezdődik.",
      en: "Health starts on the shelf next door.",
    },
    sub: {
      sr: "Hladno ceđena ulja, biljne kapi, čajevi, bezglutenska hrana i prirodna kozmetika – birano sa merom, uz savet koji dobijete lično, u Zanatlijskoj 10.",
      hu: "Hidegen sajtolt olajok, gyógynövénycseppek, teák, gluténmentes élelmiszerek és természetes kozmetikumok – gondosan válogatva, személyes tanáccsal a Zanatlijska 10-ben.",
      en: "Cold-pressed oils, herbal drops, teas, gluten-free food and natural cosmetics – carefully chosen, with advice given in person at Zanatlijska 10.",
    },
    cta: { sr: "Pogledaj ponudu", hu: "Nézze meg a kínálatot", en: "Browse the range" },
    call: { sr: "Pozovi 024 731 608", hu: "Hívjon: 024 731 608", en: "Call 024 731 608" },
    openNow: { sr: "Otvoreno sada", hu: "Most nyitva", en: "Open now" },
    opensLater: { sr: "Danas otvara u", hu: "Ma nyit:", en: "Opens today at" },
    closedNow: { sr: "Danas je već zatvoreno", hu: "Ma már zárva", en: "Already closed today" },
  },
  categories: {
    title: { sr: "Šta ćete naći kod nas", hu: "Mit talál nálunk", en: "What you'll find here" },
    sub: {
      sr: "Police su pune, ali ništa nije slučajno. Svaki proizvod je tu jer smo ga sami probali ili ga neko iz sela traži godinama.",
      hu: "A polcok tele vannak, de semmi sem véletlen. Minden termék azért van itt, mert magunk is kipróbáltuk, vagy évek óta kérik a faluban.",
      en: "The shelves are full, but nothing is random. Every product is here because we tried it ourselves or someone in the village has asked for it for years.",
    },
  },
  quiz: {
    eyebrow: { sr: "Bio-Match", hu: "Bio-Match", en: "Bio-Match" },
    title: { sr: "Ne znate odakle da krenete?", hu: "Nem tudja, hol kezdje?", en: "Not sure where to start?" },
    sub: {
      sr: "Tri kratka pitanja i predložićemo šta da pogledate kad svratite. Kao kad pitate za savet preko pulta, samo unapred.",
      hu: "Három rövid kérdés, és javaslunk pár dolgot, amit érdemes megnézni, ha benéz. Mintha a pult felett kérdezne – csak előre.",
      en: "Three short questions and we'll suggest what to look at when you drop by. Like asking across the counter, just ahead of time.",
    },
    step: { sr: "Korak", hu: "Lépés", en: "Step" },
    q1: { sr: "Šta tražite?", hu: "Mit keres?", en: "What are you looking for?" },
    q2: { sr: "Koji vam je cilj?", hu: "Mi a célja?", en: "What's your goal?" },
    q3: { sr: "Naš predlog za vas", hu: "Javaslatunk Önnek", en: "Our suggestion for you" },
    back: { sr: "Nazad", hu: "Vissza", en: "Back" },
    restart: { sr: "Krenite ispočetka", hu: "Kezdje újra", en: "Start over" },
    askInStore: { sr: "Pitajte u radnji", hu: "Kérdezzen az üzletben", en: "Ask in store" },
    resultNote: {
      sr: "Ovo je polazna tačka, ne recept. Svratite i porazgovarajte sa nama – Robert i Magda rado pomažu.",
      hu: "Ez kiindulópont, nem recept. Nézzen be és beszéljük meg – Robert és Magda szívesen segít.",
      en: "This is a starting point, not a prescription. Drop in and talk to us – Robert and Magda are happy to help.",
    },
    what: {
      food: { sr: "Zdravu hranu", hu: "Egészséges élelmiszert", en: "Healthy food" },
      remedies: { sr: "Ulja, kapi i suplemente", hu: "Olajokat, cseppeket, étrend-kiegészítőket", en: "Oils, drops & supplements" },
      care: { sr: "Negu i eko dom", hu: "Ápolást és öko otthont", en: "Care & eco home" },
    },
    goals: {
      immunity: { sr: "Jači imunitet", hu: "Erősebb immunrendszer", en: "Stronger immunity" },
      digestion: { sr: "Miran stomak", hu: "Nyugodt emésztés", en: "Calm digestion" },
      energy: { sr: "Više energije", hu: "Több energia", en: "More energy" },
      skin: { sr: "Lepa koža", hu: "Szép bőr", en: "Healthy skin" },
      glutenfree: { sr: "Život bez glutena", hu: "Gluténmentes élet", en: "Gluten-free living" },
      eco: { sr: "Čist dom bez hemije", hu: "Tiszta otthon vegyszer nélkül", en: "A chemical-free home" },
    },
  },
  products: {
    eyebrow: { sr: "Iz naših polica", hu: "Polcainkról", en: "From our shelves" },
    title: { sr: "Izdvajamo", hu: "Kiemelt termékeink", en: "Featured" },
    featuredTitle: { sr: "Izdvojeni proizvodi sa naših polica", hu: "Polcainkról kiemelt termékeink", en: "Featured products from our shelves" },
    pageTitle: { sr: "Ponuda", hu: "Kínálat", en: "Our range" },
    pageSub: {
      sr: "Cene i zalihe se menjaju, zato ih ne pišemo ovde. Pozovite ili svratite – uvek ima nečeg novog na polici.",
      hu: "Az árak és a készlet változik, ezért itt nem tüntetjük fel. Hívjon vagy nézzen be – mindig van valami új a polcon.",
      en: "Prices and stock change, so we don't list them here. Call or drop by – there's always something new on the shelf.",
    },
    all: { sr: "Sve", hu: "Összes", en: "All" },
    viewAll: { sr: "Cela ponuda", hu: "Teljes kínálat", en: "Full range" },
    quickView: { sr: "Detalji", hu: "Részletek", en: "Details" },
    usage: { sr: "Kako se koristi", hu: "Használat", en: "How to use" },
    ask: { sr: "Pitaj za proizvod", hu: "Érdeklődés", en: "Ask about it" },
    callStore: { sr: "Pozovi radnju", hu: "Hívja az üzletet", en: "Call the shop" },
    fav: { sr: "Sačuvaj", hu: "Mentés", en: "Save" },
    unfav: { sr: "Ukloni iz sačuvanih", hu: "Eltávolítás", en: "Remove from saved" },
    favorites: { sr: "Sačuvano", hu: "Mentett", en: "Saved" },
    noFav: {
      sr: "Još ništa niste sačuvali. Dodirnite srce na proizvodu.",
      hu: "Még nincs mentett termék. Érintse meg a szívet egy terméken.",
      en: "Nothing saved yet. Tap the heart on a product.",
    },
    empty: { sr: "Nema proizvoda u ovoj kategoriji.", hu: "Nincs termék ebben a kategóriában.", en: "No products in this category." },
  },
  reviews: {
    eyebrow: { sr: "Utisci kupaca", hu: "Vásárlói vélemények", en: "Customer reviews" },
    title: { sr: "Reči naših kupaca", hu: "Vásárlóink szavai", en: "What our customers say" },
    ariaLabel: { sr: "Recenzije kupaca", hu: "Vásárlói vélemények", en: "Customer reviews" },
  },
  story: {
    eyebrow: { sr: "Naša priča", hu: "Történetünk", en: "Our story" },
    title: { sr: "Mala radnja, velika briga.", hu: "Kis bolt, nagy odafigyelés.", en: "A small shop with a big heart." },
    p1: {
      sr: "Naturalis je 14. marta 2012. otvorio Robert Lenart u Malom Iđošu, u vreme kad se „zdrava hrana“ još uvek tražila po većim gradovima. Ideja je bila jednostavna: da komšije ne moraju da putuju do Subotice ili Novog Sada po dobro ulje, čaj koji zaista pomaže ili brašno bez glutena.",
      hu: "A Naturalist Lenart Róbert nyitotta meg 2012. március 14-én Kishegyesen, amikor az „egészséges élelmiszert” még a nagyobb városokban kellett keresni. Az ötlet egyszerű volt: a szomszédoknak ne kelljen Szabadkára vagy Újvidékre utazniuk egy jó olajért, egy valóban segítő teáért vagy gluténmentes lisztért.",
      en: "Naturalis was opened on 14 March 2012 by Robert Lenart in Mali Iđoš, back when \"health food\" still meant a trip to a bigger city. The idea was simple: neighbours shouldn't have to travel to Subotica or Novi Sad for a good oil, a tea that actually helps, or gluten-free flour.",
    },
    p2: {
      sr: "Trinaest godina kasnije, police su drvene, tegle pune bilja i orašastih plodova na meru, a ponuda se širila zajedno sa pitanjima kupaca. Ovde se govori srpski i mađarski, a najčešće rečenica koju čujemo je: „Šta biste vi uzeli?“",
      hu: "Tizenhárom évvel később a polcok fából vannak, az üvegek tele kimért gyógynövénnyel és olajos magvakkal, a kínálat pedig a vásárlók kérdéseivel együtt bővült. Itt szerbül és magyarul is beszélünk, és a leggyakoribb mondat, amit hallunk: „Ön mit venne?”",
      en: "Thirteen years on, the shelves are wooden, the jars are full of loose herbs and nuts sold by weight, and the range has grown along with customers' questions. We speak Serbian and Hungarian here, and the sentence we hear most is: \"What would you take?\"",
    },
    p3: {
      sr: "Ne verujemo u čuda iz bočice. Verujemo u dobru namirnicu, poštenu biljku i navike koje se grade polako. To prodajemo – i to živimo.",
      hu: "Nem hiszünk az üvegcsébe zárt csodákban. Hiszünk a jó alapanyagban, a tisztességes gyógynövényben és a lassan épülő szokásokban. Ezt áruljuk – és ezt éljük.",
      en: "We don't believe in miracles from a bottle. We believe in good ingredients, honest herbs and habits built slowly. That's what we sell – and how we live.",
    },
    years: { sr: "godina poverenja", hu: "év bizalom", en: "years of trust" },
    quality: { sr: "birano, ništa nasumično", hu: "válogatott, semmi véletlen", en: "hand-picked, nothing random" },
    address: { sr: "adresa: Zanatlijska 10", hu: "cím: Zanatlijska 10", en: "address: Zanatlijska 10" },
    langs: { sr: "jezika za pultom", hu: "nyelv a pult mögött", en: "languages at the counter" },
    owner: { sr: "Vlasnik", hu: "Tulajdonos", en: "Owner" },
    values: { sr: "U šta verujemo", hu: "Amiben hiszünk", en: "What we stand for" },
    v1t: { sr: "Sastav pre marketinga", hu: "Összetétel a marketing előtt", en: "Ingredients before marketing" },
    v1: { sr: "Prvo čitamo deklaraciju, pa tek onda etiketu.", hu: "Előbb az összetevőket olvassuk, csak aztán a címkét.", en: "We read the label's back before its front." },
    v2t: { sr: "Domaće kad god može", hu: "Hazai, amikor csak lehet", en: "Local whenever possible" },
    v2: { sr: "Med, ulja, začini i džemovi od ljudi koje znamo.", hu: "Méz, olajok, fűszerek és lekvárok olyanoktól, akiket ismerünk.", en: "Honey, oils, spices and jams from people we know." },
    v3t: { sr: "Savet, ne prodaja", hu: "Tanács, nem rábeszélés", en: "Advice, not a pitch" },
    v3: { sr: "Ako vam nešto ne treba, reći ćemo vam.", hu: "Ha valamire nincs szüksége, megmondjuk.", en: "If you don't need it, we'll tell you." },
    gallery: { sr: "Radnja", hu: "Az üzlet", en: "The shop" },
  },
  contact: {
    eyebrow: { sr: "Posetite nas", hu: "Látogasson el", en: "Visit us" },
    title: { sr: "Zanatlijska 10, Mali Iđoš", hu: "Zanatlijska 10, Kishegyes", en: "Zanatlijska 10, Mali Iđoš" },
    sub: {
      sr: "Zelena ograda, žuta tabla, oslikan zid – ne možete promašiti. Parking ispred, bicikl uz kapiju.",
      hu: "Zöld kerítés, sárga tábla, festett fal – nem lehet eltéveszteni. Parkoló előtte, bicikli a kapunál.",
      en: "Green fence, yellow sign, painted wall – you can't miss it. Parking out front, bikes by the gate.",
    },
    call: { sr: "Pozovi radnju", hu: "Üzlet hívása", en: "Call the shop" },
    mobile: { sr: "Mobilni", hu: "Mobil", en: "Mobile" },
    email: { sr: "Pošalji e-mail", hu: "E-mail küldése", en: "Send an email" },
    directions: { sr: "Uputstva do nas", hu: "Útvonalterv", en: "Get directions" },
    hours: { sr: "Radno vreme", hu: "Nyitvatartás", en: "Opening hours" },
    today: { sr: "danas", hu: "ma", en: "today" },
    closed: { sr: "Zatvoreno", hu: "Zárva", en: "Closed" },
    formTitle: { sr: "Brzo pitanje", hu: "Gyors kérdés", en: "Quick question" },
    formSub: {
      sr: "Tražite određeni proizvod? Napišite nam – otvoriće se vaš e-mail sa spremnom porukom.",
      hu: "Egy adott terméket keres? Írjon nekünk – megnyílik az e-mail programja kész üzenettel.",
      en: "Looking for something specific? Write to us – your email app opens with the message ready.",
    },
    name: { sr: "Vaše ime", hu: "Az Ön neve", en: "Your name" },
    message: { sr: "Šta vas zanima?", hu: "Mi érdekli?", en: "What are you looking for?" },
    send: { sr: "Pošalji", hu: "Küldés", en: "Send" },
    company: { sr: "Podaci o radnji", hu: "Cégadatok", en: "Business details" },
  },
  days: {
    sr: ["Ponedeljak", "Utorak", "Sreda", "Četvrtak", "Petak", "Subota", "Nedelja"],
    hu: ["Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat", "Vasárnap"],
    en: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
  },
  footer: {
    blurb: {
      sr: "Prodavnica prirodnih i bio proizvoda u Malom Iđošu. Inspirisano prirodom od 2012.",
      hu: "Természetes és bio termékek boltja Kishegyesen. A természet ihlette, 2012 óta.",
      en: "Natural and bio products shop in Mali Iđoš. Inspired by nature since 2012.",
    },
    links: { sr: "Stranice", hu: "Oldalak", en: "Pages" },
    tips: { sr: "Saveti iz prirode", hu: "Tippek a természetből", en: "Tips from nature" },
    tipsSub: {
      sr: "Povremeno pišemo šta je novo na polici i kako se koristi. Bez spama.",
      hu: "Időnként megírjuk, mi új a polcon és hogyan használják. Spam nélkül.",
      en: "Occasionally we write about what's new on the shelf and how to use it. No spam.",
    },
    subscribe: { sr: "Prijavi se", hu: "Feliratkozás", en: "Subscribe" },
    emailPh: { sr: "vaš@email.com", hu: "on@email.hu", en: "you@email.com" },
    rights: { sr: "Sva prava zadržana.", hu: "Minden jog fenntartva.", en: "All rights reserved." },
    legal: {
      sr: "Robert Lenart PR Trgovinska radnja Naturalis Mali Iđoš",
      hu: "Robert Lenart PR Trgovinska radnja Naturalis Mali Iđoš",
      en: "Robert Lenart PR Trgovinska radnja Naturalis Mali Iđoš",
    },
  },
  seo: {
    home: {
      title: { sr: "Naturalis Mali Iđoš – bio i prirodni proizvodi", hu: "Naturalis Kishegyes – bio és természetes termékek", en: "Naturalis Mali Iđoš – bio & natural products" },
      desc: {
        sr: "Prodavnica prirodnih i bio proizvoda u Malom Iđošu od 2012: hladno ceđena ulja, biljne kapi, čajevi, bezglutenska hrana, suplementi i prirodna kozmetika.",
        hu: "Természetes és bio termékek boltja Kishegyesen 2012 óta: hidegen sajtolt olajok, gyógynövénycseppek, teák, gluténmentes élelmiszer, étrend-kiegészítők és természetes kozmetikumok.",
        en: "Natural and bio products shop in Mali Iđoš since 2012: cold-pressed oils, herbal drops, teas, gluten-free food, supplements and natural cosmetics.",
      },
    },
    products: {
      title: { sr: "Ponuda – Naturalis Mali Iđoš", hu: "Kínálat – Naturalis Kishegyes", en: "Our range – Naturalis Mali Iđoš" },
      desc: {
        sr: "Zdrava hrana, ulja i tinkture, čajevi i bilje, suplementi, prirodna kozmetika i eko dom – sve što nađete na policama Naturalisa.",
        hu: "Egészséges élelmiszer, olajok és tinktúrák, teák és gyógynövények, étrend-kiegészítők, természetes kozmetikumok és öko otthon – minden, ami a Naturalis polcain van.",
        en: "Healthy food, oils and tinctures, teas and herbs, supplements, natural cosmetics and eco home – everything on Naturalis' shelves.",
      },
    },
    story: {
      title: { sr: "Naša priča – Naturalis Mali Iđoš", hu: "Történetünk – Naturalis Kishegyes", en: "Our story – Naturalis Mali Iđoš" },
      desc: {
        sr: "Kako je Robert Lenart 2012. otvorio malu bio radnju u Malom Iđošu i zašto komšije i dalje pitaju: „Šta biste vi uzeli?“",
        hu: "Hogyan nyitott Lenart Róbert 2012-ben egy kis bioboltot Kishegyesen, és miért kérdezik ma is a szomszédok: „Ön mit venne?”",
        en: "How Robert Lenart opened a small bio shop in Mali Iđoš in 2012 and why neighbours still ask: \"What would you take?\"",
      },
    },
    contact: {
      title: { sr: "Posetite nas – Naturalis, Zanatlijska 10, Mali Iđoš", hu: "Látogasson el – Naturalis, Zanatlijska 10, Kishegyes", en: "Visit us – Naturalis, Zanatlijska 10, Mali Iđoš" },
      desc: {
        sr: "Radno vreme, telefon, e-mail i mapa do Naturalisa u Zanatlijskoj 10, 24321 Mali Iđoš.",
        hu: "Nyitvatartás, telefon, e-mail és térkép a Naturalishoz: Zanatlijska 10, 24321 Kishegyes.",
        en: "Opening hours, phone, email and map for Naturalis at Zanatlijska 10, 24321 Mali Iđoš.",
      },
    },
  },
} as const;

type Ctx = { lang: Lang; setLang: (l: Lang) => void; tr: (s: Localized) => string };
const LangContext = createContext<Ctx | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const search = useSearch({ strict: false }) as { lang?: Lang };
  const router = useRouter();
  const [stored, setStored] = useState<Lang | null>(null);

  useEffect(() => {
    if (search.lang) {
      localStorage.setItem(STORAGE_KEY, search.lang);
      return;
    }
    const s = localStorage.getItem(STORAGE_KEY);
    if (isLang(s) && s !== "sr") setStored(s);
  }, [search.lang]);

  const lang: Lang = search.lang ?? stored ?? "sr";

  const value = useMemo<Ctx>(
    () => ({
      lang,
      tr: (s) => s[lang],
      setLang: (l) => {
        localStorage.setItem(STORAGE_KEY, l);
        setStored(l);
        router.navigate({
          to: router.state.location.pathname,
          search: (prev: Record<string, unknown>) => ({ ...prev, lang: l }),
        } as never);
      },
    }),
    [lang, router],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang outside LangProvider");
  return ctx;
}

/** Resolve a language from a search object in loaders/head() where no context exists. */
export const langFromSearch = (s: unknown): Lang => {
  const l = (s as { lang?: unknown } | undefined)?.lang;
  return isLang(l) ? l : "sr";
};
