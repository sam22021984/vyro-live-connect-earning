import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Camera, Mic, Image, HardDrive, Users, Bell, MapPin,
  ArrowRight, Shield,
} from "lucide-react";
import OnboardingShell from "@/components/onboarding/OnboardingShell";

const PERMISSIONS = [
  { icon: Camera, name: "Camera", desc: "Take photos, go live, and video call" },
  { icon: Mic, name: "Microphone", desc: "Voice chat and audio streaming" },
  { icon: Image, name: "Photos", desc: "Upload and share photos" },
  { icon: HardDrive, name: "Storage", desc: "Save media and cache data" },
  { icon: Users, name: "Contacts", desc: "Find friends from your contacts" },
  { icon: Bell, name: "Notifications", desc: "Get alerts for live streams and messages" },
  { icon: MapPin, name: "Location", desc: "Show your region and find nearby users" },
];

export default function PermissionsIntro() {
  const navigate = useNavigate();

  const handleContinue = () => {
    localStorage.setItem("vyro_first_launch", "false");
    navigate("/register");
  };

  return (
    <OnboardingShell step={3} totalSteps={3}>
      <div className="mb-4 text-center">
        <div className="w-14 h-14 rounded-2xl bg-purple-500/20 flex items-center justify-center mx-auto mb-3">
          <Shield size={28} className="text-purple-400" />
        </div>
        <h2 className="text-xl font-bold text-white mb-1">App Permissions</h2>
        <p className="text-white/50 text-xs">VYRO needs these permissions to provide the best experience</p>
      </div>

      <div className="space-y-2 mb-6">
        {PERMISSIONS.map((p, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/5 border border-white/10"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center flex-shrink-0">
              <p.icon size={18} className="text-purple-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white">{p.name}</p>
              <p className="text-[10px] text-white/40">{p.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleContinue}
        className="w-full rounded-2xl bg-gradient-to-r from-[#6F35E0] to-[#C135E0] text-white font-bold text-sm shadow-lg shadow-purple-500/30 transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2"
        style={{ height: "52px" }}
      >
        Allow
        <ArrowRight size={16} />
      </button>
      <button
        onClick={handleContinue}
        className="w-full mt-2 rounded-2xl bg-white/10 text-white/70 font-medium text-sm transition-all duration-200 active:scale-[0.98] py-3"
      >
        Not Now
      </button>
    </OnboardingShell>
  );
}