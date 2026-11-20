"use client";

import { useState, type ReactElement } from "react";
import Image from "next/image";
import { ArrowUpRight, CakeSlice, Check, MessageCircle, ShoppingCart, X } from "lucide-react";
import { useBakeryCart } from "./use-bakery-cart";
import { useBakeryCatalog } from "./use-bakery-catalog";
import WhatsAppOrderLink from "./whatsapp-order-link";



const cakeStyles = ["All Cakes", "Birthday", "Kids", "Chocolate", "Wedding", "Celebration"] as const;
const whatsappBase = "https://wa.me/923128869242?text=";

type CakeStyle = (typeof cakeStyles)[number];

const CakeCollection = (): ReactElement => {
  const [activeStyle, setActiveStyle] = useState<CakeStyle>("All Cakes");
  const [catalog] = useBakeryCatalog();
  const cakeCollection = catalog.collections.cakes;
  const cakeDesigns = cakeCollection?.items ?? [];
  const [previewCake, setPreviewCake] = useState<(typeof cakeDesigns)[number] | null>(null);
  const cart = useBakeryCart();
  const visibleCakes = cakeDesigns.filter((cake) => activeStyle === "All Cakes" || cake.style === activeStyle);
  const orderText = `Hi Sweet Aroma, I would like to ask about these cake designs: ${cart.items.map((cake) => `${cake.name} x${cake.quantity}`).join(", ")}. Sample starting total: Rs. ${cart.total.toLocaleString("en-PK")} (please confirm size and final price).`;

  return (
    <section id="cakes" className="scroll-mt-6 bg-[#f9f2e7] px-4 py-7 sm:px-6 sm:py-10 lg:py-12">
      <div className="mx-auto max-w-[1400px]">
        <div className="relative isolate flex min-h-[540px] flex-col justify-center overflow-hidden rounded-[28px] bg-[#612f15] px-6 py-9 shadow-[0_24px_70px_-34px_rgba(80,37,15,0.55)] sm:min-h-[500px] sm:px-10 lg:aspect-[3/1] lg:min-h-[440px] lg:px-14">
          <Image src={cakeCollection?.heroImage ?? "/cakes/chocolate-cherry-banner.png"} alt={cakeCollection?.heroAlt ?? "Chocolate drip sheet cake decorated with cream, cherries and chocolate pieces"} fill priority sizes="100vw" className="absolute inset-0 -z-20 object-contain object-center" />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(43,19,9,0.94)_0%,rgba(54,24,10,0.84)_34%,rgba(63,29,12,0.45)_58%,rgba(63,29,12,0.08)_100%)]" />
          <div className="relative z-10 max-w-[690px]">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-md"><CakeSlice className="size-3.5" /> {cakeCollection?.eyebrow ?? "Sweet Aroma · Cake collection"}</span>
            <h1 className="mt-5 max-w-[620px] font-serif text-[38px] font-bold leading-[1.04] tracking-[-0.045em] text-white drop-shadow-sm sm:text-[54px] lg:text-[60px]">Cakes for Your<br className="hidden sm:block" /> Special Moments</h1>
            <p className="mt-4 max-w-[510px] text-sm leading-6 text-white/90 sm:text-base sm:leading-7">{cakeCollection?.description ?? "Browse our cake designs and message us to discuss the flavour, size and details you have in mind."}</p>
            <a href={`${whatsappBase}${encodeURIComponent("Hi Sweet Aroma, I would like to ask about a custom cake.")}`} target="_blank" rel="noreferrer" className="mt-6 inline-flex w-fit items-center gap-2.5 rounded-full bg-[#fffaf3] px-5 py-3.5 text-xs font-bold text-[#633015] shadow-[0_8px_24px_-12px_rgba(0,0,0,0.55)] transition hover:-translate-y-0.5 hover:bg-white"><MessageCircle className="size-4" /> Ask about a custom cake <ArrowUpRight className="size-3.5" /></a>
          </div>
        </div>

        <div className="mt-9 flex flex-col gap-4 border-b border-[#eadccc] pb-5 sm:mt-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#a36337]">Made for your celebrations</p>
            <div className="mt-1.5 flex items-baseline gap-3"><h2 className="font-serif text-[27px] font-bold tracking-[-0.035em] text-[#512911] sm:text-[32px]">Explore our cakes</h2><span className="text-xs font-medium text-[#8a7766]">{visibleCakes.length} designs</span></div>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1" aria-label="Filter cake designs">
            {cakeStyles.map((style) => <button key={style} type="button" aria-pressed={activeStyle === style} onClick={() => setActiveStyle(style)} className={`shrink-0 rounded-full border px-4 py-2.5 text-[11px] font-semibold transition duration-200 ${activeStyle === style ? "border-[#713511] bg-[#713511] text-white shadow-[0_5px_14px_-8px_rgba(71,31,10,0.75)]" : "border-[#e7d6c3] bg-white/80 text-[#68452e] hover:border-[#c8966e] hover:bg-white"}`}>{style}</button>)}
          </div>
        </div>

        <div key={activeStyle} className="a-stagger mt-6 grid grid-cols-2 gap-3.5 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
          {visibleCakes.map((cake) => {
            const price = cake.price;
            const style = cake.style ?? "Chocolate";
            const id = `cakes:${cake.image}`;
            const quantity = cart.items.find((entry) => entry.id === id)?.quantity ?? 0;
            const added = quantity > 0;
            return (
            <article key={cake.image} className="group overflow-hidden rounded-[20px] border border-[#eee2d4] bg-white shadow-[0_10px_28px_-22px_rgba(87,44,18,0.55)] transition duration-300 hover:-translate-y-1 hover:border-[#dfc4a8] hover:shadow-[0_20px_36px_-22px_rgba(87,44,18,0.45)]">
              <button type="button" onClick={() => setPreviewCake(cake)} className="relative block aspect-[4/3] w-full overflow-hidden bg-[#f1ebe4] text-left" aria-label={`View ${cake.name} on this page`}>
                <Image src={cake.image} alt={cake.alt} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw" unoptimized={cake.image.startsWith("data:")} className="object-cover transition duration-500 group-hover:scale-105" />
                <span className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/25 to-transparent opacity-70" />
                <span className="absolute left-2.5 top-2.5 rounded-full border border-white/70 bg-white/90 px-2.5 py-1.5 text-[9px] font-semibold text-[#713511] shadow-sm backdrop-blur-sm">{style}</span>
                <span className="absolute bottom-2.5 right-2.5 grid size-8 translate-y-1 place-items-center rounded-full bg-white/95 text-[#713511] opacity-0 shadow-md transition duration-200 group-hover:translate-y-0 group-hover:opacity-100"><ArrowUpRight className="size-4" /></span>
              </button>
              <div className="px-2.5 py-3 sm:px-4"><p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-[#a0785b]">Sweet Aroma cakes</p><h3 className="mt-1 min-h-10 text-[11px] font-bold leading-4 text-[#432819] sm:min-h-9 sm:text-xs">{cake.name}</h3><div className="mt-2 flex min-w-0 items-center justify-between gap-1.5"><span className="whitespace-nowrap text-[11px] font-bold text-[#80551e] sm:text-sm">From Rs. {price.toLocaleString("en-PK")}</span><button type="button" aria-label={`Add ${cake.name} to cart`} onClick={() => cart.addItem({ id, name: cake.name, price, image: cake.image, category: "Cakes" })} className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#3a2418] text-white transition hover:bg-[#59371f] sm:h-9 sm:w-auto sm:gap-1.5 sm:px-3 sm:text-[10px] sm:font-bold sm:uppercase sm:tracking-[0.06em]">{added ? <Check className="size-4 text-[#e1ad58]" /> : <ShoppingCart className="size-4 text-[#e1ad58]" />}<span className="hidden sm:inline">{added ? `Add (${quantity})` : "Add"}</span></button></div></div>
            </article>
          );})}
        </div>
      </div>
      <p className="mt-4 text-right text-[10px] font-medium text-[#8b7865]">Sample starting prices · custom size and design may change the final price</p>
      {cart.count > 0 && <aside className="a-slide-up fixed inset-x-3 bottom-3 z-40 mx-auto flex max-w-[720px] flex-col items-stretch justify-between gap-2 rounded-2xl border border-[#e8d5bf] bg-[#fffaf2] px-4 py-3 shadow-[0_18px_55px_-18px_rgba(43,23,13,0.55)] sm:inset-x-6 sm:flex-row sm:items-center sm:gap-4 sm:px-5"><div><p className="text-xs font-bold text-[#542a14]">{cart.count} {cart.count === 1 ? "item" : "items"} in your cart</p><p className="mt-0.5 text-[10px] text-[#806c55]">Sample starting total: Rs. {cart.total.toLocaleString("en-PK")}</p></div><WhatsAppOrderLink message={orderText} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-[#3a2418] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#59371f]">Confirm on WhatsApp <ArrowUpRight className="size-4 text-[#e1ad58]" /></WhatsAppOrderLink></aside>}
      {previewCake && <div className="fixed inset-0 z-50 grid place-items-center bg-[#1b110b]/90 p-4 sm:p-8" role="dialog" aria-modal="true" aria-label={previewCake.name} onClick={() => setPreviewCake(null)}><button type="button" aria-label="Close image preview" onClick={() => setPreviewCake(null)} className="absolute right-4 top-4 grid size-11 place-items-center rounded-full border border-white/30 bg-black/30 text-white transition hover:bg-white/15 sm:right-8 sm:top-8"><X className="size-5" /></button><div className="a-modal-in relative h-[min(82vh,820px)] w-full max-w-[1280px]" onClick={(event) => event.stopPropagation()}><Image src={previewCake.image} alt={previewCake.alt} fill sizes="100vw" className="object-contain" /><p className="absolute inset-x-0 -bottom-8 text-center font-serif text-sm font-semibold text-white sm:-bottom-9 sm:text-base">{previewCake.name}</p></div></div>}
    </section>
  );
};

export default CakeCollection;
