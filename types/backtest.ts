export type SessionType = 'regular' | 'pre-market' | 'post-market' | 'overnight';

export interface MarketMicrostructureMetadata {
  symbol: string;
  session_type: SessionType;
  spread_bps: number; // Bid-Ask spread in basis points
  volume_percentile: number; // 0-100 percentile relative to historical baseline
  market_depth: number; // Order book liquidity density score
  price_impact: number; // Estimated price impact percentage for standard lot size
  cross_asset_signal: 'bullish' | 'neutral' | 'bearish';
  fx_exposure?: {
    currency: string;
    unhedged_risk_pct: number;
  };
  news_timestamp: string; // ISO 8601 timestamp of latest material news
  nav_premium_discount?: number; // ETF price vs Net Asset Value (%)
}

export type BacktestStrategyType = 'regular_only' | 'overnight_only' | 'cross_session';

export interface ExecutionCostModel {
  bid_ask_spread_bps: number;
  base_slippage_pct: number;
  dynamic_impact_factor: number; // Scaled by volume percentile
  commission_per_trade: number;
  total_cost_deducted: number;
}

export interface BacktestPerformancePoint {
  date: string;
  regular_only: number;
  overnight_only: number;
  cross_session: number;
  benchmark_sp500: number;
}

export interface BacktestResult {
  strategy: BacktestStrategyType;
  total_return_pct: number;
  cagr_pct: number;
  max_drawdown_pct: number;
  sharpe_ratio: number;
  win_rate_pct: number;
  total_trades: number;
  total_execution_cost: number;
  performance_history: BacktestPerformancePoint[];
}

export interface PortfolioHealthScore {
  overall_score: number; // 0-100
  liquidity_rating: 'High' | 'Moderate' | 'Low';
  diversification_score: number;
  fx_risk_level: 'Low' | 'Medium' | 'High';
  nav_discrepancy_alert: boolean;
  warnings: string[];
  ai_recommendations: {
    title: string;
    action: 'REBALANCE' | 'HEDGE' | 'HOLD' | 'REDUCE_OVERNIGHT';
    description: string;
  }[];
}
