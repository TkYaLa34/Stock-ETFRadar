import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { WatchlistTable } from "@/components/watchlist-table";
import { ProfitCalculator } from "@/components/ProfitCalculator";
import { addToWatchlist, signOut, type WatchlistItem } from "./actions";

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
    <div className="min-h-screen bg-neutral-950 text-gray-100 flex flex-col">
      <header className="border-b border-neutral-800 bg-neutral-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/30">
              R
            </div>
            <span className="font-extrabold text-xl tracking-tight text-white">
              Stock & ETF Radar
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-400 hidden sm:inline-block">
              Logged in as:{" "}
              <strong className="text-gray-200">{user.email}</strong>
            </span>
            <form action={signOut}>
              <button
                type="submit"
                className="px-3.5 py-1.5 text-xs font-semibold rounded-md border border-neutral-700 bg-neutral-800 text-gray-300 hover:bg-neutral-700 hover:text-white transition-colors"
              >
                Sign Out
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Market Radar Dashboard
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Monitor real-time prices, manage custom watchlists, and filter stocks & ETFs.
            </p>
          </div>

          <form
            action={addToWatchlist}
            className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 p-2 rounded-lg"
          >
            <input
              type="text"
              name="ticker"
              placeholder="Ticker (e.g. SPY)"
              required
              className="bg-neutral-950 border border-neutral-800 rounded px-3 py-1.5 text-xs text-white placeholder-gray-500 uppercase focus:outline-none focus:ring-2 focus:ring-blue-500 w-32"
            />
            <select
              name="asset_type"
              className="bg-neutral-950 border border-neutral-800 rounded px-2 py-1.5 text-xs text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="stock">Stock</option>
              <option value="etf">ETF</option>
            </select>
            <button
              type="submit"
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded transition-colors"
            >
              + Add
            </button>
          </form>
        </div>

        <WatchlistTable initialItems={items} />

        <ProfitCalculator />
      </main>

      <footer className="border-t border-neutral-800 py-6 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Stock & ETF Radar SaaS. All rights reserved.
      </footer>
    </div>
  );
}
