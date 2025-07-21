import Link from "next/link";
import Image from "next/image";
import { Home } from "lucide-react";

export function Header() {
  return (
    <header className="fixed top-6 left-1/2 z-50 w-full max-w-3xl -translate-x-1/2 rounded-full border border-gray-200 bg-white/70 px-6 py-3 shadow-none backdrop-blur-md dark:border-white/15 dark:bg-black/70">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3">
            <div className="flex items-end">
              <div className="mb-1">
                <Image src="/logo.png" alt="UniPod" width={80} height={80} />
              </div>
              <div className="flex items-end">
                <span className="text-2xl font-bold text-yellow-600 drop-shadow-sm dark:text-yellow-300">
                  Talk
                </span>{" "}
                <span className="text-2xl font-bold text-blue-700 drop-shadow-sm dark:text-blue-300">
                  Series
                </span>
              </div>
            </div>
          </div>
        </div>
        <nav className="flex space-x-8">
          <Link
            href="/"
            className="text-lg font-semibold text-blue-700 transition-colors hover:text-yellow-600 dark:text-blue-300 dark:hover:text-yellow-300"
          >
            <Home className="h-6 w-6" />
          </Link>
        </nav>
      </div>
    </header>
  );
}
