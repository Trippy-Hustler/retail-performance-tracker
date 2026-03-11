function getEnv(name: "NEXT_PUBLIC_SUPABASE_URL" | "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY") {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
}

export function getSupabaseEnv() {
  return {
    url: getEnv("NEXT_PUBLIC_SUPABASE_URL"),
    publishableKey: getEnv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY"),
  };
}
