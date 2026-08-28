import { login, signup } from "./actions";

export default function LoginPage({
  searchParams,
}: {
  searchParams: { message?: string; error?: string };
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-neutral-950 font-sans">
      <div className="w-full max-w-md space-y-8 rounded-xl border border-neutral-800 p-8 shadow-2xl bg-neutral-900">
        <div>
          <div className="flex justify-center mb-3">
            <span className="px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/60 shadow-sm font-mono">
              Zero-Install Web App
            </span>
          </div>
          <h2 className="text-center text-3xl font-extrabold tracking-tight text-white">
            Stock & ETF Radar
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Sign in with email to access screeners, watchlists, and SEC filings.
          </p>
        </div>

        {searchParams.message && (
          <div className="rounded-md bg-blue-900/30 border border-blue-800 p-4 text-sm text-blue-300">
            {searchParams.message}
          </div>
        )}

        {searchParams.error && (
          <div className="rounded-md bg-red-900/30 border border-red-800 p-4 text-sm text-red-300">
            {searchParams.error}
          </div>
        )}

        <form className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="mt-1 block w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-2 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="••••••••"
              className="mt-1 block w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-2 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              formAction={login}
              className="flex-1 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-blue-500 active:scale-95 transition-all shadow-md shadow-blue-600/30"
            >
              Sign In
            </button>
            <button
              formAction={signup}
              className="flex-1 rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2.5 text-sm font-bold text-gray-200 hover:bg-neutral-700 active:scale-95 transition-all"
            >
              Sign Up
            </button>
          </div>
        </form>

        <p className="text-center text-[11px] text-gray-500 mt-4">
          Instant web browser access • No downloads or installations required
        </p>
      </div>
    </div>
  );
}
