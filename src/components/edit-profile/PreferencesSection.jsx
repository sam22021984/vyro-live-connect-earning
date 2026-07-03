import React from "react";
import { Globe, Lock, Users, Eye, EyeOff } from "lucide-react";

export default function PreferencesSection({ form, onChange }) {
  const privacyOptions = [
    { value: "everyone", label: "Public Profile", icon: Globe, desc: "Visible to everyone" },
    { value: "friends_only", label: "Friends Only", icon: Users, desc: "Only friends can view" },
    { value: "private", label: "Private Mode", icon: Lock, desc: "Hidden from search" },
  ];

  return (
    <div className="space-y-4">
      {/* Privacy Settings Shortcut */}
      <div>
        <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Privacy Settings</label>
        <div className="grid grid-cols-3 gap-2">
          {privacyOptions.map((opt) => {
            const active = form.privacy_level === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => onChange({ ...form, privacy_level: opt.value })}
                className={`flex flex-col items-center gap-1 p-2.5 rounded-xl border transition active:scale-95 ${active ? "border-purple-400 bg-purple-50" : "border-gray-100 bg-white"}`}
              >
                <opt.icon size={16} className={active ? "text-purple-500" : "text-gray-400"} />
                <span className={`text-[9px] font-bold text-center ${active ? "text-purple-600" : "text-gray-500"}`}>{opt.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Activity Status */}
      <div className="bg-white rounded-xl border border-gray-100 p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {form.show_online_status ? <Eye size={16} className="text-green-500" /> : <EyeOff size={16} className="text-gray-400" />}
          <div>
            <p className="text-xs font-bold text-gray-700">Activity Status</p>
            <p className="text-[9px] text-gray-400">{form.show_online_status ? "Online status visible" : "Online status hidden"}</p>
          </div>
        </div>
        <button
          onClick={() => onChange({ ...form, show_online_status: !form.show_online_status })}
          className={`w-10 h-6 rounded-full transition ${form.show_online_status ? "bg-green-500" : "bg-gray-200"}`}
        >
          <div className={`w-4 h-4 rounded-full bg-white transition-transform ${form.show_online_status ? "translate-x-5" : "translate-x-1"}`} />
        </button>
      </div>
    </div>
  );
}