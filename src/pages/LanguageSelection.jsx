import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Globe, Check, ArrowRight } from "lucide-react";
import OnboardingShell from "@/components/onboarding/OnboardingShell";

const LANGUAGES = [
  { code: "en", name: "English", native: "English", flag: "🇬🇧" },
  { code: "ar", name: "Arabic", native: "العربية", flag: "🇶🇦" },
  { code: "ur", name: "Urdu", native: "اردو", flag: "🇵🇰" },
  { code: "hi", name: "Hindi", native: "हिन्दी", flag: "🇮🇳" },
  { code: "id", name: "Bahasa Indonesia", native: "Bahasa Indonesia", flag: "🇮🇩" },
  { code: "es", name: "Spanish", native: "Español", flag: "🇪🇸" },
  { code: "tr", name: "Turkish", native: "Türkçe", flag: "🇹🇷" },
  { code: "bn", name: "Bengali", native: "বাংলা", flag: "🇧🇩" },
  { code: "fa", name: "Persian", native: "فارسی", flag: "🇮🇷" },
  { code: "fr", name: "French", native: "Français", flag: "🇫🇷" },
  { code: "ms", name: "Malay", native: "Bahasa Melayu", flag: "🇲🇾" },
  { code: "ne", name: "Nepali", native: "नेपाली", flag: "🇳🇵" },
];

export default function LanguageSelection() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(localStorage.getItem("vyro_onboarding_language") || "en");

  const handleContinue = () => {
    localStorage.setItem("vyro_onboarding_language", selected);
    navigate("/region-selection");
  };

  return (
    <OnboardingShell step={1} totalSteps={3}>
      <div className="mb-6 text-center">
        <div className="w-14 h-14 rounded-2xl bg-purple-500/20 flex items-center justify-center mx-auto mb-3">
          <Globe size={28} className="text-purple-400" />
        </div>
        <h2 className="text-xl font-bold text-white mb-1">Select Your Language</h2>
        <p className="text-white/50 text-xs">Choose your preferred language for the app</p>
      </div>

      <div className="space-y-2">
        {LANGUAGES.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setSelected(lang.code)}
            className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition active:scale-[0.98] ${
              selected === lang.code
                ? "bg-gradient-to-r from-purple-500/30 to-blue-500/30 border border-purple-400/50"
                : "bg-white/5 border border-white/10"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{lang.flag}</span>
              <div className="text-left">
                <p className="text-sm font-semibold text-white">{lang.name}</p>
                <p className="text-[10px] text-white/40">{lang.native}</p>
              </div>
            </div>
            {selected === lang.code && (
              <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center">
                <Check size={14} className="text-white" />
              </div>
            )}
          </button>
        ))}
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