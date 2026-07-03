import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, DollarSign, Activity, Shield, DoorClosed, Power, Users, Loader2, AlertTriangle, CheckCircle, XCircle, RefreshCw } from "lucide-react";
import { base44 } from "@/api/base44Client";

const TABS = [
  { id: "profit", name: "Profit", icon: DollarSign, color: "#10B981", api: "roomProfit" },
  { id: "monitoring", name: "Monitoring", icon: Activity, color: "#3B82F6", api: "roomMonitoring" },
  { id: "security", name: "Security", icon: Shield, color: "#6366F1", api: "roomSecurity" },
  { id: "close", name: "Close", icon: DoorClosed, color: "#F59E0B", api: "roomClose" },
  { id: "shutdown", name: "Shut Down", icon: Power, color: "#EF4444", api: "roomShutDown" },
  { id: "users", name: "User Accounts", icon: Users, color: "#8B5CF6", api: "roomUserAccounts" },
];

export default function RoomManagement() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profit");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  // Form state
  const [sessionId, setSessionId] = useState("");
  const [targetUserId, setTargetUserId] = useState("");
  const [reason, setReason] = useState("");
  const [duration, setDuration] = useState(30);

  const current = TABS.find((t) => t.id === activeTab);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      let action = "listActive";
      let payload = {};
      if (activeTab === "profit") { action = "listActive"; }
      else if (activeTab === "monitoring") { action = "getHealth"; }
      else if (activeTab === "security") { action = "getOverview"; }
      else if (activeTab === "close") { action = "listClosed"; }
      else if (activeTab === "shutdown") { action = "getLog"; }
      else if (activeTab === "users") { action = "list"; payload = { session_id: sessionId || "all" }; }

      const res = await base44.functions.invoke(current.api, { action, ...payload });
      setData(res.data);
    } catch (e) {
      setError(e.response?.data?.error || e.message);
    } finally {
      setLoading(false);
    }
  }, [activeTab, sessionId, current]);

  useEffect(() => { fetchData(); }, [activeTab]);

  const runAction = async (action, extra = {}) => {
    if (!sessionId && action !== "getHealth" && action !== "getOverview" && action !== "listActive" && action !== "listClosed" && action !== "getLog") {
      setError("Session ID is required for this action");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await base44.functions.invoke(current.api, { action, session_id: sessionId, target_user_id: targetUserId, reason, duration_minutes: duration, ...extra });
      setData(res.data);
    } catch (e) {
      setError(e.response?.data?.error || e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FC]">
      <div className="max-w-md mx-auto pb-8">
        {/* Header */}
        <div className="sticky top-0 z-30 px-4 py-3 flex items-center gap-3" style={{ background: "linear-gradient(135deg, #1E293B 0%, #334155 100%)" }}>
          <button onClick={() => navigate("/control-center")} className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center active:scale-95 transition">
            <ArrowLeft size={18} className="text-white" />
          </button>
          <div className="flex-1">
            <h1 className="text-base font-bold text-white">Room Management APIs</h1>
            <p className="text-[10px] text-white/60">6 APIs · RoomSession + RoomParticipant entities</p>
          </div>
          <button onClick={fetchData} className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center active:scale-95">
            <RefreshCw size={16} className={`text-white ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>

        {/* API Tabs */}
        <div className="px-4 pt-4">
          <div className="grid grid-cols-3 gap-2 mb-4">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => { setActiveTab(t.id); setData(null); setError(null); }}
                className={`flex flex-col items-center gap-1.5 p-2.5 rounded-2xl border transition-all active:scale-95 ${activeTab === t.id ? "border-transparent" : "bg-white border-gray-100"}`}
                style={activeTab === t.id ? { background: `${t.color}15`, border: `1px solid ${t.color}40` } : { boxShadow: "0 2px 6px rgba(0,0,0,0.04)" }}
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${t.color}15` }}>
                  <t.icon size={16} style={{ color: t.color }} />
                </div>
                <span className="text-[9px] font-bold text-gray-700 text-center">{t.name}</span>
              </button>
            ))}
          </div>

          {/* Input Fields */}
          <div className="bg-white rounded-2xl p-3 border border-gray-100 mb-3 space-y-2" style={{ boxShadow: "0 2px 6px rgba(0,0,0,0.04)" }}>
            <div className="flex items-center gap-2">
              <input
                value={sessionId}
                onChange={(e) => setSessionId(e.target.value)}
                placeholder="Session ID"
                className="flex-1 px-3 py-2 rounded-lg bg-gray-50 text-xs font-medium border border-gray-100 focus:outline-none focus:border-gray-300"
              />
              <input
                value={targetUserId}
                onChange={(e) => setTargetUserId(e.target.value)}
                placeholder="Target User ID"
                className="flex-1 px-3 py-2 rounded-lg bg-gray-50 text-xs font-medium border border-gray-100 focus:outline-none focus:border-gray-300"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Reason (for ban/shutdown/mute)"
                className="flex-1 px-3 py-2 rounded-lg bg-gray-50 text-xs font-medium border border-gray-100 focus:outline-none focus:border-gray-300"
              />
              {activeTab === "users" && (
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  placeholder="Min"
                  className="w-16 px-2 py-2 rounded-lg bg-gray-50 text-xs font-medium border border-gray-100 focus:outline-none focus:border-gray-300"
                />
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {activeTab === "profit" && (
                <>
                  <ActionButton label="Active Rooms" color="#10B981" onClick={() => runAction("listActive")} />
                  <ActionButton label="Get Profit" color="#10B981" onClick={() => runAction("getProfit")} />
                  <ActionButton label="History" color="#10B981" onClick={() => runAction("getHistory")} />
                  <ActionButton label="Settle" color="#059669" onClick={() => runAction("settle")} />
                </>
              )}
              {activeTab === "monitoring" && (
                <>
                  <ActionButton label="Health Overview" color="#3B82F6" onClick={() => runAction("getHealth")} />
                  <ActionButton label="Room Stats" color="#3B82F6" onClick={() => runAction("getStats")} />
                  <ActionButton label="Activity Feed" color="#3B82F6" onClick={() => runAction("getActivity")} />
                </>
              )}
              {activeTab === "security" && (
                <>
                  <ActionButton label="Overview" color="#6366F1" onClick={() => runAction("getOverview")} />
                  <ActionButton label="Scan Room" color="#6366F1" onClick={() => runAction("scan")} />
                  <ActionButton label="Check User" color="#6366F1" onClick={() => runAction("checkUser")} />
                  <ActionButton label="Banned List" color="#6366F1" onClick={() => runAction("getBanned")} />
                  <ActionButton label="Flag User" color="#4F46E5" onClick={() => runAction("flagUser")} />
                </>
              )}
              {activeTab === "close" && (
                <>
                  <ActionButton label="Closed Rooms" color="#F59E0B" onClick={() => runAction("listClosed")} />
                  <ActionButton label="Close Room" color="#D97706" onClick={() => runAction("close")} />
                  <ActionButton label="Close Status" color="#F59E0B" onClick={() => runAction("getStatus")} />
                </>
              )}
              {activeTab === "shutdown" && (
                <>
                  <ActionButton label="Shutdown Log" color="#EF4444" onClick={() => runAction("getLog")} />
                  <ActionButton label="Force Shutdown" color="#DC2626" onClick={() => runAction("shutdown")} />
                </>
              )}
              {activeTab === "users" && (
                <>
                  <ActionButton label="List Participants" color="#8B5CF6" onClick={() => runAction("list")} />
                  <ActionButton label="Get Participant" color="#8B5CF6" onClick={() => runAction("getParticipant")} />
                  <ActionButton label="Kick" color="#DC2626" onClick={() => runAction("kick")} />
                  <ActionButton label="Ban" color="#991B1B" onClick={() => runAction("ban")} />
                  <ActionButton label="Unban" color="#059669" onClick={() => runAction("unban")} />
                  <ActionButton label="Mute" color="#D97706" onClick={() => runAction("mute")} />
                  <ActionButton label="Unmute" color="#059669" onClick={() => runAction("unmute")} />
                  <ActionButton label="Set Role" color="#6366F1" onClick={() => runAction("setRole", { role: "co_host" })} />
                </>
              )}
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-3 mb-3 flex items-start gap-2">
              <XCircle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-red-600 font-medium">{error}</p>
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="flex items-center justify-center py-8">
              <Loader2 size={24} className="animate-spin text-gray-300" />
            </div>
          )}

          {/* Result */}
          {!loading && data && (
            <div className="bg-white rounded-2xl p-4 border border-gray-100 animate-fadeIn" style={{ boxShadow: "0 2px 6px rgba(0,0,0,0.04)" }}>
              <div className="flex items-center gap-2 mb-3">
                <current.icon size={16} style={{ color: current.color }} />
                <h3 className="text-sm font-bold text-gray-800">{current.name} API Response</h3>
              </div>
              <pre className="text-[11px] text-gray-700 bg-gray-50 rounded-xl p-3 overflow-x-auto max-h-[400px] overflow-y-auto">{JSON.stringify(data, null, 2)}</pre>
            </div>
          )}

          {/* Empty state */}
          {!loading && !data && !error && (
            <div className="text-center py-12">
              <current.icon size={40} className="mx-auto text-gray-200 mb-3" />
              <p className="text-sm text-gray-400 font-medium">Select an action above</p>
              <p className="text-xs text-gray-300">Run any {current.name} API action to see results</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ActionButton({ label, color, onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-3 py-1.5 rounded-lg text-[10px] font-bold text-white active:scale-95 transition"
      style={{ background: color }}
    >
      {label}
    </button>
  );
}