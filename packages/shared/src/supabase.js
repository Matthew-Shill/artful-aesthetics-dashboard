import { createClient } from "@supabase/supabase-js";

export function getSupabaseConfig(env = {}) {
  const url =
    env.VITE_SUPABASE_URL ||
    env.NEXT_PUBLIC_SUPABASE_URL ||
    env.SUPABASE_URL ||
    "";
  const anonKey =
    env.VITE_SUPABASE_ANON_KEY ||
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    env.SUPABASE_ANON_KEY ||
    "";

  return { url, anonKey };
}

export function createSupabaseClient(env = {}) {
  const { url, anonKey } = getSupabaseConfig(env);

  if (!url || !anonKey) {
    return null;
  }

  return createClient(url, anonKey);
}
