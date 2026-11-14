import type { Metadata } from "next";
import type { ReactElement } from "react";
import { BakeryGalleryPage } from "@/features/bakery-gallery";

export const metadata: Metadata = {
  title: "Bakery Photo Gallery | Sweet Aroma",
  description: "A separate gallery for the bakery photos shared in this project."
};

const GalleryPage = (): ReactElement => <BakeryGalleryPage />;

export default GalleryPage;
