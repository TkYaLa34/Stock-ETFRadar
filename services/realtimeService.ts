import {
  PriceTick,
  MarketDepthData,
  LiveSentimentNews,
  EmergencyRiskAlert,
} from "@/types/realtime";

export function getMockMarketDepth(symbol: string): MarketDepthData {
  const basePrice = symbol === "AAPL" ? 224.23 : symbol === "NVDA" ? 128.50 : 485.10;

  const bids = [
    { price: Number((basePrice - 0.05).toFixed(2)), volume: 1500, total: 1500 },
    { price: Number((basePrice - 0.10).toFixed(2)), volume: 3200, total: 4700 },
    { price: Number((basePrice - 0.15).toFixed(2)), volume: 5400, total: 10100 },
    { price: Number((basePrice - 0.20).toFixed(2)), volume: 8900, total: 19000 },
    { price: Number((basePrice - 0.25).toFixed(2)), volume: 12000, total: 31000 },
  ];

  const asks = [
    { price: Number((basePrice + 0.05).toFixed(2)), volume: 1200, total: 1200 },
    { price: Number((basePrice + 0.10).toFixed(2)), volume: 2800, total: 4000 },
    { price: Number((basePrice + 0.15).toFixed(2)), volume: 4900, total: 8900 },
    { price: Number((basePrice + 0.20).toFixed(2)), volume: 7600, total: 16500 },
    { price: Number((basePrice + 0.25).toFixed(2)), volume: 10500, total: 27000 },
  ];

  return {
    symbol,
    spreadBps: 2.2,
    imbalancePct: 14.8, // 14.8% buy volume imbalance
    bids,
    asks,
  };
}

export function getMockLiveNews(): LiveSentimentNews[] {
  return [
    {
      id: "news-1",
      symbol: "NVDA",
      headline: "NVIDIA Announces Next-Gen Blackwell Ultra Architecture Breakthrough with 30% Efficiency Gain",
      source: "Reuters",
      timestamp: new Date().toISOString(),
      sentiment: "Bullish",
      sentimentScore: 0.88,
      impactLevel: "High",
    },
    {
      id: "news-2",
      symbol: "AAPL",
      headline: "Apple Intelligence Expansion Receives Higher Than Expected Pre-Orders Across Asia Markets",
      source: "Bloomberg",
      timestamp: new Date(Date.now() - 300000).toISOString(),
      sentiment: "Bullish",
      sentimentScore: 0.76,
      impactLevel: "High",
    },
    {
      id: "news-3",
      symbol: "ASML",
      headline: "EU Semiconductor Regulation Updates Introduce Temporary FX & Export Compliance Adjustments",
      source: "Financial Times",
      timestamp: new Date(Date.now() - 900000).toISOString(),
      sentiment: "Bearish",
      sentimentScore: -0.54,
      impactLevel: "Medium",
    },
  ];
}

export function getMockEmergencyAlerts(): EmergencyRiskAlert[] {
  return [
    {
      id: "alert-1",
      symbol: "ASML",
      alertType: "VOLATILITY_SPIKE",
      severity: "CRITICAL",
      message: "Overnight volatility spike (+4.8% std dev expansion). Unhedged EUR currency exposure elevated.",
      recommendedAction: "Execute delta-neutral option hedge or reallocate 5% to USD cash reserve.",
      timestamp: new Date().toISOString(),
    },
    {
      id: "alert-2",
      symbol: "QQQ",
      alertType: "MARGIN_WARNING",
      severity: "WARNING",
      message: "ETF NAV Premium widened to +0.18%. Secondary liquidity buffer threshold near limit.",
      recommendedAction: "Pause automated market buy orders during pre-market session.",
      timestamp: new Date(Date.now() - 600000).toISOString(),
    },
  ];
}

export function subscribeToPriceTicks(
  symbols: string[],
  onTick: (tick: PriceTick) => void
): () => void {
  const interval = setInterval(() => {
    const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)] || "AAPL";
    const basePrice = randomSymbol === "AAPL" ? 224.23 : randomSymbol === "NVDA" ? 128.50 : 485.10;

    // Simulate slight price fluctuation (-0.5% to +0.5%)
    const delta = (Math.random() - 0.48) * (basePrice * 0.006);
    const newPrice = Number((basePrice + delta).toFixed(2));
    const change = Number(delta.toFixed(2));
    const changePct = Number(((delta / basePrice) * 100).toFixed(2));
    const direction = delta > 0 ? "up" : delta < 0 ? "down" : "unchanged";

    onTick({
      symbol: randomSymbol,
      price: newPrice,
      change,
      changePct,
      direction,
      timestamp: new Date().toLocaleTimeString(),
    });
  }, 2500);

  return () => clearInterval(interval);
}
