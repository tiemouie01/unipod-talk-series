import Link from "next/link";
import Image from "next/image";

export function Header() {
  return (
    <header className="w-full border-b border-white/30 bg-white/40 shadow-lg backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3">
            <Image src="/logo.png" alt="UniPod" width={100} height={100} />
          </div>
        </div>
        <nav className="flex space-x-8">
          <Link
            href="/"
            className="text-lg font-semibold text-gray-800 transition-colors hover:text-[#1d9ed9]"
          >
            Home
          </Link>
          <Link
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
          </Link>
        </nav>
      </div>
    </header>
  );
}
