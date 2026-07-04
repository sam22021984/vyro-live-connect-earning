import { createClient } from "@supabase/supabase-js";
import { base44 } from "@/api/base44Client";

let supabaseInstance = null;

export async function getSupabase() {
  if (supabaseInstance) return supabaseInstance;

  const res = await base44.functions.invoke("supabaseConfig", {});
  const { supabase_url, supabase_anon_key } = res.data?.data || res.data || {};

  if (!supabase_url || !supabase_anon_key) {
    throw new Error("Failed to load Supabase config");
  }

  supabaseInstance = createClient(supabase_url, supabase_anon_key);
  return supabaseInstance;
}