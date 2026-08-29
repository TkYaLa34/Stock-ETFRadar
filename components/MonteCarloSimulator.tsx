"use client";

import { useState } from "react";
import { runMonteCarloSimulation } from "@/services/simulationService";
import { MonteCarloParams } from "@/types/simulation";
import dynamic from "next/dynamic";

const RechartsFanChart = dynamic(
  () =>
    import("recharts").then((mod) => {
      const { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } = mod;
      return function ChartComponent({ data }: { data: any[] }) {
        return (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
              <XAxis dataKey="month" stroke="#737373" tick={{ fontSize: 11, fill: "#a3a3a3" }} tickFormatter={(m) => `M${m}`} />
              <YAxis stroke="#737373" tick={{ fontSize: 11, fill: "#a3a3a3" }} tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#171717",
                  borderColor: "#404040",
                  borderRadius: "0.5rem",
                  color: "#f5f5f5",
                  fontSize: "12px",
                }}
                formatter={(val: any) => [`$${Number(val).toLocaleString()}`, "Valuation"]}
              />
              <Area type="monotone" dataKey="p95" stroke="#10b981" fill="#10b981" fillOpacity={0.15} name="95th %ile (Optimistic)" />
              <Area type="monotone" dataKey="p75" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} name="75th %ile" />
              <Area type="monotone" dataKey="p50" stroke="#a855f7" fill="#a855f7" fillOpacity={0.3} name="50th %ile (Median)" />
              <Area type="monotone" dataKey="p25" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.2} name="25th %ile" />
              <Area type="monotone" dataKey="p5" stroke="#f43f5e" fill="#f43f5e" fillOpacity={0.15} name="5th %ile (Pessimistic)" />
            </AreaChart>
          </ResponsiveContainer>
        );
      };
    }),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full flex items-center justify-center bg-neutral-950/40 rounded-lg text-xs text-gray-500 animate-pulse">
        Running 10,000 statistical price path simulations...
      </div>
    ),
  }
);

export function MonteCarloSimulator() {
  const [params, setParams] = useState<MonteCarloParams>({
    initialPortfolioValue: 100000,
    expectedAnnualReturnPct: 10,
    annualVolatilityPct: 18,
    timeHorizonMonths: 12,
    numSimulations: 10000,
  });

  const simResult = runMonteCarloSimulation(params);

  return (
    <div className="space-y-8 font-sans">
      {/* Top Banner */}
      <div className="p-6 bg-neutral-900 border border-neutral-800 rounded-xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-bold text-white">Monte Carlo Portfolio Risk Simulator</h3>
            <span className="px-2.5 py-0.5 text-xs font-mono font-bold rounded bg-purple-950 text-purple-400 border border-purple-800/60 uppercase">
              10,000 SIMULATIONS
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-1 leading-relaxed">
            Geometric Brownian Motion price path modeling calculating Value at Risk (VaR), CVaR (Expected Shortfall), and drawdown probabilities.
          </p>
        </div>
      </div>

      {/* Simulator Inputs & Key Risk Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Parameter Form Controls */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 shadow-xl space-y-6">
          <div className="border-b border-neutral-800 pb-3">
            <h3 className="text-base font-bold text-white">Simulation Parameters</h3>
            <p className="text-xs text-gray-400 mt-0.5">Adjust expected return, volatility, and horizon</p>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-gray-400 font-semibold mb-1">
                Initial Portfolio Capital ($): <strong className="text-white">${params.initialPortfolioValue.toLocaleString()}</strong>
              </label>
              <input
                type="number"
                value={params.initialPortfolioValue}
                onChange={(e) =>
                  setParams((p) => ({ ...p, initialPortfolioValue: Number(e.target.value) || 10000 }))
                }
                className="w-full bg-neutral-950 border border-neutral-800 text-white font-mono px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-400 font-semibold mb-1">
                Expected Annual Return (%): <strong className="text-emerald-400">+{params.expectedAnnualReturnPct}%</strong>
              </label>
              <input
                type="range"
                min="-10"
                max="40"
                value={params.expectedAnnualReturnPct}
                onChange={(e) =>
                  setParams((p) => ({ ...p, expectedAnnualReturnPct: Number(e.target.value) }))
                }
                className="w-full accent-blue-500 cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-gray-400 font-semibold mb-1">
                Annualized Volatility (%): <strong className="text-purple-400">{params.annualVolatilityPct}%</strong>
              </label>
              <input
                type="range"
                min="5"
                max="60"
                value={params.annualVolatilityPct}
                onChange={(e) =>
                  setParams((p) => ({ ...p, annualVolatilityPct: Number(e.target.value) }))
                }
                className="w-full accent-purple-500 cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-gray-400 font-semibold mb-1">
                Time Horizon (Months): <strong className="text-blue-400">{params.timeHorizonMonths} Months</strong>
              </label>
              <select
                value={params.timeHorizonMonths}
                onChange={(e) => setParams((p) => ({ ...p, timeHorizonMonths: Number(e.target.value) }))}
                className="w-full bg-neutral-950 border border-neutral-800 text-white font-mono px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value={6}>6 Months</option>
                <option value={12}>12 Months (1 Year)</option>
                <option value={24}>24 Months (2 Years)</option>
                <option value={36}>36 Months (3 Years)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right Column: Risk Callout Badges & Fan Chart */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-xl space-y-1">
              <span className="text-[11px] font-semibold text-gray-400">VaR 95% (Value at Risk)</span>
              <div className="text-xl font-bold font-mono text-rose-400">
                {simResult.valueAtRisk95Pct}%
              </div>
              <span className="text-[10px] text-gray-500 block">Max 95% 1-Yr Loss</span>
            </div>

            <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-xl space-y-1">
              <span className="text-[11px] font-semibold text-gray-400">CVaR 95% (Expected Shortfall)</span>
              <div className="text-xl font-bold font-mono text-rose-500">
                {simResult.conditionalVaR95Pct}%
              </div>
              <span className="text-[10px] text-gray-500 block">Average Tail Loss</span>
            </div>

            <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-xl space-y-1">
              <span className="text-[11px] font-semibold text-gray-400">Median Ending Value</span>
              <div className="text-xl font-bold font-mono text-emerald-400">
                ${simResult.endingMedianValue.toLocaleString()}
              </div>
              <span className="text-[10px] text-gray-500 block">50th Percentile</span>
            </div>

            <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-xl space-y-1">
              <span className="text-[11px] font-semibold text-gray-400">Loss Probability</span>
              <div className="text-xl font-bold font-mono text-amber-400">
                {simResult.probabilityOfLossPct}%
              </div>
              <span className="text-[10px] text-gray-500 block">P(Ending &lt; Initial)</span>
            </div>
          </div>

          {/* Simulation Fan Chart */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 shadow-xl space-y-4">
            <div className="flex justify-between items-center border-b border-neutral-800 pb-3 text-xs">
              <span className="font-bold text-white">Projected Portfolio Valuation Bands ($)</span>
              <span className="font-mono text-gray-400">Percentile Range: 5th - 95th</span>
            </div>

            <div className="h-72 w-full pt-2">
              <RechartsFanChart data={simResult.pathsHistory} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
