import React from "react";
import { useNavigate } from "react-router-dom";
import { Coins, Diamond, Wallet, Clock, ArrowUpRight, ArrowDownLeft, History } from "lucide-react";

export default function WalletSummary({ profile }) {
  const navigate = useNavigate();

  return (
    <div className="px-3 pt-4">
      <h2 className="text-sm font-bold text-gray-800 mb-2 px-1">💰 Wallet Summary</h2>
      <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-fuchsia-600 p-4 text-white shadow-lg shadow-purple-200">
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <div className="flex items-center gap-1 text-white/70 text-[10px] mb-0.5"><Coins size={10} /> Coins</div>
            <p className="text-lg font-bold">{(profile?.coins || 0).toLocaleString()}</p>
          </div>
          <div>
            <div className="flex items-center gap-1 text-white/70 text-[10px] mb-0.5"><Diamond size={10} /> Diamonds</div>
            <p className="text-lg font-bold">{Math.floor((profile?.gifts_received || 0) * 0.4).toLocaleString()}</p>
          </div>
          <div>
            <div className="flex items-center gap-1 text-white/70 text-[10px] mb-0.5"><Wallet size={10} /> Wallet</div>
            <p className="text-lg font-bold">${((profile?.coins || 0) / 1000).toFixed(2)}</p>
          </div>
          <div>
            <div className="flex items-center gap-1 text-white/70 text-[10px] mb-0.5"><Clock size={10} /> Pending</div>
            <p className="text-lg font-bold">${((profile?.gifts_received || 0) * 0.001).toFixed(2)}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <button onClick={() => navigate("/coins-recharge")} className="flex-1 py-2.5 rounded-xl bg-white text-purple-600 text-xs font-bold flex items-center justify-center gap-1 active:scale-95 transition">
            <ArrowUpRight size={14} /> Recharge
          </button>
          <button onClick={() => navigate("/withdraw")} className="flex-1 py-2.5 rounded-xl bg-white/20 backdrop-blur-sm text-white text-xs font-bold flex items-center justify-center gap-1 active:scale-95 transition">
            <ArrowDownLeft size={14} /> Withdraw
          </button>
          <button onClick={() => navigate("/finance")} className="py-2.5 px-4 rounded-xl bg-white/20 backdrop-blur-sm text-white text-xs font-bold flex items-center justify-center gap-1 active:scale-95 transition">
            <History size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}