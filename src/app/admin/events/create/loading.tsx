"use client"
import { ArrowLeft, Calendar, MapPin, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 p-4 sm:p-6 lg:p-8">
      {/* Background Image Skeleton */}
      <div className="absolute inset-0 overflow-hidden bg-slate-800/50 animate-pulse" />

      {/* Main Content */}
      <div className="relative z-10 space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            className="text-slate-300 hover:bg-blue-900/30 hover:text-blue-400"
            disabled
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Events
          </Button>
          <div className="h-8 w-48 rounded-md bg-slate-700 animate-pulse" />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Basic Information Skeleton */}
          <Card className="border-blue-800/30 bg-slate-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Calendar className="h-5 w-5 text-blue-400" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 w-24 rounded bg-slate-700 animate-pulse" />
                  <div className="h-10 w-full rounded bg-slate-700 animate-pulse" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Registration Details Skeleton */}
          <Card className="border-blue-800/30 bg-slate-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <MapPin className="h-5 w-5 text-blue-400" />
                Registration Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 w-24 rounded bg-slate-700 animate-pulse" />
                  <div className="h-10 w-full rounded bg-slate-700 animate-pulse" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Lucky Draw Settings Skeleton */}
          <Card className="border-blue-800/30 bg-slate-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Users className="h-5 w-5 text-yellow-400" />
                Lucky Draw Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="h-4 w-32 rounded bg-slate-700 animate-pulse" />
                  <div className="h-4 w-48 rounded bg-slate-700 animate-pulse" />
                </div>
                <div className="h-6 w-10 rounded bg-slate-700 animate-pulse" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Submit Buttons Skeleton */}
        <div className="flex items-center justify-end gap-4">
          <div className="h-10 w-24 rounded bg-slate-700 animate-pulse" />
          <div className="h-10 w-32 rounded bg-blue-700 animate-pulse" />
        </div>
      </div>
    </div>
  );
}