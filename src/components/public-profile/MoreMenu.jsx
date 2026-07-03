import React, { useState } from "react";
import { X, Flag, ShieldBan, BellOff, EyeOff, Ban, FileWarning, Link2, Copy, Star } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { base44 } from "@/api/base44Client";
import { getCurrentUser } from "@/lib/getCurrentUser";

const MENU_ITEMS = [
  { id: "share", label: "Share Profile", icon: Link2, color: "text-gray-600" },
  { id: "copy_link", label: "Copy Profile Link", icon: Copy, color: "text-gray-600" },
  { id: "copy_id", label: "Copy User ID", icon: Copy, color: "text-gray-600" },
  { id: "favorite", label: "Add to Favorites", icon: Star, color: "text-gray-600" },
  { id: "mute", label: "Mute User", icon: BellOff, color: "text-gray-600" },
  { id: "hide", label: "Hide Posts", icon: EyeOff, color: "text-gray-600" },
  { id: "restrict", label: "Restrict User", icon: ShieldBan, color: "text-orange-500" },
  { id: "block", label: "Block User", icon: Ban, color: "text-red-500" },
  { id: "report", label: "Report User", icon: FileWarning, color: "text-red-500" },
];

const REPORT_CATEGORIES = [
  "Fake Account", "Spam", "Harassment", "Hate Speech", "Nudity",
  "Violence", "Child Safety", "Copyright Infringement", "Scam / Fraud", "Other",
];

export default function MoreMenu({ profile, onClose }) {
  const { toast } = useToast();
  const [showBlockConfirm, setShowBlockConfirm] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [reportSubmitted, setReportSubmitted] = useState(false);

  const handleAction = async (id) => {
    if (id === "copy_id") {
      navigator.clipboard?.writeText(profile?.global_id || profile?.id || "");
      toast({ title: "User ID copied to clipboard" });
      return;
    }
    if (id === "copy_link") {
      const link = `${window.location.origin}/profile/${profile?.id}`;
      navigator.clipboard?.writeText(link);
      toast({ title: "Profile link copied" });
      return;
    }
    if (id === "share") {
      if (navigator.share) {
        try { await navigator.share({ title: profile?.username, url: `${window.location.origin}/profile/${profile?.id}` }); } catch {}
      } else {
        const link = `${window.location.origin}/profile/${profile?.id}`;
        navigator.clipboard?.writeText(link);
        toast({ title: "Profile link copied" });
      }
      return;
    }
    if (id === "block") { setShowBlockConfirm(true); return; }
    if (id === "report") { setShowReport(true); return; }
    toast({ title: MENU_ITEMS.find((m) => m.id === id)?.label + " - Done" });
  };

  const handleBlock = async () => {
    try {
      const me = await getCurrentUser();
      let settings = await base44.entities.PrivacySetting.filter({ user_id: me.id });
      if (settings.length > 0) {
        const blocked = settings[0].blocked_users || [];
        if (!blocked.includes(profile.id)) {
          await base44.entities.PrivacySetting.update(settings[0].id, {
            blocked_users: [...blocked, profile.id],
          });
        }
      }
    } catch {}
    toast({ title: `${profile?.username} has been blocked` });
    setShowBlockConfirm(false);
    onClose();
  };

  const handleSubmitReport = async () => {
    if (!selectedReport) return;
    try {
      const me = await getCurrentUser();
      await base44.entities.SupportTicket.create({
        user_id: me.id,
        username: me.full_name || me.email,
        subject: `Report: ${profile?.username} - ${selectedReport}`,
        description: `Reported user: ${profile?.username} (ID: ${profile?.global_id || profile?.id}). Category: ${selectedReport}`,
        category: "other",
        priority: "high",
        status: "open",
      });
    } catch {}
    setReportSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-end" onClick={onClose}>
      <div className="w-full bg-white rounded-t-3xl max-h-[70vh] overflow-hidden animate-fadeIn" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-50">
          <h3 className="text-sm font-bold text-gray-800">More Options</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center active:scale-90">
            <X size={16} className="text-gray-500" />
          </button>
        </div>

        {/* Menu items */}
        <div className="py-1 overflow-y-auto" style={{ maxHeight: "400px" }}>
          {MENU_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleAction(item.id)}
              className="w-full flex items-center gap-3 px-4 py-3 active:bg-gray-50 transition text-left"
            >
              <item.icon size={18} className={item.color} />
              <span className={`text-sm font-medium ${item.color}`}>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Block confirmation */}
      {showBlockConfirm && (
        <div className="fixed inset-0 z-[60] bg-black/60 flex items-center justify-center px-6" onClick={() => setShowBlockConfirm(false)}>
          <div className="bg-white rounded-3xl p-6 max-w-xs w-full text-center" onClick={(e) => e.stopPropagation()}>
            <div className="w-14 h-14 mx-auto rounded-full bg-red-50 flex items-center justify-center mb-3">
              <Ban size={28} className="text-red-500" />
            </div>
            <h3 className="text-sm font-bold text-gray-800 mb-1">Block {profile?.username}?</h3>
            <p className="text-xs text-gray-400 mb-4">Neither of you will be able to send messages, call, or follow each other.</p>
            <div className="flex gap-2">
              <button onClick={() => setShowBlockConfirm(false)} className="flex-1 py-2.5 rounded-xl text-xs font-bold text-gray-600 bg-gray-100 active:scale-95">Cancel</button>
              <button onClick={handleBlock} className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white bg-red-500 active:scale-95">Block</button>
            </div>
          </div>
        </div>
      )}

      {/* Report sheet */}
      {showReport && (
        <div className="fixed inset-0 z-[60] bg-black/60 flex items-end" onClick={() => { setShowReport(false); setReportSubmitted(false); setSelectedReport(null); }}>
          <div className="w-full bg-white rounded-t-3xl max-h-[80vh] overflow-hidden animate-fadeIn" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-50">
              <h3 className="text-sm font-bold text-gray-800">Report {profile?.username}</h3>
              <button onClick={() => { setShowReport(false); setReportSubmitted(false); setSelectedReport(null); }} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center active:scale-90">
                <X size={16} className="text-gray-500" />
              </button>
            </div>

            {!reportSubmitted ? (
              <div className="py-2 overflow-y-auto" style={{ maxHeight: "400px" }}>
                {REPORT_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedReport(cat)}
                    className={`w-full flex items-center justify-between px-4 py-3 active:bg-gray-50 transition text-left ${selectedReport === cat ? "bg-red-50" : ""}`}
                  >
                    <span className="text-sm font-medium text-gray-700">{cat}</span>
                    {selectedReport === cat && <Flag size={14} className="text-red-500" />}
                  </button>
                ))}
                <div className="p-4">
                  <button onClick={handleSubmitReport} disabled={!selectedReport} className="w-full py-3 rounded-2xl text-sm font-bold text-white bg-red-500 active:scale-95 disabled:opacity-40">
                    Submit Report
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center">
                <div className="w-14 h-14 mx-auto rounded-full bg-green-50 flex items-center justify-center mb-3">
                  <Flag size={28} className="text-green-500" />
                </div>
                <h3 className="text-sm font-bold text-gray-800 mb-1">Report Submitted</h3>
                <p className="text-xs text-gray-400">Your report has been submitted successfully. Our team will review it.</p>
                <button onClick={() => { setShowReport(false); setReportSubmitted(false); setSelectedReport(null); onClose(); }} className="mt-4 px-6 py-2 rounded-xl text-xs font-bold text-white bg-purple-500 active:scale-95">
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}