import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, Building2, UserCheck, LayoutDashboard, User, ArrowRight } from "lucide-react";

const SEARCH_CATEGORIES = [
  {
    title: "Dashboards",
    icon: LayoutDashboard,
    color: "#6366F1",
    items: [
      { label: "Owner Dashboard", path: "/owner-dashboard" },
      { label: "Super Admin Dashboard", path: "/super-admin-dashboard" },
      { label: "Admin Dashboard", path: "/admin-dashboard" },
      { label: "Agency Dashboard", path: "/agency-dashboard" },
      { label: "Agent Dashboard", path: "/agent-dashboard" },
      { label: "Host Dashboard", path: "/host-dashboard" },
      { label: "User Dashboard", path: "/user-dashboard" },
      { label: "Seller Dashboard", path: "/seller-dashboard" },
      { label: "SAM Dashboard", path: "/sam-dashboard" },
      { label: "Control Center", path: "/control-center" },
      { label: "Creator Center", path: "/creator-center" },
      { label: "Finance Manager", path: "/finance-manager-dashboard" },
      { label: "Marketing Manager", path: "/marketing-manager-dashboard" },
      { label: "Support Manager", path: "/support-manager-dashboard" },
      { label: "Event Manager", path: "/event-manager-dashboard" },
      { label: "Reward Manager", path: "/reward-manager-dashboard" },
      { label: "PK Manager", path: "/pk-manager-dashboard" },
      { label: "VIP Manager", path: "/vip-manager-dashboard" },
      { label: "Country Manager", path: "/country-manager-dashboard" },
      { label: "Business Manager", path: "/business-manager-dashboard" },
      { label: "Business Developer", path: "/business-developer-dashboard" },
    ],
  },
  {
    title: "Agencies",
    icon: Building2,
    color: "#10B981",
    items: [
      { label: "Agency Dashboard", path: "/agency-dashboard" },
      { label: "Agency Management", path: "/control-center" },
      { label: "Agency Policy", path: "/agency-dashboard" },
    ],
  },
  {
    title: "Agents",
    icon: UserCheck,
    color: "#F59E0B",
    items: [
      { label: "Agent Dashboard", path: "/agent-dashboard" },
      { label: "Agent Policy", path: "/agent-dashboard" },
    ],
  },
  {
    title: "People",
    icon: User,
    color: "#EC4899",
    items: [
      { label: "Host Dashboard", path: "/host-dashboard" },
      { label: "User Dashboard", path: "/user-dashboard" },
      { label: "Seller Dashboard", path: "/seller-dashboard" },
    ],
  },
];

export default function SearchOverlay({ onClose }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const q = query.trim().toLowerCase();

  const filtered = q
    ? SEARCH_CATEGORIES.map((cat) => ({
        ...cat,
        items: cat.items.filter((i) => i.label.toLowerCase().includes(q)),
      })).filter((cat) => cat.items.length > 0)
    : SEARCH_CATEGORIES;

  const handleSelect = (path) => {
    onClose();
    navigate(path);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-b-3xl shadow-2xl max-h-[85vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
        {/* Search input */}
        <div className="flex items-center gap-3 p-4 border-b border-gray-100">
          <Search size={20} className="text-gray-400 flex-shrink-0" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search dashboards, agencies, agents, people..."
            className="flex-1 text-sm text-gray-800 placeholder-gray-400 outline-none bg-transparent"
          />
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 active:scale-90 transition">
            <X size={16} className="text-gray-500" />
          </button>
        </div>

        {/* Results */}
        <div className="overflow-y-auto flex-1 p-3">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center py-12">
              <Search size={32} className="text-gray-300 mb-2" />
              <p className="text-sm font-medium text-gray-400">No results found</p>
              <p className="text-xs text-gray-300 mt-1">Try a different search term</p>
            </div>
          ) : (
            filtered.map((cat) => (
              <div key={cat.title} className="mb-4">
                <div className="flex items-center gap-2 px-2 mb-2">
                  <cat.icon size={14} style={{ color: cat.color }} />
                  <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">{cat.title}</span>
                </div>
                <div className="space-y-1">
                  {cat.items.map((item, i) => (
                    <button
                      key={i}
                      onClick={() => handleSelect(item.path)}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-gray-50 active:scale-[0.98] transition group"
                    >
                      <span className="text-sm font-medium text-gray-700">{item.label}</span>
                      <ArrowRight size={14} className="text-gray-300 group-hover:text-gray-500 transition" />
                    </button>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}