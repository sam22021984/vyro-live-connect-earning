import React, { useState } from "react";
import {
  HardDrive, Image, Download, FileText, Trash2, Wifi,
  Save, RefreshCw, Database, AlertTriangle,
} from "lucide-react";
import { useMobileSettings } from "@/hooks/useMobileSettings";
import { useToast } from "@/components/ui/use-toast";
import {
  SettingsShell, SettingsCard, ToggleRow, SelectRow, ActionRow,
} from "@/components/settings/SettingsUI";

export default function StorageDataTab() {
  const { settings, loading, updateSetting, clearCache, clearAllData } = useMobileSettings();
  const { toast } = useToast();
  const s = settings.storage || {};
  const [confirmClearAll, setConfirmClearAll] = useState(false);

  const handle = async (key, value, label) => {
    try {
      await updateSetting("storage", { [key]: value });
      toast({ title: `${label} updated` });
    } catch (e) {
      toast({ title: "Update failed", description: e.message, variant: "destructive" });
    }
  };

  const handleClearCache = async () => {
    try {
      await clearCache();
      toast({ title: "Cache cleared successfully" });
    } catch (e) {
      toast({ title: "Failed to clear cache", description: e.message, variant: "destructive" });
    }
  };

  const handleClearAll = async () => {
    try {
      await clearAllData();
      toast({ title: "All data cleared successfully" });
      setConfirmClearAll(false);
    } catch (e) {
      toast({ title: "Failed to clear data", description: e.message, variant: "destructive" });
    }
  };

  const formatSize = (mb) => {
    if (mb >= 1024) return `${(mb / 1024).toFixed(1)} GB`;
    return `${Math.round(mb)} MB`;
  };

  const total = s.total_size_mb || 0;
  const segments = [
    { label: "Cache", value: s.cache_size_mb || 0, icon: Database, color: "#EF4444" },
    { label: "Media", value: s.media_size_mb || 0, icon: Image, color: "#3B82F6" },
    { label: "Downloads", value: s.downloads_size_mb || 0, icon: Download, color: "#F59E0B" },
    { label: "Documents", value: s.documents_size_mb || 0, icon: FileText, color: "#10B981" },
  ];

  return (
    <SettingsShell title="Storage & Data" subtitle="Manage app storage and data usage" loading={loading}>
      {/* Storage Overview */}
      <div className="mb-4 p-5 rounded-2xl bg-gradient-to-br from-purple-500 to-violet-600 text-white">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <HardDrive size={20} />
          </div>
          <div>
            <p className="text-sm font-bold">Total Storage Used</p>
            <p className="text-[11px] text-white/80">{formatSize(total)}</p>
          </div>
        </div>
        {/* Stacked bar */}
        <div className="h-3 rounded-full bg-white/20 overflow-hidden flex">
          {segments.map((seg) => {
            const pct = total > 0 ? (seg.value / total) * 100 : 0;
            return pct > 0 ? (
              <div key={seg.label} style={{ width: `${pct}%`, background: seg.color }} />
            ) : null;
          })}
        </div>
        {/* Legend */}
        <div className="grid grid-cols-2 gap-2 mt-3">
          {segments.map((seg) => (
            <div key={seg.label} className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: seg.color }} />
              <span className="text-[10px] text-white/90 font-medium">{seg.label}: {formatSize(seg.value)}</span>
            </div>
          ))}
        </div>
      </div>

      <SettingsCard title="Storage Breakdown">
        {segments.map((seg, i) => (
          <div
            key={seg.label}
            className="flex items-center justify-between px-4 py-3.5"
            style={{ borderBottom: i === segments.length - 1 ? "none" : "1px solid #F0F1F5" }}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${seg.color}12` }}>
                <seg.icon size={16} style={{ color: seg.color }} />
              </div>
              <p className="text-sm font-semibold text-gray-800">{seg.label}</p>
            </div>
            <span className="text-xs font-medium text-gray-400">{formatSize(seg.value)}</span>
          </div>
        ))}
      </SettingsCard>

      <SettingsCard title="Data Usage">
        <ToggleRow
          icon={Wifi} label="Wi-Fi Only Downloads" description="Only download on Wi-Fi"
          value={s.wifi_only_downloads ?? true} color="#10B981"
          onChange={(v) => handle("wifi_only_downloads", v, "Wi-Fi only")}
        />
        <SelectRow
          icon={Download} label="Download Quality" description="Media download quality"
          value={s.download_quality || "auto"} color="#3B82F6"
          options={[
            { value: "auto", label: "Auto" },
            { value: "high", label: "High" },
            { value: "standard", label: "Standard" },
            { value: "low", label: "Low" },
          ]}
          onChange={(v) => handle("download_quality", v, "Download quality")}
        />
        <ToggleRow
          icon={Save} label="Save to Gallery" description="Auto-save media to gallery"
          value={s.save_to_gallery ?? false} color="#EC4899"
          onChange={(v) => handle("save_to_gallery", v, "Save to gallery")}
          isLast
        />
      </SettingsCard>

      <SettingsCard title="Cache Management">
        <ToggleRow
          icon={RefreshCw} label="Auto Clear Cache" description="Automatically clear old cache"
          value={s.auto_clear_cache ?? false} color="#8B5CF6"
          onChange={(v) => handle("auto_clear_cache", v, "Auto clear cache")}
        />
        {s.auto_clear_cache && (
          <div className="flex items-center justify-between px-4 py-3.5" style={{ borderBottom: "1px solid #F0F1F5" }}>
            <p className="text-sm font-semibold text-gray-800">Clear Interval</p>
            <select
              value={s.auto_clear_interval_days || 7}
              onChange={(e) => handle("auto_clear_interval_days", parseInt(e.target.value), "Interval")}
              className="text-xs font-semibold bg-gray-50 rounded-lg px-3 py-2 outline-none"
              style={{ border: "1px solid #E5E7EB", color: "#1A1B3A" }}
            >
              <option value={1}>Every day</option>
              <option value={7}>Every week</option>
              <option value={14}>Every 2 weeks</option>
              <option value={30}>Every month</option>
            </select>
          </div>
        )}
        <ActionRow
          icon={Trash2} label="Clear Cache Now" description="Free up cache storage"
          color="#F59E0B" onClick={handleClearCache}
          isLast
        />
      </SettingsCard>

      {/* Danger zone */}
      <SettingsCard title="Danger Zone">
        {!confirmClearAll ? (
          <ActionRow
            icon={AlertTriangle} label="Clear All Data" description="Remove all downloaded content"
            color="#EF4444" danger onClick={() => setConfirmClearAll(true)}
          />
        ) : (
          <div className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle size={16} className="text-red-500" />
              <p className="text-xs font-semibold text-gray-700">
                Are you sure? This will permanently delete all downloaded media and documents.
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setConfirmClearAll(false)}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-gray-100 text-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleClearAll}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-red-500 text-white active:scale-95"
              >
                Clear All
              </button>
            </div>
          </div>
        )}
      </SettingsCard>

      {s.last_cleared_date && (
        <p className="text-[10px] text-gray-400 text-center mt-2">
          Last cleared: {new Date(s.last_cleared_date).toLocaleDateString()}
        </p>
      )}
    </SettingsShell>
  );
}