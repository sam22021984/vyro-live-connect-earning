import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft, Home, Plus, Search, Users, Inbox, TrendingUp, Award,
  Calendar, Bell, Shield, Settings, Crown, Gem, Star, User, UserPlus,
  Gift, Heart, Activity, Layers, Trophy, Zap, Ban, AlertTriangle,
  BookOpen, CheckSquare, CheckCircle, XCircle, X, Eye, MoreVertical,
  ChevronRight, Flag, FileText, BarChart3, Circle, Upload, Trash2,
  Pencil, LogOut, Send, Clock,
} from "lucide-react";
import {
  MY_FAMILY, FAMILY_STATS, FAMILY_MODULES, FAMILY_MEMBERS, ROLE_INFO,
  DISCOVER_FAMILIES, FAMILY_REQUESTS, FAMILY_LEVELS_DATA, FAMILY_ACHIEVEMENTS,
  FAMILY_EVENTS, FAMILY_NOTIFICATIONS, SYSTEM_RULES, MANAGEMENT_DATA,
} from "@/components/family/familyData";

const ICON_MAP = {
  ArrowLeft, Home, Plus, Search, Users, Inbox, TrendingUp, Award,
  Calendar, Bell, Shield, Settings, Crown, Gem, Star, User, UserPlus,
  Gift, Heart, Activity, Layers, Trophy, Zap, Ban, AlertTriangle,
  BookOpen, CheckSquare, CheckCircle, XCircle, X, Eye, MoreVertical,
  ChevronRight, Flag, FileText, BarChart3, Circle, Upload, Trash2,
  Pencil, LogOut, Send, Clock,
};

const getIcon = (name, size = 16, className = "") => {
  const Icon = ICON_MAP[name] || Circle;
  return <Icon size={size} className={className} />;
};

// Shared dark theme styles
const DARK_BG = "linear-gradient(160deg, #0A0F1E 0%, #131A2E 40%, #1A1240 100%)";
const GLASS_CARD = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
};
const GOLD = "#D4AF37";
const ROYAL_BLUE = "#3B82F6";
const DARK_PURPLE = "#8B5CF6";
const SOFT_WHITE = "#F4F0FA";

function GlassCard({ children, className = "", style = {} }) {
  return (
    <div className={`rounded-2xl ${className}`} style={{ ...GLASS_CARD, ...style }}>
      {children}
    </div>
  );
}

function ActionButton({ label, icon, type = "primary", onClick }) {
  const styles = {
    primary: { bg: "linear-gradient(135deg, #3B82F6, #2563EB)", text: "#fff" },
    gold: { bg: "linear-gradient(135deg, #D4AF37, #B8941E)", text: "#0A0F1E" },
    success: { bg: "linear-gradient(135deg, #10B981, #059669)", text: "#fff" },
    danger: { bg: "linear-gradient(135deg, #EF4444, #DC2626)", text: "#fff" },
    ghost: { bg: "rgba(255,255,255,0.06)", text: SOFT_WHITE },
  };
  const s = styles[type] || styles.primary;
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold active:scale-95 transition"
      style={{ background: s.bg, color: s.text, border: type === "ghost" ? "1px solid rgba(255,255,255,0.12)" : "none" }}
    >
      {getIcon(icon, 14)}
      {label}
    </button>
  );
}

// ========== MODULE CONTENTS ==========

function MyFamilyModule() {
  const f = MY_FAMILY;
  return (
    <div className="space-y-4">
      {/* Banner */}
      <GlassCard className="overflow-hidden">
        <div className="h-28 relative" style={{ background: `linear-gradient(135deg, ${ROYAL_BLUE}, ${DARK_PURPLE})` }}>
          <img src={f.family_banner} alt="banner" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent, rgba(10,15,30,0.9))" }} />
        </div>
        <div className="p-4 -mt-12 relative">
          <div className="flex items-end gap-3 mb-3">
            <img src={f.family_logo} alt={f.family_name} className="w-16 h-16 rounded-2xl object-cover border-2" style={{ borderColor: GOLD }} />
            <div className="flex-1 pb-1">
              <h3 className="text-base font-bold" style={{ color: SOFT_WHITE }}>{f.family_name}</h3>
              <p className="text-[10px]" style={{ color: "rgba(244,240,250,0.5)" }}>{f.family_id} · {f.family_country_flag} {f.family_country}</p>
            </div>
          </div>
          <p className="text-[11px] leading-relaxed mb-3" style={{ color: "rgba(244,240,250,0.7)" }}>{f.family_description}</p>
          <div className="flex flex-wrap gap-2">
            <ActionButton label="View Profile" icon="Eye" type="ghost" />
            <ActionButton label="Manage" icon="Settings" type="gold" />
            <ActionButton label="Invite" icon="UserPlus" type="primary" />
            <ActionButton label="Leave" icon="LogOut" type="danger" />
          </div>
        </div>
      </GlassCard>

      {/* Info grid */}
      <div className="grid grid-cols-2 gap-2">
        {[
          { label: "Family ID", value: f.family_id, icon: "Hash" },
          { label: "Family Level", value: `Level ${f.family_level}`, icon: "Layers" },
          { label: "Family Rank", value: `#${f.family_rank}`, icon: "Trophy" },
          { label: "Total Members", value: `${f.total_members}/${f.max_members}`, icon: "Users" },
          { label: "Privacy", value: f.family_privacy, icon: "Shield" },
          { label: "Created", value: f.creation_date, icon: "Calendar" },
        ].map((item, i) => (
          <GlassCard key={i} className="p-3">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "rgba(59,130,246,0.15)" }}>
                <span style={{ color: ROYAL_BLUE }}>{getIcon(item.icon, 12)}</span>
              </div>
              <span className="text-[10px]" style={{ color: "rgba(244,240,250,0.5)" }}>{item.label}</span>
            </div>
            <p className="text-sm font-bold" style={{ color: SOFT_WHITE }}>{item.value}</p>
          </GlassCard>
        ))}
      </div>

      {/* XP Progress */}
      <GlassCard className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold" style={{ color: SOFT_WHITE }}>Family XP</span>
          <span className="text-xs font-bold" style={{ color: GOLD }}>{f.family_xp.toLocaleString()} / {f.family_xp_max.toLocaleString()}</span>
        </div>
        <div className="w-full h-2.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
          <div className="h-full rounded-full" style={{ width: `${(f.family_xp / f.family_xp_max) * 100}%`, background: `linear-gradient(to right, ${GOLD}, ${ROYAL_BLUE})` }} />
        </div>
        <p className="text-[10px] mt-1.5" style={{ color: "rgba(244,240,250,0.4)" }}>{((f.family_xp / f.family_xp_max) * 100).toFixed(1)}% to Level {f.family_level + 1}</p>
      </GlassCard>
    </div>
  );
}

function CreateFamilyModule() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [privacy, setPrivacy] = useState("Open");
  const [country, setCountry] = useState("United States");

  return (
    <div className="space-y-4">
      <GlassCard className="p-4">
        <h3 className="text-sm font-bold mb-3" style={{ color: SOFT_WHITE }}>Family Details</h3>

        {/* Logo upload */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: "rgba(59,130,246,0.15)", border: `2px dashed ${ROYAL_BLUE}50` }}>
            <Upload size={20} style={{ color: ROYAL_BLUE }} />
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold" style={{ color: SOFT_WHITE }}>Family Logo</p>
            <p className="text-[10px]" style={{ color: "rgba(244,240,250,0.4)" }}>Upload a logo (max 2MB)</p>
          </div>
          <ActionButton label="Upload" icon="Upload" type="ghost" />
        </div>

        {/* Banner upload */}
        <div className="rounded-xl p-3 mb-4" style={{ background: "rgba(139,92,246,0.1)", border: `1px dashed ${DARK_PURPLE}50` }}>
          <div className="flex items-center gap-2">
            <ImageIcon />
            <div className="flex-1">
              <p className="text-xs font-bold" style={{ color: SOFT_WHITE }}>Family Banner</p>
              <p className="text-[10px]" style={{ color: "rgba(244,240,250,0.4)" }}>Upload a banner image</p>
            </div>
            <ActionButton label="Upload" icon="Upload" type="ghost" />
          </div>
        </div>

        {/* Name */}
        <div className="mb-3">
          <label className="text-[11px] font-medium mb-1 block" style={{ color: "rgba(244,240,250,0.6)" }}>Family Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter family name"
            className="w-full px-3 py-2.5 rounded-xl text-xs outline-none"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: SOFT_WHITE }}
          />
        </div>

        {/* Description */}
        <div className="mb-3">
          <label className="text-[11px] font-medium mb-1 block" style={{ color: "rgba(244,240,250,0.6)" }}>Family Description</label>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Describe your family..."
            rows={3}
            className="w-full px-3 py-2.5 rounded-xl text-xs outline-none resize-none"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: SOFT_WHITE }}
          />
        </div>

        {/* Country */}
        <div className="mb-3">
          <label className="text-[11px] font-medium mb-1 block" style={{ color: "rgba(244,240,250,0.6)" }}>Family Country</label>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl text-xs outline-none"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: SOFT_WHITE }}
          >
            <option style={{ background: "#131A2E" }}>United States</option>
            <option style={{ background: "#131A2E" }}>United Kingdom</option>
            <option style={{ background: "#131A2E" }}>Japan</option>
            <option style={{ background: "#131A2E" }}>South Korea</option>
            <option style={{ background: "#131A2E" }}>Brazil</option>
            <option style={{ background: "#131A2E" }}>India</option>
          </select>
        </div>

        {/* Privacy */}
        <div className="mb-4">
          <label className="text-[11px] font-medium mb-1 block" style={{ color: "rgba(244,240,250,0.6)" }}>Privacy Settings</label>
          <div className="grid grid-cols-3 gap-2">
            {["Open", "Invite Only", "Application"].map((p) => (
              <button
                key={p}
                onClick={() => setPrivacy(p)}
                className="py-2 rounded-xl text-[10px] font-bold transition active:scale-95"
                style={privacy === p
                  ? { background: `linear-gradient(135deg, ${ROYAL_BLUE}, #2563EB)`, color: "#fff" }
                  : { background: "rgba(255,255,255,0.06)", color: "rgba(244,240,250,0.5)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <ActionButton label="Create Family" icon="Plus" type="gold" />
          <ActionButton label="Edit" icon="Pencil" type="ghost" />
          <ActionButton label="Delete" icon="Trash2" type="danger" />
        </div>
      </GlassCard>
    </div>
  );
}

function ImageIcon() {
  return <Upload size={20} style={{ color: DARK_PURPLE }} />;
}

function DiscoverFamiliesModule() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("recommended");

  const filtered = DISCOVER_FAMILIES.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase()) ||
    f.id.toLowerCase().includes(search.toLowerCase()) ||
    f.country_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Search */}
      <GlassCard className="p-3">
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: "rgba(255,255,255,0.06)" }}>
          <Search size={16} style={{ color: "rgba(244,240,250,0.4)" }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, ID, or country..."
            className="flex-1 bg-transparent text-xs outline-none"
            style={{ color: SOFT_WHITE }}
          />
        </div>
      </GlassCard>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        {[
          { key: "recommended", label: "Recommended" },
          { key: "popular", label: "Popular" },
          { key: "active", label: "Active" },
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className="py-2 px-4 rounded-xl text-xs font-bold whitespace-nowrap transition active:scale-95"
            style={filter === f.key
              ? { background: `linear-gradient(135deg, ${DARK_PURPLE}, ${ROYAL_BLUE})`, color: "#fff" }
              : { background: "rgba(255,255,255,0.06)", color: "rgba(244,240,250,0.5)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Family cards */}
      <div className="space-y-3">
        {filtered.map((f, i) => (
          <GlassCard key={i} className="p-3">
            <div className="flex items-center gap-3">
              <img src={f.logo} alt={f.name} className="w-14 h-14 rounded-2xl object-cover" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold truncate" style={{ color: SOFT_WHITE }}>{f.name}</h4>
                  <span className="text-[9px] px-1.5 py-0.5 rounded-full font-bold" style={{ background: "rgba(212,175,55,0.15)", color: GOLD }}>#{f.rank}</span>
                </div>
                <p className="text-[10px]" style={{ color: "rgba(244,240,250,0.4)" }}>{f.id} · {f.country} {f.country_name}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-[10px] flex items-center gap-1" style={{ color: "rgba(244,240,250,0.6)" }}>
                    <Users size={10} /> {f.members}
                  </span>
                  <span className="text-[10px] flex items-center gap-1" style={{ color: "rgba(244,240,250,0.6)" }}>
                    <Layers size={10} /> LV.{f.level}
                  </span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(244,240,250,0.5)" }}>{f.privacy}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <ActionButton label="View Profile" icon="Eye" type="ghost" />
              <ActionButton label="Join" icon="UserPlus" type="primary" />
              <ActionButton label="Follow" icon="Heart" type="ghost" />
              <ActionButton label="Report" icon="Flag" type="danger" />
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

function FamilyMembersModule() {
  return (
    <div className="space-y-4">
      {/* Roles legend */}
      <GlassCard className="p-3">
        <h4 className="text-xs font-bold mb-2" style={{ color: SOFT_WHITE }}>Family Roles</h4>
        <div className="space-y-1.5">
          {ROLE_INFO.map((r, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: `${r.color}20` }}>
                <span style={{ color: r.color }}>{getIcon(r.icon, 12)}</span>
              </div>
              <span className="text-[11px] font-bold" style={{ color: r.color }}>{r.role}</span>
              <span className="text-[10px]" style={{ color: "rgba(244,240,250,0.4)" }}>· {r.desc}</span>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Members list */}
      <div className="space-y-2">
        {FAMILY_MEMBERS.map((m, i) => {
          const roleInfo = ROLE_INFO.find((r) => r.role === m.role);
          return (
            <GlassCard key={i} className="p-3">
              <div className="flex items-center gap-3">
                <img src={m.avatar} alt={m.name} className="w-11 h-11 rounded-full object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold truncate" style={{ color: SOFT_WHITE }}>{m.name}</h4>
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full font-bold" style={{ background: `${roleInfo.color}20`, color: roleInfo.color }}>
                      {m.role}
                    </span>
                  </div>
                  <p className="text-[10px]" style={{ color: "rgba(244,240,250,0.4)" }}>{m.id} · Joined {m.joined}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-[9px]" style={{ color: "rgba(244,240,250,0.4)" }}>Contribution</span>
                    <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                      <div className="h-full rounded-full" style={{ width: `${m.contribution}%`, background: roleInfo.color }} />
                    </div>
                    <span className="text-[9px] font-bold" style={{ color: roleInfo.color }}>{m.contribution}%</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2.5">
                <ActionButton label="View" icon="Eye" type="ghost" />
                <ActionButton label="Promote" icon="TrendingUp" type="gold" />
                <ActionButton label="Demote" icon="ChevronRight" type="ghost" />
                <ActionButton label="Remove" icon="X" type="danger" />
                {m.role === "Founder" && <ActionButton label="Transfer" icon="Crown" type="ghost" />}
              </div>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}

function FamilyRequestsModule() {
  const [tab, setTab] = useState("incoming");
  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="flex gap-2">
        {[
          { key: "incoming", label: "Incoming" },
          { key: "sent", label: "Sent" },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className="flex-1 py-2.5 rounded-xl text-xs font-bold transition active:scale-95"
            style={tab === t.key
              ? { background: `linear-gradient(135deg, ${ROYAL_BLUE}, #2563EB)`, color: "#fff" }
              : { background: "rgba(255,255,255,0.06)", color: "rgba(244,240,250,0.5)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "incoming" && (
        <div className="space-y-2">
          {FAMILY_REQUESTS.incoming.map((r, i) => (
            <GlassCard key={i} className="p-3">
              <div className="flex items-center gap-3 mb-2">
                <img src={r.avatar} alt={r.name} className="w-11 h-11 rounded-full object-cover" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold" style={{ color: SOFT_WHITE }}>{r.name}</h4>
                  <p className="text-[10px]" style={{ color: "rgba(244,240,250,0.4)" }}>{r.id} · {r.date}</p>
                </div>
              </div>
              <p className="text-[11px] mb-2.5 italic" style={{ color: "rgba(244,240,250,0.6)" }}>"{r.message}"</p>
              <div className="flex gap-2">
                <ActionButton label="Accept" icon="CheckCircle" type="success" />
                <ActionButton label="Reject" icon="XCircle" type="danger" />
                <ActionButton label="Details" icon="Eye" type="ghost" />
              </div>
            </GlassCard>
          ))}
        </div>
      )}

      {tab === "sent" && (
        <div className="space-y-2">
          {FAMILY_REQUESTS.sent.map((r, i) => (
            <GlassCard key={i} className="p-3">
              <div className="flex items-center gap-3">
                <img src={r.avatar} alt={r.name} className="w-11 h-11 rounded-2xl object-cover" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold" style={{ color: SOFT_WHITE }}>{r.name}</h4>
                  <p className="text-[10px]" style={{ color: "rgba(244,240,250,0.4)" }}>{r.id} · {r.date}</p>
                </div>
                <span className="text-[9px] px-2 py-0.5 rounded-full font-bold" style={{ background: "rgba(245,158,11,0.15)", color: "#F59E0B" }}>
                  {r.status.toUpperCase()}
                </span>
              </div>
              <div className="flex gap-2 mt-2.5">
                <ActionButton label="Cancel Request" icon="X" type="danger" />
                <ActionButton label="Details" icon="Eye" type="ghost" />
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
}

function FamilyLevelsModule() {
  const d = FAMILY_LEVELS_DATA;
  return (
    <div className="space-y-4">
      {/* Current level */}
      <GlassCard className="p-4 text-center">
        <div className="w-16 h-16 rounded-2xl mx-auto mb-2 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${GOLD}, ${ROYAL_BLUE})` }}>
          <span className="text-2xl font-bold text-white">{d.currentLevel}</span>
        </div>
        <h3 className="text-sm font-bold" style={{ color: SOFT_WHITE }}>Family Level {d.currentLevel}</h3>
        <p className="text-[10px]" style={{ color: "rgba(244,240,250,0.4)" }}>Rank #{d.rank} globally</p>
        <div className="mt-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px]" style={{ color: "rgba(244,240,250,0.5)" }}>XP Progress</span>
            <span className="text-[10px] font-bold" style={{ color: GOLD }}>{d.currentXP.toLocaleString()} / {d.nextLevelXP.toLocaleString()}</span>
          </div>
          <div className="w-full h-2.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
            <div className="h-full rounded-full" style={{ width: `${(d.currentXP / d.nextLevelXP) * 100}%`, background: `linear-gradient(to right, ${GOLD}, ${ROYAL_BLUE})` }} />
          </div>
        </div>
      </GlassCard>

      {/* XP Sources */}
      <GlassCard className="p-4">
        <h4 className="text-xs font-bold mb-3" style={{ color: SOFT_WHITE }}>XP Sources</h4>
        <div className="space-y-2.5">
          {d.xpSources.map((s, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${s.color}20` }}>
                <span style={{ color: s.color }}>{getIcon(s.icon, 14)}</span>
              </div>
              <div className="flex-1">
                <p className="text-[11px] font-medium" style={{ color: SOFT_WHITE }}>{s.source}</p>
                <p className="text-[10px] font-bold" style={{ color: s.color }}>+{s.xp.toLocaleString()} XP</p>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Level history */}
      <GlassCard className="p-4">
        <h4 className="text-xs font-bold mb-3" style={{ color: SOFT_WHITE }}>Level History</h4>
        <div className="space-y-2">
          {d.levelHistory.map((h, i) => (
            <div key={i} className="flex items-center gap-3 p-2 rounded-xl" style={{ background: "rgba(255,255,255,0.03)" }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-bold" style={{ background: i === 0 ? `${GOLD}20` : "rgba(255,255,255,0.06)", color: i === 0 ? GOLD : "rgba(244,240,250,0.5)" }}>
                {h.level}
              </div>
              <div className="flex-1">
                <p className="text-[11px] font-medium" style={{ color: SOFT_WHITE }}>Level {h.level}</p>
                <p className="text-[10px]" style={{ color: "rgba(244,240,250,0.4)" }}>{h.date}</p>
              </div>
              <span className="text-[10px] font-bold" style={{ color: "rgba(244,240,250,0.5)" }}>{h.xp.toLocaleString()} XP</span>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}

function FamilyAchievementsModule() {
  return (
    <div className="space-y-4">
      <GlassCard className="p-3">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-xs font-bold" style={{ color: SOFT_WHITE }}>Achievement Progress</h4>
            <p className="text-[10px]" style={{ color: "rgba(244,240,250,0.4)" }}>{FAMILY_ACHIEVEMENTS.filter(a => a.earned).length} of {FAMILY_ACHIEVEMENTS.length} unlocked</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold" style={{ color: GOLD }}>{Math.round((FAMILY_ACHIEVEMENTS.filter(a => a.earned).length / FAMILY_ACHIEVEMENTS.length) * 100)}%</p>
          </div>
        </div>
        <div className="w-full h-2 rounded-full overflow-hidden mt-2" style={{ background: "rgba(255,255,255,0.08)" }}>
          <div className="h-full rounded-full" style={{ width: `${(FAMILY_ACHIEVEMENTS.filter(a => a.earned).length / FAMILY_ACHIEVEMENTS.length) * 100}%`, background: `linear-gradient(to right, ${GOLD}, ${DARK_PURPLE})` }} />
        </div>
      </GlassCard>

      <div className="grid grid-cols-2 gap-2">
        {FAMILY_ACHIEVEMENTS.map((a, i) => (
          <GlassCard key={i} className={`p-3 ${!a.earned ? "opacity-50" : ""}`}>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-2" style={{ background: `${a.color}20`, border: `1px solid ${a.color}40` }}>
                <span className="text-2xl">{a.icon}</span>
              </div>
              <p className="text-xs font-bold" style={{ color: a.earned ? a.color : "rgba(244,240,250,0.5)" }}>{a.name}</p>
              <p className="text-[9px] mt-0.5" style={{ color: "rgba(244,240,250,0.4)" }}>{a.desc}</p>
              {a.earned
                ? <span className="text-[8px] mt-1 px-2 py-0.5 rounded-full font-bold" style={{ background: "#10B98120", color: "#10B981" }}>EARNED</span>
                : <span className="text-[8px] mt-1 px-2 py-0.5 rounded-full font-bold" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(244,240,250,0.4)" }}>LOCKED</span>}
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

function FamilyEventsModule() {
  const statusColors = {
    active: "#10B981",
    upcoming: "#3B82F6",
    completed: "rgba(244,240,250,0.4)",
  };
  return (
    <div className="space-y-3">
      {FAMILY_EVENTS.map((e, i) => (
        <GlassCard key={i} className="p-3">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl" style={{ background: "rgba(255,255,255,0.06)" }}>
              {e.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="text-xs font-bold" style={{ color: SOFT_WHITE }}>{e.title}</h4>
                <span className="text-[8px] px-1.5 py-0.5 rounded-full font-bold" style={{ background: `${statusColors[e.status]}20`, color: statusColors[e.status] }}>
                  {e.status.toUpperCase()}
                </span>
              </div>
              <p className="text-[10px]" style={{ color: "rgba(244,240,250,0.4)" }}>{e.type} · {e.date}</p>
              <p className="text-[10px] mt-0.5" style={{ color: GOLD }}>🎁 {e.reward}</p>
              <p className="text-[10px]" style={{ color: "rgba(244,240,250,0.5)" }}>{e.participants} participants</p>
            </div>
          </div>
          {e.status !== "completed" && (
            <div className="flex gap-2 mt-2.5">
              {e.status === "active"
                ? <ActionButton label="Claim Reward" icon="Gift" type="gold" />
                : <ActionButton label="Join Event" icon="UserPlus" type="primary" />}
              <ActionButton label="View Details" icon="Eye" type="ghost" />
            </div>
          )}
        </GlassCard>
      ))}
    </div>
  );
}

function FamilyNotificationsModule() {
  return (
    <div className="space-y-2">
      {FAMILY_NOTIFICATIONS.map((n, i) => (
        <GlassCard key={i} className="p-3">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${n.color}20` }}>
              <span style={{ color: n.color }}>{getIcon(n.icon, 16)}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold" style={{ color: SOFT_WHITE }}>{n.title}</h4>
                <span className="text-[9px]" style={{ color: "rgba(244,240,250,0.3)" }}>{n.time}</span>
              </div>
              <p className="text-[11px] mt-0.5" style={{ color: "rgba(244,240,250,0.6)" }}>{n.detail}</p>
            </div>
          </div>
        </GlassCard>
      ))}
    </div>
  );
}

function FamilySafetyModule() {
  return (
    <div className="space-y-4">
      {/* System rules */}
      <GlassCard className="p-4">
        <h4 className="text-xs font-bold mb-3" style={{ color: SOFT_WHITE }}>System Rules</h4>
        <div className="space-y-2">
          {SYSTEM_RULES.map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(59,130,246,0.15)" }}>
                <span style={{ color: ROYAL_BLUE }}>{getIcon(s.icon, 12)}</span>
              </div>
              <span className="text-[11px]" style={{ color: "rgba(244,240,250,0.7)" }}>{s.rule}</span>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Safety actions */}
      <GlassCard className="p-4">
        <h4 className="text-xs font-bold mb-3" style={{ color: SOFT_WHITE }}>Safety Actions</h4>
        <div className="grid grid-cols-2 gap-2">
          <ActionButton label="Report Family" icon="Flag" type="danger" />
          <ActionButton label="Report Member" icon="User" type="danger" />
          <ActionButton label="Block User" icon="Ban" type="ghost" />
          <ActionButton label="Family Rules" icon="BookOpen" type="ghost" />
          <ActionButton label="View Report Status" icon="Eye" type="ghost" />
          <ActionButton label="Appeal Decision" icon="Shield" type="primary" />
        </div>
      </GlassCard>

      {/* Community guidelines */}
      <GlassCard className="p-4">
        <h4 className="text-xs font-bold mb-2" style={{ color: SOFT_WHITE }}>Community Guidelines</h4>
        <div className="space-y-1.5">
          {["Respect all family members", "No spam or advertising", "Follow platform terms of service", "Report inappropriate behavior", "Maintain family reputation"].map((g, i) => (
            <div key={i} className="flex items-center gap-2">
              <CheckCircle size={12} style={{ color: "#10B981" }} />
              <span className="text-[11px]" style={{ color: "rgba(244,240,250,0.6)" }}>{g}</span>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}

function ManagementPanelModule() {
  const m = MANAGEMENT_DATA;
  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="grid grid-cols-2 gap-2">
        {[
          { label: "Total Families", value: m.totalFamilies.toLocaleString(), icon: "Home", color: ROYAL_BLUE },
          { label: "Active Families", value: m.activeFamilies.toLocaleString(), icon: "Activity", color: "#10B981" },
          { label: "Total Members", value: m.totalMembers.toLocaleString(), icon: "Users", color: DARK_PURPLE },
          { label: "Pending Reports", value: m.pendingReports, icon: "Flag", color: "#EF4444" },
        ].map((s, i) => (
          <GlassCard key={i} className="p-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-2" style={{ background: `${s.color}20` }}>
              <span style={{ color: s.color }}>{getIcon(s.icon, 14)}</span>
            </div>
            <p className="text-lg font-bold" style={{ color: SOFT_WHITE }}>{s.value}</p>
            <p className="text-[10px]" style={{ color: "rgba(244,240,250,0.4)" }}>{s.label}</p>
          </GlassCard>
        ))}
      </div>

      {/* Top families */}
      <GlassCard className="p-4">
        <h4 className="text-xs font-bold mb-3" style={{ color: SOFT_WHITE }}>Top Family Rankings</h4>
        <div className="space-y-2">
          {m.topFamilies.map((f, i) => (
            <div key={i} className="flex items-center gap-3 p-2 rounded-xl" style={{ background: "rgba(255,255,255,0.03)" }}>
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold" style={{
                background: f.rank <= 3 ? ["#D4AF37", "#C0C0C0", "#CD7F32"][f.rank - 1] : "rgba(255,255,255,0.08)",
                color: f.rank <= 3 ? "#0A0F1E" : "rgba(244,240,250,0.5)",
              }}>
                {f.rank}
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold" style={{ color: SOFT_WHITE }}>{f.name}</p>
                <p className="text-[10px]" style={{ color: "rgba(244,240,250,0.4)" }}>{f.members} members · Level {f.level}</p>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Management actions */}
      <div className="grid grid-cols-2 gap-2">
        <ActionButton label="View All Families" icon="Home" type="ghost" />
        <ActionButton label="View Members" icon="Users" type="ghost" />
        <ActionButton label="View Reports" icon="Flag" type="ghost" />
        <ActionButton label="View Analytics" icon="BarChart3" type="ghost" />
        <ActionButton label="View Rankings" icon="Trophy" type="ghost" />
        <ActionButton label="View Levels" icon="Layers" type="ghost" />
      </div>
    </div>
  );
}

function ModuleContent({ moduleId }) {
  switch (moduleId) {
    case "my_family": return <MyFamilyModule />;
    case "create_family": return <CreateFamilyModule />;
    case "discover_families": return <DiscoverFamiliesModule />;
    case "family_members": return <FamilyMembersModule />;
    case "family_requests": return <FamilyRequestsModule />;
    case "family_levels": return <FamilyLevelsModule />;
    case "family_achievements": return <FamilyAchievementsModule />;
    case "family_events": return <FamilyEventsModule />;
    case "family_notifications": return <FamilyNotificationsModule />;
    case "family_safety": return <FamilySafetyModule />;
    case "management_panel": return <ManagementPanelModule />;
    default: return null;
  }
}

// ========== MAIN PAGE ==========

export default function FamilyCenter() {
  const navigate = useNavigate();
  const [activeModule, setActiveModule] = useState("my_family");
  const currentModule = FAMILY_MODULES.find((m) => m.id === activeModule);

  return (
    <div className="min-h-screen" style={{ background: DARK_BG }}>
      <div className="max-w-md mx-auto pb-8">
        {/* Header */}
        <div className="sticky top-0 z-30 px-4 py-3 flex items-center gap-3" style={{ background: "rgba(10,15,30,0.8)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <button onClick={() => navigate("/social")} className="w-9 h-9 rounded-full flex items-center justify-center active:scale-95 transition" style={{ background: "rgba(255,255,255,0.08)" }}>
            <ArrowLeft size={18} style={{ color: SOFT_WHITE }} />
          </button>
          <div className="flex-1">
            <h1 className="text-base font-bold" style={{ color: SOFT_WHITE }}>Family Center</h1>
            <p className="text-[10px]" style={{ color: "rgba(244,240,250,0.4)" }}>Premium Family Community</p>
          </div>
          <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${GOLD}, ${ROYAL_BLUE})` }}>
            <Home size={18} className="text-white" />
          </div>
        </div>

        {/* Hero Banner */}
        <div className="px-4 pt-4">
          <GlassCard className="overflow-hidden">
            <div className="p-4 relative">
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20" style={{ background: `radial-gradient(circle, ${GOLD}, transparent 70%)`, transform: "translate(30%, -30%)" }} />
              <div className="relative">
                <div className="flex items-center gap-3 mb-3">
                  <img src={MY_FAMILY.family_logo} alt={MY_FAMILY.family_name} className="w-14 h-14 rounded-2xl object-cover" style={{ border: `2px solid ${GOLD}` }} />
                  <div>
                    <h2 className="text-sm font-bold" style={{ color: SOFT_WHITE }}>{MY_FAMILY.family_name}</h2>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-bold" style={{ background: "rgba(212,175,55,0.2)", color: GOLD }}>
                        LV.{MY_FAMILY.family_level}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-bold" style={{ background: "rgba(59,130,246,0.2)", color: ROYAL_BLUE }}>
                        RANK #{MY_FAMILY.family_rank}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-center">
                    <p className="text-[9px]" style={{ color: "rgba(244,240,250,0.4)" }}>Members</p>
                    <p className="text-sm font-bold" style={{ color: SOFT_WHITE }}>{MY_FAMILY.total_members}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[9px]" style={{ color: "rgba(244,240,250,0.4)" }}>XP</p>
                    <p className="text-sm font-bold" style={{ color: GOLD }}>{(MY_FAMILY.family_xp / 1000).toFixed(1)}K</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[9px]" style={{ color: "rgba(244,240,250,0.4)" }}>Country</p>
                    <p className="text-sm font-bold" style={{ color: SOFT_WHITE }}>{MY_FAMILY.family_country_flag}</p>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Stats Grid */}
        <div className="px-4 pt-4">
          <h3 className="text-xs font-bold mb-2 px-1" style={{ color: SOFT_WHITE }}>Family Statistics</h3>
          <div className="grid grid-cols-4 gap-2">
            {FAMILY_STATS.map((s, i) => (
              <GlassCard key={i} className="p-2 text-center">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center mx-auto mb-1" style={{ background: `${s.color}20` }}>
                  <span style={{ color: s.color }}>{getIcon(s.icon, 12)}</span>
                </div>
                <p className="text-xs font-bold leading-none" style={{ color: SOFT_WHITE }}>{s.value}</p>
                <p className="text-[8px] mt-1 leading-tight" style={{ color: "rgba(244,240,250,0.4)" }}>{s.label}</p>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Module Grid */}
        <div className="px-4 pt-4">
          <h3 className="text-xs font-bold mb-2 px-1" style={{ color: SOFT_WHITE }}>Modules</h3>
          <div className="grid grid-cols-3 gap-2">
            {FAMILY_MODULES.map((m) => (
              <button
                key={m.id}
                onClick={() => setActiveModule(m.id)}
                className="flex flex-col items-center gap-1.5 p-3 rounded-2xl transition active:scale-95"
                style={activeModule === m.id
                  ? { background: m.gradient, boxShadow: `0 4px 12px ${m.color}40` }
                  : { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={activeModule === m.id ? { background: "rgba(255,255,255,0.2)" } : { background: `${m.color}20` }}>
                  {getIcon(m.icon, 16, activeModule === m.id ? "text-white" : "")}
                </div>
                <span className="text-[9px] font-bold text-center leading-tight" style={activeModule === m.id ? { color: "#fff" } : { color: SOFT_WHITE }}>{m.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Active Module Content */}
        <div className="px-4 pt-4">
          <GlassCard className="p-3 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: currentModule.gradient }}>
                {getIcon(currentModule.icon, 16, "text-white")}
              </div>
              <div>
                <h3 className="text-sm font-bold" style={{ color: SOFT_WHITE }}>{currentModule.title}</h3>
                <p className="text-[10px]" style={{ color: "rgba(244,240,250,0.4)" }}>{currentModule.description}</p>
              </div>
            </div>
          </GlassCard>
          <ModuleContent moduleId={activeModule} />
        </div>
      </div>
    </div>
  );
}