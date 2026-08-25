"use client";

import { useState, useEffect } from "react";
import { removeFromWatchlist, type WatchlistItem } from "@/app/(dashboard)/dashboard/actions";
import { StockChart, type PricePoint } from "@/components/StockChart";

interface WatchlistTableProps {
  initialItems: WatchlistItem[];
}

export function WatchlistTable({ initialItems }: WatchlistTableProps) {
  const [activeTab, setActiveTab] = useState<"all" | "stock" | "etf">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTicker, setSelectedTicker] = useState<string>(
    initialItems[0]?.ticker || "AAPL"
  );
  const [chartData, setChartData] = useState<PricePoint[]>([]);
  const [isChartLoading, setIsChartLoading] = useState(false);
  const [isPositiveTrend, setIsPositiveTrend] = useState(true);

  const stockCount = initialItems.filter((i) => i.asset_type === "stock").length;
  const etfCount = initialItems.filter((i) => i.asset_type === "etf").length;

  useEffect(() => {
    async function fetchChartData() {
      if (!selectedTicker) return;
      setIsChartLoading(true);
      try {
        const res = await fetch(`/api/stock?symbol=${encodeURIComponent(selectedTicker)}`);
        if (res.ok) {
          const data = await res.json();
          if (data.history) {
            setChartData(data.history);
            setIsPositiveTrend((data.change ?? 0) >= 0);
          }
        }
      } catch (err) {
        console.error("Error loading chart data:", err);
      } finally {
        setIsChartLoading(false);
      }
    }
    fetchChartData();
  }, [selectedTicker]);

  const filteredItems = initialItems.filter((item) => {
    const matchesTab =
      activeTab === "all" ? true : item.asset_type === activeTab;
    const matchesSearch =
      item.ticker.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Interactive Stock Chart Section */}
      <div className="w-full overflow-hidden transition-all duration-200">
        {isChartLoading ? (
          <div className="w-full h-64 bg-neutral-900 border border-neutral-800 rounded-xl p-5 shadow-xl space-y-4 animate-pulse">
            <div className="flex justify-between items-center">
              <div className="h-5 bg-neutral-800 rounded w-1/4" />
              <div className="h-5 bg-neutral-800 rounded w-1/6" />
            </div>
            <div className="h-44 w-full bg-neutral-950/60 rounded-lg border border-neutral-800/50 flex items-end p-3 gap-2">
              {[30, 50, 40, 70, 60, 85, 75].map((h, i) => (
                <div
                  key={i}
                  className="w-full bg-neutral-800/80 rounded-t"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
        ) : (
          <StockChart
            ticker={selectedTicker}
            data={chartData}
            isPositive={isPositiveTrend}
          />
        )}
      </div>

      {/* Capacity Badges & Search Controls */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 bg-neutral-900/60 border border-neutral-800/80 rounded-xl p-3.5 px-5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-white tracking-wide">Watchlist Capacity:</span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-950 text-blue-400 border border-blue-800/50">
              Stocks: {stockCount}/30
            </span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-purple-950 text-purple-400 border border-purple-800/50">
              ETFs: {etfCount}/30
            </span>
          </div>
          <span className="text-[11px] text-gray-400">
            Max 30 items per list tier
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
          {/* Search Bar */}
          <div className="relative w-full sm:w-80 md:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search by Ticker or Asset Name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-4 py-2.5 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            />
          </div>

          {/* Tab Selector */}
          <div className="flex p-1 bg-neutral-900 rounded-lg border border-neutral-800 w-full sm:w-auto min-h-[44px] items-center">
            {(["all", "stock", "etf"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 sm:flex-none px-4 py-2 text-xs font-semibold rounded-md capitalize transition-all duration-150 ${
                  activeTab === tab
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                    : "text-gray-400 hover:text-gray-200 hover:bg-neutral-800/50"
                }`}
              >
                {tab === "all" ? "All Assets" : `${tab}s`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Watchlist Table with Clean Horizontal Scroll */}
      <div className="overflow-x-auto -mx-4 sm:mx-0 rounded-none sm:rounded-xl border-y sm:border border-neutral-800 bg-neutral-900 shadow-xl transition-all duration-200 hover:border-neutral-700/80">
        <table className="w-full text-left text-sm text-gray-300 min-w-[550px]">
          <thead className="bg-neutral-950/60 text-xs uppercase text-gray-400 border-b border-neutral-800">
            <tr>
              <th scope="col" className="px-4 sm:px-6 py-3.5">
                Ticker / Name
              </th>
              <th scope="col" className="px-4 sm:px-6 py-3.5">
                Type
              </th>
              <th scope="col" className="px-4 sm:px-6 py-3.5 text-right">
                Price
              </th>
              <th scope="col" className="px-4 sm:px-6 py-3.5 text-right">
                24h Change
              </th>
              <th scope="col" className="px-4 sm:px-6 py-3.5 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800">
            {filteredItems.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-12 text-center text-gray-500 text-sm"
                >
                  No assets found in watchlist.
                </td>
              </tr>
            ) : (
              filteredItems.map((item) => {
                const isSelected = selectedTicker === item.ticker;
                return (
                  <tr
                    key={item.id}
                    onClick={() => setSelectedTicker(item.ticker)}
                    className={`cursor-pointer transition-all duration-150 ${
                      isSelected
                        ? "bg-neutral-800/90 border-l-4 border-l-blue-500 font-semibold"
                        : "hover:bg-neutral-800/50"
                    }`}
                  >
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <div className="font-bold text-white text-base">
                        {item.ticker}
                      </div>
                      <div className="text-xs text-gray-400">{item.name}</div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase ${
                          item.asset_type === "stock"
                            ? "bg-blue-900/40 text-blue-400 border border-blue-800/50"
                            : "bg-purple-900/40 text-purple-400 border border-purple-800/50"
                        }`}
                      >
                        {item.asset_type}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right font-medium text-white">
                      ${item.price.toFixed(2)}
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right font-medium">
                      <span
                        className={`inline-flex items-center gap-1 ${
                          item.change >= 0 ? "text-emerald-400" : "text-rose-400"
                        }`}
                      >
                        {item.change >= 0 ? "+" : ""}
                        {item.change.toFixed(2)} ({item.change_percent >= 0 ? "+" : ""}
                        {item.change_percent.toFixed(2)}%)
                      </span>
                    </td>
                    <td
                      className="px-4 sm:px-6 py-4 whitespace-nowrap text-center"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={async () => {
                          await removeFromWatchlist(item.id);
                        }}
                        className="text-gray-500 hover:text-rose-400 active:scale-90 p-2 min-h-[38px] min-w-[38px] inline-flex items-center justify-center rounded transition-all duration-150"
                        title="Remove from Watchlist"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
