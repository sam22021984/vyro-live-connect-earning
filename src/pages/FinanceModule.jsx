import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronDown, ChevronRight, Search, Bell } from "lucide-react";
import { FINANCE_COLORS, FINANCE_CATEGORIES, FINANCE_QUICK_STATS } from "@/components/finance/financeOptionsData";
import { useBackNav } from "@/hooks/useBackNav";

const COLOR_MAP = {
  emerald: { bg: `${FINANCE_COLORS.emerald}10`, border: `${FINANCE_COLORS.emerald}30`, text: FINANCE_COLORS.emerald },
  royalBlue: { bg: `${FINANCE_COLORS.royalBlue}10`, border: `${FINANCE_COLORS.royalBlue}30`, text: FINANCE_COLORS.royalBlue },
  gold: { bg: `${FINANCE_COLORS.gold}10`, border: `${FINANCE_COLORS.gold}30`, text: FINANCE_COLORS.gold },
  info: { bg: `${FINANCE_COLORS.info}10`, border: `${FINANCE_COLORS.info}30`, text: FINANCE_COLORS.info },
};

export default function FinanceModule() {
  const navigate = useNavigate();
  const handleBack = useBackNav("/finance");
  const [expanded, setExpanded] = useState("dashboard");
  const [search, setSearch] = useState("");

  const toggleCategory = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  const handleOptionClick = (opt) => {
    console.log("Finance item clicked", opt.name, opt.route);
    if (!opt?.route) {
      console.error("Missing route for finance item:", opt);
      return;
    }
    navigate(opt.route);
  };

  const filteredCategories = FINANCE_CATEGORIES.map((cat) => ({
    ...cat,
    options: cat.options.filter((opt) =>
      opt.name.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter((cat) => cat.options.length > 0);

  return (
    <div className="min-h-screen" style={{ background: FINANCE_COLORS.bg }}>
      {/* Header */}
      <div
        className="sticky top-0 z-30 px-4 py-3"
        style={{ background: FINANCE_COLORS.navyGradient, boxShadow: "0 4px 20px rgba(15,27,61,0.3)" }}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={handleBack}
            className="w-9 h-9 rounded-full flex items-center justify-center active:scale-95 transition"
            style={{ background: "rgba(255,255,255,0.1)" }}
          >
            <ArrowLeft size={18} className="text-white" />
          </button>
          <div className="flex-1">
            <h1 className="text-base font-bold text-white">Finance Module</h1>
            <p className="text-[10px] text-white/60">All Finance Options & Categories</p>
          </div>
          <button
            className="w-9 h-9 rounded-full flex items-center justify-center relative active:scale-95 transition"
            style={{ background: "rgba(255,255,255,0.1)" }}
          >
            <Bell size={16} className="text-white" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: FINANCE_COLORS.gold }} />
          </button>
        </div>
      </div>

      {/* Quick Stats Banner */}
      <div className="px-4 pt-3">
        <div
          className="rounded-2xl p-3"
          style={{ background: FINANCE_COLORS.navyGradient, boxShadow: "0 4px 16px rgba(15,27,61,0.2)" }}
        >
          <div className="grid grid-cols-4 gap-2">
            {FINANCE_QUICK_STATS.map((stat, i) => {
              const c = COLOR_MAP[stat.color] || COLOR_MAP.emerald;
              return (
                <div key={i} className="flex flex-col items-center text-center">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-1" style={{ background: c.bg, border: `1px solid ${c.border}` }}>
                    <span className="text-sm">{stat.icon}</span>
                  </div>
                  <p className="text-[11px] font-bold text-white">{stat.value}</p>
                  <p className="text-[7px] text-white/50">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Access Buttons */}
      <div className="px-4 pt-3 grid grid-cols-2 gap-2">
        <button
          onClick={() => navigate("/coins-recharge")}
          className="rounded-xl p-3 flex items-center gap-2 active:scale-95 transition"
          style={{ background: "linear-gradient(135deg, #B8941E, #D4AF37)", boxShadow: "0 2px 8px rgba(212,175,55,0.25)" }}
        >
          <span className="text-lg">⚡</span>
          <div className="text-left">
            <p className="text-[11px] font-bold text-white">Coins Recharge</p>
            <p className="text-[8px] text-white/80">20 Tiers · Wallet</p>
          </div>
        </button>
        <button
          onClick={() => navigate("/finance")}
          className="rounded-xl p-3 flex items-center gap-2 active:scale-95 transition"
          style={{ background: FINANCE_COLORS.navyGradient, boxShadow: "0 2px 8px rgba(15,27,61,0.2)" }}
        >
          <span className="text-lg">📊</span>
          <div className="text-left">
            <p className="text-[11px] font-bold text-white">Finance Dashboard</p>
            <p className="text-[8px] text-white/60">Overview & Reports</p>
          </div>
        </button>
      </div>

      {/* Search */}
      <div className="sticky top-[60px] z-20 px-4 py-3" style={{ background: FINANCE_COLORS.bg }}>
        <div
          className="flex items-center gap-2 rounded-xl px-3 py-2.5"
          style={{ background: FINANCE_COLORS.card, border: `1px solid ${FINANCE_COLORS.border}`, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
        >
          <Search size={15} style={{ color: FINANCE_COLORS.textSecondary }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search finance options..."
            className="flex-1 text-xs outline-none bg-transparent"
            style={{ color: FINANCE_COLORS.textPrimary }}
          />
        </div>
      </div>

      {/* Categories */}
      <div className="px-4 pb-24 space-y-3">
        {filteredCategories.map((cat) => {
          const c = COLOR_MAP[cat.color] || COLOR_MAP.emerald;
          const isOpen = expanded === cat.id;
          return (
            <div
              key={cat.id}
              className="rounded-2xl overflow-hidden"
              style={{
                background: FINANCE_COLORS.card,
                boxShadow: "0 2px 12px rgba(15,27,61,0.06), 0 1px 3px rgba(0,0,0,0.03)",
                border: `1px solid ${FINANCE_COLORS.border}`,
              }}
            >
              {/* Category header */}
              <button
                onClick={() => toggleCategory(cat.id)}
                className="w-full flex items-center gap-3 px-4 py-3 active:scale-[0.98] transition"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: cat.gradient, boxShadow: `0 2px 8px ${c.text}30` }}
                >
                  <span className="text-lg">{cat.icon}</span>
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-sm font-bold" style={{ color: FINANCE_COLORS.textPrimary }}>{cat.title}</h3>
                  <p className="text-[9px]" style={{ color: FINANCE_COLORS.textSecondary }}>
                    {cat.options.length} options
                  </p>
                </div>
                <div
                  className="px-2 py-0.5 rounded-full text-[9px] font-bold"
                  style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}` }}
                >
                  {cat.options.length}
                </div>
                <ChevronDown
                  size={16}
                  className="transition-transform"
                  style={{ color: FINANCE_COLORS.textSecondary, transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                />
              </button>

              {/* Options list */}
              {isOpen && (
                <div className="divide-y animate-fadeIn" style={{ borderColor: FINANCE_COLORS.border }}>
                  {cat.options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleOptionClick(opt)}
                      className="w-full flex items-center gap-3 px-4 py-2.5 active:scale-[0.98] transition cursor-pointer"
                      style={{ background: "rgba(245,247,250,0.5)" }}
                    >
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: c.bg, border: `1px solid ${c.border}` }}
                      >
                        <span className="text-xs">{opt.icon}</span>
                      </div>
                      <span className="flex-1 text-left text-xs font-semibold" style={{ color: FINANCE_COLORS.textPrimary }}>
                        {opt.name}
                      </span>
                      <ChevronRight size={14} style={{ color: FINANCE_COLORS.textSecondary }} />
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {/* Footer info */}
        <div className="text-center pt-4 pb-2">
          <p className="text-[10px] font-bold" style={{ color: FINANCE_COLORS.textSecondary }}>
            VYRO Live Connect · Finance Module
          </p>
          <p className="text-[8px] mt-0.5" style={{ color: FINANCE_COLORS.textSecondary }}>
            84 Finance Options · 11 Categories · Enterprise Edition
          </p>
        </div>
      </div>
    </div>
  );
}