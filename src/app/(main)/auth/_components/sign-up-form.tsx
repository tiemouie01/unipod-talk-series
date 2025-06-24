"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { authClient } from "@/lib/auth-client";

interface SignUpFormProps {
  onBack?: () => void;
}

export function SignUpForm({ onBack }: SignUpFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    // Simulate Google sign-in process
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/events",
    });
    setIsLoading(false);
    // Handle successful sign-in
    console.log("Google sign-in successful");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 p-4">
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/unipod_banner.jpg"
          alt="UniPod Background"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-slate-900/90 to-blue-950/80" />
      </div>

      {/* Back Button */}
      {onBack && (
        <Button
          variant="ghost"
          onClick={onBack}
          className="absolute top-6 left-6 z-10 text-blue-300 hover:bg-blue-900/30 hover:text-white"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
      )}

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center">
          <Image
            src="/logo.png"
            alt="UniPod Logo"
            width={200}
            height={60}
            className="mx-auto mb-6"
          />
        </div>

        {/* Sign Up Card */}
        <Card className="border-blue-800/30 bg-slate-800/50 shadow-2xl backdrop-blur-xl">
          <CardHeader className="pb-6 text-center">
            <CardTitle className="mb-2 bg-gradient-to-r from-blue-400 to-yellow-400 bg-clip-text text-2xl font-bold text-transparent">
              Welcome to UniPod Talks
            </CardTitle>
            <p className="mb-1 text-xl font-semibold text-white">
              Registration
            </p>
            <p className="text-sm text-slate-400">
              Bringing you talks from innovators and tech enthusiasts from
              accross the country
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Google Sign In Button */}
            <Button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="h-12 w-full border border-gray-300 bg-white font-medium text-gray-900 shadow-sm transition-all duration-200 hover:bg-gray-50 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center gap-3">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-400 border-t-transparent" />
                  <span>Signing in...</span>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span>Continue with Google</span>
                </div>
              )}
            </Button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-blue-800/30" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-slate-800/50 px-2 text-slate-400">
                  Secure authentication
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
