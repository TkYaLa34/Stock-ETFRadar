"use client";

import { useState } from "react";

export function AverageCostCalculator() {
  const [assetType, setAssetType] = useState<"stock" | "etf">("stock");
  const [ticker, setTicker] = useState<string>("AAPL");
  const [initialQty, setInternalInitialQty] = useState<number>(100);
  const [initialAvgPrice, setInitialAvgPrice] = useState<number>(150);
  const [addQty, setAddQty] = useState<number>(50);
  const [addPrice, setAddPrice] = useState<number>(180);

  const initialTotalCost = (Number(initialQty) || 0) * (Number(initialAvgPrice) || 0);
  const addTotalCost = (Number(addQty) || 0) * (Number(addPrice) || 0);

  const totalQty = (Number(initialQty) || 0) + (Number(addQty) || 0);
  const totalCost = initialTotalCost + addTotalCost;
  const newAvgPrice = totalQty > 0 ? totalCost / totalQty : 0;

  const costDifference = newAvgPrice - (Number(initialAvgPrice) || 0);
  const costDiffPercent =
    Number(initialAvgPrice) > 0 ? (costDifference / Number(initialAvgPrice)) * 100 : 0;

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-5 transition-all duration-200 hover:border-neutral-700/80">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-extrabold text-white tracking-wide">
              Average Cost & DCA Calculator
            </h3>
            <span className="px-2.5 py-0.5 text-[10px] font-extrabold rounded-full bg-blue-950 text-blue-400 border border-blue-800/60 uppercase">
              เครื่องมือคำนวณต้นทุนเฉลี่ย
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            คำนวณต้นทุนเฉลี่ยใหม่และมูลค่าพอร์ตรวมเมื่อทำการซื้อถัวเฉลี่ยหุ้นหรือ ETF เพิ่มเติม
          </p>
        </div>

        {/* Asset Type Selector */}
        <div className="flex items-center gap-1 bg-neutral-950 p-1 rounded-xl border border-neutral-800 self-start sm:self-auto">
          <button
            onClick={() => setAssetType("stock")}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
              assetType === "stock"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                : "text-gray-400 hover:text-white"
            }`}
          >
            หุ้น (Stock)
          </button>
          <button
            onClick={() => setAssetType("etf")}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
              assetType === "etf"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                : "text-gray-400 hover:text-white"
            }`}
          >
            ETF
          </button>
        </div>
      </div>

      {/* Inputs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-400 mb-1">
            ชื่อ Ticker หุ้น/ETF
          </label>
          <input
            type="text"
            value={ticker}
            onChange={(e) => setTicker(e.target.value.toUpperCase())}
            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-sm text-white font-mono uppercase focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. AAPL / VOO"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-400 mb-1">
            จำนวนเดิม (หุ้น/หน่วย)
          </label>
          <input
            type="number"
            min="0"
            value={initialQty}
            onChange={(e) => setInternalInitialQty(Number(e.target.value))}
            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-400 mb-1">
            ราคาต้นทุนเดิม ($)
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={initialAvgPrice}
            onChange={(e) => setInitialAvgPrice(Number(e.target.value))}
            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-400 mb-1">
            จำนวนที่ต้องการซื้อเพิ่ม
          </label>
          <input
            type="number"
            min="0"
            value={addQty}
            onChange={(e) => setAddQty(Number(e.target.value))}
            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-400 mb-1">
            ราคาซื้อเพิ่มปัจจุบัน ($)
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={addPrice}
            onChange={(e) => setAddPrice(Number(e.target.value))}
            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Real-Time Recalculated Summary Card */}
      <div className="bg-neutral-950/90 border border-neutral-800 rounded-xl p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
        <div>
          <span className="text-xs text-gray-400 font-medium block">จำนวนรวมทั้งหมด</span>
          <span className="text-lg font-extrabold text-white font-mono">
            {totalQty.toLocaleString()} {assetType === "stock" ? "หุ้น" : "หน่วย"}
          </span>
          <span className="text-[10px] text-gray-500 block mt-0.5">
            (เดิม {initialQty.toLocaleString()} + ใหม่ {addQty.toLocaleString()})
          </span>
        </div>

        <div>
          <span className="text-xs text-gray-400 font-medium block">เงินลงทุนสะสมรวม</span>
          <span className="text-lg font-extrabold text-white font-mono">
            ${totalCost.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
          <span className="text-[10px] text-gray-500 block mt-0.5">
            (ซื้อเพิ่มอีก ${addTotalCost.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })})
          </span>
        </div>

        <div>
          <span className="text-xs text-gray-400 font-medium block">ต้นทุนเฉลี่ยใหม่ (New Average)</span>
          <span className="text-xl font-black text-blue-400 font-mono">
            ${newAvgPrice.toFixed(2)}
          </span>
          <span className="text-[10px] text-gray-400 block mt-0.5">
            ราคาเฉลี่ยต่อหน่วยใหม่
          </span>
        </div>

        <div>
          <span className="text-xs text-gray-400 font-medium block">การเปลี่ยนแปลงต้นทุน</span>
          <span
            className={`text-base font-extrabold font-mono ${
              costDifference > 0
                ? "text-amber-400"
                : costDifference < 0
                ? "text-emerald-400"
                : "text-gray-300"
            }`}
          >
            {costDifference > 0 ? "+" : ""}
            ${costDifference.toFixed(2)} ({costDiffPercent > 0 ? "+" : ""}
            {costDiffPercent.toFixed(2)}%)
          </span>
          <span className="text-[10px] text-gray-500 block mt-0.5">
            {costDifference > 0
              ? "ต้นทุนเฉลี่ยขยับขึ้น (Averaging Up)"
              : costDifference < 0
              ? "ต้นทุนเฉลี่ยดิ่งลง (Averaging Down)"
              : "ต้นทุนเท่าเดิม"}
          </span>
        </div>
      </div>
    </div>
  );
}
