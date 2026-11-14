import Image from "next/image";
import Link from "next/link";
import type { ReactElement } from "react";
import { ArrowLeft, ArrowUpRight, Images } from "lucide-react";

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

const BakeryGalleryPage = (): ReactElement => (
  <main className="min-h-screen bg-[#fff7ed] text-[#4a2817]">
    <header className="border-b border-[#eee0ce] bg-[#fffaf4]">
      <div className="mx-auto flex min-h-[92px] max-w-[1180px] items-center justify-between px-5 py-2 sm:px-8 lg:px-10">
        <Link href="/" className="flex items-center" aria-label="Back to Sweet Aroma home">
          <Image src="/sweet-aroma-logo-original.png" alt="Sweet Aroma Bakery & Sweets" width={1536} height={1024} className="h-[76px] w-[114px] rounded-xl object-contain sm:h-[84px] sm:w-[126px]" />
        </Link>
        <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-[#e8d5bf] bg-white px-4 py-2.5 text-xs font-semibold text-[#633315] transition hover:bg-[#fff1df]">
          <ArrowLeft className="size-3.5" /> Back to Sweet Aroma
        </Link>
      </div>
    </header>

    <section className="relative overflow-hidden border-b border-[#eee0ce] bg-[#f8ead8]">
      <div className="pointer-events-none absolute -right-24 -top-40 size-[420px] rounded-full border border-[#e8d5bf]" />
      <div className="pointer-events-none absolute -right-4 -top-20 size-[290px] rounded-full border border-[#e8d5bf]" />
      <div className="relative mx-auto flex max-w-[1180px] flex-col gap-7 px-5 py-12 sm:px-8 sm:py-16 md:flex-row md:items-end md:justify-between lg:px-10 lg:py-[72px]">
        <div className="max-w-[700px]">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#e8d5bf] bg-white/70 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.13em] text-[#75401d]"><Images className="size-3.5" /> Separate photo collection</div>
          <h1 className="font-serif text-[40px] font-semibold leading-[1.04] tracking-[-0.045em] text-[#55280f] sm:text-[54px]">Bakery photo gallery</h1>
          <p className="mt-4 max-w-[580px] text-sm leading-6 text-[#796858] sm:text-base">A dedicated place for the bakery images you shared, kept separate from the Sweet Aroma shop homepage.</p>
        </div>
        <div className="inline-flex w-fit items-center gap-2 rounded-xl border border-[#e8d5bf] bg-white/70 px-4 py-3 text-xs text-[#75401d]"><span className="font-semibold">08</span><span className="text-[#93816e]">photos in this collection</span></div>
      </div>
    </section>

    <section className="mx-auto max-w-[1180px] px-5 py-10 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div><p className="text-sm font-semibold text-[#58351f]">All photos</p><p className="mt-1 text-xs text-[#93816e]">Original images, in the order you shared them</p></div>
        <span className="hidden items-center gap-1.5 text-[11px] font-medium text-[#93816e] sm:inline-flex">Open a photo <ArrowUpRight className="size-3.5" /></span>
      </div>
      <div className="columns-1 gap-5 sm:columns-2 xl:columns-3">
        {photos.map((photo, index) => (
          <article key={photo.src} className="mb-5 break-inside-avoid overflow-hidden rounded-[20px] border border-[#eee0ce] bg-white shadow-[0_10px_32px_-25px_rgba(87,44,18,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-26px_rgba(87,44,18,0.4)]">
            <a href={photo.src} target="_blank" rel="noreferrer" className="group block overflow-hidden bg-[#f8ead8]" aria-label={`Open full-size photo: ${photo.alt}`}>
              <Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw" className="h-auto w-full transition duration-500 group-hover:scale-[1.025]" />
            </a>
            <div className="flex items-center justify-between gap-3 px-4 py-3.5 sm:px-5">
              <div className="min-w-0"><p className="truncate text-sm font-semibold text-[#58351f]">{photo.title}</p><p className="mt-1 text-[10px] text-[#93816e]">Photo {String(index + 1).padStart(2, "0")}</p></div>
              <span className="shrink-0 rounded-full bg-[#f8ead8] px-2.5 py-1 text-[10px] font-medium text-[#75401d]">{photo.category}</span>
            </div>
          </article>
        ))}
      </div>
    </section>

    <footer className="border-t border-[#eee0ce] bg-[#fffaf4]">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-4 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
        <div className="flex items-center gap-2"><Image src="/sweet-aroma-logo-original.png" alt="" width={1536} height={1024} className="h-12 w-[72px] rounded-lg object-contain" /><p className="text-xs text-[#93816e]">Bakery photo collection · Sweet Aroma</p></div>
        <Link className="inline-flex w-fit items-center gap-2 text-xs font-semibold text-[#75401d]" href="/"><ArrowLeft className="size-3.5" /> Return to Sweet Aroma</Link>
      </div>
    </footer>
  </main>
);

export default BakeryGalleryPage;
