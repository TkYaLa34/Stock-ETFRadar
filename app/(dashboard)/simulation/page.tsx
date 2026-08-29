import { Navbar } from "@/components/Navbar";
import { MonteCarloSimulator } from "@/components/MonteCarloSimulator";

export default async function SimulationPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-gray-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-6">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-black text-white tracking-tight">Monte Carlo Risk Simulator</h1>
              <span className="px-2.5 py-0.5 text-xs font-bold rounded bg-purple-950 text-purple-400 border border-purple-800/50 uppercase font-mono">
                10,000 PATH SIMULATION
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Statistical risk modeling evaluating Value at Risk (VaR), CVaR Expected Shortfall, and percentile drawdown bands.
            </p>
          </div>
        </div>

        <MonteCarloSimulator />
      </main>

      <footer className="border-t border-neutral-800 py-6 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Stock & ETF Radar SaaS. All rights reserved.
      </footer>
    </div>
  );
}
