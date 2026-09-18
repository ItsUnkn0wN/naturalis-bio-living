import type { Localized } from "@/lib/i18n";
import oil from "@/assets/p-oil.jpg";
import tincture from "@/assets/p-tincture.jpg";
import tea from "@/assets/p-tea.jpg";
import honey from "@/assets/p-honey.jpg";
import glutenfree from "@/assets/p-glutenfree.jpg";
import nuts from "@/assets/p-nuts.jpg";
import vitamins from "@/assets/p-vitamins.jpg";
import cosmetics from "@/assets/p-cosmetics.jpg";
import eco from "@/assets/p-eco.jpg";
import spices from "@/assets/p-spices.jpg";

export type CategoryId = "food" | "oils" | "teas" | "supplements" | "cosmetics" | "eco";
export type Goal = "immunity" | "digestion" | "energy" | "skin" | "glutenfree" | "eco";
export type Need = "food" | "remedies" | "care";
export type Tag = "bio" | "glutenfree" | "local" | "coldpressed" | "vegan" | "new";

export const categories: { id: CategoryId; label: Localized; blurb: Localized; image: string }[] = [
  { id: "food", label: { sr: "Zdrava hrana", hu: "Egészséges élelmiszer", en: "Healthy food" }, blurb: { sr: "Brašna, pahuljice, med, džemovi, začini, grickalice", hu: "Lisztek, pelyhek, méz, lekvár, fűszerek, rágcsálnivalók", en: "Flours, flakes, honey, jams, spices, snacks" }, image: glutenfree },
  { id: "oils", label: { sr: "Ulja i tinkture", hu: "Olajok és tinktúrák", en: "Oils & tinctures" }, blurb: { sr: "Hladno ceđena ulja, biljne kapi, eterična ulja", hu: "Hidegen sajtolt olajok, gyógynövénycseppek, illóolajok", en: "Cold-pressed oils, herbal drops, essential oils" }, image: oil },
  { id: "teas", label: { sr: "Čajevi i bilje", hu: "Teák és gyógynövények", en: "Teas & herbs" }, blurb: { sr: "Mešavine, bilje na meru, funkcionalni čajevi", hu: "Keverékek, kimért gyógynövények, funkcionális teák", en: "Blends, loose herbs by weight, functional teas" }, image: tea },
  { id: "supplements", label: { sr: "Suplementi", hu: "Étrend-kiegészítők", en: "Supplements" }, blurb: { sr: "Vitamini, minerali, probiotici, omega-3", hu: "Vitaminok, ásványi anyagok, probiotikumok, omega-3", en: "Vitamins, minerals, probiotics, omega-3" }, image: vitamins },
  { id: "cosmetics", label: { sr: "Prirodna kozmetika", hu: "Természetes kozmetikum", en: "Natural cosmetics" }, blurb: { sr: "Hedera Vita, kreme, serumi, sapuni, ulja za telo", hu: "Hedera Vita, krémek, szérumok, szappanok, testolajok", en: "Hedera Vita, creams, serums, soaps, body oils" }, image: cosmetics },
  { id: "eco", label: { sr: "Eko dom", hu: "Öko otthon", en: "Eco home" }, blurb: { sr: "Prirodni sapuni, sredstva za čišćenje bez hemije", hu: "Természetes szappanok, vegyszermentes tisztítószerek", en: "Natural soaps, chemical-free cleaning" }, image: eco },
];

export const tagLabels: Record<Tag, Localized> = {
  bio: { sr: "Bio", hu: "Bio", en: "Bio" },
  glutenfree: { sr: "Bez glutena", hu: "Gluténmentes", en: "Gluten-free" },
  local: { sr: "Domaće", hu: "Hazai", en: "Local" },
  coldpressed: { sr: "Hladno ceđeno", hu: "Hidegen sajtolt", en: "Cold-pressed" },
  vegan: { sr: "Vegan", hu: "Vegán", en: "Vegan" },
  new: { sr: "Novo", hu: "Új", en: "New" },
};

export type Product = {
  id: string;
  category: CategoryId;
  image: string;
  name: Localized;
  short: Localized;
  desc: Localized;
  usage: Localized;
  tags: Tag[];
  goals: Goal[];
  needs: Need[];
  featured?: boolean;
};

export const products: Product[] = [
  {
    id: "bundevino-ulje",
    category: "oils",
    image: oil,
    featured: true,
    name: { sr: "Hladno ceđeno bundevino ulje", hu: "Hidegen sajtolt tökmagolaj", en: "Cold-pressed pumpkin seed oil" },
    short: { sr: "Vojvođanski klasik, tamnozelen i gust.", hu: "Vajdasági klasszikus, sötétzöld és sűrű.", en: "A Vojvodina classic, dark green and rich." },
    desc: {
      sr: "Ceđeno na hladno iz semenki bundeve golice, bez rafinacije. Bogato cinkom, vitaminom E i nezasićenim masnim kiselinama. Tradicionalno se koristi za prostatu, mokraćne puteve i kao dodatak salatama. Držimo i laneno, konopljino, ulje crnog kima i orahovo.",
      hu: "Hidegen sajtolt, finomítatlan, héj nélküli tökmagból. Gazdag cinkben, E-vitaminban és telítetlen zsírsavakban. Hagyományosan prosztatára, húgyutakra és salátákhoz használják. Tartunk len-, kender-, feketekömény- és dióolajat is.",
      en: "Cold-pressed from hulless pumpkin seeds, unrefined. Rich in zinc, vitamin E and unsaturated fatty acids. Traditionally used for prostate and urinary health and as a salad finisher. We also stock flax, hemp, black cumin and walnut oil.",
    },
    usage: { sr: "Jedna kašika ujutru na prazan stomak ili preko salate. Ne zagrevati. Čuvati na tamnom mestu.", hu: "Egy evőkanál reggel éhgyomorra vagy salátára. Nem hevíthető. Sötét helyen tárolandó.", en: "One tablespoon in the morning on an empty stomach or over salad. Do not heat. Store in the dark." },
    tags: ["coldpressed", "local"],
    goals: ["digestion", "energy", "skin"],
    needs: ["remedies", "food"],
  },
  {
    id: "biljne-kapi",
    category: "oils",
    image: tincture,
    featured: true,
    name: { sr: "Biljne kapi i tinkture", hu: "Gyógynövénycseppek és tinktúrák", en: "Herbal drops & tinctures" },
    short: { sr: "Ehinacea, origano, propolis, sikavica…", hu: "Echinacea, oregánó, propolisz, máriatövis…", en: "Echinacea, oregano, propolis, milk thistle…" },
    desc: {
      sr: "Koncentrovani biljni ekstrakti u kapima: ehinacea i propolis za sezonu prehlada, origano ulje za gljivice i kandidu, sikavica za jetru, valerijana i matičnjak za miran san. Biramo proizvođače koji navode sadržaj aktivnih materija.",
      hu: "Koncentrált növényi kivonatok cseppekben: echinacea és propolisz a megfázásos időszakra, oregánóolaj gombák és candida ellen, máriatövis a májnak, valeriána és citromfű a nyugodt alváshoz. Olyan gyártókat választunk, akik feltüntetik a hatóanyag-tartalmat.",
      en: "Concentrated plant extracts in drops: echinacea and propolis for cold season, oregano oil for fungal issues and candida, milk thistle for the liver, valerian and lemon balm for restful sleep. We pick makers who state active ingredient content.",
    },
    usage: { sr: "Doziranje zavisi od preparata – piše na pakovanju, a rado ćemo objasniti i lično.", hu: "Az adagolás készítményenként eltér – a csomagoláson szerepel, és szívesen elmagyarázzuk személyesen is.", en: "Dosage depends on the product – it's on the pack, and we're happy to explain in person." },
    tags: ["bio", "vegan"],
    goals: ["immunity", "digestion"],
    needs: ["remedies"],
  },
  {
    id: "biljni-caj",
    category: "teas",
    image: tea,
    featured: true,
    name: { sr: "Čajne mešavine i bilje na meru", hu: "Teakeverékek és kimért gyógynövények", en: "Tea blends & loose herbs" },
    short: { sr: "Kamilica, nana, lipa, kantarion – iz tegle, koliko treba.", hu: "Kamilla, menta, hárs, orbáncfű – üvegből, amennyi kell.", en: "Chamomile, mint, linden, St John's wort – from the jar, as much as you need." },
    desc: {
      sr: "Velike tegle na pultu nisu dekoracija. Bilje merimo na gram, pa možete probati malu količinu pre nego što uzmete više. Uz to: gotove mešavine za stomak, imunitet, san i mršavljenje, zeleni i matcha čaj.",
      hu: "A pulton lévő nagy üvegek nem díszek. A gyógynövényt grammra mérjük, így kis mennyiséget is kipróbálhat, mielőtt többet venne. Emellett: kész keverékek gyomorra, immunrendszerre, alvásra és fogyásra, zöld tea és matcha.",
      en: "The big jars on the counter aren't decoration. We weigh herbs by the gram, so you can try a little before buying more. Also: ready blends for digestion, immunity, sleep and weight, green tea and matcha.",
    },
    usage: { sr: "Kašičica na šolju, preliti vrelom vodom, poklopiti 8–10 minuta. Kamilicu i lipu ne kuvati.", hu: "Egy teáskanál csészénként, forró vízzel leönteni, lefedve 8–10 percig áztatni. A kamillát és hársat nem szabad forralni.", en: "A teaspoon per cup, pour over hot water, cover for 8–10 minutes. Don't boil chamomile or linden." },
    tags: ["bio", "local"],
    goals: ["digestion", "immunity"],
    needs: ["remedies", "food"],
  },
  {
    id: "med-dzem",
    category: "food",
    image: honey,
    featured: true,
    name: { sr: "Med i domaći džemovi", hu: "Méz és házi lekvárok", en: "Honey & homemade jams" },
    short: { sr: "Od pčelara iz okoline, bez dodatog šećera.", hu: "Környékbeli méhészektől, hozzáadott cukor nélkül.", en: "From nearby beekeepers, no added sugar." },
    desc: {
      sr: "Bagremov, livadski i lipov med, propolis i polen od pčelara iz okoline Malog Iđoša. Džemovi od šljive, kajsije i šipka kuvani bez dodatog šećera ili sa stevijom – za one koji paze na šećer, a ne žele da se odreknu ukusa.",
      hu: "Akác-, vegyes virág- és hársméz, propolisz és virágpor a Kishegyes környéki méhészektől. Szilva-, sárgabarack- és csipkebogyólekvár hozzáadott cukor nélkül vagy sztíviával – azoknak, akik figyelnek a cukorra, de nem mondanának le az ízről.",
      en: "Acacia, meadow and linden honey, propolis and pollen from beekeepers around Mali Iđoš. Plum, apricot and rosehip jams cooked without added sugar or with stevia – for those watching sugar without giving up flavour.",
    },
    usage: { sr: "Med ne stavljati u vreo čaj – sačekajte da se malo ohladi da ostanu enzimi.", hu: "A mézet ne tegye forró teába – várjon, míg kicsit kihűl, hogy az enzimek megmaradjanak.", en: "Don't add honey to boiling tea – let it cool a bit so the enzymes survive." },
    tags: ["local"],
    goals: ["energy", "immunity"],
    needs: ["food"],
  },
  {
    id: "bez-glutena",
    category: "food",
    image: glutenfree,
    featured: true,
    name: { sr: "Bezglutenska brašna i pahuljice", hu: "Gluténmentes lisztek és pelyhek", en: "Gluten-free flours & flakes" },
    short: { sr: "Heljda, pirinač, kukuruz, ovas – i gotove smese za hleb.", hu: "Hajdina, rizs, kukorica, zab – és kész kenyérkeverékek.", en: "Buckwheat, rice, corn, oats – plus ready bread mixes." },
    desc: {
      sr: "Najveći deo police zdrave hrane. Brašna od heljde, pirinča, kukuruza, prosa i kokosa, ovsene i heljdine pahuljice, bezglutenske testenine, keksi, hleb i smese za palačinke. Držimo i proizvode za dijabetičare i bez laktoze.",
      hu: "Az egészséges élelmiszer polc legnagyobb része. Hajdina-, rizs-, kukorica-, köles- és kókuszliszt, zab- és hajdinapehely, gluténmentes tészták, kekszek, kenyér és palacsintakeverékek. Diabetikus és laktózmentes termékeket is tartunk.",
      en: "The biggest part of the health food shelf. Buckwheat, rice, corn, millet and coconut flours, oat and buckwheat flakes, gluten-free pasta, biscuits, bread and pancake mixes. We also stock diabetic and lactose-free products.",
    },
    usage: { sr: "Bezglutensko testo traži više tečnosti i malo psilijuma ili čia semena da se veže. Pitajte za recept koji koristimo kod kuće.", hu: "A gluténmentes tészta több folyadékot és egy kevés útifűmaghéjat vagy chia magot kíván a kötéshez. Kérje el az otthon használt receptünket.", en: "Gluten-free dough needs more liquid and a little psyllium or chia to bind. Ask for the recipe we use at home." },
    tags: ["glutenfree", "bio"],
    goals: ["glutenfree", "digestion"],
    needs: ["food"],
  },
  {
    id: "orasasti",
    category: "food",
    image: nuts,
    name: { sr: "Orašasti plodovi i sušeno voće", hu: "Olajos magvak és aszalt gyümölcs", en: "Nuts, seeds & dried fruit" },
    short: { sr: "Na meru: bademi, indijski orah, brusnica, kajsija, semenke.", hu: "Kimérve: mandula, kesudió, áfonya, barack, magvak.", en: "By weight: almonds, cashews, cranberries, apricots, seeds." },
    desc: {
      sr: "Sirovi, neprženi i nesoljeni. Bademi, lešnici, indijski orah, brazilski orah, semenke bundeve i suncokreta, chia, lan, goji, brusnica, urme i kajsija bez sumpora. Kupite 100 g ili kilogram – kako vam odgovara.",
      hu: "Nyers, pörköletlen és sózatlan. Mandula, mogyoró, kesudió, brazil dió, tök- és napraforgómag, chia, len, goji, áfonya, datolya és kénmentes sárgabarack. Vegyen 100 grammot vagy egy kilót – ahogy Önnek megfelel.",
      en: "Raw, unroasted and unsalted. Almonds, hazelnuts, cashews, Brazil nuts, pumpkin and sunflower seeds, chia, flax, goji, cranberries, dates and unsulphured apricots. Buy 100 g or a kilo – whatever suits you.",
    },
    usage: { sr: "Šaka dnevno je dovoljna. Semenke lana samleti neposredno pre upotrebe.", hu: "Napi egy marék elég. A lenmagot közvetlenül felhasználás előtt darálja.", en: "A handful a day is plenty. Grind flax seeds just before use." },
    tags: ["vegan", "bio"],
    goals: ["energy", "skin"],
    needs: ["food"],
  },
  {
    id: "zacini",
    category: "food",
    image: spices,
    name: { sr: "Začini i himalajska so", hu: "Fűszerek és himalájai só", en: "Spices & Himalayan salt" },
    short: { sr: "Kurkuma, cimet, đumbir, domaća aleva paprika.", hu: "Kurkuma, fahéj, gyömbér, hazai őrölt paprika.", en: "Turmeric, cinnamon, ginger, local ground paprika." },
    desc: {
      sr: "Začini bez pojačivača ukusa i antizgrušivača. Kurkuma u prahu i korenu, cejlonski cimet, đumbir, kim, himalajska i morska so, kao i domaća slatka i ljuta paprika iz okoline.",
      hu: "Fűszerek ízfokozók és csomósodásgátlók nélkül. Kurkuma porban és gyökérben, ceyloni fahéj, gyömbér, kömény, himalájai és tengeri só, valamint környékbeli édes és csípős őrölt paprika.",
      en: "Spices without flavour enhancers or anti-caking agents. Turmeric powder and root, Ceylon cinnamon, ginger, cumin, Himalayan and sea salt, plus local sweet and hot paprika.",
    },
    usage: { sr: "Kurkuma se bolje iskorišćava uz prstohvat crnog bibera i malo masnoće.", hu: "A kurkuma egy csipet fekete borssal és kevés zsiradékkal hasznosul a legjobban.", en: "Turmeric absorbs best with a pinch of black pepper and a little fat." },
    tags: ["local", "vegan"],
    goals: ["digestion", "immunity"],
    needs: ["food"],
  },
  {
    id: "vitamini",
    category: "supplements",
    image: vitamins,
    featured: true,
    name: { sr: "Vitamini i minerali", hu: "Vitaminok és ásványi anyagok", en: "Vitamins & minerals" },
    short: { sr: "D3, C, magnezijum, cink, omega-3, probiotici.", hu: "D3, C, magnézium, cink, omega-3, probiotikumok.", en: "D3, C, magnesium, zinc, omega-3, probiotics." },
    desc: {
      sr: "Suplementi proverenih proizvođača, u oblicima koji se dobro apsorbuju: magnezijum citrat i bisglicinat, vitamin D3 sa K2, liposomalni vitamin C, cink pikolinat, omega-3 iz ribljeg ulja, probiotici sa više sojeva. Bez preteranih obećanja na kutiji.",
      hu: "Ellenőrzött gyártók étrend-kiegészítői, jól felszívódó formában: magnézium-citrát és -biszglicinát, D3-vitamin K2-vel, liposzómás C-vitamin, cink-pikolinát, halolajból származó omega-3, többtörzsű probiotikumok. Túlzó ígéretek nélkül a dobozon.",
      en: "Supplements from trusted makers, in forms that absorb well: magnesium citrate and bisglycinate, vitamin D3 with K2, liposomal vitamin C, zinc picolinate, fish-oil omega-3, multi-strain probiotics. No overpromising on the box.",
    },
    usage: { sr: "Vitamin D uz obrok sa masnoćom, magnezijum uveče. Ako pijete lekove, proverite sa lekarom.", hu: "A D-vitamint zsírt tartalmazó étkezéssel, a magnéziumot este. Ha gyógyszert szed, egyeztessen orvosával.", en: "Vitamin D with a meal containing fat, magnesium in the evening. If you take medication, check with your doctor." },
    tags: [],
    goals: ["immunity", "energy"],
    needs: ["remedies"],
  },
  {
    id: "hedera-vita",
    category: "cosmetics",
    image: cosmetics,
    featured: true,
    name: { sr: "Hedera Vita nega lica", hu: "Hedera Vita arcápolás", en: "Hedera Vita face care" },
    short: { sr: "Face Fluid Awakening Energy i Anti-Ox serum za oči – upravo stiglo.", hu: "Face Fluid Awakening Energy és Anti-Ox szemszérum – most érkezett.", en: "Face Fluid Awakening Energy and Anti-Ox eye serum – just arrived." },
    desc: {
      sr: "Srpska prirodna kozmetika na biljnoj bazi. Face Fluid Awakening Energy (30 ml) je 6-u-1 fluid za hidrataciju, lifting i fine bore, a Anti-Ox roll-on serum za oči (5 ml) sa vitaminom C, hijaluronom i peptidima osvežava pogled. Zalihe upravo dopunjene, ima dosta novina.",
      hu: "Szerb, növényi alapú természetes kozmetikum. A Face Fluid Awakening Energy (30 ml) 6 az 1-ben fluid hidratálásra, liftingre és finom ráncokra, az Anti-Ox roll-on szemszérum (5 ml) C-vitaminnal, hialuronnal és peptidekkel frissíti a tekintetet. A készlet most lett feltöltve, sok az újdonság.",
      en: "Serbian plant-based natural cosmetics. Face Fluid Awakening Energy (30 ml) is a 6-in-1 fluid for hydration, lifting and fine lines; the Anti-Ox roll-on eye serum (5 ml) with vitamin C, hyaluronic acid and peptides freshens tired eyes. Stock just refilled, lots of new items.",
    },
    usage: { sr: "Fluid ujutru i uveče na čisto lice; serum lagano utapkati oko očiju.", hu: "A fluidot reggel és este tiszta arcra; a szérumot finoman ütögesse a szem köré.", en: "Fluid morning and evening on clean skin; gently pat the serum around the eyes." },
    tags: ["new", "vegan"],
    goals: ["skin"],
    needs: ["care"],
  },
  {
    id: "eko-dom",
    category: "eco",
    image: eco,
    name: { sr: "Prirodni sapuni i eko sredstva", hu: "Természetes szappanok és öko tisztítószerek", en: "Natural soaps & eco cleaning" },
    short: { sr: "Maslinov sapun, soda, sirće, sredstva bez fosfata.", hu: "Olívaszappan, szóda, ecet, foszfátmentes szerek.", en: "Olive soap, soda, vinegar, phosphate-free cleaners." },
    desc: {
      sr: "Za kožu i za kuću. Hladno rađeni sapuni od maslinovog i kokosovog ulja, šamponi u čvrstom obliku, soda bikarbona i limunska kiselina na meru, ekološka sredstva za sudove i veš koja ne iritiraju kožu i ne završe u Krivaji.",
      hu: "Bőrre és otthonra. Hidegen készült olíva- és kókuszolaj szappanok, szilárd samponok, kimért szódabikarbóna és citromsav, bőrt nem irritáló öko mosogató- és mosószerek, amelyek nem a Krivajában végzik.",
      en: "For skin and home. Cold-process olive and coconut oil soaps, solid shampoos, baking soda and citric acid by weight, eco dish and laundry products that don't irritate skin and don't end up in the Krivaja river.",
    },
    usage: { sr: "Sirće + soda čiste veći deo kuhinje. Za ostalo – pitajte, imamo rešenje.", hu: "Ecet + szóda a konyha nagy részét tisztán tartja. A többire – kérdezzen, van megoldásunk.", en: "Vinegar + soda cleans most of the kitchen. For the rest – ask, we have a solution." },
    tags: ["vegan", "bio"],
    goals: ["eco", "skin"],
    needs: ["care"],
  },
];

export const featuredProducts = products.filter((p) => p.featured);

export function recommend(need: Need, goal: Goal): Product[] {
  const scored = products
    .map((p) => {
      let s = 0;
      if (p.goals.includes(goal)) s += 3;
      if (p.needs.includes(need)) s += 2;
      return { p, s };
    })
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s);
  return scored.slice(0, 3).map((x) => x.p);
}

export const STORE = {
  name: "Naturalis",
  legal: "Robert Lenart PR Trgovinska radnja Naturalis Mali Iđoš",
  owner: "Robert Lenart",
  street: "Zanatlijska 10",
  city: "24321 Mali Iđoš",
  phone: "024 731 608",
  phoneTel: "+38124731608",
  mobile: "063 547 580",
  mobileTel: "+38163547580",
  email: "lenart.robert.magda@gmail.com",
  mb: "62766492",
  pib: "107474144",
  since: 2012,
  facebook: "https://www.facebook.com/search/top?q=naturalis%20mali%20i%C4%91o%C5%A1",
  mapsQuery: "Zanatlijska 10, 24321 Mali Iđoš, Srbija",
  lat: 45.7083,
  lng: 19.6636,
  /** [open, close] in hours; null = closed. Index 0 = Monday */
  hours: [
    [8, 15],
    [8, 15],
    [8, 15],
    [8, 15],
    [8, 15],
    [8, 12],
    null,
  ] as ([number, number] | null)[],
};

export const fmtHours = (h: [number, number] | null | undefined, closed: string) =>
  h ? `${String(h[0]).padStart(2, "0")}:00 – ${String(h[1]).padStart(2, "0")}:00` : closed;
