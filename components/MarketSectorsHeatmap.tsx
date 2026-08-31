"use client";

export interface SectorItem {
  id: string;
  name: string;
  changePct: number;
  weightPct: number;
  topTickers: string[];
}

const SECTOR_DATA: SectorItem[] = [
  { id: "tech", name: "Technology (เทคโนโลยี)", changePct: 2.45, weightPct: 32, topTickers: ["AAPL", "NVDA", "MSFT"] },
  { id: "fin", name: "Financials (การเงิน)", changePct: 0.82, weightPct: 18, topTickers: ["JPM", "BAC", "BRK.B"] },
  { id: "health", name: "Healthcare (การแพทย์)", changePct: -1.15, weightPct: 15, topTickers: ["LLY", "JNJ", "PFE"] },
  { id: "energy", name: "Energy (พลังงาน)", changePct: 1.68, weightPct: 12, topTickers: ["XOM", "CVX", "COP"] },
  { id: "cons", name: "Consumer Disc (สินค้าฟุ่มเฟือย)", changePct: 0.42, weightPct: 13, topTickers: ["AMZN", "TSLA", "NKE"] },
  { id: "ind", name: "Industrials (อุตสาหกรรม)", changePct: -0.64, weightPct: 10, topTickers: ["CAT", "GE", "HON"] },
];

export function MarketSectorsHeatmap() {
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 shadow-xl space-y-4">
      <div className="flex justify-between items-center border-b border-neutral-800 pb-3">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            Market Sectors Heatmap (แผนที่ความร้อนกลุ่มอุตสาหกรรม)
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Dynamic Treemap performance grid across key market sectors.
          </p>
        </div>

        <span className="px-2.5 py-1 text-xs font-mono font-bold rounded bg-neutral-950 text-gray-300 border border-neutral-800">
          REAL-TIME
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {SECTOR_DATA.map((sec) => {
          const isPositive = sec.changePct >= 0;
          return (
            <div
              key={sec.id}
              className={`p-4 rounded-xl border flex flex-col justify-between transition-all duration-200 hover:scale-[1.02] cursor-pointer ${
                isPositive
                  ? "bg-emerald-950/70 border-emerald-800/80 shadow-lg shadow-emerald-950/40"
                  : "bg-rose-950/70 border-rose-800/80 shadow-lg shadow-rose-950/40"
              }`}
            >
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-gray-300 block line-clamp-1">
                  {sec.name}
                </span>
                <span className={`text-lg font-black font-mono block ${isPositive ? "text-emerald-400" : "text-rose-400"}`}>
                  {isPositive ? "+" : ""}{sec.changePct.toFixed(2)}%
                </span>
              </div>

              <div className="mt-3 pt-2 border-t border-neutral-800/60 flex justify-between items-center text-[10px] font-mono text-gray-400">
                <span>Top: {sec.topTickers.slice(0, 2).join(", ")}</span>
                <span>{sec.weightPct}% Wt</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
