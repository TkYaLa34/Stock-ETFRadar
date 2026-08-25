"use client";

import { useState } from "react";
import Link from "next/link";
import { signOut } from "@/app/(dashboard)/dashboard/actions";

interface NavbarProps {
  userEmail?: string;
}

export function Navbar({ userEmail }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleDropdown = (menu: string) => {
    setActiveDropdown((prev) => (prev === menu ? null : menu));
  };

  return (
    <header className="border-b border-neutral-800 bg-neutral-900/90 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo Branding */}
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/30 group-hover:bg-blue-500 transition-colors">
              R
            </div>
            <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white group-hover:text-blue-400 transition-colors">
              Stock & ETF Radar
            </span>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-300">
          {/* Menu 1: Markets */}
          <div className="relative group">
            <button
              onClick={() => toggleDropdown("market")}
              className="flex items-center gap-1.5 py-2 hover:text-white transition-colors focus:outline-none"
            >
              <span>1. Markets / ตลาด</span>
              <svg className="w-4 h-4 text-gray-400 group-hover:text-white transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute left-0 mt-1 w-52 rounded-xl bg-neutral-900 border border-neutral-800 shadow-2xl py-2 hidden group-hover:block transition-all duration-150">
              <Link href="/dashboard?view=stocks" className="block px-4 py-2.5 text-xs text-gray-300 hover:bg-neutral-800 hover:text-white transition-colors">
                1.1 Stocks / หุ้น
              </Link>
              <Link href="/dashboard?view=etf" className="block px-4 py-2.5 text-xs text-gray-300 hover:bg-neutral-800 hover:text-white transition-colors">
                1.2 ETFs / ETF
              </Link>
            </div>
          </div>

          {/* Menu 2: News & Analysis */}
          <div className="relative group">
            <button
              onClick={() => toggleDropdown("news")}
              className="flex items-center gap-1.5 py-2 hover:text-white transition-colors focus:outline-none"
            >
              <span>2. News & Analysis / ข่าว</span>
              <svg className="w-4 h-4 text-gray-400 group-hover:text-white transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute left-0 mt-1 w-80 rounded-xl bg-neutral-900 border border-neutral-800 shadow-2xl py-2 hidden group-hover:block transition-all duration-150">
              <Link href="/dashboard?news=stocks" className="block px-4 py-2.5 text-xs text-gray-300 hover:bg-neutral-800 hover:text-white transition-colors leading-relaxed">
                2.1 Stock News & Analysis (SEC 10-Q/10-K & Guidance)
              </Link>
              <Link href="/dashboard?news=etf" className="block px-4 py-2.5 text-xs text-gray-300 hover:bg-neutral-800 hover:text-white transition-colors">
                2.2 ETF News & Analysis
              </Link>
            </div>
          </div>

          {/* Menu 3: Watchlists */}
          <div className="relative group">
            <button
              onClick={() => toggleDropdown("watchlists")}
              className="flex items-center gap-1.5 py-2 hover:text-white transition-colors focus:outline-none"
            >
              <span>3. Watchlists / รายการเฝ้าดู</span>
              <svg className="w-4 h-4 text-gray-400 group-hover:text-white transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute left-0 mt-1 w-72 rounded-xl bg-neutral-900 border border-neutral-800 shadow-2xl py-2 hidden group-hover:block transition-all duration-150">
              <Link href="/dashboard?watchlist=stock" className="block px-4 py-2.5 text-xs text-gray-300 hover:bg-neutral-800 hover:text-white transition-colors">
                3.1 Stock Watchlist (max 30 items)
              </Link>
              <Link href="/dashboard?watchlist=etf" className="block px-4 py-2.5 text-xs text-gray-300 hover:bg-neutral-800 hover:text-white transition-colors">
                3.2 ETF Watchlist (max 30 items)
              </Link>
            </div>
          </div>

          {/* Menu 4: Screener */}
          <Link
            href="/screener"
            className="hover:text-white transition-colors py-2"
          >
            4. Stock & ETF Screener
          </Link>
        </nav>

        {/* User Actions */}
        <div className="hidden lg:flex items-center gap-4">
          {userEmail && (
            <span className="text-xs text-gray-400">
              {userEmail}
            </span>
          )}
          <form action={signOut}>
            <button
              type="submit"
              className="px-3.5 py-1.5 text-xs font-semibold rounded-md border border-neutral-700 bg-neutral-800 text-gray-300 hover:bg-neutral-700 hover:text-white transition-all active:scale-95"
            >
              Sign Out
            </button>
          </form>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-neutral-800 focus:outline-none transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-neutral-800 bg-neutral-900 px-4 py-4 space-y-3 text-sm">
          {/* 1. Markets */}
          <div>
            <button
              onClick={() => toggleDropdown("market_mobile")}
              className="w-full flex justify-between items-center py-2 text-gray-200 font-semibold border-b border-neutral-800/60"
            >
              <span>1. Markets / ตลาด</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {activeDropdown === "market_mobile" && (
              <div className="pl-4 py-2 space-y-1 bg-neutral-950/40 rounded mt-1">
                <Link href="/dashboard?view=stocks" className="block text-xs text-gray-400 hover:text-white py-1">
                  1.1 Stocks / หุ้น
                </Link>
                <Link href="/dashboard?view=etf" className="block text-xs text-gray-400 hover:text-white py-1">
                  1.2 ETFs / ETF
                </Link>
              </div>
            )}
          </div>

          {/* 2. News & Analysis */}
          <div>
            <button
              onClick={() => toggleDropdown("news_mobile")}
              className="w-full flex justify-between items-center py-2 text-gray-200 font-semibold border-b border-neutral-800/60"
            >
              <span>2. News & Analysis / ข่าว</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {activeDropdown === "news_mobile" && (
              <div className="pl-4 py-2 space-y-1.5 bg-neutral-950/40 rounded mt-1">
                <Link href="/dashboard?news=stocks" className="block text-xs text-gray-400 hover:text-white">
                  2.1 Stock News & Analysis (SEC 10-Q/10-K & Guidance)
                </Link>
                <Link href="/dashboard?news=etf" className="block text-xs text-gray-400 hover:text-white">
                  2.2 ETF News & Analysis
                </Link>
              </div>
            )}
          </div>

          {/* 3. Watchlists */}
          <div>
            <button
              onClick={() => toggleDropdown("watchlists_mobile")}
              className="w-full flex justify-between items-center py-2 text-gray-200 font-semibold border-b border-neutral-800/60"
            >
              <span>3. Watchlists / รายการเฝ้าดู</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {activeDropdown === "watchlists_mobile" && (
              <div className="pl-4 py-2 space-y-1.5 bg-neutral-950/40 rounded mt-1">
                <Link href="/dashboard?watchlist=stock" className="block text-xs text-gray-400 hover:text-white">
                  3.1 Stock Watchlist (max 30 items)
                </Link>
                <Link href="/dashboard?watchlist=etf" className="block text-xs text-gray-400 hover:text-white">
                  3.2 ETF Watchlist (max 30 items)
                </Link>
              </div>
            )}
          </div>

          {/* 4. Screener */}
          <Link href="/screener" className="block py-2 text-gray-200 font-semibold border-b border-neutral-800/60">
            4. Stock & ETF Screener
          </Link>

          {/* User Sign Out */}
          <div className="pt-2 flex items-center justify-between">
            {userEmail && <span className="text-xs text-gray-400">{userEmail}</span>}
            <form action={signOut}>
              <button
                type="submit"
                className="px-3.5 py-1.5 text-xs font-semibold rounded-md border border-neutral-700 bg-neutral-800 text-gray-300"
              >
                Sign Out
              </button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
