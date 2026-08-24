"use client";

import { useState } from "react";
import { calculateNetProfit } from "@/utils/finance";

export function ProfitCalculator() {
  const [buyPrice, setBuyPrice] = useState<number>(100);
  const [sellPrice, setSellPrice] = useState<number>(120);
  const [quantity, setQuantity] = useState<number>(10);
  const [fee, setFee] = useState<number>(5);

  const netProfit = calculateNetProfit({
    buyPrice: Number(buyPrice) || 0,
    sellPrice: Number(sellPrice) || 0,
    quantity: Number(quantity) || 0,
    fee: Number(fee) || 0,
  });

  const totalCost = (Number(buyPrice) || 0) * (Number(quantity) || 0) + (Number(fee) || 0);
  const returnPercentage = totalCost > 0 ? (netProfit / totalCost) * 100 : 0;

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 shadow-xl space-y-4 transition-all duration-200 hover:border-neutral-700/80">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
        <div>
          <h3 className="text-lg font-bold text-white tracking-wide">Trade Profit Calculator</h3>
          <p className="text-xs text-gray-400">
            Estimate potential net profit considering execution fees
          </p>
        </div>
        <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-blue-950 text-blue-400 border border-blue-800/50 shadow-sm">
          Financial Tool
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2">
        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1">
            Buy Price ($)
          </label>
          <input
            type="number"
            value={buyPrice}
            onChange={(e) => setBuyPrice(Number(e.target.value))}
            className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-150"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1">
            Sell Price ($)
          </label>
          <input
            type="number"
            value={sellPrice}
            onChange={(e) => setSellPrice(Number(e.target.value))}
            className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-150"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1">
            Quantity (Shares)
          </label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-150"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1">
            Trading Fee ($)
          </label>
          <input
            type="number"
            value={fee}
            onChange={(e) => setFee(Number(e.target.value))}
            className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-150"
          />
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs text-gray-400">Total Investment Cost: </span>
          <span className="text-sm font-semibold text-gray-200">
            ${totalCost.toFixed(2)}
          </span>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right">
            <span className="text-xs text-gray-400 block">Est. Return</span>
            <span
              className={`text-sm font-bold ${
                returnPercentage >= 0 ? "text-emerald-400" : "text-rose-400"
              }`}
            >
              {returnPercentage >= 0 ? "+" : ""}
              {returnPercentage.toFixed(2)}%
            </span>
          </div>

          <div className="text-right">
            <span className="text-xs text-gray-400 block">Net Profit / Loss</span>
            <span
              className={`text-xl font-black ${
                netProfit >= 0 ? "text-emerald-400" : "text-rose-400"
              }`}
            >
              {netProfit >= 0 ? "+$" : "-$"}
              {Math.abs(netProfit).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
