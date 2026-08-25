"use client";

import { useState, useEffect } from "react";
import { type NewsItem } from "@/app/api/news/route";

export function FinancialNewsCard() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      setIsLoading(true);
      try {
        const res = await fetch("/api/news?category=general");
        if (res.ok) {
          const data = await res.json();
          if (data.news) {
            setNews(data.news);
          }
        }
      } catch (err) {
        console.error("Error fetching financial news:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchNews();
  }, []);

  const formatTimeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return "Just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 shadow-xl space-y-6 transition-all duration-200 hover:border-neutral-700/80">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
        <div className="flex items-center gap-2">
          <svg
            className="w-5 h-5 text-blue-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
            />
          </svg>
          <h3 className="text-lg font-bold text-white tracking-wide">
            Live Market News
          </h3>
        </div>
        <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-blue-950 text-blue-400 border border-blue-800/50 shadow-sm">
          Live Feed
        </span>
      </div>

      {isLoading ? (
        <div className="space-y-4 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="p-3 rounded-lg bg-neutral-950/60 border border-neutral-800/50 space-y-2"
            >
              <div className="h-4 bg-neutral-800/80 rounded w-3/4" />
              <div className="h-3 bg-neutral-800/50 rounded w-full" />
              <div className="h-3 bg-neutral-800/40 rounded w-1/4" />
            </div>
          ))}
        </div>
      ) : news.length === 0 ? (
        <p className="text-center py-8 text-xs text-gray-500">
          No recent financial news available.
        </p>
      ) : (
        <div className="space-y-3">
          {news.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-3.5 rounded-lg bg-neutral-950 border border-neutral-800/80 hover:border-neutral-700 hover:bg-neutral-800/40 transition-all duration-150 group"
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="px-2 py-0.2 text-[10px] uppercase font-bold rounded bg-neutral-800 text-gray-300 border border-neutral-700">
                  {item.source}
                </span>
                <span className="text-[11px] text-gray-500 font-mono">
                  {formatTimeAgo(item.datetime)}
                </span>
              </div>
              <h4 className="text-xs sm:text-sm font-semibold text-gray-100 group-hover:text-blue-400 transition-colors line-clamp-2">
                {item.headline}
              </h4>
              {item.summary && (
                <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                  {item.summary}
                </p>
              )}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
