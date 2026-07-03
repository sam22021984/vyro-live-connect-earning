import React from "react";

export default function VipSystemLoader() {
  return (
    <div className="min-h-screen bg-[#0A0118] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-amber-200/30 border-t-amber-400 rounded-full animate-spin" />
        <p className="text-sm text-gray-500 font-medium">Loading...</p>
      </div>
    </div>
  );
}