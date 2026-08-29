"use client";

import { useState } from "react";
import {
  MOCK_MICROSTRUCTURE_DATA,
  runMultiSessionBacktest,
  evaluatePortfolioHealth,
  calculateExecutionCosts,
} from "@/services/backtestService";
import { BacktestStrategyType } from "@/types/backtest";
import { LivePriceTicker } from "@/components/LivePriceTicker";
import { LiveNewsSentimentStream } from "@/components/LiveNewsSentimentStream";
import { getMockEmergencyAlerts } from "@/services/realtimeService";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

export function AIPortfolioAnalyst() {
  const [selectedStrategy, setSelectedStrategy] = useState<BacktestStrategyType>("cross_session");
  const [tradeSize, setTradeSize] = useState<number>(10000);
  const [selectedAssetSymbol, setSelectedAssetSymbol] = useState<string>("AAPL");

  const health = evaluatePortfolioHealth();
  const emergencyAlerts = getMockEmergencyAlerts();
  const backtestResults = runMultiSessionBacktest(100000, tradeSize);
  const selectedResult = backtestResults[selectedStrategy];

  const currentMeta = MOCK_MICROSTRUCTURE_DATA[selectedAssetSymbol] || MOCK_MICROSTRUCTURE_DATA.AAPL;
  const executionCost = calculateExecutionCosts(tradeSize, currentMeta);

  return (
    <div className="space-y-8">
      {/* Live Price Ticker Banner */}
      <div className="rounded-xl overflow-hidden border border-neutral-800">
        <LivePriceTicker />
      </div>

      {/* Emergency Volatility & Margin Risk Stream */}
      <div className="p-4 bg-rose-950/40 border border-rose-900/60 rounded-xl space-y-3">
        <div className="flex justify-between items-center text-xs border-b border-rose-900/40 pb-2">
          <span className="font-bold text-rose-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            LIVE EMERGENCY RISK & MARGIN MONITOR
          </span>
          <span className="font-mono text-rose-300 font-semibold">{emergencyAlerts.length} Active System Alerts</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          {emergencyAlerts.map((alert) => (
            <div key={alert.id} className="p-3 bg-neutral-950/80 border border-rose-900/50 rounded-lg space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-white font-mono">{alert.symbol}</span>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-rose-950 text-rose-400 border border-rose-800 uppercase font-mono">
                  {alert.alertType}
                </span>
              </div>
              <p className="text-gray-300 leading-relaxed text-[11px]">{alert.message}</p>
              <div className="p-2 bg-neutral-900 rounded border border-neutral-800 text-[11px] text-emerald-400 font-semibold flex items-center gap-1.5">
                <span>⚡ Rebalance Recommendation:</span>
                <span className="text-gray-200">{alert.recommendedAction}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Banner & Health Score */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 shadow-xl flex flex-col justify-between">
          <div className="flex justify-between items-center border-b border-neutral-800 pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              AI Portfolio Health Score
            </h3>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800/60 font-semibold">
              INSTITUTIONAL GRADE
            </span>
          </div>

          <div className="py-6 flex items-center justify-around">
            <div className="text-center">
              <div className="text-5xl font-black text-emerald-400 font-mono tracking-tight">
                {health.overall_score}
                <span className="text-sm font-normal text-gray-400">/100</span>
              </div>
              <p className="text-xs text-gray-400 mt-1 font-medium">Overall Composite Score</p>
            </div>
            <div className="border-l border-neutral-800 pl-6 space-y-2 text-xs">
              <div>
                <span className="text-gray-400">Liquidity Rating: </span>
                <strong className="text-emerald-400">{health.liquidity_rating}</strong>
              </div>
              <div>
                <span className="text-gray-400">Diversification: </span>
                <strong className="text-blue-400">{health.diversification_score}/100</strong>
              </div>
              <div>
                <span className="text-gray-400">FX Exposure Risk: </span>
                <strong className="text-amber-400">{health.fx_risk_level}</strong>
              </div>
            </div>
          </div>

          <div className="bg-neutral-950 p-3 rounded-lg border border-neutral-800 text-[11px] text-gray-400 flex items-center justify-between">
            <span>ETF NAV Discrepancy Alert:</span>
            <span className="text-amber-400 font-mono font-bold">
              {health.nav_discrepancy_alert ? "ACTIVE (QQQ +0.15%)" : "CLEAR"}
            </span>
          </div>
        </div>

        {/* Risk Warnings & Signals */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 shadow-xl space-y-4 col-span-1 lg:col-span-2 flex flex-col justify-between">
          <div className="border-b border-neutral-800 pb-3 flex justify-between items-center">
            <h3 className="text-base font-bold text-white">Institutional Risk Warnings & Alerts</h3>
            <span className="text-xs text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded border border-rose-900 font-mono">
              3 Active Flags
            </span>
          </div>

          <div className="space-y-2.5">
            {health.warnings.map((warning, idx) => (
              <div
                key={idx}
                className="p-3 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-gray-300 flex items-start gap-3"
              >
                <span className="text-rose-500 font-bold shrink-0">⚠️</span>
                <p className="leading-relaxed">{warning}</p>
              </div>
            ))}
          </div>

          <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {health.ai_recommendations.map((rec, idx) => (
              <div key={idx} className="p-3 bg-neutral-950 border border-neutral-800 rounded-lg text-xs space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-blue-400 truncate">{rec.title}</span>
                  <span className="text-[10px] px-1.5 py-0.2 bg-blue-950 text-blue-300 rounded border border-blue-800 uppercase font-mono">
                    {rec.action}
                  </span>
                </div>
                <p className="text-[11px] text-gray-400 line-clamp-2">{rec.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Market Microstructure Asset Metadata Viewer */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
          <div>
            <h3 className="text-base font-bold text-white">Market Microstructure & Liquidity Inspector</h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Real-time spread, volume percentile, price impact modeling, and cross-asset signal verification.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">Select Symbol:</span>
            {Object.keys(MOCK_MICROSTRUCTURE_DATA).map((sym) => (
              <button
                key={sym}
                onClick={() => setSelectedAssetSymbol(sym)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${
                  selectedAssetSymbol === sym
                    ? "bg-blue-600 border-blue-500 text-white shadow-md shadow-blue-900/40"
                    : "bg-neutral-950 border-neutral-800 text-gray-400 hover:text-white"
                }`}
              >
                {sym}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 text-center">
          <div className="p-3 bg-neutral-950 rounded-lg border border-neutral-800/80 space-y-1">
            <span className="text-[10px] font-bold text-gray-400 uppercase">Session Type</span>
            <div className="text-xs font-bold text-blue-400 capitalize">{currentMeta.session_type}</div>
          </div>
          <div className="p-3 bg-neutral-950 rounded-lg border border-neutral-800/80 space-y-1">
            <span className="text-[10px] font-bold text-gray-400 uppercase">Spread (bps)</span>
            <div className="text-xs font-bold text-emerald-400 font-mono">{currentMeta.spread_bps} bps</div>
          </div>
          <div className="p-3 bg-neutral-950 rounded-lg border border-neutral-800/80 space-y-1">
            <span className="text-[10px] font-bold text-gray-400 uppercase">Vol Percentile</span>
            <div className="text-xs font-bold text-purple-400 font-mono">{currentMeta.volume_percentile}th</div>
          </div>
          <div className="p-3 bg-neutral-950 rounded-lg border border-neutral-800/80 space-y-1">
            <span className="text-[10px] font-bold text-gray-400 uppercase">Market Depth</span>
            <div className="text-xs font-bold text-blue-400 font-mono">{currentMeta.market_depth}/100</div>
          </div>
          <div className="p-3 bg-neutral-950 rounded-lg border border-neutral-800/80 space-y-1">
            <span className="text-[10px] font-bold text-gray-400 uppercase">Price Impact</span>
            <div className="text-xs font-bold text-amber-400 font-mono">{currentMeta.price_impact}%</div>
          </div>
          <div className="p-3 bg-neutral-950 rounded-lg border border-neutral-800/80 space-y-1">
            <span className="text-[10px] font-bold text-gray-400 uppercase">Cross Signal</span>
            <div className="text-xs font-bold text-emerald-400 capitalize">{currentMeta.cross_asset_signal}</div>
          </div>
          <div className="p-3 bg-neutral-950 rounded-lg border border-neutral-800/80 space-y-1">
            <span className="text-[10px] font-bold text-gray-400 uppercase">FX Exposure</span>
            <div className="text-xs font-bold text-amber-400 font-mono">
              {currentMeta.fx_exposure?.currency !== "USD"
                ? `${currentMeta.fx_exposure?.currency} (${currentMeta.fx_exposure?.unhedged_risk_pct}%)`
                : "None (USD)"}
            </div>
          </div>
          <div className="p-3 bg-neutral-950 rounded-lg border border-neutral-800/80 space-y-1">
            <span className="text-[10px] font-bold text-gray-400 uppercase">NAV Premium</span>
            <div className="text-xs font-bold text-blue-400 font-mono">
              {currentMeta.nav_premium_discount !== 0 ? `+${currentMeta.nav_premium_discount}%` : "0.00%"}
            </div>
          </div>
        </div>

        {/* Execution Cost Calculation Sandbox */}
        <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-4">
            <span className="text-gray-400 font-semibold">Simulated Order Trade Size ($):</span>
            <input
              type="number"
              value={tradeSize}
              onChange={(e) => setTradeSize(Number(e.target.value) || 10000)}
              className="bg-neutral-900 border border-neutral-700 text-white font-mono px-3 py-1.5 rounded-lg w-32 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex flex-wrap items-center gap-6 font-mono text-gray-300">
            <div>Spread Cost: <strong className="text-emerald-400">${(tradeSize * (currentMeta.spread_bps / 10000)).toFixed(2)}</strong></div>
            <div>Slippage: <strong className="text-amber-400">{executionCost.base_slippage_pct}%</strong></div>
            <div>Impact: <strong className="text-purple-400">{executionCost.dynamic_impact_factor}%</strong></div>
            <div>Total Deducted Cost: <strong className="text-rose-400">${executionCost.total_cost_deducted}</strong></div>
          </div>
        </div>
      </div>

      {/* Live AI Sentiment News Stream */}
      <LiveNewsSentimentStream />

      {/* Multi-Session Backtesting Engine */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
          <div>
            <h3 className="text-base font-bold text-white">Multi-Session Backtesting Engine</h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Simulate session-specific holding strategies accounting for bid-ask spread, slippage, and overnight liquidity friction.
            </p>
          </div>

          <div className="flex gap-2 bg-neutral-950 p-1 rounded-xl border border-neutral-800">
            <button
              onClick={() => setSelectedStrategy("regular_only")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                selectedStrategy === "regular_only"
                  ? "bg-blue-600 text-white font-bold"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              Regular Session Only
            </button>
            <button
              onClick={() => setSelectedStrategy("overnight_only")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                selectedStrategy === "overnight_only"
                  ? "bg-blue-600 text-white font-bold"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              Overnight Only
            </button>
            <button
              onClick={() => setSelectedStrategy("cross_session")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                selectedStrategy === "cross_session"
                  ? "bg-blue-600 text-white font-bold"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              Cross-Session Holding
            </button>
          </div>
        </div>

        {/* Backtest Metrics Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800/80 space-y-1">
            <span className="text-[11px] font-semibold text-gray-400">Total Return</span>
            <div className="text-xl font-bold font-mono text-emerald-400">
              +{selectedResult.total_return_pct}%
            </div>
          </div>
          <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800/80 space-y-1">
            <span className="text-[11px] font-semibold text-gray-400">CAGR</span>
            <div className="text-xl font-bold font-mono text-blue-400">
              +{selectedResult.cagr_pct}%
            </div>
          </div>
          <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800/80 space-y-1">
            <span className="text-[11px] font-semibold text-gray-400">Sharpe Ratio</span>
            <div className="text-xl font-bold font-mono text-purple-400">
              {selectedResult.sharpe_ratio}
            </div>
          </div>
          <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800/80 space-y-1">
            <span className="text-[11px] font-semibold text-gray-400">Max Drawdown</span>
            <div className="text-xl font-bold font-mono text-rose-400">
              -{selectedResult.max_drawdown_pct}%
            </div>
          </div>
          <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800/80 space-y-1">
            <span className="text-[11px] font-semibold text-gray-400">Win Rate</span>
            <div className="text-xl font-bold font-mono text-amber-400">
              {selectedResult.win_rate_pct}%
            </div>
          </div>
          <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800/80 space-y-1">
            <span className="text-[11px] font-semibold text-gray-400">Execution Friction</span>
            <div className="text-xl font-bold font-mono text-gray-300">
              ${selectedResult.total_execution_cost}
            </div>
          </div>
        </div>

        {/* Backtest Cumulative Performance Chart */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs text-gray-400 px-1">
            <span className="font-semibold text-gray-300">Cumulative Return Comparison (%)</span>
            <div className="flex gap-4 font-mono">
              <span className="text-blue-400">■ Regular</span>
              <span className="text-purple-400">■ Overnight</span>
              <span className="text-emerald-400">■ Cross-Session</span>
              <span className="text-gray-500">■ S&P 500</span>
            </div>
          </div>
          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={selectedResult.performance_history} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
                <XAxis dataKey="date" stroke="#737373" tick={{ fontSize: 11, fill: "#a3a3a3" }} />
                <YAxis stroke="#737373" tick={{ fontSize: 11, fill: "#a3a3a3" }} unit="%" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#171717",
                    borderColor: "#404040",
                    borderRadius: "0.5rem",
                    color: "#f5f5f5",
                    fontSize: "12px",
                  }}
                  formatter={(val: any) => [`${val}%`, "Return"]}
                />
                <Line type="monotone" dataKey="regular_only" stroke="#3b82f6" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="overnight_only" stroke="#a855f7" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="cross_session" stroke="#10b981" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="benchmark_sp500" stroke="#737373" strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
