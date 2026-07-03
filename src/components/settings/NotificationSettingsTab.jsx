import React from "react";
import {
  Bell, MessageSquare, Mail, Smartphone, Radio, Users, Gift,
  Wallet, Server, Megaphone, Volume2, Vibrate, Moon, Eye, Layers,
} from "lucide-react";
import { useMobileSettings } from "@/hooks/useMobileSettings";
import { useToast } from "@/components/ui/use-toast";
import {
  SettingsShell, SettingsCard, ToggleRow, SelectRow,
} from "@/components/settings/SettingsUI";

export default function NotificationSettingsTab() {
  const { settings, loading, updateSetting } = useMobileSettings();
  const { toast } = useToast();
  const s = settings.notification || {};

  const handle = async (key, value, label) => {
    try {
      await updateSetting("notification", { [key]: value });
      toast({ title: `${label} updated` });
    } catch (e) {
      toast({ title: "Update failed", description: e.message, variant: "destructive" });
    }
  };

  return (
    <SettingsShell title="Notification Settings" subtitle="Manage alerts and notifications" loading={loading}>
      <SettingsCard title="Delivery Channels">
        <ToggleRow
          icon={Bell} label="Push Notifications" description="Receive push alerts"
          value={s.push_enabled ?? true} color="#EF4444"
          onChange={(v) => handle("push_enabled", v, "Push notifications")}
        />
        <ToggleRow
          icon={MessageSquare} label="In-App Notifications" description="Show alerts in app"
          value={s.in_app_enabled ?? true} color="#3B82F6"
          onChange={(v) => handle("in_app_enabled", v, "In-app notifications")}
        />
        <ToggleRow
          icon={Mail} label="Email Notifications" description="Receive alerts via email"
          value={s.email_enabled ?? true} color="#8B5CF6"
          onChange={(v) => handle("email_enabled", v, "Email notifications")}
        />
        <ToggleRow
          icon={Smartphone} label="SMS Notifications" description="Receive alerts via SMS"
          value={s.sms_enabled ?? false} color="#10B981"
          onChange={(v) => handle("sms_enabled", v, "SMS notifications")}
          isLast
        />
      </SettingsCard>

      <SettingsCard title="Notification Categories">
        <ToggleRow
          icon={Radio} label="Live & Audio" description="Live stream alerts"
          value={s.live_notifications ?? true} color="#EF4444"
          onChange={(v) => handle("live_notifications", v, "Live notifications")}
        />
        <ToggleRow
          icon={Users} label="Social" description="Friend requests, follows"
          value={s.social_notifications ?? true} color="#3B82F6"
          onChange={(v) => handle("social_notifications", v, "Social notifications")}
        />
        <ToggleRow
          icon={Gift} label="Gifts" description="Gift received alerts"
          value={s.gift_notifications ?? true} color="#EC4899"
          onChange={(v) => handle("gift_notifications", v, "Gift notifications")}
        />
        <ToggleRow
          icon={Wallet} label="Wallet" description="Coins and transactions"
          value={s.wallet_notifications ?? true} color="#F59E0B"
          onChange={(v) => handle("wallet_notifications", v, "Wallet notifications")}
        />
        <ToggleRow
          icon={Server} label="System" description="System alerts"
          value={s.system_notifications ?? true} color="#06B6D4"
          onChange={(v) => handle("system_notifications", v, "System notifications")}
        />
        <ToggleRow
          icon={Megaphone} label="Announcements" description="Official announcements"
          value={s.announcement_notifications ?? true} color="#8B5CF6"
          onChange={(v) => handle("announcement_notifications", v, "Announcements")}
          isLast
        />
      </SettingsCard>

      <SettingsCard title="Sound & Behavior">
        <ToggleRow
          icon={Volume2} label="Notification Sound" description="Play sound on alert"
          value={s.sound_enabled ?? true} color="#EC4899"
          onChange={(v) => handle("sound_enabled", v, "Notification sound")}
        />
        <SelectRow
          icon={Vibrate} label="Vibration Pattern" description="Vibration style"
          value={s.vibration_pattern || "default"} color="#3B82F6"
          options={[
            { value: "default", label: "Default" },
            { value: "long", label: "Long" },
            { value: "short", label: "Short" },
            { value: "none", label: "None" },
          ]}
          onChange={(v) => handle("vibration_pattern", v, "Vibration pattern")}
        />
        <ToggleRow
          icon={Eye} label="Preview Content" description="Show message preview"
          value={s.preview_content ?? true} color="#10B981"
          onChange={(v) => handle("preview_content", v, "Preview content")}
        />
        <ToggleRow
          icon={Layers} label="Group Notifications" description="Bundle similar alerts"
          value={s.group_notifications ?? true} color="#8B5CF6"
          onChange={(v) => handle("group_notifications", v, "Group notifications")}
          isLast
        />
      </SettingsCard>

      <SettingsCard title="Quiet Hours">
        <ToggleRow
          icon={Moon} label="Quiet Hours" description="Mute notifications during set hours"
          value={s.quiet_hours_enabled ?? false} color="#6366F1"
          onChange={(v) => handle("quiet_hours_enabled", v, "Quiet hours")}
        />
        {s.quiet_hours_enabled && (
          <>
            <div className="flex items-center justify-between px-4 py-3.5" style={{ borderBottom: "1px solid #F0F1F5" }}>
              <p className="text-sm font-semibold text-gray-800">Start Time</p>
              <input
                type="time"
                value={s.quiet_hours_start || "22:00"}
                onChange={(e) => handle("quiet_hours_start", e.target.value, "Start time")}
                className="text-xs font-semibold bg-gray-50 rounded-lg px-3 py-2 outline-none"
                style={{ border: "1px solid #E5E7EB", color: "#1A1B3A" }}
              />
            </div>
            <div className="flex items-center justify-between px-4 py-3.5">
              <p className="text-sm font-semibold text-gray-800">End Time</p>
              <input
                type="time"
                value={s.quiet_hours_end || "08:00"}
                onChange={(e) => handle("quiet_hours_end", e.target.value, "End time")}
                className="text-xs font-semibold bg-gray-50 rounded-lg px-3 py-2 outline-none"
                style={{ border: "1px solid #E5E7EB", color: "#1A1B3A" }}
              />
            </div>
          </>
        )}
      </SettingsCard>
    </SettingsShell>
  );
}