import React, { useState } from "react";
import { Coins, Send, Crown, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { COLORS, GIFTS_DATA, TOP_GIFTERS, formatNum } from "./communityData";
import { useToast } from "@/components/ui/use-toast";

export default function GiftingTab() {
  const { toast } = useToast();
  const [selected, setSelected] = useState(null);
  const [sending, setSending] = useState(false);

  const handleSend = () => {
    if (!selected) return;
    setSending(true);
    setTimeout(() => {
      toast({ title: `🎁 ${selected.name} sent!`, description: `${formatNum(selected.price)} coins deducted` });
      setSelected(null);
      setSending(false);
    }, 800);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xs font-bold px-1" style={{ color: COLORS.textPrimary }}>🎁 Community Gifting</h3>

      {/* Balance card */}
      <div className="rounded-2xl p-4 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.amber})` }}>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.4) 0%, transparent 50%)" }} />
        <div className="relative flex items-center justify-between">
          <div>
            <p className="text-[10px] text-white/80">Your Coin Balance</p>
            <p className="text-xl font-bold text-white flex items-center gap-1"><Coins size={18} /> 5,000,000</p>
          </div>
          <Crown size={32} className="text-white/30" />
        </div>
      </div>

      {/* Gift grid */}
      <div>
        <p className="text-[10px] font-bold mb-2 px-1" style={{ color: COLORS.textSecondary }}>Available Gifts</p>
        <div className="grid grid-cols-4 gap-2">
          {GIFTS_DATA.map((g) => (
            <button
              key={g.id}
              onClick={() => setSelected(g)}
              className={"rounded-2xl py-3 flex flex-col items-center justify-center transition active:scale-95 border-2 " + (selected?.id === g.id ? "" : "")}
              style={selected?.id === g.id
                ? { borderColor: COLORS.royalBlue, background: `${COLORS.royalBlue}08` }
                : { borderColor: COLORS.border, background: "rgba(255,255,255,0.7)" }
              }
            >
              <span className="text-2xl">{g.icon}</span>
              <span className="text-[9px] font-medium mt-0.5" style={{ color: COLORS.textPrimary }}>{g.name}</span>
              <span className="flex items-center gap-0.5 text-[8px] font-bold mt-0.5" style={{ color: COLORS.gold }}>
                <Coins size={8} /> {formatNum(g.price)}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Send button */}
      {selected && (
        <div className="rounded-2xl p-3" style={{ background: "rgba(255,255,255,0.7)", border: `1px solid ${COLORS.border}` }}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{selected.icon}</span>
              <div>
                <p className="text-xs font-bold" style={{ color: COLORS.textPrimary }}>{selected.name}</p>
                <p className="flex items-center gap-1 text-[10px] font-bold" style={{ color: COLORS.gold }}><Coins size={10} /> {formatNum(selected.price)}</p>
              </div>
            </div>
            <span className="text-[9px] px-2 py-0.5 rounded-full font-bold" style={{ background: `${COLORS.royalBlue}15`, color: COLORS.royalBlue }}>{selected.category}</span>
          </div>
          <button
            onClick={handleSend}
            disabled={sending}
            className="w-full py-2.5 rounded-xl text-xs font-bold text-white transition active:scale-95 disabled:opacity-50"
            style={{ background: `linear-gradient(135deg, ${COLORS.royalBlue}, ${COLORS.skyBlue})` }}
          >
            {sending ? "Sending..." : "Send Gift"}
          </button>
        </div>
      )}

      {/* Top gifters */}
      <div>
        <p className="text-[10px] font-bold mb-2 px-1" style={{ color: COLORS.textSecondary }}>🏆 Top Gift Senders</p>
        <div className="space-y-2">
          {TOP_GIFTERS.map((g, i) => (
            <div key={i} className="rounded-xl p-2.5 flex items-center gap-2.5" style={{ background: "rgba(255,255,255,0.7)", border: `1px solid ${COLORS.border}` }}>
              <span className="text-xs font-bold w-5 text-center" style={{ color: i === 0 ? COLORS.gold : COLORS.textSecondary }}>{i + 1}</span>
              <img src={g.avatar} className="w-8 h-8 rounded-full object-cover" alt="" />
              <div className="flex-1 min-w-0">
                <span className="text-xs font-bold" style={{ color: COLORS.textPrimary }}>{g.name}</span>
                <p className="text-[9px] flex items-center gap-1" style={{ color: COLORS.textSecondary }}>
                  <ArrowUpRight size={9} /> {g.gifts} gifts sent
                </p>
              </div>
              <span className="flex items-center gap-0.5 text-[10px] font-bold" style={{ color: COLORS.gold }}>
                <Coins size={10} /> {formatNum(g.coins)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}