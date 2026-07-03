import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft, Search, Check, X, TrendingUp, TrendingDown, Minus,
  Crown, Shield, Gift, Zap, Users, DollarSign, Coins, Bell,
  ChevronRight, Star, AlertTriangle, Clock, Award,
} from "lucide-react";
import { SELLER_DASHBOARD } from "@/components/seller-dashboard/sellerData";
import SellerPolicyTab from "@/components/seller-dashboard/SellerPolicyTab";
import SellerReportsTab from "@/components/seller-dashboard/SellerReportsTab";
import ReportToSection from "@/components/shared/ReportToSection";
import { useToast } from "@/components/ui/use-toast";

const DARK_BG = "#0A0E1A";
const CARD_BG = "#111827";
const GOLD = "#FFD700";
const TEAL = "#22D3EE";

export default function SellerDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [showRechargeModal, setShowRechargeModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [rechargeForm, setRechargeForm] = useState({ userId: "", amount: "", coins: "" });

  const handleAction = (action) => {
    toast({ title: action, description: "Action processed successfully." });
  };

  const handleRechargeSubmit = () => {
    if (!rechargeForm.userId || !rechargeForm.amount) {
      toast({ title: "Missing Info", description: "Please enter User ID and amount.", variant: "destructive" });
      return;
    }
    toast({ title: "Recharge Successful! ✅", description: `${rechargeForm.coins || '0'} coins sent to ${rechargeForm.userId}` });
    setShowRechargeModal(false);
    setRechargeForm({ userId: "", amount: "", coins: "" });
  };

  const filteredCustomers = SELLER_DASHBOARD.customers.filter(
    (c) => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredHistory = SELLER_DASHBOARD.rechargeHistory.filter(
    (h) => h.customer.toLowerCase().includes(searchQuery.toLowerCase()) || h.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen" style={{ background: DARK_BG }}>
      <div className="max-w-md mx-auto pb-8">
        {/* Header */}
        <div className="sticky top-0 z-30 px-4 py-3 flex items-center gap-3" style={{ background: "rgba(10,14,26,0.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,215,0,0.15)" }}>
          <button onClick={() => navigate("/creator-center")} className="w-9 h-9 rounded-full flex items-center justify-center active:scale-95 transition" style={{ background: "rgba(255,215,0,0.1)" }}>
            <ArrowLeft size={18} style={{ color: GOLD }} />
          </button>
          <div className="flex-1">
            <h1 className="text-base font-bold" style={{ color: GOLD }}>Offline Seller System</h1>
            <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.5)" }}>VYRO Coins Seller Dashboard</p>
          </div>
          <button onClick={() => handleAction("Notifications")} className="w-9 h-9 rounded-full flex items-center justify-center relative" style={{ background: "rgba(255,215,0,0.1)" }}>
            <Bell size={16} style={{ color: GOLD }} />
            <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px] font-bold text-white" style={{ background: "#EF4444" }}>{SELLER_DASHBOARD.notifications.length}</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="sticky top-[57px] z-20 px-2 py-2 overflow-x-auto scrollbar-hide" style={{ background: "rgba(10,14,26,0.85)", backdropFilter: "blur(20px)" }}>
          <div className="flex gap-1.5">
            {SELLER_DASHBOARD.tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 px-3 py-2 rounded-full text-[11px] font-bold transition flex items-center gap-1.5 ${activeTab === tab.id ? "text-black" : "text-white/60"}`}
                style={{
                  background: activeTab === tab.id ? `linear-gradient(135deg, ${GOLD}, ${TEAL})` : "rgba(255,255,255,0.05)",
                  boxShadow: activeTab === tab.id ? `0 4px 12px ${GOLD}40` : "none",
                }}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="px-4 pt-4">
          {/* OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-4 animate-fadeIn">
              {/* Seller Card */}
              <div className="rounded-2xl p-4 relative overflow-hidden" style={{ background: "linear-gradient(135deg, rgba(255,215,0,0.12), rgba(34,211,238,0.08))", border: "1px solid rgba(255,215,0,0.2)" }}>
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10" style={{ background: `radial-gradient(circle, ${GOLD}, transparent 70%)`, transform: "translate(30%, -30%)" }} />
                <div className="relative flex items-center gap-3 mb-3">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl" style={{ background: `linear-gradient(135deg, ${GOLD}, ${TEAL})`, boxShadow: `0 6px 20px ${GOLD}40` }}>
                    {SELLER_DASHBOARD.sellerInfo.badge}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-sm font-bold text-white">{SELLER_DASHBOARD.sellerInfo.name}</h3>
                      <Crown size={12} style={{ color: GOLD }} />
                    </div>
                    <p className="text-[10px]" style={{ color: GOLD }}>{SELLER_DASHBOARD.sellerInfo.level}</p>
                    <p className="text-[9px]" style={{ color: "rgba(255,255,255,0.4)" }}>ID: {SELLER_DASHBOARD.sellerInfo.sellerId}</p>
                  </div>
                </div>
                {/* Level progress */}
                <div className="mb-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] text-white/60">Progress to {SELLER_DASHBOARD.sellerInfo.nextLevel}</span>
                    <span className="text-[10px] font-bold" style={{ color: GOLD }}>${SELLER_DASHBOARD.sellerInfo.monthlyRecharge} / ${SELLER_DASHBOARD.sellerInfo.monthlyTarget}</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
                    <div className="h-full rounded-full transition-all duration-500" style={{ width: `${(SELLER_DASHBOARD.sellerInfo.monthlyRecharge / SELLER_DASHBOARD.sellerInfo.monthlyTarget) * 100}%`, background: `linear-gradient(to right, ${GOLD}, ${TEAL})`, boxShadow: `0 0 8px ${GOLD}60` }} />
                  </div>
                </div>
              </div>

              {/* Report To Section */}
              <ReportToSection roleKey="seller" theme="dark" />

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { icon: DollarSign, label: "Monthly Recharge", value: "$5,240", color: GOLD, change: "+12%" },
                  { icon: Coins, label: "Coins Sold", value: "42.5M", color: TEAL, change: "+8%" },
                  { icon: Users, label: "Customers", value: "128", color: "#A855F7", change: "+5" },
                  { icon: TrendingUp, label: "Earnings", value: "$1,240", color: "#10B981", change: "+18%" },
                ].map((s, i) => (
                  <div key={i} className="rounded-2xl p-3" style={{ background: CARD_BG, border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${s.color}15` }}>
                        <s.icon size={16} style={{ color: s.color }} />
                      </div>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: `${s.color}15`, color: s.color }}>{s.change}</span>
                    </div>
                    <p className="text-lg font-bold text-white">{s.value}</p>
                    <p className="text-[10px] text-white/40">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Quick Recharge Button */}
              <button
                onClick={() => setShowRechargeModal(true)}
                className="w-full py-3.5 rounded-2xl text-sm font-bold text-black active:scale-[0.98] transition flex items-center justify-center gap-2"
                style={{ background: `linear-gradient(135deg, ${GOLD}, ${TEAL})`, boxShadow: `0 8px 24px ${GOLD}30` }}
              >
                <Zap size={18} />
                New Recharge
              </button>

              {/* Recent Notifications */}
              <div>
                <h3 className="text-xs font-bold text-white/80 mb-2 flex items-center gap-1.5">
                  <Bell size={12} style={{ color: GOLD }} /> Recent Notifications
                </h3>
                <div className="space-y-2">
                  {SELLER_DASHBOARD.notifications.map((n, i) => (
                    <div key={i} className="rounded-xl p-3 flex items-start gap-2.5" style={{ background: CARD_BG, border: "1px solid rgba(255,255,255,0.06)" }}>
                      <span className="text-lg flex-shrink-0">{n.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-white">{n.title}</p>
                        <p className="text-[10px] text-white/50">{n.desc}</p>
                      </div>
                      <span className="text-[9px] text-white/30 flex-shrink-0">{n.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Process Flow */}
              <div>
                <h3 className="text-xs font-bold text-white/80 mb-2 flex items-center gap-1.5">
                  <Zap size={12} style={{ color: TEAL }} /> Recharge Process Flow
                </h3>
                <div className="space-y-2">
                  {SELLER_DASHBOARD.processFlow.map((step, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm flex-shrink-0" style={{ background: `linear-gradient(135deg, ${GOLD}30, ${TEAL}20)`, border: `1px solid ${GOLD}40` }}>
                          {step.icon}
                        </div>
                        {i < SELLER_DASHBOARD.processFlow.length - 1 && <div className="w-0.5 h-6" style={{ background: `linear-gradient(to bottom, ${GOLD}40, transparent)` }} />}
                      </div>
                      <div className="flex-1 pb-2">
                        <p className="text-xs font-bold text-white">Step {step.step}: {step.title}</p>
                        <p className="text-[10px] text-white/40">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* RECHARGE */}
          {activeTab === "recharge" && (
            <div className="space-y-4 animate-fadeIn">
              {/* Search */}
              <div className="rounded-2xl p-2 flex items-center gap-2" style={{ background: CARD_BG, border: "1px solid rgba(255,255,255,0.06)" }}>
                <Search size={16} style={{ color: "rgba(255,255,255,0.3)" }} />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search recharge history..."
                  className="flex-1 bg-transparent text-xs text-white placeholder-white/30 outline-none"
                />
              </div>

              {/* New Recharge */}
              <button
                onClick={() => setShowRechargeModal(true)}
                className="w-full py-3 rounded-2xl text-sm font-bold text-black active:scale-[0.98] transition flex items-center justify-center gap-2"
                style={{ background: `linear-gradient(135deg, ${GOLD}, ${TEAL})`, boxShadow: `0 6px 20px ${GOLD}30` }}
              >
                <Zap size={16} /> Manual Recharge
              </button>

              {/* History */}
              <div>
                <h3 className="text-xs font-bold text-white/80 mb-2">Recharge History</h3>
                <div className="space-y-2">
                  {filteredHistory.map((h) => (
                    <div key={h.id} className="rounded-xl p-3" style={{ background: CARD_BG, border: "1px solid rgba(255,255,255,0.06)" }}>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white" style={{ background: `linear-gradient(135deg, ${GOLD}, ${TEAL})` }}>
                            {h.customer.split(" ").map(n => n[0]).join("")}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-white">{h.customer}</p>
                            <p className="text-[9px] text-white/40">{h.id} • {h.userId}</p>
                          </div>
                        </div>
                        <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${h.status === "completed" ? "text-green-400" : "text-yellow-400"}`} style={{ background: h.status === "completed" ? "rgba(16,185,129,0.15)" : "rgba(245,158,11,0.15)" }}>
                          {h.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-bold" style={{ color: GOLD }}>${h.amount}</p>
                          <p className="text-[9px] text-white/40">{h.coins.toLocaleString()} coins</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] text-white/50">{h.date}</p>
                          <p className="text-[9px] text-white/30">{h.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reports */}
              <div className="grid grid-cols-2 gap-2.5">
                <button onClick={() => handleAction("Daily Report")} className="rounded-2xl p-3 text-center active:scale-95 transition" style={{ background: CARD_BG, border: "1px solid rgba(255,215,0,0.15)" }}>
                  <Clock size={18} style={{ color: GOLD }} className="mx-auto mb-1" />
                  <p className="text-xs font-bold text-white">Daily Report</p>
                  <p className="text-[9px] text-white/40">View today's recharges</p>
                </button>
                <button onClick={() => handleAction("Monthly Report")} className="rounded-2xl p-3 text-center active:scale-95 transition" style={{ background: CARD_BG, border: "1px solid rgba(34,211,238,0.15)" }}>
                  <TrendingUp size={18} style={{ color: TEAL }} className="mx-auto mb-1" />
                  <p className="text-xs font-bold text-white">Monthly Report</p>
                  <p className="text-[9px] text-white/40">View monthly analytics</p>
                </button>
              </div>

              {/* Wallet */}
              <div className="rounded-2xl p-4" style={{ background: `linear-gradient(135deg, ${GOLD}12, ${TEAL}08)`, border: "1px solid rgba(255,215,0,0.2)" }}>
                <h3 className="text-xs font-bold text-white mb-3 flex items-center gap-1.5">
                  <DollarSign size={12} style={{ color: GOLD }} /> Seller Wallet
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <p className="text-sm font-bold" style={{ color: GOLD }}>$1,240</p>
                    <p className="text-[9px] text-white/40">Balance</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold" style={{ color: TEAL }}>$320</p>
                    <p className="text-[9px] text-white/40">Bonus</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white/70">$150</p>
                    <p className="text-[9px] text-white/40">Pending</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <button onClick={() => handleAction("Withdraw Request")} className="flex-1 py-2 rounded-xl text-[11px] font-bold text-black active:scale-95 transition" style={{ background: `linear-gradient(135deg, ${GOLD}, ${TEAL})` }}>
                    Withdraw
                  </button>
                  <button onClick={() => handleAction("Bonus Control")} className="flex-1 py-2 rounded-xl text-[11px] font-bold text-white active:scale-95 transition" style={{ background: "rgba(255,255,255,0.08)" }}>
                    Bonus Control
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* PACKAGES */}
          {activeTab === "packages" && (
            <div className="space-y-4 animate-fadeIn">
              {SELLER_DASHBOARD.packages.map((pkg) => (
                <div key={pkg.tier}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${pkg.color}15` }}>
                      <Star size={14} style={{ color: pkg.color, fill: pkg.color }} />
                    </div>
                    <h3 className="text-sm font-bold text-white">{pkg.tier} Packages</h3>
                  </div>
                  <div className="space-y-2">
                    {pkg.items.map((item, i) => (
                      <button
                        key={i}
                        onClick={() => { setRechargeForm({ userId: "", amount: String(item.price), coins: String(item.coins) }); setShowRechargeModal(true); }}
                        className="w-full rounded-xl p-3 flex items-center justify-between active:scale-[0.98] transition"
                        style={{ background: CARD_BG, border: `1px solid ${pkg.color}20` }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${pkg.color}15` }}>
                            <Coins size={18} style={{ color: pkg.color }} />
                          </div>
                          <div className="text-left">
                            <p className="text-sm font-bold text-white">${item.price}</p>
                            <p className="text-[10px] text-white/40">{item.coins.toLocaleString()} coins</p>
                          </div>
                        </div>
                        <span className="text-[10px] px-2 py-1 rounded-full font-bold" style={{ background: `${pkg.color}15`, color: pkg.color }}>
                          {item.bonus}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* CUSTOMERS */}
          {activeTab === "customers" && (
            <div className="space-y-4 animate-fadeIn">
              <div className="rounded-2xl p-2 flex items-center gap-2" style={{ background: CARD_BG, border: "1px solid rgba(255,255,255,0.06)" }}>
                <Search size={16} style={{ color: "rgba(255,255,255,0.3)" }} />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search customers..."
                  className="flex-1 bg-transparent text-xs text-white placeholder-white/30 outline-none"
                />
              </div>
              <div className="space-y-2">
                {filteredCustomers.map((c) => (
                  <div key={c.id} className="rounded-xl p-3" style={{ background: CARD_BG, border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center text-[10px] font-bold text-white" style={{ background: `linear-gradient(135deg, ${c.color}, ${c.color}cc)` }}>
                          {c.avatar}
                        </div>
                        {c.isVip && <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center" style={{ background: GOLD }}><Crown size={8} className="text-black" /></div>}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-1.5">
                          <p className="text-xs font-bold text-white">{c.name}</p>
                          {c.isFavorite && <Star size={10} style={{ color: GOLD, fill: GOLD }} />}
                        </div>
                        <p className="text-[9px] text-white/40">{c.id}</p>
                      </div>
                      <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${c.status === "active" ? "text-green-400" : "text-yellow-400"}`} style={{ background: c.status === "active" ? "rgba(16,185,129,0.15)" : "rgba(245,158,11,0.15)" }}>
                        {c.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="text-[10px] text-white/40">Total Spent</p>
                        <p className="text-sm font-bold" style={{ color: GOLD }}>${c.totalSpent}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-white/40">Recharges</p>
                        <p className="text-sm font-bold text-white">{c.totalRecharges}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-white/40">Last</p>
                        <p className="text-[10px] text-white/60">{c.lastRecharge}</p>
                      </div>
                    </div>
                    <div className="flex gap-1.5">
                      <button onClick={() => { setRechargeForm({ userId: c.id, amount: "", coins: "" }); setShowRechargeModal(true); }} className="flex-1 py-1.5 rounded-lg text-[10px] font-bold text-black active:scale-95 transition" style={{ background: `linear-gradient(135deg, ${GOLD}, ${TEAL})` }}>
                        Recharge
                      </button>
                      <button onClick={() => handleAction(`Notes for ${c.name}`)} className="flex-1 py-1.5 rounded-lg text-[10px] font-bold text-white active:scale-95 transition" style={{ background: "rgba(255,255,255,0.08)" }}>
                        Notes
                      </button>
                      <button onClick={() => handleAction(`Block ${c.name}`)} className="w-8 py-1.5 rounded-lg text-[10px] font-bold text-red-400 active:scale-95 transition" style={{ background: "rgba(239,68,68,0.1)" }}>
                        <X size={12} className="mx-auto" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* LEVELS */}
          {activeTab === "levels" && (
            <div className="space-y-4 animate-fadeIn">
              <div className="rounded-2xl p-4 text-center" style={{ background: `linear-gradient(135deg, ${GOLD}12, ${TEAL}08)`, border: "1px solid rgba(255,215,0,0.2)" }}>
                <p className="text-3xl mb-1">{SELLER_DASHBOARD.sellerInfo.badge}</p>
                <p className="text-sm font-bold text-white">{SELLER_DASHBOARD.sellerInfo.level}</p>
                <p className="text-[10px]" style={{ color: GOLD }}>Current Level • {SELLER_DASHBOARD.sellerInfo.commission} commission</p>
              </div>
              <div className="space-y-3">
                {SELLER_DASHBOARD.sellerLevels.map((lvl) => {
                  const isCurrent = lvl.id === SELLER_DASHBOARD.sellerInfo.levelNum;
                  const isPassed = lvl.id < SELLER_DASHBOARD.sellerInfo.levelNum;
                  return (
                    <div key={lvl.id} className="rounded-2xl p-4 relative overflow-hidden" style={{ background: CARD_BG, border: isCurrent ? `1px solid ${lvl.color}` : "1px solid rgba(255,255,255,0.06)" }}>
                      {isCurrent && <div className="absolute top-2 right-2 text-[8px] px-2 py-0.5 rounded-full font-bold text-black" style={{ background: lvl.color }}>CURRENT</div>}
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl" style={{ background: `${lvl.color}15`, border: `1px solid ${lvl.color}30`, opacity: isPassed ? 0.5 : 1 }}>
                          {isPassed ? "✅" : lvl.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-sm font-bold text-white">{lvl.name}</h3>
                          <p className="text-[10px]" style={{ color: lvl.color }}>{lvl.requirement}</p>
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        {lvl.benefits.map((b, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <Check size={11} style={{ color: lvl.color }} />
                            <span className="text-[11px] text-white/60">{b}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* REWARDS */}
          {activeTab === "rewards" && (
            <div className="space-y-4 animate-fadeIn">
              <div className="grid grid-cols-2 gap-2.5">
                {SELLER_DASHBOARD.rewards.map((r, i) => (
                  <div key={i} className="rounded-2xl p-3 text-center" style={{ background: CARD_BG, border: `1px solid ${r.color}20` }}>
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-2" style={{ background: `${r.color}15` }}>
                      {r.icon}
                    </div>
                    <p className="text-xs font-bold text-white">{r.title}</p>
                    <p className="text-[9px] text-white/40 mt-0.5">{r.desc}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl p-4" style={{ background: `linear-gradient(135deg, ${GOLD}12, ${TEAL}08)`, border: "1px solid rgba(255,215,0,0.2)" }}>
                <div className="flex items-center gap-2 mb-2">
                  <Gift size={14} style={{ color: GOLD }} />
                  <h3 className="text-xs font-bold text-white">Offline Seller Benefits</h3>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {SELLER_DASHBOARD.benefits.map((b, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-sm">{b.icon}</span>
                      <div>
                        <p className="text-[10px] font-bold text-white">{b.title}</p>
                        <p className="text-[8px] text-white/40">{b.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* RANKINGS */}
          {activeTab === "rankings" && (
            <div className="space-y-4 animate-fadeIn">
              <div className="rounded-2xl p-4 text-center" style={{ background: `linear-gradient(135deg, ${GOLD}12, ${TEAL}08)`, border: "1px solid rgba(255,215,0,0.2)" }}>
                <Award size={24} style={{ color: GOLD }} className="mx-auto mb-1" />
                <p className="text-sm font-bold text-white">Your Rank: #3</p>
                <p className="text-[10px]" style={{ color: TEAL }}>Global Seller Rankings</p>
              </div>
              <div className="space-y-2">
                {SELLER_DASHBOARD.rankings.map((r) => (
                  <div key={r.rank} className="rounded-xl p-3 flex items-center gap-3" style={{ background: CARD_BG, border: r.rank === 3 ? `1px solid ${GOLD}` : "1px solid rgba(255,255,255,0.06)" }}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: r.rank <= 3 ? `linear-gradient(135deg, ${r.color}, ${r.color}cc)` : "rgba(255,255,255,0.08)", color: r.rank <= 3 ? "#000" : "#fff" }}>
                      {r.rank}
                    </div>
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-[10px] font-bold text-white" style={{ background: `linear-gradient(135deg, ${r.color}, ${r.color}cc)` }}>
                      {r.avatar}
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-bold text-white">{r.name}</p>
                      <p className="text-[9px] text-white/40">{r.recharges} recharges</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold" style={{ color: GOLD }}>${r.total.toLocaleString()}</p>
                      <div className="flex items-center justify-end gap-0.5">
                        {r.change === "up" ? <TrendingUp size={10} className="text-green-400" /> : r.change === "down" ? <TrendingDown size={10} className="text-red-400" /> : <Minus size={10} className="text-white/30" />}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-2">
                {["Daily", "Weekly", "Monthly"].map((p) => (
                  <button key={p} onClick={() => handleAction(`${p} Rankings`)} className="py-2 rounded-xl text-[10px] font-bold text-white active:scale-95 transition" style={{ background: CARD_BG, border: "1px solid rgba(255,215,0,0.15)" }}>
                    {p}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* POLICY */}
          {activeTab === "policy" && (
            <SellerPolicyTab />
          )}

          {/* REPORTS */}
          {activeTab === "reports" && (
            <SellerReportsTab />
          )}

          {/* SECURITY */}
          {activeTab === "security" && (
            <div className="space-y-4 animate-fadeIn">
              <div className="rounded-2xl p-4 text-center" style={{ background: `linear-gradient(135deg, ${GOLD}12, ${TEAL}08)`, border: "1px solid rgba(255,215,0,0.2)" }}>
                <Shield size={24} style={{ color: GOLD }} className="mx-auto mb-1" />
                <p className="text-sm font-bold text-white">Security Status: Protected</p>
                <p className="text-[10px]" style={{ color: TEAL }}>All security features active</p>
              </div>
              <div className="space-y-2">
                {SELLER_DASHBOARD.security.map((s, i) => (
                  <div key={i} className="rounded-xl p-3 flex items-center gap-3" style={{ background: CARD_BG, border: "1px solid rgba(255,255,255,0.06)" }}>
                    <span className="text-xl">{s.icon}</span>
                    <div className="flex-1">
                      <p className="text-xs font-bold text-white">{s.title}</p>
                      <p className="text-[10px] text-white/40">{s.desc}</p>
                    </div>
                    <span className="text-[9px] px-2 py-0.5 rounded-full font-bold text-green-400" style={{ background: "rgba(16,185,129,0.15)" }}>
                      {s.status}
                    </span>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl p-4" style={{ background: CARD_BG, border: "1px solid rgba(239,68,68,0.15)" }}>
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle size={14} className="text-red-400" />
                  <h3 className="text-xs font-bold text-white">Admin Controls</h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {["Approve Sellers", "Reject Applications", "Ban Sellers", "Freeze Accounts", "Monitor Transactions", "Set Limits", "Add Bonuses", "Track Fraud", "View Analytics", "Manage Levels"].map((a) => (
                    <span key={a} className="text-[9px] px-2 py-1 rounded-full font-medium text-white/60" style={{ background: "rgba(255,255,255,0.05)" }}>
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Recharge Modal */}
      {showRechargeModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowRechargeModal(false)} />
          <div className="relative w-full max-w-md rounded-t-3xl max-h-[85vh] overflow-y-auto animate-fadeIn" style={{ background: CARD_BG, border: "1px solid rgba(255,215,0,0.2)" }}>
            <div className="sticky top-0 pt-3 pb-2 z-10" style={{ background: CARD_BG }}>
              <div className="w-10 h-1 rounded-full mx-auto mb-2" style={{ background: "rgba(255,255,255,0.2)" }} />
              <div className="flex items-center justify-between px-4">
                <h2 className="text-sm font-bold" style={{ color: GOLD }}>Manual Recharge</h2>
                <button onClick={() => setShowRechargeModal(false)} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.08)" }}>
                  <X size={14} className="text-white/60" />
                </button>
              </div>
            </div>
            <div className="px-4 pb-6 space-y-3">
              <div>
                <label className="text-[10px] font-bold text-white/60 mb-1 block">User ID</label>
                <input
                  value={rechargeForm.userId}
                  onChange={(e) => setRechargeForm({ ...rechargeForm, userId: e.target.value })}
                  placeholder="VYRO-XXXX"
                  className="w-full px-3 py-2.5 rounded-xl text-xs text-white placeholder-white/30 outline-none"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,215,0,0.15)" }}
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-white/60 mb-1 block">Amount (USD)</label>
                <input
                  value={rechargeForm.amount}
                  onChange={(e) => setRechargeForm({ ...rechargeForm, amount: e.target.value })}
                  placeholder="100"
                  type="number"
                  className="w-full px-3 py-2.5 rounded-xl text-xs text-white placeholder-white/30 outline-none"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,215,0,0.15)" }}
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-white/60 mb-1 block">Coins Amount</label>
                <input
                  value={rechargeForm.coins}
                  onChange={(e) => setRechargeForm({ ...rechargeForm, coins: e.target.value })}
                  placeholder="5000000"
                  type="number"
                  className="w-full px-3 py-2.5 rounded-xl text-xs text-white placeholder-white/30 outline-none"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,215,0,0.15)" }}
                />
              </div>
              <div className="rounded-xl p-3" style={{ background: "rgba(34,211,238,0.08)", border: "1px solid rgba(34,211,238,0.15)" }}>
                <p className="text-[10px] text-white/60 mb-1">Recharge Summary</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/80">User: {rechargeForm.userId || "—"}</span>
                  <span className="text-sm font-bold" style={{ color: GOLD }}>${rechargeForm.amount || "0"}</span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[10px] text-white/40">Coins to send:</span>
                  <span className="text-xs font-bold" style={{ color: TEAL }}>{(Number(rechargeForm.coins) || 0).toLocaleString()}</span>
                </div>
              </div>
              <button
                onClick={handleRechargeSubmit}
                className="w-full py-3 rounded-2xl text-sm font-bold text-black active:scale-[0.98] transition flex items-center justify-center gap-2"
                style={{ background: `linear-gradient(135deg, ${GOLD}, ${TEAL})`, boxShadow: `0 6px 20px ${GOLD}30` }}
              >
                <Zap size={16} /> Confirm Recharge
              </button>
              <p className="text-[9px] text-white/30 text-center">User will receive instant notification. Recharge logs auto-updated.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}