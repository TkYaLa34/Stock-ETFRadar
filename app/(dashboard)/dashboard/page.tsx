import { Navbar } from "@/components/Navbar";
import { WatchlistTable } from "@/components/watchlist-table";
import { ProfitCalculator } from "@/components/ProfitCalculator";
import { SecFinancialsCard } from "@/components/SecFinancialsCard";
import { FavoritesWatchlistCard } from "@/components/FavoritesWatchlistCard";
import { FinancialNewsCard } from "@/components/FinancialNewsCard";
import { MarketSectorsHeatmap } from "@/components/MarketSectorsHeatmap";
import { ConceptSectors } from "@/components/ConceptSectors";
import { BottomNav } from "@/components/BottomNav";
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

const MINI_MARKET_INDEXES = [
  { name: "S&P 500", price: "5,562.10", changePct: "+0.84%", isPos: true },
  { name: "Nasdaq", price: "17,842.30", changePct: "+1.25%", isPos: true },
  { name: "Dow Jones", price: "39,127.80", changePct: "-0.18%", isPos: false },
  { name: "SET Index", price: "1,312.40", changePct: "+0.45%", isPos: true },
];

export default async function DashboardPage({
  searchParams,
}: {
  searchParams?: { mainTab?: string };
}) {
  const items: WatchlistItem[] = DEFAULT_WATCHLIST;
  const activeMainTab = searchParams?.mainTab || "home";

  return (
    <div className="min-h-screen bg-neutral-950 text-gray-100 flex flex-col font-sans pb-16 md:pb-0">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        {/* Top Tab Switcher & Mini Market Trend Preview Cards */}
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b border-neutral-800 pb-3">
            <div className="flex bg-neutral-900 p-1 rounded-xl border border-neutral-800 font-bold text-xs">
              <a
                href="/dashboard?mainTab=home"
                className={`px-4 py-2 rounded-lg transition-all ${
                  activeMainTab === "home"
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/30 font-black"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                หน้าหลัก (Home)
              </a>
              <a
                href="/dashboard?mainTab=market"
                className={`px-4 py-2 rounded-lg transition-all ${
                  activeMainTab === "market"
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/30 font-black"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                ตลาดหุ้น (Market)
              </a>
            </div>

            {/* Quick Add Ticker Input */}
            <form
              action={addToWatchlist}
              className="hidden sm:flex items-center gap-2 bg-neutral-900 border border-neutral-800 p-1.5 rounded-xl shadow-lg transition-all hover:border-neutral-700"
            >
              <input
                type="text"
                name="ticker"
                placeholder="Ticker (e.g. SPY)"
                required
                className="bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-1 text-xs text-white placeholder-gray-500 uppercase focus:outline-none focus:ring-2 focus:ring-blue-500 w-32"
              />
              <select
                name="asset_type"
                className="bg-neutral-950 border border-neutral-800 rounded-lg px-2 py-1 text-xs text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="stock">Stock</option>
                <option value="etf">ETF</option>
              </select>
              <button
                type="submit"
                className="px-3 py-1 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-semibold text-xs rounded-lg shadow-md transition-all"
              >
                + Add
              </button>
            </form>
          </div>

          {/* Mini Market Trend Preview Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {MINI_MARKET_INDEXES.map((idx) => (
              <div
                key={idx.name}
                className="p-3.5 bg-neutral-900 border border-neutral-800 rounded-xl space-y-1 shadow-md hover:border-neutral-700 transition-all"
              >
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-gray-300">{idx.name}</span>
                  <span
                    className={`font-mono text-[11px] font-bold ${
                      idx.isPos ? "text-emerald-400" : "text-rose-400"
                    }`}
                  >
                    {idx.changePct}
                  </span>
                </div>
                <div className="text-base font-black text-white font-mono">{idx.price}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Market Sectors Heatmap & Concept Sectors Components */}
        <MarketSectorsHeatmap />
        <ConceptSectors />

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

      {/* Fixed Mobile Bottom Navigation Bar */}
      <BottomNav />

      {/* Footer */}
      <footer className="border-t border-neutral-800 py-6 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Stock & ETF Radar SaaS. All rights reserved.
      </footer>
    </div>
  );
}
