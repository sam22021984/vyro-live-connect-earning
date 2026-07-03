import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Home, Plus, Users, Crown, Lock, ChevronRight } from "lucide-react";
import { useVipProfile } from "@/hooks/useVipProfile";
import { vipRoomThemes } from "@/components/vip-systems/vipSystemsData";
import { vipPricingTiers } from "@/components/vip/vipData";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";
import VipSystemHeader from "@/components/vip-systems/VipSystemHeader";
import VipSystemLoader from "@/components/vip-systems/VipSystemLoader";

export default function VipRoomManager({ embedded }) {
  const { profile, loading } = useVipProfile();
  const { toast } = useToast();
  const [showCreate, setShowCreate] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [creating, setCreating] = useState(false);
  const navigate = useNavigate();

  if (loading) return <VipSystemLoader />;

  const userTierName = profile?.vip_tier || "VIP 1";
  const userTierIndex = vipPricingTiers.findIndex((t) => t.name === userTierName);
  const isVip = profile?.is_vip;

  const canAccessTheme = (minTier) => {
    const themeTierIndex = vipPricingTiers.findIndex((t) => t.name === minTier);
    return (userTierIndex >= 0 ? userTierIndex : 0) >= themeTierIndex;
  };

  const handleCreateRoom = async () => {
    if (!isVip) {
      toast({ title: "VIP Required", description: "Upgrade to VIP to create VIP rooms", variant: "destructive" });
      return;
    }
    if (!roomName.trim()) {
      toast({ title: "Name Required", description: "Please enter a room name", variant: "destructive" });
      return;
    }
    if (!selectedTheme) {
      toast({ title: "Theme Required", description: "Please select a room theme", variant: "destructive" });
      return;
    }
    if (!canAccessTheme(selectedTheme.minTier)) {
      toast({ title: "Tier Too Low", description: `Requires ${selectedTheme.minTier} or higher`, variant: "destructive" });
      return;
    }
    setCreating(true);
    try {
      toast({
        title: "VIP Room Created! 🎉",
        description: `"${roomName}" is ready to go live!`,
      });
      setRoomName("");
      setSelectedTheme(null);
      setShowCreate(false);
      setTimeout(() => navigate("/go-live"), 1500);
    } catch (e) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0118]">
      <div className="max-w-md mx-auto">
        {!embedded && <VipSystemHeader title="VIP ROOM MANAGER" subtitle="Create & manage VIP rooms" icon="🏠" color="#8B5CF6" />}

        <div className="pb-6 animate-fadeIn">
          {/* VIP Status Banner */}
          <div className="px-4 pt-4">
            <div className="rounded-2xl p-4 bg-gradient-to-br from-purple-500/20 to-violet-500/5 border border-purple-500/20">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                  <Crown size={24} className="text-purple-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-white">
                    {isVip ? `${userTierName} Room Access` : "VIP Required"}
                  </p>
                  <p className="text-xs text-gray-400">
                    {isVip ? "Create exclusive VIP-themed rooms" : "Upgrade to create VIP rooms"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Create Room Button */}
          <div className="px-4 mt-4">
            <button
              onClick={() => setShowCreate(!showCreate)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-violet-600 text-white text-sm font-bold active:scale-95 transition"
            >
              <Plus size={18} />
              Create VIP Room
            </button>
          </div>

          {/* Create Room Form */}
          {showCreate && (
            <div className="px-4 mt-3 animate-fadeIn">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                <div>
                  <label className="text-xs font-bold text-gray-400 mb-1.5 block">Room Name</label>
                  <input
                    type="text"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                    placeholder="Enter your VIP room name"
                    className="w-full px-3 py-2.5 rounded-xl bg-black/30 border border-white/10 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 mb-2 block">Select Theme</label>
                  <div className="grid grid-cols-2 gap-2">
                    {vipRoomThemes.map((theme) => {
                      const unlocked = canAccessTheme(theme.minTier);
                      const isSelected = selectedTheme?.id === theme.id;
                      return (
                        <button
                          key={theme.id}
                          onClick={() => unlocked && setSelectedTheme(theme)}
                          disabled={!unlocked}
                          className={`p-3 rounded-xl text-left transition-all ${
                            isSelected
                              ? "bg-purple-500/20 border border-purple-500/50"
                              : unlocked
                              ? "bg-white/5 border border-white/5 active:scale-95"
                              : "bg-white/[0.02] border border-white/5 opacity-40"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xl">{theme.icon}</span>
                            {!unlocked && <Lock size={12} className="text-gray-600" />}
                          </div>
                          <p className="text-xs font-bold text-white">{theme.name}</p>
                          <p className="text-[9px] text-gray-500 mt-0.5">{theme.minTier}+</p>
                        </button>
                      );
                    })}
                  </div>
                </div>
                {selectedTheme && (
                  <div className="p-3 rounded-xl bg-black/20 border border-white/5">
                    <p className="text-xs text-gray-400">{selectedTheme.desc}</p>
                  </div>
                )}
                <button
                  onClick={handleCreateRoom}
                  disabled={creating}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-violet-600 text-white text-xs font-bold disabled:opacity-50 active:scale-95 transition"
                >
                  {creating ? "Creating..." : "Create & Go Live"}
                </button>
              </div>
            </div>
          )}

          {/* Room Themes Showcase */}
          <div className="px-4 mt-6">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">VIP Room Themes</h3>
            <div className="space-y-2">
              {vipRoomThemes.map((theme) => {
                const unlocked = canAccessTheme(theme.minTier);
                return (
                  <div
                    key={theme.id}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5"
                  >
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                      style={{ backgroundColor: `${theme.color}22` }}
                    >
                      {theme.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-white">{theme.name}</p>
                      <p className="text-[10px] text-gray-500">{theme.desc}</p>
                    </div>
                    {unlocked ? (
                      <span className="text-[9px] px-2 py-0.5 rounded-full font-bold bg-green-500/20 text-green-400">
                        UNLOCKED
                      </span>
                    ) : (
                      <span className="text-[9px] px-2 py-0.5 rounded-full font-bold bg-gray-500/10 text-gray-500 flex items-center gap-1">
                        <Lock size={8} /> {theme.minTier}+
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Room Actions */}
          <div className="px-4 mt-6">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => navigate("/go-live")}
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 border border-white/5 active:scale-95 transition"
              >
                <Home size={20} className="text-purple-400" />
                <span className="text-xs font-bold text-white">Go Live</span>
              </button>
              <button
                onClick={() => navigate("/party-dashboard")}
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 border border-white/5 active:scale-95 transition"
              >
                <Users size={20} className="text-purple-400" />
                <span className="text-xs font-bold text-white">Browse Rooms</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}