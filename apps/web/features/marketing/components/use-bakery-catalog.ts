"use client";

import { useCallback, useMemo, useSyncExternalStore, type Dispatch, type SetStateAction } from "react";
import { z } from "zod";
import { cakeDesigns, collections, shopCategories } from "./catalog-data";

const productSchema = z.object({
  name: z.string().trim().min(1).max(100),
  image: z.string().trim().min(1).max(1_500_000),
  alt: z.string().trim().min(1).max(200),
  price: z.number().finite().nonnegative(),
  featured: z.boolean(),
  style: z.string().trim().max(40).optional()
});

const categorySchema = z.object({
  title: z.string().trim().min(1).max(60),
  emoji: z.string().trim().min(1).max(8),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  image: z.string().trim().min(1).max(1_500_000),
  alt: z.string().trim().min(1).max(200)
});

const collectionSchema = z.object({
  title: z.string().trim().min(1).max(80),
  eyebrow: z.string().trim().min(1).max(100),
  description: z.string().trim().min(1).max(300),
  heroImage: z.string().trim().min(1).max(1_500_000),
  heroAlt: z.string().trim().min(1).max(200),
  items: z.array(productSchema)
});

export const bakeryCatalogSchema = z.object({
  categories: z.array(categorySchema),
  collections: z.record(z.string(), collectionSchema)
});

export type BakeryCatalog = z.infer<typeof bakeryCatalogSchema>;
export type BakeryCatalogProduct = z.infer<typeof productSchema>;
export type BakeryCatalogCategory = z.infer<typeof categorySchema>;
export type BakeryCatalogCollection = z.infer<typeof collectionSchema>;

const catalogStorageKey = "sweet-aroma-managed-catalog-v1";
const catalogChangedEvent = "sweet-aroma-catalog-changed";

const priceFor = (slug: string, image: string, index: number): number => {
  if (slug === "cookies") {
    if (image === "/cookies/cookie-02.png") return 320;
    if (image === "/cookies/cookie-01.png") return 280;
    return 280 + (index % 5) * 40;
  }
  if (slug === "bakery-items") return image === "/bakery-gallery/croissants.png" ? 450 : 600;
  if (slug === "sweets") return image === "/sweets/mithai-01.png" ? 950 : 1200;
  if (slug === "nimko") return image === "/nimko/nimko-spicy-bowl.png" ? 480 : 280 + index * 50;
  if (slug === "gift-packs") return image === "/bakery-gallery/dessert-table.png" ? 1200 : 950;
  return 1800 + index * 500;
};

const featuredImages: Readonly<Record<string, string>> = {
  cakes: "/cakes/chocolate-cream-sheet-cake.png",
  cookies: "/cookies/cookie-02.png",
  "bakery-items": "/bakery-gallery/croissants.png",
  sweets: "/sweets/mithai-01.png",
  nimko: "/nimko/nimko-spicy-bowl.png",
  "gift-packs": "/bakery-gallery/dessert-table.png"
};

export const createDefaultBakeryCatalog = (): BakeryCatalog => ({
  categories: shopCategories.map((category) => ({ ...category })),
  collections: {
    cakes: {
      title: "Cakes",
      eyebrow: "Made for your celebrations",
      description: "Browse our cake designs and message us to discuss the flavour, size and details you have in mind.",
      heroImage: "/cakes/chocolate-cherry-banner.png",
      heroAlt: "Chocolate drip cake decorated with cream, cherries and chocolate pieces",
      items: cakeDesigns.map((cake) => ({
        ...cake,
        price: cake.image.includes("chocolate-") ? 1800 : ({ Kids: 2800, Celebration: 3500, Chocolate: 3200, Birthday: 3000, Wedding: 12000 }[cake.style]),
        featured: cake.image === "/cakes/chocolate-cream-sheet-cake.png"
      }))
    },
    ...Object.fromEntries(Object.entries(collections).map(([slug, collection]) => [
    slug,
    {
      ...collection,
      items: collection.items.map((item, index) => ({
        ...item,
        price: priceFor(slug, item.image, index),
        featured: featuredImages[slug] === item.image
      }))
    }
    ]))
  } as BakeryCatalog["collections"]
});

const defaultCatalogSnapshot = JSON.stringify(createDefaultBakeryCatalog());

const getCatalogSnapshot = (): string => {
  try {
    return window.localStorage.getItem(catalogStorageKey) ?? defaultCatalogSnapshot;
  } catch {
    return defaultCatalogSnapshot;
  }
};

const subscribeToCatalog = (notify: () => void): (() => void) => {
  const onStorage = (event: StorageEvent): void => {
    if (event.key === catalogStorageKey) notify();
  };
  window.addEventListener("storage", onStorage);
  window.addEventListener(catalogChangedEvent, notify);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(catalogChangedEvent, notify);
  };
};

const parseCatalogSnapshot = (snapshot: string): BakeryCatalog => {
  try {
    const result = bakeryCatalogSchema.safeParse(JSON.parse(snapshot) as unknown);
    return result.success ? result.data : createDefaultBakeryCatalog();
  } catch {
    return createDefaultBakeryCatalog();
  }
};

export const useBakeryCatalog = (): [BakeryCatalog, Dispatch<SetStateAction<BakeryCatalog>>] => {
  const snapshot = useSyncExternalStore(subscribeToCatalog, getCatalogSnapshot, () => defaultCatalogSnapshot);
  const catalog = useMemo(() => parseCatalogSnapshot(snapshot), [snapshot]);
  const setCatalog = useCallback<Dispatch<SetStateAction<BakeryCatalog>>>((nextValue) => {
    const current = parseCatalogSnapshot(getCatalogSnapshot());
    const nextCatalog = typeof nextValue === "function" ? nextValue(current) : nextValue;
    const validCatalog = bakeryCatalogSchema.safeParse(nextCatalog);
    if (!validCatalog.success) return;
    try {
      window.localStorage.setItem(catalogStorageKey, JSON.stringify(validCatalog.data));
      window.dispatchEvent(new Event(catalogChangedEvent));
    } catch {
      // Keep the current catalog usable when browser storage is unavailable.
    }
  }, []);

  return [catalog, setCatalog];
};
