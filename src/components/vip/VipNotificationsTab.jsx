import React from "react";

const notifications = [
  { icon: "⬆️", title: "VIP Upgrade Available", desc: "You can now upgrade to ULTRA MISSVIP", time: "2h ago", unread: true },
  { icon: "🎁", title: "Daily Reward Ready", desc: "Claim your 500 coins daily reward", time: "5h ago", unread: true },
  { icon: "⏰", title: "VIP Expiry Reminder", desc: "Your VIP expires in 30 days", time: "1d ago", unread: false },
  { icon: "💎", title: "New VIP Level Unlocked", desc: "MISSVIP level benefits are now active", time: "3d ago", unread: false },
  { icon: "🎉", title: "Special VIP Event", desc: "Join the VIP exclusive event this weekend", time: "5d ago", unread: false },
];

export default function VipNotificationsTab() {
  return (
    <div className="p-4 space-y-4">
      <h2 className="text-base font-bold text-amber-300 text-center">🔔 VIP Notifications</h2>

      <div className="space-y-2.5">
        {notifications.map((n, i) => (
          <div
            key={i}
            className={`flex items-start gap-3 p-3 rounded-2xl border transition ${
              n.unread ? "bg-amber-500/10 border-amber-500/20" : "bg-white/5 border-white/5"
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-yellow-600/10 flex items-center justify-center text-xl flex-shrink-0">
              {n.icon}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4 className="text-xs font-bold text-gray-200">{n.title}</h4>
                {n.unread && <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />}
              </div>
              <p className="text-[10px] text-gray-400 mt-0.5">{n.desc}</p>
              <p className="text-[9px] text-gray-500 mt-1">{n.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}