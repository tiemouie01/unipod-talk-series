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
      <div className="col-start-1 row-span-2 row-start-1 grid h-dvh w-full">
        <Image
          src="/unipod_banner.jpg"
          alt="Unipod Banner"
          width={1000}
          height={450}
          className="col-start-1 row-start-1 h-full w-full object-cover"
        />
        <div className="col-start-1 row-start-1 h-full w-full bg-black/60" />
      </div>
      {/* Header in the first row */}
      <div className="z-10 col-start-1 row-start-1">
        <Header />
      </div>
      {/* Content scrolls in the second row */}
      <div className="col-start-1 row-start-2 overflow-auto">{children}</div>
    </div>
  );
}
