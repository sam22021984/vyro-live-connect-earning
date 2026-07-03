import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save, ShieldAlert, Loader2, Camera, Image as ImageIcon } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";
import { useContentModeration } from "@/hooks/useContentModeration";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const TEXT_FIELDS = [
  { key: "username", label: "Username", type: "input", max: 30 },
  { key: "title", label: "Title", type: "input", max: 50 },
  { key: "bio", label: "Bio", type: "textarea", max: 200 },
  { key: "signature", label: "Signature", type: "input", max: 100 },
  { key: "country", label: "Country", type: "input", max: 50 },
  { key: "birthday", label: "Birthday", type: "input", max: 50 },
  { key: "gender", label: "Gender", type: "select", options: ["", "Male", "Female", "Other"] },
];

// Fields that contribute to profile completion (key → weight %)
const COMPLETION_FIELDS = {
  avatar_url: 25,
  cover_url: 20,
  bio: 15,
  signature: 10,
  title: 10,
  country: 10,
  birthday: 5,
  gender: 5,
};

function calculateCompletion(form) {
  let pct = 0;
  for (const [key, weight] of Object.entries(COMPLETION_FIELDS)) {
    if (form[key] && String(form[key]).trim()) pct += weight;
  }
  return Math.min(pct, 100);
}

export default function EditProfile() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const { moderate, moderating } = useContentModeration();
  const [profileId, setProfileId] = useState(null);
  const [form, setForm] = useState({});
  const [prevForm, setPrevForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingField, setUploadingField] = useState(null);
  const [moderationError, setModerationError] = useState(null);

  useEffect(() => {
    if (!user?.id) return;
    loadProfile();
  }, [user?.id]);

  const loadProfile = async () => {
    try {
      const profiles = await base44.entities.UserProfile.filter({ user_id: user.id });
      if (profiles.length > 0) {
        const p = profiles[0];
        setProfileId(p.id);
        const formData = {};
        [...Object.keys(COMPLETION_FIELDS), ...TEXT_FIELDS.map(f => f.key)].forEach((key) => {
          formData[key] = p[key] || (key === "gender" ? "" : "");
        });
        setForm(formData);
        setPrevForm({ ...formData });
      }
    } catch (e) {
      // no profile yet
    }
    setLoading(false);
  };

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setModerationError(null);
  };

  const handleImageUpload = async (key, file) => {
    if (!file) return;
    setUploadingField(key);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      handleChange(key, file_url);
      toast({ title: "✅ Image uploaded", description: "Image has been set." });
    } catch (err) {
      toast({ title: "Upload failed", description: err.message, variant: "destructive" });
    }
    setUploadingField(null);
  };

  const handleSave = async () => {
    setSaving(true);
    setModerationError(null);

    // Moderate all text fields together
    const combinedText = [form.username, form.title, form.bio, form.signature].filter(Boolean).join(" | ");
    const result = await moderate(combinedText, form.avatar_url, "profile edit");

    if (!result?.approved) {
      setModerationError(result?.reason || "Content violates community guidelines");
      setSaving(false);
      return;
    }

    try {
      const payload = {};
      TEXT_FIELDS.forEach((f) => { payload[f.key] = form[f.key] || undefined; });
      payload.avatar_url = form.avatar_url || undefined;
      payload.cover_url = form.cover_url || undefined;

      // Calculate profile completion
      const completion = calculateCompletion(form);
      payload.profile_completion = completion;

      // Award XP for newly filled fields (fields that were empty before but are now filled)
      let xpGained = 0;
      for (const key of Object.keys(COMPLETION_FIELDS)) {
        const wasEmpty = !prevForm[key] || !String(prevForm[key]).trim();
        const isFilled = form[key] && String(form[key]).trim();
        if (wasEmpty && isFilled) xpGained += 50;
      }
      // Bonus XP for completing profile
      const wasComplete = calculateCompletion(prevForm) >= 100;
      const isComplete = completion >= 100;
      if (isComplete && !wasComplete) xpGained += 200;

      if (xpGained > 0) {
        payload.user_xp = (form.user_xp || 0) + xpGained;
        payload.total_xp = (form.total_xp || 0) + xpGained;
        payload.activity_score = (form.activity_score || 0) + xpGained;
      }

      if (profileId) {
        await base44.entities.UserProfile.update(profileId, payload);
      } else {
        payload.user_id = user.id;
        await base44.entities.UserProfile.create(payload);
      }

      if (xpGained > 0) {
        toast({ title: "✅ Profile Updated", description: `+${xpGained} XP earned!` });
      } else {
        toast({ title: "✅ Profile Updated", description: "Your changes have been saved." });
      }
      navigate(-1);
    } catch (err) {
      toast({ title: "Save failed", description: err.message, variant: "destructive" });
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="sticky top-0 z-20 px-4 py-3 flex items-center gap-3 bg-white/90 backdrop-blur-xl border-b border-gray-100">
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center active:scale-95 transition">
            <ArrowLeft size={18} className="text-gray-600" />
          </button>
          <div className="flex-1">
            <h1 className="text-base font-bold text-gray-800">Edit Profile</h1>
            <p className="text-[10px] text-gray-400">Content is moderated before saving</p>
          </div>
          <Button
            onClick={handleSave}
            disabled={saving || moderating}
            size="sm"
            className="bg-purple-500 hover:bg-purple-600 text-white"
          >
            {saving || moderating ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            Save
          </Button>
        </div>

        {/* Moderation error */}
        {moderationError && (
          <div className="mx-4 mt-4 rounded-xl p-3 flex items-start gap-2 bg-red-50 border border-red-200">
            <ShieldAlert size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-red-600">Content Rejected</p>
              <p className="text-[11px] text-red-500 mt-0.5">{moderationError}</p>
            </div>
          </div>
        )}

        {/* Profile Completion Bar */}
        <div className="mx-4 mt-4 rounded-xl p-3 bg-white border border-gray-100">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-gray-600">Profile Completion</span>
            <span className="text-xs font-bold text-purple-500">{calculateCompletion(form)}%</span>
          </div>
          <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300"
              style={{ width: `${calculateCompletion(form)}%` }}
            />
          </div>
          <p className="text-[10px] text-gray-400 mt-1.5">Fill in your details to earn XP and level up</p>
        </div>

        {/* Cover Photo Upload */}
        <div className="p-4">
          <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Cover Photo</label>
          <div className="relative rounded-xl overflow-hidden border border-gray-200" style={{ height: "120px" }}>
            {form.cover_url ? (
              <img src={form.cover_url} alt="Cover" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                <ImageIcon size={28} className="text-gray-300" />
              </div>
            )}
            <label className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center cursor-pointer active:scale-90 transition">
              {uploadingField === "cover_url" ? (
                <Loader2 size={14} className="text-white animate-spin" />
              ) : (
                <Camera size={14} className="text-white" />
              )}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageUpload("cover_url", e.target.files?.[0])}
              />
            </label>
          </div>
        </div>

        {/* Avatar Upload */}
        <div className="px-4">
          <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Profile Picture</label>
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-purple-200">
                {form.avatar_url ? (
                  <img src={form.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-purple-200 to-blue-200 flex items-center justify-center text-xl font-bold text-purple-400">
                    {(form.username || "V")[0]?.toUpperCase()}
                  </div>
                )}
              </div>
              <label className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center cursor-pointer active:scale-90 transition border-2 border-white">
                {uploadingField === "avatar_url" ? (
                  <Loader2 size={10} className="text-white animate-spin" />
                ) : (
                  <Camera size={10} className="text-white" />
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageUpload("avatar_url", e.target.files?.[0])}
                />
              </label>
            </div>
            <p className="text-[11px] text-gray-400 flex-1">Tap the camera icon to upload</p>
          </div>
        </div>

        {/* Text Fields */}
        <div className="p-4 space-y-4">
          {TEXT_FIELDS.map((field) => (
            <div key={field.key}>
              <label className="text-xs font-semibold text-gray-600 mb-1.5 block">{field.label}</label>
              {field.type === "textarea" ? (
                <Textarea
                  value={form[field.key] || ""}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  maxLength={field.max}
                  placeholder={`Enter your ${field.label.toLowerCase()}`}
                  className="resize-none"
                  rows={3}
                />
              ) : field.type === "select" ? (
                <select
                  value={form[field.key] || ""}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm appearance-none"
                  style={{ height: "42px" }}
                >
                  {field.options.map((opt) => (
                    <option key={opt} value={opt}>{opt || "Select..."}</option>
                  ))}
                </select>
              ) : (
                <Input
                  value={form[field.key] || ""}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  maxLength={field.max}
                  placeholder={`Enter your ${field.label.toLowerCase()}`}
                />
              )}
              {field.max && (
                <p className="text-[9px] text-gray-300 mt-0.5 text-right">{(form[field.key] || "").length}/{field.max}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}