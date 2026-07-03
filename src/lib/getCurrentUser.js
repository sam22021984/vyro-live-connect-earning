import { supabaseAuth } from "@/lib/supabaseAuth";

/**
 * Get the current authenticated user from Supabase auth.
 * Use this instead of base44.auth.me() — the app uses Supabase auth,
 * so base44.auth.me() (which hits Base44's platform auth) always fails.
 *
 * For React components/hooks, prefer: const { user } = useAuth()
 * This function is for non-hook contexts (async utilities, event handlers).
 */
export async function getCurrentUser() {
  return await supabaseAuth.me();
}