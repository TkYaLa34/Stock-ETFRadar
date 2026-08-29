export function getEnvVar(key: string, required = true): string {
  const value = process.env[key];
  if (!value && required) {
    if (typeof window === "undefined") {
      console.warn(`[Warning] Environment variable ${key} is missing.`);
    }
  }
  return value || "";
}

export const env = {
  appUrl: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || "",
  },
};
