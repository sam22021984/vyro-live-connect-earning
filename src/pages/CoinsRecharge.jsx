import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Wallet, Check, X, Coins, TrendingUp, Gift, Clock, Zap, Crown, Shield, ChevronRight, Loader2, AlertCircle } from "lucide-react";
import { FINANCE_COLORS } from "@/components/finance/financeOptionsData";
import { RECHARGE_TIERS } from "@/components/finance/rechargeTiersData";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { useBackNav } from "@/hooks/useBackNav";

const formatNum = (n) => n.toLocaleString();

export default function CoinsRecharge() {
  const navigate = useNavigate();
  const handleBack = useBackNav("/finance");
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();

  const [activeGroup, setActiveGroup] = useState("starter");
  const [selectedTier, setSelectedTier] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showWallet, setShowWallet] = useState(false);
  const [creatingOrder, setCreatingOrder] = useState(false);
  const [capturing, setCapturing] = useState(false);
  const [coinBalance, setCoinBalance] = useState(null);
  const [transactions, setTransactions] = useState([]);

  const filteredTiers = RECHARGE_TIERS.filter((t) => t.group === activeGroup);

  useEffect(() => {
    loadWalletData();
    handleReturnFromPayPal();
  }, []);

  const loadWalletData = async () => {
    if (!user?.id) return;
    try {
      const profiles = await base44.entities.UserProfile.filter({ user_id: user.id });
      if (profiles.length > 0) setCoinBalance(profiles[0].coins || 0);
      const txns = await base44.entities.Transaction.filter({ user_id: user.id, type: "recharge" });
      setTransactions(txns);
    } catch (e) {}
  };

  const handleReturnFromPayPal = async () => {
    const status = searchParams.get("status");
    const orderId = searchParams.get("order_id") || searchParams.get("token");
    if (status === "success" && orderId) {
      setCapturing(true);
      try {
        const res = await base44.functions.invoke("paypalRecharge", {
          action: "capture",
          order_id: orderId,
        });
        if (res.data?.success) {
          setShowSuccess(true);
          await loadWalletData();
        } else {
          toast({ title: "Payment capture failed", description: res.data?.error, variant: "destructive" });
        }
      } catch (err) {
        const backendError = err.response?.data?.error || err.message;
        toast({ title: "Payment error", description: backendError, variant: "destructive" });
      }
      setCapturing(false);
      window.history.replaceState({}, "", "/coins-recharge");
    } else if (status === "cancelled") {
      toast({ title: "Payment cancelled", description: "You cancelled the PayPal payment." });
      window.history.replaceState({}, "", "/coins-recharge");
    }
  };

  const handleSelectTier = (tier) => {
    setSelectedTier(tier);
    setShowCheckout(true);
  };

  const handlePayWithPayPal = async () => {
    if (!selectedTier) return;
    setCreatingOrder(true);
    try {
      const res = await base44.functions.invoke("paypalRecharge", {
        action: "create",
        tier_id: selectedTier.id,
        tier_label: selectedTier.label,
        price: selectedTier.price,
        coins: selectedTier.coins,
        bonus_coins: selectedTier.bonusCoins,
      });
      if (res.data?.approval_url) {
        window.location.href = res.data.approval_url;
      } else {
        toast({ title: "Failed to create order", description: res.data?.error, variant: "destructive" });
      }
    } catch (err) {
      const backendError = err.response?.data?.error || err.message;
      toast({ title: "PayPal error", description: backendError, variant: "destructive" });
    }
    setCreatingOrder(false);
  };

  if (capturing) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: FINANCE_COLORS.bg }}>
        <Loader2 size={40} className="animate-spin mb-4" style={{ color: FINANCE_COLORS.navy }} />
        <h2 className="text-sm font-bold" style={{ color: FINANCE_COLORS.textPrimary }}>Processing Payment...</h2>
        <p className="text-xs mt-1" style={{ color: FINANCE_COLORS.textSecondary }}>Crediting your coins securely</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24" style={{ background: FINANCE_COLORS.bg }}>
      {/* Header */}
      <div className="sticky top-0 z-30 px-4 py-3" style={{ background: FINANCE_COLORS.navyGradient, boxShadow: "0 4px 20px rgba(15,27,61,0.3)" }}>
        <div className="flex items-center gap-3">
          <button onClick={handleBack} className="w-9 h-9 rounded-full flex items-center justify-center active:scale-95 transition" style={{ background: "rgba(255,255,255,0.1)" }}>
            <ArrowLeft size={18} className="text-white" />
          </button>
          <div className="flex-1">
            <h1 className="text-base font-bold text-white">Coins Recharge</h1>
            <p className="text-[10px] text-white/60">Secure PayPal Checkout · Instant Delivery</p>
          </div>
          <button onClick={() => setShowWallet(true)} className="w-9 h-9 rounded-full flex items-center justify-center active:scale-95 transition" style={{ background: `${FINANCE_COLORS.gold}20`, border: `1px solid ${FINANCE_COLORS.gold}40` }}>
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
              <button onClick={() => navigate("/withdraw")} className="text-[9px] px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1" style={{ background: `${FINANCE_COLORS.emerald}20`, color: FINANCE_COLORS.emerald }}>
                <ArrowLeft size={9} className="rotate-180" /> Withdraw
              </button>
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">
              {coinBalance !== null ? formatNum(coinBalance) : "—"} <span className="text-sm" style={{ color: FINANCE_COLORS.goldLight }}>Coins</span>
            </h2>
          </div>
        </div>
      </div>

      {/* PayPal Info Banner */}
      <div className="px-4 pt-3">
        <div className="rounded-xl p-3 flex items-center gap-3" style={{ background: `${FINANCE_COLORS.navy}08`, border: `1px solid ${FINANCE_COLORS.navy}20` }}>
          <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 text-white text-sm font-bold" style={{ background: "#00457C" }}>
            P
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold" style={{ color: FINANCE_COLORS.textPrimary }}>PayPal Secure Payment</p>
            <p className="text-[10px]" style={{ color: FINANCE_COLORS.textSecondary }}>$1 = 20,000 Coins · Bonus 5% → 22%</p>
          </div>
          <Shield size={14} style={{ color: FINANCE_COLORS.emerald }} />
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

      {/* Checkout Sheet */}
      {showCheckout && selectedTier && (
        <CheckoutSheet
          tier={selectedTier}
          onClose={() => setShowCheckout(false)}
          onPay={handlePayWithPayPal}
          loading={creatingOrder}
        />
      )}

      {/* Success Modal */}
      {showSuccess && selectedTier && (
        <SuccessModal tier={selectedTier} onClose={() => { setShowSuccess(false); setSelectedTier(null); }} />
      )}

      {/* Wallet View */}
      {showWallet && <WalletSheet transactions={transactions} coinBalance={coinBalance} onClose={() => setShowWallet(false)} />}
    </div>
  );
}

function TierCard({ tier, onSelect }) {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: FINANCE_COLORS.card, boxShadow: "0 2px 12px rgba(15,27,61,0.06), 0 1px 3px rgba(0,0,0,0.03)", border: `1px solid ${FINANCE_COLORS.border}` }}>
      <div className="h-1" style={{ background: tier.gradient }} />
      <div className="p-4">
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

        <button onClick={onSelect} className="w-full py-3 rounded-xl text-white text-xs font-bold active:scale-95 transition flex items-center justify-center gap-2" style={{ background: tier.gradient, boxShadow: `0 2px 8px ${tier.color}30` }}>
          Purchase ${tier.price} · Get {formatNum(tier.totalCoins)} Coins <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}

function CheckoutSheet({ tier, onClose, onPay, loading }) {
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

          <div>
            <h3 className="text-xs font-bold mb-2" style={{ color: FINANCE_COLORS.textPrimary }}>Payment Method</h3>
            <div className="rounded-xl p-3 flex items-center gap-3 border-2" style={{ background: `${FINANCE_COLORS.navy}08`, borderColor: FINANCE_COLORS.navy }}>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-sm font-bold" style={{ background: "#00457C" }}>P</div>
              <div className="flex-1">
                <p className="text-xs font-bold" style={{ color: FINANCE_COLORS.textPrimary }}>PayPal</p>
                <p className="text-[10px]" style={{ color: FINANCE_COLORS.textSecondary }}>Secure · Instant · Global</p>
              </div>
              <Check size={16} style={{ color: FINANCE_COLORS.navy }} />
            </div>
          </div>

          <button onClick={onPay} disabled={loading} className="w-full py-3.5 rounded-xl text-white text-sm font-bold active:scale-95 transition flex items-center justify-center gap-2" style={{ background: "#00457C", boxShadow: "0 4px 12px rgba(0,69,124,0.4)" }}>
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Shield size={16} />}
            {loading ? "Redirecting to PayPal..." : `Pay $${tier.price} with PayPal`}
          </button>
          <p className="text-[9px] text-center" style={{ color: FINANCE_COLORS.textSecondary }}>🔒 You'll be redirected to PayPal to complete your payment securely</p>
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
        <button onClick={onClose} className="w-full py-3 rounded-xl text-white text-sm font-bold active:scale-95 transition" style={{ background: FINANCE_COLORS.navyGradient }}>
          Done
        </button>
      </div>
    </div>
  );
}

function WalletSheet({ transactions, coinBalance, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white rounded-t-3xl max-h-[85vh] overflow-y-auto animate-fadeIn">
        <div className="sticky top-0 bg-white pt-3 pb-2 z-10 border-b" style={{ borderColor: FINANCE_COLORS.border }}>
          <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-2" />
          <div className="flex items-center justify-between px-4">
            <h2 className="text-sm font-bold" style={{ color: FINANCE_COLORS.textPrimary }}>Recharge History</h2>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center active:scale-95 transition">
              <X size={16} className="text-gray-500" />
            </button>
          </div>
        </div>
        <div className="px-4 pb-6">
          <div className="rounded-2xl p-4 mt-3 mb-3" style={{ background: FINANCE_COLORS.navyGradient }}>
            <p className="text-[10px] text-white/60 mb-1">Current Balance</p>
            <h3 className="text-2xl font-bold text-white">{coinBalance !== null ? formatNum(coinBalance) : "—"} <span className="text-sm" style={{ color: FINANCE_COLORS.goldLight }}>Coins</span></h3>
          </div>
          {transactions.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-xs" style={{ color: FINANCE_COLORS.textSecondary }}>No recharge history yet</p>
            </div>
          ) : (
            <div className="space-y-2">
              {transactions.map((tx) => (
                <div key={tx.id} className="rounded-xl p-3 flex items-center gap-3" style={{ background: FINANCE_COLORS.bg, border: `1px solid ${FINANCE_COLORS.border}` }}>
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${FINANCE_COLORS.emerald}15` }}>
                    <Coins size={14} style={{ color: FINANCE_COLORS.emerald }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold" style={{ color: FINANCE_COLORS.textPrimary }}>{tx.tier_label || "Recharge"}</p>
                    <p className="text-[9px]" style={{ color: FINANCE_COLORS.textSecondary }}>${tx.amount_usd} · {tx.status}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold" style={{ color: FINANCE_COLORS.emerald }}>+{formatNum(tx.coins)}</p>
                    <p className="text-[8px]" style={{ color: FINANCE_COLORS.textSecondary }}>coins</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}