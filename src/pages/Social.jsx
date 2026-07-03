import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft, Ticket, Users, Handshake, ChevronRight, Copy, QrCode,
  Share2, MessageCircle, Send, Facebook, Instagram, Mail, Star,
  UserCheck, UserPlus, Crown, Mic, Building2, Heart, X, Phone,
  Video, Gift, Inbox, Sparkles, Check, Clock, Search,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useSocialData } from "@/hooks/useSocialData";

const ICONS = {
  Ticket, Users, Handshake, ChevronRight, Copy, QrCode, Share2, MessageCircle,
  Send, Facebook, Instagram, Mail, Star, UserCheck, UserPlus, Crown, Mic,
  Building2, Heart, X, Phone, Video, Gift, Inbox, Sparkles, Check, Clock, Search,
};

const WHITE = "#FFFFFF";
const SOFT_BG = "#F8F9FC";
const DARK = "#1F2937";
const GRAY = "#6B7280";

function Card({ children, className = "" }) {
  return <div className={`rounded-2xl p-4 ${className}`} style={{ background: WHITE, border: "1px solid #F0F1F5", boxShadow: "0 4px 12px rgba(0,0,0,0.04)" }}>{children}</div>;
}

export default function Social() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { modules: socialModules, loading, acceptFriendRequest, rejectFriendRequest, removeFriend } = useSocialData();
  const [activeModule, setActiveModule] = useState(null);

  const handleAccept = async (requestId) => {
    try {
      await acceptFriendRequest(requestId);
      toast({ title: "✅ Friend request accepted" });
    } catch (err) {
      toast({ title: "Failed to accept", variant: "destructive" });
    }
  };

  const handleDecline = async (requestId) => {
    try {
      await rejectFriendRequest(requestId);
      toast({ title: "Request declined" });
    } catch (err) {
      toast({ title: "Failed to decline", variant: "destructive" });
    }
  };

  const handleAction = (action) => {
    toast({ title: action, description: "This feature will be available soon." });
  };

  const handleShare = (platform) => {
    toast({ title: `Share to ${platform}`, description: "Opening share dialog..." });
  };

  const handleCopy = (text, label) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        toast({ title: `${label} Copied!`, description: text });
      }).catch(() => {
        toast({ title: `${label} Copied!`, description: text });
      });
    } else {
      toast({ title: `${label} Copied!`, description: text });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: SOFT_BG }}>
        <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: SOFT_BG }}>
      <div className="max-w-md mx-auto pb-8">
        {/* Header */}
        <div className="sticky top-0 z-30 px-4 py-3 flex items-center gap-3" style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid #F0F1F5" }}>
          <button onClick={() => navigate("/more-services")} className="w-9 h-9 rounded-full flex items-center justify-center active:scale-95 transition" style={{ background: "#F7F9FC" }}>
            <ArrowLeft size={18} style={{ color: DARK }} />
          </button>
          <div className="flex-1">
            <h1 className="text-base font-bold" style={{ color: DARK }}>Social</h1>
            <p className="text-[10px]" style={{ color: GRAY }}>Invite, manage & connect with your community</p>
          </div>
        </div>

        {/* Hero Banner */}
        <div className="px-4 pt-4">
          <div className="rounded-2xl p-4 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)", boxShadow: "0 8px 24px rgba(236,72,153,0.2)" }}>
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #FFFFFF, transparent 70%)", transform: "translate(30%, -30%)" }} />
            <div className="relative">
              <div className="flex items-center gap-2 mb-1">
                <Users size={20} className="text-white" />
                <h2 className="text-base font-bold text-white">Community Center</h2>
              </div>
              <p className="text-[11px] text-white/90">Invite friends, manage your network, and build friendships across the VYRO ecosystem.</p>
            </div>
          </div>
        </div>

        {/* Module Cards */}
        <div className="px-4 pt-4 space-y-3">
          {socialModules.map((mod) => {
            const Icon = ICONS[mod.icon] || Users;
            return (
              <button
                key={mod.id}
                onClick={() => mod.path ? navigate(mod.path) : setActiveModule(mod.id)}
                className="w-full text-left rounded-2xl p-4 active:scale-[0.98] transition relative overflow-hidden"
                style={{ background: WHITE, border: "1px solid #F0F1F5", boxShadow: "0 8px 24px rgba(0,0,0,0.06)" }}
              >
                <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-5" style={{ background: `radial-gradient(circle, ${mod.color}, transparent 70%)`, transform: "translate(30%, -30%)" }} />
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: mod.gradient, boxShadow: `0 4px 12px ${mod.color}30` }}>
                    <Icon size={24} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold" style={{ color: DARK }}>{mod.title}</h3>
                    <p className="text-[10px]" style={{ color: GRAY }}>{mod.subtitle}</p>
                  </div>
                  <ChevronRight size={20} style={{ color: "#D1D5DB" }} />
                </div>
                {/* Stats */}
                <div className="grid grid-cols-4 gap-2">
                  {mod.stats.map((s, i) => (
                    <div key={i} className="text-center">
                      <p className="text-sm font-bold" style={{ color: s.color }}>{s.value}</p>
                      <p className="text-[8px]" style={{ color: GRAY }}>{s.label}</p>
                    </div>
                  ))}
                </div>
              </button>
            );
          })}
        </div>

        {/* Info banner */}
        <div className="px-4 pt-4">
          <div className="rounded-2xl p-4 text-center" style={{ background: "linear-gradient(135deg, #FDF2F8, #FAF5FF)" }}>
            <span className="text-2xl">❤️</span>
            <p className="text-xs font-semibold mt-1" style={{ color: DARK }}>Grow your social network</p>
            <p className="text-[10px] mt-0.5" style={{ color: GRAY }}>Invite friends, earn rewards, and build lasting connections</p>
          </div>
        </div>
      </div>

      {/* Module Sheet */}
      {activeModule && (
        <ModuleSheet
          module={socialModules.find(m => m.id === activeModule)}
          onClose={() => setActiveModule(null)}
          onAction={handleAction}
          onShare={handleShare}
          onCopy={handleCopy}
          onAccept={handleAccept}
          onDecline={handleDecline}
          onRemoveFriend={removeFriend}
        />
      )}
    </div>
  );
}

function ModuleSheet({ module, onClose, onAction, onShare, onCopy, onAccept, onDecline, onRemoveFriend }) {
  if (!module) return null;
  const Icon = ICONS[module.icon] || Users;
  const inviteCode = module.inviteCode || "VYRO-XXXX-XXX";
  const inviteLink = module.inviteLink || "https://vyro.app/invite/VYRO-XXXX-XXX";

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white rounded-t-3xl max-h-[88vh] overflow-y-auto animate-fadeIn">
        <div className="sticky top-0 bg-white pt-3 pb-2 z-10">
          <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-2" />
          <div className="flex items-center justify-between px-4">
            <h2 className="text-base font-bold" style={{ color: DARK }}>{module.title}</h2>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center active:scale-95 transition">
              <X size={16} className="text-gray-500" />
            </button>
          </div>
        </div>

        <div className="px-4 pb-6 space-y-4">
          {/* Icon + Description */}
          <div className="flex flex-col items-center py-3">
            <div className="w-16 h-16 rounded-3xl flex items-center justify-center mb-2" style={{ background: module.gradient, boxShadow: `0 6px 20px ${module.color}30` }}>
              <Icon size={28} className="text-white" />
            </div>
            <p className="text-xs font-bold" style={{ color: DARK }}>{module.subtitle}</p>
            <p className="text-[11px] text-center leading-relaxed mt-1" style={{ color: GRAY, maxWidth: "300px" }}>{module.description}</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-2">
            {module.stats.map((s, i) => (
              <div key={i} className="rounded-xl p-2 text-center" style={{ background: `${s.color}08`, border: `1px solid ${s.color}15` }}>
                <p className="text-sm font-bold" style={{ color: s.color }}>{s.value}</p>
                <p className="text-[8px]" style={{ color: GRAY }}>{s.label}</p>
              </div>
            ))}
          </div>

          {/* My Invite specific content */}
          {module.id === "invite" && (
            <>
              {/* Invite Code Card */}
              <div className="rounded-2xl p-4 relative overflow-hidden" style={{ background: module.gradient, boxShadow: `0 8px 24px ${module.color}20` }}>
                <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #FFFFFF, transparent 70%)", transform: "translate(30%, -30%)" }} />
                <div className="relative">
                  <p className="text-[10px] text-white/80 mb-1">Your Invite Code</p>
                  <div className="flex items-center gap-2 mb-3">
                    <Ticket size={20} className="text-white" />
                    <p className="text-lg font-bold text-white tracking-wider">{inviteCode}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => onCopy(inviteCode, "Invite Code")} className="flex-1 py-2 rounded-xl text-[11px] font-bold text-white active:scale-95 transition" style={{ background: "rgba(255,255,255,0.2)" }}>
                      <div className="flex items-center justify-center gap-1.5"><Copy size={12} /> Copy Code</div>
                    </button>
                    <button onClick={() => onCopy(inviteLink, "Invite Link")} className="flex-1 py-2 rounded-xl text-[11px] font-bold text-white active:scale-95 transition" style={{ background: "rgba(255,255,255,0.2)" }}>
                      <div className="flex items-center justify-center gap-1.5"><Share2 size={12} /> Copy Link</div>
                    </button>
                  </div>
                  <button onClick={() => onAction("Generate QR Code")} className="w-full mt-2 py-2 rounded-xl text-[11px] font-bold active:scale-95 transition" style={{ background: "rgba(255,255,255,0.15)", color: "white" }}>
                    <div className="flex items-center justify-center gap-1.5"><QrCode size={12} /> Generate QR Code</div>
                  </button>
                </div>
              </div>

              {/* Share Options */}
              <div>
                <h3 className="text-xs font-bold mb-2" style={{ color: DARK }}>Share Invite</h3>
                <div className="grid grid-cols-4 gap-2">
                  {module.shareOptions.map((s, i) => {
                    const SIcon = ICONS[s.icon] || Share2;
                    return (
                      <button key={i} onClick={() => onShare(s.label)} className="rounded-xl p-2 flex flex-col items-center gap-1.5 active:scale-95 transition" style={{ background: `${s.color}08`, border: `1px solid ${s.color}15` }}>
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: s.color }}>
                          <SIcon size={16} className="text-white" />
                        </div>
                        <span className="text-[9px] font-semibold" style={{ color: DARK }}>{s.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Invite History */}
              <div>
                <h3 className="text-xs font-bold mb-2" style={{ color: DARK }}>Invite History</h3>
                <div className="space-y-2">
                  {module.history.map((h, i) => (
                    <div key={i} className="rounded-2xl p-3 flex items-center gap-3" style={{ background: "#F9FAFB", border: "1px solid #F0F1F5" }}>
                      <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-[10px]" style={{ background: `linear-gradient(135deg, ${h.color}, ${h.color}cc)` }}>
                        {h.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-bold" style={{ color: DARK }}>{h.name}</p>
                        <p className="text-[10px]" style={{ color: GRAY }}>{h.date}</p>
                      </div>
                      <div className="text-right">
                        <span className="inline-block text-[9px] px-2 py-0.5 rounded-full font-bold" style={{ background: `${h.color}15`, color: h.color }}>{h.status}</span>
                        <p className="text-[9px] mt-0.5" style={{ color: GRAY }}>{h.reward}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* My People specific content */}
          {module.id === "people" && (
            <>
              {/* Categories */}
              <div>
                <h3 className="text-xs font-bold mb-2" style={{ color: DARK }}>Categories</h3>
                <div className="grid grid-cols-2 gap-2">
                  {module.categories.map((c, i) => {
                    const CIcon = ICONS[c.icon] || Users;
                    return (
                      <button key={i} onClick={() => onAction(c.label)} className="rounded-xl p-3 flex items-center gap-2 active:scale-95 transition" style={{ background: `${c.color}08`, border: `1px solid ${c.color}15` }}>
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${c.color}15` }}>
                          <CIcon size={16} style={{ color: c.color }} />
                        </div>
                        <div className="flex-1 text-left">
                          <p className="text-[10px] font-bold" style={{ color: DARK }}>{c.label}</p>
                          <p className="text-[9px]" style={{ color: GRAY }}>{c.count} users</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Connected People */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-bold" style={{ color: DARK }}>Recent Connections</h3>
                  <button onClick={() => onAction("View All")} className="text-[10px] font-semibold" style={{ color: module.color }}>View All</button>
                </div>
                <div className="space-y-2">
                  {module.people.map((p, i) => (
                    <div key={i} className="rounded-2xl p-3 flex items-center gap-3" style={{ background: "#F9FAFB", border: "1px solid #F0F1F5" }}>
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-[10px]" style={{ background: `linear-gradient(135deg, ${p.color}, ${p.color}cc)` }}>
                          {p.avatar}
                        </div>
                        {p.isOnline && <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white" style={{ background: "#10B981" }} />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-1.5">
                          <p className="text-xs font-bold" style={{ color: DARK }}>{p.name}</p>
                          {p.isVip && <Crown size={10} style={{ color: "#D4AF37" }} />}
                        </div>
                        <p className="text-[10px]" style={{ color: GRAY }}>{p.role} • {p.level}</p>
                      </div>
                      <div className="flex gap-1.5">
                        <button onClick={() => onAction("Message")} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: `${module.color}10` }}>
                          <MessageCircle size={14} style={{ color: module.color }} />
                        </button>
                        <button onClick={() => onAction("Follow")} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: `${module.color}10` }}>
                          <UserPlus size={14} style={{ color: module.color }} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Friends specific content */}
          {module.id === "friends" && (
            <>
              {/* Tabs */}
              <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                {module.tabs.map((t, i) => {
                  const TIcon = ICONS[t.icon] || Handshake;
                  return (
                    <button key={i} onClick={() => onAction(t.label)} className="flex-shrink-0 rounded-full px-3 py-2 flex items-center gap-1.5 active:scale-95 transition" style={{ background: `${t.color}10`, border: `1px solid ${t.color}20` }}>
                      <TIcon size={12} style={{ color: t.color }} />
                      <span className="text-[11px] font-semibold" style={{ color: DARK }}>{t.label}</span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded-full font-bold text-white" style={{ background: t.color }}>{t.count}</span>
                    </button>
                  );
                })}
              </div>

              {/* Friends List */}
              <div>
                <h3 className="text-xs font-bold mb-2" style={{ color: DARK }}>Your Friends</h3>
                <div className="space-y-2">
                  {module.friends.map((f, i) => (
                    <div key={i} className="rounded-2xl p-3 flex items-center gap-3" style={{ background: "#F9FAFB", border: "1px solid #F0F1F5" }}>
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-[10px]" style={{ background: `linear-gradient(135deg, ${f.color}, ${f.color}cc)` }}>
                          {f.avatar}
                        </div>
                        {f.status === "Online" && <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white" style={{ background: "#10B981" }} />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-1.5">
                          <p className="text-xs font-bold" style={{ color: DARK }}>{f.name}</p>
                          {f.isBest && <Star size={10} style={{ color: "#D4AF37", fill: "#D4AF37" }} />}
                        </div>
                        <p className="text-[10px]" style={{ color: GRAY }}>{f.status} • {f.mutual} mutual friends</p>
                      </div>
                      <div className="flex gap-1.5">
                        <button onClick={() => onAction("Message")} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: `${module.color}10` }}>
                          <MessageCircle size={14} style={{ color: module.color }} />
                        </button>
                        <button onClick={() => onAction("Gift")} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "#EC489910" }}>
                          <Gift size={14} style={{ color: "#EC4899" }} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pending Requests */}
              <div>
                <h3 className="text-xs font-bold mb-2" style={{ color: DARK }}>Pending Requests</h3>
                <div className="space-y-2">
                  {module.requests.map((r, i) => (
                    <div key={i} className="rounded-2xl p-3 flex items-center gap-3" style={{ background: "#F9FAFB", border: "1px solid #F0F1F5" }}>
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-[10px]" style={{ background: `linear-gradient(135deg, ${r.color}, ${r.color}cc)` }}>
                        {r.avatar}
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-bold" style={{ color: DARK }}>{r.name}</p>
                        <p className="text-[10px]" style={{ color: GRAY }}>{r.mutual} mutual • {r.date}</p>
                      </div>
                      <div className="flex gap-1.5">
                        <button onClick={() => onAccept(r.id)} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "#27AE6010" }}>
                          <Check size={14} style={{ color: "#27AE60" }} />
                        </button>
                        <button onClick={() => onDecline(r.id)} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "#EB575710" }}>
                          <X size={14} style={{ color: "#EB5757" }} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Features */}
          <div className="rounded-2xl p-3" style={{ background: "#F9FAFB", border: "1px solid #F0F1F5" }}>
            <h3 className="text-xs font-bold mb-2" style={{ color: DARK }}>Features</h3>
            <div className="flex flex-wrap gap-1.5">
              {module.features.map((f, i) => (
                <span key={i} className="text-[9px] px-2 py-1 rounded-full font-medium" style={{ background: `${module.color}08`, color: module.color }}>{f}</span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div>
            <h3 className="text-xs font-bold mb-2" style={{ color: DARK }}>Quick Actions</h3>
            <div className="flex flex-wrap gap-2">
              {module.actions.map((a, i) => (
                <button key={i} onClick={() => onAction(a)} className="text-[10px] px-3 py-1.5 rounded-full font-semibold active:scale-95 transition" style={{ background: `${module.color}10`, color: module.color }}>{a}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}