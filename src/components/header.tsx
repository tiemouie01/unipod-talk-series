import Link from "next/link";
import Image from "next/image";
import { Home } from "lucide-react";

export function Header() {
  return (
    <header className="w-full border-b border-white/30 bg-white/40 shadow-lg backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3">
            <div className="flex items-end">
              <div className="mb-1">
                <Image src="/logo.png" alt="UniPod" width={100} height={100} />
              </div>
              <div className="flex items-end">
                <span className="text-3xl font-bold text-yellow-400">Talk</span>{" "}
                <span className="text-3xl font-bold text-[#1d9ed9]">
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
          {/* <Link
            href="/history"
            className="text-lg font-semibold text-gray-600 transition-colors hover:text-[#1d9ed9]"
          >
            Past Events
          </Link>
          <Link
            href="/admin"
            className="text-lg font-semibold text-gray-600 transition-colors hover:text-[#1d9ed9]"
          >
            Admin
          </Link> */}
        </nav>
      </div>
    </header>
  );
}
