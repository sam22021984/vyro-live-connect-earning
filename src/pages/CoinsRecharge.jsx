import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Wallet, Check, X, Coins, TrendingUp, Gift, Clock, Zap, Crown, Shield, ChevronRight } from "lucide-react";
import { FINANCE_COLORS } from "@/components/finance/financeOptionsData";
import { RECHARGE_TIERS, PAYMENT_METHODS, WALLET_INFO } from "@/components/finance/rechargeTiersData";

const formatNum = (n) => n.toLocaleString();

export default function CoinsRecharge() {
  const navigate = useNavigate();
  const [activeGroup, setActiveGroup] = useState("starter");
  const [selectedTier, setSelectedTier] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("paypal");
  const [showCheckout, setShowCheckout] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [walletView, setWalletView] = useState(false);

  const filteredTiers = RECHARGE_TIERS.filter((t) => t.group === activeGroup);

  const handleSelectTier = (tier) => {
    setSelectedTier(tier);
    setShowCheckout(true);
  };

  const handleConfirmPayment = () => {
    setShowCheckout(false);
    setShowSuccess(true);
  };

  return (
    <div className="min-h-screen pb-24" style={{ background: FINANCE_COLORS.bg }}>
      {/* Header */}
      <div className="sticky top-0 z-30 px-4 py-3" style={{ background: FINANCE_COLORS.navyGradient, boxShadow: "0 4px 20px rgba(15,27,61,0.3)" }}>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/finance")} className="w-9 h-9 rounded-full flex items-center justify-center active:scale-95 transition" style={{ background: "rgba(255,255,255,0.1)" }}>
            <ArrowLeft size={18} className="text-white" />
          </button>
          <div className="flex-1">
            <h1 className="text-base font-bold text-white">Coins Recharge</h1>
            <p className="text-[10px] text-white/60">VYRO Live Connect Earning System</p>
          </div>
          <button onClick={() => setWalletView(true)} className="w-9 h-9 rounded-full flex items-center justify-center active:scale-95 transition" style={{ background: `${FINANCE_COLORS.gold}20`, border: `1px solid ${FINANCE_COLORS.gold}40` }}>
            <Wallet size={16} style={{ color: FINANCE_COLORS.goldLight }} />
          </button>
        </div>
      </div>

      {/* Wallet Balance Card */}
      <div className="px-4 pt-3">
        <div className="rounded-2xl p-4 relative overflow-hidden" style={{ background: FINANCE_COLORS.navyGradient, boxShadow: "0 4px 16px rgba(15,27,61,0.2)" }}>
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10" style={{ background: FINANCE_COLORS.gold, filter: "blur(40px)" }} />
          <div className="relative">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${FINANCE_COLORS.gold}20`, border: `1px solid ${FINANCE_COLORS.gold}40` }}>
                  <Coins size={14} style={{ color: FINANCE_COLORS.goldLight }} />
                </div>
                <span className="text-xs text-white/70 font-semibold">Wallet Balance</span>
              </div>
              <span className="text-[9px] px-2 py-0.5 rounded-full font-bold" style={{ background: `${FINANCE_COLORS.emerald}20`, color: FINANCE_COLORS.emerald }}>● Active</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">{formatNum(WALLET_INFO.currentBalance)} <span className="text-sm" style={{ color: FINANCE_COLORS.goldLight }}>Coins</span></h2>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <p className="text-[8px] text-white/50">Total Recharged</p>
                <p className="text-xs font-bold text-white">{formatNum(WALLET_INFO.totalRecharged)}</p>
              </div>
              <div>
                <p className="text-[8px] text-white/50">Total Spent</p>
                <p className="text-xs font-bold text-white">{formatNum(WALLET_INFO.totalSpent)}</p>
              </div>
              <div>
                <p className="text-[8px] text-white/50">Bonus Coins</p>
                <p className="text-xs font-bold" style={{ color: FINANCE_COLORS.goldLight }}>+{formatNum(WALLET_INFO.totalBonus)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Economy Info Banner */}
      <div className="px-4 pt-3">
        <div className="rounded-xl p-3 flex items-center gap-3" style={{ background: FINANCE_COLORS.card, border: `1px solid ${FINANCE_COLORS.border}` }}>
          <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${FINANCE_COLORS.emerald}10`, border: `1px solid ${FINANCE_COLORS.emerald}30` }}>
            <TrendingUp size={16} style={{ color: FINANCE_COLORS.emerald }} />
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold" style={{ color: FINANCE_COLORS.textPrimary }}>Exchange Rate</p>
            <p className="text-[10px]" style={{ color: FINANCE_COLORS.textSecondary }}>$1 = 20,000 Coins (Fixed) · Bonus 5% → 22%</p>
          </div>
        </div>
      </div>

      {/* Group Tabs */}
      <div className="sticky top-[60px] z-20 px-4 pt-3 pb-2" style={{ background: FINANCE_COLORS.bg }}>
        <div className="flex gap-2">
          <button onClick={() => setActiveGroup("starter")} className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition active:scale-95 ${activeGroup === "starter" ? "text-white" : ""}`} style={activeGroup === "starter" ? { background: FINANCE_COLORS.navyGradient, boxShadow: "0 2px 8px rgba(15,27,61,0.2)" } : { background: FINANCE_COLORS.card, color: FINANCE_COLORS.textSecondary, border: `1px solid ${FINANCE_COLORS.border}` }}>
            🟢 Starter Tiers
          </button>
          <button onClick={() => setActiveGroup("premium")} className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition active:scale-95 ${activeGroup === "premium" ? "text-white" : ""}`} style={activeGroup === "premium" ? { background: FINANCE_COLORS.navyGradient, boxShadow: "0 2px 8px rgba(15,27,61,0.2)" } : { background: FINANCE_COLORS.card, color: FINANCE_COLORS.textSecondary, border: `1px solid ${FINANCE_COLORS.border}` }}>
            🔷 Premium Tiers
          </button>
        </div>
      </div>

      {/* Tier Cards */}
      <div className="px-4 space-y-3">
        {filteredTiers.map((tier) => (
          <TierCard key={tier.id} tier={tier} onSelect={() => handleSelectTier(tier)} />
        ))}
      </div>

      {/* Footer System Rules */}
      <div className="px-4 pt-4">
        <div className="rounded-2xl p-4" style={{ background: FINANCE_COLORS.card, border: `1px solid ${FINANCE_COLORS.border}` }}>
          <h3 className="text-xs font-bold mb-3 flex items-center gap-1.5" style={{ color: FINANCE_COLORS.textPrimary }}>
            <Shield size={14} style={{ color: FINANCE_COLORS.emerald }} /> System Rules
          </h3>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <span className="text-[10px]">💱</span>
              <div>
                <p className="text-[11px] font-bold" style={{ color: FINANCE_COLORS.textPrimary }}>Economy</p>
                <p className="text-[10px]" style={{ color: FINANCE_COLORS.textSecondary }}>$1 = 20,000 coins (fixed rate)</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[10px]">➕</span>
              <div>
                <p className="text-[11px] font-bold" style={{ color: FINANCE_COLORS.textPrimary }}>Bonus Logic</p>
                <p className="text-[10px]" style={{ color: FINANCE_COLORS.textSecondary }}>5% → 22% gradual increase by tier</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[10px]">🎁</span>
              <div>
                <p className="text-[11px] font-bold" style={{ color: FINANCE_COLORS.textPrimary }}>Benefits</p>
                <p className="text-[10px]" style={{ color: FINANCE_COLORS.textSecondary }}>Time-based (24h → Lifetime) · Higher tier = longer perks</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[10px]">🔥</span>
              <div>
                <p className="text-[11px] font-bold" style={{ color: FINANCE_COLORS.textPrimary }}>System Goal</p>
                <p className="text-[10px]" style={{ color: FINANCE_COLORS.textSecondary }}>Small buyers = engagement · Medium = retention · High = revenue · VIP = growth core</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Sheet */}
      {showCheckout && selectedTier && (
        <CheckoutSheet tier={selectedTier} paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} onClose={() => setShowCheckout(false)} onConfirm={handleConfirmPayment} />
      )}

      {/* Success Modal */}
      {showSuccess && selectedTier && <SuccessModal tier={selectedTier} onClose={() => { setShowSuccess(false); setSelectedTier(null); }} />}

      {/* Wallet View */}
      {walletView && <WalletSheet onClose={() => setWalletView(false)} />}
    </div>
  );
}

function TierCard({ tier, onSelect }) {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: FINANCE_COLORS.card, boxShadow: "0 2px 12px rgba(15,27,61,0.06), 0 1px 3px rgba(0,0,0,0.03)", border: `1px solid ${FINANCE_COLORS.border}` }}>
      {/* Top bar */}
      <div className="h-1" style={{ background: tier.gradient }} />
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: tier.gradient, boxShadow: `0 2px 8px ${tier.color}40` }}>
              {tier.tier >= 13 ? <Crown size={18} className="text-white" /> : tier.tier >= 6 ? <Zap size={18} className="text-white" /> : <Coins size={18} className="text-white" />}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold px-1.5 py-0.5 rounded" style={{ background: `${tier.color}15`, color: tier.color }}>{tier.label}</span>
                {tier.benefitsDuration === "LIFETIME" && <span className="text-[9px] font-bold px-1.5 py-0.5 rounded" style={{ background: `${FINANCE_COLORS.gold}15`, color: FINANCE_COLORS.gold }}>👑 MAX</span>}
              </div>
              <p className="text-[10px]" style={{ color: FINANCE_COLORS.textSecondary }}>Tier {tier.tier}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold" style={{ color: FINANCE_COLORS.textPrimary }}>${tier.price}</p>
          </div>
        </div>

        {/* Coins breakdown */}
        <div className="rounded-xl p-3 mb-3" style={{ background: `${FINANCE_COLORS.bg}` }}>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] flex items-center gap-1" style={{ color: FINANCE_COLORS.textSecondary }}><Coins size={11} /> Base Coins</span>
            <span className="text-xs font-bold" style={{ color: FINANCE_COLORS.textPrimary }}>{formatNum(tier.coins)}</span>
          </div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] flex items-center gap-1" style={{ color: FINANCE_COLORS.textSecondary }}><Gift size={11} /> Bonus ({tier.bonusPercent}%)</span>
            <span className="text-xs font-bold" style={{ color: FINANCE_COLORS.emerald }}>+{formatNum(tier.bonusCoins)}</span>
          </div>
          <div className="h-px my-1.5" style={{ background: FINANCE_COLORS.border }} />
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold flex items-center gap-1" style={{ color: FINANCE_COLORS.textPrimary }}><Zap size={12} /> Total Coins</span>
            <span className="text-sm font-bold" style={{ color: tier.color }}>{formatNum(tier.totalCoins)}</span>
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-3">
          <div className="flex items-center gap-1.5 mb-2">
            <Clock size={11} style={{ color: FINANCE_COLORS.textSecondary }} />
            <span className="text-[10px] font-bold" style={{ color: FINANCE_COLORS.textSecondary }}>Benefits ({tier.benefitsDuration})</span>
          </div>
          <div className="space-y-1">
            {tier.benefits.map((b, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `${tier.color}15` }}>
                  <Check size={9} style={{ color: tier.color }} />
                </div>
                <span className="text-[10px]" style={{ color: FINANCE_COLORS.textSecondary }}>{b}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Buy button */}
        <button onClick={onSelect} className="w-full py-3 rounded-xl text-white text-xs font-bold active:scale-95 transition flex items-center justify-center gap-2" style={{ background: tier.gradient, boxShadow: `0 2px 8px ${tier.color}30` }}>
          Purchase ${tier.price} · Get {formatNum(tier.totalCoins)} Coins <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}

function CheckoutSheet({ tier, paymentMethod, setPaymentMethod, onClose, onConfirm }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white rounded-t-3xl max-h-[85vh] overflow-y-auto animate-fadeIn">
        <div className="sticky top-0 bg-white pt-3 pb-2 z-10 border-b" style={{ borderColor: FINANCE_COLORS.border }}>
          <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-2" />
          <div className="flex items-center justify-between px-4">
            <h2 className="text-sm font-bold" style={{ color: FINANCE_COLORS.textPrimary }}>Checkout</h2>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center active:scale-95 transition">
              <X size={16} className="text-gray-500" />
            </button>
          </div>
        </div>
        <div className="px-4 pb-6 space-y-4">
          {/* Order summary */}
          <div className="rounded-2xl p-4" style={{ background: `${tier.color}08`, border: `1px solid ${tier.color}20` }}>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: tier.gradient }}>
                <Coins size={16} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold" style={{ color: FINANCE_COLORS.textPrimary }}>{tier.label} - ${tier.price}</p>
                <p className="text-[10px]" style={{ color: FINANCE_COLORS.textSecondary }}>{formatNum(tier.totalCoins)} Total Coins</p>
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px]"><span style={{ color: FINANCE_COLORS.textSecondary }}>Base Coins</span><span className="font-bold" style={{ color: FINANCE_COLORS.textPrimary }}>{formatNum(tier.coins)}</span></div>
              <div className="flex justify-between text-[11px]"><span style={{ color: FINANCE_COLORS.textSecondary }}>Bonus ({tier.bonusPercent}%)</span><span className="font-bold" style={{ color: FINANCE_COLORS.emerald }}>+{formatNum(tier.bonusCoins)}</span></div>
              <div className="h-px" style={{ background: FINANCE_COLORS.border }} />
              <div className="flex justify-between"><span className="text-xs font-bold" style={{ color: FINANCE_COLORS.textPrimary }}>Total</span><span className="text-sm font-bold" style={{ color: tier.color }}>${tier.price}</span></div>
            </div>
          </div>

          {/* Payment methods */}
          <div>
            <h3 className="text-xs font-bold mb-2" style={{ color: FINANCE_COLORS.textPrimary }}>Payment Method</h3>
            <div className="grid grid-cols-3 gap-2">
              {PAYMENT_METHODS.map((pm) => (
                <button key={pm.id} onClick={() => setPaymentMethod(pm.id)} className={`p-2.5 rounded-xl flex flex-col items-center gap-1 transition active:scale-95 ${paymentMethod === pm.id ? "border-2" : "border"}`} style={paymentMethod === pm.id ? { background: `${pm.color}08`, borderColor: pm.color } : { background: FINANCE_COLORS.bg, borderColor: FINANCE_COLORS.border }}>
                  <span className="text-lg">{pm.icon}</span>
                  <span className="text-[9px] font-semibold" style={{ color: FINANCE_COLORS.textPrimary }}>{pm.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Benefits preview */}
          <div className="rounded-xl p-3" style={{ background: FINANCE_COLORS.bg }}>
            <p className="text-[10px] font-bold mb-2" style={{ color: FINANCE_COLORS.textPrimary }}>Included Benefits ({tier.benefitsDuration})</p>
            <div className="space-y-1">
              {tier.benefits.slice(0, 4).map((b, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <Check size={10} style={{ color: FINANCE_COLORS.emerald }} />
                  <span className="text-[10px]" style={{ color: FINANCE_COLORS.textSecondary }}>{b}</span>
                </div>
              ))}
              {tier.benefits.length > 4 && <span className="text-[9px]" style={{ color: FINANCE_COLORS.textSecondary }}>+{tier.benefits.length - 4} more</span>}
            </div>
          </div>

          {/* Confirm button */}
          <button onClick={onConfirm} className="w-full py-3.5 rounded-xl text-white text-sm font-bold active:scale-95 transition flex items-center justify-center gap-2" style={{ background: tier.gradient, boxShadow: `0 4px 12px ${tier.color}40` }}>
            <Shield size={16} /> Pay ${tier.price} & Receive {formatNum(tier.totalCoins)} Coins
          </button>
          <p className="text-[9px] text-center" style={{ color: FINANCE_COLORS.textSecondary }}>🔒 Secure payment · Instant coin delivery · Receipt saved to wallet</p>
        </div>
      </div>
    </div>
  );
}

function SuccessModal({ tier, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-sm rounded-3xl p-6 bg-white text-center animate-fadeIn" style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
        <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: `${FINANCE_COLORS.emerald}15`, border: `2px solid ${FINANCE_COLORS.emerald}` }}>
          <Check size={36} style={{ color: FINANCE_COLORS.emerald }} />
        </div>
        <h2 className="text-lg font-bold mb-1" style={{ color: FINANCE_COLORS.textPrimary }}>Payment Successful!</h2>
        <p className="text-xs mb-4" style={{ color: FINANCE_COLORS.textSecondary }}>Your coins have been added to your wallet</p>
        <div className="rounded-2xl p-4 mb-4" style={{ background: `${tier.color}08`, border: `1px solid ${tier.color}20` }}>
          <div className="flex items-center justify-center gap-2 mb-2">
            <Coins size={20} style={{ color: tier.color }} />
            <span className="text-2xl font-bold" style={{ color: tier.color }}>{formatNum(tier.totalCoins)}</span>
          </div>
          <p className="text-[10px]" style={{ color: FINANCE_COLORS.textSecondary }}>Coins Added · ${tier.price} · {tier.label}</p>
        </div>
        <div className="rounded-xl p-3 mb-4" style={{ background: FINANCE_COLORS.bg }}>
          <p className="text-[10px] font-bold mb-1" style={{ color: FINANCE_COLORS.textPrimary }}>Benefits Activated ({tier.benefitsDuration})</p>
          <p className="text-[9px]" style={{ color: FINANCE_COLORS.textSecondary }}>{tier.benefits.length} premium perks now active on your account</p>
        </div>
        <button onClick={onClose} className="w-full py-3 rounded-xl text-white text-sm font-bold active:scale-95 transition" style={{ background: FINANCE_COLORS.navyGradient }}>
          Done
        </button>
      </div>
    </div>
  );
}

function WalletSheet({ onClose }) {
  const [filter, setFilter] = useState("all");
  const transactions = WALLET_INFO.transactions.filter((t) => filter === "all" || t.type === filter);

  const typeConfig = {
    recharge: { icon: "⚡", color: FINANCE_COLORS.emerald, label: "Recharge" },
    spend: { icon: "💸", color: FINANCE_COLORS.error, label: "Spent" },
    bonus: { icon: "🎁", color: FINANCE_COLORS.gold, label: "Bonus" },
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white rounded-t-3xl max-h-[85vh] overflow-y-auto animate-fadeIn">
        <div className="sticky top-0 bg-white pt-3 pb-2 z-10 border-b" style={{ borderColor: FINANCE_COLORS.border }}>
          <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-2" />
          <div className="flex items-center justify-between px-4">
            <h2 className="text-sm font-bold" style={{ color: FINANCE_COLORS.textPrimary }}>Wallet Transactions</h2>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center active:scale-95 transition">
              <X size={16} className="text-gray-500" />
            </button>
          </div>
        </div>
        <div className="px-4 pb-6">
          {/* Balance */}
          <div className="rounded-2xl p-4 mt-3 mb-3" style={{ background: FINANCE_COLORS.navyGradient }}>
            <p className="text-[10px] text-white/60 mb-1">Current Balance</p>
            <h3 className="text-2xl font-bold text-white">{formatNum(WALLET_INFO.currentBalance)} <span className="text-sm" style={{ color: FINANCE_COLORS.goldLight }}>Coins</span></h3>
          </div>
          {/* Filters */}
          <div className="flex gap-2 mb-3">
            {[{ id: "all", label: "All" }, { id: "recharge", label: "Recharges" }, { id: "spend", label: "Spent" }, { id: "bonus", label: "Bonus" }].map((f) => (
              <button key={f.id} onClick={() => setFilter(f.id)} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition active:scale-95 ${filter === f.id ? "text-white" : ""}`} style={filter === f.id ? { background: FINANCE_COLORS.navyGradient } : { background: FINANCE_COLORS.bg, color: FINANCE_COLORS.textSecondary, border: `1px solid ${FINANCE_COLORS.border}` }}>
                {f.label}
              </button>
            ))}
          </div>
          {/* Transactions */}
          <div className="space-y-2">
            {transactions.map((tx) => {
              const cfg = typeConfig[tx.type];
              return (
                <div key={tx.id} className="rounded-xl p-3 flex items-center gap-3" style={{ background: FINANCE_COLORS.bg, border: `1px solid ${FINANCE_COLORS.border}` }}>
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${cfg.color}15` }}>
                    <span className="text-sm">{cfg.icon}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold" style={{ color: FINANCE_COLORS.textPrimary }}>{tx.tier || tx.desc || cfg.label}</p>
                    <p className="text-[9px]" style={{ color: FINANCE_COLORS.textSecondary }}>{tx.date} · {cfg.label}{tx.price ? ` · $${tx.price}` : ""}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold" style={{ color: cfg.color }}>{tx.type === "spend" ? "-" : "+"}{formatNum(tx.amount)}</p>
                    <p className="text-[8px]" style={{ color: FINANCE_COLORS.textSecondary }}>coins</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}