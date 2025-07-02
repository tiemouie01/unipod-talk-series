"use client"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchParams, usePathname } from "next/navigation";
import { generatePagination } from "@/lib/utils";
import Link from "next/link";
import { clsx } from "clsx";

export default function CustomPagination({
  totalNumberOfPages,
}: {
  totalNumberOfPages: number;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(pageNumber));
    return `${pathname}?${params.toString()}`;
  };
  const pages = generatePagination(currentPage, totalNumberOfPages);
  return (
    <Pagination>
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationPrevious
            href={createPageURL(currentPage - 1)}
            className="border-slate-700/50 text-slate-300 hover:bg-slate-800/50 hover:border-blue-800/30 transition-colors"
          />
        )}
        {pages.map((page, index) => {
          let position: "first" | "last" | "single" | "middle" | undefined;
          if (index === 0) position = "first";
          if (index === pages.length - 1) position = "last";
          if (pages.length === 1) position = "single";
          if (page === "...") position = "middle";
          return (
            <PaginationItem key={`${page}-${index}`}>
              <PaginationNumber
                href={createPageURL(page)}
                page={page}
                position={position}
                isActive={currentPage === page}
              />
            </PaginationItem>
          );
        })}
        {currentPage < totalNumberOfPages && (
          <PaginationNext
            href={createPageURL(currentPage + 1)}
            className="border-slate-700/50 text-slate-300 hover:bg-slate-800/50 hover:border-blue-800/30 transition-colors"
          />
        )}
      </PaginationContent>
    </Pagination>
  );
}

function PaginationNumber({
  page,
  href,
  isActive,
  position,
}: {
  page: number | string;
  href: string;
  position?: "first" | "last" | "middle" | "single";
  isActive: boolean;
}) {
  const className = clsx(
    "flex h-10 w-10 items-center justify-center text-sm border transition-colors",
    {
      "rounded-l-md": position === "first" || position === "single",
      "rounded-r-md": position === "last" || position === "single",
      "z-10 bg-blue-600 border-blue-800/30 text-white": isActive,
      "hover:bg-slate-800/50 hover:border-blue-800/30 border-slate-700/50 text-slate-300": !isActive && position !== "middle",
      "text-slate-500 border-transparent": position === "middle",
    }
  );

  return isActive || position === "middle" ? (
    <div className={className}>{page}</div>
  ) : (
    <Link href={href} className={className}>
      {page}
    </Link>
  );
}