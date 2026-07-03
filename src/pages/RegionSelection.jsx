import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Search, Check, ArrowRight } from "lucide-react";
import { COUNTRY_LIST } from "@/components/application-id/countryConfig";
import OnboardingShell from "@/components/onboarding/OnboardingShell";

export default function RegionSelection() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(localStorage.getItem("vyro_onboarding_country") || "QAT");
  const [search, setSearch] = useState("");

  const filtered = COUNTRY_LIST.filter(
    (c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.calling_code.includes(search)
  );

  const handleContinue = () => {
    localStorage.setItem("vyro_onboarding_country", selected);
    navigate("/permissions-intro");
  };

  return (
    <OnboardingShell step={2} totalSteps={3}>
      <div className="mb-4 text-center">
        <div className="w-14 h-14 rounded-2xl bg-purple-500/20 flex items-center justify-center mx-auto mb-3">
          <MapPin size={28} className="text-purple-400" />
        </div>
        <h2 className="text-xl font-bold text-white mb-1">Select Your Region</h2>
        <p className="text-white/50 text-xs">Choose your country or region</p>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" size={18} />
        <input
          type="text"
          placeholder="Search country..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 rounded-2xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/30 outline-none focus:border-purple-400/50"
          style={{ height: "48px" }}
        />
      </div>

      {/* Country list */}
      <div className="space-y-2 max-h-[380px] overflow-y-auto scrollbar-hide">
        {filtered.map((c) => (
          <button
            key={c.code}
            onClick={() => setSelected(c.code)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl transition active:scale-[0.98] ${
              selected === c.code
                ? "bg-gradient-to-r from-purple-500/30 to-blue-500/30 border border-purple-400/50"
                : "bg-white/5 border border-white/10"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{c.flag}</span>
              <div className="text-left">
                <p className="text-sm font-semibold text-white">{c.name}</p>
                <p className="text-[10px] text-white/40">+{c.calling_code}</p>
              </div>
            </div>
            {selected === c.code && (
              <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center">
                <Check size={14} className="text-white" />
              </div>
            )}
          </button>
        ))}
        {filtered.length === 0 && (
          <p className="text-white/40 text-sm text-center py-8">No countries found</p>
        )}
      </div>

      <button
        onClick={handleContinue}
        className="w-full mt-6 rounded-2xl bg-gradient-to-r from-[#6F35E0] to-[#C135E0] text-white font-bold text-sm shadow-lg shadow-purple-500/30 transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2"
        style={{ height: "52px" }}
      >
        Continue
        <ArrowRight size={16} />
      </button>
    </OnboardingShell>
  );
}