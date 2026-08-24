import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { WatchlistTable } from "@/components/watchlist-table";
import { ProfitCalculator } from "@/components/ProfitCalculator";
import { SecFinancialsCard } from "@/components/SecFinancialsCard";
import { FavoritesWatchlistCard } from "@/components/FavoritesWatchlistCard";
import { FinancialNewsCard } from "@/components/FinancialNewsCard";
import { addToWatchlist, type WatchlistItem } from "./actions";

const DEFAULT_WATCHLIST: WatchlistItem[] = [
  {
    id: "1",
    ticker: "AAPL",
    name: "Apple Inc.",
    asset_type: "stock",
    price: 224.23,
    change: 3.45,
    change_percent: 1.56,
  },
  {
    id: "2",
    ticker: "NVDA",
    name: "NVIDIA Corporation",
    asset_type: "stock",
    price: 128.5,
    change: -2.1,
    change_percent: -1.61,
  },
  {
    id: "3",
    ticker: "VOO",
    name: "Vanguard S&P 500 ETF",
    asset_type: "etf",
    price: 512.8,
    change: 4.2,
    change_percent: 0.83,
  },
  {
    id: "4",
    ticker: "QQQ",
    name: "Invesco QQQ Trust ETF",
    asset_type: "etf",
    price: 480.15,
    change: 5.6,
    change_percent: 1.18,
  },
  {
    id: "5",
    ticker: "MSFT",
    name: "Microsoft Corporation",
    asset_type: "stock",
    price: 421.4,
    change: 1.85,
    change_percent: 0.44,
  },
];

export default async function DashboardPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: dbWatchlist } = await supabase
    .from("watchlists")
    .select("*")
    .eq("user_id", user.id);

  const items: WatchlistItem[] =
    dbWatchlist && dbWatchlist.length > 0
      ? dbWatchlist.map((w) => ({
          id: w.id,
          ticker: w.ticker,
          name: w.ticker,
          asset_type: w.asset_type as "stock" | "etf",
          price: 150 + Math.random() * 200,
          change: (Math.random() - 0.4) * 10,
          change_percent: (Math.random() - 0.4) * 5,
        }))
      : DEFAULT_WATCHLIST;

  return (
    <div className="min-h-screen bg-neutral-950 text-gray-100 flex flex-col font-sans">
      <Navbar userEmail={user.email} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        {/* Page Header Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Market Radar Dashboard
              </h1>
              <span className="px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider rounded-full bg-blue-950 text-blue-400 border border-blue-800/60 shadow-sm">
                Real-Time
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Monitor equities, SEC 10-K filings, custom watchlists, and live market intelligence.
            </p>
          </div>

          {/* Quick Add Ticker Input */}
          <form
            action={addToWatchlist}
            className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 p-2 rounded-xl shadow-lg transition-all hover:border-neutral-700"
          >
            <input
              type="text"
              name="ticker"
              placeholder="Ticker (e.g. SPY)"
              required
              className="bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-white placeholder-gray-500 uppercase focus:outline-none focus:ring-2 focus:ring-blue-500 w-32"
            />
            <select
              name="asset_type"
              className="bg-neutral-950 border border-neutral-800 rounded-lg px-2.5 py-1.5 text-xs text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="stock">Stock</option>
              <option value="etf">ETF</option>
            </select>
            <button
              type="submit"
              className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-semibold text-xs rounded-lg shadow-md transition-all"
            >
              + Add
            </button>
          </form>
        </div>

        {/* Quick Overview Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-neutral-900 border border-neutral-800/80 rounded-xl p-4 shadow-lg">
            <span className="text-xs font-medium text-gray-400 block mb-1">Tracked Watchlist</span>
            <span className="text-xl font-bold text-white">{items.length} Assets</span>
          </div>
          <div className="bg-neutral-900 border border-neutral-800/80 rounded-xl p-4 shadow-lg">
            <span className="text-xs font-medium text-gray-400 block mb-1">Market Sentiment</span>
            <span className="text-xl font-bold text-emerald-400">Bullish (+1.2%)</span>
          </div>
          <div className="bg-neutral-900 border border-neutral-800/80 rounded-xl p-4 shadow-lg">
            <span className="text-xs font-medium text-gray-400 block mb-1">SEC 10-K Verification</span>
            <span className="text-xl font-bold text-blue-400">Active / Live</span>
          </div>
          <div className="bg-neutral-900 border border-neutral-800/80 rounded-xl p-4 shadow-lg">
            <span className="text-xs font-medium text-gray-400 block mb-1">SaaS Tier</span>
            <span className="text-xl font-bold text-amber-400">Pro Radar</span>
          </div>
        </div>

        {/* Interactive Watchlist Table & Price Chart */}
        <WatchlistTable initialItems={items} />

        {/* Two-Column Responsive Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <SecFinancialsCard initialCik="0000320193" tickerLabel="AAPL" />
          <div className="space-y-8">
            <FavoritesWatchlistCard />
            <FinancialNewsCard />
            <ProfitCalculator />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-800 py-6 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Stock & ETF Radar SaaS. All rights reserved.
      </footer>
    </div>
  );
}
