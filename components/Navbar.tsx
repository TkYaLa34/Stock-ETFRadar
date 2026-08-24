"use client";

import { useState } from "react";
import Link from "next/link";
import { signOut } from "@/app/dashboard/actions";

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
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/30">
              R
            </div>
            <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white">
              Stock & ETF Radar
            </span>
          </Link>
        </div>

        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-300">
          <div className="relative group">
            <button
              onClick={() => toggleDropdown("market")}
              className="flex items-center gap-1.5 py-2 hover:text-white transition-colors focus:outline-none"
            >
              <span>1. ตลาด (Market)</span>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute left-0 mt-1 w-48 rounded-lg bg-neutral-900 border border-neutral-800 shadow-xl py-2 hidden group-hover:block transition-all">
              <Link href="/dashboard?view=stocks" className="block px-4 py-2 text-xs text-gray-300 hover:bg-neutral-800 hover:text-white">
                1.1 หุ้น (Stocks)
              </Link>
              <Link href="/dashboard?view=etf" className="block px-4 py-2 text-xs text-gray-300 hover:bg-neutral-800 hover:text-white">
                1.2 ETF
              </Link>
            </div>
          </div>

          <div className="relative group">
            <button
              onClick={() => toggleDropdown("news")}
              className="flex items-center gap-1.5 py-2 hover:text-white transition-colors focus:outline-none"
            >
              <span>2. ข่าว (News & Analysis)</span>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute left-0 mt-1 w-80 rounded-lg bg-neutral-900 border border-neutral-800 shadow-xl py-2 hidden group-hover:block transition-all">
              <Link href="/dashboard?news=stocks" className="block px-4 py-2.5 text-xs text-gray-300 hover:bg-neutral-800 hover:text-white">
                2.1 ข่าวหุ้น และบทวิเคราะห์หุ้น (รวมถึง SEC 10-Q/10-K & Forward-Looking Guidance)
              </Link>
              <Link href="/dashboard?news=etf" className="block px-4 py-2.5 text-xs text-gray-300 hover:bg-neutral-800 hover:text-white">
                2.2 ข่าวETF และบทวิเคราะห์ETF
              </Link>
            </div>
          </div>

          <div className="relative group">
            <button
              onClick={() => toggleDropdown("watchlists")}
              className="flex items-center gap-1.5 py-2 hover:text-white transition-colors focus:outline-none"
            >
              <span>3. รายการเฝ้าดู (Watchlists)</span>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute left-0 mt-1 w-72 rounded-lg bg-neutral-900 border border-neutral-800 shadow-xl py-2 hidden group-hover:block transition-all">
              <Link href="/dashboard?watchlist=stock" className="block px-4 py-2 text-xs text-gray-300 hover:bg-neutral-800 hover:text-white">
                3.1 รายการเฝ้าดูหุ้น (จำกัดไม่เกิน 30 ตัวต่อ 1 ลิสต์)
              </Link>
              <Link href="/dashboard?watchlist=etf" className="block px-4 py-2 text-xs text-gray-300 hover:bg-neutral-800 hover:text-white">
                3.2 รายการเฝ้าดูETF (จำกัดไม่เกิน 30 ตัวต่อ 1 ลิสต์)
              </Link>
            </div>
          </div>

          <Link
            href="/dashboard?view=screener"
            className="hover:text-white transition-colors py-2"
          >
            4. ตัวคัดกรองหุ้น และ ETF
          </Link>
        </nav>

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

        <button
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-neutral-800 focus:outline-none"
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

      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-neutral-800 bg-neutral-900 px-4 py-4 space-y-3 text-sm">
          <div>
            <button
              onClick={() => toggleDropdown("market_mobile")}
              className="w-full flex justify-between items-center py-2 text-gray-200 font-semibold border-b border-neutral-800/60"
            >
              <span>1. ตลาด (Market)</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {activeDropdown === "market_mobile" && (
              <div className="pl-4 py-2 space-y-1 bg-neutral-950/40 rounded mt-1">
                <Link href="/dashboard?view=stocks" className="block text-xs text-gray-400 hover:text-white py-1">
                  1.1 หุ้น (Stocks)
                </Link>
                <Link href="/dashboard?view=etf" className="block text-xs text-gray-400 hover:text-white py-1">
                  1.2 ETF
                </Link>
              </div>
            )}
          </div>

          <div>
            <button
              onClick={() => toggleDropdown("news_mobile")}
              className="w-full flex justify-between items-center py-2 text-gray-200 font-semibold border-b border-neutral-800/60"
            >
              <span>2. ข่าว (News & Analysis)</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {activeDropdown === "news_mobile" && (
              <div className="pl-4 py-2 space-y-1.5 bg-neutral-950/40 rounded mt-1">
                <Link href="/dashboard?news=stocks" className="block text-xs text-gray-400 hover:text-white">
                  2.1 ข่าวหุ้น และบทวิเคราะห์หุ้น (รวมถึง SEC 10-Q/10-K & Guidance)
                </Link>
                <Link href="/dashboard?news=etf" className="block text-xs text-gray-400 hover:text-white">
                  2.2 ข่าวETF และบทวิเคราะห์ETF
                </Link>
              </div>
            )}
          </div>

          <div>
            <button
              onClick={() => toggleDropdown("watchlists_mobile")}
              className="w-full flex justify-between items-center py-2 text-gray-200 font-semibold border-b border-neutral-800/60"
            >
              <span>3. รายการเฝ้าดู (Watchlists)</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {activeDropdown === "watchlists_mobile" && (
              <div className="pl-4 py-2 space-y-1.5 bg-neutral-950/40 rounded mt-1">
                <Link href="/dashboard?watchlist=stock" className="block text-xs text-gray-400 hover:text-white">
                  3.1 รายการเฝ้าดูหุ้น (จำกัดไม่เกิน 30 ตัว/ลิสต์)
                </Link>
                <Link href="/dashboard?watchlist=etf" className="block text-xs text-gray-400 hover:text-white">
                  3.2 รายการเฝ้าดูETF (จำกัดไม่เกิน 30 ตัว/ลิสต์)
                </Link>
              </div>
            )}
          </div>

          <Link href="/dashboard?view=screener" className="block py-2 text-gray-200 font-semibold border-b border-neutral-800/60">
            4. ตัวคัดกรองหุ้น และ ETF
          </Link>

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
