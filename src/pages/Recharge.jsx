import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Coins, Check, Wallet, TrendingUp, Gift } from "lucide-react";
import { rechargeTiers, paymentMethods, formatNum } from "@/components/recharge/rechargeData";

export default function Recharge() {
  const navigate = useNavigate();
  const [selectedTier, setSelectedTier] = useState(null);
  const [category, setCategory] = useState("STARTER");
  const [step, setStep] = useState("tiers");
  const [payMethod, setPayMethod] = useState(null);

  const filteredTiers = rechargeTiers.filter((t) =>
    category === "STARTER" ? t.tier === "STARTER" : t.tier !== "STARTER"
  );

  const handleSelectTier = (tier) => {
    setSelectedTier(tier);
    setStep("payment");
  };

  const handleConfirmPayment = () => {
    setStep("success");
  };

  if (step === "success" && selectedTier) {
    return (
      <div className="min-h-screen bg-[#F8F9FC]">
        <div className="max-w-md mx-auto">
          <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-4 py-3 flex items-center gap-3">
            <button onClick={() => { setStep("tiers"); setSelectedTier(null); }} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center active:scale-95 transition">
              <ArrowLeft size={18} className="text-gray-700" />
            </button>
            <h1 className="text-base font-bold text-gray-800">Payment Complete</h1>
          </div>

          <div className="p-4">
            <div className="bg-white rounded-3xl p-8 border border-gray-50 shadow-sm text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <Check size={32} className="text-green-500" />
              </div>
              <h2 className="text-base font-bold text-gray-800 mb-1">Payment Successful!</h2>
              <p className="text-xs text-gray-400 mb-5">Your coins have been added to your wallet</p>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 mb-4 border border-green-100">
                <p className="text-[10px] text-gray-400 uppercase font-semibold">Coins Added</p>
                <p className="text-2xl font-bold text-green-600">{formatNum(selectedTier.total)}</p>
                <div className="flex items-center justify-center gap-2 mt-1">
                  <span className="text-xs text-gray-500">{formatNum(selectedTier.coins)} base</span>
                  <span className="text-xs font-bold text-green-500">+{formatNum(selectedTier.bonusCoins)} bonus</span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-3 mb-4 text-left">
                <div className="flex justify-between text-xs py-1">
                  <span className="text-gray-400">Amount Paid</span>
                  <span className="font-bold text-gray-700">${selectedTier.price}</span>
                </div>
                <div className="flex justify-between text-xs py-1">
                  <span className="text-gray-400">Benefits Duration</span>
                  <span className="font-bold text-gray-700">{selectedTier.duration}</span>
                </div>
                <div className="flex justify-between text-xs py-1">
                  <span className="text-gray-400">Bonus Rate</span>
                  <span className="font-bold text-green-500">+{selectedTier.bonusPct}%</span>
                </div>
              </div>

              <div className="bg-amber-50 rounded-2xl p-3 border border-amber-100 mb-5 text-left">
                <p className="text-[10px] font-bold text-amber-600 mb-1.5 flex items-center gap-1">
                  <Gift size={12} /> Benefits Activated
                </p>
                <div className="space-y-1">
                  {selectedTier.benefits.slice(0, 4).map((b, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <Check size={10} className="text-green-500 flex-shrink-0" />
                      <span className="text-[10px] text-amber-700">{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button onClick={() => navigate("/more-services")} className="w-full py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-bold active:scale-95 transition">
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === "payment" && selectedTier) {
    return (
      <div className="min-h-screen bg-[#F8F9FC]">
        <div className="max-w-md mx-auto">
          <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-4 py-3 flex items-center gap-3">
            <button onClick={() => setStep("tiers")} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center active:scale-95 transition">
              <ArrowLeft size={18} className="text-gray-700" />
            </button>
            <h1 className="text-base font-bold text-gray-800">Payment Method</h1>
          </div>

          <div className="p-4 space-y-4">
            {/* Order summary */}
            <div className="bg-white rounded-2xl p-4 border border-gray-50 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold text-gray-700">Order Summary</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white" style={{ background: selectedTier.color }}>
                  ${selectedTier.price} TIER
                </span>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: `${selectedTier.color}20`, border: `1px solid ${selectedTier.color}40` }}>
                  <Coins size={20} style={{ color: selectedTier.color }} />
                </div>
                <div className="flex-1">
                  <p className="text-lg font-bold text-gray-800">{formatNum(selectedTier.total)} Coins</p>
                  <p className="text-[10px] text-gray-400">{formatNum(selectedTier.coins)} + {formatNum(selectedTier.bonusCoins)} bonus ({selectedTier.bonusPct}%)</p>
                </div>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                <span className="text-xs text-gray-400">Total Amount</span>
                <span className="text-lg font-bold text-gray-800">${selectedTier.price}</span>
              </div>
            </div>

            {/* Payment methods */}
            <div>
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-1">Choose Payment Method</h3>
              <div className="space-y-2.5">
                {paymentMethods.map((pm) => (
                  <button
                    key={pm.id}
                    onClick={() => setPayMethod(pm.id)}
                    className={`w-full flex items-center gap-3 p-4 rounded-2xl border transition active:scale-95 ${payMethod === pm.id ? "bg-green-50 border-green-300" : "bg-white border-gray-50"}`}
                  >
                    <div className="w-11 h-11 rounded-2xl bg-gray-50 flex items-center justify-center text-2xl flex-shrink-0">{pm.icon}</div>
                    <div className="flex-1 text-left">
                      <p className="text-sm font-bold text-gray-800">{pm.name}</p>
                      <p className="text-[10px] text-gray-400">{pm.desc}</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${payMethod === pm.id ? "border-green-500 bg-green-500" : "border-gray-200"}`}>
                      {payMethod === pm.id && <Check size={12} className="text-white" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Payment process */}
            <div className="bg-white rounded-2xl p-4 border border-gray-50 shadow-sm">
              <h3 className="text-xs font-bold text-gray-700 mb-3">🔒 Payment Process</h3>
              <div className="space-y-2">
                {["Select Recharge Tier", "Choose Payment Method", "Complete Secure Payment", "Payment Verification", "Coins Added to Wallet Instantly", "Bonus Coins Applied Automatically", "Tier Benefits Activated Automatically"].map((s, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-[10px] font-bold text-green-500">{i + 1}</div>
                    <span className="text-xs text-gray-600">{s}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              disabled={!payMethod}
              onClick={handleConfirmPayment}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-bold shadow-lg shadow-green-200 active:scale-95 transition disabled:opacity-40 flex items-center justify-center gap-2"
            >
              <Check size={16} />
              Pay ${selectedTier.price} & Recharge
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Default: tiers list
  return (
    <div className="min-h-screen bg-[#F8F9FC]">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-4 py-3 flex items-center gap-3">
          <button onClick={() => navigate("/more-services")} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center active:scale-95 transition">
            <ArrowLeft size={18} className="text-gray-700" />
          </button>
          <div className="flex-1">
            <h1 className="text-base font-bold text-gray-800">Coins Recharge</h1>
            <p className="text-[10px] text-gray-400">Wallet System · $1 = 20,000 coins</p>
          </div>
          <Wallet size={18} className="text-gray-400" />
        </div>

        <div className="p-4 space-y-4">
          {/* Wallet balance card */}
          <div className="rounded-2xl p-4 bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg shadow-green-200">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Wallet size={16} />
                <span className="text-xs font-semibold opacity-90">Wallet Balance</span>
              </div>
              <TrendingUp size={14} className="opacity-80" />
            </div>
            <p className="text-2xl font-bold">2,450,000 <span className="text-sm font-normal opacity-80">coins</span></p>
            <div className="flex gap-2 mt-3">
              <div className="flex-1 bg-white/15 rounded-lg p-2">
                <p className="text-[10px] opacity-80">Bonus Rate</p>
                <p className="text-sm font-bold">+5% to +22%</p>
              </div>
              <div className="flex-1 bg-white/15 rounded-lg p-2">
                <p className="text-[10px] opacity-80">Active Benefits</p>
                <p className="text-sm font-bold">3 Active</p>
              </div>
            </div>
          </div>

          {/* Category tabs */}
          <div className="bg-white rounded-2xl p-1.5 flex shadow-sm border border-gray-100">
            <button
              onClick={() => setCategory("STARTER")}
              className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition ${category === "STARTER" ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-sm" : "text-gray-400"}`}
            >
              Starter ($1-$5)
            </button>
            <button
              onClick={() => setCategory("PREMIUM")}
              className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition ${category === "PREMIUM" ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-sm" : "text-gray-400"}`}
            >
              Premium ($5-$5000)
            </button>
          </div>

          {/* Tier cards */}
          <div className="space-y-3">
            {filteredTiers.map((tier) => (
              <button
                key={tier.id}
                onClick={() => handleSelectTier(tier)}
                className="w-full text-left bg-white rounded-2xl overflow-hidden border border-gray-50 shadow-sm active:scale-[0.99] transition"
              >
                {/* Top bar */}
                <div className="h-1.5" style={{ background: tier.color }} />

                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{ background: `${tier.color}20`, border: `1px solid ${tier.color}40` }}>
                        <Coins size={20} style={{ color: tier.color }} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-bold text-gray-800">${tier.price} Tier</h3>
                          {tier.tier === "MAX" && (
                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full text-white" style={{ background: tier.color }}>👑 MAX</span>
                          )}
                        </div>
                        <p className="text-[10px] text-gray-400">Benefits: {tier.duration}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-gray-400">Total</p>
                      <p className="text-sm font-bold" style={{ color: tier.color }}>{formatNum(tier.total)}</p>
                    </div>
                  </div>

                  {/* Coins breakdown */}
                  <div className="bg-gray-50 rounded-xl p-3 mb-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">Base Coins</span>
                      <span className="font-semibold text-gray-700">{formatNum(tier.coins)}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs mt-1">
                      <span className="text-gray-500 flex items-center gap-1">
                        <Gift size={10} /> Bonus ({tier.bonusPct}%)
                      </span>
                      <span className="font-semibold text-green-500">+{formatNum(tier.bonusCoins)}</span>
                    </div>
                    <div className="border-t border-gray-200 mt-2 pt-2 flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-700">Total Coins</span>
                      <span className="text-sm font-bold text-gray-800">{formatNum(tier.total)}</span>
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="flex flex-wrap gap-1.5">
                    {tier.benefits.slice(0, 4).map((b, i) => (
                      <span key={i} className="text-[9px] px-2 py-1 rounded-lg bg-gray-50 text-gray-500 font-medium border border-gray-100">
                        {b.split("(")[0].trim()}
                      </span>
                    ))}
                    {tier.benefits.length > 4 && (
                      <span className="text-[9px] px-2 py-1 rounded-lg bg-gray-100 text-gray-400 font-medium">
                        +{tier.benefits.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Buy button */}
                <div className="px-4 pb-4">
                  <div
                    className="w-full py-2.5 rounded-xl text-white text-xs font-bold text-center active:scale-95 transition flex items-center justify-center gap-1.5"
                    style={{ background: `linear-gradient(to right, ${tier.color}, ${tier.color}dd)` }}
                  >
                    <Coins size={14} />
                    Recharge ${tier.price}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Payment methods info */}
          <div className="bg-white rounded-2xl p-4 border border-gray-50 shadow-sm">
            <h3 className="text-xs font-bold text-gray-700 mb-3 flex items-center gap-1">
              💳 Accepted Payment Methods
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {paymentMethods.map((pm) => (
                <div key={pm.id} className="flex flex-col items-center gap-1 p-3 rounded-xl bg-gray-50">
                  <span className="text-xl">{pm.icon}</span>
                  <span className="text-[10px] font-semibold text-gray-600 text-center">{pm.name}</span>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-gray-400 text-center mt-3">
              🔒 Secure encrypted payment · Instant coin credit · Auto bonus & benefits
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}