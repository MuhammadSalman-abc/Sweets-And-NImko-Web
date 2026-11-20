"use client";

import { useMemo, useState, type ChangeEvent, type FormEvent, type ReactElement } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Box, Check, ChevronDown, ImagePlus, LayoutDashboard, Pencil, Plus, Search, Settings2, ShieldCheck, Sparkles, Trash2, Upload, X } from "lucide-react";
import { useBakeryCatalog, type BakeryCatalogCategory, type BakeryCatalogProduct } from "./use-bakery-catalog";

type ProductFormState = {
  name: string;
  image: string;
  alt: string;
  price: string;
  featured: boolean;
  style: string;
};

const blankProduct: ProductFormState = { name: "", image: "", alt: "", price: "", featured: false, style: "Chocolate" };

const optimizeSelectedImage = async (file: File): Promise<string> => {
  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) throw new Error("Choose a JPG, PNG or WebP image.");
  if (file.size > 12 * 1024 * 1024) throw new Error("Image is too large. Choose a file under 12 MB.");
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, 1200 / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(bitmap.width * scale));
  canvas.height = Math.max(1, Math.round(bitmap.height * scale));
  const context = canvas.getContext("2d");
  if (!context) throw new Error("This image could not be processed in this browser.");
  context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  const compressed = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error("This image could not be compressed.")), "image/webp", 0.72);
  });
  if (compressed.size > 350_000) throw new Error("Photo is still too large after optimization. Choose a smaller image.");
  return await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => typeof reader.result === "string" ? resolve(reader.result) : reject(new Error("Image could not be read."));
    reader.onerror = () => reject(new Error("Image could not be read."));
    reader.readAsDataURL(compressed);
  });
};

const AdminPage = (): ReactElement => {
  const [catalog, setCatalog] = useBakeryCatalog();
  const [view, setView] = useState<"products" | "collections">("products");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<{ slug: string; index: number } | null>(null);
  const [form, setForm] = useState<ProductFormState>(blankProduct);
  const [formOpen, setFormOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const [imageError, setImageError] = useState("");

  const allProducts = useMemo(() => Object.entries(catalog.collections).flatMap(([slug, collection]) => collection.items.map((product, index) => ({ slug, collection: collection.title, product, index }))), [catalog]);
  const visibleProducts = allProducts.filter(({ slug, product }) =>
    (categoryFilter === "all" || slug === categoryFilter) &&
    `${product.name} ${slug}`.toLowerCase().includes(search.toLowerCase())
  );
  const featuredCount = allProducts.filter(({ product }) => product.featured).length;

  const openNewProduct = (): void => {
    setImageError("");
    setEditing(null);
    setForm({ ...blankProduct, style: "Chocolate" });
    setFormOpen(true);
  };

  const openEditProduct = (slug: string, index: number, product: BakeryCatalogProduct): void => {
    setImageError("");
    setEditing({ slug, index });
    setForm({ name: product.name, image: product.image, alt: product.alt, price: String(product.price), featured: product.featured, style: product.style ?? "Chocolate" });
    setFormOpen(true);
  };

  const saveProduct = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (!form.image) { setImageError("Choose a product photo from your device first."); return; }
    const slug = editing?.slug ?? (categoryFilter === "all" ? "cakes" : categoryFilter);
    const price = Number(form.price);
    if (!Number.isFinite(price) || price < 0) return;
    const product: BakeryCatalogProduct = {
      name: form.name.trim(),
      image: form.image.trim(),
      alt: form.alt.trim(),
      price,
      featured: form.featured,
      ...(slug === "cakes" ? { style: form.style } : {})
    };
    setCatalog((current) => {
      const collection = current.collections[slug];
      if (!collection) return current;
      const items = editing
        ? collection.items.map((item, index) => index === editing.index ? product : item)
        : [...collection.items, product];
      return { ...current, collections: { ...current.collections, [slug]: { ...collection, items } } };
    });
    setFormOpen(false);
    setImageError("");
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2400);
  };

  const deleteProduct = (slug: string, index: number): void => {
    const product = catalog.collections[slug]?.items[index];
    if (!product || !window.confirm(`Remove “${product.name}” from the collection?`)) return;
    setCatalog((current) => {
      const collection = current.collections[slug];
      if (!collection) return current;
      return { ...current, collections: { ...current.collections, [slug]: { ...collection, items: collection.items.filter((_, itemIndex) => itemIndex !== index) } } };
    });
  };

  const updateCategory = (slug: string, field: keyof BakeryCatalogCategory, value: string): void => {
    setCatalog((current) => {
      const collection = current.collections[slug];
      return {
        ...current,
        categories: current.categories.map((category) => category.slug === slug ? { ...category, [field]: value } : category),
        collections: field === "title" && collection
          ? { ...current.collections, [slug]: { ...collection, title: value } }
          : current.collections
      };
    });
  };

  const updateCollection = (slug: string, field: "eyebrow" | "description" | "heroImage" | "heroAlt", value: string): void => {
    setCatalog((current) => {
      const collection = current.collections[slug];
      return collection ? { ...current, collections: { ...current.collections, [slug]: { ...collection, [field]: value } } } : current;
    });
  };

  const downloadCatalog = (): void => {
    const file = new Blob([JSON.stringify(catalog, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(file);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "sweet-aroma-catalog.json";
    anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <main className="admin-shell min-h-screen bg-[#f7f3ed] text-[#30251d]">
      <aside className="fixed inset-y-0 left-0 hidden w-[270px] flex-col border-r border-[#65432d] bg-[#321d12] px-5 py-6 text-[#fff8ed] lg:flex">
        <Link href="/" className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-3 transition hover:bg-white/10"><span className="grid size-[76px] shrink-0 place-items-center overflow-hidden rounded-xl bg-[#fff4df] shadow-[0_10px_28px_-16px_rgba(0,0,0,0.7)]"><Image src="/sweet-aroma-logo-original.png" alt="Sweet Aroma Bakery and Sweets logo" width={1536} height={1024} className="h-full w-full object-contain" /></span><span><strong className="block font-serif text-[17px] leading-tight text-[#fff8ed]">Sweet Aroma</strong><span className="mt-1 block text-[10px] text-[#e4c9a6]">Bakery &amp; Sweets</span><span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[#d49a47]/15 px-2 py-1 text-[8px] font-bold uppercase tracking-[0.13em] text-[#edbd69]"><Sparkles className="size-3" />Store studio</span></span></Link>
        <div className="my-7 h-px bg-gradient-to-r from-[#d49a47]/55 via-white/10 to-transparent" />
        <p className="mb-2 px-3 text-[9px] font-bold uppercase tracking-[0.2em] text-[#cba879]">Manage your shop</p>
        <button type="button" onClick={() => setView("products")} className={`flex h-12 items-center gap-3 rounded-xl px-3 text-left text-xs font-semibold transition ${view === "products" ? "bg-[#e2ad58] text-[#321d12] shadow-[0_8px_24px_-14px_rgba(226,173,88,0.9)]" : "text-[#f0dfca] hover:bg-white/10"}`}><Box className="size-4" />Products<span className={`ml-auto rounded-full px-2 py-1 text-[9px] ${view === "products" ? "bg-[#321d12]/10" : "bg-white/10 text-[#e7c99f]"}`}>{allProducts.length}</span></button>
        <button type="button" onClick={() => setView("collections")} className={`mt-1 flex h-12 items-center gap-3 rounded-xl px-3 text-left text-xs font-semibold transition ${view === "collections" ? "bg-[#e2ad58] text-[#321d12] shadow-[0_8px_24px_-14px_rgba(226,173,88,0.9)]" : "text-[#f0dfca] hover:bg-white/10"}`}><Settings2 className="size-4" />Collections &amp; pages<span className={`ml-auto rounded-full px-2 py-1 text-[9px] ${view === "collections" ? "bg-[#321d12]/10" : "bg-white/10 text-[#e7c99f]"}`}>{catalog.categories.length}</span></button>
        <div className="mt-auto overflow-hidden rounded-2xl border border-[#d49a47]/30 bg-[radial-gradient(ellipse_at_top_right,rgba(215,158,73,0.2),transparent_60%),rgba(255,255,255,0.05)] p-4"><div className="mb-3 flex size-9 items-center justify-center rounded-xl bg-[#d49a47]/15 text-[#edbd69]"><ShieldCheck className="size-4" /></div><p className="text-[11px] font-bold text-[#fff5e5]">Your shop, at a glance</p><p className="mt-1 text-[10px] leading-5 text-[#d6c1a5]">Update the menu, add product photos and review your storefront.</p><Link href="/" className="mt-3 inline-flex h-9 w-full items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/[0.06] text-[10px] font-bold text-[#f3d29d] transition hover:bg-white/10">Preview storefront <ArrowUpRight className="size-3.5" /></Link></div>
      </aside>

      <div className="lg:pl-[270px]">
        <header className="sticky top-0 z-20 flex h-[76px] items-center justify-between border-b border-[#ebe3d9] bg-[#fffdf9]/95 px-4 backdrop-blur sm:px-7">
          <div className="flex items-center gap-2.5 sm:gap-3"><Link href="/" aria-label="Back to storefront" className="grid size-9 place-items-center rounded-xl border border-[#e8dfd4] text-[#624833] lg:hidden"><ArrowLeft className="size-4" /></Link><div className="grid size-9 shrink-0 place-items-center overflow-hidden rounded-lg bg-[#fff0d8] sm:size-10 lg:hidden"><Image src="/sweet-aroma-logo-original.png" alt="Sweet Aroma" width={1536} height={1024} className="size-full object-contain" /></div><div><p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#a48e76]">Sweet Aroma <span className="text-[#cf9c53]">/</span> Shop studio</p><p className="text-[13px] font-bold text-[#402b1d]">Catalog dashboard</p></div></div>
          <Link href="/" className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#3b2417] px-4 text-[10px] font-semibold text-[#fff8ed] shadow-[0_7px_18px_-12px_rgba(47,28,17,0.8)] transition hover:bg-[#56331d]"><ArrowUpRight className="size-3.5 text-[#e7b45d]" /><span>View storefront</span></Link>
        </header>

        <div className="mx-auto max-w-[1480px] px-4 py-6 sm:px-7 sm:py-9">
          <div className="relative mb-6 flex min-h-[164px] flex-wrap items-end justify-between gap-4 overflow-hidden rounded-[22px] bg-[radial-gradient(ellipse_at_95%_10%,rgba(235,188,111,0.2),transparent_40%),linear-gradient(120deg,#3b2417,#59351e_60%,#754a29)] px-5 py-6 text-[#fff8ed] shadow-[0_24px_55px_-34px_rgba(58,34,19,0.8)] sm:px-7 sm:py-7"><div className="pointer-events-none absolute -right-7 -top-10 size-52 rounded-full border border-[#f0c578]/15" /><div className="pointer-events-none absolute right-9 top-3 size-32 rounded-full border border-[#f0c578]/10" /><div className="relative"><p className="inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] text-[#edbd69]"><Sparkles className="size-3.5" />Sweet Aroma · Store management</p><h1 className="mt-2 font-serif text-[30px] font-bold tracking-[-0.035em] sm:text-[38px]">{view === "products" ? "Your products" : "Collections & pages"}</h1><p className="mt-1 max-w-lg text-xs text-[#f2debf]">{view === "products" ? "Keep your bakery menu fresh, beautiful and up to date." : "Shape the way customers explore every bakery collection."}</p></div>
            {view === "products" && <button type="button" onClick={openNewProduct} className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#57321c] px-4 text-xs font-bold text-white shadow-sm transition hover:bg-[#704426]"><Plus className="size-4" />Add product</button>}
          </div>

          <div className="mb-5 rounded-2xl border border-[#ead8b9] bg-[#fff7e9] px-4 py-3 text-[10px] leading-5 text-[#78572e] sm:px-5"><strong>Browser-only save:</strong> changes are saved in this browser and appear in its storefront. To publish edits for every customer, this panel needs a shared database and admin sign-in.</div>

          <div className="a-stagger mb-6 grid grid-cols-2 gap-3 xl:grid-cols-4"><StatCard label="Menu items" value={String(allProducts.length)} icon={<Box className="size-4" />} /><StatCard label="Collections" value={String(catalog.categories.length)} icon={<LayoutDashboard className="size-4" />} /><StatCard label="Featured on home" value={String(featuredCount)} icon={<ImagePlus className="size-4" />} /><StatCard label="Storage" value="This browser" icon={<Check className="size-4" />} /></div>

          {saved && <p role="status" className="mb-4 rounded-xl bg-[#e7f4eb] px-4 py-3 text-xs font-semibold text-[#356248]">Saved. Your storefront is updated in this browser.</p>}

          <div className="mb-4 flex gap-2 lg:hidden"><button type="button" onClick={() => setView("products")} className={`inline-flex h-10 items-center gap-2 rounded-xl px-3 text-[10px] font-semibold ${view === "products" ? "bg-[#57321c] text-white" : "border border-[#e7ddd1] bg-white text-[#6d5945]"}`}><Box className="size-3.5" />Products</button><button type="button" onClick={() => setView("collections")} className={`inline-flex h-10 items-center gap-2 rounded-xl px-3 text-[10px] font-semibold ${view === "collections" ? "bg-[#57321c] text-white" : "border border-[#e7ddd1] bg-white text-[#6d5945]"}`}><Settings2 className="size-3.5" />Collections</button></div>

          {view === "products" ? <section className="overflow-hidden rounded-2xl border border-[#ebe3d9] bg-white shadow-[0_12px_42px_-36px_rgba(54,34,18,0.4)]">
            <div className="flex flex-col gap-3 border-b border-[#f0e9e0] p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5"><div><h2 className="text-sm font-bold text-[#443021]">Products list</h2><p className="mt-1 text-[10px] text-[#958576]">{visibleProducts.length} items shown · edit details, prices and photos</p></div><div className="flex gap-2"><label className="flex h-10 min-w-0 flex-1 items-center gap-2 rounded-xl border border-[#eae1d7] px-3 sm:w-[220px] sm:flex-none"><Search className="size-4 shrink-0 text-[#a38d76]" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search menu" className="min-w-0 flex-1 bg-transparent text-xs outline-none placeholder:text-[#a99b8b]" /></label><label className="relative flex h-10 w-[145px] items-center rounded-xl border border-[#eae1d7] px-3"><select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)} className="w-full appearance-none bg-transparent pr-4 text-[10px] font-semibold outline-none"><option value="all">All collections</option>{catalog.categories.map((category) => <option key={category.slug} value={category.slug}>{category.title}</option>)}</select><ChevronDown className="pointer-events-none absolute right-3 size-3.5 text-[#887563]" /></label></div></div>
            <div key={`${categoryFilter}:${search}`} className="a-stagger divide-y divide-[#f2ece5]">{visibleProducts.map(({ slug, collection, product, index }) => <article key={`${slug}:${product.image}:${index}`} className="flex items-center gap-3 px-4 py-3.5 sm:px-5"><div className="relative size-[54px] shrink-0 overflow-hidden rounded-xl bg-[#f5eee4]"><Image src={product.image} alt={product.alt} fill sizes="54px" unoptimized={product.image.startsWith("data:")} className="object-cover" /></div><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><h3 className="truncate text-xs font-bold text-[#4a3524]">{product.name}</h3>{product.featured && <span className="rounded-full bg-[#fbf0dc] px-2 py-1 text-[8px] font-bold uppercase tracking-wide text-[#946322]">Home pick</span>}</div><p className="mt-1 truncate text-[10px] text-[#958576]">{collection} · {product.image.startsWith("data:") ? "Photo selected from device" : product.image}</p></div><p className="hidden whitespace-nowrap text-xs font-bold text-[#77542d] sm:block">Rs. {product.price.toLocaleString("en-PK")}</p><button type="button" onClick={() => openEditProduct(slug, index, product)} aria-label={`Edit ${product.name}`} className="grid size-9 shrink-0 place-items-center rounded-lg border border-[#e9e0d6] text-[#70553b] transition hover:border-[#cfab76] hover:bg-[#fff8ee]"><Pencil className="size-3.5" /></button><button type="button" onClick={() => deleteProduct(slug, index)} aria-label={`Delete ${product.name}`} className="grid size-9 shrink-0 place-items-center rounded-lg border border-[#efe2df] text-[#a45f53] transition hover:bg-[#fff3f1]"><Trash2 className="size-3.5" /></button></article>)}</div>
            {!visibleProducts.length && <p className="px-5 py-14 text-center text-xs text-[#9b8c7d]">No products found. Try a different search or add a product.</p>}
          </section> : <section className="grid gap-4 xl:grid-cols-2">{catalog.categories.map((category) => {
            const collection = catalog.collections[category.slug];
            if (!collection) return null;
            return <article key={category.slug} className="rounded-2xl border border-[#ebe3d9] bg-white p-4 shadow-[0_12px_42px_-36px_rgba(54,34,18,0.4)] sm:p-5"><div className="mb-4 flex items-center gap-3"><div className="relative size-12 overflow-hidden rounded-xl bg-[#f5eee4]"><Image src={category.image} alt={category.alt} fill sizes="48px" unoptimized={category.image.startsWith("data:")} className="object-cover" /></div><div><p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#a68d73]">/{category.slug}</p><h2 className="font-serif text-lg font-bold text-[#422c1c]">{collection.title}</h2></div><span className="ml-auto rounded-full bg-[#f8f2e9] px-2.5 py-1 text-[9px] text-[#7f6d5c]">{collection.items.length} products</span></div><div className="grid gap-3 sm:grid-cols-2"><Field commitOnBlur label="Display name" value={category.title} onChange={(value) => updateCategory(category.slug, "title", value)} /><Field commitOnBlur label="Emoji" value={category.emoji} onChange={(value) => updateCategory(category.slug, "emoji", value)} /><ImagePickerField label="Collection cover" value={category.image} onChange={(value) => updateCategory(category.slug, "image", value)} /><ImagePickerField label="Collection hero photo" value={collection.heroImage} onChange={(value) => updateCollection(category.slug, "heroImage", value)} /><Field commitOnBlur label="Hero image description" value={collection.heroAlt} onChange={(value) => updateCollection(category.slug, "heroAlt", value)} /><Field commitOnBlur label="Short heading" value={collection.eyebrow} onChange={(value) => updateCollection(category.slug, "eyebrow", value)} /><Field commitOnBlur label="Cover image description" value={category.alt} onChange={(value) => updateCategory(category.slug, "alt", value)} /><DescriptionField label="Collection description" value={collection.description} onChange={(value) => updateCollection(category.slug, "description", value)} /></div></article>;
          })}<div className="rounded-2xl border border-dashed border-[#ddcdb9] p-5 text-xs leading-6 text-[#8d7c6a] xl:col-span-2"><strong className="text-[#64472e]">Your photos:</strong> choose a JPG, PNG or WebP image directly from your device. Photos are resized and optimized before they are added to this browser’s catalog.</div><button type="button" onClick={downloadCatalog} className="inline-flex h-10 items-center justify-center gap-2 justify-self-start rounded-xl border border-[#e5d8c7] bg-white px-4 text-[10px] font-semibold text-[#65462d] transition hover:bg-[#fbf5ec] xl:col-span-2">Download catalog backup</button></section>}
        </div>
      </div>

      {formOpen && <div className="fixed inset-0 z-50 grid place-items-center bg-[#22160e]/55 p-3 backdrop-blur-[2px]" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setFormOpen(false); }}><section role="dialog" aria-modal="true" aria-labelledby="product-editor-heading" className="a-modal-in max-h-[94vh] w-full max-w-[560px] overflow-auto rounded-2xl bg-white p-5 shadow-2xl sm:p-7"><div className="mb-5 flex items-start justify-between"><div><p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#a87b43]">Product editor</p><h2 id="product-editor-heading" className="mt-1 font-serif text-2xl font-bold text-[#422c1c]">{editing ? "Edit product" : "Add a product"}</h2></div><button type="button" aria-label="Close editor" onClick={() => setFormOpen(false)} className="grid size-9 place-items-center rounded-full bg-[#f7f1e9] text-[#72543a]"><X className="size-4" /></button></div><form onSubmit={saveProduct} className="grid gap-4">{imageError && <p role="alert" className="rounded-xl bg-[#fff0ed] px-3 py-2.5 text-[11px] font-medium text-[#a53f32]">{imageError}</p>}<label className="grid gap-1.5 text-[9px] font-bold uppercase tracking-[0.11em] text-[#958576]">Collection<select value={editing?.slug ?? (categoryFilter === "all" ? "cakes" : categoryFilter)} onChange={(event) => setCategoryFilter(event.target.value)} disabled={Boolean(editing)} className="h-11 rounded-xl border border-[#eae1d7] bg-white px-3 text-xs font-semibold normal-case tracking-normal text-[#453528] outline-none focus:border-[#be9865]">{catalog.categories.map((category) => <option key={category.slug} value={category.slug}>{category.title}</option>)}</select></label><Field label="Product name" value={form.name} onChange={(value) => setForm((current) => ({ ...current, name: value }))} required /><ImagePickerField label="Product photo" value={form.image} onChange={(value) => { setForm((current) => ({ ...current, image: value })); setImageError(""); }} /><Field label="Image description" value={form.alt} onChange={(value) => setForm((current) => ({ ...current, alt: value }))} required /><div className="grid gap-4 sm:grid-cols-2"><Field label="Price in rupees" value={form.price} onChange={(value) => setForm((current) => ({ ...current, price: value }))} type="number" min="0" required /><label className="grid gap-1.5 text-[9px] font-bold uppercase tracking-[0.11em] text-[#958576]">Cake style<select value={form.style} onChange={(event) => setForm((current) => ({ ...current, style: event.target.value }))} className="h-11 rounded-xl border border-[#eae1d7] bg-white px-3 text-xs font-medium normal-case tracking-normal text-[#453528] outline-none focus:border-[#be9865]"><option>Chocolate</option><option>Birthday</option><option>Kids</option><option>Wedding</option><option>Celebration</option></select></label></div><label className="flex items-center gap-2.5 rounded-xl border border-[#eee5db] bg-[#fffaf3] p-3 text-xs text-[#5d4937]"><input type="checkbox" checked={form.featured} onChange={(event) => setForm((current) => ({ ...current, featured: event.target.checked }))} className="size-4 accent-[#704221]" />Feature this product on the homepage</label><div className="mt-1 flex justify-end gap-2"><button type="button" onClick={() => setFormOpen(false)} className="h-10 rounded-xl px-4 text-xs font-semibold text-[#806f5f] hover:bg-[#f9f5ef]">Cancel</button><button type="submit" className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#57321c] px-5 text-xs font-bold text-white hover:bg-[#704426]"><Check className="size-4" />{editing ? "Save changes" : "Add product"}</button></div></form></section></div>}
    </main>
  );
};

const Field = ({ label, value, onChange, placeholder, type = "text", required = false, min, commitOnBlur = false }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string; type?: string; required?: boolean; min?: string; commitOnBlur?: boolean }): ReactElement => {
  const [draft, setDraft] = useState(value);
  return <label className="grid min-w-0 gap-1.5 text-[9px] font-bold uppercase tracking-[0.11em] text-[#958576]">{label}<input type={type} min={min} required={required} value={draft} onChange={(event) => { setDraft(event.target.value); if (!commitOnBlur) onChange(event.target.value); }} onBlur={() => { if (commitOnBlur && draft.trim()) onChange(draft.trim()); }} placeholder={placeholder} className="h-11 min-w-0 rounded-xl border border-[#eae1d7] px-3 text-xs font-medium normal-case tracking-normal text-[#453528] outline-none placeholder:font-normal placeholder:text-[#b4a798] focus:border-[#be9865]" /></label>;
};

const ImagePickerField = ({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }): ReactElement => {
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const chooseImage = async (event: ChangeEvent<HTMLInputElement>): Promise<void> => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setError("");
    setProcessing(true);
    try {
      onChange(await optimizeSelectedImage(file));
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Image could not be opened.");
    } finally {
      setProcessing(false);
    }
  };
  return <div className="grid min-w-0 gap-1.5 text-[9px] font-bold uppercase tracking-[0.11em] text-[#958576]">{label}<div className="flex min-w-0 items-center gap-3 rounded-xl border border-[#eae1d7] bg-[#fffdf9] p-2"><div className="relative grid size-[58px] shrink-0 place-items-center overflow-hidden rounded-lg bg-[#f4eee5] text-[#a48768]">{value ? <Image src={value} alt={`${label} preview`} fill sizes="58px" unoptimized className="object-cover" /> : <ImagePlus className="size-5" />}</div><div className="min-w-0 flex-1"><label className="inline-flex h-9 cursor-pointer items-center gap-2 rounded-lg bg-[#57321c] px-3 text-[10px] font-bold normal-case tracking-normal text-white transition hover:bg-[#704426]"><Upload className="size-3.5" />{processing ? "Optimizing…" : value ? "Choose another photo" : "Browse photos"}<input type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => void chooseImage(event)} className="sr-only" aria-label={`Choose ${label.toLowerCase()} from your device`} /></label><p className="mt-1 truncate text-[9px] font-normal normal-case tracking-normal text-[#9b8b7b]">JPG, PNG or WebP · automatically optimized</p></div></div>{error && <p role="alert" className="text-[9px] font-medium normal-case tracking-normal text-[#ad4539]">{error}</p>}</div>;
};

const DescriptionField = ({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }): ReactElement => {
  const [draft, setDraft] = useState(value);
  return <label className="grid gap-1.5 text-[9px] font-bold uppercase tracking-[0.11em] text-[#958576] sm:col-span-2">{label}<textarea value={draft} onChange={(event) => setDraft(event.target.value)} onBlur={() => { if (draft.trim()) onChange(draft.trim()); }} rows={2} className="resize-y rounded-xl border border-[#eae1d7] px-3 py-2.5 text-xs font-normal normal-case tracking-normal text-[#453528] outline-none focus:border-[#be9865]" /></label>;
};

const StatCard = ({ label, value, icon }: { label: string; value: string; icon: ReactElement }): ReactElement => (
  <article className="rounded-2xl border border-[#ebe3d9] bg-white p-4"><div className="flex items-center justify-between text-[#a88352]"><span className="text-[10px] font-medium text-[#8e7c6a]">{label}</span>{icon}</div><p className="mt-3 text-xl font-bold tracking-tight text-[#433021]">{value}</p></article>
);

export default AdminPage;
