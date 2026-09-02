"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export interface WatchlistItem {
  id: string;
  ticker: string;
  name: string;
  asset_type: "stock" | "etf";
  price: number;
  change: number;
  change_percent: number;
}

export interface StockSearchResult {
  id?: string;
  ticker: string;
  name: string;
  sector?: string;
  market_cap?: number;
}

export interface EtfSearchResult {
  id?: string;
  ticker: string;
  name: string;
  asset_class?: string;
  aum?: number;
}

export interface SearchStocksAndEtfsResult {
  stocks: StockSearchResult[];
  etfs: EtfSearchResult[];
}

export async function signOut() {
  const supabase = createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/login");
}

export async function addToWatchlist(formData: FormData) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const ticker = (formData.get("ticker") as string)?.toUpperCase();
  const name = (formData.get("name") as string) || ticker;
  const asset_type = (formData.get("asset_type") as "stock" | "etf") || "stock";

  if (!ticker) return;

  await supabase.from("watchlists").insert({
    user_id: user.id,
    ticker,
    asset_type,
  });

  revalidatePath("/dashboard");
}

export async function removeFromWatchlist(id: string) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  await supabase.from("watchlists").delete().eq("id", id).eq("user_id", user.id);

  revalidatePath("/dashboard");
}

/**
 * Server Action for searching stocks and ETFs in Supabase.
 * Queries `stocks` and `etfs` tables using `ilike` on `ticker` and `name`.
 * Limits output to 5 items per table and handles errors gracefully.
 */
export async function searchStocksAndEtfs(
  query: string
): Promise<SearchStocksAndEtfsResult> {
  const result: SearchStocksAndEtfsResult = {
    stocks: [],
    etfs: [],
  };

  const cleanQuery = query?.trim();
  if (!cleanQuery) {
    return result;
  }

  try {
    const supabase = createClient();
    const ilikePattern = `%${cleanQuery}%`;

    // Query stocks table (limit 5)
    const { data: stocksData, error: stocksError } = await supabase
      .from("stocks")
      .select("id, ticker, name, sector, market_cap")
      .or(`ticker.ilike.${ilikePattern},name.ilike.${ilikePattern}`)
      .limit(5);

    if (!stocksError && stocksData) {
      result.stocks = stocksData.map((item: any) => ({
        id: item.id,
        ticker: item.ticker,
        name: item.name || item.ticker,
        sector: item.sector,
        market_cap: item.market_cap,
      }));
    }

    // Query etfs table (limit 5)
    const { data: etfsData, error: etfsError } = await supabase
      .from("etfs")
      .select("id, ticker, name, asset_class, aum")
      .or(`ticker.ilike.${ilikePattern},name.ilike.${ilikePattern}`)
      .limit(5);

    if (!etfsError && etfsData) {
      result.etfs = etfsData.map((item: any) => ({
        id: item.id,
        ticker: item.ticker,
        name: item.name || item.ticker,
        asset_class: item.asset_class,
        aum: item.aum,
      }));
    }
  } catch (error) {
    console.error("Error searching stocks and ETFs:", error);
  }

  return result;
}
