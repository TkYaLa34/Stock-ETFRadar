"use client";

import { useState } from "react";
import { getMockLiveNews } from "@/services/realtimeService";
import { LiveSentimentNews } from "@/types/realtime";

export function LiveNewsSentimentStream() {
  const [newsFeed] = useState<LiveSentimentNews[]>(() => getMockLiveNews());

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 shadow-xl space-y-6">
      <div className="flex justify-between items-center border-b border-neutral-800 pb-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
            Live AI Sentiment & Breaking News Stream
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            Real-time sentiment scoring and portfolio impact evaluation powered by NLP AI models.
          </p>
        </div>

        <span className="px-2.5 py-1 text-xs font-mono font-bold rounded bg-purple-950 text-purple-400 border border-purple-800/60 uppercase">
          LIVE AI STREAM
        </span>
      </div>

      <div className="space-y-3">
        {newsFeed.map((news) => {
          const isBullish = news.sentiment === "Bullish";
          const isBearish = news.sentiment === "Bearish";

          return (
            <div
              key={news.id}
              className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-3 hover:border-neutral-700 transition-all"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 font-bold rounded bg-neutral-900 text-white border border-neutral-800">
                    {news.symbol}
                  </span>
                  <span className="text-gray-400 font-mono text-[11px]">{news.source}</span>
                  <span className="text-gray-500 text-[10px]">
                    {new Date(news.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>

                <div className="flex items-center gap-2 font-mono text-[11px]">
                  <span
                    className={`px-2 py-0.5 rounded font-bold ${
                      isBullish
                        ? "bg-emerald-950 text-emerald-400 border border-emerald-800/60"
                        : isBearish
                        ? "bg-rose-950 text-rose-400 border border-rose-800/60"
                        : "bg-neutral-900 text-gray-300 border border-neutral-800"
                    }`}
                  >
                    AI Sentiment: {news.sentiment} ({news.sentimentScore > 0 ? `+${news.sentimentScore}` : news.sentimentScore})
                  </span>
                  <span className="px-1.5 py-0.5 bg-neutral-900 text-gray-400 rounded border border-neutral-800">
                    Impact: {news.impactLevel}
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm font-semibold text-gray-200 leading-relaxed">
                {news.headline}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
