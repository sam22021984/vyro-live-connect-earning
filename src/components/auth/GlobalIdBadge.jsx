import React, { useState } from "react";
import { Copy, Check, Fingerprint } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

export default function GlobalIdBadge({ globalId, role = "user", size = "default" }) {
  const [copied, setCopied] = React.useState(false);

  if (!globalId) return null;

  const roleLabels = {
    user: "User",
    host: "Host",
    agent: "Agent",
    agency: "Agency",
    admin: "Admin",
    owner: "Owner",
  };
  const roleLabel = roleLabels[role] || "User";

  const handleCopy = () => {
    navigator.clipboard.writeText(globalId);
    setCopied(true);
    toast({ title: "Copied!", description: `Global ID ${globalId} copied to clipboard.` });
    setTimeout(() => setCopied(false), 2000);
  };

  const isSmall = size === "sm";

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-xl border border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50 ${
        isSmall ? "px-2.5 py-1" : "px-3 py-1.5"
      }`}
    >
      <Fingerprint size={isSmall ? 12 : 14} className="text-purple-500 flex-shrink-0" />
      <div className="flex flex-col leading-none">
        <span className={`text-[9px] font-semibold uppercase tracking-wider text-gray-400 ${isSmall ? "" : "mb-0.5"}`}>
          {roleLabel} ID
        </span>
        <span className={`font-mono font-bold text-purple-700 ${isSmall ? "text-[10px]" : "text-xs"}`}>
          {globalId}
        </span>
      </div>
      <button
        onClick={handleCopy}
        className="flex-shrink-0 text-gray-400 hover:text-purple-500 transition"
      >
        {copied ? <Check size={isSmall ? 12 : 14} /> : <Copy size={isSmall ? 12 : 14} />}
      </button>
    </div>
  );
}