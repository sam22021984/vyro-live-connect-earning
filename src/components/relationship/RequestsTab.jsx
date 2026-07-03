import React, { useState, useEffect } from "react";
import { Check, X, Clock, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { RELATIONSHIP_COLORS, GRADIENT_PINK_PURPLE, formatDate, formatTime } from "./relationshipData";
import { useToast } from "@/components/ui/use-toast";

export default function RequestsTab({ refreshKey }) {
  const { toast } = useToast();
  const [tab, setTab] = useState("incoming");
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    base44.auth.me().then((me) => setCurrentUserId(me.id)).catch(() => {});
  }, []);

  useEffect(() => {
    loadRequests();
  }, [tab, refreshKey, currentUserId]);

  const loadRequests = async () => {
    if (!currentUserId) return;
    try {
      const all = await base44.entities.Relationship.list();
      let filtered;
      if (tab === "incoming") {
        filtered = all.filter((r) => r.created_by_id !== currentUserId && r.status === "pending");
      } else {
        filtered = all.filter((r) => r.created_by_id === currentUserId && r.status === "pending");
      }
      filtered.sort((a, b) => new Date(b.created_date || 0) - new Date(a.created_date || 0));
      setRequests(filtered);
    } catch (e) {
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (req) => {
    await base44.entities.Relationship.update(req.id, { status: "accepted", start_date: formatDate() });
    toast({ title: `❤️ Relationship with ${req.sender_name} activated!` });
    loadRequests();
  };

  const handleReject = async (req) => {
    await base44.entities.Relationship.update(req.id, { status: "rejected" });
    toast({ title: "Request rejected" });
    loadRequests();
  };

  const handleCancel = async (req) => {
    await base44.entities.Relationship.update(req.id, { status: "cancelled" });
    toast({ title: "Request cancelled" });
    loadRequests();
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <button
          onClick={() => setTab("incoming")}
          className="flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition active:scale-95"
          style={tab === "incoming"
            ? { background: GRADIENT_PINK_PURPLE, color: "#fff" }
            : { background: RELATIONSHIP_COLORS.glassBg, border: `1px solid ${RELATIONSHIP_COLORS.glassBorder}`, color: RELATIONSHIP_COLORS.textMuted }
          }
        >
          <ArrowDownLeft size={13} /> Incoming
        </button>
        <button
          onClick={() => setTab("sent")}
          className="flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition active:scale-95"
          style={tab === "sent"
            ? { background: GRADIENT_PINK_PURPLE, color: "#fff" }
            : { background: RELATIONSHIP_COLORS.glassBg, border: `1px solid ${RELATIONSHIP_COLORS.glassBorder}`, color: RELATIONSHIP_COLORS.textMuted }
          }
        >
          <ArrowUpRight size={13} /> Sent
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <div className="w-7 h-7 border-2 border-pink-300 border-t-pink-500 rounded-full animate-spin" />
        </div>
      ) : requests.length === 0 ? (
        <div className="flex flex-col items-center py-10">
          <span className="text-4xl mb-2">{tab === "incoming" ? "📭" : "📤"}</span>
          <p className="text-sm font-semibold" style={{ color: RELATIONSHIP_COLORS.textMuted }}>
            {tab === "incoming" ? "No incoming requests" : "No sent requests"}
          </p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {requests.map((req) => {
            const name = tab === "incoming" ? req.sender_name : req.receiver_name;
            const avatar = tab === "incoming" ? req.sender_avatar : req.receiver_avatar;
            const country = tab === "incoming" ? req.sender_country : req.receiver_country;
            return (
              <div key={req.id} className="rounded-2xl p-3 backdrop-blur-xl" style={{ background: RELATIONSHIP_COLORS.glassBg, border: `1px solid ${RELATIONSHIP_COLORS.glassBorder}` }}>
                <div className="flex items-center gap-3">
                  <img src={avatar} className="w-12 h-12 rounded-full object-cover" alt="" />
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-bold" style={{ color: RELATIONSHIP_COLORS.textLight }}>{name}</span>
                    <p className="text-[10px]" style={{ color: RELATIONSHIP_COLORS.textMuted }}>{country || "Unknown"}</p>
                    <p className="text-[10px] flex items-center gap-1" style={{ color: RELATIONSHIP_COLORS.textMuted }}>
                      <Clock size={10} /> {req.request_date} · {req.request_time}
                    </p>
                  </div>
                </div>
                {tab === "incoming" ? (
                  <div className="flex gap-2 mt-3">
                    <button onClick={() => handleAccept(req)} className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-1 transition active:scale-95" style={{ background: "linear-gradient(135deg, #22C55E, #16A34A)" }}>
                      <Check size={14} /> Accept
                    </button>
                    <button onClick={() => handleReject(req)} className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-1 transition active:scale-95" style={{ background: "linear-gradient(135deg, #EF4444, #DC2626)" }}>
                      <X size={14} /> Reject
                    </button>
                  </div>
                ) : (
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-[11px] font-semibold flex items-center gap-1" style={{ color: "#FCD34D" }}>
                      <Clock size={12} /> Pending
                    </span>
                    <button onClick={() => handleCancel(req)} className="py-2 px-4 rounded-xl text-xs font-bold transition active:scale-95" style={{ background: "rgba(239,68,68,0.15)", color: "#FCA5A5", border: "1px solid rgba(239,68,68,0.3)" }}>
                      Cancel Request
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}