"use client";

import { useState, type ReactElement } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Images, X } from "lucide-react";

const photos = [
  { src: "/bakery-gallery/croissants.png", alt: "Fresh almond croissants cooling on a bakery rack", title: "Fresh from the oven", category: "Bakery" , width: 2048, height: 1366 },
  { src: "/bakery-gallery/bakery-display.png", alt: "Pastries arranged beneath glass cake stands", title: "The pastry counter", category: "Pastries", width: 500, height: 750 },
  { src: "/bakery-gallery/celebration-cake.png", alt: "White celebration cake decorated with warm orange flowers", title: "A celebration cake", category: "Cakes", width: 500, height: 750 },
  { src: "/bakery-gallery/cake-selection.png", alt: "A selection of decorated cakes on a bakery table", title: "Made for sharing", category: "Cakes", width: 500, height: 750 },
  { src: "/bakery-gallery/dessert-table.png", alt: "An outdoor dessert table with cake and small sweets", title: "A table of treats", category: "Desserts", width: 500, height: 750 },
  { src: "/bakery-gallery/birthday-desserts.png", alt: "A pink birthday cake with heart-shaped cookies and a camera", title: "A little birthday magic", category: "Celebrations", width: 500, height: 749 },
  { src: "/bakery-gallery/cake-display.png", alt: "Several celebration cakes displayed on stands", title: "The cake collection", category: "Cakes", width: 500, height: 750 },
  { src: "/bakery-gallery/birthday-cake.png", alt: "A golden birthday cake with candles and chocolate decoration", title: "Make a wish", category: "Celebrations", width: 500, height: 281 }
] as const;

const BakeryGalleryPage = (): ReactElement => {
  const [previewPhoto, setPreviewPhoto] = useState<(typeof photos)[number] | null>(null);

  return (
  <main className="min-h-screen bg-[#f9f2e7] text-[#392113]">
    <header className="border-b border-white/10 bg-[#3a2418] text-[#fff7eb]">
      <div className="mx-auto flex min-h-[92px] max-w-[1180px] items-center justify-between px-5 py-2 sm:px-8 lg:px-10">
        <Link href="/" className="flex shrink-0 items-center" aria-label="Back to Sweet Aroma home">
          <Image src="/sweet-aroma-logo.svg" alt="Sweet Aroma Bakery & Sweets" width={1536} height={1024} className="h-[66px] w-[100px] object-contain mix-blend-screen sm:h-[74px] sm:w-[112px]" />
        </Link>
        <Link href="/" className="inline-flex items-center gap-2 rounded-md border border-white/25 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-white/10">
          <ArrowLeft className="size-3.5" /> Back to Sweet Aroma
        </Link>
      </div>
    </header>

    <section className="relative overflow-hidden border-b border-[#ead9c1] bg-[#f1e4d0]">
      <div className="relative mx-auto flex max-w-[1180px] flex-col gap-7 px-5 py-12 sm:px-8 sm:py-16 md:flex-row md:items-end md:justify-between lg:px-10 lg:py-[72px]">
        <div className="max-w-[700px]">
          <div className="mb-4 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#ad803e]"><Images className="size-3.5" /> Sweet Aroma · in pictures</div>
          <h1 className="font-serif text-[40px] font-bold leading-[1.04] tracking-[-0.045em] text-[#382218] sm:text-[54px]">Bakery photo gallery</h1>
          <p className="mt-4 max-w-[580px] text-sm leading-6 text-[#755d48] sm:text-base">A closer look at the cakes, pastries and bakery moments from Sweet Aroma.</p>
        </div>
        <div className="inline-flex w-fit items-center gap-2 border-t border-[#ddc9aa] px-1 pt-3 text-xs text-[#72583d]"><span className="font-serif text-xl font-bold text-[#9a7135]">08</span><span>photos in this collection</span></div>
      </div>
    </section>

    <section className="mx-auto max-w-[1180px] px-5 py-10 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div><p className="font-serif text-lg font-bold text-[#3d281a]">All photos</p><p className="mt-1 text-xs text-[#8a765f]">Tap any picture to view it larger on this page</p></div>
        <span className="hidden items-center gap-1.5 text-[11px] font-medium text-[#8a765f] sm:inline-flex">{photos.length} photos <ArrowUpRight className="size-3.5" /></span>
      </div>
      <div className="a-stagger columns-1 gap-5 sm:columns-2 xl:columns-3">
        {photos.map((photo, index) => (
          <article key={photo.src} className="mb-5 break-inside-avoid overflow-hidden rounded-[14px] border border-[#eadbc7] bg-[#fffaf2] shadow-[0_18px_38px_-30px_rgba(67,37,18,0.5)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_44px_-28px_rgba(67,37,18,0.35)]">
            <button type="button" onClick={() => setPreviewPhoto(photo)} className="group relative block w-full overflow-hidden bg-[#f1e5d3] text-left" aria-label={`View full-size photo on this page: ${photo.alt}`}>
              <Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw" className="h-auto w-full transition duration-500 group-hover:scale-[1.025]" />
              <span className="absolute bottom-3 right-3 grid size-9 place-items-center rounded-full bg-[#fff8ec] text-[#6b421f] opacity-0 shadow-sm transition group-hover:opacity-100"><ArrowUpRight className="size-4" /></span>
            </button>
            <div className="flex items-center justify-between gap-3 px-4 py-3.5 sm:px-5">
              <div className="min-w-0"><p className="truncate font-serif text-sm font-bold text-[#49311f]">{photo.title}</p><p className="mt-1 text-[10px] text-[#8a765f]">Photo {String(index + 1).padStart(2, "0")}</p></div>
              <span className="shrink-0 bg-[#f1e4d0] px-2.5 py-1 text-[10px] font-medium text-[#76572f]">{photo.category}</span>
            </div>
          </article>
        ))}
      </div>
    </section>

    <footer className="border-t border-white/10 bg-[#28170f] text-white">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-4 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
        <div className="flex items-center gap-3"><Image src="/sweet-aroma-logo.svg" alt="Sweet Aroma Bakery & Sweets" width={1536} height={1024} className="h-12 w-[72px] object-contain mix-blend-screen" /><p className="text-xs text-white/65">Bakery photo collection · Sweet Aroma</p></div>
        <Link className="inline-flex w-fit items-center gap-2 text-xs font-semibold text-[#e7b65e]" href="/"><ArrowLeft className="size-3.5" /> Return to Sweet Aroma</Link>
      </div>
    </footer>
    {previewPhoto && <div className="fixed inset-0 z-50 grid place-items-center bg-[#1b110b]/90 p-4 sm:p-8" role="dialog" aria-modal="true" aria-label={previewPhoto.title} onClick={() => setPreviewPhoto(null)}><button type="button" aria-label="Close image preview" onClick={() => setPreviewPhoto(null)} className="absolute right-4 top-4 grid size-11 place-items-center rounded-full border border-white/30 bg-black/30 text-white transition hover:bg-white/15 sm:right-8 sm:top-8"><X className="size-5" /></button><div className="a-modal-in relative h-[min(82vh,900px)] w-full max-w-[1280px]" onClick={(event) => event.stopPropagation()}><Image src={previewPhoto.src} alt={previewPhoto.alt} fill sizes="100vw" className="object-contain" /><p className="absolute inset-x-0 -bottom-8 text-center font-serif text-sm font-semibold text-white sm:-bottom-9 sm:text-base">{previewPhoto.title}</p></div></div>}
  </main>
  );
};

export default BakeryGalleryPage;
