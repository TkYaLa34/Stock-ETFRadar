export interface PriceTick {
  symbol: string;
  price: number;
  change: number;
  changePct: number;
  direction: 'up' | 'down' | 'unchanged';
  timestamp: string;
}

export interface OrderBookEntry {
  price: number;
  volume: number;
  total: number;
}

export interface MarketDepthData {
  symbol: string;
  spreadBps: number;
  imbalancePct: number; // positive = buy heavy, negative = sell heavy
  bids: OrderBookEntry[];
  asks: OrderBookEntry[];
}

export interface LiveSentimentNews {
  id: string;
  symbol: string;
  headline: string;
  source: string;
  timestamp: string;
  sentiment: 'Bullish' | 'Bearish' | 'Neutral';
  sentimentScore: number; // -1.0 to +1.0
  impactLevel: 'High' | 'Medium' | 'Low';
}

export interface EmergencyRiskAlert {
  id: string;
  symbol: string;
  alertType: 'VOLATILITY_SPIKE' | 'MARGIN_WARNING' | 'LIQUIDITY_BREACH' | 'SLIPPAGE_ALERT';
  severity: 'CRITICAL' | 'WARNING' | 'INFO';
  message: string;
  recommendedAction: string;
  timestamp: string;
}
