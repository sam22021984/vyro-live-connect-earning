import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { X, Trophy } from "lucide-react";
import { eventSections, events, COLORS } from "./tasksData";
import EventCard from "./EventCard";

export default function EventsTab() {
  const [section, setSection] = useState("active");
  const [rulesEvent, setRulesEvent] = useState(null);
  const [rankingEvent, setRankingEvent] = useState(null);
  const [joined, setJoined] = useState([]);
  const { toast } = useToast();

  const handleJoin = (event) => {
    if (joined.includes(event.id)) {
      toast({ title: "✅ Already Joined!", description: `You're participating in ${event.title}.` });
      return;
    }
    setJoined([...joined, event.id]);
    toast({ title: "🎉 Joined Event!", description: event.title });
  };

  const handleClaim = (event) => {
    toast({ title: "🎁 Reward Claimed!", description: `${event.title} rewards added.` });
  };

  return (
    <div>
      <div className="flex gap-2 mb-3 overflow-x-auto scrollbar-hide">
        {eventSections.map((s) => (
          <button key={s.key} onClick={() => setSection(s.key)}
            className={`py-2 px-4 rounded-xl text-xs font-bold whitespace-nowrap active:scale-95 transition flex items-center gap-1.5 ${section === s.key ? "text-white" : ""}`}
            style={section === s.key ? { background: COLORS.primary } : { background: COLORS.cardBg, color: COLORS.muted, border: "1px solid #EEF0F4" }}>
            <span>{s.icon}</span> {s.label}
          </button>
        ))}
      </div>

      {events[section].map((e) => (
        <EventCard key={e.id} event={e} status={section} onJoin={handleJoin} onViewRules={setRulesEvent} onViewRanking={setRankingEvent} onClaim={handleClaim} />
      ))}

      {/* Rules modal */}
      {rulesEvent && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setRulesEvent(null)} />
          <div className="relative w-full max-w-md bg-white rounded-t-3xl animate-fadeIn">
            <div className="sticky top-0 bg-white pt-3 pb-2 z-10">
              <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-2" />
              <div className="flex items-center justify-between px-4">
                <h2 className="text-sm font-bold" style={{ color: COLORS.navy }}>Event Rules</h2>
                <button onClick={() => setRulesEvent(null)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center active:scale-95">
                  <X size={16} className="text-gray-500" />
                </button>
              </div>
            </div>
            <div className="px-4 pb-6">
              <div className="flex flex-col items-center py-3">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-2" style={{ background: `${rulesEvent.color}15`, border: `1px solid ${rulesEvent.color}30` }}>{rulesEvent.banner}</div>
                <h3 className="text-sm font-bold" style={{ color: COLORS.navy }}>{rulesEvent.title}</h3>
              </div>
              <div className="rounded-2xl p-3" style={{ background: COLORS.cardBg }}>
                <p className="text-xs leading-relaxed" style={{ color: COLORS.navy }}>{rulesEvent.rules}</p>
              </div>
              <div className="rounded-2xl p-3 mt-3" style={{ background: `${COLORS.gold}10`, border: `1px solid ${COLORS.gold}30` }}>
                <div className="flex items-center gap-1.5 mb-1">
                  <Trophy size={13} style={{ color: COLORS.gold }} />
                  <span className="text-[11px] font-bold" style={{ color: COLORS.gold }}>Rewards</span>
                </div>
                <p className="text-xs" style={{ color: COLORS.navy }}>{rulesEvent.rewards}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Ranking modal */}
      {rankingEvent && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setRankingEvent(null)} />
          <div className="relative w-full max-w-md bg-white rounded-t-3xl animate-fadeIn max-h-[70vh] overflow-y-auto">
            <div className="sticky top-0 bg-white pt-3 pb-2 z-10">
              <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-2" />
              <div className="flex items-center justify-between px-4">
                <h2 className="text-sm font-bold" style={{ color: COLORS.navy }}>Event Ranking</h2>
                <button onClick={() => setRankingEvent(null)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center active:scale-95">
                  <X size={16} className="text-gray-500" />
                </button>
              </div>
            </div>
            <div className="px-4 pb-6 space-y-2">
              {[
                { rank: 1, name: "StarHost_Alice", score: "12,450 pts", avatar: "👑" },
                { rank: 2, name: "GiftMaster_Bob", score: "10,200 pts", avatar: "🥈" },
                { rank: 3, name: "VyroChamp_Cara", score: "8,750 pts", avatar: "🥉" },
                { rank: 4, name: "You", score: "6,100 pts", avatar: "⭐" },
                { rank: 5, name: "LiveStar_Dan", score: "5,400 pts", avatar: "🎤" },
              ].map((r) => (
                <div key={r.rank} className="flex items-center gap-3 p-2.5 rounded-xl" style={{ background: r.name === "You" ? `${COLORS.primary}10` : COLORS.cardBg, border: r.name === "You" ? `1px solid ${COLORS.primary}30` : "1px solid #EEF0F4" }}>
                  <span className="text-lg w-8 text-center">{r.avatar}</span>
                  <div className="flex-1">
                    <p className="text-xs font-bold" style={{ color: COLORS.navy }}>{r.name}</p>
                    <p className="text-[10px]" style={{ color: COLORS.muted }}>{r.score}</p>
                  </div>
                  <span className="text-xs font-bold" style={{ color: COLORS.gold }}>#{r.rank}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}