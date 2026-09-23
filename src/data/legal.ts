import type { Localized } from "@/lib/i18n";

export type LegalPageId = "impressum" | "notice" | "terms" | "privacy" | "cookies";

type LegalSection = {
  title: Localized;
  paragraphs?: Localized[];
  items?: Localized[];
};

export type LegalPage = {
  id: LegalPageId;
  eyebrow: Localized;
  title: Localized;
  intro: Localized;
  sections: LegalSection[];
};

const p = (sr: string, hu: string, en: string): Localized => ({ sr, hu, en });

export const legalPages: Record<LegalPageId, LegalPage> = {
  impressum: {
    id: "impressum",
    eyebrow: p("Pravne informacije", "Jogi információk", "Legal information"),
    title: p("Podaci o radnji", "A vállalkozás adatai", "Company information"),
    intro: p(
      "Ova stranica prikazuje podatke o operatoru veb-sajta koji su navedeni u projektu. Ne zamenjuje pravni savet.",
      "Ez az oldal a projektben szereplő üzemeltetői adatokat mutatja be. Nem helyettesít jogi tanácsadást.",
      "This page presents the operator information recorded in the project. It is not a substitute for legal advice.",
    ),
    sections: [
      {
        title: p("Operator i brend", "Üzemeltető és márkanév", "Operator and brand"),
        items: [
          p(
            "Poslovno ime: Robert Lenart PR Trgovinska radnja Naturalis Mali Iđoš",
            "Vállalkozás neve: Robert Lenart PR Trgovinska radnja Naturalis Mali Iđoš",
            "Business name: Robert Lenart PR Trgovinska radnja Naturalis Mali Iđoš",
          ),
          p("Trgovački naziv: Naturalis", "Kereskedelmi név: Naturalis", "Trading name: Naturalis"),
          p(
            "Odgovorno lice navedeno u projektu: Róbert Lénárt",
            "Megnevezett felelős személy: Róbert Lénárt",
            "Responsible person recorded in the project: Róbert Lénárt",
          ),
          p(
            "Godina početka rada navedena u projektu: 2009.",
            "Kezdési év 2009",
            "Year of commencement recorded in the project: 2009.",
          ),
        ],
      },
      {
        title: p("Adresa i kontakt", "Cím és kapcsolat", "Address and contact"),
        items: [
          p(
            "Zanatlijska 10, 24321 Mali Iđoš, Srbija",
            "Zanatlijska 10, 24321 Kishegyes, Szerbia",
            "Zanatlijska 10, 24321 Mali Iđoš, Serbia",
          ),
          p("Telefon: 024 4731 608", "Telefon: 024 4731 608", "Telephone: 024 4731 608"),
          p(
            "E-pošta: lenart.robert.magda@gmail.com",
            "E-mail: lenart.robert.magda@gmail.com",
            "Email: lenart.robert.magda@gmail.com",
          ),
        ],
      },
      {
        title: p("Identifikacioni podaci", "Azonosító adatok", "Identification details"),
        items: [
          p(
            "Matični broj (MB): 62766492",
            "Nyilvántartási szám (MB): 62766492",
            "Company registration number (MB): 62766492",
          ),
          p(
            "Poreski identifikacioni broj (PIB): 107474144",
            "Adóazonosító szám (PIB): 107474144",
            "Tax identification number (PIB): 107474144",
          ),
        ],
      },
      {
        title: p("Šta nije navedeno", "Ami nincs feltüntetve", "What is not stated"),
        paragraphs: [
          p(
            "Projekat ne sadrži proverene podatke o registracionom organu, posebnoj licenci, profesionalnoj komori, PDV statusu ili službenom registracionom izvodu. Ove podatke ne dodajemo bez potvrde operatora.",
            "A projekt nem tartalmaz ellenőrzött adatot a nyilvántartó hatóságról, külön engedélyről, szakmai kamaráról, áfa-státuszról vagy hivatalos kivonatról. Ezeket az adatokat az üzemeltető megerősítése nélkül nem egészítjük ki.",
            "The project does not contain verified information about a registration authority, specific licence, professional chamber, VAT status or official extract. We do not add those details without operator confirmation.",
          ),
        ],
      },
    ],
  },
  notice: {
    id: "notice",
    eyebrow: p("Pravne informacije", "Jogi információk", "Legal information"),
    title: p("Pravno obaveštenje", "Jogi közlemény", "Legal notice"),
    intro: p(
      "Naturalis veb-sajt služi kao informativna prezentacija radnje, njene ponude i načina kontakta.",
      "A Naturalis weboldala az üzlet, kínálata és elérhetőségeinek tájékoztató bemutatására szolgál.",
      "The Naturalis website is an informational presentation of the shop, its range and its contact details.",
    ),
    sections: [
      {
        title: p("Sadržaj sajta", "A weboldal tartalma", "Website content"),
        paragraphs: [
          p(
            "Cene, dostupnost, slike, opisi i radno vreme mogu se promeniti. Objavljeni podaci nisu potvrda da je određeni proizvod trenutno na stanju. Za proveru pozovite radnju ili je posetite.",
            "Az árak, a készlet, a képek, a leírások és a nyitvatartás változhatnak. A közzétett adatok nem igazolják, hogy egy termék jelenleg készleten van. Ellenőrzésért hívja fel vagy keresse fel az üzletet.",
            "Prices, availability, images, descriptions and opening hours may change. Published information does not confirm that a product is currently in stock. Call or visit the shop to confirm availability.",
          ),
          p(
            "Bio Match kviz i opisi proizvoda daju opšte informacije; nisu medicinski, farmaceutski ili dijetetski savet, dijagnoza niti recept.",
            "A Bio Match kérdőív és a termékleírások általános tájékoztatást adnak, nem minősülnek orvosi, gyógyszerészeti vagy dietetikai tanácsnak, diagnózisnak vagy receptnek.",
            "The Bio Match quiz and product descriptions provide general information. They are not medical, pharmaceutical or dietetic advice, a diagnosis or a prescription.",
          ),
        ],
      },
      {
        title: p("Prava intelektualne svojine", "Szellemi tulajdon", "Intellectual property"),
        paragraphs: [
          p(
            "Tekstovi, struktura, vizuelni identitet, korisnički interfejs i izvorni kod sajta ne smeju se kopirati, preuzimati ili komercijalno koristiti bez odgovarajućeg odobrenja. Za pojedinačne fotografije i fontove mogu važiti prava njihovih autora ili dobavljača; ne tvrdimo da je sav materijal treće strane u vlasništvu Naturalisa.",
            "A weboldal szövegei, szerkezete, arculata, felhasználói felülete és forráskódja megfelelő engedély nélkül nem másolható, tölthető le és nem használható fel kereskedelmi célra. Egyes fényképekre és betűtípusokra szerzőik vagy szolgáltatóik jogai vonatkozhatnak; nem állítjuk, hogy minden harmadik féltől származó anyag a Naturalis tulajdona.",
            "The website text, structure, visual identity, interface and source code may not be copied, downloaded or used commercially without appropriate permission. Individual photographs and fonts may be subject to rights held by their authors or suppliers; we do not claim ownership of every third-party asset.",
          ),
        ],
      },
      {
        title: p(
          "Spoljašnje usluge i veze",
          "Külső szolgáltatások és hivatkozások",
          "External services and links",
        ),
        paragraphs: [
          p(
            "Sajt koristi Google Fonts za učitavanje fontova, OpenStreetMap prikaz karte, kao i spoljašnje veze ka Google Maps-u i Facebook-u. Njihove stranice i obrada podataka uređeni su njihovim pravilima, a ne ovim sajtom.",
            "A weboldal Google Fonts betűtípusokat, OpenStreetMap térképet, valamint Google Maps- és Facebook-hivatkozásokat használ. E szolgáltatások oldalaira és adatkezelésére a saját szabályaik vonatkoznak, nem ez a weboldal.",
            "The site uses Google Fonts, an OpenStreetMap map embed, and external links to Google Maps and Facebook. Those services operate under their own terms and privacy practices, not this website's rules.",
          ),
        ],
      },
      {
        title: p(
          "Dostupnost i odgovornost",
          "Elérhetőség és felelősség",
          "Availability and liability",
        ),
        paragraphs: [
          p(
            "Nastojimo da sajt bude dostupan i tačan, ali ne garantujemo neprekidan rad, potpunu tačnost ili odsustvo tehničkih grešaka. Odgovornost se ograničava samo u meri u kojoj je to dopušteno primenljivim obaveznim propisima; ova stranica ne isključuje prava koja se po zakonu ne mogu isključiti.",
            "Törekszünk a weboldal elérhetőségére és pontosságára, de nem garantáljuk a megszakítás nélküli működést, a teljes pontosságot vagy a technikai hibák hiányát. A felelősség csak az alkalmazandó kötelező jog által megengedett mértékben korlátozható; ez az oldal nem zár ki olyan jogot, amelyet a törvény nem enged kizárni.",
            "We aim to keep the site available and accurate, but do not guarantee uninterrupted operation, complete accuracy or the absence of technical errors. Liability is limited only to the extent permitted by mandatory applicable law; this notice does not exclude rights that cannot legally be excluded.",
          ),
        ],
      },
    ],
  },
  terms: {
    id: "terms",
    eyebrow: p("Pravne informacije", "Jogi információk", "Legal information"),
    title: p("Uslovi korišćenja", "Felhasználási feltételek", "Terms of use"),
    intro: p(
      "Ovi uslovi uređuju korišćenje informativnog sajta Naturalis. Sajt trenutno nema korpu, online poručivanje, plaćanje, korisničke naloge ni pretplate.",
      "E feltételek a Naturalis tájékoztató weboldalának használatát szabályozzák. A weboldalon jelenleg nincs kosár, online rendelés, fizetés, felhasználói fiók vagy előfizetés.",
      "These terms govern use of the informational Naturalis website. The site currently has no shopping cart, online ordering, payments, user accounts or subscriptions.",
    ),
    sections: [
      {
        title: p("Dozvoljeno korišćenje", "Megengedett használat", "Permitted use"),
        paragraphs: [
          p(
            "Sajt možete koristiti za pregled informacija o radnji i proizvodima, pronalaženje kontakta i informisanje pre posete. Informacije koristite razumno i u skladu sa zakonom.",
            "A weboldal az üzletről és termékekről szóló információk megtekintésére, elérhetőségek keresésére és a látogatás előtti tájékozódásra használható. A weboldalt ésszerűen és jogszerűen használja.",
            "You may use the site to review information about the shop and products, find contact details and prepare for a visit. Use the site reasonably and lawfully.",
          ),
        ],
      },
      {
        title: p("Zabranjena upotreba", "Tiltott használat", "Prohibited use"),
        items: [
          p(
            "Nije dozvoljeno ometanje rada sajta, pokušaj neovlašćenog pristupa ili unošenje zlonamernog koda.",
            "Tilos a weboldal működésének zavarása, jogosulatlan hozzáférés kísérlete vagy kártékony kód bevitele.",
            "You must not disrupt the site, attempt unauthorised access or introduce malicious code.",
          ),
          p(
            "Nije dozvoljeno automatizovano preuzimanje sadržaja u obimu koji opterećuje sajt ili za komercijalno kopiranje.",
            "Tilos a tartalom olyan mértékű automatizált letöltése, amely terheli a weboldalt, illetve kereskedelmi célú másolása.",
            "You must not automatically retrieve content in a way that burdens the site or copy it commercially.",
          ),
          p(
            "Nije dozvoljeno predstavljanje da ste Naturalis ili povezano lice.",
            "Tilos a Naturalis vagy kapcsolt személy nevében való fellépés.",
            "You must not present yourself as Naturalis or an affiliated person.",
          ),
        ],
      },
      {
        title: p(
          "Proizvodi, cene i dostupnost",
          "Termékek, árak és készlet",
          "Products, prices and availability",
        ),
        paragraphs: [
          p(
            "Prikaz proizvoda je informativan. Sajt ne zaključuje ugovor o prodaji, ne prima porudžbine i ne obračunava plaćanje. Kupovinu i detalje o dostupnosti proveravate direktno u radnji.",
            "A termékek megjelenítése tájékoztató jellegű. A weboldal nem köt adásvételi szerződést, nem fogad rendelést és nem kezel fizetést. A vásárlást és a készletet közvetlenül az üzletben kell egyeztetni.",
            "Product listings are informational. The site does not conclude sales contracts, accept orders or process payments. Confirm purchases and availability directly with the shop.",
          ),
        ],
      },
      {
        title: p(
          "Spoljašnji sadržaj i dostupnost",
          "Külső tartalom és elérhetőség",
          "External content and availability",
        ),
        paragraphs: [
          p(
            "Mape, društvene mreže, fontovi i druge spoljašnje usluge mogu imati sopstvene uslove. Njihova dostupnost ne zavisi od Naturalisa. Sajt može biti privremeno nedostupan zbog održavanja, tehničkih problema ili okolnosti van razumne kontrole operatora.",
            "A térképek, közösségi oldalak, betűtípusok és más külső szolgáltatások saját feltételekkel működhetnek. Elérhetőségük nem a Naturalistól függ. A weboldal karbantartás, technikai hiba vagy az üzemeltető ésszerű ellenőrzésén kívüli körülmény miatt átmenetileg elérhetetlen lehet.",
            "Maps, social networks, fonts and other external services may have their own terms. Their availability is outside Naturalis' control. The site may be temporarily unavailable because of maintenance, technical problems or circumstances beyond the operator's reasonable control.",
          ),
        ],
      },
      {
        title: p(
          "Izmene i primenljivo pravo",
          "Módosítások és alkalmazandó jog",
          "Changes and applicable law",
        ),
        paragraphs: [
          p(
            "Sadržaj sajta i ovi uslovi mogu se ažurirati kada se promeni funkcionalnost ili poslovna praksa. Na pitanja o korišćenju sajta primenjuje se pravo koje je obavezno primenljivo na operatora i konkretnu situaciju. Ništa u ovim uslovima ne ograničava obavezna prava korisnika.",
            "A weboldal tartalma és e feltételek frissíthetők, ha a funkciók vagy az üzleti gyakorlat változik. A weboldal használatára az üzemeltetőre és az adott helyzetre kötelezően alkalmazandó jog irányadó. E feltételek nem korlátozzák a felhasználók kötelező törvényes jogait.",
            "The site content and these terms may be updated when functionality or business practice changes. Use of the site is governed by the law mandatorily applicable to the operator and the specific situation. Nothing here limits mandatory user rights.",
          ),
        ],
      },
    ],
  },
  privacy: {
    id: "privacy",
    eyebrow: p("Pravne informacije", "Jogi információk", "Legal information"),
    title: p("Politika privatnosti", "Adatvédelmi tájékoztató", "Privacy policy"),
    intro: p(
      "Ova politika opisuje podatke i tehnologije koje ovaj kod stvarno koristi. Sajt nema naloge, porudžbine, kontakt-formu, newsletter, online plaćanje ni sopstvenu bazu posetilaca.",
      "Ez a tájékoztató azokat az adatokat és technológiákat írja le, amelyeket ez a kód ténylegesen használ. A weboldalon nincs fiók, rendelés, kapcsolatfelvételi űrlap, hírlevél, online fizetés vagy saját látogatói adatbázis.",
      "This policy describes the data and technologies actually used by this code. The site has no accounts, orders, contact form, newsletter, online payments or visitor database of its own.",
    ),
    sections: [
      {
        title: p("Ko je operator", "Ki az üzemeltető", "Who operates the site"),
        paragraphs: [
          p(
            "Operator je Robert Lenart PR Trgovinska radnja Naturalis Mali Iđoš, Zanatlijska 10, 24321 Mali Iđoš, Srbija. Kontakt: lenart.robert.magda@gmail.com i 024 4731 608.",
            "Az üzemeltető a Robert Lenart PR Trgovinska radnja Naturalis Mali Iđoš, Zanatlijska 10, 24321 Kishegyes, Szerbia. Kapcsolat: lenart.robert.magda@gmail.com és 024 4731 608.",
            "The operator is Robert Lenart PR Trgovinska radnja Naturalis Mali Iđoš, Zanatlijska 10, 24321 Mali Iđoš, Serbia. Contact: lenart.robert.magda@gmail.com and 024 4731 608.",
          ),
        ],
      },
      {
        title: p(
          "Podaci koje korisnik sam pošalje",
          "A felhasználó által elküldött adatok",
          "Data you send yourself",
        ),
        paragraphs: [
          p(
            "Sajt prikazuje e-poštu i telefon kao obične mailto: i tel: veze. Ako pošaljete e-poruku ili pozovete radnju, podatke koje tada saopštite obrađuje operator radi odgovora i komunikacije. Sajt taj sadržaj ne prima kroz sopstvenu formu i kod ne određuje rok čuvanja, primaoce ili provajdera e-pošte; te operativne informacije treba potvrditi sa operatorom.",
            "A weboldal az e-mail- és telefonszámot mailto: és tel: hivatkozásként jeleníti meg. Ha e-mailt küld vagy telefonál, az akkor közölt adatokat az üzemeltető a válaszadás és kapcsolattartás céljából kezeli. A weboldal ezt nem saját űrlapon fogadja, és a kód nem határozza meg a megőrzési időt, a címzetteket vagy az e-mail-szolgáltatót; ezeket az üzemeltetőnek kell megerősítenie.",
            "The site presents email and telephone links as ordinary mailto: and tel: links. If you email or call the shop, the information you provide is handled by the operator to respond and communicate. The site does not receive it through its own form, and the code does not establish retention, recipients or the email provider; those operational details must be confirmed by the operator.",
          ),
        ],
      },
      {
        title: p("Lokalno čuvanje u pregledaču", "Helyi böngészőtárolás", "Local browser storage"),
        items: [
          p(
            "naturalis-lang čuva izabrani jezik.",
            "A naturalis-lang a kiválasztott nyelvet tárolja.",
            "naturalis-lang stores the selected language.",
          ),
          p(
            "naturalis-theme čuva svetlu ili tamnu temu.",
            "A naturalis-theme a világos vagy sötét témát tárolja.",
            "naturalis-theme stores the light or dark theme.",
          ),
          p(
            "naturalis-favorites čuva ID-jeve proizvoda koje korisnik sačuva.",
            "A naturalis-favorites a felhasználó által mentett termékek azonosítóit tárolja.",
            "naturalis-favorites stores IDs of products saved by the user.",
          ),
          p(
            "naturalis-cookie-consent čuva izbor u panelu za lokalno čuvanje/preference.",
            "A naturalis-cookie-consent a helyi tárolási/preferencia panel választását tárolja.",
            "naturalis-cookie-consent stores the choice made in the local-storage/preference panel.",
          ),
        ],
      },
      {
        title: p("Spoljašnji zahtevi", "Külső kérések", "External requests"),
        paragraphs: [
          p(
            "Kod učitava Google Fonts stilove i prikazuje OpenStreetMap kartu u kontakt sekciji. Dugmad mogu otvoriti Google Maps i Facebook. Ti zahtevi mogu uključiti tehničke podatke kao što su IP adresa, vreme zahteva i podaci o pregledaču prema pravilima tih provajdera. Tačan hosting, server-logovi, rokovi čuvanja i međunarodni prenosi nisu vidljivi u ovom repozitorijumu i nisu ovde izmišljeni.",
            "A kód Google Fonts stílusokat tölt be, és OpenStreetMap térképet jelenít meg a kapcsolat szekcióban. A gombok megnyithatják a Google Maps és a Facebook oldalát. E kérések a szolgáltatók szabályai szerint technikai adatokat, például IP-címet, kérési időt és böngészőadatokat is érinthetnek. A pontos tárhelyszolgáltató, szervernaplók, megőrzési idők és nemzetközi adattovábbítások nem láthatók ebben a repozitóriumban, ezért nem állítunk róluk többet.",
            "The code loads Google Fonts and embeds an OpenStreetMap map in the contact section. Buttons may open Google Maps and Facebook. Under those providers' rules, such requests may involve technical data such as IP address, request time and browser information. The exact host, server logs, retention periods and international transfers are not visible in this repository, so we do not invent details.",
          ),
        ],
      },
      {
        title: p("Prava i kontakt", "Jogok és kapcsolat", "Rights and contact"),
        paragraphs: [
          p(
            "Za pitanja o ličnim podacima ili zahtev za ostvarivanje prava obratite se operatoru na lenart.robert.magda@gmail.com ili telefonom 024 4731 608. Primena, obim i rok odgovora zavise od konkretnog zahteva i obaveznog prava koje se primenjuje. Prigovor nadležnom nadzornom organu može se podneti ako smatrate da je obrada nezakonita; konkretan organ i postupak nisu navedeni u projektu i ne izmišljamo ih.",
            "Személyes adatokkal kapcsolatos kérdéssel vagy jogérvényesítési kérelemmel forduljon az üzemeltetőhöz a lenart.robert.magda@gmail.com címen vagy a 024 4731 608-as telefonszámon. A válasz alkalmazása, terjedelme és határideje a konkrét kéréstől és a kötelezően alkalmazandó jogtól függ. Ha az adatkezelést jogellenesnek tartja, panasszal fordulhat az illetékes felügyeleti hatósághoz; a projekt nem nevezi meg a konkrét hatóságot és nem találjuk ki.",
            "For questions about personal data or to exercise a right, contact the operator at lenart.robert.magda@gmail.com or 024 4731 608. The applicable process, scope and response time depend on the request and mandatory applicable law. If you believe processing is unlawful, you may complain to the competent supervisory authority; the project does not identify a specific authority and we do not invent one.",
          ),
        ],
      },
    ],
  },
  cookies: {
    id: "cookies",
    eyebrow: p("Pravne informacije", "Jogi információk", "Legal information"),
    title: p("Kolačići i lokalno čuvanje", "Sütik és helyi tárolás", "Cookies and local storage"),
    intro: p(
      "Kod trenutno ne postavlja klasične HTTP kolačiće niti aktivira analitiku ili marketing. Koristi localStorage za funkcionalne izbore korisnika.",
      "A kód jelenleg nem állít be klasszikus HTTP-sütiket, és nem aktivál analitikát vagy marketinget. A felhasználói funkcionális választásokat localStorage-ban tárolja.",
      "The code currently does not set traditional HTTP cookies and does not activate analytics or marketing. It uses localStorage for functional user choices.",
    ),
    sections: [
      {
        title: p("Neophodno za rad", "A működéshez szükséges", "Necessary for operation"),
        paragraphs: [
          p(
            "React aplikacija i pregledač mogu koristiti tehničke podatke potrebne za učitavanje stranice i navigaciju. U ovom kodu nije pronađen poseban HTTP cookie koji bi se prikazao kao lista kolačića.",
            "A React-alkalmazás és a böngésző az oldal betöltéséhez és a navigációhoz szükséges technikai adatokat használhat. Ebben a kódban nem találtunk külön HTTP-sütit, amelyet sütilistaként kellene felsorolni.",
            "The React application and browser may use technical data needed to load the page and navigate it. This code does not contain a separate HTTP cookie that can be listed as a cookie item.",
          ),
        ],
      },
      {
        title: p(
          "Funkcionalno lokalno čuvanje",
          "Funkcionális helyi tárolás",
          "Functional local storage",
        ),
        items: [
          p(
            "Jezik, tema i sačuvani proizvodi ostaju u vašem pregledaču da bi se izbor zapamtio između poseta.",
            "A nyelv, a téma és a mentett termékek a böngészőben maradnak, hogy a választás megmaradjon a látogatások között.",
            "Language, theme and saved products remain in your browser so choices persist between visits.",
          ),
          p(
            "Panel za saglasnost sam čuva izbor panela. Trenutni kod nema povezan analitički ili marketinški skript koji bi se uključio nakon izbora.",
            "A hozzájárulási panel a panel választását tárolja. A jelenlegi kódban nincs olyan analitikai vagy marketing-szkript, amely a választás után aktiválódna.",
            "The consent panel stores the panel choice. The current code has no connected analytics or marketing script that would activate after a choice.",
          ),
        ],
      },
      {
        title: p("Kako da obrišete podatke", "Adatok törlése", "How to delete the data"),
        paragraphs: [
          p(
            "Lokalne izbore možete obrisati kroz podešavanja svog pregledača za podatke sajta. Brisanje može vratiti jezik, temu, sačuvane proizvode i panel saglasnosti na početno stanje.",
            "A helyi választások a böngésző webhelyadat-beállításaiban törölhetők. A törlés visszaállíthatja a nyelvet, a témát, a mentett termékeket és a hozzájárulási panelt alapállapotba.",
            "You can delete local choices through your browser's site-data settings. Deletion may reset language, theme, saved products and the consent panel to their initial state.",
          ),
        ],
      },
      {
        title: p("Promene", "Módosítások", "Changes"),
        paragraphs: [
          p(
            "Ako se uvede analitika, oglašavanje, prijava korisnika, naručivanje ili druga tehnologija koja menja obradu podataka, ova stranica i mehanizam saglasnosti moraju se ažurirati pre njenog korišćenja.",
            "Ha analitika, hirdetés, felhasználói bejelentkezés, rendelés vagy az adatkezelést megváltoztató más technológia kerül bevezetésre, ezt az oldalt és a hozzájárulási mechanizmust a használat előtt frissíteni kell.",
            "If analytics, advertising, user login, ordering or another technology that changes data processing is introduced, this page and the consent mechanism must be updated before it is used.",
          ),
        ],
      },
    ],
  },
};

export const legalNav: { id: LegalPageId; label: Localized }[] = [
  { id: "impressum", label: p("Podaci o radnji", "Céginformáció", "Company information") },
  { id: "notice", label: p("Pravno obaveštenje", "Jogi közlemény", "Legal notice") },
  { id: "terms", label: p("Uslovi korišćenja", "Felhasználási feltételek", "Terms of use") },
  { id: "privacy", label: p("Politika privatnosti", "Adatvédelmi tájékoztató", "Privacy policy") },
  {
    id: "cookies",
    label: p("Kolačići i lokalno čuvanje", "Sütik és helyi tárolás", "Cookies and local storage"),
  },
];
