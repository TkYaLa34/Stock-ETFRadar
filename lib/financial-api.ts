const DEFAULT_USER_AGENT =
  process.env.SEC_EDGAR_USER_AGENT ||
  "StockETFRadar admin@stock-etfradar.com";

interface FetchOptions extends RequestInit {
  userAgent?: string;
}

/**
 * Server-side fetch wrapper for SEC EDGAR API and financial data providers.
 * SEC EDGAR requires a specific User-Agent header in the format: Sample Company Name AdminContact@<sample company domain>.com
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
