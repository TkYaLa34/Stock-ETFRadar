import { unstable_cache } from "next/cache";

const DEFAULT_USER_AGENT =
  process.env.SEC_EDGAR_USER_AGENT ||
  "StockETFRadar admin@stock-etfradar.com";

interface FetchOptions extends RequestInit {
  userAgent?: string;
}

/**
 * Direct server-side fetch wrapper for SEC EDGAR API and financial data providers.
 */
export async function fetchFinancialData<T = unknown>(
  url: string,
  options: FetchOptions = {}
): Promise<T> {
  const { userAgent = DEFAULT_USER_AGENT, headers, ...restOptions } = options;

  const response = await fetch(url, {
    ...restOptions,
    headers: {
      "User-Agent": userAgent,
      Accept: "application/json",
      ...headers,
    },
  });

  if (!response.ok) {
    throw new Error(
      `Financial API Error [${response.status}]: ${response.statusText}`
    );
  }

  return response.json() as Promise<T>;
}

/**
 * Server-side cached SEC EDGAR company facts fetcher utilizing `unstable_cache`.
 * Caches SEC XBRL responses for 24 hours (86,400s) to prevent API rate limiting.
 */
export const getCachedSecCompanyFacts = unstable_cache(
  async (paddedCik: string) => {
    const secUrl = `https://data.sec.gov/api/xbrl/companyfacts/CIK${paddedCik}.json`;
    return fetchFinancialData(secUrl);
  },
  ["sec-company-facts"],
  { revalidate: 86400, tags: ["sec-financials"] }
);

/**
 * Server-side cached stock quote fetcher using Finnhub API.
 * Caches stock quotes for 60 seconds.
 */
export const getCachedStockQuote = unstable_cache(
  async (symbol: string, apiKey: string) => {
    const quoteRes = await fetch(
      `https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(
        symbol
      )}&token=${apiKey}`
    );
    if (!quoteRes.ok) {
      throw new Error(`Finnhub quote error: ${quoteRes.status}`);
    }
    return quoteRes.json();
  },
  ["stock-quote-cache"],
  { revalidate: 60, tags: ["stock-quotes"] }
);
