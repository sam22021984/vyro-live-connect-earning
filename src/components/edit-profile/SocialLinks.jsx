import React, { useState } from "react";
import { Instagram, Youtube, Link as LinkIcon, AlertCircle } from "lucide-react";

export default function SocialLinks({ links, onChange }) {
  const [errors, setErrors] = useState({});

  const validateUrl = (url) => {
    if (!url) return null;
    try { new URL(url); return null; } catch { return "Invalid URL format"; }
  };

  const handleChange = (key, value) => {
    const newLinks = { ...links, [key]: value };
    onChange(newLinks);
    setErrors({ ...errors, [key]: validateUrl(value) });
  };

  const fields = [
    { key: "instagram", label: "Instagram", placeholder: "https://instagram.com/...", icon: Instagram, color: "text-pink-500" },
    { key: "tiktok", label: "TikTok", placeholder: "https://tiktok.com/@...", icon: LinkIcon, color: "text-gray-700" },
    { key: "youtube", label: "YouTube", placeholder: "https://youtube.com/@...", icon: Youtube, color: "text-red-500" },
    { key: "website", label: "External URL", placeholder: "https://...", icon: LinkIcon, color: "text-blue-500" },
  ];

  return (
    <div>
      <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Social Links (Optional)</label>
      <div className="space-y-2">
        {fields.map((f) => (
          <div key={f.key}>
            <div className="relative">
              <f.icon size={14} className={`absolute left-3 top-1/2 -translate-y-1/2 ${f.color}`} />
              <input
                type="url"
                value={links[f.key] || ""}
                onChange={(e) => handleChange(f.key, e.target.value)}
                placeholder={f.placeholder}
                className="w-full rounded-xl border border-gray-200 bg-white pl-9 pr-3 py-2.5 text-sm"
              />
            </div>
            {errors[f.key] && <p className="text-[10px] text-red-500 mt-0.5 flex items-center gap-1"><AlertCircle size={9} /> {errors[f.key]}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}