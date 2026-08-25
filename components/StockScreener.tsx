"use client";

import { useState } from "react";
import { useFavoritesWatchlist } from "@/hooks/useFavoritesWatchlist";

export interface ScreenerAsset {
  ticker: string;
  name: string;
  assetType: "stock" | "etf";
  marketCapBillion: number;
  peRatio: number;
  price: number;
  changePercent: number;
  healthStatus: "strong_growth" | "stable" | "decline";
  sector: string;
}

const INITIAL_SCREENER_DATA: ScreenerAsset[] = [
  {
    ticker: "AAPL",
    name: "Apple Inc.",
    assetType: "stock",
    marketCapBillion: 3450,
    peRatio: 33.5,
    price: 224.23,
    changePercent: 1.56,
    healthStatus: "strong_growth",
    sector: "Technology",
  },
  {
    ticker: "NVDA",
    name: "NVIDIA Corporation",
    assetType: "stock",
    marketCapBillion: 3150,
    peRatio: 68.2,
    price: 128.5,
    changePercent: -1.61,
    healthStatus: "strong_growth",
    sector: "Technology",
  },
  {
    ticker: "MSFT",
    name: "Microsoft Corporation",
    assetType: "stock",
    marketCapBillion: 3120,
    peRatio: 35.1,
    price: 421.4,
    changePercent: 0.44,
    healthStatus: "strong_growth",
    sector: "Technology",
  },
  {
    ticker: "VOO",
    name: "Vanguard S&P 500 ETF",
    assetType: "etf",
    marketCapBillion: 520,
    peRatio: 25.4,
    price: 512.8,
    changePercent: 0.83,
    healthStatus: "stable",
    sector: "Broad Market ETF",
  },
  {
    ticker: "QQQ",
    name: "Invesco QQQ Trust ETF",
    assetType: "etf",
    marketCapBillion: 280,
    peRatio: 31.2,
    price: 480.15,
    changePercent: 1.18,
    healthStatus: "strong_growth",
    sector: "Tech ETF",
  },
  {
    ticker: "INTC",
    name: "Intel Corporation",
    assetType: "stock",
    marketCapBillion: 95,
    peRatio: 45.8,
    price: 22.1,
    changePercent: -3.4,
    healthStatus: "decline",
    sector: "Technology",
  },
  {
    ticker: "JNJ",
    name: "Johnson & Johnson",
    assetType: "stock",
    marketCapBillion: 380,
    peRatio: 22.3,
    price: 158.4,
    changePercent: 0.25,
    healthStatus: "stable",
    sector: "Healthcare",
  },
  {
    ticker: "SCHD",
    name: "Schwab U.S. Dividend Equity ETF",
    assetType: "etf",
    marketCapBillion: 62,
    peRatio: 16.5,
    price: 82.3,
    changePercent: 0.45,
    healthStatus: "stable",
    sector: "Dividend ETF",
  },
];

export function StockScreener() {
  const [assetType, setAssetType] = useState<"all" | "stock" | "etf">("all");
  const [healthFilter, setHealthFilter] = useState<string>("all");
  const [maxPeRatio, setMaxPeRatio] = useState<number>(100);
  const [minMarketCap, setMinMarketCap] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortBy, setSortBy] = useState<keyof ScreenerAsset>("marketCapBillion");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const { isFavorite, toggleFavorite } = useFavoritesWatchlist();

  const handleSort = (field: keyof ScreenerAsset) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  };

  const filteredAssets = INITIAL_SCREENER_DATA.filter((asset) => {
    if (assetType !== "all" && asset.assetType !== assetType) return false;
    if (healthFilter !== "all" && asset.healthStatus !== healthFilter) return false;
    if (asset.peRatio > maxPeRatio) return false;
    if (asset.marketCapBillion < minMarketCap) return false;
    if (
      searchTerm.trim() !== "" &&
      !asset.ticker.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !asset.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    return true;
  }).sort((a, b) => {
    const valA = a[sortBy];
    const valB = b[sortBy];
    if (typeof valA === "number" && typeof valB === "number") {
      return sortOrder === "asc" ? valA - valB : valB - valA;
    }
    if (typeof valA === "string" && typeof valB === "string") {
      return sortOrder === "asc"
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    }
    return 0;
  });

  const getHealthBadge = (status: ScreenerAsset["healthStatus"]) => {
    switch (status) {
      case "strong_growth":
        return (
          <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/60 shadow-sm shadow-emerald-900/20">
            Strong Growth
          </span>
        );
      case "stable":
        return (
          <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-amber-950 text-amber-400 border border-amber-800/60 shadow-sm shadow-amber-900/20">
            Stable
          </span>
        );
      case "decline":
        return (
          <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-rose-950 text-rose-400 border border-rose-800/60 shadow-sm shadow-rose-900/20">
            Decline
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Interactive Controls & Filters Card */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 sm:p-6 shadow-xl space-y-6 transition-all duration-200 hover:border-neutral-700/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
          <div>
            <h2 className="text-xl font-extrabold text-white tracking-wide">
              Stock & ETF Screener Radar
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              Filter by valuation multiples, market capitalization, asset type, and 10-K financial health.
            </p>
          </div>
          <button
            onClick={() => {
              setAssetType("all");
              setHealthFilter("all");
              setMaxPeRatio(100);
              setMinMarketCap(0);
              setSearchTerm("");
            }}
            className="self-start sm:self-auto px-4 py-2 bg-neutral-800 hover:bg-neutral-700 active:scale-95 text-xs font-semibold text-gray-300 rounded-lg border border-neutral-700 transition-all shadow-sm"
          >
            Reset Filters
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {/* Search Input */}
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5">
              Search Asset
            </label>
            <input
              type="text"
              placeholder="Ticker / Name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>

          {/* Asset Type Select */}
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5">
              Asset Type
            </label>
            <select
              value={assetType}
              onChange={(e) => setAssetType(e.target.value as any)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
            >
              <option value="all">All Assets</option>
              <option value="stock">Stocks Only</option>
              <option value="etf">ETFs Only</option>
            </select>
          </div>

          {/* Financial Health Select */}
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5">
              10-K Health Status
            </label>
            <select
              value={healthFilter}
              onChange={(e) => setHealthFilter(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="strong_growth">Strong Growth (+5% YoY)</option>
              <option value="stable">Stable Performance</option>
              <option value="decline">Revenue Decline</option>
            </select>
          </div>

          {/* Max P/E Slider */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-medium text-gray-400">
                Max P/E Ratio
              </label>
              <span className="text-xs font-mono font-bold text-blue-400">
                {maxPeRatio === 100 ? "Any" : maxPeRatio}
              </span>
            </div>
            <input
              type="range"
              min={10}
              max={100}
              step={5}
              value={maxPeRatio}
              onChange={(e) => setMaxPeRatio(Number(e.target.value))}
              className="w-full accent-blue-500 cursor-pointer h-2 bg-neutral-950 rounded-lg"
            />
          </div>

          {/* Min Market Cap */}
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5">
              Min Market Cap
            </label>
            <select
              value={minMarketCap}
              onChange={(e) => setMinMarketCap(Number(e.target.value))}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
            >
              <option value={0}>All Sizes ($0+)</option>
              <option value={10}>Large Cap ($10B+)</option>
              <option value={100}>Mega Cap ($100B+)</option>
              <option value={1000}>Trillion Cap ($1000B+)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Screener Results Table Component */}
      <div className="overflow-x-auto -mx-4 sm:mx-0 rounded-none sm:rounded-xl border-y sm:border border-neutral-800 bg-neutral-900 shadow-xl transition-all duration-200 hover:border-neutral-700/80">
        <div className="px-4 sm:px-6 py-4 border-b border-neutral-800 flex justify-between items-center">
          <span className="text-xs font-semibold text-gray-400">
            Matching Assets: <strong className="text-white text-sm">{filteredAssets.length}</strong>
          </span>
          <span className="text-[11px] text-gray-500 font-medium">
            Click table headers to sort
          </span>
        </div>

        <table className="w-full text-left text-xs text-gray-300 min-w-[650px]">
          <thead className="bg-neutral-950/80 uppercase text-gray-400 border-b border-neutral-800">
            <tr>
              <th className="px-4 sm:px-6 py-3.5 cursor-pointer hover:text-white transition-colors" onClick={() => handleSort("ticker")}>
                Ticker / Name {sortBy === "ticker" && (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th className="px-4 sm:px-6 py-3.5 cursor-pointer hover:text-white transition-colors" onClick={() => handleSort("assetType")}>
                Type {sortBy === "assetType" && (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th className="px-4 sm:px-6 py-3.5 text-right cursor-pointer hover:text-white transition-colors" onClick={() => handleSort("marketCapBillion")}>
                Market Cap {sortBy === "marketCapBillion" && (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th className="px-4 sm:px-6 py-3.5 text-right cursor-pointer hover:text-white transition-colors" onClick={() => handleSort("peRatio")}>
                P/E Ratio {sortBy === "peRatio" && (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th className="px-4 sm:px-6 py-3.5 text-right cursor-pointer hover:text-white transition-colors" onClick={() => handleSort("price")}>
                Price ($) {sortBy === "price" && (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th className="px-4 sm:px-6 py-3.5 text-center">10-K Health</th>
              <th className="px-4 sm:px-6 py-3.5 text-center">Bookmark</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800">
            {filteredAssets.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-gray-500 text-sm">
                  No assets match the selected screener criteria. Try clearing filters.
                </td>
              </tr>
            ) : (
              filteredAssets.map((asset) => {
                const isFav = isFavorite(asset.ticker);
                return (
                  <tr key={asset.ticker} className="hover:bg-neutral-800/60 transition-colors">
                    <td className="px-4 sm:px-6 py-3.5">
                      <div className="font-bold text-white text-sm">{asset.ticker}</div>
                      <div className="text-[11px] text-gray-400">{asset.name}</div>
                    </td>
                    <td className="px-4 sm:px-6 py-3.5">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded uppercase font-bold text-[10px] ${
                          asset.assetType === "stock"
                            ? "bg-blue-900/40 text-blue-400 border border-blue-800/50"
                            : "bg-purple-900/40 text-purple-400 border border-purple-800/50"
                        }`}
                      >
                        {asset.assetType}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-3.5 text-right font-medium text-white">
                      ${asset.marketCapBillion >= 1000 ? `${(asset.marketCapBillion / 1000).toFixed(2)}T` : `${asset.marketCapBillion}B`}
                    </td>
                    <td className="px-4 sm:px-6 py-3.5 text-right font-mono text-gray-200 font-semibold">
                      {asset.peRatio.toFixed(1)}x
                    </td>
                    <td className="px-4 sm:px-6 py-3.5 text-right font-medium text-white">
                      ${asset.price.toFixed(2)}
                      <span className={`block text-[10px] ${asset.changePercent >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                        {asset.changePercent >= 0 ? "+" : ""}{asset.changePercent.toFixed(2)}%
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-3.5 text-center">
                      {getHealthBadge(asset.healthStatus)}
                    </td>
                    <td className="px-4 sm:px-6 py-3.5 text-center">
                      <button
                        onClick={() =>
                          toggleFavorite({
                            ticker: asset.ticker,
                            name: asset.name,
                            assetType: asset.assetType,
                          })
                        }
                        className="p-2 rounded text-amber-400 hover:bg-neutral-800 active:scale-90 transition-all"
                        title={isFav ? "Remove Bookmark" : "Add Bookmark"}
                      >
                        <svg
                          className={`w-4 h-4 ${isFav ? "fill-amber-400" : "fill-none stroke-current stroke-2"}`}
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
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
