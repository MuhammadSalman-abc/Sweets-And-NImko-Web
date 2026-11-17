"use client";

import type { ReactElement } from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, ChevronDown, Clock3, Heart, House, Menu, Minus, Music2, Phone, Plus, Search, ShieldCheck, ShoppingBag, ShoppingCart, Truck, UserRound, X } from "lucide-react";
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

const ProductCard = ({ product, onAdd }: { product: Product; onAdd: (product: Product) => void }): ReactElement => (
  <article className="group overflow-hidden rounded-[20px] border border-[#eee3d8] bg-white shadow-[0_12px_30px_-24px_rgba(67,37,18,0.6)] transition duration-300 hover:-translate-y-1 hover:border-[#dec5ae] hover:shadow-[0_22px_42px_-24px_rgba(67,37,18,0.42)]">
    <Link href={`/shop/${product.category.toLowerCase().replaceAll(" ", "-")}`} aria-label={`Browse ${product.category}`} className="relative block aspect-[4/3] w-full overflow-hidden bg-[#f7eadb] text-left">
      <Image src={product.image} alt={product.alt} fill sizes="(max-width: 640px) 50vw, (max-width: 1200px) 25vw, 240px" className="object-cover transition duration-500 group-hover:scale-105" />
      <span className="absolute left-3 top-3 rounded-full border border-white/70 bg-white/90 px-3 py-1.5 text-[9px] font-semibold text-[#673515] shadow-sm backdrop-blur-sm">{product.category}</span>
    </Link>
    <div className="px-3.5 pb-4 pt-3 sm:px-4">
      <Link href={`/shop/${product.category.toLowerCase().replaceAll(" ", "-")}`} className="block min-h-9 text-left text-[12px] font-bold leading-4 text-[#3f2414] hover:text-[#8d4a22] sm:text-[13px]">{product.name}</Link>
      <div className="mt-2 flex items-center justify-between gap-2"><p className="text-[15px] font-extrabold text-[#713511]">Rs. {product.price.toLocaleString("en-PK")}</p><span className="text-[9px] font-medium text-[#927e6b]">Fresh today</span></div>
      <div className="mt-3 flex items-center gap-2"><Link href={`/shop/${product.category.toLowerCase().replaceAll(" ", "-")}`} className="inline-flex h-9 flex-1 items-center justify-center gap-1 rounded-full bg-[#713511] px-3 text-[10px] font-semibold text-white transition hover:bg-[#54240c] sm:text-[11px]">Explore <ArrowRight className="size-3.5" /></Link><button type="button" aria-label={`Add ${product.name} to cart`} onClick={() => onAdd(product)} className="inline-flex h-9 items-center justify-center gap-1.5 rounded-full border border-[#e7d8ca] px-3 text-[10px] font-semibold text-[#713511] transition hover:border-[#713511] hover:bg-[#fff7ee] sm:text-[11px]"><ShoppingCart className="size-3.5" /> Add</button></div>
    </div>
  </article>
);

const BakeryHomePage = (): ReactElement => {
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<ReadonlyArray<Product>>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );
  const cartItems = products.flatMap((product) => {
    const quantity = cart.filter((item) => item.name === product.name).length;
    return quantity ? [{ product, quantity }] : [];
  });
  const cartTotal = cart.reduce((total, product) => total + product.price, 0);
  const addToCart = (product: Product): void => setCart((current) => [...current, product]);
  const removeFromCart = (product: Product): void => setCart((current) => {
    const index = current.findIndex((item) => item.name === product.name);
    return index < 0 ? current : current.filter((_, itemIndex) => itemIndex !== index);
  });
  const checkoutUrl = `${whatsappUrl}%20My%20order:%20${encodeURIComponent(cartItems.map(({ product, quantity }) => `${product.name} x${quantity}`).join(", "))}%20—%20Total%20Rs.%20${cartTotal.toLocaleString("en-PK")}.`;

  return (
  <main className="overflow-hidden bg-[linear-gradient(180deg,#faf8f4_0%,#fffaf5_48%,#f8f4ed_100%)] text-[#392113]">
    <div className="bg-[#55280f] text-white">
      <div className="mx-auto flex min-h-10 max-w-[1440px] flex-wrap items-center justify-between gap-x-6 gap-y-1 px-4 py-2 text-[10px] font-semibold sm:px-7 sm:text-xs lg:px-10">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1 sm:gap-x-8"><span className="inline-flex items-center gap-2"><Truck className="size-3.5" /> Free delivery available — ask us on WhatsApp</span><span className="hidden h-4 w-px bg-white/40 sm:block" /><span className="inline-flex items-center gap-2"><Heart className="size-3.5 fill-[#f4d5b4] text-[#f4d5b4]" /> Freshly baked, always fresh!</span></div>
        <div className="flex items-center gap-3 sm:gap-4"><Link href="/contact" className="hidden text-white/90 hover:text-white sm:inline">Order Help</Link><Link href="/contact" className="inline-flex items-center gap-1.5 text-white/90 hover:text-white"><Phone className="size-3" /> Help | Contact</Link><span className="hidden items-center gap-2 border-l border-white/35 pl-3 sm:inline-flex" aria-label="Social media"><span className="text-sm font-bold">f</span><span className="text-[17px] leading-none">◎</span><Music2 className="size-4" /></span></div>
      </div>
    </div>

    <header className="sticky top-0 z-30 border-b border-[#eee5d9]/90 bg-[#fffdf9]/95 shadow-[0_8px_30px_-28px_rgba(55,31,15,0.65)] backdrop-blur-xl">
      <div className="mx-auto flex min-h-[84px] max-w-[1440px] items-center justify-between gap-3 px-4 py-2 sm:min-h-[96px] sm:px-7 lg:px-10">
        <Link href="/" className="flex shrink-0 items-center" aria-label="Sweet Aroma Bakery home">
          <Image src="/sweet-aroma-logo-original.png" alt="Sweet Aroma Bakery & Sweets — freshly baked, always fresh" width={1536} height={1024} priority className="h-[72px] w-[108px] object-contain sm:h-[84px] sm:w-[126px]" />
        </Link>
        <nav className="hidden items-center gap-1 xl:flex" aria-label="Main navigation">
          <Link className="inline-flex h-11 items-center gap-2 rounded-full bg-[#6b3518] px-4 text-xs font-semibold text-white" href="/"><House className="size-4" /> Home</Link>
          <Link href="/shop" className="inline-flex items-center gap-1 px-3 text-xs font-semibold hover:text-[#9b5428]">Our Products <ChevronDown className="size-3.5" /></Link>
          <Link href="/shop/sweets" className="inline-flex items-center gap-1 px-3 text-xs font-semibold hover:text-[#9b5428]">Sweets <ChevronDown className="size-3.5" /></Link>
          <Link href="/shop/nimko" className="inline-flex items-center gap-1 px-3 text-xs font-semibold hover:text-[#9b5428]">Nimko <ChevronDown className="size-3.5" /></Link>
          <Link className="px-3 text-xs font-semibold hover:text-[#9b5428]" href="/about">About Us</Link>
          <Link className="px-3 text-xs font-semibold hover:text-[#9b5428]" href="/contact">Contact</Link>
        </nav>
        <label className="hidden h-10 min-w-[165px] items-center justify-between gap-3 rounded-full border border-white bg-white/80 px-4 text-[11px] text-[#887766] shadow-[0_0_0_1px_#f0e3d6] transition focus-within:border-[#d7b99b] lg:flex"><input aria-label="Search products" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Search products..." className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-[#887766]" /><Search className="size-5 shrink-0 text-[#5c2d15]" /></label>
        <div className="flex items-center gap-2">
          <a aria-label="Contact Sweet Aroma" href={whatsappUrl} target="_blank" rel="noreferrer" className="hidden size-10 items-center justify-center rounded-full text-[#582d18] transition hover:bg-[#f5e8db] sm:flex"><UserRound className="size-6" /></a>
          <div className="relative">
            <button type="button" aria-label={`Shopping cart with ${cart.length} items`} aria-expanded={cartOpen} onClick={() => setCartOpen((open) => !open)} className="relative grid size-10 place-items-center text-[#582d18] transition hover:text-[#9b5428]"><ShoppingCart className="size-6" /><span className="absolute right-0 top-0 grid size-[17px] place-items-center rounded-full bg-[#b92218] text-[9px] font-bold text-white">{cart.length}</span></button>
            {cartOpen && <aside className="absolute right-0 top-12 z-50 w-[min(330px,calc(100vw-2rem))] rounded-2xl border border-[#efdfce] bg-white p-4 shadow-[0_20px_60px_-22px_rgba(68,37,18,0.35)]"><div className="flex items-center justify-between"><p className="text-sm font-bold text-[#542a14]">Your cart <span className="ml-1 text-xs font-medium text-[#887766]">({cart.length})</span></p><button type="button" aria-label="Close cart" onClick={() => setCartOpen(false)} className="grid size-7 place-items-center rounded-full hover:bg-[#f8ecdc]"><X className="size-4" /></button></div>{cart.length === 0 ? <p className="py-7 text-center text-xs text-[#887766]">Your cart is empty. Add a bakery favourite to get started.</p> : <><ul className="my-3 max-h-52 divide-y divide-[#f1e5d9] overflow-auto">{cartItems.map(({ product, quantity }) => <li key={product.name} className="flex items-center justify-between gap-3 py-2.5 text-xs"><div className="min-w-0"><p className="truncate font-semibold text-[#58351f]">{product.name}</p><p className="mt-0.5 text-[#b52218]">Rs. {product.price.toLocaleString("en-PK")} each</p></div><div className="flex shrink-0 items-center gap-1 rounded-full border border-[#ead7c4] p-0.5"><button type="button" aria-label={`Remove one ${product.name}`} onClick={() => removeFromCart(product)} className="grid size-6 place-items-center rounded-full hover:bg-[#f8ecdc]"><Minus className="size-3" /></button><span className="w-4 text-center font-bold">{quantity}</span><button type="button" aria-label={`Add one ${product.name}`} onClick={() => addToCart(product)} className="grid size-6 place-items-center rounded-full hover:bg-[#f8ecdc]"><Plus className="size-3" /></button></div></li>)}</ul><div className="flex justify-between border-t border-[#ead7c4] py-3 text-xs font-bold"><span>Total</span><span>Rs. {cartTotal.toLocaleString("en-PK")}</span></div><a href={checkoutUrl} target="_blank" rel="noreferrer" className="flex h-10 items-center justify-center gap-2 rounded-full bg-[#713511] text-xs font-bold text-white hover:bg-[#54240c]">Send order on WhatsApp <ArrowRight className="size-3.5" /></a></>}</aside>}
          </div>
          <Link aria-label="Open bakery menu" href="/shop" className="grid size-10 place-items-center rounded-full bg-[#6b3518] text-white xl:hidden"><Menu className="size-5" /></Link>
        </div>
      </div>
      <nav className="flex gap-6 overflow-x-auto border-t border-[#f1e5d9] px-4 py-2.5 text-[10px] font-semibold text-[#68452e] xl:hidden sm:px-7" aria-label="Mobile navigation"><Link className="shrink-0" href="/shop">Our Products</Link><Link className="shrink-0" href="/shop/sweets">Sweets</Link><Link className="shrink-0" href="/shop/nimko">Nimko</Link><Link className="shrink-0" href="/about">About Us</Link><Link className="shrink-0" href="/contact">Contact</Link></nav>
      <label className="flex items-center gap-2 border-t border-[#eee5d9] bg-[#fffdf9] px-4 py-2.5 lg:hidden"><Search className="size-4 text-[#75401d]" /><input aria-label="Search products" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Search cakes, sweets, nimko..." className="min-w-0 flex-1 bg-transparent text-xs text-[#492817] outline-none placeholder:text-[#93816e]" /></label>
    </header>

    <section id="home" className="relative isolate min-h-[480px] overflow-hidden bg-[#e2a35f] sm:min-h-[520px] lg:min-h-[590px]">
      <Image src="/bakery-gallery/sweet-aroma-hero-display.png" alt="Chocolate cake, fresh bakery bread, traditional sweets and nimko at Sweet Aroma" fill priority sizes="100vw" className="absolute inset-0 -z-20 object-cover object-center" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(255,246,232,0.98)_0%,rgba(255,242,219,0.94)_30%,rgba(255,241,220,0.65)_48%,rgba(67,32,14,0.04)_78%)] sm:bg-[linear-gradient(90deg,rgba(255,246,232,0.98)_0%,rgba(255,242,219,0.92)_31%,rgba(255,241,220,0.55)_49%,rgba(67,32,14,0)_76%)]" />
      <div className="mx-auto flex min-h-[480px] max-w-[1440px] items-center px-5 py-14 sm:min-h-[520px] sm:px-8 lg:min-h-[590px] lg:px-12">
        <div className="max-w-[590px]">
          <p className="inline-flex items-center gap-2 rounded-full border border-[#ead7c1] bg-white/65 px-3.5 py-2 font-serif text-[15px] italic leading-tight text-[#8e4c28] shadow-sm backdrop-blur-sm sm:text-[17px]">Welcome to <Heart className="size-3.5 fill-[#9d4b32] text-[#9d4b32]" /></p>
          <h1 className="mt-5 text-[48px] font-extrabold leading-[0.94] tracking-[-0.06em] text-[#4b250f] sm:text-[68px] lg:text-[78px]">Sweet Aroma<span className="mt-3 block font-serif text-[25px] font-bold leading-tight tracking-[-0.035em] text-[#673315] sm:text-[34px] lg:text-[38px]">Bakery & Nimko Shop</span></h1>
          <p className="mt-5 max-w-[430px] text-[14px] font-medium leading-6 text-[#432819] sm:text-base sm:leading-7">Fresh Bakery Items, Delicious Sweets and Crispy Nimko — All in One Place!</p>
          <div className="mt-7 flex flex-wrap items-center gap-3"><Link href="/shop" className="inline-flex h-12 items-center gap-2 rounded-full bg-[#713511] px-7 text-sm font-bold text-white shadow-[0_12px_24px_-12px_rgba(76,34,13,0.65)] transition hover:-translate-y-0.5 hover:bg-[#54240c]">Shop Now <ArrowRight className="size-4" /></Link><a href={whatsappUrl} target="_blank" rel="noreferrer" className="inline-flex h-12 items-center gap-2 rounded-full border border-[#d8bea4] bg-white/70 px-5 text-xs font-bold text-[#633315] backdrop-blur-sm transition hover:bg-white">Order on WhatsApp</a></div>
        </div>
      </div>
      <span className="absolute bottom-4 right-5 rounded-full bg-[#4b250f]/55 px-3 py-1 text-[9px] font-medium text-white sm:right-8">A little sweetness, made fresh</span>
    </section>

    <section id="categories" className="relative z-10 scroll-mt-4 px-4 pt-5 sm:px-6 sm:pt-6">
      <div className="mx-auto grid max-w-[1400px] grid-cols-3 overflow-hidden rounded-[24px] border border-[#eee4d8] bg-[#fffefb] shadow-[0_18px_42px_-32px_rgba(87,44,18,0.55)] sm:grid-cols-4 lg:grid-cols-8">
        {categories.map((category) => (
          <Link href={category.href} key={category.title} className="group flex min-h-[92px] flex-col items-center justify-center gap-2 border-r border-[#ead7c4] px-2 py-3 text-center transition hover:bg-[#fff7ee] sm:min-h-[104px]">
            <span className="relative grid size-12 place-items-center overflow-hidden rounded-[17px] border border-[#f0e1d0] bg-[#fff5e9] shadow-sm transition duration-300 group-hover:-translate-y-0.5 group-hover:rounded-full sm:size-[52px]"><Image src={category.image} alt={category.alt} fill sizes="52px" className="object-cover transition duration-500 group-hover:scale-110" /></span>
            <span className="text-[10px] font-bold text-[#472817] sm:text-[11px]">{category.title}</span>
          </Link>
        ))}
        <div className="col-span-3 flex items-center justify-center gap-3 bg-[#f7eee2] px-3 py-3 text-center sm:col-span-4 lg:col-span-1 lg:flex-col lg:gap-1">
          <span className="grid size-9 place-items-center rounded-full bg-[#713511] text-[#fff5e9]"><ShieldCheck className="size-5" /></span><span className="text-[10px] font-bold leading-4 text-[#502a15] sm:text-[11px]">Freshly made<br />with care</span>
        </div>
      </div>
    </section>

    <section id="products" className="scroll-mt-6 px-4 pb-14 pt-8 sm:px-6 sm:pb-20 sm:pt-10">
      <div className="mx-auto grid max-w-[1400px] items-start gap-5 xl:grid-cols-[minmax(0,1fr)_250px]">
        <div>
          <div className="mb-5 flex min-h-12 items-end gap-2 sm:gap-3"><div><p className="text-[9px] font-bold uppercase tracking-[0.17em] text-[#a36337]">Fresh from our kitchen</p><h2 className="mt-1 shrink-0 font-serif text-[25px] font-bold tracking-[-0.04em] text-[#542a14] sm:text-[32px]">{searchQuery ? "Search results" : "A taste of everything"}</h2></div><span className="mb-2 h-px min-w-3 flex-1 bg-[#dfcdbb]" /><Link href="/shop" className="mb-1 inline-flex shrink-0 items-center gap-1 text-[10px] font-bold text-[#542a14] sm:text-xs">View all <ArrowRight className="size-3.5" /></Link></div>
          {filteredProducts.length ? <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 xl:grid-cols-3">{filteredProducts.map((product) => <ProductCard key={product.name} product={product} onAdd={addToCart} />)}</div> : <div className="rounded-2xl border border-[#efdfce] bg-white px-5 py-10 text-center"><p className="text-sm font-semibold text-[#542a14]">No matching products found</p><p className="mt-1 text-xs text-[#887766]">Try searching for cakes, cookies, pastries, sweets or nimko.</p></div>}
        </div>

        <aside className="flex flex-col rounded-[24px] border border-[#eee0cf] bg-[linear-gradient(145deg,#fff8ed_0%,#f5e6d2_100%)] p-5 shadow-[0_16px_34px_-28px_rgba(87,44,18,0.5)] xl:min-h-[320px] xl:p-6">
          <div className="mb-3 flex items-center gap-3 border-b border-[#e7cfb3] pb-4"><span className="grid size-11 shrink-0 place-items-center rounded-full bg-white text-[#75401d]"><BadgeCheck className="size-7" /></span><p className="text-[15px] font-extrabold leading-snug text-[#512b15]">Top Quality Products</p></div>
          {[{icon: <BadgeCheck className="size-6" />, title: "Premium quality", detail: "Made fresh with care"}, {icon: <Truck className="size-6" />, title: "Easy delivery", detail: "Confirm your area on WhatsApp"}, {icon: <Phone className="size-6" />, title: "Order support", detail: "We’re here to help"}].map((item) => <div key={item.title} className="flex items-center gap-3 border-b border-[#e7cfb3] py-3"><span className="shrink-0 text-[#713511]">{item.icon}</span><div className="min-w-0"><p className="text-[12px] font-bold leading-snug text-[#512b15]">{item.title}</p><p className="mt-0.5 text-[10px] leading-snug text-[#85694f]">{item.detail}</p></div></div>)}
          <a className="mt-4 inline-flex items-center justify-between gap-2 rounded-xl bg-[#633315] px-4 py-3 text-[11px] font-bold leading-tight text-white transition hover:bg-[#46200d]" href={whatsappUrl} target="_blank" rel="noreferrer">Have a question? Contact us <ArrowRight className="size-4 shrink-0" /></a>
        </aside>
      </div>
    </section>



    <section id="about" className="border-y border-[#ebe3d8] bg-[#f5ecdf] px-5 py-11 sm:px-8 sm:py-14">
      <div className="mx-auto grid max-w-[1200px] gap-7 sm:grid-cols-[0.85fr_1.15fr_0.9fr] sm:items-center sm:gap-10">
        <div><p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#9b5428]">Made for sharing</p><h2 className="mt-2 font-serif text-[24px] font-bold italic text-[#542a14]">Something for every craving.</h2></div>
        <p className="text-sm leading-6 text-[#796858]">From celebration cakes and everyday bakery treats to traditional mithai and crunchy nimko, Sweet Aroma brings your favourites together in one shop.</p>
        <div className="flex flex-col justify-center gap-2 text-xs font-semibold text-[#674126]"><span className="inline-flex items-center gap-2"><Clock3 className="size-4 text-[#9b5428]" /> Freshly prepared selections</span><span className="inline-flex items-center gap-2"><ShoppingBag className="size-4 text-[#9b5428]" /> Order by WhatsApp</span></div>
      </div>
    </section>

    <footer id="contact" className="bg-[#32190f] text-white">
      <div className="mx-auto grid max-w-[1400px] gap-8 px-5 py-9 sm:grid-cols-[1.2fr_1fr_1fr] sm:items-center sm:px-8 lg:px-10">
        <div><Link href="/" className="flex w-fit items-center rounded-2xl bg-white px-3" aria-label="Sweet Aroma Bakery home"><Image src="/sweet-aroma-logo-original.png" alt="Sweet Aroma Bakery & Sweets" width={1536} height={1024} className="h-[74px] w-[112px] object-contain" /></Link><p className="mt-3 max-w-[320px] text-[11px] leading-5 text-white/65">Fresh bakes, celebration cakes and traditional favourites, made with care.</p></div>
        <div className="grid grid-cols-2 gap-3 text-xs font-semibold text-white/80"><Link href="/shop" className="hover:text-white">Shop all</Link><Link href="/about" className="hover:text-white">Our story</Link><Link href="/bakery-gallery" className="hover:text-white">Photo gallery</Link><Link href="/contact" className="hover:text-white">Contact us</Link></div>
        <div className="flex flex-col gap-3"><a className="inline-flex w-fit items-center gap-2 text-xs font-bold text-[#f0c996]" href={whatsappUrl} target="_blank" rel="noreferrer"><Phone className="size-3.5" /> 0312 8869242</a><p className="text-[10px] text-white/60">Questions or custom cake requests? We’re one message away.</p></div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-[10px] text-white/50">© 2026 Sweet Aroma Bakery & Sweets. Freshly made with care.</div>
    </footer>
  </main>
  );
};

export default BakeryHomePage;
