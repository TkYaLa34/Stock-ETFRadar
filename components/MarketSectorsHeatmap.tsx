"use client";

import { useState } from "react";

export interface SectorHeatmapData {
  id: string;
  name: string;
  nameTh: string;
  performance: number; // percentage change e.g. +2.45 or -1.2
  weight: number; // size relative weight (1 to 5)
  topStocks: string[];
}

const SECTOR_DATA: SectorHeatmapData[] = [
  {
    id: "tech",
    name: "Technology",
    nameTh: "เทคโนโลยี",
    performance: +2.85,
    weight: 5,
    topStocks: ["AAPL", "NVDA", "MSFT", "AVGO"],
  },
  {
    id: "fin",
    name: "Financials",
    nameTh: "การเงิน & ธนาคาร",
    performance: +0.92,
    weight: 4,
    topStocks: ["JPM", "BAC", "V", "MA"],
  },
  {
    id: "health",
    name: "Healthcare",
    nameTh: "การแพทย์ & สุขภาพ",
    performance: -0.45,
    weight: 4,
    topStocks: ["LLY", "UNH", "JNJ", "PFE"],
  },
  {
    id: "consumer_disc",
    name: "Consumer Cyclical",
    nameTh: "สินค้าฟุ่มเฟือย",
    performance: +1.64,
    weight: 3,
    topStocks: ["AMZN", "TSLA", "HD", "MCD"],
  },
  {
    id: "comm",
    name: "Communication",
    nameTh: "สื่อสาร & โทรคมนาคม",
    performance: +1.15,
    weight: 3,
    topStocks: ["GOOGL", "META", "NFLX", "TMUS"],
  },
  {
    id: "industrials",
    name: "Industrials",
    nameTh: "อุตสาหกรรม",
    performance: -1.35,
    weight: 3,
    topStocks: ["CAT", "GE", "HON", "LMT"],
  },
  {
    id: "energy",
    name: "Energy",
    nameTh: "พลังงาน",
    performance: -2.65,
    weight: 2,
    topStocks: ["XOM", "CVX", "COP", "SLB"],
  },
  {
    id: "staples",
    name: "Consumer Staples",
    nameTh: "สินค้าจำเป็น",
    performance: +0.25,
    weight: 2,
    topStocks: ["PG", "KO", "PEP", "WMT"],
  },
  {
    id: "realestate",
    name: "Real Estate",
    nameTh: "อสังหาริมทรัพย์",
    performance: -2.10,
    weight: 2,
    topStocks: ["PLD", "AMT", "EQIX", "SPG"],
  },
  {
    id: "materials",
    name: "Materials",
    nameTh: "วัสดุก่อสร้าง & เคมี",
    performance: -0.80,
    weight: 2,
    topStocks: ["LIN", "APD", "ECL", "SHW"],
  },
  {
    id: "utilities",
    name: "Utilities",
    nameTh: "สาธารณูปโภค",
    performance: +0.55,
    weight: 1,
    topStocks: ["NEE", "DUK", "SO", "AEP"],
  },
];

export function MarketSectorsHeatmap() {
  const [selectedFilter, setSelectedFilter] = useState<"all" | "gainers" | "losers">("all");

  const filteredSectors = SECTOR_DATA.filter((sector) => {
    if (selectedFilter === "gainers") return sector.performance > 0;
    if (selectedFilter === "losers") return sector.performance < 0;
    return true;
  });

  const getColorStyles = (perf: number) => {
    if (perf >= 2.0) {
      return {
        bg: "bg-emerald-950/80 hover:bg-emerald-900/90",
        border: "border-emerald-600/80",
        badgeBg: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
        textColor: "text-emerald-300",
      };
    }
    if (perf > 0) {
      return {
        bg: "bg-emerald-950/40 hover:bg-emerald-900/50",
        border: "border-emerald-800/50",
        badgeBg: "bg-emerald-900/40 text-emerald-400 border-emerald-700/50",
        textColor: "text-emerald-400",
      };
    }
    if (perf <= -2.0) {
      return {
        bg: "bg-red-950/80 hover:bg-red-900/90",
        border: "border-red-600/80",
        badgeBg: "bg-red-500/20 text-red-300 border-red-500/40",
        textColor: "text-red-300",
      };
    }
    return {
      bg: "bg-red-950/40 hover:bg-red-900/50",
      border: "border-red-800/50",
      badgeBg: "bg-red-900/40 text-red-400 border-red-700/50",
      textColor: "text-red-400",
    };
  };

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 sm:p-6 shadow-xl space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-extrabold text-white tracking-tight">
              Market Sectors Heatmap
            </h2>
            <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-blue-950 text-blue-400 border border-blue-800/60">
              แผนที่ความร้อนรายกลุ่มอุตสาหกรรม
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            การปรับตัวขึ้น-ลงของ 11 กลุ่มอุตสาหกรรมหลักแบบเรียลไทม์
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-1.5 bg-neutral-950 p-1 rounded-xl border border-neutral-800 self-start sm:self-auto">
          <button
            onClick={() => setSelectedFilter("all")}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
              selectedFilter === "all"
                ? "bg-neutral-800 text-white shadow-sm"
                : "text-gray-400 hover:text-white"
            }`}
          >
            ทั้งหมด
          </button>
          <button
            onClick={() => setSelectedFilter("gainers")}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
              selectedFilter === "gainers"
                ? "bg-emerald-950 text-emerald-400 border border-emerald-800/60"
                : "text-gray-400 hover:text-emerald-400"
            }`}
          >
            บวก
          </button>
          <button
            onClick={() => setSelectedFilter("losers")}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
              selectedFilter === "losers"
                ? "bg-red-950 text-red-400 border border-red-800/60"
                : "text-gray-400 hover:text-red-400"
            }`}
          >
            ลบ
          </button>
        </div>
      </div>

      {/* Responsive Treemap-style Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {filteredSectors.map((sector) => {
          const styles = getColorStyles(sector.performance);
          const isPositive = sector.performance >= 0;

          // Span 2 columns for heavy sectors on larger screens
          const colSpanClass =
            sector.weight >= 4
              ? "col-span-2 sm:col-span-1 lg:col-span-2"
              : "col-span-1";

          return (
            <div
              key={sector.id}
              className={`${colSpanClass} ${styles.bg} border ${styles.border} rounded-xl p-3.5 transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[105px] shadow-md hover:scale-[1.01]`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-xs sm:text-sm font-extrabold text-white block leading-snug">
                    {sector.name}
                  </span>
                  <span className="text-[10px] text-gray-300 font-medium block">
                    {sector.nameTh}
                  </span>
                </div>
                <span
                  className={`text-xs font-black px-2 py-0.5 rounded-md border ${styles.badgeBg}`}
                >
                  {isPositive ? "+" : ""}
                  {sector.performance.toFixed(2)}%
                </span>
              </div>

              {/* Key Stock Chips */}
              <div className="mt-3 pt-2 border-t border-white/10 flex flex-wrap items-center gap-1">
                <span className="text-[9px] text-gray-400 uppercase font-mono mr-1">
                  Top:
                </span>
                {sector.topStocks.map((ticker) => (
                  <span
                    key={ticker}
                    className="px-1.5 py-0.5 text-[9px] font-mono font-bold rounded bg-neutral-950/60 text-gray-200 border border-neutral-700/60"
                  >
                    {ticker}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend Bar */}
      <div className="pt-2 flex flex-wrap items-center justify-between text-[11px] text-gray-400 gap-2 border-t border-neutral-800">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-300">สเกลสี:</span>
          <div className="flex items-center gap-1 font-mono text-[10px]">
            <span className="w-3 h-3 rounded bg-red-600 inline-block"></span>
            <span>&lt; -2%</span>
            <span className="w-3 h-3 rounded bg-red-950 inline-block border border-red-800 ml-1"></span>
            <span>-2% to 0%</span>
            <span className="w-3 h-3 rounded bg-emerald-950 inline-block border border-emerald-800 ml-1"></span>
            <span>0% to +2%</span>
            <span className="w-3 h-3 rounded bg-emerald-500 inline-block ml-1"></span>
            <span>&gt; +2%</span>
          </div>
        </div>
        <span className="text-[10px] italic text-gray-500">
          อัปเดตอัตโนมัติตามสภาวะตลาดการเงินสหรัฐฯ
        </span>
      </div>
    </div>
  );
}
