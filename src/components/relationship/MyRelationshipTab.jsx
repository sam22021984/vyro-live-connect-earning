import React, { useState, useEffect } from "react";
import { MessageCircle, Gift, Eye, HeartCrack, Calendar } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { RELATIONSHIP_COLORS, GRADIENT_PINK_PURPLE, formatDate, daysSince } from "./relationshipData";
import { useToast } from "@/components/ui/use-toast";

export default function MyRelationshipTab({ refreshKey }) {
  const { toast } = useToast();
  const [relationship, setRelationship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [confirmEnd, setConfirmEnd] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    base44.auth.me().then((me) => setCurrentUserId(me.id)).catch(() => {});
  }, []);

  useEffect(() => {
    loadRelationship();
  }, [refreshKey, currentUserId]);

  const loadRelationship = async () => {
    try {
      const all = await base44.entities.Relationship.list();
      const active = all.find((r) => r.status === "accepted");
      setRelationship(active || null);
    } catch (e) {
      setRelationship(null);
    } finally {
      setLoading(false);
    }
  };

  const handleEnd = async () => {
    await base44.entities.Relationship.update(relationship.id, { status: "ended", end_date: formatDate() });
    toast({ title: "💔 Relationship ended" });
    setConfirmEnd(false);
    loadRelationship();
  };

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <div className="w-7 h-7 border-2 border-pink-300 border-t-pink-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!relationship) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4" style={{ background: "rgba(236,72,153,0.1)", border: "1px solid rgba(236,72,153,0.2)" }}>
          <span className="text-4xl">💔</span>
        </div>
        <h3 className="text-base font-bold mb-1" style={{ color: RELATIONSHIP_COLORS.textLight }}>No Active Relationship</h3>
        <p className="text-xs" style={{ color: RELATIONSHIP_COLORS.textMuted }}>Discover users and send a relationship request to find your special someone.</p>
      </div>
    );
  }

  const isOwn = relationship.created_by_id === currentUserId;
  const partnerName = isOwn ? relationship.receiver_name : relationship.sender_name;
  const partnerAvatar = isOwn ? relationship.receiver_avatar : relationship.sender_avatar;
  const partnerCountry = isOwn ? relationship.receiver_country : relationship.sender_country;
  const partnerId = isOwn ? relationship.receiver_id : relationship.sender_id;
  const days = daysSince(relationship.start_date);

  return (
    <div className="space-y-3">
      {/* Hero card */}
      <div className="rounded-3xl p-5 text-center relative overflow-hidden" style={{ background: GRADIENT_PINK_PURPLE }}>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.3) 0%, transparent 50%)" }} />
        <div className="relative">
          <div className="relative inline-block mb-3">
            <div className="absolute inset-0 rounded-full animate-ping" style={{ background: "rgba(255,255,255,0.3)", animationDuration: "3s" }} />
            <img src={partnerAvatar} className="w-24 h-24 rounded-full object-cover border-4 border-white/30 relative" alt="" />
          </div>
          <h2 className="text-lg font-bold text-white flex items-center justify-center gap-1.5">
            {partnerName} <HeartCrack size={16} className="text-white" fill="white" />
          </h2>
          <p className="text-xs text-white/70">{partnerCountry || "Unknown"}</p>
          <div className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full" style={{ background: "rgba(255,255,255,0.15)" }}>
            <Calendar size={12} className="text-white" />
            <span className="text-[11px] font-bold text-white">{days} days together ❤️</span>
          </div>
        </div>
      </div>

      {/* Info card */}
      <div className="rounded-2xl p-4 backdrop-blur-xl space-y-2.5" style={{ background: RELATIONSHIP_COLORS.glassBg, border: `1px solid ${RELATIONSHIP_COLORS.glassBorder}` }}>
        <div className="flex items-center justify-between">
          <span className="text-xs" style={{ color: RELATIONSHIP_COLORS.textMuted }}>User ID</span>
          <span className="text-xs font-bold" style={{ color: RELATIONSHIP_COLORS.textLight }}>{partnerId || "—"}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs" style={{ color: RELATIONSHIP_COLORS.textMuted }}>Start Date</span>
          <span className="text-xs font-bold" style={{ color: RELATIONSHIP_COLORS.textLight }}>{relationship.start_date}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs" style={{ color: RELATIONSHIP_COLORS.textMuted }}>Status</span>
          <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(34,197,94,0.2)", color: "#86EFAC" }}>Active ❤️</span>
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-3 gap-2">
        <button onClick={() => toast({ title: `Opening chat with ${partnerName}` })} className="py-3 rounded-2xl text-xs font-bold flex flex-col items-center gap-1 transition active:scale-95 backdrop-blur-xl" style={{ background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.3)", color: "#93C5FD" }}>
          <MessageCircle size={18} /> Chat
        </button>
        <button onClick={() => toast({ title: `Viewing ${partnerName}'s profile` })} className="py-3 rounded-2xl text-xs font-bold flex flex-col items-center gap-1 transition active:scale-95 backdrop-blur-xl" style={{ background: RELATIONSHIP_COLORS.glassBg, border: `1px solid ${RELATIONSHIP_COLORS.glassBorder}`, color: RELATIONSHIP_COLORS.textLight }}>
          <Eye size={18} /> Profile
        </button>
        <button onClick={() => toast({ title: `Opening gift gallery for ${partnerName}` })} className="py-3 rounded-2xl text-xs font-bold flex flex-col items-center gap-1 transition active:scale-95 backdrop-blur-xl" style={{ background: "rgba(245,158,11,0.15)", border: "1px solid rgba(245,158,11,0.3)", color: "#FCD34D" }}>
          <Gift size={18} /> Gift
        </button>
      </div>

      {/* End relationship */}
      <button
        onClick={() => setConfirmEnd(true)}
        className="w-full py-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 transition active:scale-95"
        style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "#FCA5A5" }}
      >
        <HeartCrack size={14} /> End Relationship
      </button>

      {/* Confirm modal */}
      {confirmEnd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setConfirmEnd(false)} />
          <div className="relative w-full max-w-sm rounded-3xl p-6 text-center" style={{ background: "#2D1B4E", border: `1px solid ${RELATIONSHIP_COLORS.glassBorder}` }}>
            <span className="text-4xl">💔</span>
            <h3 className="text-base font-bold mt-2 mb-1" style={{ color: RELATIONSHIP_COLORS.textLight }}>End Relationship?</h3>
            <p className="text-xs mb-4" style={{ color: RELATIONSHIP_COLORS.textMuted }}>Are you sure you want to end your relationship with {partnerName}? This action cannot be undone.</p>
            <div className="flex gap-2">
              <button onClick={() => setConfirmEnd(false)} className="flex-1 py-2.5 rounded-xl text-xs font-bold transition active:scale-95" style={{ background: RELATIONSHIP_COLORS.glassBg, color: RELATIONSHIP_COLORS.textLight }}>
                Cancel
              </button>
              <button onClick={handleEnd} className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white transition active:scale-95" style={{ background: "linear-gradient(135deg, #EF4444, #DC2626)" }}>
                End
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}