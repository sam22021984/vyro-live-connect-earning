import React, { useState } from "react";
import { Search, CheckCircle, XCircle, Eye, Wallet, DollarSign, Clock } from "lucide-react";
import { SAM_USERS } from "@/components/sam-dashboard/samData";
import { useToast } from "@/components/ui/use-toast";

const statusColors = { active: "#10B981", suspended: "#F59E0B", blocked: "#EF4444" };

export default function UserManagementModule() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState(SAM_USERS);
  const { toast } = useToast();
  const filtered = users.filter((u) => u.name.toLowerCase().includes(search.toLowerCase()) || u.id.toLowerCase().includes(search.toLowerCase()));

  const toggleStatus = (id) => {
    setUsers((prev) => prev.map((u) => {
      if (u.id !== id) return u;
      const next = u.status === "active" ? "suspended" : "active";
      toast({ title: `${u.name} ${next === "active" ? "activated" : "suspended"}` });
      return { ...u, status: next };
    }));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
        <Search size={14} style={{ color: "rgba(244,240,250,0.4)" }} />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search users by name or ID..." className="flex-1 bg-transparent text-xs outline-none" style={{ color: "#F4F0FA" }} />
      </div>
      {filtered.map((u) => (
        <div key={u.id} className="rounded-2xl p-3" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="flex items-center gap-3">
            <img src={u.avatar} alt={u.name} className="w-10 h-10 rounded-full object-cover" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="text-xs font-bold truncate" style={{ color: "#F4F0FA" }}>{u.name}</h4>
                <span className="text-[8px] px-1.5 py-0.5 rounded-full font-bold" style={{ background: `${statusColors[u.status]}20`, color: statusColors[u.status] }}>{u.status.toUpperCase()}</span>
              </div>
              <p className="text-[9px]" style={{ color: "rgba(244,240,250,0.4)" }}>{u.id} · {u.country} · {u.joined}</p>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-[9px] flex items-center gap-1" style={{ color: "#D4AF37" }}><Wallet size={9} /> {u.coins.toLocaleString()}</span>
                <span className="text-[9px] flex items-center gap-1" style={{ color: "#10B981" }}><DollarSign size={9} /> {u.earnings}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-2.5">
            <button onClick={() => toggleStatus(u.id)} className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[9px] font-bold active:scale-90 transition" style={{ background: u.status === "active" ? "#F59E0B15" : "#10B98115", color: u.status === "active" ? "#F59E0B" : "#10B981", border: `1px solid ${u.status === "active" ? "#F59E0B30" : "#10B98130"}` }}>
              {u.status === "active" ? <><Clock size={10} /> Suspend</> : <><CheckCircle size={10} /> Activate</>}
            </button>
            <button onClick={() => toast({ title: "Viewing " + u.name + " history" })} className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[9px] font-bold" style={{ background: "#3B82F615", color: "#3B82F6", border: "1px solid #3B82F630" }}>
              <Eye size={10} /> History
            </button>
            <button onClick={() => toast({ title: "Viewing wallet" })} className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[9px] font-bold" style={{ background: "#D4AF3715", color: "#D4AF37", border: "1px solid #D4AF3730" }}>
              <Wallet size={10} /> Wallet
            </button>
            <button onClick={() => toast({ title: "Viewing earnings" })} className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[9px] font-bold" style={{ background: "#10B98115", color: "#10B981", border: "1px solid #10B98130" }}>
              <DollarSign size={10} /> Earnings
            </button>
            {u.status !== "blocked" && (
              <button onClick={() => { setUsers((prev) => prev.map((x) => x.id === u.id ? { ...x, status: "blocked" } : x)); toast({ title: u.name + " blocked" }); }} className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[9px] font-bold" style={{ background: "#EF444415", color: "#EF4444", border: "1px solid #EF444430" }}>
                <XCircle size={10} /> Block
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}