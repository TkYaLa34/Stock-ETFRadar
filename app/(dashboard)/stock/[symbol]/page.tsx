import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { AnalystQuantAnalysis } from "@/components/AnalystQuantAnalysis";
import { MarketDepthVisualizer } from "@/components/MarketDepthVisualizer";
import { SecMdaAnalysis } from "@/components/SecMdaAnalysis";
import Link from "next/link";

export default async function StockDetailPage({
  params,
  searchParams,
}: {
  params: { symbol: string };
  searchParams: { tab?: string };
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const symbol = params.symbol.toUpperCase();
  const activeTab = searchParams.tab || "analysis";

  return (
    <div className="min-h-screen bg-neutral-950 text-gray-100 flex flex-col font-sans">
      <Navbar userEmail={user.email} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-6">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-black text-white tracking-tight">{symbol}</h1>
              <span className="px-2.5 py-0.5 text-xs font-bold rounded bg-blue-950 text-blue-400 border border-blue-800/50 uppercase">
                Stock Detail
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Comprehensive technical metrics, analyst price targets, and quant radar analysis.
            </p>
          </div>

          <Link
            href="/screener"
            className="self-start sm:self-auto px-4 py-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs font-semibold text-gray-300 rounded-lg transition-all"
          >
            ← Back to Screener
          </Link>
        </div>

        <div className="border-b border-neutral-800 flex overflow-x-auto gap-2">
          <Link
            href={`/stock/${symbol}?tab=overview`}
            className={`px-4 py-3 text-xs font-bold whitespace-nowrap border-b-2 transition-all ${
              activeTab === "overview"
                ? "border-blue-500 text-blue-400"
                : "border-transparent text-gray-400 hover:text-gray-200"
            }`}
          >
            Overview
          </Link>
          <Link
            href={`/stock/${symbol}?tab=analysis`}
            className={`px-4 py-3 text-xs font-bold whitespace-nowrap border-b-2 transition-all ${
              activeTab === "analysis"
                ? "border-blue-500 text-blue-400"
                : "border-transparent text-gray-400 hover:text-gray-200"
            }`}
          >
            Analysis (บทวิเคราะห์ / Analyst & Quant)
          </Link>
          <Link
            href={`/stock/${symbol}?tab=depth`}
            className={`px-4 py-3 text-xs font-bold whitespace-nowrap border-b-2 transition-all ${
              activeTab === "depth"
                ? "border-blue-500 text-blue-400"
                : "border-transparent text-gray-400 hover:text-gray-200"
            }`}
          >
            Market Depth & Order Book
          </Link>
          <Link
            href={`/stock/${symbol}?tab=mda`}
            className={`px-4 py-3 text-xs font-bold whitespace-nowrap border-b-2 transition-all ${
              activeTab === "mda"
                ? "border-blue-500 text-blue-400"
                : "border-transparent text-gray-400 hover:text-gray-200"
            }`}
          >
            AI SEC MD&A Analysis
          </Link>
          <Link
            href={`/stock/${symbol}?tab=financials`}
            className={`px-4 py-3 text-xs font-bold whitespace-nowrap border-b-2 transition-all ${
              activeTab === "financials"
                ? "border-blue-500 text-blue-400"
                : "border-transparent text-gray-400 hover:text-gray-200"
            }`}
          >
            Financials (SEC 10-K)
          </Link>
          <Link
            href={`/stock/${symbol}?tab=news`}
            className={`px-4 py-3 text-xs font-bold whitespace-nowrap border-b-2 transition-all ${
              activeTab === "news"
                ? "border-blue-500 text-blue-400"
                : "border-transparent text-gray-400 hover:text-gray-200"
            }`}
          >
            News & Guidance
          </Link>
        </div>

        {activeTab === "analysis" ? (
          <AnalystQuantAnalysis symbol={symbol} />
        ) : activeTab === "depth" ? (
          <MarketDepthVisualizer symbol={symbol} />
        ) : activeTab === "mda" ? (
          <SecMdaAnalysis symbol={symbol} />
        ) : (
          <div className="p-8 rounded-xl bg-neutral-900 border border-neutral-800 text-center text-xs text-gray-400">
            Selected tab: <strong className="text-white uppercase">{activeTab}</strong>. Navigate to Analysis, Market Depth, or SEC MD&A to view detailed analytics.
          </div>
        )}
      </main>

      <footer className="border-t border-neutral-800 py-6 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Stock & ETF Radar SaaS. All rights reserved.
      </footer>
    </div>
  );
}
