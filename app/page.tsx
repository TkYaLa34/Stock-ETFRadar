export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold">Stock & ETF Radar SaaS</h1>
      </div>
      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:grid-cols-3 lg:text-left gap-4">
        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
          <h2 className="mb-3 text-2xl font-semibold">Real-time Radar</h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Filter stocks and ETFs by technical indicators and fundamentals.
          </p>
        </div>
        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
          <h2 className="mb-3 text-2xl font-semibold">Custom Watchlists</h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Track your favorite assets with live streaming prices.
          </p>
        </div>
        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
          <h2 className="mb-3 text-2xl font-semibold">Price Alerts</h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Get notified instantly when target price triggers are hit.
          </p>
        </div>
      </div>
    </main>
  );
}
