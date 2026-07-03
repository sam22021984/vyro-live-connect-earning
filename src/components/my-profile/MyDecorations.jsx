import React, { useState } from "react";
import { Check, X, ShoppingBag } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const DECORATIONS = [
  { name: "Avatar Frames", icon: "🖼️", equipped: true, owned: true },
  { name: "Profile Themes", icon: "🎨", equipped: true, owned: true },
  { name: "Chat Bubbles", icon: "💬", equipped: false, owned: true },
  { name: "Entrance Effects", icon: "✨", equipped: false, owned: false },
  { name: "Name Colors", icon: "🌈", equipped: true, owned: true },
  { name: "Vehicles", icon: "🚗", equipped: false, owned: false },
  { name: "Special Titles", icon: "🏷️", equipped: false, owned: true },
  { name: "Backgrounds", icon: "🏞️", equipped: false, owned: false },
];

export default function MyDecorations({ profile }) {
  const { toast } = useToast();
  const [selected, setSelected] = useState(null);

  return (
    <div className="px-3 pt-4">
      <h2 className="text-sm font-bold text-gray-800 mb-2 px-1">🎨 Decorations</h2>
      <div className="grid grid-cols-4 gap-2">
        {DECORATIONS.map((dec) => (
          <button
            key={dec.name}
            onClick={() => setSelected(dec)}
            className={`flex flex-col items-center gap-1 p-2 rounded-2xl border shadow-sm active:scale-95 transition relative ${dec.equipped ? "bg-purple-50 border-purple-200" : "bg-white border-gray-50"}`}
          >
            {dec.equipped && (
              <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-500 flex items-center justify-center border border-white">
                <Check size={8} className="text-white" />
              </div>
            )}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center text-lg">
              {dec.icon}
            </div>
            <span className="text-[8px] font-bold text-gray-600 text-center">{dec.name}</span>
          </button>
        ))}
      </div>

      {/* Decoration detail sheet */}
      {selected && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-end" onClick={() => setSelected(null)}>
          <div className="w-full bg-white rounded-t-3xl p-5 animate-fadeIn" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-gray-800">{selected.name}</h3>
              <button onClick={() => setSelected(null)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"><X size={16} className="text-gray-500" /></button>
            </div>
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center text-4xl">{selected.icon}</div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => { toast({ title: "Preview opened" }); }} className="flex-1 py-2.5 rounded-xl bg-gray-50 text-gray-600 text-xs font-bold active:scale-95 border border-gray-100">Preview</button>
              {selected.owned ? (
                selected.equipped ? (
                  <button onClick={() => { toast({ title: "Removed" }); setSelected(null); }} className="flex-1 py-2.5 rounded-xl bg-gray-100 text-gray-600 text-xs font-bold active:scale-95">Remove</button>
                ) : (
                  <button onClick={() => { toast({ title: "Equipped!" }); setSelected(null); }} className="flex-1 py-2.5 rounded-xl bg-purple-500 text-white text-xs font-bold active:scale-95">Equip</button>
                )
              ) : (
                <button onClick={() => { window.location.href = "/vyro-mall"; }} className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold flex items-center justify-center gap-1 active:scale-95">
                  <ShoppingBag size={12} /> Purchase
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}