import { base44 } from "@/api/base44Client";

const TOKEN_KEY = "sb_access_token";
const REFRESH_KEY = "sb_refresh_token";

const invoke = (payload) => base44.functions.invoke("supabaseAuth", payload);

const extractError = (data) =>
  data?.error_description || data?.error?.message || data?.error || data?.msg || data?.message || "Request failed";

const mapUser = (data) => {
  if (!data) return null;
  return {
    ...data,
    full_name: data.user_metadata?.full_name || data.user_metadata?.name || data.email,
    role: data.app_metadata?.role || "user",
    created_date: data.created_at,
  };
};

export const supabaseAuth = {
  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  setToken(token, refreshToken) {
    localStorage.setItem(TOKEN_KEY, token);
    if (refreshToken) localStorage.setItem(REFRESH_KEY, refreshToken);
  },

  clearToken() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
  },

  // Extract tokens from OAuth redirect URL hash (#access_token=...&refresh_token=...)
  extractHashTokens() {
    if (typeof window === "undefined") return null;
    const hash = window.location.hash.substring(1);
    if (!hash) return null;
    const params = new URLSearchParams(hash);
    const accessToken = params.get("access_token");
    const refreshToken = params.get("refresh_token");
    if (accessToken) {
      window.history.replaceState({}, document.title, window.location.pathname + window.location.search);
      this.setToken(accessToken, refreshToken);
      return { accessToken, refreshToken };
    }
    return null;
  },

  async signUp(email, password) {
    const res = await invoke({ action: "signup", email, password });
    const { data, ok } = res.data;
    if (!ok) throw new Error(extractError(data));
    if (data.access_token) this.setToken(data.access_token, data.refresh_token);
    return data;
  },

  async signIn(email, password) {
    const res = await invoke({ action: "login", email, password });
    const { data, ok } = res.data;
    if (!ok) throw new Error(extractError(data));
    if (data.access_token) this.setToken(data.access_token, data.refresh_token);
    return data;
  },

  async verifyOtp(email, otp, password) {
    const res = await invoke({ action: "verify", email, otp, password, type: "signup" });
    const { data, ok } = res.data;
    if (!ok) throw new Error(extractError(data));
    if (data.access_token) this.setToken(data.access_token, data.refresh_token);
    return data;
  },

  async resendOtp(email) {
    const res = await invoke({ action: "resend", email, type: "signup" });
    const { data, ok } = res.data;
    if (!ok) throw new Error(extractError(data));
    return data;
  },

  async requestPasswordReset(email) {
    const res = await invoke({ action: "recover", email });
    const { data, ok } = res.data;
    if (!ok) throw new Error(extractError(data));
    return data;
  },

  async resetPassword(accessToken, newPassword) {
    const res = await invoke({ action: "reset", access_token: accessToken, password: newPassword });
    const { data, ok } = res.data;
    if (!ok) throw new Error(extractError(data));
    return data;
  },

  async me() {
    const token = this.getToken();
    if (!token) return null;
    const res = await invoke({ action: "me", access_token: token });
    const { data, ok, status } = res.data;
    if (!ok || status === 401) {
      this.clearToken();
      return null;
    }
    return mapUser(data);
  },

  async loginWithProvider(provider, redirectTo = "/") {
    const res = await invoke({ action: "oauth-url", provider, redirect_to: redirectTo });
    const { data, ok } = res.data;
    if (ok && data?.url) {
      window.location.href = data.url;
    }
  },

  logout() {
    this.clearToken();
  },
};