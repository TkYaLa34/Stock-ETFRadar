"use client";

import { useState } from "react";
import { getMockMarketDepth } from "@/services/realtimeService";

interface MarketDepthVisualizerProps {
  symbol: string;
}

export function MarketDepthVisualizer({ symbol }: MarketDepthVisualizerProps) {
  const [depthData] = useState(() => getMockMarketDepth(symbol));

  const maxBidVol = Math.max(...depthData.bids.map((b) => b.volume));
  const maxAskVol = Math.max(...depthData.asks.map((a) => a.volume));
  const maxVolume = Math.max(maxBidVol, maxAskVol);

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 shadow-xl space-y-6 font-mono">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4 font-sans">
        <div>
          <div className="flex items-center gap-3">
            <h3 className="text-base font-bold text-white">Order Book & Market Depth Visualizer</h3>
            <span className="px-2 py-0.5 text-xs font-bold rounded bg-blue-950 text-blue-400 border border-blue-800/60 font-mono">
              SPREAD: {depthData.spreadBps} BPS
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Real-time bid/ask order book density and volume balance for <strong className="text-white">{symbol}</strong>.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-gray-400">Order Book Imbalance:</span>
          <span className={`px-2.5 py-1 rounded font-bold ${depthData.imbalancePct > 0 ? "bg-emerald-950 text-emerald-400 border border-emerald-800/60" : "bg-rose-950 text-rose-400 border border-rose-800/60"}`}>
            {depthData.imbalancePct > 0 ? `+${depthData.imbalancePct}% BUY PRESSURE` : `${depthData.imbalancePct}% SELL PRESSURE`}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        {/* Bids (Buyers) */}
        <div className="space-y-3">
          <div className="flex justify-between items-center text-gray-400 font-semibold border-b border-neutral-800 pb-2 font-sans">
            <span className="text-emerald-400">Bids (Buyers)</span>
            <span>Volume / Total</span>
          </div>

          <div className="space-y-1.5">
            {depthData.bids.map((bid, idx) => {
              const barWidth = Math.round((bid.volume / maxVolume) * 100);
              return (
                <div key={idx} className="relative flex justify-between items-center p-2 rounded bg-neutral-950 border border-neutral-800/80 overflow-hidden">
                  <div
                    className="absolute left-0 top-0 bottom-0 bg-emerald-950/60 border-r border-emerald-500/30 transition-all duration-300"
                    style={{ width: `${barWidth}%` }}
                  />
                  <span className="relative font-bold text-emerald-400">${bid.price.toFixed(2)}</span>
                  <div className="relative text-gray-300 flex items-center gap-3">
                    <span>{bid.volume.toLocaleString()}</span>
                    <span className="text-gray-500 text-[10px]">({bid.total.toLocaleString()})</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Asks (Sellers) */}
        <div className="space-y-3">
          <div className="flex justify-between items-center text-gray-400 font-semibold border-b border-neutral-800 pb-2 font-sans">
            <span className="text-rose-400">Asks (Sellers)</span>
            <span>Volume / Total</span>
          </div>

          <div className="space-y-1.5">
            {depthData.asks.map((ask, idx) => {
              const barWidth = Math.round((ask.volume / maxVolume) * 100);
              return (
                <div key={idx} className="relative flex justify-between items-center p-2 rounded bg-neutral-950 border border-neutral-800/80 overflow-hidden">
                  <div
                    className="absolute right-0 top-0 bottom-0 bg-rose-950/60 border-l border-rose-500/30 transition-all duration-300"
                    style={{ width: `${barWidth}%` }}
                  />
                  <span className="relative font-bold text-rose-400">${ask.price.toFixed(2)}</span>
                  <div className="relative text-gray-300 flex items-center gap-3">
                    <span>{ask.volume.toLocaleString()}</span>
                    <span className="text-gray-500 text-[10px]">({ask.total.toLocaleString()})</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
