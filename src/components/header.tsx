import Link from "next/link";
import Image from "next/image";
import { Home } from "lucide-react";

export function Header() {
  return (
    <header className="fixed top-6 left-1/2 z-50 w-full max-w-3xl -translate-x-1/2 rounded-full border border-white/30 bg-black/40 px-6 py-3 shadow-2xl backdrop-blur-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3">
            <div className="flex items-end">
              <div className="mb-1">
                <Image src="/logo.png" alt="UniPod" width={80} height={80} />
              </div>
              <div className="flex items-end">
                <span className="text-2xl font-bold text-yellow-400">Talk</span>{" "}
                <span className="text-2xl font-bold text-[#1d9ed9]">
                  Series
                </span>
              </div>
            </div>
          </div>
        </div>
        <nav className="flex space-x-8">
          <Link
            href="/"
            className="text-lg font-semibold text-[#1d9ed9] transition-colors"
          >
            <Home className="h-6 w-6" />
          </Link>
        </nav>
      </div>
    </header>
  );
}
