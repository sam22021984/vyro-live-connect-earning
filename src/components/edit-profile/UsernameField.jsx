import React, { useState, useRef, useEffect } from "react";
import { Loader2, Check, X, AlertCircle } from "lucide-react";
import { base44 } from "@/api/base44Client";

export default function UsernameField({ value, onChange, currentUserId }) {
  const [checking, setChecking] = useState(false);
  const [available, setAvailable] = useState(null);
  const [error, setError] = useState(null);
  const debounceRef = useRef(null);

  const validate = (val) => {
    if (val.length < 4) return "Must be 4–30 characters";
    if (val.length > 30) return "Must be 4–30 characters";
    if (/\s/.test(val)) return "No spaces allowed";
    if (!/^[a-z0-9_]+$/i.test(val)) return "Only a–z, 0–9, _ allowed";
    return null;
  };

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!value || value === value) {
      setAvailable(null);
      setError(null);
    }
    const v = validate(value);
    if (v) { setError(v); setAvailable(null); return; }
    setError(null);
    setChecking(true);
    debounceRef.current = setTimeout(async () => {
      try {
        const existing = await base44.entities.UserProfile.filter({ username: value });
        const taken = existing.some((p) => p.user_id !== currentUserId);
        setAvailable(!taken);
      } catch { setAvailable(null); }
      setChecking(false);
    }, 600);
    return () => clearTimeout(debounceRef.current);
  }, [value, currentUserId]);

  return (
    <div>
      <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Username</label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">@</span>
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          maxLength={30}
          className="w-full rounded-xl border border-gray-200 bg-white pl-7 pr-9 py-2.5 text-sm"
          placeholder="username"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          {checking && <Loader2 size={14} className="text-gray-400 animate-spin" />}
          {!checking && available === true && <Check size={14} className="text-green-500" />}
          {!checking && available === false && <X size={14} className="text-red-500" />}
        </div>
      </div>
      {error && (
        <div className="flex items-center gap-1 mt-1 text-[10px] text-red-500"><AlertCircle size={10} /> {error}</div>
      )}
      {!error && available === false && (
        <div className="flex items-center gap-1 mt-1 text-[10px] text-red-500"><AlertCircle size={10} /> Username already taken</div>
      )}
      {!error && available === true && (
        <div className="flex items-center gap-1 mt-1 text-[10px] text-green-500"><Check size={10} /> Username available</div>
      )}
      <p className="text-[9px] text-gray-300 mt-0.5 text-right">{(value || "").length}/30</p>
    </div>
  );
}