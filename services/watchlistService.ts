import { supabaseClient } from "@/lib/supabaseClient";

export interface WatchlistRow {
  id: string;
  user_id: string;
  ticker: string;
  asset_type: "stock" | "etf";
  added_at?: string;
}

export interface ProfileRow {
  id: string;
  email?: string;
  full_name?: string;
  subscription_tier?: string;
}

export interface PriceAlertRow {
  id: string;
  user_id: string;
  ticker: string;
  target_price: number;
  condition: "ABOVE" | "BELOW";
  is_triggered?: boolean;
}

/**
 * Browser-side service function to fetch watchlists for a user.
 */
export async function getBrowserWatchlists(userId: string): Promise<WatchlistRow[]> {
  try {
    const { data, error } = await supabaseClient
      .from("watchlists")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      console.warn("[Supabase Browser Service] getBrowserWatchlists error:", error.message);
      return [];
    }

    return (data as WatchlistRow[]) || [];
  } catch (err) {
    console.error("[Supabase Browser Service] Unexpected error in getBrowserWatchlists:", err);
    return [];
  }
}

/**
 * Browser-side service function to add a ticker to watchlists.
 */
export async function addBrowserWatchlistTicker(
  userId: string,
  ticker: string,
  assetType: "stock" | "etf"
): Promise<WatchlistRow | null> {
  try {
    const { data, error } = await supabaseClient
      .from("watchlists")
      .insert({
        user_id: userId,
        ticker: ticker.toUpperCase(),
        asset_type: assetType,
      })
      .select()
      .single();

    if (error) {
      console.warn("[Supabase Browser Service] addBrowserWatchlistTicker error:", error.message);
      return null;
    }

    return data as WatchlistRow;
  } catch (err) {
    console.error("[Supabase Browser Service] Unexpected error in addBrowserWatchlistTicker:", err);
    return null;
  }
}

/**
 * Browser-side service function to remove a ticker from watchlists.
 */
export async function removeBrowserWatchlistTicker(
  id: string,
  userId: string
): Promise<boolean> {
  try {
    const { error } = await supabaseClient
      .from("watchlists")
      .delete()
      .eq("id", id)
      .eq("user_id", userId);

    if (error) {
      console.warn("[Supabase Browser Service] removeBrowserWatchlistTicker error:", error.message);
      return false;
    }

    return true;
  } catch (err) {
    console.error("[Supabase Browser Service] Unexpected error in removeBrowserWatchlistTicker:", err);
    return false;
  }
}

/**
 * Browser-side service function to fetch price alerts for a user.
 */
export async function getBrowserPriceAlerts(userId: string): Promise<PriceAlertRow[]> {
  try {
    const { data, error } = await supabaseClient
      .from("price_alerts")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      console.warn("[Supabase Browser Service] getBrowserPriceAlerts error:", error.message);
      return [];
    }

    return (data as PriceAlertRow[]) || [];
  } catch (err) {
    console.error("[Supabase Browser Service] Unexpected error in getBrowserPriceAlerts:", err);
    return [];
  }
}
