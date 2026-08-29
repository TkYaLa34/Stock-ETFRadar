import { supabaseClient } from "@/lib/supabaseClient";
import { createClient as createBrowserClient } from "@/lib/supabase/client";

export interface StockRadarItem {
  id: string;
  symbol: string;
  name: string;
  type: "stock" | "etf";
  price: number;
  change_pct: number;
  volume: number;
  signal: "bullish" | "bearish" | "neutral";
}

export async function fetchStockRadarItems(typeFilter?: "stock" | "etf"): Promise<StockRadarItem[]> {
  try {
    const supabase = createBrowserClient() || supabaseClient;
    let query = supabase.from("watchlists").select("*");

    if (typeFilter) {
      query = query.eq("asset_type", typeFilter);
    }

    const { data, error } = await query;

    if (error || !data) {
      return fallbackRadarItems(typeFilter);
    }

    return data.map((item: any) => ({
      id: item.id || item.symbol,
      symbol: item.symbol,
      name: item.name || item.symbol,
      type: item.asset_type || "stock",
      price: item.price || 100,
      change_pct: item.change_pct || 0,
      volume: item.volume || 1000000,
      signal: item.change_pct > 0 ? "bullish" : item.change_pct < 0 ? "bearish" : "neutral",
    }));
  } catch {
    return fallbackRadarItems(typeFilter);
  }
}

function fallbackRadarItems(typeFilter?: "stock" | "etf"): StockRadarItem[] {
  const items: StockRadarItem[] = [
    { id: "1", symbol: "AAPL", name: "Apple Inc.", type: "stock", price: 224.23, change_pct: 0.83, volume: 45000000, signal: "bullish" },
    { id: "2", symbol: "NVDA", name: "NVIDIA Corp.", type: "stock", price: 128.5, change_pct: 2.15, volume: 85000000, signal: "bullish" },
    { id: "3", symbol: "QQQ", name: "Invesco QQQ Trust", type: "etf", price: 485.1, change_pct: 0.71, volume: 32000000, signal: "bullish" },
    { id: "4", symbol: "SPY", name: "SPDR S&P 500 ETF", type: "etf", price: 556.2, change_pct: 0.39, volume: 50000000, signal: "bullish" },
    { id: "5", symbol: "ASML", name: "ASML Holding NV", type: "stock", price: 840.1, change_pct: -1.2, volume: 2100000, signal: "bearish" },
  ];

  if (typeFilter) {
    return items.filter((i) => i.type === typeFilter);
  }
  return items;
}
