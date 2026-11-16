import Image from "next/image";
import Link from "next/link";
import type { ReactElement } from "react";
import { ArrowLeft, ArrowRight, Phone, ShoppingBag } from "lucide-react";
import CakeCollection from "./cake-collection";

const whatsappUrl = "https://wa.me/923128869242?text=";

export const shopCategories = [
  { title: "Cakes", emoji: "🧁", slug: "cakes" },
  { title: "Cookies", emoji: "🍪", slug: "cookies" },
  { title: "Bakery Items", emoji: "🥐", slug: "bakery-items" },
  { title: "Sweets", emoji: "🍡", slug: "sweets" },
  { title: "Nimko", emoji: "🥣", slug: "nimko" },
  { title: "Gift Packs", emoji: "🎁", slug: "gift-packs" }
] as const;
export const shopCategorySlugs = shopCategories.map(({ slug }) => slug);

const collections = {
  cookies: {
    title: "Cookies",
    eyebrow: "Freshly baked favourites",
    description: "Explore chocolate chip, jam-filled, butter cookies and classic tea biscuits.",
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
    items: [
      { name: "Almond Croissants", image: "/bakery-gallery/croissants.png", alt: "Fresh almond croissants cooling on a bakery rack" },
      { name: "Fresh Pastry Selection", image: "/bakery-gallery/bakery-display.png", alt: "Pastries arranged beneath glass cake stands" }
    ]
  },
  sweets: {
    title: "Traditional Sweets",
    eyebrow: "A little sweetness for every occasion",
    description: "Classic mithai favourites for sharing, celebrations and thoughtful gifting.",
    items: [
      { name: "Gulab Jamun", image: "/bakery-gallery/traditional-sweets.svg", alt: "Golden gulab jamun traditional sweets" },
      { name: "Sweet Celebration Selection", image: "/bakery-gallery/dessert-table.png", alt: "A colourful table of celebration sweets and cakes" }
    ]
  },
  nimko: {
    title: "Crispy Nimko",
    eyebrow: "Savoury favourites",
    description: "Pick a crunchy mix and message us to ask about available pack sizes.",
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
    items: [
      { name: "Sweet Aroma Celebration Box", image: "/bakery-gallery/dessert-table.png", alt: "A beautifully arranged bakery dessert table ready for a celebration" },
      { name: "Traditional Sweet Selection", image: "/bakery-gallery/traditional-sweets.svg", alt: "Traditional sweets arranged for gifting" }
    ]
  }
} as const;

type CollectionSlug = keyof typeof collections;
type ProductItem = { readonly name: string; readonly image: string; readonly alt: string };

const CategoryHeader = ({ current }: { current?: string }): ReactElement => (
  <header className="border-b border-[#eee0ce] bg-[#fffaf4]">
    <div className="mx-auto flex min-h-[86px] max-w-[1400px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-10">
      <Link href="/" aria-label="Sweet Aroma home"><Image src="/sweet-aroma-logo-original.png" alt="Sweet Aroma Bakery & Sweets" width={1536} height={1024} className="h-[72px] w-[108px] rounded-xl object-contain sm:h-[82px] sm:w-[123px]" /></Link>
      <nav className="hidden items-center gap-1 md:flex" aria-label="Shop categories">
        <Link href="/shop" className={`rounded-full px-3 py-2 text-xs font-semibold ${!current ? "bg-[#713511] text-white" : "text-[#68452e] hover:bg-[#f8ecdc]"}`}>All products</Link>
        {shopCategories.map((category) => <Link key={category.slug} href={`/shop/${category.slug}`} aria-current={current === category.slug ? "page" : undefined} className={`rounded-full px-3 py-2 text-xs font-semibold ${current === category.slug ? "bg-[#713511] text-white" : "text-[#68452e] hover:bg-[#f8ecdc]"}`}>{category.title}</Link>)}
      </nav>
      <Link href="/" className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[#e8d5bf] bg-white px-4 py-2.5 text-xs font-semibold text-[#633315] transition hover:bg-[#fff1df]"><ArrowLeft className="size-3.5" /><span className="hidden sm:inline">Home</span></Link>
    </div>
    <nav className="flex gap-2 overflow-x-auto border-t border-[#f1e5d9] px-4 py-2.5 md:hidden" aria-label="Shop categories">
      <Link href="/shop" className="shrink-0 rounded-full bg-[#713511] px-3 py-2 text-[10px] font-semibold text-white">All products</Link>
      {shopCategories.map((category) => <Link key={category.slug} href={`/shop/${category.slug}`} className="shrink-0 rounded-full border border-[#ead7c4] bg-white px-3 py-2 text-[10px] font-semibold text-[#68452e]">{category.emoji} {category.title}</Link>)}
    </nav>
  </header>
);

const ProductGrid = ({ items }: { items: readonly ProductItem[] }): ReactElement => (
  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
    {items.map((item) => <article key={item.image} className="group overflow-hidden rounded-[18px] border border-[#eee5d9] bg-white shadow-[0_8px_24px_-20px_rgba(87,44,18,0.42)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#f1ebe4]"><Image src={item.image} alt={item.alt} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw" className="object-cover transition duration-500 group-hover:scale-105" /></div>
      <div className="flex min-h-[70px] items-center justify-between gap-2 px-3 py-2.5"><h2 className="text-[11px] font-bold leading-4 text-[#432819] sm:text-xs">{item.name}</h2><a aria-label={`Ask about ${item.name}`} href={`${whatsappUrl}${encodeURIComponent(`Hi Sweet Aroma, is ${item.name} available?`)}`} target="_blank" rel="noreferrer" className="shrink-0 text-[10px] font-semibold text-[#8d4a22]">Ask us</a></div>
    </article>)}
  </div>
);

const ShopHomePage = (): ReactElement => (
  <main className="min-h-screen bg-[linear-gradient(180deg,#fffaf4_0%,#faf5ee_100%)] text-[#392113]">
    <CategoryHeader />
    <section className="border-b border-[#eee0ce] bg-[#f8ead8] px-5 py-12 sm:py-16">
      <div className="mx-auto max-w-[1100px]"><span className="inline-flex items-center gap-2 rounded-full border border-[#e8d8c5] bg-white/70 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#7b421f]"><ShoppingBag className="size-3.5" /> Sweet Aroma collections</span><h1 className="mt-4 font-serif text-[36px] font-bold tracking-[-0.04em] text-[#542a14] sm:text-[48px]">What are you craving?</h1><p className="mt-3 max-w-[620px] text-sm leading-6 text-[#796858]">Choose a collection to explore cakes, cookies, fresh bakery treats, sweets, nimko and gift packs.</p></div>
    </section>
    <section className="mx-auto max-w-[1400px] px-5 py-9 sm:px-8 sm:py-12 lg:px-10">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">{shopCategories.map((category) => <Link key={category.slug} href={`/shop/${category.slug}`} className="group flex min-h-36 flex-col items-center justify-center rounded-2xl border border-[#eee0ce] bg-white px-3 py-5 text-center shadow-sm transition hover:-translate-y-1 hover:bg-[#fff4e7] hover:shadow-md"><span className="text-4xl transition group-hover:scale-110">{category.emoji}</span><span className="mt-3 text-sm font-bold text-[#542a14]">{category.title}</span><span className="mt-1 inline-flex items-center gap-1 text-[10px] font-semibold text-[#8b542b]">Browse collection <ArrowRight className="size-3" /></span></Link>)}</div>
    </section>
    <footer className="border-t border-[#eee0ce] bg-[#fffaf4] py-5 text-center text-xs text-[#796858]">Freshly made with care · <a className="font-semibold text-[#75401d]" href={`${whatsappUrl}${encodeURIComponent("Hello Sweet Aroma, I have a question.")}`}>Contact us <Phone className="inline size-3" /></a></footer>
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
      <section className="border-b border-[#eee0ce] bg-[#f8ead8] px-5 py-10 sm:py-14">
        <div className="mx-auto max-w-[1200px]"><Link href="/shop" className="inline-flex items-center gap-2 text-xs font-semibold text-[#75401d] hover:text-[#542a14]"><ArrowLeft className="size-3.5" /> All collections</Link><p className="mt-5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#9b5428]">{collection.eyebrow}</p><h1 className="mt-2 font-serif text-[34px] font-bold tracking-[-0.04em] text-[#542a14] sm:text-[44px]">{collection.title}</h1><p className="mt-3 max-w-[640px] text-sm leading-6 text-[#796858]">{collection.description}</p></div>
      </section>
      <section className="mx-auto max-w-[1400px] px-5 py-8 sm:px-8 sm:py-12 lg:px-10"><ProductGrid items={collection.items} /></section>
      <footer className="border-t border-[#eee0ce] bg-[#fffaf4] py-5 text-center text-xs text-[#796858]">Want to order? <a className="font-bold text-[#75401d]" href={`${whatsappUrl}${encodeURIComponent(`Hi Sweet Aroma, please share details for ${collection.title}.`)}`} target="_blank" rel="noreferrer">Message Sweet Aroma</a></footer>
    </main>
  );
};

export const ShopPage = (): ReactElement => <ShopHomePage />;
export const CollectionPage = ({ slug }: { slug: string }): ReactElement => <CategoryPage slug={slug} />;
