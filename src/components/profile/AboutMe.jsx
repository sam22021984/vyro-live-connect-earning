import React from "react";
import { Globe, MapPin, Calendar, Sparkles, User, PenTool } from "lucide-react";

export default function AboutMe({ profile }) {
  const bio = profile?.bio || "No bio added yet. Edit your profile to add a bio.";

  const details = [
    { icon: Globe, label: "Language", value: profile?.language || "Not set" },
    { icon: MapPin, label: "Country", value: profile?.country || "Not set" },
    { icon: Calendar, label: "Birthday", value: profile?.birthday || "Not set" },
    { icon: Sparkles, label: "Zodiac", value: profile?.zodiac || "Not set" },
    { icon: User, label: "Gender", value: profile?.gender || "Not set" },
  ];

  const signature = profile?.signature || "No signature set";

  return (
    <div className="px-4 mb-4">
      <div className="bg-white rounded-[20px] p-4 shadow-sm border border-gray-50">
        <div className="flex items-center gap-2 mb-4">
          <PenTool size={16} className="text-gray-600" />
          <h3 className="text-sm font-bold text-gray-800">About Me</h3>
        </div>

        {/* Bio */}
        <div className="bg-purple-50/60 rounded-[14px] p-3 mb-4">
          <p className="text-xs text-gray-600 leading-relaxed italic">"{bio}"</p>
        </div>

        {/* Details */}
        <div className="space-y-3 mb-4">
          {details.map((d, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <d.icon size={14} className="text-gray-400" />
                <span className="text-xs text-gray-500">{d.label}</span>
              </div>
              <span className="text-xs font-medium text-gray-700">{d.value}</span>
            </div>
          ))}
        </div>

        {/* Signature */}
        <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
          <PenTool size={12} className="text-purple-400" />
          <span className="text-[11px] text-gray-500 font-medium">Signature</span>
        </div>
        <p className="text-xs text-purple-600 italic mt-1.5">{signature}</p>
      </div>
    </div>
  );
}