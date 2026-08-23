"use client";

import { useState, useEffect } from "react";
import {
  fetchAndParseSecFinancials,
  type ParsedFinancials,
  type FinancialHealthStatus,
} from "@/services/secService";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface SecFinancialsCardProps {
  initialCik?: string;
  tickerLabel?: string;
}

export function SecFinancialsCard({
  initialCik = "0000320193",
  tickerLabel = "AAPL",
}: SecFinancialsCardProps) {
  const [cik, setCik] = useState(initialCik);
  const [inputCik, setInputCik] = useState(initialCik);
  const [financials, setFinancials] = useState<ParsedFinancials | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadSecData() {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchAndParseSecFinancials(cik);
        if (!data || data.revenues.length === 0) {
          setError(`No annual revenue data found for CIK ${cik}`);
        } else {
          setFinancials(data);
        }
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load SEC EDGAR financial data"
        );
      } finally {
        setIsLoading(false);
      }
    }
    loadSecData();
  }, [cik]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCik.trim()) {
      setCik(inputCik.trim());
    }
  };

  const chartData =
    financials?.revenues.map((item) => ({
      year: String(item.year),
      revenueBillion: Number((item.val / 1e9).toFixed(2)),
    })).reverse() || [];

  const getBadgeStyle = (status: FinancialHealthStatus) => {
    switch (status) {
      case "strong_growth":
        return "bg-emerald-950 text-emerald-400 border-emerald-800/60 shadow-sm shadow-emerald-900/30";
      case "stable":
        return "bg-amber-950 text-amber-400 border-amber-800/60 shadow-sm shadow-amber-900/30";
      case "decline":
        return "bg-rose-950 text-rose-400 border-rose-800/60 shadow-sm shadow-rose-900/30";
      default:
        return "bg-neutral-800 text-gray-400 border-neutral-700";
    }
  };

  const getBadgeLabel = (status: FinancialHealthStatus) => {
    switch (status) {
      case "strong_growth":
        return "Strong Growth (+5% YoY)";
      case "stable":
        return "Stable Performance";
      case "decline":
        return "Revenue Decline";
      default:
        return "Data Pending";
    }
  };

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 shadow-xl space-y-6 transition-all duration-200 hover:border-neutral-700/80">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-lg font-bold text-white tracking-wide">
              SEC EDGAR Financials
            </h3>
            <span className="px-2 py-0.5 text-xs font-bold rounded bg-blue-950 text-blue-400 border border-blue-800/50">
              Verified 10-K
            </span>

            {/* Financial Health Badge */}
            {financials && !isLoading && (
              <span
                title={financials.healthExplanation}
                className={`px-2.5 py-0.5 text-xs font-bold rounded-full border cursor-help transition-all duration-200 hover:scale-105 ${getBadgeStyle(
                  financials.healthStatus
                )}`}
              >
                {getBadgeLabel(financials.healthStatus)}
              </span>
            )}
          </div>

          <p className="text-xs text-gray-400 mt-1">
            {financials?.entityName ? financials.entityName : `CIK: ${cik}`}{" "}
            {financials?.healthExplanation && (
              <span className="text-gray-500 block sm:inline">
                • {financials.healthExplanation}
              </span>
            )}
          </p>
        </div>

        {/* CIK Search Form */}
        <form onSubmit={handleSearch} className="flex items-center gap-2">
          <input
            type="text"
            value={inputCik}
            onChange={(e) => setInputCik(e.target.value)}
            placeholder="CIK Number (e.g. 0000320193)"
            className="bg-neutral-950 border border-neutral-800 rounded px-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 w-44 transition-all"
          />
          <button
            type="submit"
            className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 active:scale-95 text-xs font-semibold text-gray-200 rounded border border-neutral-700 transition-all duration-150"
          >
            Lookup
          </button>
        </form>
      </div>

      {isLoading ? (
        /* Shimmer Skeleton Loader */
        <div className="space-y-4 animate-pulse">
          <div className="h-64 w-full bg-neutral-950/60 rounded-xl border border-neutral-800/50 p-4 flex items-end justify-between gap-3">
            {[40, 65, 55, 80, 95].map((h, i) => (
              <div
                key={i}
                className="w-full bg-neutral-800/80 rounded-t transition-all"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>

          <div className="h-28 bg-neutral-950/60 rounded-lg border border-neutral-800/50 p-3 space-y-2">
            <div className="h-4 bg-neutral-800/80 rounded w-1/3" />
            <div className="h-3 bg-neutral-800/60 rounded w-full" />
            <div className="h-3 bg-neutral-800/60 rounded w-5/6" />
          </div>
        </div>
      ) : error ? (
        <div className="h-64 flex flex-col items-center justify-center text-center p-4 rounded-lg bg-neutral-950/50 border border-neutral-800">
          <svg
            className="w-8 h-8 text-rose-400 mb-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-sm font-semibold text-gray-300">{error}</p>
          <p className="text-xs text-gray-500 mt-1">
            Ensure the CIK is valid and padded (e.g., Apple is CIK 0000320193).
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#262626"
                  vertical={false}
                />
                <XAxis
                  dataKey="year"
                  stroke="#737373"
                  tick={{ fontSize: 11 }}
                  tickLine={false}
                />
                <YAxis
                  stroke="#737373"
                  tick={{ fontSize: 11 }}
                  tickLine={false}
                  tickFormatter={(val) => `$${val}B`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#171717",
                    borderColor: "#404040",
                    borderRadius: "0.5rem",
                    color: "#f5f5f5",
                    fontSize: "12px",
                  }}
                  formatter={(value: any) => [`$${value} Billion`, "Annual Revenue"]}
                />
                <Bar
                  dataKey="revenueBillion"
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="overflow-x-auto rounded-lg border border-neutral-800 bg-neutral-950">
            <table className="w-full text-left text-xs text-gray-300 min-w-[500px]">
              <thead className="bg-neutral-900/60 uppercase text-gray-400 border-b border-neutral-800">
                <tr>
                  <th className="px-4 py-3">Fiscal Period</th>
                  <th className="px-4 py-3">Form</th>
                  <th className="px-4 py-3 text-right">Revenue ($)</th>
                  <th className="px-4 py-3 text-right">Filing Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {financials?.revenues.map((r, idx) => (
                  <tr key={idx} className="hover:bg-neutral-900/60 transition-colors">
                    <td className="px-4 py-2.5 font-medium text-white">
                      FY {r.year} ({r.period})
                    </td>
                    <td className="px-4 py-2.5">
                      <span className="px-2 py-0.5 rounded bg-blue-900/30 text-blue-400 font-mono">
                        {r.form}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-right font-bold text-emerald-400">
                      ${(r.val / 1e9).toFixed(2)}B
                    </td>
                    <td className="px-4 py-2.5 text-right text-gray-400">
                      {r.filed}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
