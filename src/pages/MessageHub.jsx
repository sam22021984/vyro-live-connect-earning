import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronDown, Search } from "lucide-react";
import {
  Megaphone, Headphones, ShieldCheck, Flag, Bell,
  Mail, MailOpen, CheckCircle, XCircle, Gavel, ShieldAlert, Archive,
} from "lucide-react";
import {
  MESSAGE_CATEGORIES, MESSAGE_DASHBOARD_STATS, RECENT_MESSAGES,
} from "@/components/message-hub/messageHubData";

const ICONS = {
  Megaphone, Headphones, ShieldCheck, Flag, Bell,
  Mail, MailOpen, CheckCircle, XCircle, Gavel, ShieldAlert, Archive,
};

const WHITE = "#FFFFFF";
const DARK = "#0F1B3D";
const GRAY = "#6B7280";

function StatCard({ stat }) {
  const Icon = ICONS[stat.icon] || Mail;
  return (
    <div className="rounded-xl p-2.5" style={{ background: WHITE, border: "1px solid #E5E7EB" }}>
      <div className="flex items-center gap-2 mb-1">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${stat.color}10` }}>
          <Icon size={13} style={{ color: stat.color }} />
        </div>
      </div>
      <p className="text-lg font-bold" style={{ color: DARK }}>{stat.value}</p>
      <p className="text-[8px] leading-tight" style={{ color: GRAY }}>{stat.label}</p>
    </div>
  );
}

function CategoryCard({ category, isExpanded, onToggle }) {
  const Icon = ICONS[category.icon] || Mail;
  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: WHITE, border: "1px solid #E5E7EB", boxShadow: "0 4px 12px rgba(0,0,0,0.04)" }}>
      <button onClick={onToggle} className="w-full p-4 flex items-center gap-3 active:scale-[0.98] transition">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: category.gradient, boxShadow: `0 4px 12px ${category.color}30` }}>
          {category.emoji}
        </div>
        <div className="flex-1 text-left">
          <h3 className="text-sm font-bold" style={{ color: DARK }}>{category.title}</h3>
          <p className="text-[10px]" style={{ color: GRAY }}>{category.total} total • {category.unread} unread</p>
        </div>
        {category.unread > 0 && (
          <span className="text-[9px] px-2 py-0.5 rounded-full font-bold text-white" style={{ background: category.color }}>{category.unread}</span>
        )}
        <ChevronDown size={18} style={{ color: GRAY }} className={isExpanded ? "rotate-180 transition" : "transition"} />
      </button>

      {isExpanded && (
        <div className="px-4 pb-4 animate-fadeIn">
          <p className="text-[11px] mb-3 leading-relaxed" style={{ color: GRAY }}>{category.description}</p>

          <div className="mb-3">
            <p className="text-[10px] font-bold mb-2" style={{ color: DARK }}>📋 Options</p>
            <div className="flex flex-wrap gap-1.5">
              {category.options.map((opt, i) => (
                <span key={i} className="text-[9px] px-2.5 py-1 rounded-full font-medium" style={{ background: `${category.color}08`, color: category.color }}>{opt}</span>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] font-bold mb-2" style={{ color: DARK }}>⚡ Actions</p>
            <div className="flex flex-wrap gap-1.5">
              {category.actions.map((act, i) => (
                <button key={i} className="text-[9px] px-2.5 py-1.5 rounded-full font-semibold active:scale-95 transition" style={{ background: WHITE, border: `1px solid ${category.color}30`, color: DARK }}>{act}</button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function MessageHub() {
  const navigate = useNavigate();
  const [expandedId, setExpandedId] = useState("announcements");
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  const toggleCategory = (id) => setExpandedId(expandedId === id ? null : id);

  const filteredCategories = MESSAGE_CATEGORIES.filter(c =>
    !search || c.title.toLowerCase().includes(search.toLowerCase()) || c.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F8F9FC]">
      <div className="max-w-md mx-auto pb-8">
        {/* Header */}
        <div className="sticky top-0 z-30 px-4 py-3 flex items-center gap-3" style={{ background: "linear-gradient(135deg, #0F1B3D 0%, #1A2952 100%)" }}>
          <button onClick={() => navigate("/more-services")} className="w-9 h-9 rounded-full flex items-center justify-center active:scale-95 transition" style={{ background: "rgba(255,255,255,0.1)" }}>
            <ArrowLeft size={18} className="text-white" />
          </button>
          <div className="flex-1">
            <h1 className="text-base font-bold text-white">Messages</h1>
            <p className="text-[10px] text-white/60">Message Center & Communication Hub</p>
          </div>
          <button onClick={() => setSearchOpen(!searchOpen)} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.1)" }}>
            <Search size={16} className="text-white" />
          </button>
        </div>

        {searchOpen && (
          <div className="px-4 pt-2 animate-fadeIn">
            <input
              autoFocus
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search messages..."
              className="w-full py-2.5 px-4 rounded-full text-sm bg-white outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
        )}

        <div className="px-4 pt-4 space-y-4">
          {/* Dashboard */}
          <div>
            <h2 className="text-sm font-bold mb-2" style={{ color: DARK }}>📊 Message Dashboard</h2>
            <div className="grid grid-cols-3 gap-2">
              {MESSAGE_DASHBOARD_STATS.map((s, i) => <StatCard key={i} stat={s} />)}
            </div>
          </div>

          {/* Recent Messages */}
          <div>
            <h2 className="text-sm font-bold mb-2" style={{ color: DARK }}>🕑 Recent Messages</h2>
            <div className="rounded-2xl overflow-hidden" style={{ background: WHITE, border: "1px solid #E5E7EB" }}>
              {RECENT_MESSAGES.map((msg, i) => (
                <div key={i} className="flex items-center gap-3 p-3" style={{ borderBottom: i < RECENT_MESSAGES.length - 1 ? "1px solid #F3F4F6" : "none" }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0" style={{ background: "#F3F4F6" }}>{msg.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold truncate" style={{ color: DARK }}>{msg.title}</p>
                    <p className="text-[9px]" style={{ color: GRAY }}>{msg.time}</p>
                  </div>
                  {msg.unread && <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: "#3B82F6" }} />}
                </div>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h2 className="text-sm font-bold mb-2" style={{ color: DARK }}>📂 Message Categories</h2>
            <div className="space-y-2.5">
              {filteredCategories.map(cat => (
                <CategoryCard key={cat.id} category={cat} isExpanded={expandedId === cat.id} onToggle={() => toggleCategory(cat.id)} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}