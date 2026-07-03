import React from "react";
import {
  Info, Smartphone, Hash, Calendar, Download, Star,
  Headset, FileText, Globe, Shield, RefreshCw,
} from "lucide-react";
import { SettingsShell, SettingsCard, InfoRow, ActionRow } from "@/components/settings/SettingsUI";
import { useNavigate } from "react-router-dom";

const APP_INFO = {
  name: "VYRO Live Connect",
  version: "2.4.1",
  build: "20260703",
  releaseDate: "July 3, 2026",
  category: "Social & Live Streaming",
  developer: "VYRO Technologies",
  website: "vyro.live",
};

export default function AboutTab() {
  const navigate = useNavigate();

  return (
    <SettingsShell title="About Application" subtitle="App information and details">
      {/* App Identity */}
      <div className="mb-4 p-6 rounded-2xl bg-gradient-to-br from-purple-500 via-violet-500 to-indigo-600 text-white text-center">
        <div className="w-20 h-20 rounded-3xl bg-white/20 flex items-center justify-center mx-auto mb-3">
          <span className="text-4xl">🎙️</span>
        </div>
        <h2 className="text-lg font-bold">{APP_INFO.name}</h2>
        <p className="text-xs text-white/80 mt-1">Version {APP_INFO.version} (Build {APP_INFO.build})</p>
      </div>

      <SettingsCard title="Application Details">
        <InfoRow icon={Info} label="App Name" value={APP_INFO.name} color="#8B5CF6" />
        <InfoRow icon={Hash} label="Version" value={APP_INFO.version} color="#3B82F6" />
        <InfoRow icon={Smartphone} label="Build Number" value={APP_INFO.build} color="#10B981" />
        <InfoRow icon={Calendar} label="Release Date" value={APP_INFO.releaseDate} color="#F59E0B" />
        <InfoRow icon={Star} label="Category" value={APP_INFO.category} color="#EC4899" />
        <InfoRow icon={Globe} label="Developer" value={APP_INFO.developer} color="#06B6D4" />
        <InfoRow icon={Shield} label="Website" value={APP_INFO.website} color="#8B5CF6" isLast />
      </SettingsCard>

      <SettingsCard title="Support Resources">
        <ActionRow
          icon={Headset} label="Customer Support" description="Get help and assistance"
          color="#3B82F6" onClick={() => navigate("/support-center")}
        />
        <ActionRow
          icon={FileText} label="Release Notes" description="What's new in this version"
          color="#10B981" onClick={() => navigate("/support-center")}
        />
        <ActionRow
          icon={Download} label="Check for Updates" description="Latest version available"
          color="#F59E0B"
        />
        <ActionRow
          icon={RefreshCw} label="Report a Bug" description="Help us improve"
          color="#EF4444" onClick={() => navigate("/support-center")}
          isLast
        />
      </SettingsCard>

      <SettingsCard title="Legal">
        <ActionRow
          icon={FileText} label="Terms & Conditions" color="#8B5CF6"
          onClick={() => navigate("/settings/9")}
        />
        <ActionRow
          icon={Shield} label="Privacy Policy" color="#3B82F6"
          onClick={() => navigate("/settings/9")}
          isLast
        />
      </SettingsCard>

      <p className="text-[10px] text-gray-400 text-center mt-4 px-4">
        © 2026 {APP_INFO.developer}. All rights reserved.
      </p>
    </SettingsShell>
  );
}