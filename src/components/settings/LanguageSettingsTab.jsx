import React from "react";
import { Globe, Check } from "lucide-react";
import { useMobileSettings } from "@/hooks/useMobileSettings";
import { useToast } from "@/components/ui/use-toast";
import { SettingsShell, SettingsCard } from "@/components/settings/SettingsUI";

const LANGUAGES = [
  { code: "en", name: "English", native: "English", flag: "🇬🇧" },
  { code: "ar", name: "Arabic", native: "العربية", flag: "🇶🇦" },
  { code: "ur", name: "Urdu", native: "اردو", flag: "🇵🇰" },
  { code: "hi", name: "Hindi", native: "हिन्दी", flag: "🇮🇳" },
  { code: "tr", name: "Turkish", native: "Türkçe", flag: "🇹🇷" },
  { code: "bn", name: "Bengali", native: "বাংলা", flag: "🇧🇩" },
  { code: "fa", name: "Persian", native: "فارسی", flag: "🇮🇷" },
  { code: "fr", name: "French", native: "Français", flag: "🇫🇷" },
  { code: "es", name: "Spanish", native: "Español", flag: "🇪🇸" },
  { code: "id", name: "Indonesian", native: "Bahasa Indonesia", flag: "🇮🇩" },
  { code: "ms", name: "Malay", native: "Bahasa Melayu", flag: "🇲🇾" },
  { code: "ne", name: "Nepali", native: "नेपाली", flag: "🇳🇵" },
];

export default function LanguageSettingsTab() {
  const { settings, loading, updateSetting } = useMobileSettings();
  const { toast } = useToast();
  const current = settings.app?.language || "en";

  const handleSelect = async (code, name) => {
    try {
      await updateSetting("app", { language: code });
      toast({ title: `Language set to ${name}` });
    } catch (e) {
      toast({ title: "Failed to change language", description: e.message, variant: "destructive" });
    }
  };

  return (
    <SettingsShell title="Language Settings" subtitle="Choose your preferred language" loading={loading}>
      <div className="mb-4 p-4 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-500 text-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <Globe size={20} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-bold">App Language</p>
            <p className="text-[11px] text-white/80">
              Current: {LANGUAGES.find((l) => l.code === current)?.name || "English"}
            </p>
          </div>
        </div>
      </div>

      <SettingsCard title="Available Languages">
        {LANGUAGES.map((lang, i) => (
          <button
            key={lang.code}
            onClick={() => handleSelect(lang.code, lang.name)}
            className="w-full flex items-center justify-between px-4 py-3.5 transition active:bg-gray-50"
            style={{ borderBottom: i === LANGUAGES.length - 1 ? "none" : "1px solid #F0F1F5" }}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{lang.flag}</span>
              <div className="text-left">
                <p className="text-sm font-semibold text-gray-800">{lang.name}</p>
                <p className="text-[10px] text-gray-400">{lang.native}</p>
              </div>
            </div>
            {current === lang.code && (
              <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                <Check size={14} className="text-green-600" />
              </div>
            )}
          </button>
        ))}
      </SettingsCard>

      <p className="text-[10px] text-gray-400 text-center mt-4 px-4">
        The selected language will be applied throughout the application to provide a localized experience.
      </p>
    </SettingsShell>
  );
}