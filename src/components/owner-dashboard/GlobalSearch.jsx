import React, { useState } from "react";
import { Search, X, UserX, UserCheck, Shield, MessageSquare, ChevronRight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function GlobalSearch() {
  const { toast } = useToast();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);

  const handleSearch = () => {
    if (!query.trim()) return;
    setResults({
      userId: "VYR-4829",
      username: "LunaStar",
      email: "luna@vyro.live",
      role: "Host",
      country: "United States",
      revenue: "$28,471",
      wallet: "12,847 coins",
      giftsSent: "8,294",
      giftsReceived: "18,472",
      reports: 2,
      violations: 0,
      status: "Active",
    });
  };

  const quickActions = [
    { label: "View Profile", icon: ChevronRight, color: "#2F80ED" },
    { label: "Suspend", icon: UserX, color: "#EB5757" },
    { label: "Reactivate", icon: UserCheck, color: "#27AE60" },
    { label: "Promote", icon: Shield, color: "#A78BFA" },
    { label: "Message", icon: MessageSquare, color: "#56CCF2" },
  ];

  return (
    <div className="space-y-4">
      <div className="text-center mb-2">
        <h3 className="text-base font-bold" style={{ color: "#0F1B3D" }}>Global Search Center</h3>
        <p className="text-[11px]" style={{ color: "#6B7280" }}>Search any entity across the platform</p>
      </div>

      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#9CA3AF" }} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="User ID, VYRO ID, email, phone..."
            className="w-full py-2.5 pl-9 pr-3 rounded-xl text-xs outline-none"
            style={{ border: "1px solid #E5E7EB", background: "#FFFFFF", color: "#0F1B3D" }}
          />
        </div>
        <button
          onClick={handleSearch}
          className="px-4 rounded-xl text-xs font-bold text-white active:scale-95 transition"
          style={{ background: "linear-gradient(135deg, #2F80ED, #56CCF2)" }}
        >
          Search
        </button>
      </div>

      {results && (
        <div className="rounded-2xl p-4" style={{ background: "#FFFFFF", border: "1px solid #E5E7EB", boxShadow: "0 8px 24px rgba(0,0,0,0.06)" }}>
          <div className="flex items-center justify-between mb-3">
            <div>
              <h4 className="text-sm font-bold" style={{ color: "#0F1B3D" }}>{results.username}</h4>
              <p className="text-[10px]" style={{ color: "#9CA3AF" }}>{results.userId} · {results.email}</p>
            </div>
            <span className="text-[9px] px-2 py-1 rounded-full font-bold" style={{ background: "#27AE6015", color: "#27AE60" }}>{results.status}</span>
          </div>
          <div className="grid grid-cols-2 gap-2 mb-3">
            {[
              { label: "Role", value: results.role },
              { label: "Country", value: results.country },
              { label: "Revenue", value: results.revenue },
              { label: "Wallet", value: results.wallet },
              { label: "Gifts Sent", value: results.giftsSent },
              { label: "Gifts Received", value: results.giftsReceived },
              { label: "Reports", value: results.reports },
              { label: "Violations", value: results.violations },
            ].map((f, i) => (
              <div key={i} className="rounded-lg p-2" style={{ background: "#F7F9FC" }}>
                <p className="text-[8px]" style={{ color: "#9CA3AF" }}>{f.label}</p>
                <p className="text-xs font-bold" style={{ color: "#0F1B3D" }}>{f.value}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {quickActions.map((a, i) => (
              <button
                key={i}
                onClick={() => toast({ title: a.label + " — " + results.username })}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[9px] font-bold active:scale-95 transition"
                style={{ background: `${a.color}10`, color: a.color, border: `1px solid ${a.color}20` }}
              >
                <a.icon size={11} /> {a.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}