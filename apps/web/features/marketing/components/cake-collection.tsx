"use client";

import { useState, type ReactElement } from "react";
import Image from "next/image";
import { ArrowUpRight, CakeSlice, MessageCircle } from "lucide-react";

const cakeDesigns = [
  { name: "Little Bear Pond Cake", style: "Kids", image: "/cakes/cake-01.png", alt: "Playful white cake with a blue pond, fruit and little bear decorations" },
  { name: "Safari Island Cake", style: "Kids", image: "/cakes/cake-02.png", alt: "White safari themed cake with palm trees and animal decorations" },
  { name: "Pakistan Flag Cake", style: "Celebration", image: "/cakes/cake-03.png", alt: "Green and white celebration cake decorated with the Pakistan flag colours" },
  { name: "Three Friends Cake", style: "Kids", image: "/cakes/cake-04.png", alt: "White cake with three playful pink character decorations" },
  { name: "Safari Cake Side View", style: "Kids", image: "/cakes/cake-05.png", alt: "Side view of a safari themed cake with palm trees and animal figures" },
  { name: "Jungle Pond Cake", style: "Kids", image: "/cakes/cake-06.png", alt: "Top view of a green pond themed cake with small animal decorations" },
  { name: "Little Bear Cake Top View", style: "Kids", image: "/cakes/cake-07.png", alt: "Top view of a colorful bear and pond themed cake" },
  { name: "The Hunt Is Over Cake", style: "Chocolate", image: "/cakes/cake-08.png", alt: "Dark chocolate cake with red heart candles and a The Hunt Is Over topper" },
  { name: "Football Birthday Cake", style: "Birthday", image: "/cakes/cake-09.png", alt: "Two tier birthday cake decorated with footballs and a number two candle" },
  { name: "Candlelit Chocolate Cake", style: "Chocolate", image: "/cakes/cake-10.png", alt: "Small chocolate cake with one lit candle on a plate" },
  { name: "Heart Sprinkle Cake", style: "Birthday", image: "/cakes/cake-11.png", alt: "White cake decorated with red hearts" },
  { name: "Chocolate Celebration Cake", style: "Chocolate", image: "/cakes/cake-12.png", alt: "Chocolate cake with decorative chocolate toppers" },
  { name: "Red Rose Wedding Cake", style: "Wedding", image: "/cakes/cake-13.png", alt: "Tiered white wedding cake decorated with red roses" },
  { name: "Chocolate Birthday Cake", style: "Chocolate", image: "/cakes/cake-14.png", alt: "Dark chocolate cake with cream decoration and a strawberry" },
  { name: "Rustic Floral Wedding Cake", style: "Wedding", image: "/cakes/cake-15.png", alt: "Rustic tiered cake decorated with dried flowers" },
  { name: "Raspberry Glaze Cake", style: "Celebration", image: "/cakes/cake-16.png", alt: "Glossy pink raspberry cake topped with fresh berries" },
  { name: "Chocolate Berry Cake", style: "Chocolate", image: "/cakes/cake-17.png", alt: "Chocolate cake decorated with berries and chocolate cream" },
  { name: "Anniversary Chocolate Cake", style: "Chocolate", image: "/cakes/cake-18.png", alt: "Dark celebration cake with a candle and cream decoration" },
  { name: "Butterfly Birthday Cake", style: "Birthday", image: "/cakes/cake-19.png", alt: "Pink and purple tiered birthday cake decorated with butterflies" },
  { name: "Chocolate Chip Cake", style: "Chocolate", image: "/cakes/cake-20.png", alt: "Chocolate cake topped with chocolate chips" },
  { name: "Sparkler Birthday Cake", style: "Birthday", image: "/cakes/cake-21.png", alt: "Birthday cake with a lit sparkler candle" },
  { name: "Blue Cream Celebration Cake", style: "Celebration", image: "/cakes/cake-22.png", alt: "Round cake decorated with pale blue and lavender cream" },
  { name: "Classic Birthday Cake", style: "Birthday", image: "/cakes/cake-23.png", alt: "Black and white birthday cake with candles and flower decorations" }
  ,{ name: "Golden Birthday Cake", style: "Birthday", image: "/cakes/birthday-cake.png", alt: "Golden birthday cake decorated with cream and a happy birthday topper" }
] as const;

const cakeStyles = ["All Cakes", "Birthday", "Kids", "Chocolate", "Wedding", "Celebration"] as const;
const whatsappBase = "https://wa.me/923128869242?text=";

type CakeStyle = (typeof cakeStyles)[number];

const CakeCollection = (): ReactElement => {
  const [activeStyle, setActiveStyle] = useState<CakeStyle>("All Cakes");
  const visibleCakes = cakeDesigns.filter((cake) => activeStyle === "All Cakes" || cake.style === activeStyle);

  return (
    <section id="cakes" className="scroll-mt-6 border-y border-[#ebe3d8] bg-[#f5f0e9] px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-[680px]">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#e8d8c5] bg-white/80 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#7b421f]"><CakeSlice className="size-3.5" /> Sweet Aroma cake collection</span>
            <h2 className="mt-3 font-serif text-[30px] font-bold leading-tight tracking-[-0.04em] text-[#542a14] sm:text-[38px]">Cakes for Your Special Moments</h2>
            <p className="mt-2 text-sm leading-6 text-[#796858]">Browse all 24 cake designs and message us to discuss the flavour, size and details you have in mind.</p>
          </div>
          <a href={`${whatsappBase}${encodeURIComponent("Hi Sweet Aroma, I would like to ask about a custom cake.")}`} target="_blank" rel="noreferrer" className="inline-flex w-fit items-center gap-2 rounded-full bg-[#713511] px-5 py-3 text-xs font-bold text-white shadow-sm transition hover:bg-[#54240c]"><MessageCircle className="size-4" /> Ask about a custom cake</a>
        </div>

        <div className="mt-7 flex gap-2 overflow-x-auto pb-1" aria-label="Filter cake designs">
          {cakeStyles.map((style) => <button key={style} type="button" aria-pressed={activeStyle === style} onClick={() => setActiveStyle(style)} className={`shrink-0 rounded-full border px-4 py-2 text-[11px] font-semibold transition ${activeStyle === style ? "border-[#713511] bg-[#713511] text-white" : "border-[#e7d6c3] bg-white/80 text-[#68452e] hover:bg-white"}`}>{style}</button>)}
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
          {visibleCakes.map((cake) => (
            <article key={cake.image} className="group overflow-hidden rounded-[18px] border border-[#eee5d9] bg-white shadow-[0_8px_24px_-20px_rgba(87,44,18,0.42)] transition hover:-translate-y-1 hover:shadow-[0_16px_32px_-20px_rgba(87,44,18,0.34)]">
              <a href={cake.image} target="_blank" rel="noreferrer" className="relative block aspect-[4/3] overflow-hidden bg-[#f1ebe4]" aria-label={`View full image of ${cake.name}`}>
                <Image src={cake.image} alt={cake.alt} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw" className="object-cover transition duration-500 group-hover:scale-105" />
                <span className="absolute right-2.5 top-2.5 rounded-full bg-white/90 px-2.5 py-1 text-[9px] font-semibold text-[#713511]">{cake.style}</span>
              </a>
              <a href={`${whatsappBase}${encodeURIComponent(`Hi Sweet Aroma, I am interested in the ${cake.name} design.`)}`} target="_blank" rel="noreferrer" className="flex min-h-[74px] items-center justify-between gap-2 px-3 py-2.5">
                <h3 className="text-[11px] font-bold leading-4 text-[#432819] sm:text-xs">{cake.name}</h3>
                <ArrowUpRight className="size-4 shrink-0 text-[#9b5428] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CakeCollection;
