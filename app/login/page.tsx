import { login, signup, signInWithGoogle } from "./actions";

export default function LoginPage({
  searchParams,
}: {
  searchParams: { message?: string; error?: string };
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-xl border border-gray-200 dark:border-neutral-800 p-8 shadow-lg bg-white dark:bg-neutral-900">
        <div>
          <h2 className="mt-2 text-center text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Stock & ETF Radar
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Sign in to access real-time screeners, watchlists, and alerts.
          </p>
        </div>

        {searchParams.message && (
          <div className="rounded-md bg-blue-50 dark:bg-blue-900/30 p-4 text-sm text-blue-700 dark:text-blue-300">
            {searchParams.message}
          </div>
        )}

        {searchParams.error && (
          <div className="rounded-md bg-red-50 dark:bg-red-900/30 p-4 text-sm text-red-700 dark:text-red-300">
            {searchParams.error}
          </div>
        )}

        <form action={signInWithGoogle} className="mt-4">
          <button
            type="submit"
            className="group relative flex w-full justify-center items-center gap-3 rounded-md border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            Sign in with Google
          </button>
        </form>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-neutral-700" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white dark:bg-neutral-900 px-2 text-gray-500 dark:text-gray-400">
              Or continue with email
            </span>
          </div>
        </div>

        <form className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="mt-1 block w-full rounded-md border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="••••••••"
              className="mt-1 block w-full rounded-md border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 text-sm"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              formAction={login}
              className="flex-1 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Sign In
            </button>
            <button
              formAction={signup}
              className="flex-1 rounded-md border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
