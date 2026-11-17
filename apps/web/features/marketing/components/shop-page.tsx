"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { ReactElement } from "react";
import { ArrowLeft, ArrowRight, Check, Phone, ShoppingCart, X } from "lucide-react";
import CakeCollection from "./cake-collection";
import { useBakeryCart } from "./use-bakery-cart";

const whatsappUrl = "https://wa.me/923128869242?text=";

export const shopCategories = [
  { title: "Cakes", emoji: "🧁", slug: "cakes", image: "/cakes/chocolate-cream-sheet-cake.png", alt: "Chocolate cherry sheet cake from the cake collection" },
  { title: "Cookies", emoji: "🍪", slug: "cookies", image: "/cookies/cookie-02.png", alt: "Fresh chocolate chunk cookies" },
  { title: "Bakery Items", emoji: "🥐", slug: "bakery-items", image: "/bakery-gallery/croissants.png", alt: "Fresh almond croissants" },
  { title: "Sweets", emoji: "🍡", slug: "sweets", image: "/bakery-gallery/traditional-sweets.svg", alt: "Traditional gulab jamun sweets" },
  { title: "Nimko", emoji: "🥣", slug: "nimko", image: "/nimko/nimko-spicy-bowl.png", alt: "A bowl of crunchy spicy nimko" },
  { title: "Gift Packs", emoji: "🎁", slug: "gift-packs", image: "/bakery-gallery/dessert-table.png", alt: "A celebration table with bakery treats for sharing" }
] as const;
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
  <header className="sticky top-0 z-30 border-b border-white/10 bg-[#3a2418] text-[#fff7eb] shadow-[0_12px_28px_-20px_rgba(30,16,8,0.8)]">
    <div className="mx-auto flex min-h-[86px] max-w-[1400px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-10">
      <Link href="/" aria-label="Sweet Aroma home" className="rounded-xl bg-[#f8ead5] px-2"><Image src="/sweet-aroma-logo-original.png" alt="Sweet Aroma Bakery & Sweets" width={1536} height={1024} className="h-[66px] w-[100px] object-contain sm:h-[74px] sm:w-[112px]" /></Link>
      <nav className="hidden items-center gap-1 md:flex" aria-label="Shop categories">
        <Link href="/" className="rounded-full px-3 py-2 text-xs font-semibold text-white/80 transition hover:bg-white/10">Home</Link>
        <Link href="/shop" aria-current={!current ? "page" : undefined} className={`rounded-full px-3 py-2 text-xs font-semibold transition ${!current ? "bg-[#dfa853] text-[#2d1a10]" : "text-white/80 hover:bg-white/10"}`}>All products</Link>
        {shopCategories.map((category) => <Link key={category.slug} href={`/shop/${category.slug}`} aria-current={current === category.slug ? "page" : undefined} className={`rounded-full px-3 py-2 text-xs font-semibold ${current === category.slug ? "bg-[#dfa853] text-[#2d1a10]" : "text-white/80 hover:bg-white/10"}`}>{category.title}</Link>)}
        <Link href="/about" className="rounded-full px-3 py-2 text-xs font-semibold text-white/80 transition hover:bg-white/10">About</Link>
      </nav>
      <Link href="/contact" className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[#e8d5bf] bg-white px-4 py-2.5 text-xs font-semibold text-[#633315] transition hover:bg-[#fff1df]"><Phone className="size-3.5" /><span className="hidden sm:inline">Contact</span></Link>
    </div>
    <nav className="flex gap-2 overflow-x-auto border-t border-[#f1e5d9] px-4 py-2.5 md:hidden" aria-label="Shop categories">
      <Link href="/" className="shrink-0 rounded-full border border-white/20 px-3 py-2 text-[10px] font-semibold text-white/80">Home</Link>
      <Link href="/shop" aria-current={!current ? "page" : undefined} className={`shrink-0 rounded-full px-3 py-2 text-[10px] font-semibold ${!current ? "bg-[#dfa853] text-[#2d1a10]" : "border border-white/20 text-white/80"}`}>All products</Link>
      {shopCategories.map((category) => <Link key={category.slug} href={`/shop/${category.slug}`} className="shrink-0 rounded-full border border-white/20 px-3 py-2 text-[10px] font-semibold text-white/80">{category.title}</Link>)}
      <Link href="/about" className="shrink-0 rounded-full border border-white/20 px-3 py-2 text-[10px] font-semibold text-white/80">About</Link>
      <Link href="/contact" className="shrink-0 rounded-full border border-white/20 px-3 py-2 text-[10px] font-semibold text-white/80">Contact</Link>
    </nav>
  </header>
);

const samplePriceFor = (slug: string, item: ProductItem, index: number): number => {
  if (slug === "cookies") {
    if (item.image === "/cookies/cookie-02.png") return 320;
    if (item.image === "/cookies/cookie-01.png") return 280;
    return 280 + (index % 5) * 40;
  }
  if (slug === "bakery-items") return item.image === "/bakery-gallery/croissants.png" ? 450 : 600;
  if (slug === "sweets") return item.image === "/bakery-gallery/traditional-sweets.svg" ? 950 : 1200;
  if (slug === "nimko") return item.image === "/nimko/nimko-spicy-bowl.png" ? 480 : 280 + index * 50;
  if (slug === "gift-packs") return item.image === "/bakery-gallery/dessert-table.png" ? 1200 : 950;
  return 1800 + index * 500;
};

const ProductGrid = ({ items, slug }: { items: readonly ProductItem[]; slug: string }): ReactElement => {
  const cart = useBakeryCart();
  const [previewItem, setPreviewItem] = useState<ProductItem | null>(null);
  const orderText = encodeURIComponent(`Hi Sweet Aroma, I would like to order: ${cart.items.map((entry) => `${entry.name} x${entry.quantity}`).join(", ")}. Sample menu total: Rs. ${cart.total.toLocaleString("en-PK")} (please confirm).`);

  return <>
    <p className="mb-4 text-right text-[10px] font-medium text-[#8b7865]">Sample menu prices · please confirm before ordering</p>
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
      {items.map((item, index) => {
        const price = samplePriceFor(slug, item, index);
        const id = `${slug}:${item.image}`;
        const added = cart.items.some((entry) => entry.id === id);
        return <article key={item.image} className="group overflow-hidden rounded-[14px] border border-[#eadbc7] bg-[#fffaf2] shadow-[0_18px_38px_-30px_rgba(67,37,18,0.5)] transition duration-300 hover:-translate-y-1 hover:border-[#c8a363] hover:shadow-[0_24px_44px_-28px_rgba(67,37,18,0.35)]">
          <button type="button" onClick={() => setPreviewItem(item)} aria-label={`View full-size image of ${item.name}`} className="group/image relative block aspect-[4/3] w-full overflow-hidden bg-[#f1e5d3] text-left"><Image src={item.image} alt={item.alt} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw" className="object-cover transition duration-500 group-hover/image:scale-105" /><span className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/25 to-transparent" /><span className="absolute bottom-2 right-2 rounded-full bg-white/90 px-2.5 py-1.5 text-[9px] font-semibold text-[#542a14] opacity-0 shadow-sm transition group-hover/image:opacity-100">View full image</span></button>
          <div className="px-3.5 py-3 sm:px-4"><p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-[#a0785b]">Sweet Aroma</p><h2 className="mt-1 min-h-9 font-serif text-[12px] font-bold leading-4 text-[#432819] sm:text-sm">{item.name}</h2><div className="mt-2 flex items-center justify-between gap-2"><p className="font-bold text-[#80551e]">Rs. {price.toLocaleString("en-PK")}</p><button type="button" onClick={() => cart.addItem({ id, name: item.name, price, image: item.image, category: slug })} className="inline-flex h-9 items-center gap-1.5 rounded-md bg-[#3a2418] px-3 text-[10px] font-bold uppercase tracking-[0.06em] text-white transition hover:bg-[#59371f]">{added ? <Check className="size-3.5 text-[#e1ad58]" /> : <ShoppingCart className="size-3.5 text-[#e1ad58]" />}{added ? `Add (${cart.items.find((entry) => entry.id === id)?.quantity ?? 0})` : "Add"}</button></div></div>
        </article>;
      })}
    </div>
    {cart.count > 0 && <aside className="fixed inset-x-4 bottom-4 z-40 mx-auto flex max-w-[720px] items-center justify-between gap-4 rounded-2xl border border-[#e8d5bf] bg-[#fffaf2] px-4 py-3 shadow-[0_18px_55px_-18px_rgba(43,23,13,0.55)] sm:inset-x-6 sm:px-5"><div><p className="text-xs font-bold text-[#542a14]">{cart.count} {cart.count === 1 ? "item" : "items"} in your cart</p><p className="mt-0.5 text-[10px] text-[#806c55]">Sample total: Rs. {cart.total.toLocaleString("en-PK")}</p></div><a href={`${whatsappUrl}${orderText}`} className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#3a2418] px-4 py-3 text-xs font-bold text-white transition hover:bg-[#59371f]">Continue on WhatsApp <ArrowRight className="size-4 text-[#e1ad58]" /></a></aside>}
    {previewItem && <div className="fixed inset-0 z-50 grid place-items-center bg-[#1b110b]/90 p-4 sm:p-8" role="dialog" aria-modal="true" aria-label={previewItem.name} onClick={() => setPreviewItem(null)}><button type="button" aria-label="Close image preview" onClick={() => setPreviewItem(null)} className="absolute right-4 top-4 grid size-11 place-items-center rounded-full border border-white/30 bg-black/30 text-white transition hover:bg-white/15 sm:right-8 sm:top-8"><X className="size-5" /></button><div className="relative h-[min(82vh,900px)] w-full max-w-[1280px]" onClick={(event) => event.stopPropagation()}><Image src={previewItem.image} alt={previewItem.alt} fill sizes="100vw" className="object-contain" /><p className="absolute inset-x-0 -bottom-8 text-center font-serif text-sm font-semibold text-white sm:-bottom-9 sm:text-base">{previewItem.name}</p></div></div>}
  </>;
};

const ShopHomePage = (): ReactElement => (
    <main className="min-h-screen bg-[#f9f2e7] text-[#392113]">
    <CategoryHeader />
    <section className="bg-[#28170f] px-5 py-14 text-[#fff7eb] sm:py-[76px]">
      <div className="mx-auto max-w-[1200px]"><p className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.22em] text-[#dfa853] before:h-px before:w-8 before:bg-[#dfa853]">Sweet Aroma collections</p><h1 className="mt-4 font-serif text-[40px] font-bold leading-[1.04] tracking-[-0.045em] sm:text-[58px]">What are you<br className="sm:hidden" /> craving?</h1><p className="mt-4 max-w-[620px] text-sm leading-6 text-white/70 sm:text-base">Choose a collection to explore cakes, cookies, fresh bakery treats, sweets, nimko and gift packs.</p></div>
    </section>
    <section className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 sm:py-14 lg:px-10">
      <div className="mb-6 flex items-end justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[0.17em] text-[#a36337]">Find your favourite</p><h2 className="mt-1.5 font-serif text-[28px] font-bold tracking-[-0.04em] text-[#542a14] sm:text-[34px]">Shop by collection</h2></div><span className="hidden text-xs text-[#8b7865] sm:block">{shopCategories.length} fresh collections</span></div>
      <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-6">{shopCategories.map((category) => <Link key={category.slug} href={`/shop/${category.slug}`} className="group overflow-hidden rounded-[14px] border border-[#eadbc7] bg-[#fffaf2] shadow-[0_18px_38px_-30px_rgba(67,37,18,0.5)] transition duration-300 hover:-translate-y-1 hover:border-[#c8a363] hover:shadow-[0_24px_44px_-28px_rgba(67,37,18,0.35)]"><span className="relative block aspect-[4/3] overflow-hidden bg-[#f1e5d3]"><Image src={category.image} alt={category.alt} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw" className="object-cover transition duration-500 group-hover:scale-105" /><span className="absolute left-3 top-3 grid size-9 place-items-center rounded-lg border border-white/70 bg-white/90 text-lg shadow-sm backdrop-blur-sm" aria-hidden="true">{category.emoji}</span></span><span className="flex items-center justify-between gap-2 px-3.5 py-3.5"><span className="block font-serif text-[13px] font-bold text-[#542a14] sm:text-[15px]">{category.title}<span className="mt-1 block font-sans text-[9px] font-medium text-[#8b7865]">Explore collection</span></span><span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#f1e4d0] text-[#8b542b] transition group-hover:bg-[#3a2418] group-hover:text-white"><ArrowRight className="size-3.5" /></span></span></Link>)}</div>
    </section>
    <footer className="bg-[#28170f] px-5 py-7 text-center text-xs text-white/70">Freshly made with care · <a className="font-semibold text-[#e7b65e]" href={`${whatsappUrl}${encodeURIComponent("Hello Sweet Aroma, I have a question.")}`}>Contact us <Phone className="inline size-3" /></a><p className="mt-3 text-[10px] text-white/45">© 2026 Sweet Aroma Bakery &amp; Sweets</p></footer>
  </main>
);

const CategoryPage = ({ slug }: { slug: string }): ReactElement => {
  if (slug === "cakes") {
    return <main className="min-h-screen bg-[#f9f2e7] text-[#392113]"><CategoryHeader current={slug} /><CakeCollection /></main>;
  }

  if (!(slug in collections)) return <ShopHomePage />;
  const collection = collections[slug as CollectionSlug];
  return (
    <main className="min-h-screen bg-[#f9f2e7] text-[#392113]">
      <CategoryHeader current={slug} />
      <section className="relative isolate min-h-[330px] overflow-hidden border-b border-[#eee0ce] bg-[#6d391d] px-5 py-11 sm:min-h-[390px] sm:py-14">
        <Image src={collection.heroImage} alt={collection.heroAlt} fill priority sizes="100vw" className="absolute inset-0 -z-20 object-cover object-center" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(37,20,12,0.86)_0%,rgba(53,29,16,0.67)_46%,rgba(61,30,12,0.13)_100%)]" />
        <div className="relative mx-auto flex min-h-[240px] max-w-[1200px] flex-col justify-center sm:min-h-[270px]"><Link href="/shop" className="inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/12 px-3.5 py-2 text-xs font-semibold text-white backdrop-blur-sm transition hover:bg-white/25"><ArrowLeft className="size-3.5" /> All collections</Link><p className="mt-6 text-[10px] font-bold uppercase tracking-[0.16em] text-[#ffe1bd]">{collection.eyebrow}</p><h1 className="mt-2 font-serif text-[42px] font-bold tracking-[-0.045em] text-white drop-shadow-sm sm:text-[58px]">{collection.title}</h1><p className="mt-3 max-w-[640px] text-sm leading-6 text-white/90 sm:text-base">{collection.description}</p></div>
      </section>
      <section className="mx-auto max-w-[1400px] px-5 py-9 sm:px-8 sm:py-14 lg:px-10"><div className="mb-5 flex items-baseline justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[0.17em] text-[#a36337]">Freshly selected</p><h2 className="mt-1 font-serif text-[27px] font-bold tracking-[-0.04em] text-[#542a14]">The collection</h2></div><span className="text-[10px] text-[#8b7865]">{collection.items.length} items</span></div><ProductGrid items={collection.items} slug={slug} /></section>
      <footer className="bg-[#28170f] py-6 text-center text-xs text-white/70">Want to order? <a className="font-bold text-[#e7b65e]" href={`${whatsappUrl}${encodeURIComponent(`Hi Sweet Aroma, please share details for ${collection.title}.`)}`} target="_blank" rel="noreferrer">Message Sweet Aroma <ArrowRight className="inline size-3.5" /></a><p className="mt-3 text-[10px] text-white/45">© 2026 Sweet Aroma Bakery &amp; Sweets</p></footer>
    </main>
  );
};

export const ShopPage = (): ReactElement => <ShopHomePage />;
export const CollectionPage = ({ slug }: { slug: string }): ReactElement => <CategoryPage slug={slug} />;
