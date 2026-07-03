import React from "react";
import { ShieldCheck, Star, CheckCircle, Lock, Activity } from "lucide-react";

export default function TrustReputation({ profile }) {
  const items = [
    {
      label: "Trust Score",
      value: profile?.trust_score || 0,
      max: 100,
      color: "bg-green-500",
      icon: ShieldCheck,
      iconColor: "text-green-500",
      suffix: "/100",
    },
    {
      label: "Reputation",
      value: profile?.reputation_rating || 0,
      max: 5,
      displayStars: true,
      icon: Star,
      iconColor: "text-yellow-500",
    },
    {
      label: "Profile Completion",
      value: profile?.profile_completion || 0,
      max: 100,
      color: "bg-blue-500",
      icon: CheckCircle,
      iconColor: "text-blue-500",
      suffix: "%",
    },
    {
      label: "Verification",
      status: profile?.verification_status || "unverified",
      icon: Lock,
      iconColor: "text-purple-500",
    },
    {
      label: "Safety",
      status: profile?.safety_status || "high",
      icon: ShieldCheck,
      iconColor: "text-green-500",
    },
    {
      label: "Activity",
      value: profile?.activity_score || 0,
      max: 100,
      color: "bg-orange-500",
      icon: Activity,
      iconColor: "text-orange-500",
      suffix: "%",
    },
  ];

  return (
    <div className="px-4 mb-4">
      <div className="bg-white rounded-[20px] p-4 shadow-sm border border-gray-50">
        <div className="flex items-center gap-2 mb-4">
          <ShieldCheck size={16} className="text-green-500" />
          <h3 className="text-sm font-bold text-gray-800">Trust & Reputation</h3>
        </div>

        <div className="space-y-3">
          {items.map((item, i) => (
            <div key={i}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <item.icon size={14} className={item.iconColor} />
                  <span className="text-xs font-medium text-gray-600">{item.label}</span>
                </div>
                {item.displayStars ? (
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        size={12}
                        className={s <= Math.floor(item.value) ? "text-yellow-400 fill-yellow-400" : "text-gray-200"}
                      />
                    ))}
                    <span className="text-[10px] font-bold text-gray-700 ml-1">{item.value}</span>
                  </div>
                ) : item.status ? (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    item.status === "verified" || item.status === "high"
                      ? "bg-green-100 text-green-600"
                      : item.status === "pending" || item.status === "medium"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-red-100 text-red-600"
                  }`}>
                    {item.status === "verified" ? "✓ Verified" : item.status === "high" ? "✓ High" : item.status}
                  </span>
                ) : (
                  <span className="text-[10px] font-bold text-gray-700">
                    {item.value}{item.suffix}
                  </span>
                )}
              </div>
              {item.max && !item.displayStars && !item.status && (
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color} rounded-full transition-all duration-700 ease-out`}
                    style={{ width: `${(item.value / item.max) * 100}%` }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}