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
