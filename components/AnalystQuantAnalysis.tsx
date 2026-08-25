"use client";

import {
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
} from "recharts";

interface AnalystQuantAnalysisProps {
  symbol: string;
  name?: string;
  currentPrice?: number;
}

export function AnalystQuantAnalysis({
  symbol,
  name = "Apple Inc.",
  currentPrice = 224.23,
}: AnalystQuantAnalysisProps) {
  const ratings = {
    buy: 28,
    hold: 8,
    sell: 2,
    consensus: "STRONG BUY",
    consensusScore: 4.4,
  };
  const totalAnalysts = ratings.buy + ratings.hold + ratings.sell;
  const buyPercent = Math.round((ratings.buy / totalAnalysts) * 100);
  const holdPercent = Math.round((ratings.hold / totalAnalysts) * 100);
  const sellPercent = Math.round((ratings.sell / totalAnalysts) * 100);

  const targetHigh = 265.0;
  const targetAvg = 245.5;
  const targetLow = 195.0;

  const upsideAvg = (((targetAvg - currentPrice) / currentPrice) * 100).toFixed(1);
  const upsideHigh = (((targetHigh - currentPrice) / currentPrice) * 100).toFixed(1);

  const quantData = [
    { dimension: "Value", score: 65, fullMark: 100 },
    { dimension: "Growth", score: 88, fullMark: 100 },
    { dimension: "Profitability", score: 95, fullMark: 100 },
    { dimension: "Momentum", score: 82, fullMark: 100 },
    { dimension: "Technicals", score: 78, fullMark: 100 },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 shadow-xl space-y-6">
          <div className="border-b border-neutral-800 pb-3 flex justify-between items-center">
            <h3 className="text-base font-bold text-white">1. Analyst Consensus</h3>
            <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/60">
              {ratings.consensus}
            </span>
          </div>

          <div className="text-center py-2 space-y-2">
            <div className="text-4xl font-black text-emerald-400">
              {ratings.consensusScore} <span className="text-sm font-normal text-gray-400">/ 5.0</span>
            </div>
            <p className="text-xs text-gray-400">
              Based on <strong className="text-white">{totalAnalysts} Wall Street analysts</strong> coverage
            </p>
          </div>

          <div className="space-y-2">
            <div className="h-3 w-full rounded-full bg-neutral-950 overflow-hidden flex">
              <div className="bg-emerald-500 h-full" style={{ width: `${buyPercent}%` }} title={`Buy: ${buyPercent}%`} />
              <div className="bg-amber-500 h-full" style={{ width: `${holdPercent}%` }} title={`Hold: ${holdPercent}%`} />
              <div className="bg-rose-500 h-full" style={{ width: `${sellPercent}%` }} title={`Sell: ${sellPercent}%`} />
            </div>

            <div className="flex justify-between text-xs pt-1 font-semibold">
              <span className="text-emerald-400">Buy ({ratings.buy})</span>
              <span className="text-amber-400">Hold ({ratings.hold})</span>
              <span className="text-rose-400">Sell ({ratings.sell})</span>
            </div>
          </div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 shadow-xl space-y-6">
          <div className="border-b border-neutral-800 pb-3 flex justify-between items-center">
            <h3 className="text-base font-bold text-white">2. Price Target Forecast</h3>
            <span className="text-xs font-bold text-emerald-400 font-mono">
              +{upsideAvg}% Avg Upside
            </span>
          </div>

          <div className="space-y-4 pt-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-400">Current Price</span>
              <span className="text-base font-bold text-white">${currentPrice.toFixed(2)}</span>
            </div>

            <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800/80 space-y-3">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-rose-400">Low: ${targetLow}</span>
                <span className="text-blue-400 font-bold">Avg: ${targetAvg}</span>
                <span className="text-emerald-400">High: ${targetHigh} (+{upsideHigh}%)</span>
              </div>
              <div className="relative h-2.5 bg-neutral-800 rounded-full overflow-hidden">
                <div className="absolute left-[15%] right-[10%] h-full bg-gradient-to-r from-rose-500 via-blue-500 to-emerald-500 rounded-full" />
              </div>
            </div>

            <p className="text-[11px] text-gray-400 text-center leading-relaxed">
              Consensus 12-month median price target forecast represents a <strong className="text-emerald-400">+{upsideAvg}% upside</strong> from the current market price of ${currentPrice.toFixed(2)}.
            </p>
          </div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 shadow-xl space-y-4">
          <div className="border-b border-neutral-800 pb-3 flex justify-between items-center">
            <h3 className="text-base font-bold text-white">3. Quant Factors Radar</h3>
            <span className="text-xs font-bold text-blue-400">Overall 82/100</span>
          </div>

          <div className="h-56 w-full pt-1">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={quantData} margin={{ top: 10, right: 20, left: 20, bottom: 10 }}>
                <PolarGrid stroke="#333333" />
                <PolarAngleAxis dataKey="dimension" stroke="#a3a3a3" tick={{ fontSize: 10, fill: "#d4d4d4" }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#404040" tick={false} />
                <Radar name={symbol} dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.4} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#171717",
                    borderColor: "#404040",
                    borderRadius: "0.5rem",
                    color: "#f5f5f5",
                    fontSize: "12px",
                  }}
                  formatter={(val: any) => [`${val}/100`, "Quant Score"]}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
