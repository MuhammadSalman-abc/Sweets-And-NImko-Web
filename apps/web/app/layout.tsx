import type { Metadata } from "next";
import type { ReactElement } from "react";
import { application } from "@/constants/application";
import type { RootLayoutProps } from "@/types";
import "./globals.css";

export const metadata: Metadata = {
  title: application.name,
  description: application.description,
  icons: { icon: "/sweet-aroma-logo-original.png", apple: "/sweet-aroma-logo-original.png" }
};

const RootLayout = ({ children }: RootLayoutProps): ReactElement => (
  <html lang="en" data-scroll-behavior="smooth">
    <body>{children}</body>
  </html>
);

export default RootLayout;
