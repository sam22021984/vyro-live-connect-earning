import React, { useState, useEffect } from "react";
import { Coins, Crown, ArrowUpRight, Loader2 } from "lucide-react";
import { COLORS, formatNum } from "./communityData";
import { useGifts } from "@/hooks/useGifts";
import { useToast } from "@/components/ui/use-toast";
import { base44 } from "@/api/base44Client";

export default function GiftingTab() {
  const { toast } = useToast();
  const { gifts, coins, loading, sendGift } = useGifts();
  const [selected, setSelected] = useState(null);
  const [sending, setSending] = useState(false);
  const [topGifters, setTopGifters] = useState([]);

  useEffect(() => {
    const fetchTopGifters = async () => {
      try {
        const transactions = await base44.entities.Transaction.filter(
          { type: "gift", status: "completed" },
          "-created_date",
          500
        );
        const gifterMap = {};
        (transactions || []).forEach((t) => {
          if (t.user_id) {
            if (!gifterMap[t.user_id]) gifterMap[t.user_id] = { gifts: 0, coins: 0, name: t.recipient_name || "User" };
            gifterMap[t.user_id].gifts += t.gift_quantity || 1;
            gifterMap[t.user_id].coins += t.coins || 0;
          }
        });

        const sorted = Object.entries(gifterMap)
          .sort(([, a], [, b]) => b.coins - a.coins)
          .slice(0, 5);

        // Fetch profiles
        const uids = sorted.map(([uid]) => uid);
        const profiles = await Promise.all(
          uids.map((uid) => base44.entities.UserProfile.filter({ user_id: uid }).catch(() => []))
        );

        const enriched = sorted.map(([uid, data], i) => {
          const p = profiles[i]?.[0];
          return {
            name: p?.username || p?.full_name || data.name,
            avatar: p?.avatar_url || "",
            gifts: data.gifts,
            coins: data.coins,
          };
        });

        setTopGifters(enriched);
      } catch (err) {
        console.error("Failed to fetch top gifters:", err);
      }
    };

    fetchTopGifters();
    const unsub = base44.entities.Transaction?.subscribe?.(fetchTopGifters);
    return () => unsub && unsub();
  }, []);

  const handleSend = async () => {
    if (!selected) return;
    setSending(true);
    try {
      const result = await sendGift(selected, null, 1);
      if (result?.error) {
        toast({ title: result.error, variant: "destructive" });
      } else {
        toast({ title: `🎁 ${selected.name} sent!`, description: `${formatNum(selected.price_coins || selected.price)} coins deducted` });
        setSelected(null);
      }
    } catch (err) {
      toast({ title: "Failed to send gift", variant: "destructive" });
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 size={24} className="animate-spin" style={{ color: COLORS.royalBlue }} />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xs font-bold px-1" style={{ color: COLORS.textPrimary }}>🎁 Community Gifting</h3>

      {/* Balance card */}
      <div className="rounded-2xl p-4 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.amber})` }}>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.4) 0%, transparent 50%)" }} />
        <div className="relative flex items-center justify-between">
          <div>
            <p className="text-[10px] text-white/80">Your Coin Balance</p>
            <p className="text-xl font-bold text-white flex items-center gap-1"><Coins size={18} /> {formatNum(coins)}</p>
          </div>
          <Crown size={32} className="text-white/30" />
        </div>
      </div>

      {/* Gift grid */}
      <div>
        <div className="flex items-center justify-between mb-2 px-1">
          <p className="text-[10px] font-bold" style={{ color: COLORS.textSecondary }}>Available Gifts</p>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: COLORS.emerald }} />
            <span className="text-[9px] font-semibold" style={{ color: COLORS.emerald }}>LIVE</span>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {gifts.filter((g) => g.is_active !== false).map((g) => (
            <button
              key={g.id}
              onClick={() => setSelected(g)}
              className="rounded-2xl py-3 flex flex-col items-center justify-center transition active:scale-95 border-2"
              style={selected?.id === g.id
                ? { borderColor: COLORS.royalBlue, background: `${COLORS.royalBlue}08` }
                : { borderColor: COLORS.border, background: "rgba(255,255,255,0.7)" }
              }
            >
              <span className="text-2xl">{g.icon}</span>
              <span className="text-[9px] font-medium mt-0.5" style={{ color: COLORS.textPrimary }}>{g.name}</span>
              <span className="flex items-center gap-0.5 text-[8px] font-bold mt-0.5" style={{ color: COLORS.gold }}>
                <Coins size={8} /> {formatNum(g.price_coins || g.price)}
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
                <p className="flex items-center gap-1 text-[10px] font-bold" style={{ color: COLORS.gold }}><Coins size={10} /> {formatNum(selected.price_coins || selected.price)}</p>
              </div>
            </div>
            <span className="text-[9px] px-2 py-0.5 rounded-full font-bold capitalize" style={{ background: `${COLORS.royalBlue}15`, color: COLORS.royalBlue }}>{selected.category}</span>
          </div>
          <button
            onClick={handleSend}
            disabled={sending || coins < (selected.price_coins || selected.price)}
            className="w-full py-2.5 rounded-xl text-xs font-bold text-white transition active:scale-95 disabled:opacity-50"
            style={{ background: `linear-gradient(135deg, ${COLORS.royalBlue}, ${COLORS.skyBlue})` }}
          >
            {sending ? "Sending..." : coins < (selected.price_coins || selected.price) ? "Insufficient Coins" : "Send Gift"}
          </button>
        </div>
      )}

      {/* Top gifters */}
      <div>
        <div className="flex items-center justify-between mb-2 px-1">
          <p className="text-[10px] font-bold" style={{ color: COLORS.textSecondary }}>🏆 Top Gift Senders</p>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: COLORS.emerald }} />
            <span className="text-[9px] font-semibold" style={{ color: COLORS.emerald }}>LIVE</span>
          </div>
        </div>
        <div className="space-y-2">
          {topGifters.length === 0 ? (
            <p className="text-center text-[10px] py-4" style={{ color: COLORS.textSecondary }}>No gift data yet</p>
          ) : (
            topGifters.map((g, i) => (
              <div key={i} className="rounded-xl p-2.5 flex items-center gap-2.5" style={{ background: "rgba(255,255,255,0.7)", border: `1px solid ${COLORS.border}` }}>
                <span className="text-xs font-bold w-5 text-center" style={{ color: i === 0 ? COLORS.gold : COLORS.textSecondary }}>{i + 1}</span>
                {g.avatar ? (
                  <img src={g.avatar} className="w-8 h-8 rounded-full object-cover" alt="" />
                ) : (
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: COLORS.bgPrimary }}>
                    <span className="text-[10px] font-bold" style={{ color: COLORS.textSecondary }}>{(g.name || "U")[0]}</span>
                  </div>
                )}
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
            ))
          )}
        </div>
      </div>
    </div>
  );
}