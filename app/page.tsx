import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 sm:p-12 lg:p-24 bg-neutral-950 text-gray-100">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex border-b border-neutral-800 pb-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/30">
            R
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-white">
            Stock & ETF Radar SaaS
          </span>
        </div>
        <div className="mt-4 lg:mt-0 flex items-center gap-3">
          <span className="px-3 py-1 text-xs font-bold rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/60 shadow-sm">
            Zero-Install Web App
          </span>
          <Link
            href="/login"
            className="px-4 py-2 text-xs font-bold rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-md active:scale-95"
          >
            Launch Web Radar →
          </Link>
        </div>
      </div>

      <div className="my-16 max-w-3xl text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-medium text-gray-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          100% Browser-Based Financial Intelligence Engine
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
          Instant Market Radar in Your Web Browser
        </h1>
        <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Access real-time stock/ETF screening, SEC 10-K financial health badges, and custom watchlists directly in any modern browser. Zero app store downloads or installations required.
        </p>
        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/login"
            className="px-6 py-3 text-sm font-bold rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-lg shadow-blue-600/30 active:scale-95"
          >
            Access Web Dashboard Now
          </Link>
          <Link
            href="/screener"
            className="px-6 py-3 text-sm font-bold rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-gray-200 transition-all active:scale-95"
          >
            Explore Stock Screener
          </Link>
        </div>
      </div>

      <div className="grid text-center lg:max-w-5xl lg:w-full lg:grid-cols-3 lg:text-left gap-6 w-full">
        <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-6 transition-all hover:border-neutral-700">
          <div className="w-10 h-10 rounded-lg bg-blue-950 border border-blue-800/50 flex items-center justify-center mb-4 text-blue-400 font-bold">
            01
          </div>
          <h2 className="mb-2 text-xl font-bold text-white">Direct Browser Access</h2>
          <p className="text-xs text-gray-400 leading-relaxed">
            Run complete market analysis on Chrome, Safari, Edge, or Firefox across desktop and mobile devices without installing native software.
          </p>
        </div>

        <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-6 transition-all hover:border-neutral-700">
          <div className="w-10 h-10 rounded-lg bg-emerald-950 border border-emerald-800/50 flex items-center justify-center mb-4 text-emerald-400 font-bold">
            02
          </div>
          <h2 className="mb-2 text-xl font-bold text-white">Verified SEC 10-K Filings</h2>
          <p className="text-xs text-gray-400 leading-relaxed">
            Automated XBRL parsing for official company facts with color-coded financial health indicators.
          </p>
        </div>

        <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-6 transition-all hover:border-neutral-700">
          <div className="w-10 h-10 rounded-lg bg-purple-950 border border-purple-800/50 flex items-center justify-center mb-4 text-purple-400 font-bold">
            03
          </div>
          <h2 className="mb-2 text-xl font-bold text-white">Interactive Watchlists</h2>
          <p className="text-xs text-gray-400 leading-relaxed">
            Manage up to 30 stocks and ETFs per list with live price trends, Recharts charts, and profit calculators.
          </p>
        </div>
      </div>

      <footer className="mt-16 pt-6 border-t border-neutral-800 w-full text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Stock & ETF Radar SaaS • Zero-Install Web-Browser-First Experience
      </footer>
    </main>
  );
}
