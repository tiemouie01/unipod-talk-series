import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getEventStatus(eventDate: Date, registrationStartDate: Date | null, registrationEndDate: Date | null): "ended" | "active" | "upcoming" {
  const now = new Date()
  const eventDay = new Date(eventDate)
  
  // Check if event has ended
  if (eventDay < now) {
    return "ended"
  }

  // Check if within registration period
  if (registrationStartDate && registrationEndDate) {
    const regStart = new Date(registrationStartDate)
    const regEnd = new Date(registrationEndDate)
    if (now >= regStart && now <= regEnd) {
      return "active"
    }
  }

  return "upcoming"
}

export function getStatusColor(status: "ended" | "active" | "upcoming") {
  switch (status) {
    case "active":
      return "bg-green-500/20 text-green-400 border-green-500/30"
    case "upcoming":
      return "bg-blue-500/20 text-blue-400 border-blue-500/30"
    case "ended":
      return "bg-red-500/20 text-red-400 border-red-500/30"
    default:
      return "bg-slate-500/20 text-slate-400 border-slate-500/30"
  }
}

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};
