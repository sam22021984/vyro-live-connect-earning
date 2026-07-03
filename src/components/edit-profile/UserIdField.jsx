import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function UserIdField({ userId }) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText(userId || "");
    setCopied(true);
    toast({ title: "User ID copied to clipboard" });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <label className="text-xs font-semibold text-gray-600 mb-1.5 block">User ID (Read Only)</label>
      <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2.5 border border-gray-100">
        <span className="text-xs text-gray-500 font-mono flex-1 truncate">{userId || "N/A"}</span>
        <button onClick={handleCopy} className="w-7 h-7 rounded-lg bg-white border border-gray-100 flex items-center justify-center active:scale-90">
          {copied ? <Check size={12} className="text-green-500" /> : <Copy size={12} className="text-gray-500" />}
        </button>
      </div>
    </div>
  );
}