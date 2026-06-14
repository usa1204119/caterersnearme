"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">C</span>
            </div>
            <span className="font-bold text-gray-900 text-lg">
              Caterers<span className="text-orange-500">NearMe</span>
            </span>
          </Link>

          <div className="flex items-center gap-6">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors ${
                pathname === "/"
                  ? "text-orange-500"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Home
            </Link>
            <Link
              href="/caterers"
              className={`text-sm font-medium transition-colors ${
                pathname === "/caterers"
                  ? "text-orange-500"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Caterers
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
