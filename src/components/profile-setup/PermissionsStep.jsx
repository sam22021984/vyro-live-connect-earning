import React, { useState } from "react";
import {
  Users, Bell, Camera, Mic, HardDrive, MapPin, ArrowRight, Check, X,
} from "lucide-react";

const PERMISSIONS = [
  { icon: Users, title: "Contacts Access", desc: "Find friends from your contacts", key: "contacts" },
  { icon: Bell, title: "Notifications", desc: "Live alerts, messages, follows, gifts, and party invites", key: "notifications" },
  { icon: Camera, title: "Camera Access", desc: "Take photos, go live, and video call", key: "camera" },
  { icon: Mic, title: "Microphone Access", desc: "Voice chat, audio rooms, and voice calls", key: "microphone" },
  { icon: HardDrive, title: "Storage / Gallery", desc: "Upload photos and videos from your device", key: "storage" },
  { icon: MapPin, title: "Location Access", desc: "Find nearby users and live rooms (optional)", key: "location", optional: true },
];

export default function PermissionsStep({ onContinue }) {
  const [current, setCurrent] = useState(0);
  const [granted, setGranted] = useState({});
  const perm = PERMISSIONS[current];
  const isLast = current === PERMISSIONS.length - 1;

  const handleAllow = async () => {
    if (perm.key === "notifications" && "Notification" in window) {
      try { await Notification.requestPermission(); } catch {}
    }
    setGranted((prev) => ({ ...prev, [perm.key]: true }));
    handleNext();
  };

  const handleDeny = () => {
    setGranted((prev) => ({ ...prev, [perm.key]: false }));
    handleNext();
  };

  const handleNext = () => {
    if (isLast) onContinue();
    else setCurrent(current + 1);
  };

  return (
    <div>
      {/* Progress dots */}
      <div className="flex justify-center gap-1.5 mb-6">
        {PERMISSIONS.map((p, i) => (
          <div
            key={p.key}
            className={`h-1.5 rounded-full transition-all ${
              i === current ? "w-6 bg-purple-500" : i < current ? "w-1.5 bg-purple-300" : "w-1.5 bg-gray-200"
            }`}
          />
        ))}
      </div>

      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-purple-200 to-blue-200 flex items-center justify-center">
          <perm.icon size={36} className="text-purple-500" />
        </div>
      </div>

      <div className="text-center mb-8">
        <h3 className="text-lg font-bold text-[#2D1B4E] mb-2">Allow {perm.title}?</h3>
        <p className="text-sm text-gray-400">{perm.desc}</p>
        {perm.optional && (
          <span className="inline-block mt-2 px-2 py-0.5 rounded-full bg-gray-100 text-gray-400 text-[10px] font-medium">
            Optional
          </span>
        )}
      </div>

      <div className="space-y-3">
        <button
          onClick={handleAllow}
          className="w-full rounded-2xl bg-gradient-to-r from-[#6F35E0] to-[#C135E0] text-white font-bold text-sm shadow-lg shadow-purple-200 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          style={{ height: "52px" }}
        >
          <Check size={18} /> Allow
        </button>
        <button
          onClick={handleDeny}
          className="w-full rounded-2xl bg-gray-100 text-gray-600 font-semibold text-sm transition active:scale-[0.98] flex items-center justify-center gap-2"
          style={{ height: "52px" }}
        >
          <X size={18} /> Not Now
        </button>
      </div>
    </div>
  );
}