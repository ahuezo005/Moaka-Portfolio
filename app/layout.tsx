import type { Metadata } from "next";
import "./globals.css";
import Navbuttons from "@/components/Navbuttons";

export const metadata: Metadata = {
  title: "Moaka Portfolio",
  description: "My design portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {}
      <body>
        <Navbuttons />
        {children}</body>
    </html>
  );
}