"use client";

import { useCallback, useEffect, useState } from "react";

export type BakeryCartProduct = {
  readonly id: string;
  readonly name: string;
  readonly price: number;
  readonly image: string;
  readonly category: string;
};

export type BakeryCartEntry = BakeryCartProduct & { readonly quantity: number };

const storageKey = "sweet-aroma-cart-v1";
const cartChangedEvent = "sweet-aroma-cart-changed";

const readCart = (): BakeryCartEntry[] => {
  try {
    const stored = window.localStorage.getItem(storageKey);
    if (!stored) return [];
    const parsed: unknown = JSON.parse(stored);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((value): value is BakeryCartEntry =>
      typeof value === "object" && value !== null &&
      "id" in value && typeof value.id === "string" &&
      "name" in value && typeof value.name === "string" &&
      "price" in value && typeof value.price === "number" && Number.isFinite(value.price) &&
      "image" in value && typeof value.image === "string" &&
      "category" in value && typeof value.category === "string" &&
      "quantity" in value && typeof value.quantity === "number" && Number.isInteger(value.quantity) && value.quantity > 0
    );
  } catch {
    return [];
  }
};

const writeCart = (cart: readonly BakeryCartEntry[]): void => {
  try {
    window.localStorage.setItem(storageKey, JSON.stringify(cart));
  } catch {
    // Keep the in-memory cart usable when browser storage is unavailable.
  }
  window.dispatchEvent(new Event(cartChangedEvent));
};

export const useBakeryCart = () => {
  const [items, setItems] = useState<BakeryCartEntry[]>([]);

  useEffect(() => {
    const syncCart = (): void => setItems(readCart());
    syncCart();
    window.addEventListener(cartChangedEvent, syncCart);
    window.addEventListener("storage", syncCart);
    return () => {
      window.removeEventListener(cartChangedEvent, syncCart);
      window.removeEventListener("storage", syncCart);
    };
  }, []);

  const addItem = useCallback((product: BakeryCartProduct): void => {
    const cart = readCart();
    const existing = cart.find((entry) => entry.id === product.id);
    const nextCart = existing
      ? cart.map((entry) => entry.id === product.id ? { ...entry, quantity: entry.quantity + 1 } : entry)
      : [...cart, { ...product, quantity: 1 }];
    setItems(nextCart);
    writeCart(nextCart);
  }, []);

  const removeItem = useCallback((id: string): void => {
    const nextCart = readCart().flatMap((entry) => {
      if (entry.id !== id) return [entry];
      return entry.quantity > 1 ? [{ ...entry, quantity: entry.quantity - 1 }] : [];
    });
    setItems(nextCart);
    writeCart(nextCart);
  }, []);

  const count = items.reduce((total, entry) => total + entry.quantity, 0);
  const total = items.reduce((sum, entry) => sum + entry.price * entry.quantity, 0);

  return { items, count, total, addItem, removeItem } as const;
};
