import {
  MarketMicrostructureMetadata,
  BacktestResult,
  BacktestStrategyType,
  ExecutionCostModel,
  PortfolioHealthScore,
  BacktestPerformancePoint,
} from "@/types/backtest";

export const MOCK_MICROSTRUCTURE_DATA: Record<string, MarketMicrostructureMetadata> = {
  AAPL: {
    symbol: "AAPL",
    session_type: "regular",
    spread_bps: 1.2,
    volume_percentile: 85,
    market_depth: 92,
    price_impact: 0.02,
    cross_asset_signal: "bullish",
    fx_exposure: { currency: "USD", unhedged_risk_pct: 0 },
    news_timestamp: new Date().toISOString(),
    nav_premium_discount: 0,
  },
  QQQ: {
    symbol: "QQQ",
    session_type: "pre-market",
    spread_bps: 2.5,
    volume_percentile: 70,
    market_depth: 88,
    price_impact: 0.04,
    cross_asset_signal: "bullish",
    fx_exposure: { currency: "USD", unhedged_risk_pct: 0 },
    news_timestamp: new Date().toISOString(),
    nav_premium_discount: 0.15, // +0.15% premium to NAV
  },
  NVDA: {
    symbol: "NVDA",
    session_type: "post-market",
    spread_bps: 4.1,
    volume_percentile: 94,
    market_depth: 85,
    price_impact: 0.07,
    cross_asset_signal: "bullish",
    fx_exposure: { currency: "USD", unhedged_risk_pct: 0 },
    news_timestamp: new Date().toISOString(),
    nav_premium_discount: 0,
  },
  ASML: {
    symbol: "ASML",
    session_type: "overnight",
    spread_bps: 8.5,
    volume_percentile: 45,
    market_depth: 55,
    price_impact: 0.18,
    cross_asset_signal: "neutral",
    fx_exposure: { currency: "EUR", unhedged_risk_pct: 14.2 },
    news_timestamp: new Date().toISOString(),
    nav_premium_discount: 0,
  },
};

export function calculateExecutionCosts(
  tradeSizeUSD: number,
  meta: MarketMicrostructureMetadata
): ExecutionCostModel {
  const spreadCost = tradeSizeUSD * (meta.spread_bps / 10000);

  // Liquidity scaling: lower volume percentile increases slippage exponentially
  const liquidityFactor = Math.max(1, (100 - meta.volume_percentile) / 20);
  const baseSlippagePct = 0.0005 * liquidityFactor; // 5 bps base scaled by volume
  const dynamicImpactFactor = meta.price_impact * (tradeSizeUSD / 100000);
  const slippageCost = tradeSizeUSD * (baseSlippagePct + dynamicImpactFactor / 100);

  const commission = 1.0; // Fixed broker commission per order
  const totalCost = spreadCost + slippageCost + commission;

  return {
    bid_ask_spread_bps: meta.spread_bps,
    base_slippage_pct: Number((baseSlippagePct * 100).toFixed(4)),
    dynamic_impact_factor: Number(dynamicImpactFactor.toFixed(4)),
    commission_per_trade: commission,
    total_cost_deducted: Number(totalCost.toFixed(2)),
  };
}

export function runMultiSessionBacktest(
  initialCapital: number = 100000,
  tradeSizeUSD: number = 10000
): Record<BacktestStrategyType, BacktestResult> {
  const dates = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Base daily returns simulation incorporating market microstructure friction
  let regCapital = initialCapital;
  let overCapital = initialCapital;
  let crossCapital = initialCapital;
  let spCapital = initialCapital;

  const history: BacktestPerformancePoint[] = [];

  const regMults = [1.02, 1.015, 0.98, 1.03, 1.025, 1.01, 1.04, 0.97, 1.02, 1.035, 1.01, 1.025];
  const overMults = [1.008, 1.022, 1.01, 0.99, 1.015, 1.005, 1.025, 1.01, 0.985, 1.018, 1.02, 1.012];
  const crossMults = [1.028, 1.035, 0.975, 1.04, 1.038, 1.018, 1.06, 0.965, 1.01, 1.045, 1.025, 1.038];
  const spMults = [1.01, 1.012, 0.99, 1.018, 1.015, 1.008, 1.02, 0.985, 1.005, 1.02, 1.012, 1.015];

  // Microstructure execution friction per trade roundtrip
  const avgMeta = MOCK_MICROSTRUCTURE_DATA.AAPL;
  const costPerTrade = calculateExecutionCosts(tradeSizeUSD, avgMeta).total_cost_deducted;
  const monthlyTradeCount = 8;
  const monthlyFriction = costPerTrade * monthlyTradeCount;

  dates.forEach((date, index) => {
    regCapital = Math.max(0, regCapital * regMults[index] - monthlyFriction);
    overCapital = Math.max(0, overCapital * overMults[index] - monthlyFriction * 1.2); // Overnight friction higher due to wider spreads
    crossCapital = Math.max(0, crossCapital * crossMults[index] - monthlyFriction * 0.9);
    spCapital = spCapital * spMults[index];

    history.push({
      date,
      regular_only: Number(((regCapital / initialCapital - 1) * 100).toFixed(2)),
      overnight_only: Number(((overCapital / initialCapital - 1) * 100).toFixed(2)),
      cross_session: Number(((crossCapital / initialCapital - 1) * 100).toFixed(2)),
      benchmark_sp500: Number(((spCapital / initialCapital - 1) * 100).toFixed(2)),
    });
  });

  const totalTrades = monthlyTradeCount * 12;

  return {
    regular_only: {
      strategy: "regular_only",
      total_return_pct: history[history.length - 1].regular_only,
      cagr_pct: history[history.length - 1].regular_only,
      max_drawdown_pct: 6.8,
      sharpe_ratio: 1.85,
      win_rate_pct: 62.5,
      total_trades: totalTrades,
      total_execution_cost: Number((monthlyFriction * 12).toFixed(2)),
      performance_history: history,
    },
    overnight_only: {
      strategy: "overnight_only",
      total_return_pct: history[history.length - 1].overnight_only,
      cagr_pct: history[history.length - 1].overnight_only,
      max_drawdown_pct: 4.2,
      sharpe_ratio: 1.42,
      win_rate_pct: 58.3,
      total_trades: totalTrades,
      total_execution_cost: Number((monthlyFriction * 1.2 * 12).toFixed(2)),
      performance_history: history,
    },
    cross_session: {
      strategy: "cross_session",
      total_return_pct: history[history.length - 1].cross_session,
      cagr_pct: history[history.length - 1].cross_session,
      max_drawdown_pct: 8.4,
      sharpe_ratio: 2.15,
      win_rate_pct: 68.4,
      total_trades: totalTrades,
      total_execution_cost: Number((monthlyFriction * 0.9 * 12).toFixed(2)),
      performance_history: history,
    },
  };
}

export function evaluatePortfolioHealth(): PortfolioHealthScore {
  return {
    overall_score: 84,
    liquidity_rating: "High",
    diversification_score: 78,
    fx_risk_level: "Medium",
    nav_discrepancy_alert: true, // QQQ premium alert
    warnings: [
      "ASML position carries 14.2% unhedged EUR currency exposure.",
      "QQQ trading at a +0.15% premium relative to Net Asset Value (NAV).",
      "Overnight session spread for ASML widened to 8.5 bps due to low depth.",
    ],
    ai_recommendations: [
      {
        title: "Cross-Session Holding Strategy Optimization",
        action: "REBALANCE",
        description: "Historical multi-session backtesting indicates holding cross-session improves Sharpe ratio by +0.30 vs regular-only trading.",
      },
      {
        title: "EUR Currency Risk Mitigation",
        action: "HEDGE",
        description: "Consider FX forward hedging for international assets with unhedged risk exceeding 10%.",
      },
      {
        title: "Overnight Slippage Minimization",
        action: "REDUCE_OVERNIGHT",
        description: "Limit market order submissions during overnight session when order book depth drops below 60.",
      },
    ],
  };
}
