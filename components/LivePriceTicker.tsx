"use client";

import { useEffect, useState } from "react";
import { subscribeToPriceTicks } from "@/services/realtimeService";
import { PriceTick } from "@/types/realtime";

export function LivePriceTicker() {
  const [ticks, setTicks] = useState<Record<string, PriceTick>>({
    AAPL: { symbol: "AAPL", price: 224.23, change: 1.85, changePct: 0.83, direction: "up", timestamp: "Just now" },
    NVDA: { symbol: "NVDA", price: 128.50, change: -0.92, changePct: -0.71, direction: "down", timestamp: "Just now" },
    QQQ: { symbol: "QQQ", price: 485.10, change: 3.40, changePct: 0.71, direction: "up", timestamp: "Just now" },
    SPY: { symbol: "SPY", price: 556.20, change: 2.15, changePct: 0.39, direction: "up", timestamp: "Just now" },
  });

  const [lastUpdatedSymbol, setLastUpdatedSymbol] = useState<string | null>(null);

  useEffect(() => {
    const symbols = ["AAPL", "NVDA", "QQQ", "SPY"];
    const unsubscribe = subscribeToPriceTicks(symbols, (newTick) => {
      setTicks((prev) => ({
        ...prev,
        [newTick.symbol]: newTick,
      }));
      setLastUpdatedSymbol(newTick.symbol);

      setTimeout(() => {
        setLastUpdatedSymbol(null);
      }, 1200);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="bg-neutral-900/90 border-b border-neutral-800 py-2.5 px-4 overflow-x-auto text-xs flex items-center gap-6 shadow-inner font-mono">
      <div className="flex items-center gap-2 text-gray-400 font-bold uppercase tracking-wider shrink-0 font-sans">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        Live Streaming Ticker:
      </div>

      <div className="flex items-center gap-6 shrink-0">
        {Object.values(ticks).map((tick) => {
          const isFlashing = lastUpdatedSymbol === tick.symbol;
          const isUp = tick.direction === "up";

          return (
            <div
              key={tick.symbol}
              className={`flex items-center gap-2 px-2.5 py-1 rounded transition-all duration-300 ${
                isFlashing
                  ? isUp
                    ? "bg-emerald-950/80 border border-emerald-500/60 scale-105"
                    : "bg-rose-950/80 border border-rose-500/60 scale-105"
                  : "bg-neutral-950 border border-neutral-800/80"
              }`}
            >
              <span className="font-extrabold text-white font-sans">{tick.symbol}</span>
              <span className="text-gray-200 font-bold">${tick.price.toFixed(2)}</span>
              <span className={`font-semibold ${isUp ? "text-emerald-400" : "text-rose-400"}`}>
                {isUp ? "▲" : "▼"} {tick.changePct > 0 ? `+${tick.changePct}%` : `${tick.changePct}%`}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
