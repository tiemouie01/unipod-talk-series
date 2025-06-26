import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { Toaster } from "@/components/ui/sonner";
import Image from "next/image";
import { Header } from "@/components/header";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Unipod Talk Series- Event Registration",
  description: "Register for exciting talks at Unipod Malawi",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div
          className="grid h-screen w-full"
          style={{ gridTemplateRows: "auto 1fr" }}
        >
          {/* Background image and overlay in grid cell 1/1, non-scrolling, spanning both rows */}
          <div className="pointer-events-none col-start-1 row-span-2 row-start-1 h-screen w-full">
            <Image
              src="/unipod_banner.jpg"
              alt="Unipod Banner"
              fill
              className="h-full w-full object-cover"
              priority
            />
            <div className="h-full w-full bg-black/60" />
          </div>
          {/* Header in the first row */}
          <div className="z-10 col-start-1 row-start-1">
            <Header />
          </div>
          {/* Content scrolls in the second row */}
          <div className="col-start-1 row-start-2 overflow-auto">
            {children}
            <Toaster richColors />
          </div>
        </div>
      </body>
    </html>
  );
}
