import Image from "next/image";
import React from "react";

export function BackgroundImage() {
  return (
    <div className="col-start-1 row-start-1 grid h-full w-full">
      <Image
        src="/unipod_banner.jpg"
        alt="Unipod Banner"
        fill
        className="h-full w-full object-cover"
        priority
      />
      <div
        className="absolute inset-0 h-full w-full bg-black/60"
        style={{ gridArea: "1 / 1 / 2 / 2" }}
      />
    </div>
  );
}
