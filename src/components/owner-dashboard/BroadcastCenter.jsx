import React, { useState } from "react";
import { Send, Bell, MessageSquare, Mail } from "lucide-react";
import { BROADCAST_TARGETS, BROADCAST_TYPES } from "@/components/owner-dashboard/ownerData";
import { useToast } from "@/components/ui/use-toast";

const TYPE_ICONS = { Bell, MessageSquare, Mail };

export default function BroadcastCenter() {
  const { toast } = useToast();
  const [target, setTarget] = useState("All Users");
  const [type, setType] = useState("Push Notification");
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;
    toast({ title: "Broadcast sent to " + target });
    setMessage("");
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-base font-bold" style={{ color: "#0F1B3D" }}>Broadcast Center</h3>
        <p className="text-[11px]" style={{ color: "#6B7280" }}>Communicate with the entire platform instantly</p>
      </div>

      <div>
        <label className="text-[10px] font-bold mb-1.5 block" style={{ color: "#374151" }}>Send To</label>
        <div className="flex flex-wrap gap-1.5">
          {BROADCAST_TARGETS.map((t) => (
            <button
              key={t}
              onClick={() => setTarget(t)}
              className="px-2.5 py-1.5 rounded-lg text-[9px] font-bold transition active:scale-95"
              style={target === t
                ? { background: "#2F80ED", color: "#fff" }
                : { background: "#F7F9FC", color: "#6B7280", border: "1px solid #E5E7EB" }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-[10px] font-bold mb-1.5 block" style={{ color: "#374151" }}>Message Type</label>
        <div className="grid grid-cols-3 gap-2">
          {BROADCAST_TYPES.map((bt) => {
            const Icon = TYPE_ICONS[bt.icon] || Bell;
            return (
              <button
                key={bt.label}
                onClick={() => setType(bt.label)}
                className="flex flex-col items-center gap-1 p-2.5 rounded-xl transition active:scale-95"
                style={type === bt.label
                  ? { background: `${bt.color}10`, border: `1px solid ${bt.color}` }
                  : { background: "#F7F9FC", border: "1px solid #E5E7EB" }}
              >
                <Icon size={16} style={{ color: bt.color }} />
                <span className="text-[8px] font-bold text-center" style={{ color: type === bt.label ? bt.color : "#6B7280" }}>{bt.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label className="text-[10px] font-bold mb-1.5 block" style={{ color: "#374151" }}>Message</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter broadcast message..."
          rows={4}
          className="w-full py-2.5 px-3 rounded-xl text-xs outline-none resize-none"
          style={{ border: "1px solid #E5E7EB", background: "#FFFFFF", color: "#0F1B3D" }}
        />
      </div>

      <button
        onClick={handleSend}
        className="w-full py-3 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-2 active:scale-95 transition"
        style={{ background: "linear-gradient(135deg, #2F80ED, #56CCF2)", boxShadow: "0 4px 12px rgba(47,128,237,0.3)" }}
      >
        <Send size={14} /> Send Broadcast
      </button>
    </div>
  );
}