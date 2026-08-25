"use client";

import { useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export interface PortfolioHolding {
  ticker: string;
  name: string;
  assetType: "stock" | "etf";
  allocationPercent: number;
  avgCost: number;
  currentPrice: number;
  gainPercent: number;
  rsi?: number;
  trendSignal?: "STRONG BUY" | "BULLISH" | "HOLD" | "TAKE PROFIT";
}

const DCA_HOLDINGS: PortfolioHolding[] = [
  {
    ticker: "VOO",
    name: "Vanguard S&P 500 ETF",
    assetType: "etf",
    allocationPercent: 40,
    avgCost: 465.0,
    currentPrice: 512.8,
    gainPercent: 10.28,
  },
  {
    ticker: "SCHD",
    name: "Schwab U.S. Dividend Equity ETF",
    assetType: "etf",
    allocationPercent: 30,
    avgCost: 76.5,
    currentPrice: 82.3,
    gainPercent: 7.58,
  },
  {
    ticker: "AAPL",
    name: "Apple Inc.",
    assetType: "stock",
    allocationPercent: 15,
    avgCost: 195.0,
    currentPrice: 224.23,
    gainPercent: 14.99,
  },
  {
    ticker: "MSFT",
    name: "Microsoft Corporation",
    assetType: "stock",
    allocationPercent: 15,
    avgCost: 380.0,
    currentPrice: 421.4,
    gainPercent: 10.89,
  },
];

const TREND_HOLDINGS: PortfolioHolding[] = [
  {
    ticker: "NVDA",
    name: "NVIDIA Corporation",
    assetType: "stock",
    allocationPercent: 35,
    avgCost: 105.0,
    currentPrice: 128.5,
    gainPercent: 22.38,
    rsi: 68.4,
    trendSignal: "STRONG BUY",
  },
  {
    ticker: "QQQ",
    name: "Invesco QQQ Trust ETF",
    assetType: "etf",
    allocationPercent: 35,
    avgCost: 440.0,
    currentPrice: 480.15,
    gainPercent: 9.12,
    rsi: 61.2,
    trendSignal: "BULLISH",
  },
  {
    ticker: "MSFT",
    name: "Microsoft Corporation",
    assetType: "stock",
    allocationPercent: 30,
    avgCost: 395.0,
    currentPrice: 421.4,
    gainPercent: 6.68,
    rsi: 58.7,
    trendSignal: "HOLD",
  },
];

const DCA_PERFORMANCE = [
  { month: "Jan", portfolioVal: 10000, benchmarkVal: 10000 },
  { month: "Feb", portfolioVal: 10350, benchmarkVal: 10200 },
  { month: "Mar", portfolioVal: 10800, benchmarkVal: 10500 },
  { month: "Apr", portfolioVal: 10650, benchmarkVal: 10400 },
  { month: "May", portfolioVal: 11200, benchmarkVal: 10850 },
  { month: "Jun", portfolioVal: 11850, benchmarkVal: 11300 },
];

const TREND_PERFORMANCE = [
  { month: "Jan", portfolioVal: 10000, benchmarkVal: 10000 },
  { month: "Feb", portfolioVal: 10600, benchmarkVal: 10200 },
  { month: "Mar", portfolioVal: 11450, benchmarkVal: 10500 },
  { month: "Apr", portfolioVal: 11100, benchmarkVal: 10400 },
  { month: "May", portfolioVal: 12300, benchmarkVal: 10850 },
  { month: "Jun", portfolioVal: 13400, benchmarkVal: 11300 },
];

export function ModelPortfolios() {
  const [activeStrategy, setActiveDropdown] = useState<"dca" | "trend">("dca");

  const currentHoldings = activeStrategy === "dca" ? DCA_HOLDINGS : TREND_HOLDINGS;
  const currentChartData = activeStrategy === "dca" ? DCA_PERFORMANCE : TREND_PERFORMANCE;

  return (
    <div className="space-y-8">
      {/* Strategy Header & Selector */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-wide">
                AI Model Portfolios / พอร์ตจำลอง AI
              </h2>
              <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase rounded-full bg-blue-950 text-blue-400 border border-blue-800/60">
                AI Insights Active
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select an automated model strategy to review allocation targets, technical signals, and AI risk analysis.
            </p>
          </div>

          {/* Strategy Tabs */}
          <div className="flex p-1 bg-neutral-950 rounded-xl border border-neutral-800 self-start md:self-auto">
            <button
              onClick={() => setActiveDropdown("dca")}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                activeStrategy === "dca"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              1. DCA / Accumulation (สายทยอยสะสม)
            </button>
            <button
              onClick={() => setActiveDropdown("trend")}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                activeStrategy === "trend"
                  ? "bg-purple-600 text-white shadow-md shadow-purple-500/20"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              2. Trend Following (พอร์ตโมเมนตัม)
            </button>
          </div>
        </div>

        {/* AI Strategy Analysis Banner */}
        <div className="p-5 rounded-xl bg-neutral-950/80 border border-neutral-800 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <h3 className="text-sm font-bold text-white tracking-wide">
              {activeStrategy === "dca"
                ? "AI Analysis: DCA / Accumulation Strategy (พอร์ตสายทยอยสะสม)"
                : "AI Analysis: Trend Following Strategy (พอร์ต Trend Following)"}
            </h3>
          </div>

          <p className="text-xs text-gray-300 leading-relaxed">
            {activeStrategy === "dca"
              ? "การวิเคราะห์โดย AI: พอร์ตนี้ออกแบบสำหรับการลงทุนระยะยาว โดยเน้นการกระจายความเสี่ยงใน Broad Market ETF (VOO) และ ETF ปันผลสูง (SCHD) ควบคู่กับหุ้น Tech ชั้นนำ (AAPL, MSFT) ช่วยลด volatility และสร้างกระแสเงินสดปันผลอย่างสม่ำเสมอในทุกสภาวะตลาด"
              : "การวิเคราะห์โดย AI: พอร์ตนี้เน้นจับจังหวะโมเมนตัมขาขึ้นในหุ้นที่มี RSI > 50 และยืนเหนือเส้นค่าเฉลี่ย MA20/MA50 อย่างแข็งแกร่ง (NVDA, QQQ) มีการตั้ง Stop-Loss อัตโนมัติที่ระดับ -5% เพื่อจำกัดความเสี่ยง drawdown"}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3 rounded-lg bg-neutral-900 border border-neutral-800">
              <span className="text-[11px] text-gray-400 block">Strategy Risk Rating</span>
              <span className={`text-xs font-bold ${activeStrategy === "dca" ? "text-emerald-400" : "text-amber-400"}`}>
                {activeStrategy === "dca" ? "Low to Moderate Risk" : "Moderate to High Risk"}
              </span>
            </div>
            <div className="p-3 rounded-lg bg-neutral-900 border border-neutral-800">
              <span className="text-[11px] text-gray-400 block">Recommended Rebalancing</span>
              <span className="text-xs font-bold text-blue-400">
                {activeStrategy === "dca" ? "Quarterly / Annual" : "Monthly / Bi-weekly"}
              </span>
            </div>
            <div className="p-3 rounded-lg bg-neutral-900 border border-neutral-800">
              <span className="text-[11px] text-gray-400 block">Est. 6M Total Return</span>
              <span className="text-xs font-bold text-emerald-400">
                {activeStrategy === "dca" ? "+18.5%" : "+34.0%"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Chart & Allocation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Performance Chart Card */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 shadow-xl space-y-4">
          <div className="flex justify-between items-center border-b border-neutral-800 pb-3">
            <h3 className="text-base font-bold text-white">Simulated 6M Return vs S&P 500</h3>
            <span className="text-xs font-semibold text-gray-400">Initial $10,000</span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={currentChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
                <XAxis dataKey="month" stroke="#737373" tick={{ fontSize: 11 }} tickLine={false} />
                <YAxis stroke="#737373" tick={{ fontSize: 11 }} tickLine={false} tickFormatter={(v) => `$${v}`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#171717",
                    borderColor: "#404040",
                    borderRadius: "0.5rem",
                    color: "#f5f5f5",
                    fontSize: "12px",
                  }}
                  formatter={(val: any) => [`$${Number(val).toLocaleString()}`, "Value"]}
                />
                <Line
                  type="monotone"
                  dataKey="portfolioVal"
                  name="Model Portfolio"
                  stroke={activeStrategy === "dca" ? "#3b82f6" : "#a855f7"}
                  strokeWidth={2.5}
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="benchmarkVal"
                  name="S&P 500 Index"
                  stroke="#737373"
                  strokeWidth={1.5}
                  strokeDasharray="4 4"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Portfolio Holdings Breakdown Table */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 shadow-xl space-y-4">
          <div className="flex justify-between items-center border-b border-neutral-800 pb-3">
            <h3 className="text-base font-bold text-white">Holdings & Target Allocation</h3>
            <span className="text-xs text-gray-400">{currentHoldings.length} Assets</span>
          </div>

          <div className="overflow-x-auto rounded-lg border border-neutral-800 bg-neutral-950">
            <table className="w-full text-left text-xs text-gray-300 min-w-[450px]">
              <thead className="bg-neutral-900/80 uppercase text-gray-400 border-b border-neutral-800">
                <tr>
                  <th className="px-4 py-3">Ticker / Asset</th>
                  <th className="px-4 py-3 text-right">Target %</th>
                  <th className="px-4 py-3 text-right">Price ($)</th>
                  <th className="px-4 py-3 text-right">Gain %</th>
                  {activeStrategy === "trend" && <th className="px-4 py-3 text-center">AI Signal</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {currentHoldings.map((h) => (
                  <tr key={h.ticker} className="hover:bg-neutral-900/60 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-bold text-white text-sm">{h.ticker}</div>
                      <div className="text-[11px] text-gray-400">{h.name}</div>
                    </td>
                    <td className="px-4 py-3 text-right font-mono font-bold text-blue-400">
                      {h.allocationPercent}%
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-white">
                      ${h.currentPrice.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-emerald-400">
                      +{h.gainPercent.toFixed(2)}%
                    </td>
                    {activeStrategy === "trend" && (
                      <td className="px-4 py-3 text-center">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-950 text-purple-300 border border-purple-800/60">
                          {h.trendSignal}
                        </span>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
