import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Wallet, Check, X, Coins, Loader2, Shield, AlertCircle, TrendingDown, Mail } from "lucide-react";
import { FINANCE_COLORS } from "@/components/finance/financeOptionsData";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";

const COINS_PER_USD = 20000;
const formatNum = (n) => n.toLocaleString();

export default function Withdraw() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const [coinBalance, setCoinBalance] = useState(null);
  const [coinsToWithdraw, setCoinsToWithdraw] = useState("");
  const [paypalEmail, setPaypalEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [resultData, setResultData] = useState(null);
  const [withdrawals, setWithdrawals] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    if (!user?.id) { setLoading(false); return; }
    try {
      const profiles = await base44.entities.UserProfile.filter({ user_id: user.id });
      if (profiles.length > 0) setCoinBalance(profiles[0].coins || 0);
      const txns = await base44.entities.Transaction.filter({ user_id: user.id, type: "withdraw" });
      setWithdrawals(txns);
    } catch (e) {}
    setLoading(false);
  };

  const usdAmount = coinsToWithdraw ? (parseInt(coinsToWithdraw) / COINS_PER_USD) : 0;
  const canWithdraw = coinBalance !== null && parseInt(coinsToWithdraw) >= COINS_PER_USD && parseInt(coinsToWithdraw) <= coinBalance && paypalEmail.includes("@");

  const handleMax = () => {
    if (coinBalance) setCoinsToWithdraw(String(coinBalance));
  };

  const handleSubmit = async () => {
    if (!canWithdraw) return;
    setProcessing(true);
    try {
      const res = await base44.functions.invoke("paypalWithdraw", {
        coins: parseInt(coinsToWithdraw),
        paypal_email: paypalEmail,
      });
      if (res.data?.success) {
        setResultData({ coins: parseInt(coinsToWithdraw), usd: res.data.amount_usd, email: paypalEmail });
        setShowSuccess(true);
        setCoinsToWithdraw("");
        setPaypalEmail("");
        await loadData();
      } else {
        toast({ title: "Withdrawal failed", description: res.data?.error, variant: "destructive" });
      }
    } catch (err) {
      toast({ title: "Withdrawal error", description: err.message, variant: "destructive" });
    }
    setProcessing(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: FINANCE_COLORS.bg }}>
        <Loader2 size={32} className="animate-spin" style={{ color: FINANCE_COLORS.navy }} />
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24" style={{ background: FINANCE_COLORS.bg }}>
      {/* Header */}
      <div className="sticky top-0 z-30 px-4 py-3" style={{ background: FINANCE_COLORS.navyGradient, boxShadow: "0 4px 20px rgba(15,27,61,0.3)" }}>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/coins-recharge")} className="w-9 h-9 rounded-full flex items-center justify-center active:scale-95 transition" style={{ background: "rgba(255,255,255,0.1)" }}>
            <ArrowLeft size={18} className="text-white" />
          </button>
          <div className="flex-1">
            <h1 className="text-base font-bold text-white">Withdraw Coins</h1>
            <p className="text-[10px] text-white/60">Auto-processed via PayPal</p>
          </div>
        </div>
      </div>

      {/* Balance Card */}
      <div className="px-4 pt-3">
        <div className="rounded-2xl p-4 relative overflow-hidden" style={{ background: FINANCE_COLORS.navyGradient, boxShadow: "0 4px 16px rgba(15,27,61,0.2)" }}>
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10" style={{ background: FINANCE_COLORS.gold, filter: "blur(40px)" }} />
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${FINANCE_COLORS.gold}20`, border: `1px solid ${FINANCE_COLORS.gold}40` }}>
                <Coins size={14} style={{ color: FINANCE_COLORS.goldLight }} />
              </div>
              <span className="text-xs text-white/70 font-semibold">Available Balance</span>
            </div>
            <h2 className="text-2xl font-bold text-white">{coinBalance !== null ? formatNum(coinBalance) : "—"} <span className="text-sm" style={{ color: FINANCE_COLORS.goldLight }}>Coins</span></h2>
            <p className="text-[10px] text-white/50 mt-1">≈ ${coinBalance ? (coinBalance / COINS_PER_USD).toFixed(2) : "0.00"} USD</p>
          </div>
        </div>
      </div>

      {/* Exchange Rate Info */}
      <div className="px-4 pt-3">
        <div className="rounded-xl p-3 flex items-center gap-3" style={{ background: FINANCE_COLORS.card, border: `1px solid ${FINANCE_COLORS.border}` }}>
          <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${FINANCE_COLORS.navy}10`, border: `1px solid ${FINANCE_COLORS.navy}30` }}>
            <TrendingDown size={16} style={{ color: FINANCE_COLORS.navy }} />
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold" style={{ color: FINANCE_COLORS.textPrimary }}>Exchange Rate</p>
            <p className="text-[10px]" style={{ color: FINANCE_COLORS.textSecondary }}>20,000 Coins = $1 USD · Min: 20,000 coins ($1)</p>
          </div>
        </div>
      </div>

      {/* Withdraw Form */}
      <div className="px-4 pt-4">
        <div className="rounded-2xl p-4 space-y-4" style={{ background: FINANCE_COLORS.card, border: `1px solid ${FINANCE_COLORS.border}` }}>
          {/* Coins input */}
          <div>
            <label className="text-xs font-bold mb-1.5 block" style={{ color: FINANCE_COLORS.textPrimary }}>Coins to Withdraw</label>
            <div className="relative">
              <Coins size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: FINANCE_COLORS.textSecondary }} />
              <Input
                type="number"
                value={coinsToWithdraw}
                onChange={(e) => setCoinsToWithdraw(e.target.value)}
                placeholder="Enter coin amount"
                className="pl-10 pr-16 rounded-xl text-sm"
                style={{ height: "48px" }}
              />
              <button onClick={handleMax} className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-bold px-2.5 py-1 rounded-lg" style={{ background: `${FINANCE_COLORS.navy}10`, color: FINANCE_COLORS.navy }}>
                MAX
              </button>
            </div>
            {coinsToWithdraw && parseInt(coinsToWithdraw) > 0 && (
              <p className="text-[10px] mt-1" style={{ color: FINANCE_COLORS.emerald }}>
                ≈ ${usdAmount.toFixed(2)} USD
              </p>
            )}
            {coinsToWithdraw && coinBalance !== null && parseInt(coinsToWithdraw) > coinBalance && (
              <p className="text-[10px] mt-1 flex items-center gap-1" style={{ color: FINANCE_COLORS.error }}>
                <AlertCircle size={10} /> Insufficient balance
              </p>
            )}
          </div>

          {/* PayPal email */}
          <div>
            <label className="text-xs font-bold mb-1.5 block" style={{ color: FINANCE_COLORS.textPrimary }}>PayPal Email</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: FINANCE_COLORS.textSecondary }} />
              <Input
                type="email"
                value={paypalEmail}
                onChange={(e) => setPaypalEmail(e.target.value)}
                placeholder="your@email.com"
                className="pl-10 rounded-xl text-sm"
                style={{ height: "48px" }}
              />
            </div>
            <p className="text-[9px] mt-1" style={{ color: FINANCE_COLORS.textSecondary }}>Funds will be sent to this PayPal account</p>
          </div>

          {/* Summary */}
          {canWithdraw && (
            <div className="rounded-xl p-3 space-y-1.5" style={{ background: `${FINANCE_COLORS.bg}` }}>
              <div className="flex justify-between text-[11px]">
                <span style={{ color: FINANCE_COLORS.textSecondary }}>Coins Withdrawn</span>
                <span className="font-bold" style={{ color: FINANCE_COLORS.textPrimary }}>{formatNum(parseInt(coinsToWithdraw))}</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span style={{ color: FINANCE_COLORS.textSecondary }}>USD Amount</span>
                <span className="font-bold" style={{ color: FINANCE_COLORS.emerald }}>${usdAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span style={{ color: FINANCE_COLORS.textSecondary }}>Delivery</span>
                <span className="font-bold" style={{ color: FINANCE_COLORS.navy }}>PayPal (Auto)</span>
              </div>
            </div>
          )}

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={!canWithdraw || processing}
            className="w-full py-3.5 rounded-xl text-white text-sm font-bold active:scale-95 transition flex items-center justify-center gap-2 disabled:opacity-50"
            style={{ background: "#00457C", boxShadow: canWithdraw ? "0 4px 12px rgba(0,69,124,0.4)" : "none" }}
          >
            {processing ? <Loader2 size={16} className="animate-spin" /> : <Shield size={16} />}
            {processing ? "Processing..." : `Withdraw ${usdAmount > 0 ? `$${usdAmount.toFixed(2)}` : ""}`}
          </button>
          <p className="text-[9px] text-center" style={{ color: FINANCE_COLORS.textSecondary }}>⚡ Auto-processed instantly · Coins deducted immediately</p>
        </div>
      </div>

      {/* Withdrawal History */}
      {withdrawals.length > 0 && (
        <div className="px-4 pt-4">
          <h3 className="text-xs font-bold mb-2" style={{ color: FINANCE_COLORS.textPrimary }}>Withdrawal History</h3>
          <div className="space-y-2">
            {withdrawals.map((tx) => (
              <div key={tx.id} className="rounded-xl p-3 flex items-center gap-3" style={{ background: FINANCE_COLORS.card, border: `1px solid ${FINANCE_COLORS.border}` }}>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${FINANCE_COLORS.error}15` }}>
                  <TrendingDown size={14} style={{ color: FINANCE_COLORS.error }} />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold" style={{ color: FINANCE_COLORS.textPrimary }}>${tx.amount_usd} to {tx.paypal_email}</p>
                  <p className="text-[9px]" style={{ color: FINANCE_COLORS.textSecondary }}>{formatNum(tx.coins)} coins · {tx.status}</p>
                </div>
                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full" style={{
                  background: tx.status === "completed" ? `${FINANCE_COLORS.emerald}15` : tx.status === "failed" ? `${FINANCE_COLORS.error}15` : `${FINANCE_COLORS.gold}15`,
                  color: tx.status === "completed" ? FINANCE_COLORS.emerald : tx.status === "failed" ? FINANCE_COLORS.error : FINANCE_COLORS.gold,
                }}>
                  {tx.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccess && resultData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowSuccess(false)} />
          <div className="relative w-full max-w-sm rounded-3xl p-6 bg-white text-center animate-fadeIn" style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
            <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: `${FINANCE_COLORS.emerald}15`, border: `2px solid ${FINANCE_COLORS.emerald}` }}>
              <Check size={36} style={{ color: FINANCE_COLORS.emerald }} />
            </div>
            <h2 className="text-lg font-bold mb-1" style={{ color: FINANCE_COLORS.textPrimary }}>Withdrawal Sent!</h2>
            <p className="text-xs mb-4" style={{ color: FINANCE_COLORS.textSecondary }}>${resultData.usd} sent to your PayPal</p>
            <div className="rounded-2xl p-4 mb-4" style={{ background: `${FINANCE_COLORS.emerald}08`, border: `1px solid ${FINANCE_COLORS.emerald}20` }}>
              <div className="flex items-center justify-center gap-2 mb-1">
                <Wallet size={18} style={{ color: FINANCE_COLORS.emerald }} />
                <span className="text-xl font-bold" style={{ color: FINANCE_COLORS.emerald }}>${resultData.usd}</span>
              </div>
              <p className="text-[10px]" style={{ color: FINANCE_COLORS.textSecondary }}>{formatNum(resultData.coins)} coins → {resultData.email}</p>
            </div>
            <button onClick={() => setShowSuccess(false)} className="w-full py-3 rounded-xl text-white text-sm font-bold active:scale-95 transition" style={{ background: FINANCE_COLORS.navyGradient }}>
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}