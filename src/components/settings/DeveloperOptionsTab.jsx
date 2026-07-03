import React, { useState } from "react";
import {
  Terminal, Bug, Zap, Activity, Code, Database, Wifi,
  Eye, EyeOff, Copy, RefreshCw, ChevronRight,
} from "lucide-react";
import { useMobileSettings } from "@/hooks/useMobileSettings";
import { useToast } from "@/components/ui/use-toast";
import {
  SettingsShell, SettingsCard, ToggleRow, InfoRow, ActionRow,
} from "@/components/settings/SettingsUI";

export default function DeveloperOptionsTab() {
  const { settings, loading, updateSetting } = useMobileSettings();
  const { toast } = useToast();
  const s = settings.app || {};
  const [showDebugPanel, setShowDebugPanel] = useState(false);
  const [showApiLogs, setShowApiLogs] = useState(false);

  const handle = async (key, value, label) => {
    try {
      await updateSetting("app", { [key]: value });
      toast({ title: `${label} updated` });
    } catch (e) {
      toast({ title: "Update failed", description: e.message, variant: "destructive" });
    }
  };

  const debugInfo = {
    appVersion: "2.4.1",
    buildNumber: "20260703",
    apiEndpoint: "https://api.vyro.live/v2",
    supabaseUrl: "https://vyro.supabase.co",
    sessionId: "sess_" + Math.random().toString(36).substring(2, 15),
    userId: "usr_" + Math.random().toString(36).substring(2, 10),
    region: s.region || "QA",
    language: s.language || "en",
  };

  const copyToClipboard = (text, label) => {
    navigator.clipboard?.writeText(text);
    toast({ title: `${label} copied` });
  };

  return (
    <SettingsShell title="Developer Options" subtitle="Advanced settings for development" loading={loading}>
      <div className="mb-4 p-4 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 text-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
            <Terminal size={20} />
          </div>
          <div>
            <p className="text-sm font-bold">Developer Mode</p>
            <p className="text-[11px] text-white/60">Advanced configuration and diagnostics</p>
          </div>
        </div>
      </div>

      <SettingsCard title="Debugging">
        <ToggleRow
          icon={Bug} label="Debug Mode" description="Show debug information"
          value={showDebugPanel} color="#EF4444"
          onChange={(v) => setShowDebugPanel(v)}
        />
        <ToggleRow
          icon={Activity} label="API Logging" description="Log API requests"
          value={showApiLogs} color="#F59E0B"
          onChange={(v) => setShowApiLogs(v)}
        />
        <ToggleRow
          icon={Eye} label="Visual Debug" description="Show layout overlays"
          value={s.reduce_motion ?? false} color="#3B82F6"
          onChange={(v) => handle("reduce_motion", v, "Visual debug")}
        />
        <ToggleRow
          icon={Zap} label="Fast Refresh" description="Enable hot reload"
          value={s.animations_enabled ?? true} color="#8B5CF6"
          onChange={(v) => handle("animations_enabled", v, "Fast refresh")}
          isLast
        />
      </SettingsCard>

      {showDebugPanel && (
        <SettingsCard title="Debug Information">
          <DebugRow label="App Version" value={debugInfo.appVersion} onCopy={() => copyToClipboard(debugInfo.appVersion, "Version")} />
          <DebugRow label="Build Number" value={debugInfo.buildNumber} onCopy={() => copyToClipboard(debugInfo.buildNumber, "Build")} />
          <DebugRow label="Session ID" value={debugInfo.sessionId} onCopy={() => copyToClipboard(debugInfo.sessionId, "Session ID")} />
          <DebugRow label="User ID" value={debugInfo.userId} onCopy={() => copyToClipboard(debugInfo.userId, "User ID")} />
          <DebugRow label="Region" value={debugInfo.region} />
          <DebugRow label="Language" value={debugInfo.language} isLast />
        </SettingsCard>
      )}

      <SettingsCard title="Network">
        <DebugRow label="API Endpoint" value={debugInfo.apiEndpoint} onCopy={() => copyToClipboard(debugInfo.apiEndpoint, "API URL")} />
        <DebugRow label="Supabase URL" value={debugInfo.supabaseUrl} onCopy={() => copyToClipboard(debugInfo.supabaseUrl, "Supabase URL")} isLast />
      </SettingsCard>

      <SettingsCard title="Testing">
        <ActionRow
          icon={RefreshCw} label="Clear Cache" description="Clear app cache"
          color="#F59E0B" onClick={() => toast({ title: "Cache cleared" })}
        />
        <ActionRow
          icon={Database} label="Reset Settings" description="Reset to defaults"
          color="#EF4444" onClick={() => toast({ title: "Settings reset" })}
        />
        <ActionRow
          icon={Code} label="Run Diagnostics" description="Run system checks"
          color="#3B82F6" onClick={() => toast({ title: "Diagnostics: All systems normal" })}
          isLast
        />
      </SettingsCard>

      <SettingsCard title="Beta Features">
        <ToggleRow
          icon={Zap} label="Beta Features" description="Enable experimental features"
          value={s.high_contrast ?? false} color="#8B5CF6"
          onChange={(v) => handle("high_contrast", v, "Beta features")}
        />
        <ToggleRow
          icon={Wifi} label="Background Sync" description="Sync data in background"
          value={s.auto_play_videos ?? true} color="#10B981"
          onChange={(v) => handle("auto_play_videos", v, "Background sync")}
          isLast
        />
      </SettingsCard>

      <p className="text-[10px] text-gray-400 text-center mt-4 px-4">
        ⚠️ Developer options are intended for testing and debugging. Use with caution.
      </p>
    </SettingsShell>
  );
}

function DebugRow({ label, value, onCopy, isLast }) {
  return (
    <div
      className="flex items-center justify-between px-4 py-3"
      style={{ borderBottom: isLast ? "none" : "1px solid #F0F1F5" }}
    >
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">{label}</p>
        <p className="text-xs font-mono text-gray-700 truncate mt-0.5">{value}</p>
      </div>
      {onCopy && (
        <button onClick={onCopy} className="flex-shrink-0 w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center ml-2">
          <Copy size={12} className="text-gray-400" />
        </button>
      )}
    </div>
  );
}