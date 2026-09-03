"use client";

import { useState } from "react";

export function AssetAllocationRebalancer() {
  const [stockAllocation, setStockAllocation] = useState<number>(70);
  const [portfolioValue, setPortfolioValue] = useState<number>(100000);

  const etfAllocation = 100 - stockAllocation;
  const currentStockVal = (portfolioValue * stockAllocation) / 100;
  const currentEtfVal = (portfolioValue * etfAllocation) / 100;

  // Target split (e.g. 60/40)
  const [targetStockPct, setTargetStockPct] = useState<number>(60);
  const targetEtfPct = 100 - targetStockPct;

  const targetStockVal = (portfolioValue * targetStockPct) / 100;
  const targetEtfVal = (portfolioValue * targetEtfPct) / 100;

  const stockRebalanceDiff = targetStockVal - currentStockVal;
  const etfRebalanceDiff = targetEtfVal - currentEtfVal;

  // Risk profile calculation
  const getRiskProfile = (pct: number) => {
    if (pct >= 80) {
      return {
        level: "High Risk (เสี่ยงสูงมาก)",
        color: "text-red-400 bg-red-950/80 border-red-800/80",
        expectedReturn: "12.5% - 15.0%",
        maxDrawdown: "-25% ถึง -35%",
        badge: "Aggressive Growth",
      };
    }
    if (pct >= 50) {
      return {
        level: "Moderate Risk (เสี่ยงปานกลาง)",
        color: "text-amber-400 bg-amber-950/80 border-amber-800/80",
        expectedReturn: "8.5% - 11.0%",
        maxDrawdown: "-15% ถึง -22%",
        badge: "Balanced Growth",
      };
    }
    return {
      level: "Conservative (เสี่ยงต่ำ/ตั้งรับ)",
      color: "text-emerald-400 bg-emerald-950/80 border-emerald-800/80",
      expectedReturn: "5.0% - 7.5%",
      maxDrawdown: "-8% ถึง -12%",
      badge: "Capital Preservation",
    };
  };

  const currentRisk = getRiskProfile(stockAllocation);

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-6">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-extrabold text-white tracking-wide">
              Asset Allocation & Rebalancing Simulator
            </h3>
            <span className="px-2.5 py-0.5 text-[10px] font-extrabold rounded-full bg-purple-950 text-purple-400 border border-purple-800/60 uppercase">
              เครื่องมือจำลองจัดสัดส่วนพอร์ต
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            ปรับสัดส่วนการลงทุนระหว่างหุ้นและ ETF ประเมินระดับความเสี่ยง และคำนวณเงิน Rebalance สู่เป้าหมาย
          </p>
        </div>

        <div className={`px-3 py-1.5 rounded-xl border text-xs font-bold ${currentRisk.color} flex items-center gap-2 self-start sm:self-auto`}>
          <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
          <span>{currentRisk.badge} ({currentRisk.level})</span>
        </div>
      </div>

      {/* Main Sliders and Portfolio Value Input */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Col: Allocation Controls */}
        <div className="space-y-4 bg-neutral-950/70 border border-neutral-800/80 rounded-xl p-4">
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">
              มูลค่าพอร์ตการลงทุนรวม ($)
            </label>
            <input
              type="number"
              value={portfolioValue}
              onChange={(e) => setPortfolioValue(Number(e.target.value) || 0)}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <div className="flex justify-between items-center text-xs font-bold mb-2">
              <span className="text-blue-400">สัดส่วนหุ้น (Stocks): {stockAllocation}%</span>
              <span className="text-purple-400">สัดส่วน ETF: {etfAllocation}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={stockAllocation}
              onChange={(e) => setStockAllocation(Number(e.target.value))}
              className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <div className="flex justify-between text-[10px] text-gray-500 mt-1 font-mono">
              <span>0% Stocks</span>
              <span>50% Balanced</span>
              <span>100% Stocks</span>
            </div>
          </div>

          {/* Visual Ratio Bar */}
          <div className="pt-2">
            <span className="text-[11px] text-gray-400 block mb-1.5 font-medium">แถบแสดงสัดส่วนปัจจุบัน</span>
            <div className="w-full h-4 rounded-full overflow-hidden flex bg-neutral-800 p-0.5 border border-neutral-700/60">
              <div
                className="bg-blue-600 h-full rounded-l-full transition-all duration-300 flex items-center justify-center text-[9px] font-bold text-white font-mono"
                style={{ width: `${stockAllocation}%` }}
              >
                {stockAllocation > 15 ? `${stockAllocation}%` : ""}
              </div>
              <div
                className="bg-purple-600 h-full rounded-r-full transition-all duration-300 flex items-center justify-center text-[9px] font-bold text-white font-mono"
                style={{ width: `${etfAllocation}%` }}
              >
                {etfAllocation > 15 ? `${etfAllocation}%` : ""}
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Projected Risk-Return Profile */}
        <div className="bg-neutral-950/70 border border-neutral-800/80 rounded-xl p-4 flex flex-col justify-between space-y-3">
          <div>
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider mb-2">
              ประเมินอัตราผลตอบแทนและความเสี่ยง (Risk & Return Projection)
            </h4>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="bg-neutral-900 border border-neutral-800/80 p-3 rounded-lg">
                <span className="text-[10px] text-gray-400 block">คาดการณ์ผลตอบแทน/ปี</span>
                <span className="text-base font-extrabold text-emerald-400 font-mono">
                  {currentRisk.expectedReturn}
                </span>
              </div>
              <div className="bg-neutral-900 border border-neutral-800/80 p-3 rounded-lg">
                <span className="text-[10px] text-gray-400 block">โอกาสขาดทุนสูงสุด (Max DD)</span>
                <span className="text-base font-extrabold text-rose-400 font-mono">
                  {currentRisk.maxDrawdown}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-neutral-800 text-xs">
            <div className="flex justify-between text-gray-300">
              <span>มูลค่าหุ้นปัจจุบัน (Current Stocks):</span>
              <span className="font-mono font-bold text-white">${currentStockVal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>มูลค่า ETF ปัจจุบัน (Current ETFs):</span>
              <span className="font-mono font-bold text-white">${currentEtfVal.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Rebalancing Suggestion Card */}
      <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-4 sm:p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-800/80 pb-3">
          <div>
            <h4 className="text-sm font-extrabold text-white">
              คำแนะนำปรับสมดุลพอร์ต (Rebalancing Suggestion)
            </h4>
            <p className="text-xs text-gray-400">
              เปรียบเทียบสัดส่วนปัจจุบันกับเป้าหมายที่ต้องการเพื่อคำนวณการปรับพอร์ต
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-gray-400">เป้าหมาย Stocks:</span>
            <input
              type="number"
              min="0"
              max="100"
              value={targetStockPct}
              onChange={(e) => setTargetStockPct(Number(e.target.value))}
              className="w-16 bg-neutral-900 border border-neutral-800 rounded px-2 py-1 text-white font-mono text-center focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <span className="text-gray-400">%</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          {/* Stocks Action */}
          <div className="p-3.5 rounded-lg bg-neutral-900/90 border border-neutral-800 flex items-center justify-between">
            <div>
              <span className="font-bold text-white block">สัดส่วนหุ้น (Stocks Target {targetStockPct}%)</span>
              <span className="text-[10px] text-gray-400 font-mono">
                เป้าหมาย ${targetStockVal.toLocaleString()} (ปัจจุบัน ${currentStockVal.toLocaleString()})
              </span>
            </div>
            <span
              className={`font-mono font-bold px-2.5 py-1 rounded-md text-xs ${
                stockRebalanceDiff > 0
                  ? "bg-emerald-950 text-emerald-400 border border-emerald-800/80"
                  : stockRebalanceDiff < 0
                  ? "bg-rose-950 text-rose-400 border border-rose-800/80"
                  : "bg-neutral-800 text-gray-300"
              }`}
            >
              {stockRebalanceDiff > 0
                ? `+ $${stockRebalanceDiff.toLocaleString()} (ซื้อเพิ่ม)`
                : stockRebalanceDiff < 0
                ? `- $${Math.abs(stockRebalanceDiff).toLocaleString()} (ขายออก)`
                : "สมดุลแล้ว"}
            </span>
          </div>

          {/* ETFs Action */}
          <div className="p-3.5 rounded-lg bg-neutral-900/90 border border-neutral-800 flex items-center justify-between">
            <div>
              <span className="font-bold text-white block">สัดส่วน ETF (ETFs Target {targetEtfPct}%)</span>
              <span className="text-[10px] text-gray-400 font-mono">
                เป้าหมาย ${targetEtfVal.toLocaleString()} (ปัจจุบัน ${currentEtfVal.toLocaleString()})
              </span>
            </div>
            <span
              className={`font-mono font-bold px-2.5 py-1 rounded-md text-xs ${
                etfRebalanceDiff > 0
                  ? "bg-emerald-950 text-emerald-400 border border-emerald-800/80"
                  : etfRebalanceDiff < 0
                  ? "bg-rose-950 text-rose-400 border border-rose-800/80"
                  : "bg-neutral-800 text-gray-300"
              }`}
            >
              {etfRebalanceDiff > 0
                ? `+ $${etfRebalanceDiff.toLocaleString()} (ซื้อเพิ่ม)`
                : etfRebalanceDiff < 0
                ? `- $${Math.abs(etfRebalanceDiff).toLocaleString()} (ขายออก)`
                : "สมดุลแล้ว"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
