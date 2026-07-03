import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Bell, MessageCircle, Wallet, ChevronDown, RefreshCw, QrCode } from "lucide-react";
import { COUNTRY_LIST } from "@/components/application-id/countryConfig";

export default function HomeHeader({ country, onCountryChange, onRefresh, refreshing, onSearch }) {
  const navigate = useNavigate();
  const [showCountries, setShowCountries] = useState(false);
  const selected = COUNTRY_LIST.find((c) => c.code === country);

  return (
    <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-xl border-b border-gray-50">
      <div className="flex items-center gap-2 px-3 py-2.5">
        {/* Logo — tap to refresh */}
        <button
          onClick={onRefresh}
          className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center active:scale-90 transition flex-shrink-0"
        >
          {refreshing ? <RefreshCw size={16} className="text-white animate-spin" /> : <span className="text-base">🎙️</span>}
        </button>

        {/* Country selector */}
        <button
          onClick={() => setShowCountries(!showCountries)}
          className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-gray-50 active:scale-95 transition flex-shrink-0"
        >
          <span className="text-base">{selected?.flag || "🌍"}</span>
          <ChevronDown size={12} className="text-gray-400" />
        </button>

        <div className="flex-1" />

        {/* Action icons */}
        <button onClick={onSearch} className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center active:scale-90 transition">
          <Search size={17} className="text-gray-600" />
        </button>
        <button onClick={() => navigate("/message-center")} className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center active:scale-90 transition relative">
          <Bell size={17} className="text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
        </button>
        <button onClick={() => navigate("/messages")} className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center active:scale-90 transition relative">
          <MessageCircle size={17} className="text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
        </button>
        <button onClick={() => navigate("/finance")} className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center active:scale-90 transition flex-shrink-0">
          <Wallet size={16} className="text-white" />
        </button>
      </div>

      {/* Country dropdown */}
      {showCountries && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-xl border-b border-gray-50 max-h-64 overflow-y-auto z-40">
          <button
            onClick={() => { onCountryChange("ALL"); setShowCountries(false); }}
            className="w-full flex items-center gap-3 px-4 py-2.5 active:bg-gray-50 transition"
          >
            <span className="text-xl">🌍</span>
            <span className="text-sm font-medium text-gray-700">All Countries</span>
          </button>
          {COUNTRY_LIST.map((c) => (
            <button
              key={c.code}
              onClick={() => { onCountryChange(c.code); setShowCountries(false); }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 active:bg-gray-50 transition ${country === c.code ? "bg-purple-50" : ""}`}
            >
              <span className="text-xl">{c.flag}</span>
              <span className="text-sm font-medium text-gray-700">{c.name}</span>
              <span className="text-xs text-gray-400">+{c.calling_code}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}