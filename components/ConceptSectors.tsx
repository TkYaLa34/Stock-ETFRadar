"use client";

export interface ConceptSector {
  id: string;
  title: string;
  titleTh: string;
  description: string;
  performance: number;
  topHoldings: string[];
  sentiment: "Strong Buy" | "Bullish" | "Neutral" | "High Volatility";
  volume: string;
}

const CONCEPT_SECTORS: ConceptSector[] = [
  {
    id: "buffett",
    title: "Buffett Holdings",
    titleTh: "พอร์ตสไตล์วอร์เรน บัฟเฟตต์",
    description: "เน้นบริษัทปัจจัยพื้นฐานแข็งแกร่ง มีคูเมืองทางธุรกิจ (Moat) และกระแสเงินสดมั่นคง",
    performance: +1.82,
    topHoldings: ["AAPL", "BAC", "AXP", "KO", "CVX"],
    sentiment: "Strong Buy",
    volume: "$4.2B",
  },
  {
    id: "esports",
    title: "E-sports & Gaming",
    titleTh: "เกมมิ่ง & อีสปอร์ต",
    description: "ค่ายเกมยักษ์ใหญ่ผู้พัฒนาคอนโซล และแพลตฟอร์มสตรีมมิ่งมิ่งระดับโลก",
    performance: +2.45,
    topHoldings: ["NVDA", "NTDOY", "EA", "TTWO", "RBLX"],
    sentiment: "Bullish",
    volume: "$2.8B",
  },
  {
    id: "media",
    title: "Media & Entertainment",
    titleTh: "สื่อ & ความบันเทิง",
    description: "ผู้นำสตรีมมิ่งวิดีโอ สื่อมัลติมีเดีย คอนเทนต์สร้างสรรค์ และสวนสนุกระดับโลก",
    performance: -0.85,
    topHoldings: ["NFLX", "DIS", "WBD", "PARA", "CMCSA"],
    sentiment: "Neutral",
    volume: "$1.9B",
  },
  {
    id: "ai_tech",
    title: "AI Tech & Cloud",
    titleTh: "เทคโนโลยี AI & ระบบคลาวด์",
    description: "ชิปประมวลผลปัญญาประดิษฐ์ ศูนย์ข้อมูลขนาดใหญ่ และระบบนิเวศน์ซอฟต์แวร์ AI",
    performance: +3.75,
    topHoldings: ["NVDA", "MSFT", "GOOGL", "AMZN", "AMD", "SMCI"],
    sentiment: "Strong Buy",
    volume: "$8.5B",
  },
];

export function ConceptSectors() {
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 sm:p-6 shadow-xl space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-extrabold text-white tracking-tight">
              Concept & Thematic Sectors
            </h2>
            <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-purple-950 text-purple-400 border border-purple-800/60">
              กลุ่มธีมการลงทุนยอดนิยม
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            ติดตามแนวโน้มกลุ่มหุ้นตามธีมเชิงกลยุทธ์ (Buffett, E-sports, Media, AI Tech)
          </p>
        </div>
      </div>

      {/* Grid of Concept Sector Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {CONCEPT_SECTORS.map((sector) => {
          const isPositive = sector.performance >= 0;

          return (
            <div
              key={sector.id}
              className="bg-neutral-950/80 border border-neutral-800 rounded-xl p-4 flex flex-col justify-between space-y-3 hover:border-neutral-700 transition-all hover:shadow-lg group"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-extrabold text-white group-hover:text-blue-400 transition-colors">
                      {sector.title}
                    </h3>
                    <p className="text-[11px] font-semibold text-gray-400">
                      {sector.titleTh}
                    </p>
                  </div>
                  <span
                    className={`text-xs font-black px-2 py-0.5 rounded-md border ${
                      isPositive
                        ? "bg-emerald-950 text-emerald-400 border-emerald-800/60"
                        : "bg-red-950 text-red-400 border-red-800/60"
                    }`}
                  >
                    {isPositive ? "+" : ""}
                    {sector.performance.toFixed(2)}%
                  </span>
                </div>

                <p className="text-xs text-gray-400 mt-2 line-clamp-2 leading-relaxed">
                  {sector.description}
                </p>
              </div>

              {/* Holdings & Sentiment Badges */}
              <div className="space-y-2.5 pt-2 border-t border-neutral-800/80">
                <div className="flex flex-wrap items-center gap-1">
                  <span className="text-[10px] font-mono text-gray-500 uppercase mr-1">
                    Holdings:
                  </span>
                  {sector.topHoldings.map((ticker) => (
                    <span
                      key={ticker}
                      className="px-1.5 py-0.5 text-[9px] font-mono font-bold rounded bg-neutral-900 text-gray-300 border border-neutral-800"
                    >
                      {ticker}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-gray-500 font-mono">Volume: {sector.volume}</span>
                  <span
                    className={`font-bold px-2 py-0.5 rounded-full ${
                      sector.sentiment === "Strong Buy"
                        ? "bg-emerald-950 text-emerald-300 border border-emerald-800/80"
                        : sector.sentiment === "Bullish"
                        ? "bg-blue-950 text-blue-300 border border-blue-800/80"
                        : "bg-neutral-800 text-gray-300 border border-neutral-700"
                    }`}
                  >
                    {sector.sentiment}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
