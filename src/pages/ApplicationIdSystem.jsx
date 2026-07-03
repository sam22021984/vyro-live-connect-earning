import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Lock, Unlock, Power, Plus, RefreshCw, Users, History, Shield, DollarSign, Loader2, CheckCircle, XCircle } from "lucide-react";
import { base44 } from "@/api/base44Client";

const TABS = [
  { id: "overview", name: "Overview", icon: Shield },
  { id: "all_ids", name: "All IDs", icon: Users },
  { id: "lucky", name: "Lucky IDs", icon: DollarSign },
  { id: "history", name: "History", icon: History },
  { id: "actions", name: "Actions", icon: Power },
];

export default function ApplicationIdSystem() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [countryFilter, setCountryFilter] = useState("");

  // Create premium ID form
  const [createCountry, setCreateCountry] = useState("QAT");
  const [createSerial, setCreateSerial] = useState("");
  const [createPrice, setCreatePrice] = useState(5000);
  const [createCategory, setCreateCategory] = useState("lucky");

  // Action form
  const [actionId, setActionId] = useState("");
  const [actionReason, setActionReason] = useState("");

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      if (activeTab === "overview") {
        const res = await base44.functions.invoke("applicationIdSystem", { action: "getStats" });
        setData(res.data);
      } else if (activeTab === "all_ids") {
        const res = await base44.functions.invoke("applicationIdSystem", {
          action: "getAllIds",
          search: searchQuery || undefined,
          status: statusFilter || undefined,
          country_code: countryFilter || undefined,
          limit: 50,
        });
        setData(res.data);
      } else if (activeTab === "lucky") {
        const res = await base44.functions.invoke("applicationIdSystem", { action: "getAllLuckyIds" });
        setData(res.data);
      } else if (activeTab === "history") {
        const res = await base44.functions.invoke("applicationIdSystem", { action: "getHistory", limit: 50 });
        setData(res.data);
      }
    } catch (e) {
      setError(e.response?.data?.error || e.message);
    } finally {
      setLoading(false);
    }
  }, [activeTab, searchQuery, statusFilter, countryFilter]);

  useEffect(() => { fetchData(); }, [activeTab]);

  const handleCreatePremium = async () => {
    if (!createCountry || !createSerial) return;
    setLoading(true);
    setError(null);
    try {
      const res = await base44.functions.invoke("applicationIdSystem", {
        action: "createPremiumId",
        country_code: createCountry,
        serial_number: parseInt(createSerial),
        price_coins: createPrice,
        category: createCategory,
      });
      setCreateSerial("");
      fetchData();
    } catch (e) {
      setError(e.response?.data?.error || e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (actionType) => {
    if (!actionId) { setError("Application ID is required"); return; }
    setLoading(true);
    setError(null);
    try {
      await base44.functions.invoke("applicationIdSystem", {
        action: actionType,
        application_id: actionId,
        lock_reason: actionReason,
        disable_reason: actionReason,
      });
      setActionId("");
      setActionReason("");
      fetchData();
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
        <div className="sticky top-0 z-30 px-4 py-3 flex items-center gap-3" style={{ background: "linear-gradient(135deg, #1E3A5F 0%, #2D5A8C 100%)" }}>
          <button onClick={() => navigate("/owner-dashboard")} className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center active:scale-95">
            <ArrowLeft size={18} className="text-white" />
          </button>
          <div className="flex-1">
            <h1 className="text-base font-bold text-white">Global Application ID System</h1>
            <p className="text-[10px] text-white/60">Country-based permanent identity management</p>
          </div>
          <button onClick={fetchData} className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center active:scale-95">
            <RefreshCw size={16} className={`text-white ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>

        {/* Tabs */}
        <div className="px-4 pt-4">
          <div className="flex gap-1.5 overflow-x-auto scrollbar-hide mb-4">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => { setActiveTab(t.id); setData(null); setError(null); }}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition active:scale-95 ${activeTab === t.id ? "text-white" : "bg-white text-gray-500"}`}
                style={activeTab === t.id ? { background: "#2D5A8C" } : {}}
              >
                <t.icon size={14} />
                {t.name}
              </button>
            ))}
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

          {/* Overview Tab */}
          {!loading && activeTab === "overview" && data && (
            <div className="space-y-3 animate-fadeIn">
              <div className="grid grid-cols-2 gap-2.5">
                <StatCard label="Total IDs" value={data.total_ids} color="#2D5A8C" />
                <StatCard label="Active IDs" value={data.active_ids} color="#10B981" />
                <StatCard label="Lucky Available" value={data.lucky_available} color="#F59E0B" />
                <StatCard label="Lucky Sold" value={data.lucky_sold} color="#8B5CF6" />
                <StatCard label="Lucky Reserved" value={data.lucky_reserved} color="#3B82F6" />
                <StatCard label="Total Changes" value={data.total_changes} color="#EC4899" />
              </div>
              {data.by_country && Object.keys(data.by_country).length > 0 && (
                <div className="bg-white rounded-2xl p-4 border border-gray-100" style={{ boxShadow: "0 2px 6px rgba(0,0,0,0.04)" }}>
                  <h4 className="text-xs font-bold text-gray-700 mb-2">Active IDs by Country</h4>
                  <div className="space-y-1.5">
                    {Object.entries(data.by_country).map(([code, count]) => (
                      <div key={code} className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 font-medium">{code}</span>
                        <span className="text-xs font-bold text-gray-700">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* All IDs Tab */}
          {!loading && activeTab === "all_ids" && (
            <div className="animate-fadeIn">
              <div className="bg-white rounded-2xl p-3 border border-gray-100 mb-3 space-y-2" style={{ boxShadow: "0 2px 6px rgba(0,0,0,0.04)" }}>
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by ID or username..."
                    className="w-full pl-9 pr-3 py-2 rounded-lg bg-gray-50 text-xs font-medium border border-gray-100 focus:outline-none"
                    onKeyPress={(e) => e.key === 'Enter' && fetchData()}
                  />
                </div>
                <div className="flex gap-1.5">
                  <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="flex-1 px-2 py-1.5 rounded-lg bg-gray-50 text-[10px] font-bold border border-gray-100">
                    <option value="">All Status</option>
                    <option value="active">Active</option>
                    <option value="locked">Locked</option>
                    <option value="disabled">Disabled</option>
                    <option value="replaced">Replaced</option>
                  </select>
                  <select value={countryFilter} onChange={(e) => setCountryFilter(e.target.value)} className="flex-1 px-2 py-1.5 rounded-lg bg-gray-50 text-[10px] font-bold border border-gray-100">
                    <option value="">All Countries</option>
                    <option value="QAT">Qatar</option>
                    <option value="PAK">Pakistan</option>
                    <option value="UAE">UAE</option>
                    <option value="IND">India</option>
                    <option value="SAU">Saudi</option>
                  </select>
                  <button onClick={fetchData} className="px-3 py-1.5 rounded-lg text-[10px] font-bold text-white" style={{ background: "#2D5A8C" }}>Go</button>
                </div>
              </div>
              {data?.ids?.map((id) => (
                <div key={id.id} className="bg-white rounded-2xl p-3 border border-gray-100 mb-2" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.03)" }}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-mono font-bold text-gray-800">{id.application_id}</p>
                      <p className="text-[10px] text-gray-400">{id.username || 'Unknown'} · {id.country_name}</p>
                    </div>
                    <StatusBadge status={id.status} />
                  </div>
                  {id.is_lucky && <span className="inline-block mt-1 text-[9px] px-2 py-0.5 rounded-full bg-purple-50 text-purple-600 font-bold">LUCKY</span>}
                </div>
              ))}
              {data?.ids?.length === 0 && <p className="text-center text-xs text-gray-400 py-8">No IDs found</p>}
            </div>
          )}

          {/* Lucky IDs Tab */}
          {!loading && activeTab === "lucky" && (
            <div className="animate-fadeIn space-y-3">
              {/* Create Premium ID */}
              <div className="bg-white rounded-2xl p-4 border border-gray-100" style={{ boxShadow: "0 2px 6px rgba(0,0,0,0.04)" }}>
                <h4 className="text-xs font-bold text-gray-700 mb-3">Create Premium / Lucky ID</h4>
                <div className="space-y-2">
                  <select value={createCountry} onChange={(e) => setCreateCountry(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-gray-50 text-xs font-medium border border-gray-100">
                    <option value="QAT">Qatar (974)</option>
                    <option value="PAK">Pakistan (92)</option>
                    <option value="UAE">UAE (971)</option>
                    <option value="IND">India (91)</option>
                    <option value="SAU">Saudi (966)</option>
                    <option value="TUR">Turkey (90)</option>
                    <option value="GBR">UK (44)</option>
                    <option value="USA">USA (1)</option>
                  </select>
                  <input
                    value={createSerial}
                    onChange={(e) => setCreateSerial(e.target.value)}
                    placeholder="Serial number (e.g. 1111111111)"
                    type="number"
                    className="w-full px-3 py-2 rounded-lg bg-gray-50 text-xs font-medium border border-gray-100"
                  />
                  <div className="flex gap-2">
                    <input
                      value={createPrice}
                      onChange={(e) => setCreatePrice(Number(e.target.value))}
                      placeholder="Price (coins)"
                      type="number"
                      className="flex-1 px-3 py-2 rounded-lg bg-gray-50 text-xs font-medium border border-gray-100"
                    />
                    <select value={createCategory} onChange={(e) => setCreateCategory(e.target.value)} className="px-3 py-2 rounded-lg bg-gray-50 text-xs font-medium border border-gray-100">
                      <option value="lucky">Lucky</option>
                      <option value="premium">Premium</option>
                      <option value="vip">VIP</option>
                    </select>
                  </div>
                  <button onClick={handleCreatePremium} disabled={loading} className="w-full py-2 rounded-xl text-white text-xs font-bold" style={{ background: "#2D5A8C" }}>
                    Create ID
                  </button>
                </div>
              </div>

              {/* Lucky IDs List */}
              {data?.lucky_ids?.map((lucky) => (
                <div key={lucky.id} className="bg-white rounded-2xl p-3 border border-gray-100" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.03)" }}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-mono font-bold text-gray-800">{lucky.application_id}</p>
                      <p className="text-[10px] text-gray-400">{lucky.price_coins} coins · {lucky.category}</p>
                    </div>
                    <LuckyStatusBadge status={lucky.status} />
                  </div>
                </div>
              ))}
              {data?.lucky_ids?.length === 0 && <p className="text-center text-xs text-gray-400 py-8">No Lucky IDs created yet</p>}
            </div>
          )}

          {/* History Tab */}
          {!loading && activeTab === "history" && (
            <div className="animate-fadeIn space-y-2">
              {data?.history?.map((h) => (
                <div key={h.id} className="bg-white rounded-2xl p-3 border border-gray-100" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.03)" }}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 font-bold uppercase">{h.change_type}</span>
                    <span className="text-[10px] text-gray-400">{new Date(h.created_date).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-mono text-gray-400 line-through">{h.previous_id}</span>
                    <span className="text-gray-300">→</span>
                    <span className="font-mono font-bold text-gray-800">{h.new_id}</span>
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1">{h.change_reason}</p>
                  <p className="text-[10px] text-gray-300">{h.username} · {h.admin_log}</p>
                </div>
              ))}
              {data?.history?.length === 0 && <p className="text-center text-xs text-gray-400 py-8">No ID changes recorded</p>}
            </div>
          )}

          {/* Actions Tab */}
          {!loading && activeTab === "actions" && (
            <div className="animate-fadeIn space-y-3">
              <div className="bg-white rounded-2xl p-4 border border-gray-100" style={{ boxShadow: "0 2px 6px rgba(0,0,0,0.04)" }}>
                <h4 className="text-xs font-bold text-gray-700 mb-3">ID Management Actions</h4>
                <input
                  value={actionId}
                  onChange={(e) => setActionId(e.target.value)}
                  placeholder="Application ID (e.g. QAT-9740000000001)"
                  className="w-full px-3 py-2 rounded-lg bg-gray-50 text-xs font-mono font-medium border border-gray-100 mb-2"
                />
                <input
                  value={actionReason}
                  onChange={(e) => setActionReason(e.target.value)}
                  placeholder="Reason (required for disable)"
                  className="w-full px-3 py-2 rounded-lg bg-gray-50 text-xs font-medium border border-gray-100 mb-3"
                />
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => handleAction("lockId")} className="py-2.5 rounded-xl text-white text-xs font-bold flex items-center justify-center gap-1.5" style={{ background: "#F59E0B" }}>
                    <Lock size={14} /> Lock ID
                  </button>
                  <button onClick={() => handleAction("disableId")} className="py-2.5 rounded-xl text-white text-xs font-bold flex items-center justify-center gap-1.5" style={{ background: "#EF4444" }}>
                    <Power size={14} /> Disable ID
                  </button>
                </div>
              </div>
              <div className="bg-blue-50 rounded-2xl p-3 border border-blue-100">
                <p className="text-[11px] text-blue-600 leading-relaxed">
                  <strong>Lock:</strong> Temporarily restricts an ID. User cannot use locked ID features.<br/>
                  <strong>Disable:</strong> Permanently disables a fraudulent ID. Requires reason.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, color }) {
  return (
    <div className="bg-white rounded-2xl p-3 border border-gray-100" style={{ boxShadow: "0 2px 6px rgba(0,0,0,0.04)" }}>
      <p className="text-[10px] text-gray-400 font-medium mb-0.5">{label}</p>
      <p className="text-xl font-bold" style={{ color }}>{value}</p>
    </div>
  );
}

function StatusBadge({ status }) {
  const colors = { active: "bg-green-50 text-green-600", locked: "bg-yellow-50 text-yellow-600", disabled: "bg-red-50 text-red-600", replaced: "bg-gray-100 text-gray-500", reserved: "bg-blue-50 text-blue-600" };
  return <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase ${colors[status] || "bg-gray-100 text-gray-500"}`}>{status}</span>;
}

function LuckyStatusBadge({ status }) {
  const colors = { available: "bg-green-50 text-green-600", reserved: "bg-blue-50 text-blue-600", sold: "bg-purple-50 text-purple-600", disabled: "bg-red-50 text-red-600" };
  return <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase ${colors[status] || "bg-gray-100 text-gray-500"}`}>{status}</span>;
}