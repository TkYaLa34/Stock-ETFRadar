"use client";

import { useFavoritesWatchlist } from "@/hooks/useFavoritesWatchlist";

export function FavoritesWatchlistCard() {
  const { favorites, isInitialized, removeFavorite } = useFavoritesWatchlist();

  if (!isInitialized) {
    return (
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 shadow-xl animate-pulse space-y-4">
        <div className="h-6 bg-neutral-800 rounded w-1/3" />
        <div className="h-20 bg-neutral-950 rounded border border-neutral-800" />
      </div>
    );
  }

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 shadow-xl space-y-4 transition-all duration-200 hover:border-neutral-700/80">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 fill-amber-400 text-amber-400" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <h3 className="text-lg font-bold text-white tracking-wide">
            Bookmarked Favorites
          </h3>
        </div>
        <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-amber-950 text-amber-400 border border-amber-800/50 shadow-sm">
          {favorites.length} Saved
        </span>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-8 text-gray-500 text-xs">
          No bookmarked favorites yet. Click the star icon on any asset card to save it here!
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {favorites.map((fav) => (
            <div
              key={fav.ticker}
              className="flex items-center justify-between p-3 rounded-lg bg-neutral-950 border border-neutral-800/80 hover:border-neutral-700 transition-all duration-150"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm">
                    {fav.ticker}
                  </span>
                  <span
                    className={`px-1.5 py-0.2 text-[10px] uppercase font-bold rounded ${
                      fav.assetType === "stock"
                        ? "bg-blue-900/40 text-blue-400"
                        : "bg-purple-900/40 text-purple-400"
                    }`}
                  >
                    {fav.assetType}
                  </span>
                </div>
                <div className="text-xs text-gray-400 truncate max-w-[160px]">
                  {fav.name}
                </div>
              </div>

              <button
                onClick={() => removeFavorite(fav.ticker)}
                className="p-1 rounded text-gray-500 hover:text-rose-400 active:scale-90 transition-all"
                title="Remove from Favorites"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
