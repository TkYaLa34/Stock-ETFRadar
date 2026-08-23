"use client";

import { useState, useEffect } from "react";

export interface FavoriteItem {
  ticker: string;
  name: string;
  assetType: "stock" | "etf";
  cik?: string;
  addedAt: string;
}

const STORAGE_KEY = "stock_radar_favorites";

const DEFAULT_FAVORITES: FavoriteItem[] = [
  {
    ticker: "AAPL",
    name: "Apple Inc.",
    assetType: "stock",
    cik: "0000320193",
    addedAt: new Date().toISOString(),
  },
  {
    ticker: "VOO",
    name: "Vanguard S&P 500 ETF",
    assetType: "etf",
    addedAt: new Date().toISOString(),
  },
];

export function useFavoritesWatchlist() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      } else {
        setFavorites(DEFAULT_FAVORITES);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_FAVORITES));
      }
    } catch {
      setFavorites(DEFAULT_FAVORITES);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  const saveFavorites = (items: FavoriteItem[]) => {
    setFavorites(items);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (err) {
      console.error("Error writing favorites to localStorage:", err);
    }
  };

  const isFavorite = (ticker: string): boolean => {
    return favorites.some(
      (item) => item.ticker.toUpperCase() === ticker.toUpperCase()
    );
  };

  const addFavorite = (item: Omit<FavoriteItem, "addedAt">) => {
    if (isFavorite(item.ticker)) return;
    const newItem: FavoriteItem = {
      ...item,
      ticker: item.ticker.toUpperCase(),
      addedAt: new Date().toISOString(),
    };
    saveFavorites([newItem, ...favorites]);
  };

  const removeFavorite = (ticker: string) => {
    const updated = favorites.filter(
      (item) => item.ticker.toUpperCase() !== ticker.toUpperCase()
    );
    saveFavorites(updated);
  };

  const toggleFavorite = (item: Omit<FavoriteItem, "addedAt">) => {
    if (isFavorite(item.ticker)) {
      removeFavorite(item.ticker);
    } else {
      addFavorite(item);
    }
  };

  return {
    favorites,
    isInitialized,
    isFavorite,
    addFavorite,
    removeFavorite,
    toggleFavorite,
  };
}
