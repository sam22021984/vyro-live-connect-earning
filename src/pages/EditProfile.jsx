import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save, ShieldAlert, Loader2, Clock, ChevronRight } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";
import { useContentModeration } from "@/hooks/useContentModeration";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import MediaUploader from "@/components/edit-profile/MediaUploader";
import UsernameField from "@/components/edit-profile/UsernameField";
import DisplayNameField from "@/components/edit-profile/DisplayNameField";
import UserIdField from "@/components/edit-profile/UserIdField";
import CategoryTags from "@/components/edit-profile/CategoryTags";
import LanguageSelector from "@/components/edit-profile/LanguageSelector";
import SocialLinks from "@/components/edit-profile/SocialLinks";
import PreferencesSection from "@/components/edit-profile/PreferencesSection";
import { useBackNav } from "@/hooks/useBackNav";

const COUNTRIES = ["Qatar", "Saudi Arabia", "UAE", "Kuwait", "Bahrain", "Oman", "Egypt", "Jordan", "Lebanon", "Morocco", "Algeria", "Tunisia", "Iraq", "Sudan", "Turkey", "Indonesia", "Malaysia", "India", "Pakistan", "Bangladesh", "United States", "United Kingdom", "Other"];

export default function EditProfile() {
  const navigate = useNavigate();
  const handleBack = useBackNav("/profile-dashboard");
  const { user } = useAuth();
  const { toast } = useToast();
  const { moderate, moderating } = useContentModeration();
  const [profileId, setProfileId] = useState(null);
  const [form, setForm] = useState({});
  const [prevForm, setPrevForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [moderationError, setModerationError] = useState(null);

  useEffect(() => {
    if (!user?.id) return;
    loadProfile();
  }, [user?.id]);

  const loadProfile = async () => {
    try {
      const res = await base44.functions.invoke("userOnboarding", { action: "getProfile" });
      const p = res.data?.profile;
      if (p) {
        setProfileId(p.id);
        const formData = {
          username: p.username || "",
          full_name: p.full_name || "",
          bio: p.bio || "",
          country: p.country || "",
          gender: p.gender || "",
          birthday: p.birthday || "",
          avatar_url: p.avatar_url || "",
          cover_url: p.cover_url || "",
          interests: p.interests || [],
          languages: p.languages || (p.language ? [p.language] : ["English"]),
          social_links: p.social_links || {},
          privacy_level: p.privacy_level || "everyone",
          show_online_status: p.show_online_status !== false,
          global_id: p.global_id || "",
        };
        setForm(formData);
        setPrevForm({ ...formData });
      }
    } catch (e) {}
    setLoading(false);
  };

  const hasChanges = JSON.stringify(form) !== JSON.stringify(prevForm);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setModerationError(null);
  };

  const handleSave = async () => {
    setSaving(true);
    setModerationError(null);

    // Validate
    if (!form.username || form.username.length < 4) {
      toast({ title: "Username must be 4+ characters", variant: "destructive" });
      setSaving(false);
      return;
    }
    if (!form.full_name || form.full_name.length < 2) {
      toast({ title: "Display name must be 2+ characters", variant: "destructive" });
      setSaving(false);
      return;
    }

    // Moderation
    const combinedText = [form.username, form.full_name, form.bio].filter(Boolean).join(" | ");
    const result = await moderate(combinedText, form.avatar_url, "profile edit");

    if (!result?.approved) {
      setModerationError(result?.reason || "Content violates community guidelines");
      setSaving(false);
      return;
    }

    try {
      const payload = {
        username: form.username,
        full_name: form.full_name,
        bio: form.bio || undefined,
        country: form.country || undefined,
        gender: form.gender || undefined,
        birthday: form.birthday || undefined,
        avatar_url: form.avatar_url || undefined,
        cover_url: form.cover_url || undefined,
        interests: form.interests || [],
        language: (form.languages || [])[0] || "English",
        social_links: form.social_links || {},
      };

      await base44.functions.invoke("userOnboarding", {
        action: "updateProfile",
        ...payload,
      });

      // Sync state
      setSyncing(true);
      setPrevForm({ ...form });

      toast({ title: "✅ Profile updated successfully" });

      setTimeout(() => {
        setSyncing(false);
        setSaving(false);
        navigate(-1);
      }, 1000);
    } catch (err) {
      toast({ title: "Save failed", description: err.message, variant: "destructive" });
      setSaving(false);
    }
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
          <button onClick={handleBack} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center active:scale-95 transition">
            <ArrowLeft size={18} className="text-gray-600" />
          </button>
          <div className="flex-1">
            <h1 className="text-base font-bold text-gray-800">Edit Profile</h1>
            <p className="text-[10px] text-gray-400">Content is moderated before saving</p>
          </div>
          <Button
            onClick={handleSave}
            disabled={!hasChanges || saving || moderating}
            size="sm"
            className="bg-purple-500 hover:bg-purple-600 text-white"
          >
            {saving || moderating ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            Save
          </Button>
        </div>

        {/* Syncing banner */}
        {syncing && (
          <div className="px-4 pt-3">
            <div className="rounded-xl p-3 bg-blue-50 border border-blue-100 flex items-center gap-2">
              <Loader2 size={14} className="text-blue-500 animate-spin" />
              <p className="text-xs text-blue-600 font-medium">Syncing profile changes…</p>
            </div>
          </div>
        )}

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
            <span className="text-xs font-bold text-purple-500">
              {[form.avatar_url, form.cover_url, form.bio, form.full_name, form.country, form.interests?.length > 0].filter(Boolean).length}/6
            </span>
          </div>
          <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300"
              style={{ width: `${Math.min([form.avatar_url, form.cover_url, form.bio, form.full_name, form.country, form.interests?.length > 0].filter(Boolean).length / 6 * 100, 100)}%` }}
            />
          </div>
        </div>

        {/* === 1. IDENTITY SECTION === */}
        <Section title="Identity" icon="👤">
          <DisplayNameField value={form.full_name} onChange={(v) => handleChange("full_name", v)} />
          <UsernameField value={form.username} onChange={(v) => handleChange("username", v)} currentUserId={user?.id} />
          <UserIdField userId={form.global_id || user?.id} />
        </Section>

        {/* === 2. MEDIA SECTION === */}
        <Section title="Media" icon="📸">
          <MediaUploader field="avatar_url" label="Profile Photo" value={form.avatar_url} onChange={(v) => handleChange("avatar_url", v)} aspect="avatar" />
          <MediaUploader field="cover_url" label="Cover Photo" value={form.cover_url} onChange={(v) => handleChange("cover_url", v)} aspect="cover" />
        </Section>

        {/* === 3. BIO & BRANDING === */}
        <Section title="Bio & Branding" icon="✨">
          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Bio (About Me)</label>
            <Textarea
              value={form.bio || ""}
              onChange={(e) => handleChange("bio", e.target.value)}
              maxLength={300}
              placeholder="Live streamer 🎤 | Gaming & Music lover 🎮🎵"
              className="resize-none"
              rows={3}
            />
            <p className="text-[9px] text-gray-300 mt-0.5 text-right">{(form.bio || "").length}/300</p>
          </div>
          <CategoryTags selected={form.interests || []} onChange={(v) => handleChange("interests", v)} />
        </Section>

        {/* === 4. SOCIAL INFO === */}
        <Section title="Social Info" icon="🌐">
          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Country</label>
            <select
              value={form.country || ""}
              onChange={(e) => handleChange("country", e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm"
            >
              <option value="">Select country...</option>
              {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <LanguageSelector selected={form.languages || []} onChange={(v) => handleChange("languages", v)} />
          <SocialLinks links={form.social_links || {}} onChange={(v) => handleChange("social_links", v)} />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Gender</label>
              <select
                value={form.gender || ""}
                onChange={(e) => handleChange("gender", e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm"
              >
                <option value="">Select...</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Birthday</label>
              <Input
                type="date"
                value={form.birthday || ""}
                onChange={(e) => handleChange("birthday", e.target.value)}
              />
            </div>
          </div>
        </Section>

        {/* === 5. PREFERENCES === */}
        <Section title="Preferences" icon="⚙️">
          <PreferencesSection form={form} onChange={(f) => setForm(f)} />
        </Section>

        {/* === 6. SECURITY / HISTORY === */}
        <Section title="Security & History" icon="🔒">
          <button onClick={() => navigate("/settings/8")} className="w-full flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-100 active:scale-95 transition">
            <ShieldAlert size={16} className="text-gray-400" />
            <span className="text-xs font-medium text-gray-700 flex-1 text-left">Security Settings</span>
            <ChevronRight size={14} className="text-gray-300" />
          </button>
          <button onClick={() => toast({ title: "Profile edit history" })} className="w-full flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-100 active:scale-95 transition">
            <Clock size={16} className="text-gray-400" />
            <span className="text-xs font-medium text-gray-700 flex-1 text-left">Profile Edit History</span>
            <ChevronRight size={14} className="text-gray-300" />
          </button>
        </Section>

        <div className="h-8" />
      </div>
    </div>
  );
}

function Section({ title, icon, children }) {
  return (
    <div className="mx-4 mt-4">
      <div className="flex items-center gap-1.5 mb-2">
        <span className="text-sm">{icon}</span>
        <h2 className="text-sm font-bold text-gray-700">{title}</h2>
      </div>
      <div className="bg-white rounded-2xl border border-gray-50 shadow-sm p-4 space-y-4">
        {children}
      </div>
    </div>
  );
}