import Image from "next/image";
import Link from "next/link";
import type { ReactElement } from "react";
import { ArrowRight, Clock3, Heart, MapPin, MessageCircle, Phone, ShoppingBag } from "lucide-react";

const whatsapp = "https://wa.me/923128869242?text=Hello%20Sweet%20Aroma%2C%20I%20have%20a%20question.";

const InfoHeader = ({ current }: { current: "about" | "contact" }): ReactElement => (
  <header className="sticky top-0 z-30 border-b border-white/10 bg-[#3a2418] text-[#fff7eb] shadow-[0_12px_28px_-20px_rgba(30,16,8,0.8)]">
    <div className="mx-auto flex min-h-[76px] max-w-[1400px] items-center justify-between gap-4 px-5 sm:min-h-[88px] sm:px-8 lg:px-10">
      <Link href="/" aria-label="Sweet Aroma home" className="rounded-xl bg-[#f8ead5] px-2"><Image src="/sweet-aroma-logo-original.png" alt="Sweet Aroma Bakery & Sweets" width={1536} height={1024} className="h-[66px] w-[100px] object-contain sm:h-[74px] sm:w-[112px]" /></Link>
      <nav className="flex items-center gap-1 sm:gap-2" aria-label="Main navigation"><Link href="/" className="hidden rounded-full px-3 py-2.5 text-xs font-semibold text-white/80 transition hover:bg-white/10 sm:inline-flex">Home</Link><Link href="/shop" className="rounded-full px-3 py-2.5 text-[11px] font-semibold text-white/80 transition hover:bg-white/10 sm:text-xs">Shop</Link><Link href="/about" aria-current={current === "about" ? "page" : undefined} className={`rounded-full px-3 py-2.5 text-[11px] font-semibold transition sm:text-xs ${current === "about" ? "bg-[#dfa853] text-[#2d1a10]" : "text-white/80 hover:bg-white/10"}`}>About</Link><Link href="/contact" aria-current={current === "contact" ? "page" : undefined} className={`rounded-full px-3 py-2.5 text-[11px] font-semibold transition sm:text-xs ${current === "contact" ? "bg-[#dfa853] text-[#2d1a10]" : "text-white/80 hover:bg-white/10"}`}>Contact</Link></nav>
    </div>
  </header>
);

const InfoFooter = (): ReactElement => (
  <footer className="bg-[#28170f] px-5 py-6 text-center text-xs text-white/70">Sweet Aroma · Freshly made with care · <a className="font-semibold text-[#e7b65e]" href={whatsapp} target="_blank" rel="noreferrer">Chat with us <ArrowRight className="inline size-3.5" /></a><p className="mt-2 text-[10px] text-white/45">© 2026 Sweet Aroma Bakery &amp; Sweets</p></footer>
);

export const AboutPage = (): ReactElement => (
  <main className="min-h-screen bg-[#f9f2e7] text-[#392113]">
    <InfoHeader current="about" />
    <section className="relative isolate overflow-hidden bg-[#f1e4d0]">
      <div className="absolute inset-y-0 right-0 w-full sm:w-[58%]"><Image src="/bakery-gallery/sweet-aroma-hero-display.png" alt="Sweet Aroma cakes, bakery treats, sweets and nimko" fill priority sizes="(max-width: 640px) 100vw, 58vw" className="object-cover object-center" /><div className="absolute inset-0 bg-[linear-gradient(90deg,#f1e4d0_0%,rgba(241,228,208,0.93)_28%,rgba(241,228,208,0.2)_100%)] sm:bg-[linear-gradient(90deg,#f1e4d0_0%,rgba(241,228,208,0.9)_19%,rgba(241,228,208,0.08)_82%)]" /></div>
      <div className="relative mx-auto flex min-h-[480px] max-w-[1400px] items-center px-5 py-14 sm:min-h-[520px] sm:px-8 lg:px-12"><div className="max-w-[660px]"><Link href="/" className="inline-flex items-center gap-2 rounded-full border border-[#e5ceb5] bg-white/75 px-3.5 py-2 text-xs font-semibold text-[#75401d] backdrop-blur-sm"><ArrowRight className="size-3.5 rotate-180" /> Back home</Link><p className="mt-8 text-[10px] font-bold uppercase tracking-[0.18em] text-[#9b5428]">Our story</p><h1 className="mt-3 font-serif text-[42px] font-bold leading-[1.03] tracking-[-0.045em] text-[#542a14] sm:text-[60px]">A little sweetness,<br />made fresh.</h1><p className="mt-5 max-w-[560px] text-sm leading-7 text-[#715d4b] sm:text-base">Sweet Aroma brings celebration cakes, freshly baked cookies and bakery favourites together with traditional sweets and crispy nimko. We prepare every order with care, for everyday treats and moments worth sharing.</p><Link href="/shop" className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#713511] px-6 py-3.5 text-xs font-bold text-white shadow-[0_12px_24px_-12px_rgba(76,34,13,0.65)] transition hover:-translate-y-0.5 hover:bg-[#54240c]">Explore our collections <ArrowRight className="size-4" /></Link></div></div>
    </section>
    <section className="mx-auto grid max-w-[1200px] gap-4 px-5 py-10 sm:grid-cols-3 sm:px-8 sm:py-14">{[{ icon: <Heart className="size-5" />, title: "Made with care", detail: "Thoughtful treats for celebrations and everyday cravings." }, { icon: <Clock3 className="size-5" />, title: "Fresh selections", detail: "Choose your favourites and confirm availability when ordering." }, { icon: <ShoppingBag className="size-5" />, title: "Simple ordering", detail: "Message us directly to discuss flavours, sizes and delivery." }].map((item) => <article key={item.title} className="rounded-[22px] border border-[#eee3d8] bg-white p-5 shadow-[0_12px_30px_-26px_rgba(67,37,18,0.55)] sm:p-6"><span className="grid size-11 place-items-center rounded-2xl bg-[#fff2e3] text-[#8d4a22]">{item.icon}</span><h2 className="mt-4 font-serif text-lg font-bold text-[#542a14]">{item.title}</h2><p className="mt-2 text-xs leading-5 text-[#796858]">{item.detail}</p></article>)}</section>
    <InfoFooter />
  </main>
);

export const ContactPage = (): ReactElement => (
  <main className="min-h-screen bg-[#f9f2e7] text-[#392113]">
    <InfoHeader current="contact" />
    <section className="relative overflow-hidden bg-[#f1e4d0] px-5 py-12 sm:py-16">
      <div className="absolute -right-16 -top-32 size-[340px] rounded-full border border-[#d8bda1]/30 sm:size-[480px]" /><div className="absolute -right-4 -top-20 size-[250px] rounded-full border border-[#d8bda1]/25 sm:size-[390px]" />
      <div className="relative mx-auto grid max-w-[1200px] gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center lg:gap-16">
        <div><Link href="/" className="inline-flex items-center gap-2 rounded-full border border-[#e5ceb5] bg-white/70 px-3.5 py-2 text-xs font-semibold text-[#75401d]"><ArrowRight className="size-3.5 rotate-180" /> Home</Link><p className="mt-8 text-[10px] font-bold uppercase tracking-[0.18em] text-[#9b5428]">We’re happy to help</p><h1 className="mt-3 max-w-[650px] font-serif text-[42px] font-bold leading-[1.03] tracking-[-0.045em] text-[#542a14] sm:text-[60px]">Let’s make it<br className="sm:hidden" /> a little sweeter.</h1><p className="mt-5 max-w-[560px] text-sm leading-7 text-[#796858] sm:text-base">Ask about today’s selection, custom cake details, delivery or gift packs. We’ll help you choose.</p><a href={whatsapp} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2.5 rounded-full bg-[#713511] px-6 py-3.5 text-xs font-bold text-white shadow-[0_12px_24px_-12px_rgba(76,34,13,0.65)] transition hover:-translate-y-0.5 hover:bg-[#54240c]"><MessageCircle className="size-4" /> Chat on WhatsApp <ArrowRight className="size-3.5" /></a></div>
        <div className="rounded-[26px] border border-white/80 bg-white/85 p-4 shadow-[0_24px_60px_-36px_rgba(75,40,18,0.42)] backdrop-blur-sm sm:p-6"><p className="px-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#a36337]">Get in touch</p><div className="mt-3 grid gap-3"><a href="tel:+923128869242" className="group flex items-center gap-4 rounded-[18px] border border-[#eee3d8] bg-[#fffdfa] p-4 transition hover:border-[#d7b99b] hover:bg-[#fff8ef]"><span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[#f8ead8] text-[#75401d]"><Phone className="size-5" /></span><span className="min-w-0"><span className="block text-[10px] text-[#93816e]">Call or WhatsApp</span><span className="mt-1 block text-sm font-bold text-[#542a14]">0312 8869242</span></span><ArrowRight className="ml-auto size-4 text-[#a0785b] transition group-hover:translate-x-1" /></a><div className="flex items-center gap-4 rounded-[18px] border border-[#eee3d8] bg-[#fffdfa] p-4"><span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[#f8ead8] text-[#75401d]"><MapPin className="size-5" /></span><span><span className="block text-[10px] text-[#93816e]">Delivery</span><span className="mt-1 block text-sm font-bold text-[#542a14]">Confirm your area with us</span></span></div></div><p className="mt-4 flex items-center gap-2 px-1 text-[10px] text-[#887766]"><Clock3 className="size-3.5" /> Message us for availability and order timing.</p></div>
      </div>
    </section>
    <InfoFooter />
  </main>
);
