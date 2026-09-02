"use client";

import { useState } from "react";

export interface MarketTrendItem {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  sparkline: number[];
}

const DEFAULT_TRENDS: MarketTrendItem[] = [
  {
    symbol: "S&P 500",
    name: "SPY",
    price: 542.15,
    change: +6.82,
    changePercent: +1.27,
    sparkline: [535, 537, 536, 539, 540, 542.15],
  },
  {
    symbol: "Nasdaq 100",
    name: "QQQ",
    price: 478.4,
    change: +8.95,
    changePercent: +1.91,
    sparkline: [468, 470, 471, 475, 474, 478.4],
  },
  {
    symbol: "Dow Jones",
    name: "DIA",
    price: 408.9,
    change: -1.12,
    changePercent: -0.27,
    sparkline: [411, 410, 409, 410, 408, 408.9],
  },
  {
    symbol: "NVIDIA",
    name: "NVDA",
    price: 128.5,
    change: +4.3,
    changePercent: +3.46,
    sparkline: [122, 123, 125, 124, 126, 128.5],
  },
];

interface TopMarketBarProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export function TopMarketBar({
  activeTab: externalTab,
  onTabChange,
}: TopMarketBarProps) {
  const [internalTab, setInternalTab] = useState<string>("หน้าหลัก");
  const activeTab = externalTab ?? internalTab;

  const handleSelectTab = (tab: string) => {
    setInternalTab(tab);
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  return (
    <div className="space-y-4">
      {/* Top Tab Switcher */}
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
        <div className="inline-flex bg-neutral-900 p-1 rounded-xl border border-neutral-800 shadow-inner">
          <button
            onClick={() => handleSelectTab("หน้าหลัก")}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-150 ${
              activeTab === "หน้าหลัก"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                : "text-gray-400 hover:text-white hover:bg-neutral-800/60"
            }`}
          >
            หน้าหลัก
          </button>
          <button
            onClick={() => handleSelectTab("ตลาดหุ้น")}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-150 ${
              activeTab === "ตลาดหุ้น"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                : "text-gray-400 hover:text-white hover:bg-neutral-800/60"
            }`}
          >
            ตลาดหุ้น
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-[11px] font-medium text-emerald-400 hidden sm:inline-block">
            ตลาดเปิด (Live Data)
          </span>
        </div>
      </div>

      {/* Mini Market Trend Preview Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {DEFAULT_TRENDS.map((item) => {
          const isPositive = item.change >= 0;
          return (
            <div
              key={item.symbol}
              className="bg-neutral-900/90 border border-neutral-800/90 rounded-xl p-3 shadow-md hover:border-neutral-700 transition-all group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-extrabold text-white block">
                    {item.symbol}
                  </span>
                  <span className="text-[10px] text-gray-400 block font-mono">
                    {item.name}
                  </span>
                </div>
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                    isPositive
                      ? "bg-emerald-950 text-emerald-400 border border-emerald-800/50"
                      : "bg-red-950 text-red-400 border border-red-800/50"
                  }`}
                >
                  {isPositive ? "+" : ""}
                  {item.changePercent.toFixed(2)}%
                </span>
              </div>

              <div className="mt-2.5 flex items-baseline justify-between">
                <span className="text-base font-extrabold text-white font-mono">
                  ${item.price.toFixed(2)}
                </span>
                <span
                  className={`text-[11px] font-semibold ${
                    isPositive ? "text-emerald-400" : "text-red-400"
                  }`}
                >
                  {isPositive ? "▲" : "▼"} {Math.abs(item.change).toFixed(2)}
                </span>
              </div>

              {/* Mini Sparkline Visualization */}
              <div className="mt-2 h-6 flex items-end gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                {item.sparkline.map((val, idx) => {
                  const min = Math.min(...item.sparkline);
                  const max = Math.max(...item.sparkline);
                  const range = max - min || 1;
                  const heightPercent = Math.max(
                    15,
                    Math.round(((val - min) / range) * 100)
                  );
                  return (
                    <div
                      key={idx}
                      className={`flex-1 rounded-t-sm transition-all ${
                        isPositive ? "bg-emerald-500/60" : "bg-red-500/60"
                      }`}
                      style={{ height: `${heightPercent}%` }}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
