import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, Search, Inbox, HeartCrack, History, Shield } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { getCurrentUser } from "@/lib/getCurrentUser";
import DiscoverTab from "@/components/relationship/DiscoverTab";
import RequestsTab from "@/components/relationship/RequestsTab";
import MyRelationshipTab from "@/components/relationship/MyRelationshipTab";
import HistoryTab from "@/components/relationship/HistoryTab";
import SafetyTab from "@/components/relationship/SafetyTab";
import { RELATIONSHIP_COLORS, GRADIENT_DARK, GRADIENT_PINK_PURPLE, formatDate, formatTime } from "@/components/relationship/relationshipData";
import { useToast } from "@/components/ui/use-toast";
import { useBackNav } from "@/hooks/useBackNav";

const TABS = [
  { key: "discover", label: "Discover", icon: Search },
  { key: "requests", label: "Requests", icon: Inbox },
  { key: "myrelationship", label: "My Relationship", icon: Heart },
  { key: "history", label: "History", icon: History },
  { key: "safety", label: "Safety", icon: Shield },
];

export default function RelationshipCenter() {
  const navigate = useNavigate();
  const handleBack = useBackNav("/social");
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("discover");
  const [existingRelations, setExistingRelations] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    loadRelations();
  }, [refreshKey]);

  const loadRelations = async () => {
    try {
      const list = await base44.entities.Relationship.list();
      setExistingRelations(list || []);
    } catch (e) {
      setExistingRelations([]);
    }
  };

  const handleSendRequest = async (user) => {
    // Check if user already has an active relationship
    const hasActive = existingRelations.some((r) => r.status === "accepted");
    if (hasActive) {
      toast({ title: "You already have an active relationship", description: "Only one active relationship is allowed", variant: "destructive" });
      return;
    }

    // Check if already pending
    const alreadyPending = existingRelations.some((r) =>
      r.receiver_id === user.id && r.status === "pending"
    );
    if (alreadyPending) {
      toast({ title: "Request already sent", variant: "destructive" });
      return;
    }

    setSending(true);
    try {
      const me = await getCurrentUser();
      await base44.entities.Relationship.create({
        sender_name: me.full_name || "You",
        sender_avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop",
        sender_id: me.id,
        sender_country: "Qatar",
        receiver_name: user.username,
        receiver_avatar: user.avatar_url,
        receiver_id: user.id,
        receiver_country: user.country,
        status: "pending",
        request_date: formatDate(),
        request_time: formatTime(),
      });
      toast({ title: "❤️ Relationship request sent!", description: "Waiting for " + user.username + " to respond" });
      setRefreshKey((k) => k + 1);
    } catch (e) {
      toast({ title: "Failed to send request", variant: "destructive" });
    } finally {
      setSending(false);
    }
  };

  const renderTab = () => {
    switch (activeTab) {
      case "discover":
        return <DiscoverTab onSendRequest={handleSendRequest} existingRelations={existingRelations} />;
      case "requests":
        return <RequestsTab refreshKey={refreshKey} />;
      case "myrelationship":
        return <MyRelationshipTab refreshKey={refreshKey} />;
      case "history":
        return <HistoryTab />;
      case "safety":
        return <SafetyTab />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen" style={{ background: GRADIENT_DARK }}>
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="sticky top-0 z-20 backdrop-blur-xl px-4 py-3 flex items-center gap-3" style={{ background: "rgba(26,11,46,0.8)", borderBottom: "1px solid " + RELATIONSHIP_COLORS.glassBorder }}>
          <button onClick={handleBack} className="w-9 h-9 rounded-full flex items-center justify-center active:scale-95 transition" style={{ background: RELATIONSHIP_COLORS.glassBg }}>
            <ArrowLeft size={18} style={{ color: RELATIONSHIP_COLORS.textLight }} />
          </button>
          <div className="flex-1">
            <h1 className="text-base font-bold flex items-center gap-1.5" style={{ color: RELATIONSHIP_COLORS.textLight }}>
              <Heart size={16} fill="#EC4899" style={{ color: "#EC4899" }} /> Relationship Center
            </h1>
            <p className="text-[10px]" style={{ color: RELATIONSHIP_COLORS.textMuted }}>Find your special someone ❤️</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="sticky top-[57px] z-10 backdrop-blur-xl px-4 pt-3 pb-2" style={{ background: "rgba(26,11,46,0.7)" }}>
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-2 min-w-max">
              {TABS.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={"py-2 px-3.5 rounded-xl text-xs font-bold flex items-center gap-1.5 whitespace-nowrap transition active:scale-95 " + (activeTab === tab.key ? "text-white" : "")}
                  style={activeTab === tab.key
                    ? { background: GRADIENT_PINK_PURPLE, boxShadow: "0 3px 10px rgba(236,72,153,0.4)" }
                    : { background: RELATIONSHIP_COLORS.glassBg, border: "1px solid " + RELATIONSHIP_COLORS.glassBorder, color: RELATIONSHIP_COLORS.textMuted }
                  }
                >
                  <tab.icon size={13} /> {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 pb-24">
          {sending && (
            <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(26,11,46,0.7)" }}>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center animate-pulse" style={{ background: GRADIENT_PINK_PURPLE }}>
                  <Heart size={24} className="text-white" fill="white" />
                </div>
                <p className="text-sm font-bold" style={{ color: RELATIONSHIP_COLORS.textLight }}>Sending request...</p>
              </div>
            </div>
          )}
          {renderTab()}
        </div>
      </div>
    </div>
  );
}