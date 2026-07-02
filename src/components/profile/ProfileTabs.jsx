import React from "react";

const tabs = [
  { key: "profile", label: "Profile", icon: "👤" },
  { key: "stats", label: "Stats", icon: "📊" },
  { key: "history", label: "History", icon: "🕐" },
];

export default function ProfileTabs({ activeTab, onTabChange }) {
  return (
    <div className="px-4 py-3">
      <div className="bg-white rounded-[18px] p-1.5 flex shadow-sm border border-gray-100">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => onTabChange(tab.key)}
            className={`flex-1 py-2.5 rounded-[14px] text-xs font-semibold transition-all duration-300 flex items-center justify-center gap-1.5
              ${activeTab === tab.key
                ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-md shadow-purple-200"
                : "text-gray-400 hover:text-gray-600"
              }`}
          >
            <span className="text-sm">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}