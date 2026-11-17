"use client";

import type { ReactElement } from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, ChevronDown, Clock3, Heart, House, Menu, Minus, Music2, Phone, Plus, Search, ShieldCheck, ShoppingBag, ShoppingCart, Truck, UserRound, X } from "lucide-react";
import { useBakeryCart } from "./use-bakery-cart";
const whatsappUrl = "https://wa.me/923128869242?text=Hi%20Sweet%20Aroma%2C%20I%27d%20like%20to%20place%20an%20order.";

const categories = [
  { title: "Cakes", emoji: "🧁", image: "/cakes/chocolate-cream-sheet-cake.png", alt: "Chocolate cherry sheet cake", href: "/shop/cakes" },
  { title: "Cookies", emoji: "🍪", image: "/cookies/cookie-02.png", alt: "Fresh cookies", href: "/shop/cookies" },
  { title: "Bakery Items", emoji: "🥐", image: "/bakery-gallery/croissants.png", alt: "Fresh croissants", href: "/shop/bakery-items" },
  { title: "Sweets", emoji: "🍡", image: "/bakery-gallery/traditional-sweets.svg", alt: "Traditional sweets", href: "/shop/sweets" },
  { title: "Nimko", emoji: "🥣", image: "/nimko/nimko-spicy-bowl.png", alt: "Crunchy nimko", href: "/shop/nimko" },
  { title: "Gift Packs", emoji: "🎁", image: "/bakery-gallery/dessert-table.png", alt: "Celebration treats for gifting", href: "/shop/gift-packs" }
] as const;

const products = [
  { name: "Chocolate Cherry Sheet Cake", price: 1800, image: "/cakes/chocolate-cream-sheet-cake.png", alt: "Chocolate drip sheet cake topped with cream swirls and cherries", category: "Cakes" },
  { name: "Chocolate Chunk Cookies", price: 320, image: "/cookies/cookie-02.png", alt: "Freshly baked chunky cookies with chocolate pieces", category: "Cookies" },
  { name: "Fresh Croissants", price: 450, image: "/bakery-gallery/croissants.png", alt: "Fresh almond croissants cooling on a bakery rack", category: "Bakery Items" },
  { name: "Traditional Sweet Box", price: 950, image: "/bakery-gallery/traditional-sweets.svg", alt: "A plate of traditional gulab jamun sweets", category: "Sweets" },
  { name: "Mix Nimko", price: 480, image: "/nimko/nimko-spicy-bowl.png", alt: "A bowl of colorful spicy nimko with peanuts", category: "Nimko" },
  { name: "Sweet Aroma Gift Box", price: 1200, image: "/bakery-gallery/dessert-table.png", alt: "A beautifully arranged bakery dessert table", category: "Gift Packs" }
] as const;

type Product = (typeof products)[number];

const ProductCard = ({ product, onAdd, onPreview, quantity }: { product: Product; onAdd: (product: Product) => void; onPreview: (product: Product) => void; quantity: number }): ReactElement => (
  <article className="group overflow-hidden rounded-[14px] border border-[#eadbc7] bg-[#fffaf2] shadow-[0_18px_38px_-30px_rgba(67,37,18,0.5)] transition duration-300 hover:-translate-y-1 hover:border-[#c8a363] hover:shadow-[0_24px_44px_-28px_rgba(67,37,18,0.35)]">
    <button type="button" onClick={() => onPreview(product)} aria-label={`View full-size image of ${product.name}`} className="group/image relative block aspect-[4/3] w-full overflow-hidden bg-[#f1e5d3] text-left">
      <Image src={product.image} alt={product.alt} fill sizes="(max-width: 640px) 50vw, (max-width: 1200px) 25vw, 240px" className="object-cover transition duration-500 group-hover:scale-105" />
      <span className="absolute left-3 top-3 bg-[#fff8ec]/95 px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-[0.12em] text-[#76572f] shadow-sm">{product.category}</span>
      <span className="absolute bottom-3 right-3 rounded-full bg-white/90 px-2.5 py-1.5 text-[9px] font-semibold text-[#542a14] opacity-0 shadow-sm transition group-hover/image:opacity-100">View full image</span>
    </button>
    <div className="px-2.5 pb-3 pt-3 sm:px-4 sm:pb-4">
      <Link href={`/shop/${product.category.toLowerCase().replaceAll(" ", "-")}`} className="block min-h-10 text-left font-serif text-[12px] font-bold leading-4 text-[#3f2414] hover:text-[#8d4a22] sm:min-h-9 sm:text-[16px] sm:leading-5">{product.name}</Link>
      <div className="mt-2 flex min-w-0 items-center justify-between gap-1.5"><p className="whitespace-nowrap text-[12px] font-bold text-[#80551e] sm:text-[15px]">Rs. {product.price.toLocaleString("en-PK")}</p><span className="hidden text-[9px] font-medium text-[#927e6b] sm:inline">Fresh selection</span></div>
      <div className="mt-3 flex min-w-0 items-center gap-1.5 sm:gap-2"><Link href={`/shop/${product.category.toLowerCase().replaceAll(" ", "-")}`} className="inline-flex h-10 min-w-0 flex-1 items-center justify-center gap-1 rounded-md bg-[#3a2418] px-2 text-[9px] font-bold uppercase tracking-[0.06em] text-white transition hover:bg-[#59371f] sm:h-9 sm:px-3 sm:text-[10px] sm:tracking-[0.1em]">Explore <ArrowRight className="size-3.5 shrink-0 text-[#e1ad58]" /></Link><button type="button" aria-label={`Add ${product.name} to cart`} onClick={() => onAdd(product)} className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-[#d8c4a7] text-[#633f1c] transition hover:border-[#80551e] hover:bg-[#f7ecd9] sm:h-9 sm:w-auto sm:gap-1.5 sm:px-3 sm:text-[10px] sm:font-bold sm:uppercase sm:tracking-[0.08em]"><ShoppingCart className="size-4 shrink-0" /><span className="hidden sm:inline">{quantity > 0 ? `Add (${quantity})` : "Add"}</span></button></div>
    </div>
  </article>
);

const BakeryHomePage = (): ReactElement => {
  const [searchQuery, setSearchQuery] = useState("");
  const cart = useBakeryCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [previewProduct, setPreviewProduct] = useState<Product | null>(null);
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );
  const addToCart = (product: Product): void => cart.addItem({ id: `${product.category.toLowerCase().replaceAll(" ", "-")}:${product.image}`, name: product.name, price: product.price, image: product.image, category: product.category });
  const checkoutUrl = `${whatsappUrl}%20My%20order:%20${encodeURIComponent(cart.items.map(({ name, quantity }) => `${name} x${quantity}`).join(", "))}%20—%20Total%20Rs.%20${cart.total.toLocaleString("en-PK")}.`;

  return (
  <main className="overflow-hidden bg-[#f9f2e7] text-[#392113]">
    <div className="bg-[#28170f] text-white">
      <div className="mx-auto flex min-h-10 max-w-[1440px] flex-wrap items-center justify-between gap-x-6 gap-y-1 px-4 py-2 text-[10px] font-semibold sm:px-7 sm:text-xs lg:px-10">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1 sm:gap-x-8"><span className="inline-flex items-center gap-2"><Truck className="size-3.5" /> Ask us about delivery options</span><span className="hidden h-4 w-px bg-white/40 sm:block" /><span className="inline-flex items-center gap-2"><Heart className="size-3.5 fill-[#f4d5b4] text-[#f4d5b4]" /> Freshly baked, always fresh!</span></div>
        <div className="flex items-center gap-3 sm:gap-4"><Link href="/contact" className="hidden text-white/90 hover:text-white sm:inline">Order Help</Link><Link href="/contact" className="inline-flex items-center gap-1.5 text-white/90 hover:text-white"><Phone className="size-3" /> Help | Contact</Link><span className="hidden items-center gap-2 border-l border-white/35 pl-3 sm:inline-flex" aria-label="Social media"><span className="text-sm font-bold">f</span><span className="text-[17px] leading-none">◎</span><Music2 className="size-4" /></span></div>
      </div>
    </div>

    <header className="sticky top-0 z-30 border-b border-white/10 bg-[#3a2418] text-[#fffaf1] shadow-[0_12px_28px_-20px_rgba(30,16,8,0.8)]">
      <div className="mx-auto flex min-h-[76px] max-w-[1440px] items-center justify-between gap-3 px-4 py-2 sm:min-h-[88px] sm:px-7 lg:px-10">
        <Link href="/" className="flex shrink-0 items-center rounded-xl bg-[#f8ead5] px-2" aria-label="Sweet Aroma Bakery home">
          <Image src="/sweet-aroma-logo-original.png" alt="Sweet Aroma Bakery & Sweets — freshly baked, always fresh" width={1536} height={1024} priority className="h-[66px] w-[100px] object-contain sm:h-[74px] sm:w-[112px]" />
        </Link>
        <nav className="hidden items-center gap-1 xl:flex" aria-label="Main navigation">
          <Link className="inline-flex h-10 items-center gap-2 rounded-full bg-[#dfa853] px-4 text-xs font-semibold text-[#2d1a10]" href="/"><House className="size-4" /> Home</Link>
          <Link href="/shop" className="inline-flex items-center gap-1 px-3 text-xs font-semibold text-white/85 hover:text-[#edbd69]">Our Products <ChevronDown className="size-3.5" /></Link>
          <Link href="/shop/sweets" className="inline-flex items-center gap-1 px-3 text-xs font-semibold text-white/85 hover:text-[#edbd69]">Sweets <ChevronDown className="size-3.5" /></Link>
          <Link href="/shop/nimko" className="inline-flex items-center gap-1 px-3 text-xs font-semibold text-white/85 hover:text-[#edbd69]">Nimko <ChevronDown className="size-3.5" /></Link>
          <Link className="px-3 text-xs font-semibold text-white/85 hover:text-[#edbd69]" href="/about">About Us</Link>
          <Link className="px-3 text-xs font-semibold text-white/85 hover:text-[#edbd69]" href="/contact">Contact</Link>
        </nav>
        <label className="hidden h-10 min-w-[165px] items-center justify-between gap-3 rounded-full border border-white/20 bg-white/10 px-4 text-[11px] text-white/75 transition focus-within:border-[#e2b362] lg:flex"><input aria-label="Search products" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Search products..." className="min-w-0 flex-1 bg-transparent text-white outline-none placeholder:text-white/65" /><Search className="size-5 shrink-0 text-[#edbd69]" /></label>
        <div className="flex items-center gap-2">
          <a aria-label="Contact Sweet Aroma" href={whatsappUrl} target="_blank" rel="noreferrer" className="hidden size-10 items-center justify-center rounded-full text-[#f7ead5] transition hover:bg-white/10 sm:flex"><UserRound className="size-6" /></a>
          <div className="relative">
            <button type="button" aria-label={`Shopping cart with ${cart.count} items`} aria-expanded={cartOpen} onClick={() => setCartOpen((open) => !open)} className="relative grid size-10 place-items-center text-[#f7ead5] transition hover:text-[#edbd69]"><ShoppingCart className="size-6" /><span className="absolute right-0 top-0 grid size-[17px] place-items-center rounded-full bg-[#c44631] text-[9px] font-bold text-white">{cart.count}</span></button>
            {cartOpen && <aside className="absolute right-0 top-12 z-50 w-[min(330px,calc(100vw-2rem))] rounded-2xl border border-[#efdfce] bg-white p-4 text-[#542a14] shadow-[0_20px_60px_-22px_rgba(68,37,18,0.35)]"><div className="flex items-center justify-between"><p className="text-sm font-bold text-[#542a14]">Your cart <span className="ml-1 text-xs font-medium text-[#887766]">({cart.count})</span></p><button type="button" aria-label="Close cart" onClick={() => setCartOpen(false)} className="grid size-7 place-items-center rounded-full text-[#806c55] hover:bg-[#f8ecdc]"><X className="size-4" /></button></div>{cart.count === 0 ? <p className="py-7 text-center text-xs text-[#887766]">Your cart is empty. Add a bakery favourite to get started.</p> : <><ul className="my-3 max-h-52 divide-y divide-[#f1e5d9] overflow-auto">{cart.items.map((entry) => <li key={entry.id} className="flex items-center justify-between gap-3 py-2.5 text-xs"><div className="min-w-0"><p className="truncate font-semibold text-[#58351f]">{entry.name}</p><p className="mt-0.5 text-[#b52218]">Rs. {entry.price.toLocaleString("en-PK")} each</p></div><div className="flex shrink-0 items-center gap-1 rounded-full border border-[#ead7c4] bg-[#fffaf2] p-0.5 text-[#542a14]"><button type="button" aria-label={`Remove one ${entry.name}`} onClick={() => cart.removeItem(entry.id)} className="grid size-6 place-items-center rounded-full text-[#542a14] hover:bg-[#f8ecdc]"><Minus className="size-3" /></button><span className="w-4 text-center font-bold text-[#542a14]">{entry.quantity}</span><button type="button" aria-label={`Add one ${entry.name}`} onClick={() => cart.addItem(entry)} className="grid size-6 place-items-center rounded-full text-[#542a14] hover:bg-[#f8ecdc]"><Plus className="size-3" /></button></div></li>)}</ul><div className="flex justify-between border-t border-[#ead7c4] py-3 text-xs font-bold text-[#542a14]"><span>Total</span><span>Rs. {cart.total.toLocaleString("en-PK")}</span></div><a href={checkoutUrl} className="flex h-10 items-center justify-center gap-2 rounded-full bg-[#713511] text-xs font-bold text-white hover:bg-[#54240c]">Send order on WhatsApp <ArrowRight className="size-3.5" /></a></>}</aside>}
          </div>
          <Link aria-label="Open bakery menu" href="/shop" className="grid size-10 place-items-center rounded-full bg-[#dfa853] text-[#2d1a10] xl:hidden"><Menu className="size-5" /></Link>
        </div>
      </div>
      <nav className="flex gap-6 overflow-x-auto border-t border-white/10 px-4 py-2.5 text-[10px] font-semibold text-[#f7ead5]/85 xl:hidden sm:px-7" aria-label="Mobile navigation"><Link className="shrink-0" href="/shop">Our Products</Link><Link className="shrink-0" href="/shop/sweets">Sweets</Link><Link className="shrink-0" href="/shop/nimko">Nimko</Link><Link className="shrink-0" href="/about">About Us</Link><Link className="shrink-0" href="/contact">Contact</Link></nav>
      <label className="flex items-center gap-2 border-t border-white/10 bg-[#302016] px-4 py-2.5 lg:hidden"><Search className="size-4 text-[#edbd69]" /><input aria-label="Search products" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Search cakes, sweets, nimko..." className="min-w-0 flex-1 bg-transparent text-xs text-white outline-none placeholder:text-white/60" /></label>
    </header>

    <section id="home" className="bg-[#fbf4e9] px-4 py-7 sm:px-7 sm:py-10 lg:px-10 lg:py-14">
      <div className="mx-auto grid max-w-[1440px] overflow-hidden rounded-[24px] bg-[#fbf4e9] lg:min-h-[570px] lg:grid-cols-[0.88fr_1.12fr]">
        <div className="flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-14 lg:px-12 xl:px-16">
          <p className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.22em] text-[#ae803a] before:h-px before:w-8 before:bg-[#d7a655]">Welcome to Sweet Aroma</p>
          <h1 className="mt-6 max-w-[620px] font-serif text-[44px] font-bold leading-[0.98] tracking-[-0.045em] text-[#382218] sm:text-[62px] lg:text-[68px]">Sweet Aroma<span className="mt-2 block text-[#ae8747]">Bakery &amp; Nimko Shop</span></h1>
          <p className="mt-6 max-w-[490px] text-[15px] leading-7 text-[#755d48] sm:text-base">Fresh Bakery Items, Delicious Sweets and Crispy Nimko — All in One Place!</p>
          <div className="mt-7 flex flex-wrap gap-3"><Link href="/shop" className="inline-flex h-12 items-center gap-2 rounded-md bg-[#3a2418] px-6 text-[11px] font-bold uppercase tracking-[0.12em] text-[#fff7eb] transition hover:bg-[#59371f]">Shop our menu <ArrowRight className="size-4 text-[#e1ad58]" /></Link><a href={whatsappUrl} target="_blank" rel="noreferrer" className="inline-flex h-12 items-center gap-2 rounded-md border border-[#8c7967] px-6 text-[11px] font-bold uppercase tracking-[0.12em] text-[#3a2418] transition hover:bg-[#f1e3cf]">Order on WhatsApp <ArrowRight className="size-4" /></a></div>
          <div className="mt-9 flex flex-wrap gap-x-8 gap-y-4 border-t border-[#e8d9c4] pt-5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#967e61]"><span className="inline-flex items-center gap-2"><ShieldCheck className="size-4 text-[#b48945]" /> Made with care</span><span className="inline-flex items-center gap-2"><Truck className="size-4 text-[#b48945]" /> Delivery by arrangement</span></div>
        </div>
        <div className="relative min-h-[280px] overflow-hidden sm:min-h-[420px] lg:min-h-[570px]">
          <Image src="/bakery-gallery/sweet-aroma-hero-display.png" alt="Chocolate cake, fresh bakery bread, traditional sweets and nimko at Sweet Aroma" fill priority sizes="(max-width: 1024px) 100vw, 58vw" className="object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#28170f]/45 via-transparent to-transparent" />
          <span className="absolute bottom-5 right-5 rounded-sm bg-[#fff8ed] px-4 py-2 text-[9px] font-bold uppercase tracking-[0.16em] text-[#54331f]">Freshly baked, always fresh</span>
        </div>
      </div>
    </section>

    <section aria-label="Sweet Aroma service highlights" className="border-y border-[#4a3425] bg-[#28170f] text-[#f7ead5]">
      <div className="mx-auto grid max-w-[1440px] grid-cols-2 divide-y divide-white/10 px-5 py-1 sm:grid-cols-4 sm:divide-x sm:divide-y-0 sm:px-8 lg:px-10">
        {[{ icon: <Heart className="size-4" />, text: "Freshly made with care" }, { icon: <Truck className="size-4" />, text: "Delivery by arrangement" }, { icon: <BadgeCheck className="size-4" />, text: "Cakes for celebrations" }, { icon: <ShoppingBag className="size-4" />, text: "Order on WhatsApp" }].map((item) => <div key={item.text} className="flex min-h-14 items-center justify-center gap-2.5 px-2 text-center text-[9px] font-bold uppercase tracking-[0.1em] text-[#e6c58e] sm:text-[10px]"><span className="text-[#e3ad58]">{item.icon}</span>{item.text}</div>)}
      </div>
    </section>

    <section id="categories" className="scroll-mt-4 bg-[#28170f] px-4 py-12 text-[#fff7eb] sm:px-7 sm:py-16 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4 sm:mb-9"><div><p className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.22em] text-[#dfaa55] before:h-px before:w-8 before:bg-[#dfaa55]">Our collection</p><h2 className="mt-3 font-serif text-[30px] font-bold leading-tight tracking-[-0.035em] sm:text-[42px]">Find your favourite</h2></div><Link href="/shop" className="inline-flex items-center gap-2 pb-1 text-[10px] font-bold uppercase tracking-[0.13em] text-[#e1ad58] hover:text-white">View all products <ArrowRight className="size-4" /></Link></div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">{categories.map((category) => <Link href={category.href} key={category.title} className="group overflow-hidden rounded-lg border border-white/10 bg-[#382317] transition hover:-translate-y-1 hover:border-[#d6a351]/60"><span className="relative block aspect-[1.4/1] overflow-hidden bg-[#4b3220]"><Image src={category.image} alt={category.alt} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw" className="object-cover transition duration-500 group-hover:scale-105" /><span className="absolute inset-0 bg-gradient-to-t from-[#20130c]/50 to-transparent" /></span><span className="flex items-center justify-between gap-2 px-3 py-3 sm:px-3.5"><span className="font-serif text-[13px] font-bold text-[#fff7eb] sm:text-[15px]">{category.title}</span><ArrowRight className="size-3.5 shrink-0 text-[#dfa853] transition group-hover:translate-x-1" /></span></Link>)}</div>
      </div>
    </section>

    <section id="products" className="scroll-mt-6 bg-[#f9f2e7] px-4 py-12 sm:px-7 sm:py-16 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4 sm:mb-9"><div><p className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.22em] text-[#b18442] before:h-px before:w-8 before:bg-[#d7a655]">From our kitchen</p><h2 className="mt-3 font-serif text-[30px] font-bold leading-tight tracking-[-0.035em] text-[#382218] sm:text-[42px]">{searchQuery ? "Search results" : "Popular picks"}</h2></div><Link href="/shop" className="inline-flex items-center gap-2 pb-1 text-[10px] font-bold uppercase tracking-[0.13em] text-[#76572f] hover:text-[#ad7d34]">Browse the menu <ArrowRight className="size-4" /></Link></div>
        {filteredProducts.length ? <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5">{filteredProducts.map((product) => <ProductCard key={product.name} product={product} onAdd={addToCart} onPreview={setPreviewProduct} quantity={cart.items.find((entry) => entry.id === `${product.category.toLowerCase().replaceAll(" ", "-")}:${product.image}`)?.quantity ?? 0} />)}</div> : <div className="rounded-xl border border-[#e7d7c0] bg-[#fffaf2] px-5 py-10 text-center"><p className="font-serif text-lg font-bold text-[#542a14]">No matching products found</p><p className="mt-1 text-xs text-[#887766]">Try searching for cakes, cookies, pastries, sweets or nimko.</p></div>}
      </div>
    </section>

    <section id="about" className="border-y border-[#4a3425] bg-[#f1e4d0] px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
      <div className="mx-auto grid max-w-[1320px] items-center gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
        <div className="relative min-h-[260px] overflow-hidden rounded-lg sm:min-h-[400px]"><Image src="/bakery-gallery/cake-display.png" alt="A selection of cakes prepared for Sweet Aroma customers" fill sizes="(max-width: 1024px) 100vw, 48vw" className="object-cover" /><span className="absolute bottom-4 left-4 bg-[#fff7eb] px-4 py-2 font-serif text-sm font-bold text-[#593821]">A little sweetness, made fresh</span></div>
        <div><p className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.22em] text-[#a97d3e] before:h-px before:w-8 before:bg-[#d7a655]">Made for sharing</p><h2 className="mt-4 max-w-[640px] font-serif text-[34px] font-bold leading-[1.07] tracking-[-0.035em] text-[#382218] sm:text-[48px]">Something for every craving.</h2><p className="mt-5 max-w-[620px] text-sm leading-7 text-[#755d48] sm:text-base">From celebration cakes and everyday bakery treats to traditional mithai and crunchy nimko, Sweet Aroma brings your favourites together in one shop.</p><div className="mt-7 grid gap-3 sm:grid-cols-2">{[{ icon: <Clock3 className="size-5" />, title: "Fresh selections", detail: "Ask us what is available today." }, { icon: <ShoppingBag className="size-5" />, title: "Easy ordering", detail: "Talk through your order on WhatsApp." }].map((item) => <div key={item.title} className="flex items-center gap-3 border-t border-[#ddc9aa] py-4"><span className="text-[#ad803e]">{item.icon}</span><span><span className="block text-xs font-bold text-[#4d3422]">{item.title}</span><span className="mt-1 block text-[10px] text-[#806c55]">{item.detail}</span></span></div>)}</div><Link href="/about" className="mt-5 inline-flex items-center gap-2 border-b border-[#926d3d] pb-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#523921]">More about Sweet Aroma <ArrowRight className="size-3.5 text-[#ad803e]" /></Link></div>
      </div>
    </section>

    <section className="relative isolate overflow-hidden bg-[#28170f] px-5 py-12 text-white sm:px-8 sm:py-16 lg:px-10 lg:py-[72px]">
      <Image src="/bakery-gallery/croissants.png" alt="Golden bakery croissants fresh from the oven" fill sizes="100vw" className="absolute inset-0 -z-20 object-cover object-center" /><div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(40,23,15,0.88),rgba(40,23,15,0.55))]" />
      <div className="mx-auto flex max-w-[1320px] flex-col items-start justify-between gap-6 sm:flex-row sm:items-center"><div className="max-w-[750px]"><p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#e6b25f]">Planning a celebration?</p><h2 className="mt-3 font-serif text-[30px] font-bold leading-tight sm:text-[42px]">Let’s find the right cake for your day.</h2><p className="mt-3 max-w-[640px] text-sm leading-6 text-white/80">Share the flavour, size and design you have in mind. We’ll help you discuss the details.</p></div><a href={`${whatsappUrl}%20I%27d%20like%20to%20ask%20about%20a%20celebration%20cake.`} target="_blank" rel="noreferrer" className="inline-flex h-12 shrink-0 items-center gap-2 rounded-md bg-[#dfa853] px-5 text-[10px] font-bold uppercase tracking-[0.1em] text-[#2d1a10] transition hover:bg-[#efc477]">Ask about a cake <ArrowRight className="size-4" /></a></div>
    </section>

    {previewProduct && <div className="fixed inset-0 z-50 grid place-items-center bg-[#1b110b]/90 p-4 sm:p-8" role="dialog" aria-modal="true" aria-label={previewProduct.name} onClick={() => setPreviewProduct(null)}><button type="button" aria-label="Close image preview" onClick={() => setPreviewProduct(null)} className="absolute right-4 top-4 grid size-11 place-items-center rounded-full border border-white/30 bg-black/30 text-white transition hover:bg-white/15 sm:right-8 sm:top-8"><X className="size-5" /></button><div className="relative h-[min(82vh,900px)] w-full max-w-[1280px]" onClick={(event) => event.stopPropagation()}><Image src={previewProduct.image} alt={previewProduct.alt} fill sizes="100vw" className="object-contain" /><p className="absolute inset-x-0 -bottom-8 text-center font-serif text-sm font-semibold text-white sm:-bottom-9 sm:text-base">{previewProduct.name}</p></div></div>}

    <footer id="contact" className="bg-[#28170f] text-white">
      <div className="mx-auto grid max-w-[1440px] gap-9 border-b border-white/10 px-5 py-10 sm:grid-cols-2 sm:px-8 sm:py-14 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr] lg:px-10">
        <div><Link href="/" className="flex w-fit items-center rounded-lg bg-[#f8ead5] px-2" aria-label="Sweet Aroma Bakery home"><Image src="/sweet-aroma-logo-original.png" alt="Sweet Aroma Bakery & Sweets" width={1536} height={1024} className="h-[68px] w-[104px] object-contain" /></Link><p className="mt-4 max-w-[320px] text-xs leading-6 text-white/65">Fresh bakes, celebration cakes and traditional favourites, made with care.</p><a className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-[#e7b65e]" href={whatsappUrl} target="_blank" rel="noreferrer"><Phone className="size-3.5" /> 0312 8869242</a></div>
        <div><p className="mb-4 text-[9px] font-bold uppercase tracking-[0.2em] text-[#e7b65e]">Shop</p><div className="grid gap-3 text-xs text-white/75">{categories.slice(0, 4).map((category) => <Link key={category.title} href={category.href} className="hover:text-white">{category.title}</Link>)}<Link href="/shop" className="hover:text-white">All products</Link></div></div>
        <div><p className="mb-4 text-[9px] font-bold uppercase tracking-[0.2em] text-[#e7b65e]">Sweet Aroma</p><div className="grid gap-3 text-xs text-white/75"><Link href="/about" className="hover:text-white">About us</Link><Link href="/bakery-gallery" className="hover:text-white">Photo gallery</Link><Link href="/contact" className="hover:text-white">Contact</Link><a href={whatsappUrl} target="_blank" rel="noreferrer" className="hover:text-white">WhatsApp orders</a></div></div>
        <div><p className="mb-4 text-[9px] font-bold uppercase tracking-[0.2em] text-[#e7b65e]">Need help choosing?</p><p className="text-xs leading-6 text-white/65">Ask about availability, custom cake details, gift packs and delivery.</p><Link href="/contact" className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-white">Get in touch <ArrowRight className="size-3.5 text-[#e7b65e]" /></Link></div>
      </div>
      <div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-5 py-4 text-[10px] text-white/45 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10"><span>© 2026 Sweet Aroma Bakery &amp; Sweets. Freshly made with care.</span><span>Questions? Call or WhatsApp 0312 8869242</span></div>
    </footer>
  </main>
  );
};

export default BakeryHomePage;
