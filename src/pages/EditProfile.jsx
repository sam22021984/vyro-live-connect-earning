import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save, ShieldAlert, Loader2 } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";
import { useContentModeration } from "@/hooks/useContentModeration";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const FIELDS = [
  { key: "username", label: "Username", type: "input", max: 30 },
  { key: "title", label: "Title", type: "input", max: 50 },
  { key: "bio", label: "Bio", type: "textarea", max: 200 },
  { key: "signature", label: "Signature", type: "input", max: 100 },
  { key: "avatar_url", label: "Avatar URL", type: "input", max: 500 },
  { key: "country", label: "Country", type: "input", max: 50 },
];

export default function EditProfile() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const { moderate, moderating } = useContentModeration();
  const [profileId, setProfileId] = useState(null);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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
        FIELDS.forEach((f) => { formData[f.key] = p[f.key] || ""; });
        setForm(formData);
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
      FIELDS.forEach((f) => { payload[f.key] = form[f.key] || undefined; });
      if (profileId) {
        await base44.entities.UserProfile.update(profileId, payload);
      } else {
        payload.user_id = user.id;
        await base44.entities.UserProfile.create(payload);
      }
      toast({ title: "✅ Profile Updated", description: "Your changes have been saved." });
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

        {/* Form */}
        <div className="p-4 space-y-4">
          {FIELDS.map((field) => (
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
              ) : (
                <Input
                  value={form[field.key] || ""}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  maxLength={field.max}
                  placeholder={`Enter your ${field.label.toLowerCase()}`}
                />
              )}
              <p className="text-[9px] text-gray-300 mt-0.5 text-right">{(form[field.key] || "").length}/{field.max}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}