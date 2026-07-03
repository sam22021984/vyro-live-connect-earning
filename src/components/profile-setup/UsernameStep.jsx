import React, { useState, useEffect } from "react";
import { User, Check, X, Loader2, ArrowRight } from "lucide-react";
import { base44 } from "@/api/base44Client";

const RESTRICTED = ["admin", "official", "vyro", "support", "moderator", "staff", "root", "system", "help", "security"];

export default function UsernameStep({ data, updateData, onContinue }) {
  const [username, setUsername] = useState(data.username || "");
  const [status, setStatus] = useState("idle");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (!username || username.length < 4) { setStatus("idle"); setSuggestions([]); return; }
    if (!/^[A-Za-z0-9_.]+$/.test(username)) { setStatus("invalid"); return; }
    if (RESTRICTED.some((w) => username.toLowerCase().includes(w))) { setStatus("restricted"); return; }

    setStatus("checking");
    const timer = setTimeout(async () => {
      try {
        const res = await base44.functions.invoke("userOnboarding", { action: "checkUsername", username });
        if (res.data?.available) { setStatus("available"); setSuggestions([]); }
        else if (res.data?.reason === "restricted") { setStatus("restricted"); }
        else { setStatus("taken"); setSuggestions(res.data?.suggestions || []); }
      } catch { setStatus("idle"); }
    }, 500);
    return () => clearTimeout(timer);
  }, [username]);

  return (
    <div>
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-200 to-blue-200 flex items-center justify-center">
          <User size={32} className="text-purple-500" />
        </div>
      </div>

      <div className="relative mb-2">
        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Choose a username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full pl-11 pr-10 rounded-2xl bg-white border border-gray-100 text-sm shadow-sm outline-none focus:border-purple-300"
          style={{ height: "52px" }}
          autoFocus
          maxLength={30}
        />
        <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
          {status === "checking" && <Loader2 size={18} className="text-gray-400 animate-spin" />}
          {status === "available" && <Check size={18} className="text-green-500" />}
          {(status === "taken" || status === "restricted") && <X size={18} className="text-red-500" />}
        </div>
      </div>

      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] text-gray-400">{username.length}/30 characters</span>
        {status === "available" && <span className="text-[10px] text-green-500 font-semibold">✔ Username Available</span>}
        {status === "taken" && <span className="text-[10px] text-red-500 font-semibold">✖ This username is already taken</span>}
        {status === "restricted" && <span className="text-[10px] text-red-500 font-semibold">This username cannot be used</span>}
        {status === "invalid" && <span className="text-[10px] text-red-500 font-semibold">Only letters, numbers, _ and . allowed</span>}
      </div>

      {suggestions.length > 0 && (
        <div className="mb-4">
          <p className="text-[10px] text-gray-400 mb-2">Try one of these:</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => setUsername(s)}
                className="px-3 py-1.5 rounded-full bg-purple-50 text-purple-600 text-xs font-medium active:scale-95 transition"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      <p className="text-[10px] text-gray-300 mb-6">
        Min 4 characters. Letters (A-Z), numbers (0-9), underscore (_) and dot (.) only. No spaces.
      </p>

      <button
        onClick={() => { updateData({ username }); onContinue(); }}
        disabled={status !== "available"}
        className="w-full rounded-2xl bg-gradient-to-r from-[#6F35E0] to-[#C135E0] text-white font-bold text-sm shadow-lg shadow-purple-200 transition-all active:scale-[0.98] disabled:opacity-40 flex items-center justify-center gap-2"
        style={{ height: "52px" }}
      >
        Continue <ArrowRight size={16} />
      </button>
    </div>
  );
}