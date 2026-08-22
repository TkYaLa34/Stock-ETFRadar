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
