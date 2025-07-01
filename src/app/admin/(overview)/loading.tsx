"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

export default function Loading() {
  return (
    <div className="space-y-6">
      {/* Hero Section with Mural Background */}
      <div className="relative overflow-hidden rounded-2xl border border-blue-800/30 bg-gradient-to-r from-blue-900 via-slate-800 to-blue-900 p-8">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/unipod_banner.jpg"
            alt="UniPod Background"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-transparent"></div>
        <div className="relative z-10">
          <h2 className="mb-2 text-3xl font-bold text-white">
            Welcome to UniPod Admin
          </h2>
          <p className="mb-6 text-blue-100">
            Manage your events, track registrations, and run lucky draws seamlessly.
          </p>
          <Skeleton className="h-10 w-32" />
        </div>
      </div>

      {/* Recent Events */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="border-blue-800/30 bg-slate-800/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Recent Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="flex cursor-pointer items-center justify-between rounded-lg border border-blue-800/20 bg-slate-700/50 p-4"
                >
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-48" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <div className="text-right space-y-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-5 w-16" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-800/30 bg-slate-800/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
