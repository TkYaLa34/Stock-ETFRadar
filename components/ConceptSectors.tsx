"use client";

export interface ConceptSector {
  id: string;
  title: string;
  thaiTitle: string;
  avgChangePct: number;
  icon: string;
  topHoldings: string[];
}

const CONCEPT_SECTORS: ConceptSector[] = [
  {
    id: "buffett",
    title: "Buffett Holdings",
    thaiTitle: "หุ้นพอร์ตบัฟเฟตต์",
    avgChangePct: 1.42,
    icon: "🏛️",
    topHoldings: ["AAPL", "AIRC", "OXY", "KO", "BAC"],
  },
  {
    id: "esports",
    title: "E-sports & Gaming",
    thaiTitle: "อีสปอร์ต & เกมมิ่ง",
    avgChangePct: 2.85,
    icon: "🎮",
    topHoldings: ["NVDA", "NTDOY", "EA", "TTWO", "SONY"],
  },
  {
    id: "media",
    title: "Media & Streaming",
    thaiTitle: "สื่อ & สตรีมมิ่ง",
    avgChangePct: -0.85,
    icon: "📺",
    topHoldings: ["NFLX", "DIS", "WBD", "PARA", "SPOT"],
  },
  {
    id: "ai-robotics",
    title: "AI & Next-Gen Tech",
    thaiTitle: "ปัญญาประดิษฐ์ & หุ่นยนต์",
    avgChangePct: 3.12,
    icon: "🤖",
    topHoldings: ["NVDA", "MSFT", "PLTR", "ARM", "TSM"],
  },
];

export function ConceptSectors() {
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 shadow-xl space-y-4">
      <div className="flex justify-between items-center border-b border-neutral-800 pb-3">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <span>🔥</span> Concept Sectors (กลุ่มธีมหุ้นยอดนิยม)
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Thematic sector baskets and price performance action.
          </p>
        </div>

        <span className="px-2.5 py-1 text-xs font-mono font-bold rounded bg-blue-950 text-blue-400 border border-blue-800/60">
          THEMATIC BASKETS
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {CONCEPT_SECTORS.map((c) => {
          const isPos = c.avgChangePct >= 0;
          return (
            <div
              key={c.id}
              className="p-4 bg-neutral-950 border border-neutral-800/90 rounded-xl space-y-3 hover:border-neutral-700 transition-all duration-200 cursor-pointer shadow-md"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{c.icon}</span>
                  <div>
                    <h4 className="text-xs font-bold text-white leading-snug">{c.title}</h4>
                    <span className="text-[11px] text-gray-400 font-sans block">{c.thaiTitle}</span>
                  </div>
                </div>

                <span
                  className={`text-xs font-black font-mono px-2 py-0.5 rounded border ${
                    isPos
                      ? "bg-emerald-950 text-emerald-400 border-emerald-800/60"
                      : "bg-rose-950 text-rose-400 border-rose-800/60"
                  }`}
                >
                  {isPos ? "+" : ""}{c.avgChangePct.toFixed(2)}%
                </span>
              </div>

              <div className="pt-2 border-t border-neutral-900 flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] text-gray-500 font-semibold uppercase">Holdings:</span>
                {c.topHoldings.map((h) => (
                  <span
                    key={h}
                    className="px-1.5 py-0.5 text-[10px] font-bold font-mono bg-neutral-900 text-gray-300 rounded border border-neutral-800"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
