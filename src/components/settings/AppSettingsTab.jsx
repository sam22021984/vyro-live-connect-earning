import React from "react";
import {
  Palette, Type, Sparkles, Volume2, Vibrate, Eye, Play, Layout,
  Image, Home, Calendar, Clock, Globe,
} from "lucide-react";
import { useMobileSettings } from "@/hooks/useMobileSettings";
import { useToast } from "@/components/ui/use-toast";
import {
  SettingsShell, SettingsCard, ToggleRow, SelectRow,
} from "@/components/settings/SettingsUI";

export default function AppSettingsTab() {
  const { settings, loading, updateSetting } = useMobileSettings();
  const { toast } = useToast();
  const s = settings.app || {};

  const handle = async (key, value, label) => {
    try {
      await updateSetting("app", { [key]: value });
      toast({ title: `${label} updated` });
    } catch (e) {
      toast({ title: "Update failed", description: e.message, variant: "destructive" });
    }
  };

  return (
    <SettingsShell title="App Settings" subtitle="Personalize your experience" loading={loading}>
      <SettingsCard title="Appearance">
        <SelectRow
          icon={Palette} label="Theme" description="Light, dark, or system"
          value={s.theme || "system"} color="#8B5CF6"
          options={[
            { value: "system", label: "Follow System" },
            { value: "light", label: "Light" },
            { value: "dark", label: "Dark" },
          ]}
          onChange={(v) => handle("theme", v, "Theme")}
        />
        <SelectRow
          icon={Type} label="Font Size" description="Adjust text size"
          value={s.font_size || "medium"} color="#3B82F6"
          options={[
            { value: "small", label: "Small" },
            { value: "medium", label: "Medium" },
            { value: "large", label: "Large" },
          ]}
          onChange={(v) => handle("font_size", v, "Font size")}
        />
        <ToggleRow
          icon={Eye} label="High Contrast" description="Improve visibility"
          value={s.high_contrast ?? false} color="#10B981"
          onChange={(v) => handle("high_contrast", v, "High contrast")}
        />
        <ToggleRow
          icon={Layout} label="Compact Mode" description="Reduce spacing"
          value={s.compact_mode ?? false} color="#F59E0B"
          onChange={(v) => handle("compact_mode", v, "Compact mode")}
          isLast
        />
      </SettingsCard>

      <SettingsCard title="Display & Animations">
        <ToggleRow
          icon={Sparkles} label="Animations" description="Enable UI animations"
          value={s.animations_enabled ?? true} color="#8B5CF6"
          onChange={(v) => handle("animations_enabled", v, "Animations")}
        />
        <ToggleRow
          icon={Volume2} label="Sound Effects" description="Tap and UI sounds"
          value={s.sound_effects ?? true} color="#EC4899"
          onChange={(v) => handle("sound_effects", v, "Sound effects")}
        />
        <ToggleRow
          icon={Vibrate} label="Haptic Feedback" description="Vibration on touch"
          value={s.haptic_feedback ?? true} color="#3B82F6"
          onChange={(v) => handle("haptic_feedback", v, "Haptic feedback")}
        />
        <ToggleRow
          icon={Play} label="Auto-play Videos" description="Play videos automatically"
          value={s.auto_play_videos ?? true} color="#EF4444"
          onChange={(v) => handle("auto_play_videos", v, "Auto-play")}
          isLast
        />
      </SettingsCard>

      <SettingsCard title="Media & Content">
        <SelectRow
          icon={Image} label="Image Quality" description="Image loading quality"
          value={s.image_quality || "auto"} color="#06B6D4"
          options={[
            { value: "auto", label: "Auto" },
            { value: "high", label: "High" },
            { value: "standard", label: "Standard" },
          ]}
          onChange={(v) => handle("image_quality", v, "Image quality")}
        />
        <SelectRow
          icon={Home} label="Default Landing Page" description="Page on app launch"
          value={s.default_landing_page || "home"} color="#8B5CF6"
          options={[
            { value: "home", label: "Home" },
            { value: "party", label: "Live & Audio" },
            { value: "social", label: "Social" },
            { value: "messages", label: "Messages" },
          ]}
          onChange={(v) => handle("default_landing_page", v, "Landing page")}
          isLast
        />
      </SettingsCard>

      <SettingsCard title="Regional">
        <SelectRow
          icon={Globe} label="Region" description="Your region"
          value={s.region || "QA"} color="#10B981"
          options={[
            { value: "QA", label: "Qatar" },
            { value: "AE", label: "UAE" },
            { value: "SA", label: "Saudi Arabia" },
            { value: "PK", label: "Pakistan" },
            { value: "IN", label: "India" },
            { value: "TR", label: "Turkey" },
            { value: "GB", label: "United Kingdom" },
            { value: "US", label: "United States" },
          ]}
          onChange={(v) => handle("region", v, "Region")}
        />
        <SelectRow
          icon={Calendar} label="Date Format" description="Date display format"
          value={s.date_format || "dd/mm/yyyy"} color="#F59E0B"
          options={[
            { value: "dd/mm/yyyy", label: "DD/MM/YYYY" },
            { value: "mm/dd/yyyy", label: "MM/DD/YYYY" },
            { value: "yyyy-mm-dd", label: "YYYY-MM-DD" },
          ]}
          onChange={(v) => handle("date_format", v, "Date format")}
        />
        <SelectRow
          icon={Clock} label="Time Format" description="12h or 24h"
          value={s.time_format || "12h"} color="#3B82F6"
          options={[
            { value: "12h", label: "12 Hour" },
            { value: "24h", label: "24 Hour" },
          ]}
          onChange={(v) => handle("time_format", v, "Time format")}
        />
        <SelectRow
          icon={Calendar} label="First Day of Week"
          value={s.first_day_of_week || "sunday"} color="#8B5CF6"
          options={[
            { value: "sunday", label: "Sunday" },
            { value: "monday", label: "Monday" },
            { value: "saturday", label: "Saturday" },
          ]}
          onChange={(v) => handle("first_day_of_week", v, "First day of week")}
          isLast
        />
      </SettingsCard>
    </SettingsShell>
  );
}