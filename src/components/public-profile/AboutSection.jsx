import React from "react";
import { MapPin, Calendar, Globe, Briefcase, GraduationCap, Sparkles } from "lucide-react";

export default function AboutSection({ profile }) {
  const joinDate = profile?.created_date ? new Date(profile.created_date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : null;
  const accountAge = profile?.created_date ? Math.floor((Date.now() - new Date(profile.created_date).getTime()) / (1000 * 60 * 60 * 24)) : null;

  const items = [
    profile?.bio && { icon: Sparkles, label: "Bio", value: profile.bio },
    profile?.country && { icon: MapPin, label: "Country", value: profile.country },
    profile?.language && { icon: Globe, label: "Language", value: profile.language },
    profile?.zodiac && { icon: Sparkles, label: "Zodiac", value: profile.zodiac },
    joinDate && { icon: Calendar, label: "Join Date", value: joinDate },
    accountAge != null && { icon: Calendar, label: "Account Age", value: `${accountAge} days` },
  ].filter(Boolean);

  if (items.length === 0) return null;

  return (
    <div className="px-3 pt-4">
      <h2 className="text-sm font-bold text-gray-800 mb-2">About</h2>
      <div className="bg-white rounded-2xl border border-gray-50 shadow-sm divide-y divide-gray-50">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-3 p-3">
            <item.icon size={16} className="text-gray-400 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-[10px] text-gray-400">{item.label}</p>
              <p className="text-xs font-medium text-gray-700">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Interests */}
      {profile?.interests?.length > 0 && (
        <div className="mt-2 bg-white rounded-2xl border border-gray-50 shadow-sm p-3">
          <p className="text-[10px] text-gray-400 mb-1.5">Interests</p>
          <div className="flex flex-wrap gap-1.5">
            {profile.interests.map((tag, i) => (
              <span key={i} className="px-2 py-0.5 rounded-full bg-purple-50 text-purple-600 text-[10px] font-medium">#{tag}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}