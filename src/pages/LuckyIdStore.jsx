import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Fingerprint, Coins, CheckCircle, Loader2, Sparkles, History, AlertCircle } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { COUNTRY_LIST } from "@/components/application-id/countryConfig";

export default function LuckyIdStore() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);
  const [luckyIds, setLuckyIds] = useState([]);
  const [profile, setProfile] = useState(null);
  const [history, setHistory] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const [idRes, luckyRes] = await Promise.all([
          base44.functions.invoke("applicationIdSystem", { action: "getMyId" }),
          base44.functions.invoke("applicationIdSystem", { action: "listLuckyIds" }),
        ]);
        setProfile(idRes.data.profile);
        setLuckyIds(luckyRes.data.lucky_ids || []);
      } catch (e) {
        setError(e.response?.data?.error || e.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handlePurchase = async (luckyId) => {
    if (!confirm(`Purchase ${luckyId.application_id} for ${luckyId.price_coins} coins? Your current ID will be replaced but all data is preserved.`)) return;
    setPurchasing(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await base44.functions.invoke("applicationIdSystem", {
        action: "purchaseLuckyId",
        lucky_id_id: luckyId.id,
      });
      setSuccess({
        newId: res.data.new_application_id,
        previousId: res.data.previous_id,
        coinsRemaining: res.data.coins_remaining,
      });
      // Reload data
      const [idRes, luckyRes] = await Promise.all([
        base44.functions.invoke("applicationIdSystem", { action: "getMyId" }),
        base44.functions.invoke("applicationIdSystem", { action: "listLuckyIds" }),
      ]);
      setProfile(idRes.data.profile);
      setLuckyIds(luckyRes.data.lucky_ids || []);
    } catch (e) {
      setError(e.response?.data?.error || e.message);
    } finally {
      setPurchasing(false);
    }
  };

  const loadHistory = async () => {
    try {
      const res = await base44.functions.invoke("applicationIdSystem", { action: "getMyHistory" });
      setHistory(res.data.history || []);
      setShowHistory(true);
    } catch (e) {
      setError(e.response?.data?.error || e.message);
    }
  };

  const filteredIds = selectedCountry
    ? luckyIds.filter(l => l.country_code === selectedCountry)
    : luckyIds;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F9FC] flex items-center justify-center">
        <Loader2 size={28} className="animate-spin text-gray-300" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FC]">
      <div className="max-w-md mx-auto pb-8">
        {/* Header */}
        <div className="sticky top-0 z-30 px-4 py-3 flex items-center gap-3" style={{ background: "linear-gradient(135deg, #6F35E0 0%, #C135E0 100%)" }}>
          <button onClick={() => navigate("/more-services")} className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center active:scale-95">
            <ArrowLeft size={18} className="text-white" />
          </button>
          <div className="flex-1">
            <h1 className="text-base font-bold text-white flex items-center gap-1.5">
              <Sparkles size={16} /> Lucky ID Store
            </h1>
            <p className="text-[10px] text-white/70">Premium Application IDs</p>
          </div>
          <button onClick={loadHistory} className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center active:scale-95">
            <History size={16} className="text-white" />
          </button>
        </div>

        {/* Current ID Card */}
        <div className="px-4 pt-4">
          <div className="bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl p-4 text-white" style={{ boxShadow: "0 4px 12px rgba(111,53,224,0.25)" }}>
            <div className="flex items-center gap-2 mb-2">
              <Fingerprint size={16} />
              <p className="text-[10px] font-semibold uppercase tracking-wider opacity-80">Your Application ID</p>
            </div>
            <p className="text-xl font-mono font-extrabold mb-3">{profile?.global_id || "Not assigned"}</p>
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1">
                <Coins size={12} />
                <span className="font-bold">{profile?.coins || 0}</span>
                <span className="opacity-70">coins</span>
              </div>
              <span className="opacity-50">·</span>
              <span className="opacity-80">{profile?.username}</span>
            </div>
          </div>
        </div>

        {/* Success Banner */}
        {success && (
          <div className="px-4 mt-3">
            <div className="bg-green-50 border border-green-200 rounded-2xl p-4 animate-fadeIn">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle size={18} className="text-green-500" />
                <p className="text-sm font-bold text-green-700">ID Changed Successfully!</p>
              </div>
              <div className="space-y-1 text-xs">
                <p className="text-gray-500">Previous: <span className="font-mono line-through">{success.previousId}</span></p>
                <p className="text-gray-700">New: <span className="font-mono font-bold">{success.newId}</span></p>
                <p className="text-gray-500">Coins remaining: {success.coinsRemaining}</p>
              </div>
              <p className="text-[10px] text-green-600 mt-2">All your data, wallet, VIP, and rankings are preserved.</p>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="px-4 mt-3">
            <div className="bg-red-50 border border-red-200 rounded-2xl p-3 flex items-start gap-2">
              <AlertCircle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-red-600 font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Country Filter */}
        <div className="px-4 mt-4">
          <div className="flex gap-1.5 overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setSelectedCountry("")}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold whitespace-nowrap ${!selectedCountry ? "text-white" : "bg-white text-gray-500"}`}
              style={!selectedCountry ? { background: "#6F35E0" } : {}}
            >
              All Countries
            </button>
            {COUNTRY_LIST.map((c) => (
              <button
                key={c.code}
                onClick={() => setSelectedCountry(c.code)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold whitespace-nowrap ${selectedCountry === c.code ? "text-white" : "bg-white text-gray-500"}`}
                style={selectedCountry === c.code ? { background: "#6F35E0" } : {}}
              >
                {c.flag} {c.code}
              </button>
            ))}
          </div>
        </div>

        {/* Lucky IDs Grid */}
        <div className="px-4 mt-4">
          {filteredIds.length === 0 ? (
            <div className="text-center py-12">
              <Sparkles size={32} className="mx-auto text-gray-200 mb-2" />
              <p className="text-sm text-gray-400 font-medium">No Lucky IDs available</p>
              <p className="text-xs text-gray-300">Check back later for new premium IDs</p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {filteredIds.map((lucky) => (
                <div key={lucky.id} className="bg-white rounded-2xl p-3 border border-gray-100 flex items-center justify-between" style={{ boxShadow: "0 2px 6px rgba(0,0,0,0.04)" }}>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-sm font-mono font-bold text-gray-800">{lucky.application_id}</p>
                      <span className="text-[8px] px-1.5 py-0.5 rounded-full font-bold uppercase" style={{ background: lucky.category === 'vip' ? '#FCE4EC' : lucky.category === 'premium' ? '#FFF3E0' : '#F3E5F5', color: lucky.category === 'vip' ? '#E91E63' : lucky.category === 'premium' ? '#FF9800' : '#8B5CF6' }}>
                        {lucky.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Coins size={11} className="text-amber-400" />
                      <span className="text-xs font-bold text-amber-500">{lucky.price_coins}</span>
                      <span className="text-[10px] text-gray-400">coins</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handlePurchase(lucky)}
                    disabled={purchasing}
                    className="px-4 py-2 rounded-xl text-white text-xs font-bold active:scale-95 transition disabled:opacity-50"
                    style={{ background: "linear-gradient(135deg, #6F35E0, #C135E0)" }}
                  >
                    {purchasing ? <Loader2 size={14} className="animate-spin" /> : "Purchase"}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* History Modal */}
        {showHistory && (
          <div className="fixed inset-0 z-50 flex items-end justify-center" onClick={() => setShowHistory(false)}>
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative w-full max-w-md bg-white rounded-t-3xl max-h-[80vh] overflow-y-auto animate-fadeIn" onClick={e => e.stopPropagation()}>
              <div className="sticky top-0 bg-white px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-800">ID Change History</h3>
                <button onClick={() => setShowHistory(false)} className="text-gray-400 text-xs">Close</button>
              </div>
              <div className="p-4 space-y-2">
                {history.length === 0 ? (
                  <p className="text-center text-xs text-gray-400 py-8">No ID changes yet</p>
                ) : (
                  history.map((h) => (
                    <div key={h.id} className="bg-gray-50 rounded-xl p-3">
                      <div className="flex items-center gap-2 text-xs mb-1">
                        <span className="font-mono text-gray-400 line-through">{h.previous_id}</span>
                        <span className="text-gray-300">→</span>
                        <span className="font-mono font-bold text-gray-800">{h.new_id}</span>
                      </div>
                      <p className="text-[10px] text-gray-500">{h.change_reason}</p>
                      <p className="text-[10px] text-gray-300">{new Date(h.created_date).toLocaleString()}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}