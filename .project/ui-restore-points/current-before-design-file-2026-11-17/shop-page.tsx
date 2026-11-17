import Image from "next/image";
import Link from "next/link";
import type { ReactElement } from "react";
import { ArrowLeft, ArrowRight, Phone, ShoppingBag } from "lucide-react";
import CakeCollection from "./cake-collection";

const whatsappUrl = "https://wa.me/923128869242?text=";

export const shopCategories = [
  { title: "Cakes", emoji: "🧁", slug: "cakes", image: "/cakes/chocolate-cream-sheet-cake.png", alt: "Chocolate cherry sheet cake from the cake collection" },
  { title: "Cookies", emoji: "🍪", slug: "cookies", image: "/cookies/cookie-02.png", alt: "Fresh chocolate chunk cookies" },
  { title: "Bakery Items", emoji: "🥐", slug: "bakery-items", image: "/bakery-gallery/croissants.png", alt: "Fresh almond croissants" },
  { title: "Sweets", emoji: "🍡", slug: "sweets", image: "/bakery-gallery/traditional-sweets.svg", alt: "Traditional gulab jamun sweets" },
  { title: "Nimko", emoji: "🥣", slug: "nimko", image: "/nimko/nimko-spicy-bowl.png", alt: "A bowl of crunchy spicy nimko" },
  { title: "Gift Packs", emoji: "🎁", slug: "gift-packs", image: "/bakery-gallery/dessert-table.png", alt: "A celebration table with bakery treats for sharing" }
] as const;
export const shopCategorySlugs = shopCategories.map(({ slug }) => slug);

const collections = {
  cookies: {
    title: "Cookies",
    eyebrow: "Freshly baked favourites",
    description: "Explore chocolate chip, jam-filled, butter cookies and classic tea biscuits.",
    heroImage: "/cookies/cookie-20.png",
    heroAlt: "A beautiful assortment of freshly baked cookies",
    items: [
      { name: "Jam Heart Cookies", image: "/cookies/cookie-01.png", alt: "Heart and star shaped jam filled cookies dusted with sugar" },
      { name: "Chocolate Chunk Cookies", image: "/cookies/cookie-02.png", alt: "Freshly baked chunky cookies with chocolate pieces" },
      { name: "Shaped Butter Cookies", image: "/cookies/cookie-03.png", alt: "Homemade cookies cut into playful shapes" },
      { name: "Classic Oat Cookies", image: "/cookies/cookie-04.png", alt: "Golden round cookies on a baking tray" },
      { name: "Double Chocolate Cookies", image: "/cookies/cookie-05.png", alt: "Dark chocolate cookies topped with chocolate chunks" },
      { name: "Freshly Baked Cookies", image: "/cookies/cookie-06.png", alt: "A tray of golden freshly baked cookies" },
      { name: "Chocolate Chip Cookies", image: "/cookies/cookie-07.png", alt: "Golden cookies with chocolate and fruit pieces" },
      { name: "Jam Thumbprint Cookies", image: "/cookies/cookie-08.png", alt: "Butter cookies with a dark jam centre" },
      { name: "Chocolate Chunk Bites", image: "/cookies/cookie-09.png", alt: "Chocolate chunk cookies cooling on parchment" },
      { name: "Piped Butter Cookies", image: "/cookies/cookie-10.png", alt: "Swirled butter cookies cooling on a wire rack" },
      { name: "Jam Window Cookies", image: "/cookies/cookie-11.png", alt: "Sugar dusted sandwich cookies with jam centres" },
      { name: "Chocolate Chip Cookies", image: "/cookies/cookie-12.png", alt: "Round chocolate chip cookies on a baking tray" },
      { name: "Swirled Chocolate Cookies", image: "/cookies/cookie-13.png", alt: "Piped swirl cookies with chocolate chips" },
      { name: "Tea Biscuits", image: "/cookies/cookie-14.png", alt: "Golden patterned tea biscuits" },
      { name: "Assorted Tea Biscuits", image: "/cookies/cookie-15.png", alt: "A large assortment of crisp tea biscuits" },
      { name: "Chocolate Drizzle Biscuits", image: "/cookies/cookie-16.png", alt: "Biscuits decorated with chocolate drizzle" },
      { name: "Classic Round Biscuits", image: "/cookies/cookie-17.png", alt: "Classic patterned round biscuits on a wooden board" },
      { name: "Sandwich Tea Biscuits", image: "/cookies/cookie-18.png", alt: "Golden sandwich tea biscuits stacked together" },
      { name: "Letter Cookies", image: "/cookies/cookie-19.png", alt: "Cookies arranged to spell a short word" },
      { name: "Assorted Cookie Platter", image: "/cookies/cookie-20.png", alt: "A colourful assortment of assorted cookies and biscuits" },
      { name: "Classic Tea Biscuits", image: "/cookies/cookie-21.png", alt: "Classic rectangular tea biscuits" },
      { name: "Pistachio Biscuits", image: "/cookies/cookie-22.png", alt: "Golden round biscuits topped with pistachio pieces" },
      { name: "Heart Sandwich Cookies", image: "/cookies/cookie-23.png", alt: "Heart shaped sandwich cookies with chocolate filling" },
      { name: "Soft Sugar Cookies", image: "/cookies/cookie-24.png", alt: "Soft pale sugar cookies on a baking tray" },
      { name: "Soft Sugar Cookies", image: "/cookies/cookie-25.png", alt: "Soft pale sugar cookies on a baking tray" },
      { name: "Golden Bakery Biscuits", image: "/cookies/cookie-26.png", alt: "A close view of golden freshly baked bakery biscuits" },
      { name: "Savory Seed Biscuits", image: "/cookies/cookie-27.png", alt: "Round savory biscuits topped with black seeds" },
      { name: "Soft Bakery Cookies", image: "/cookies/cookie-28.png", alt: "Pale golden soft cookies stacked on a white surface" },
      { name: "Almond Coconut Biscuits", image: "/cookies/cookie-29.png", alt: "Round coconut biscuits topped with almonds" },
      { name: "Almond Coconut Biscuits", image: "/cookies/cookie-30.png", alt: "Round coconut biscuits topped with almonds on a plate" },
      { name: "Fresh Bakery Cookies", image: "/cookies/cookie-31.png", alt: "Fresh round bakery cookies on a plate" }
    ]
  },
  "bakery-items": {
    title: "Bakery Items",
    eyebrow: "Fresh from the oven",
    description: "Golden croissants and bakery-counter favourites, prepared fresh with care.",
    heroImage: "/bakery-gallery/croissants.png",
    heroAlt: "Fresh golden almond croissants cooling on a rack",
    items: [
      { name: "Almond Croissants", image: "/bakery-gallery/croissants.png", alt: "Fresh almond croissants cooling on a bakery rack" },
      { name: "Fresh Pastry Selection", image: "/bakery-gallery/bakery-display.png", alt: "Pastries arranged beneath glass cake stands" }
    ]
  },
  sweets: {
    title: "Traditional Sweets",
    eyebrow: "A little sweetness for every occasion",
    description: "Classic mithai favourites for sharing, celebrations and thoughtful gifting.",
    heroImage: "/bakery-gallery/sweet-aroma-hero-display.png",
    heroAlt: "Traditional mithai and bakery treats ready to share",
    items: [
      { name: "Gulab Jamun", image: "/bakery-gallery/traditional-sweets.svg", alt: "Golden gulab jamun traditional sweets" },
      { name: "Sweet Celebration Selection", image: "/bakery-gallery/dessert-table.png", alt: "A colourful table of celebration sweets and cakes" }
    ]
  },
  nimko: {
    title: "Crispy Nimko",
    eyebrow: "Savoury favourites",
    description: "Pick a crunchy mix and message us to ask about available pack sizes.",
    heroImage: "/nimko/nimko-spicy-bowl.png",
    heroAlt: "A bowl of colorful crunchy spicy nimko",
    items: [
      { name: "Golden Rice Nimko", image: "/nimko/nimko-spicy-rice.png", alt: "Golden crispy rice nimko on a white plate" },
      { name: "Classic Nimko Mix", image: "/nimko/nimko-mix-pouch.png", alt: "Traditional assorted nimko mix in a serving pouch" },
      { name: "Crispy Flakes Mix", image: "/nimko/nimko-crispy-flakes.png", alt: "Crispy flakes nimko with peanuts" },
      { name: "Peanut Rice Mix", image: "/nimko/nimko-rice-peanuts.png", alt: "Rice crisps and peanuts served in a bowl" },
      { name: "Spicy Bowl Mix", image: "/nimko/nimko-spicy-bowl.png", alt: "Colorful spicy nimko mix in a white bowl" },
      { name: "Crunchy Nimko Bites", image: "/nimko/nimko-crispy-bites.png", alt: "Golden crunchy nimko bites in a wooden bowl" },
      { name: "Family Nimko Mix", image: "/nimko/nimko-mix-classic.png", alt: "Assorted classic nimko with peanuts and crunchy sticks" }
    ]
  },
  "gift-packs": {
    title: "Gift Packs",
    eyebrow: "Made for sharing",
    description: "Send a sweet surprise. Ask us about a gift selection for your occasion.",
    heroImage: "/bakery-gallery/dessert-table.png",
    heroAlt: "A styled dessert table prepared for sharing and celebration",
    items: [
      { name: "Sweet Aroma Celebration Box", image: "/bakery-gallery/dessert-table.png", alt: "A beautifully arranged bakery dessert table ready for a celebration" },
      { name: "Traditional Sweet Selection", image: "/bakery-gallery/traditional-sweets.svg", alt: "Traditional sweets arranged for gifting" }
    ]
  }
} as const;

type CollectionSlug = keyof typeof collections;
type ProductItem = { readonly name: string; readonly image: string; readonly alt: string };

const CategoryHeader = ({ current }: { current?: string }): ReactElement => (
  <header className="sticky top-0 z-30 border-b border-[#eee0ce]/90 bg-[#fffaf4]/95 shadow-[0_8px_30px_-28px_rgba(55,31,15,0.65)] backdrop-blur-xl">
    <div className="mx-auto flex min-h-[86px] max-w-[1400px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-10">
      <Link href="/" aria-label="Sweet Aroma home"><Image src="/sweet-aroma-logo-original.png" alt="Sweet Aroma Bakery & Sweets" width={1536} height={1024} className="h-[72px] w-[108px] object-contain sm:h-[82px] sm:w-[123px]" /></Link>
      <nav className="hidden items-center gap-1 md:flex" aria-label="Shop categories">
        <Link href="/" className="rounded-full px-3 py-2 text-xs font-semibold text-[#68452e] transition hover:bg-[#f8ecdc]">Home</Link>
        <Link href="/shop" aria-current={!current ? "page" : undefined} className={`rounded-full px-3 py-2 text-xs font-semibold transition ${!current ? "bg-[#713511] text-white" : "text-[#68452e] hover:bg-[#f8ecdc]"}`}>All products</Link>
        {shopCategories.map((category) => <Link key={category.slug} href={`/shop/${category.slug}`} aria-current={current === category.slug ? "page" : undefined} className={`rounded-full px-3 py-2 text-xs font-semibold ${current === category.slug ? "bg-[#713511] text-white" : "text-[#68452e] hover:bg-[#f8ecdc]"}`}>{category.title}</Link>)}
        <Link href="/about" className="rounded-full px-3 py-2 text-xs font-semibold text-[#68452e] transition hover:bg-[#f8ecdc]">About</Link>
      </nav>
      <Link href="/contact" className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[#e8d5bf] bg-white px-4 py-2.5 text-xs font-semibold text-[#633315] transition hover:bg-[#fff1df]"><Phone className="size-3.5" /><span className="hidden sm:inline">Contact</span></Link>
    </div>
    <nav className="flex gap-2 overflow-x-auto border-t border-[#f1e5d9] px-4 py-2.5 md:hidden" aria-label="Shop categories">
      <Link href="/" className="shrink-0 rounded-full border border-[#ead7c4] bg-white px-3 py-2 text-[10px] font-semibold text-[#68452e]">Home</Link>
      <Link href="/shop" aria-current={!current ? "page" : undefined} className={`shrink-0 rounded-full px-3 py-2 text-[10px] font-semibold ${!current ? "bg-[#713511] text-white" : "border border-[#ead7c4] bg-white text-[#68452e]"}`}>All products</Link>
      {shopCategories.map((category) => <Link key={category.slug} href={`/shop/${category.slug}`} className="shrink-0 rounded-full border border-[#ead7c4] bg-white px-3 py-2 text-[10px] font-semibold text-[#68452e]">{category.emoji} {category.title}</Link>)}
      <Link href="/about" className="shrink-0 rounded-full border border-[#ead7c4] bg-white px-3 py-2 text-[10px] font-semibold text-[#68452e]">About</Link>
      <Link href="/contact" className="shrink-0 rounded-full border border-[#ead7c4] bg-white px-3 py-2 text-[10px] font-semibold text-[#68452e]">Contact</Link>
    </nav>
  </header>
);

const ProductGrid = ({ items }: { items: readonly ProductItem[] }): ReactElement => (
  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
    {items.map((item) => <article key={item.image} className="group overflow-hidden rounded-[20px] border border-[#eee3d8] bg-white shadow-[0_12px_30px_-24px_rgba(67,37,18,0.6)] transition duration-300 hover:-translate-y-1 hover:border-[#dec5ae] hover:shadow-[0_22px_42px_-24px_rgba(67,37,18,0.42)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#f1ebe4]"><Image src={item.image} alt={item.alt} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw" className="object-cover transition duration-500 group-hover:scale-105" /><span className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/25 to-transparent" /></div>
      <div className="flex min-h-[88px] items-center justify-between gap-2 px-3.5 py-3"><div className="min-w-0"><p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-[#a0785b]">Sweet Aroma</p><h2 className="mt-1 text-[11px] font-bold leading-4 text-[#432819] sm:text-xs">{item.name}</h2></div><a aria-label={`Ask about ${item.name}`} href={`${whatsappUrl}${encodeURIComponent(`Hi Sweet Aroma, is ${item.name} available?`)}`} target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#fff5ea] px-3 py-2 text-[10px] font-bold text-[#713511] transition hover:bg-[#713511] hover:text-white">Ask us <ArrowRight className="size-3" /></a></div>
    </article>)}
  </div>
);

const ShopHomePage = (): ReactElement => (
    <main className="min-h-screen bg-[linear-gradient(180deg,#fffaf4_0%,#faf5ee_100%)] text-[#392113]">
    <CategoryHeader />
    <section className="relative overflow-hidden border-b border-[#ead8c4] bg-[radial-gradient(ellipse_at_80%_20%,rgba(255,255,255,0.9),transparent_36%),linear-gradient(125deg,#f4e2cb,#fbf5ec_62%,#f7e6d2)] px-5 py-14 sm:py-[76px]">
      <div className="absolute -right-16 -top-32 size-[340px] rounded-full border border-[#d8bda1]/30 sm:size-[480px]" /><div className="absolute -right-4 -top-20 size-[250px] rounded-full border border-[#d8bda1]/25 sm:size-[390px]" />
      <div className="relative mx-auto max-w-[1100px]"><span className="inline-flex items-center gap-2 rounded-full border border-[#e8d8c5] bg-white/75 px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#7b421f] shadow-sm"><ShoppingBag className="size-3.5" /> Sweet Aroma collections</span><h1 className="mt-5 font-serif text-[40px] font-bold leading-[1.04] tracking-[-0.045em] text-[#542a14] sm:text-[58px]">What are you<br className="sm:hidden" /> craving?</h1><p className="mt-4 max-w-[620px] text-sm leading-6 text-[#796858] sm:text-base">Choose a collection to explore cakes, cookies, fresh bakery treats, sweets, nimko and gift packs.</p></div>
    </section>
    <section className="mx-auto max-w-[1400px] px-5 py-10 sm:px-8 sm:py-14 lg:px-10">
      <div className="mb-6 flex items-end justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[0.17em] text-[#a36337]">Find your favourite</p><h2 className="mt-1.5 font-serif text-[28px] font-bold tracking-[-0.04em] text-[#542a14] sm:text-[34px]">Shop by collection</h2></div><span className="hidden text-xs text-[#8b7865] sm:block">{shopCategories.length} fresh collections</span></div>
      <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-6">{shopCategories.map((category) => <Link key={category.slug} href={`/shop/${category.slug}`} className="group overflow-hidden rounded-[20px] border border-[#eee0ce] bg-white shadow-[0_12px_30px_-24px_rgba(67,37,18,0.6)] transition duration-300 hover:-translate-y-1 hover:border-[#dec5ae] hover:shadow-[0_22px_42px_-24px_rgba(67,37,18,0.42)]"><span className="relative block aspect-[4/3] overflow-hidden bg-[#f8ead8]"><Image src={category.image} alt={category.alt} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw" className="object-cover transition duration-500 group-hover:scale-105" /><span className="absolute left-3 top-3 grid size-9 place-items-center rounded-xl border border-white/70 bg-white/90 text-lg shadow-sm backdrop-blur-sm" aria-hidden="true">{category.emoji}</span></span><span className="flex items-center justify-between gap-2 px-3.5 py-3.5"><span className="block text-[12px] font-bold text-[#542a14] sm:text-sm">{category.title}<span className="mt-1 block text-[9px] font-medium text-[#8b7865]">Explore collection</span></span><span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#fff5ea] text-[#8b542b] transition group-hover:bg-[#713511] group-hover:text-white"><ArrowRight className="size-3.5" /></span></span></Link>)}</div>
    </section>
    <footer className="bg-[#32190f] px-5 py-7 text-center text-xs text-white/70">Freshly made with care · <a className="font-semibold text-[#f0c996]" href={`${whatsappUrl}${encodeURIComponent("Hello Sweet Aroma, I have a question.")}`}>Contact us <Phone className="inline size-3" /></a><p className="mt-3 text-[10px] text-white/45">© 2026 Sweet Aroma Bakery & Sweets</p></footer>
  </main>
);

const CategoryPage = ({ slug }: { slug: string }): ReactElement => {
  if (slug === "cakes") {
    return <main className="min-h-screen bg-[#fffaf4] text-[#392113]"><CategoryHeader current={slug} /><CakeCollection /></main>;
  }

  if (!(slug in collections)) return <ShopHomePage />;
  const collection = collections[slug as CollectionSlug];
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#fffaf4_0%,#faf5ee_100%)] text-[#392113]">
      <CategoryHeader current={slug} />
      <section className="relative isolate min-h-[330px] overflow-hidden border-b border-[#eee0ce] bg-[#6d391d] px-5 py-11 sm:min-h-[390px] sm:py-14">
        <Image src={collection.heroImage} alt={collection.heroAlt} fill priority sizes="100vw" className="absolute inset-0 -z-20 object-cover object-center" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(37,20,12,0.86)_0%,rgba(53,29,16,0.67)_46%,rgba(61,30,12,0.13)_100%)]" />
        <div className="relative mx-auto flex min-h-[240px] max-w-[1200px] flex-col justify-center sm:min-h-[270px]"><Link href="/shop" className="inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/12 px-3.5 py-2 text-xs font-semibold text-white backdrop-blur-sm transition hover:bg-white/25"><ArrowLeft className="size-3.5" /> All collections</Link><p className="mt-6 text-[10px] font-bold uppercase tracking-[0.16em] text-[#ffe1bd]">{collection.eyebrow}</p><h1 className="mt-2 font-serif text-[42px] font-bold tracking-[-0.045em] text-white drop-shadow-sm sm:text-[58px]">{collection.title}</h1><p className="mt-3 max-w-[640px] text-sm leading-6 text-white/90 sm:text-base">{collection.description}</p></div>
      </section>
      <section className="mx-auto max-w-[1400px] px-5 py-9 sm:px-8 sm:py-14 lg:px-10"><div className="mb-5 flex items-baseline justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[0.17em] text-[#a36337]">Freshly selected</p><h2 className="mt-1 font-serif text-[27px] font-bold tracking-[-0.04em] text-[#542a14]">The collection</h2></div><span className="text-[10px] text-[#8b7865]">{collection.items.length} items</span></div><ProductGrid items={collection.items} /></section>
      <footer className="bg-[#32190f] py-6 text-center text-xs text-white/70">Want to order? <a className="font-bold text-[#f0c996]" href={`${whatsappUrl}${encodeURIComponent(`Hi Sweet Aroma, please share details for ${collection.title}.`)}`} target="_blank" rel="noreferrer">Message Sweet Aroma <ArrowRight className="inline size-3.5" /></a><p className="mt-3 text-[10px] text-white/45">© 2026 Sweet Aroma Bakery & Sweets</p></footer>
    </main>
  );
};

export const ShopPage = (): ReactElement => <ShopHomePage />;
export const CollectionPage = ({ slug }: { slug: string }): ReactElement => <CategoryPage slug={slug} />;
