import type React from "react";
import Image from "next/image";
import { Header } from "@/components/header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid h-dvh w-full" style={{ gridTemplateRows: "auto 1fr" }}>
      {/* Background image and overlay in grid cell 1/1, non-scrolling, spanning both rows */}
      <div className="col-start-1 row-span-2 row-start-1 grid w-full">
        <Image
          src="/unipod-banner.webp"
          alt="Unipod Banner"
          fill
          className="col-start-1 row-start-1 h-full w-full object-cover"
        />
        <div className="z-10 col-start-1 row-start-1 h-full w-full bg-gradient-to-br from-blue-900/80 via-slate-900/90 to-blue-950/80" />
      </div>
      {/* Header in the first row */}
      <Header />
      {/* Content scrolls in the second row */}
      <div className="z-20 col-start-1 row-start-2 overflow-auto">
        <div className="h-14" />
        <div>{children}</div>
      </div>
    </div>
  );
}
