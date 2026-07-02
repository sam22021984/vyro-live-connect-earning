import React, { useState } from "react";
import { Coins, CreditCard, Check } from "lucide-react";

const paymentMethods = [
  { name: "Credit Card", icon: "💳" },
  { name: "Debit Card", icon: "💳" },
  { name: "PayPal", icon: "🅿️" },
  { name: "JazzCash", icon: "📱" },
  { name: "EasyPaisa", icon: "📲" },
  { name: "Bank Payment", icon: "🏦" },
];

export default function VipPurchaseTab() {
  const [method, setMethod] = useState("coins");

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-base font-bold text-amber-300 text-center">💳 VIP Purchase Center</h2>

      <div className="text-center py-2">
        <div className="text-4xl mb-1">💳</div>
        <h3 className="text-sm font-bold text-amber-300">Premium Payment Gateway</h3>
        <p className="text-xs text-gray-400">Choose your payment method</p>
      </div>

      {/* Payment method toggle */}
      <div className="grid grid-cols-2 gap-2.5">
        <button
          onClick={() => setMethod("coins")}
          className={`p-4 rounded-2xl border transition ${method === "coins" ? "bg-amber-500/20 border-amber-500/40" : "bg-white/5 border-white/10"}`}
        >
          <Coins size={24} className="text-amber-400 mx-auto mb-1" />
          <p className="text-sm font-bold text-amber-300">Pay With Coins</p>
        </button>
        <button
          onClick={() => setMethod("cash")}
          className={`p-4 rounded-2xl border transition ${method === "cash" ? "bg-amber-500/20 border-amber-500/40" : "bg-white/5 border-white/10"}`}
        >
          <CreditCard size={24} className="text-amber-400 mx-auto mb-1" />
          <p className="text-sm font-bold text-amber-300">Pay With Cash</p>
        </button>
      </div>

      {method === "coins" ? (
        <div className="rounded-2xl p-4 bg-white/5 border border-white/5 space-y-3">
          <h3 className="text-sm font-bold text-gray-200">Coin Payment Process</h3>
          {["Select VIP Level", "Select Duration", "Confirm Coins", "Activate VIP"].map((step, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center text-xs font-bold text-amber-400">{i + 1}</div>
              <span className="text-xs text-gray-300">{step}</span>
            </div>
          ))}
          <button className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-[#0A0118] text-sm font-bold active:scale-95 transition mt-2">
            Continue with Coins
          </button>
        </div>
      ) : (
        <div className="rounded-2xl p-4 bg-white/5 border border-white/5">
          <h3 className="text-sm font-bold text-gray-200 mb-3">Select Payment Method</h3>
          <div className="grid grid-cols-3 gap-2.5 mb-4">
            {paymentMethods.map((pm, i) => (
              <button
                key={i}
                className="flex flex-col items-center gap-1 p-3 rounded-xl bg-white/5 border border-white/5 active:scale-95 transition hover:border-amber-500/20"
              >
                <span className="text-2xl">{pm.icon}</span>
                <span className="text-[10px] text-gray-300 text-center">{pm.name}</span>
              </button>
            ))}
          </div>
          <div className="space-y-2 mb-4">
            {["Select Payment Method", "Confirm Amount", "Payment Verification", "VIP Activated"].map((step, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center text-xs font-bold text-amber-400">{i + 1}</div>
                <span className="text-xs text-gray-300">{step}</span>
              </div>
            ))}
          </div>
          <button className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-[#0A0118] text-sm font-bold active:scale-95 transition">
            Continue with Cash
          </button>
        </div>
      )}
    </div>
  );
}