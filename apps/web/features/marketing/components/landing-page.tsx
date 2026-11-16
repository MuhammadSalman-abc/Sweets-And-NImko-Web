"use client";

import type { ReactElement } from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, CakeSlice, ChevronDown, Clock3, Heart, House, Menu, Minus, Music2, Phone, Plus, Search, ShieldCheck, ShoppingBag, ShoppingCart, Truck, UserRound, X } from "lucide-react";
const whatsappUrl = "https://wa.me/923128869242?text=Hi%20Sweet%20Aroma%2C%20I%27d%20like%20to%20place%20an%20order.";

const categories = [
  { title: "Cakes", emoji: "🧁", href: "/shop/cakes" },
  { title: "Cookies", emoji: "🍪", href: "/shop/cookies" },
  { title: "Bakery Items", emoji: "🥐", href: "/shop/bakery-items" },
  { title: "Sweets", emoji: "🍡", href: "/shop/sweets" },
  { title: "Nimko", emoji: "🥣", href: "/shop/nimko" },
  { title: "Gift Packs", emoji: "🎁", href: "/shop/gift-packs" }
] as const;

const products = [
  { name: "Chocolate Cake", price: 1800, image: "/bakery-gallery/cake-display.png", alt: "Chocolate and celebration cakes on display", category: "Cakes" },
  { name: "Chocolate Chunk Cookies", price: 320, image: "/cookies/cookie-02.png", alt: "Freshly baked chunky cookies with chocolate pieces", category: "Cookies" },
  { name: "Fresh Croissants", price: 450, image: "/bakery-gallery/croissants.png", alt: "Fresh almond croissants cooling on a bakery rack", category: "Bakery Items" },
  { name: "Traditional Sweet Box", price: 950, image: "/bakery-gallery/traditional-sweets.svg", alt: "A plate of traditional gulab jamun sweets", category: "Sweets" },
  { name: "Mix Nimko", price: 480, image: "/nimko/nimko-spicy-bowl.png", alt: "A bowl of colorful spicy nimko with peanuts", category: "Nimko" },
  { name: "Sweet Aroma Gift Box", price: 1200, image: "/bakery-gallery/dessert-table.png", alt: "A beautifully arranged bakery dessert table", category: "Gift Packs" }
] as const;

type Product = (typeof products)[number];

const ProductCard = ({ product, onAdd }: { product: Product; onAdd: (product: Product) => void }): ReactElement => (
  <article className="overflow-hidden rounded-[16px] border border-[#f0e4d7] bg-white shadow-[0_7px_20px_-16px_rgba(87,44,18,0.4)] transition hover:-translate-y-1 hover:shadow-[0_16px_30px_-20px_rgba(87,44,18,0.38)]">
    <Link href={`/shop/${product.category.toLowerCase().replaceAll(" ", "-")}`} aria-label={`Browse ${product.category}`} className="group relative block h-[154px] w-full overflow-hidden bg-[#f7eadb] text-left sm:h-[170px]">
      <Image src={product.image} alt={product.alt} fill sizes="(max-width: 640px) 50vw, (max-width: 1200px) 25vw, 240px" className="object-cover transition duration-500 group-hover:scale-105" />
      <span className="absolute left-2.5 top-2.5 rounded-full bg-white/90 px-2.5 py-1 text-[9px] font-semibold text-[#673515]">{product.category}</span>
    </Link>
    <div className="px-3 pb-3 pt-2.5 sm:px-3.5">
      <Link href={`/shop/${product.category.toLowerCase().replaceAll(" ", "-")}`} className="min-h-9 text-left text-[12px] font-bold leading-4 text-[#3f2414] hover:text-[#8d4a22] sm:text-[13px]">{product.name}</Link>
      <p className="mt-1 text-[15px] font-extrabold text-[#b52218]">Rs. {product.price.toLocaleString("en-PK")}</p>
      <div className="mt-2.5 flex items-center justify-center gap-2"><Link href={`/shop/${product.category.toLowerCase().replaceAll(" ", "-")}`} className="inline-flex h-8 items-center gap-1 rounded-full bg-[#713511] px-3.5 text-[10px] font-semibold text-white transition hover:bg-[#54240c] sm:text-[11px]">Explore <ArrowRight className="size-3.5" /></Link><button type="button" onClick={() => onAdd(product)} className="inline-flex h-8 items-center justify-center gap-1.5 rounded-full border border-[#d8bea4] px-3 text-[10px] font-semibold text-[#713511] transition hover:bg-[#fff2e3] sm:text-[11px]"><ShoppingCart className="size-3.5" /> Add</button></div>
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

    <header className="relative z-20 border-b border-[#eee5d9] bg-[#fffdf9]">
      <div className="mx-auto flex min-h-[96px] max-w-[1440px] items-center justify-between gap-3 px-4 py-2 sm:min-h-[112px] sm:px-7 lg:px-10">
        <Link href="/" className="flex shrink-0 items-center" aria-label="Sweet Aroma Bakery home">
          <Image src="/sweet-aroma-logo-original.png" alt="Sweet Aroma Bakery & Sweets — freshly baked, always fresh" width={1536} height={1024} priority className="h-[82px] w-[123px] rounded-xl object-contain sm:h-[100px] sm:w-[150px]" />
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

    <section id="home" className="relative isolate min-h-[410px] overflow-hidden bg-[#e2a35f] sm:min-h-[440px] lg:min-h-[470px]">
      <Image src="/bakery-gallery/sweet-aroma-hero-display.png" alt="Chocolate cake, fresh bakery bread, traditional sweets and nimko at Sweet Aroma" fill priority sizes="100vw" className="absolute inset-0 -z-20 object-cover object-center" />
      <div className="mx-auto flex min-h-[410px] max-w-[1440px] items-center px-5 py-12 sm:min-h-[440px] sm:px-8 lg:min-h-[470px] lg:px-12">
        <div className="max-w-[520px]">
          <p className="font-serif text-[27px] italic leading-tight text-[#8e4c28] sm:text-[34px]">Welcome to</p>
          <h1 className="mt-1 text-[46px] font-extrabold leading-[0.98] tracking-[-0.055em] text-[#4b250f] sm:text-[64px] lg:text-[72px]">Sweet Aroma<span className="mt-2 block text-[26px] font-bold leading-tight tracking-[-0.04em] text-[#673315] sm:text-[35px] lg:text-[39px]">Bakery & Nimko Shop</span></h1>
          <p className="mt-5 max-w-[390px] text-[14px] font-medium leading-6 text-[#432819] sm:text-base sm:leading-7">Fresh Bakery Items, Delicious Sweets and Crispy Nimko — All in One Place!</p>
          <Link href="/shop" className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-[#713511] px-6 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#54240c]">Shop Now <ArrowRight className="size-4" /></Link>
        </div>
      </div>
      <span className="absolute bottom-4 right-5 rounded-full bg-[#4b250f]/55 px-3 py-1 text-[9px] font-medium text-white sm:right-8">A little sweetness, made fresh</span>
    </section>

    <section id="categories" className="scroll-mt-4 px-4 pt-2 sm:px-6">
      <div className="mx-auto grid max-w-[1400px] grid-cols-3 overflow-hidden rounded-[20px] border border-[#eee4d8] bg-[#fffefb] shadow-[0_8px_24px_-18px_rgba(87,44,18,0.35)] sm:grid-cols-4 lg:grid-cols-8">
        {categories.map((category) => (
          <Link href={category.href} key={category.title} className="group flex min-h-[82px] flex-col items-center justify-center gap-1.5 border-r border-[#ead7c4] px-2 py-2 text-center transition hover:bg-[#fff2e3] sm:min-h-[90px]">
            <span aria-hidden="true" className="grid size-10 place-items-center rounded-full bg-[#fff5e9] text-[27px] leading-none shadow-sm transition group-hover:scale-110 sm:size-11">{category.emoji}</span>
            <span className="text-[10px] font-bold text-[#472817] sm:text-[11px]">{category.title}</span>
          </Link>
        ))}
        <div className="col-span-3 flex items-center justify-center gap-3 bg-[#f7eee2] px-3 py-3 text-center sm:col-span-4 lg:col-span-1 lg:flex-col lg:gap-1">
          <span className="grid size-9 place-items-center rounded-full bg-[#713511] text-[#fff5e9]"><ShieldCheck className="size-5" /></span><span className="text-[10px] font-bold leading-4 text-[#502a15] sm:text-[11px]">Freshly made<br />with care</span>
        </div>
      </div>
    </section>

    <section id="products" className="scroll-mt-6 px-4 pb-14 pt-5 sm:px-6 sm:pb-20 sm:pt-6">
      <div className="mx-auto grid max-w-[1400px] items-start gap-5 xl:grid-cols-[minmax(0,1fr)_250px]">
        <div>
          <div className="mb-3 flex min-h-10 items-center gap-2 sm:gap-3"><CakeSlice className="hidden size-6 shrink-0 text-[#713511] sm:block" /><h2 className="shrink-0 text-[19px] font-extrabold tracking-[-0.04em] text-[#542a14] sm:text-[23px]">{searchQuery ? "Search results" : "A taste of everything"}</h2><span className="h-px min-w-3 flex-1 bg-[#b9987a]" /><span className="hidden shrink-0 rounded-full bg-[#f7eadb] px-2.5 py-1 text-[9px] font-semibold text-[#75401d] sm:inline-flex">Explore each collection</span><Link href="/shop" className="inline-flex shrink-0 items-center gap-1 text-[10px] font-bold text-[#542a14] sm:text-[11px]">View All <ArrowRight className="size-3.5" /></Link></div>
          {filteredProducts.length ? <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 xl:grid-cols-6">{filteredProducts.map((product) => <ProductCard key={product.name} product={product} onAdd={addToCart} />)}</div> : <div className="rounded-2xl border border-[#efdfce] bg-white px-5 py-10 text-center"><p className="text-sm font-semibold text-[#542a14]">No matching products found</p><p className="mt-1 text-xs text-[#887766]">Try searching for cakes, cookies, pastries, sweets or nimko.</p></div>}
        </div>

        <aside className="flex flex-col rounded-[20px] border border-[#eee0cf] bg-[#fbf0e2] p-5 xl:min-h-[320px] xl:p-6">
          <div className="mb-3 flex items-center gap-3 border-b border-[#e7cfb3] pb-4"><span className="grid size-11 shrink-0 place-items-center rounded-full bg-white text-[#75401d]"><BadgeCheck className="size-7" /></span><p className="text-[15px] font-extrabold leading-snug text-[#512b15]">Top Quality Products</p></div>
          {[{icon: <BadgeCheck className="size-6" />, title: "Premium quality", detail: "Made fresh with care"}, {icon: <Truck className="size-6" />, title: "Easy delivery", detail: "Confirm your area on WhatsApp"}, {icon: <Phone className="size-6" />, title: "Order support", detail: "We’re here to help"}].map((item) => <div key={item.title} className="flex items-center gap-3 border-b border-[#e7cfb3] py-3"><span className="shrink-0 text-[#713511]">{item.icon}</span><div className="min-w-0"><p className="text-[12px] font-bold leading-snug text-[#512b15]">{item.title}</p><p className="mt-0.5 text-[10px] leading-snug text-[#85694f]">{item.detail}</p></div></div>)}
          <a className="mt-4 inline-flex items-center justify-between gap-2 rounded-xl bg-[#633315] px-4 py-3 text-[11px] font-bold leading-tight text-white transition hover:bg-[#46200d]" href={whatsappUrl} target="_blank" rel="noreferrer">Have a question? Contact us <ArrowRight className="size-4 shrink-0" /></a>
        </aside>
      </div>
    </section>



    <section id="about" className="border-y border-[#ebe3d8] bg-[#f2ede5] px-5 py-9 sm:px-8 sm:py-12">
      <div className="mx-auto grid max-w-[1100px] gap-7 sm:grid-cols-3 sm:gap-10">
        <div><p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#9b5428]">Made for sharing</p><h2 className="mt-2 font-serif text-[24px] font-bold italic text-[#542a14]">Something for every craving.</h2></div>
        <p className="text-sm leading-6 text-[#796858]">From celebration cakes and everyday bakery treats to traditional mithai and crunchy nimko, Sweet Aroma brings your favourites together in one shop.</p>
        <div className="flex flex-col justify-center gap-2 text-xs font-semibold text-[#674126]"><span className="inline-flex items-center gap-2"><Clock3 className="size-4 text-[#9b5428]" /> Freshly prepared selections</span><span className="inline-flex items-center gap-2"><ShoppingBag className="size-4 text-[#9b5428]" /> Order by WhatsApp</span></div>
      </div>
    </section>

    <footer id="contact" className="bg-[#fffdf9]">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-4 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
        <Link href="/" className="flex w-fit items-center" aria-label="Sweet Aroma Bakery home"><Image src="/sweet-aroma-logo-original.png" alt="Sweet Aroma Bakery & Sweets" width={1536} height={1024} className="h-[84px] w-[126px] rounded-xl object-contain" /></Link>
        <p className="text-[11px] text-[#81705d]">Bakery favourites, traditional sweets and crispy nimko.</p>
        <a className="inline-flex w-fit items-center gap-2 text-xs font-bold text-[#75401d]" href={whatsappUrl} target="_blank" rel="noreferrer"><Phone className="size-3.5" /> 0312 8869242</a>
        <a className="inline-flex w-fit items-center gap-1.5 text-xs font-semibold text-[#75401d]" href="/bakery-gallery">Photo gallery <ArrowRight className="size-3.5" /></a>
      </div>
      <div className="border-t border-[#eee0ce] py-3 text-center text-[10px] text-[#93816e]">© 2026 Sweet Aroma Bakery & Sweets. Freshly made with care.</div>
    </footer>
  </main>
  );
};

export default BakeryHomePage;
