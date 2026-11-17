import { notFound } from "next/navigation";
import type { ReactElement } from "react";
import { CollectionPage } from "@/features/marketing";
import { shopCategorySlugs } from "@/features/marketing/components/shop-category-slugs";

export const generateStaticParams = (): Array<{ category: string }> =>
  shopCategorySlugs.map((category) => ({ category }));

const CollectionRoute = async ({ params }: { params: Promise<{ category: string }> }): Promise<ReactElement> => {
  const { category } = await params;
  if (!shopCategorySlugs.includes(category as (typeof shopCategorySlugs)[number])) notFound();
  return <CollectionPage slug={category} />;
};

export default CollectionRoute;
