import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { SmartAlertEngine } from "@/components/SmartAlertEngine";

export default async function AlertsPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-gray-100 flex flex-col font-sans">
      <Navbar userEmail={user.email} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-6">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-black text-white tracking-tight">Smart Multi-Condition Alerts</h1>
              <span className="px-2.5 py-0.5 text-xs font-bold rounded bg-blue-950 text-blue-400 border border-blue-800/50 uppercase font-mono">
                WEB PUSH ENGINE
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Configure multi-variable price, technical RSI, and order book imbalance trigger rules with instant Web Push delivery.
            </p>
          </div>
        </div>

        <SmartAlertEngine />
      </main>

      <footer className="border-t border-neutral-800 py-6 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Stock & ETF Radar SaaS. All rights reserved.
      </footer>
    </div>
  );
}
