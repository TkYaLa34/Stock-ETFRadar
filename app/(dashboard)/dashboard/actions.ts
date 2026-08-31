"use server";

import { revalidatePath } from "next/cache";

export interface WatchlistItem {
  id: string;
  ticker: string;
  name: string;
  asset_type: "stock" | "etf";
  price: number;
  change: number;
  change_percent: number;
}

export async function addToWatchlist(formData: FormData) {
  const ticker = (formData.get("ticker") as string)?.toUpperCase();
  if (!ticker) return;

  revalidatePath("/dashboard");
}

export async function removeFromWatchlist(id: string) {
  revalidatePath("/dashboard");
}
