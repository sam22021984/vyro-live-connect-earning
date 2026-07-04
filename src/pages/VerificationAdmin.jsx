import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft, Search, ScanFace, ShieldCheck, ShieldAlert, MapPin,
  Smartphone, Globe, Clock, Wifi, Monitor, AlertTriangle, CheckCircle2,
  XCircle, Eye, Fingerprint, LogIn, Activity, Calendar, User,
} from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";

const WHITE = "#FFFFFF";
const SOFT_BG = "#F7F9FC";
const PANEL = "#EEF2F7";
const DARK = "#0F1B3D";
const GRAY = "#6B7280";
const PURPLE = "#6F35E0";
const RED = "#EF4444";
const GREEN = "#10B981";
const YELLOW = "#F59E0B";

function Card({ children, className = "" }) {
  return (
    <div className={`rounded-2xl p-3 ${className}`} style={{ background: WHITE, border: "1px solid #E5E7EB", boxShadow: "0 4px 12px rgba(0,0,0,0.04)" }}>
      {children}
    </div>
  );
}

function StatusBadge({ status }) {
  const config = {
    verified: { bg: `${GREEN}15`, color: GREEN, icon: CheckCircle2, label: "Verified" },
    pending: { bg: `${YELLOW}15`, color: YELLOW, icon: Clock, label: "Pending" },
    unverified: { bg: `${GRAY}15`, color: GRAY, icon: XCircle, label: "Unverified" },
    failed: { bg: `${RED}15`, color: RED, icon: AlertTriangle, label: "Failed" },
    review_required: { bg: `${RED}15`, color: RED, icon: ShieldAlert, label: "Review Required" },
  };
  const c = config[status] || config.unverified;
  const Icon = c.icon;
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ background: c.bg, color: c.color }}>
      <Icon size={10} /> {c.label}
    </span>
  );
}

function InfoRow({ icon: Icon, label, value, color = DARK }) {
  return (
    <div className="flex items-center gap-2.5 py-2 border-b border-gray-50 last:border-0">
      <Icon size={14} style={{ color: GRAY }} className="flex-shrink-0" />
      <span className="text-[10px] text-gray-400 w-28 flex-shrink-0">{label}</span>
      <span className="text-xs font-medium flex-1" style={{ color }}>{value || "—"}</span>
    </div>
  );
}

function UserDetailPanel({ details }) {
  if (!details) return null;
  const u = details.user_details;
  const d = details.device_info;

  return (
    <div className="space-y-3 mt-4">
      {/* User Profile Header */}
      <Card>
        <div className="flex items-center gap-3">
          {u?.avatar_url ? (
            <img src={u.avatar_url} className="w-14 h-14 rounded-full object-cover border-2 border-purple-200" alt={u.username} />
          ) : (
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center">
              <User size={24} className="text-white" />
            </div>
          )}
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold" style={{ color: DARK }}>{u?.username || "Unknown"}</h3>
              <StatusBadge status={u?.verification_status} />
            </div>
            {u?.global_id && <p className="text-[10px] font-mono" style={{ color: GRAY }}>ID: {u.global_id}</p>}
            {u?.full_name && <p className="text-[10px]" style={{ color: GRAY }}>{u.full_name}</p>}
          </div>
          <div className="text-right">
            <p className="text-[9px]" style={{ color: GRAY }}>Risk Score</p>
            <p className="text-lg font-bold" style={{ color: details.security_risk_score >= 50 ? RED : details.security_risk_score >= 25 ? YELLOW : GREEN }}>
              {details.security_risk_score || 0}
            </p>
          </div>
        </div>
      </Card>

      {/* Verification Status */}
      <Card>
        <h4 className="text-[10px] font-bold mb-2" style={{ color: GRAY }}>VERIFICATION STATUS</h4>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2 p-2 rounded-lg" style={{ background: u?.is_verified ? `${GREEN}08` : `${RED}08` }}>
            {u?.is_verified ? <CheckCircle2 size={14} style={{ color: GREEN }} /> : <XCircle size={14} style={{ color: RED }} />}
            <span className="text-[10px] font-medium" style={{ color: DARK }}>Face Verification</span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-lg" style={{ background: u?.phone_verified ? `${GREEN}08` : `${RED}08` }}>
            {u?.phone_verified ? <CheckCircle2 size={14} style={{ color: GREEN }} /> : <XCircle size={14} style={{ color: RED }} />}
            <span className="text-[10px] font-medium" style={{ color: DARK }}>Phone OTP</span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-lg" style={{ background: u?.email_verified ? `${GREEN}08` : `${RED}08` }}>
            {u?.email_verified ? <CheckCircle2 size={14} style={{ color: GREEN }} /> : <XCircle size={14} style={{ color: RED }} />}
            <span className="text-[10px] font-medium" style={{ color: DARK }}>Email OTP</span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-lg" style={{ background: `${PURPLE}08` }}>
            <Fingerprint size={14} style={{ color: PURPLE }} />
            <span className="text-[10px] font-medium" style={{ color: DARK }}>Device Verified</span>
          </div>
        </div>
      </Card>

      {/* Location & Device Info */}
      <Card>
        <h4 className="text-[10px] font-bold mb-1" style={{ color: GRAY }}>LOCATION & DEVICE</h4>
        <InfoRow icon={MapPin} label="Country" value={u?.country} />
        <InfoRow icon={MapPin} label="City" value={d?.city} color={RED} />
        <InfoRow icon={Globe} label="IP Address" value={d?.ip_address} color={RED} />
        <InfoRow icon={Monitor} label="Device" value={d?.device_name} />
        <InfoRow icon={Fingerprint} label="Device ID" value={d?.device_id} color={GRAY} />
        <InfoRow icon={Smartphone} label="Platform" value={`${d?.platform || ""} ${d?.os || ""} ${d?.os_version || ""}`} />
        <InfoRow icon={Globe} label="Browser" value={`${d?.browser || ""} ${d?.browser_version || ""}`} />
        <InfoRow icon={Monitor} label="Screen" value={d?.screen_resolution} />
        <InfoRow icon={Clock} label="Timezone" value={d?.timezone} />
      </Card>

      {/* Security Detection */}
      <Card>
        <h4 className="text-[10px] font-bold mb-1" style={{ color: GRAY }}>SECURITY DETECTION</h4>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2 p-2 rounded-lg" style={{ background: d?.is_vpn ? `${RED}08` : `${GREEN}08` }}>
            <Wifi size={14} style={{ color: d?.is_vpn ? RED : GREEN }} />
            <div>
              <p className="text-[9px]" style={{ color: GRAY }}>VPN</p>
              <p className="text-[10px] font-bold" style={{ color: d?.is_vpn ? RED : GREEN }}>{d?.is_vpn ? "Detected" : "None"}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-lg" style={{ background: d?.is_proxy ? `${RED}08` : `${GREEN}08` }}>
            <Globe size={14} style={{ color: d?.is_proxy ? RED : GREEN }} />
            <div>
              <p className="text-[9px]" style={{ color: GRAY }}>Proxy</p>
              <p className="text-[10px] font-bold" style={{ color: d?.is_proxy ? RED : GREEN }}>{d?.is_proxy ? "Detected" : "None"}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-lg" style={{ background: d?.is_emulator ? `${RED}08` : `${GREEN}08` }}>
            <Monitor size={14} style={{ color: d?.is_emulator ? RED : GREEN }} />
            <div>
              <p className="text-[9px]" style={{ color: GRAY }}>Emulator</p>
              <p className="text-[10px] font-bold" style={{ color: d?.is_emulator ? RED : GREEN }}>{d?.is_emulator ? "Detected" : "None"}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-lg" style={{ background: d?.is_rooted ? `${RED}08` : `${GREEN}08` }}>
            <AlertTriangle size={14} style={{ color: d?.is_rooted ? RED : GREEN }} />
            <div>
              <p className="text-[9px]" style={{ color: GRAY }}>Rooted</p>
              <p className="text-[10px] font-bold" style={{ color: d?.is_rooted ? RED : GREEN }}>{d?.is_rooted ? "Detected" : "None"}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Login History */}
      <Card>
        <h4 className="text-[10px] font-bold mb-1" style={{ color: GRAY }}>LOGIN HISTORY</h4>
        <InfoRow icon={LogIn} label="Last Login" value={details.last_login?.time ? new Date(details.last_login.time).toLocaleString() : "—"} />
        <InfoRow icon={Clock} label="Last Active" value={details.last_active ? new Date(details.last_active).toLocaleString() : "—"} />
        <InfoRow icon={Calendar} label="Account Created" value={details.account_created ? new Date(details.account_created).toLocaleString() : "—"} />
        {details.login_history?.length > 0 && (
          <div className="mt-2 space-y-1">
            <p className="text-[9px] font-bold" style={{ color: GRAY }}>RECENT LOGINS</p>
            {details.login_history.slice(0, 5).map((login, i) => (
              <div key={i} className="flex items-center gap-2 p-1.5 rounded-lg" style={{ background: SOFT_BG }}>
                <LogIn size={10} style={{ color: GRAY }} />
                <span className="text-[9px]" style={{ color: DARK }}>{login.ip_address || "—"}</span>
                <span className="text-[9px]" style={{ color: GRAY }}>{login.country || ""} {login.city || ""}</span>
                <span className="text-[9px] ml-auto" style={{ color: GRAY }}>{login.created_date ? new Date(login.created_date).toLocaleDateString() : ""}</span>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Verification Records */}
      {details.verification_records?.length > 0 && (
        <Card>
          <h4 className="text-[10px] font-bold mb-1" style={{ color: GRAY }}>FACE VERIFICATION RECORDS</h4>
          {details.verification_records.map((v, i) => (
            <div key={i} className="flex items-center gap-2 py-2 border-b border-gray-50 last:border-0">
              <ScanFace size={14} style={{ color: v.status === "verified" ? GREEN : v.status === "failed" ? RED : YELLOW }} />
              <div className="flex-1">
                <p className="text-[10px] font-bold" style={{ color: DARK }}>Attempt #{v.attempt_count}</p>
                <p className="text-[9px]" style={{ color: GRAY }}>
                  {v.status === "verified" ? "Verified" : v.failure_reason || v.status}
                </p>
              </div>
              <div className="text-right">
                <StatusBadge status={v.status} />
                <p className="text-[8px] mt-0.5" style={{ color: GRAY }}>
                  {v.created_date ? new Date(v.created_date).toLocaleDateString() : ""}
                </p>
              </div>
            </div>
          ))}
        </Card>
      )}

      {/* Security Events */}
      {details.security_events?.length > 0 && (
        <Card>
          <h4 className="text-[10px] font-bold mb-1" style={{ color: GRAY }}>SECURITY EVENTS</h4>
          {details.security_events.slice(0, 10).map((e, i) => (
            <div key={i} className="flex items-center gap-2 py-1.5 border-b border-gray-50 last:border-0">
              <Activity size={12} style={{ color: e.severity === "critical" ? RED : e.severity === "high" ? RED : e.severity === "medium" ? YELLOW : GREEN }} />
              <span className="text-[10px] flex-1" style={{ color: DARK }}>{e.description}</span>
              <span className="text-[8px]" style={{ color: GRAY }}>{e.created_date ? new Date(e.created_date).toLocaleDateString() : ""}</span>
            </div>
          ))}
        </Card>
      )}
    </div>
  );
}

export default function VerificationAdmin() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [pending, setPending] = useState(null);
  const [searchId, setSearchId] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

  useEffect(() => {
    loadPending();
  }, []);

  const loadPending = async () => {
    setLoading(true);
    try {
      const res = await base44.functions.invoke("faceVerification", { action: "getPendingVerifications" });
      const data = res.data || res;
      setPending(data);
    } catch (err) {
      toast({ title: "Failed to load pending verifications", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchId.trim()) return;
    setDetailLoading(true);
    try {
      const res = await base44.functions.invoke("faceVerification", {
        action: "getVerificationDetails",
        target_user_id: searchId.trim(),
      });
      const data = res.data || res;
      if (data.error) {
        toast({ title: data.error, variant: "destructive" });
        setUserDetails(null);
      } else {
        setUserDetails(data);
      }
    } catch (err) {
      toast({ title: "Failed to load user details", description: err.message, variant: "destructive" });
    } finally {
      setDetailLoading(false);
    }
  };

  const handleViewUser = async (userId) => {
    setSearchId(userId);
    setDetailLoading(true);
    try {
      const res = await base44.functions.invoke("faceVerification", {
        action: "getVerificationDetails",
        target_user_id: userId,
      });
      const data = res.data || res;
      if (!data.error) setUserDetails(data);
    } catch (err) {
      toast({ title: "Failed to load", description: err.message, variant: "destructive" });
    } finally {
      setDetailLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center active:scale-95">
          <ArrowLeft size={18} className="text-gray-600" />
        </button>
        <div className="flex-1">
          <h1 className="text-base font-bold text-gray-800 flex items-center gap-2">
            <ScanFace size={18} className="text-purple-500" /> Verification Admin
          </h1>
          <p className="text-[10px] text-gray-400">Face verification & user security details</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4">
        {/* Search */}
        <Card className="mb-4">
          <div className="flex items-center gap-2">
            <Search size={16} className="text-gray-400" />
            <input
              type="text"
              placeholder="Enter User ID or email..."
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleSearch(); }}
              className="flex-1 text-sm outline-none bg-transparent"
            />
            <button
              onClick={handleSearch}
              disabled={detailLoading || !searchId.trim()}
              className="px-3 py-1.5 rounded-lg bg-purple-500 text-white text-xs font-bold disabled:opacity-50"
            >
              {detailLoading ? "..." : "Search"}
            </button>
          </div>
        </Card>

        {/* Pending verifications */}
        {!userDetails && (
          <>
            <div className="grid grid-cols-3 gap-2 mb-4">
              <Card className="text-center">
                <p className="text-xl font-bold" style={{ color: RED }}>{pending?.counts?.failed || 0}</p>
                <p className="text-[9px]" style={{ color: GRAY }}>Failed</p>
              </Card>
              <Card className="text-center">
                <p className="text-xl font-bold" style={{ color: YELLOW }}>{pending?.counts?.in_progress || 0}</p>
                <p className="text-[9px]" style={{ color: GRAY }}>In Progress</p>
              </Card>
              <Card className="text-center">
                <p className="text-xl font-bold" style={{ color: RED }}>{pending?.counts?.review_required || 0}</p>
                <p className="text-[9px]" style={{ color: GRAY }}>Review Required</p>
              </Card>
            </div>

            {/* Review Required */}
            {pending?.pending_verifications?.review_required?.length > 0 && (
              <Card className="mb-4">
                <h3 className="text-xs font-bold mb-2 flex items-center gap-1.5" style={{ color: RED }}>
                  <ShieldAlert size={14} /> Review Required ({pending.pending_verifications.review_required.length})
                </h3>
                {pending.pending_verifications.review_required.map((u) => (
                  <button
                    key={u.user_id}
                    onClick={() => handleViewUser(u.user_id)}
                    className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition"
                  >
                    {u.avatar_url ? (
                      <img src={u.avatar_url} className="w-8 h-8 rounded-full object-cover" alt="" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                        <User size={14} className="text-red-500" />
                      </div>
                    )}
                    <div className="flex-1 text-left">
                      <p className="text-xs font-bold" style={{ color: DARK }}>{u.username}</p>
                      <p className="text-[9px]" style={{ color: GRAY }}>{u.country} • Trust: {u.trust_score}</p>
                    </div>
                    <Eye size={14} className="text-gray-400" />
                  </button>
                ))}
              </Card>
            )}

            {/* Failed verifications */}
            {pending?.pending_verifications?.failed?.length > 0 && (
              <Card className="mb-4">
                <h3 className="text-xs font-bold mb-2 flex items-center gap-1.5" style={{ color: RED }}>
                  <XCircle size={14} /> Failed Attempts ({pending.pending_verifications.failed.length})
                </h3>
                {pending.pending_verifications.failed.map((v) => (
                  <button
                    key={v.verification_id}
                    onClick={() => handleViewUser(v.user_id)}
                    className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition"
                  >
                    {v.avatar_url ? (
                      <img src={v.avatar_url} className="w-8 h-8 rounded-full object-cover" alt="" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                        <User size={14} className="text-orange-500" />
                      </div>
                    )}
                    <div className="flex-1 text-left">
                      <p className="text-xs font-bold" style={{ color: DARK }}>{v.username || v.user_id}</p>
                      <p className="text-[9px]" style={{ color: GRAY }}>Attempt #{v.attempt_count} • Risk: {v.risk_score}</p>
                    </div>
                    <Eye size={14} className="text-gray-400" />
                  </button>
                ))}
              </Card>
            )}

            {loading && (
              <div className="flex items-center justify-center py-12">
                <div className="w-8 h-8 border-3 border-purple-200 border-t-purple-500 rounded-full animate-spin" />
              </div>
            )}

            {!loading && pending && pending.counts.failed === 0 && pending.counts.in_progress === 0 && pending.counts.review_required === 0 && (
              <Card className="text-center py-8">
                <CheckCircle2 size={36} className="mx-auto mb-2" style={{ color: GREEN }} />
                <p className="text-sm font-bold" style={{ color: DARK }}>All Clear</p>
                <p className="text-xs" style={{ color: GRAY }}>No pending verification issues</p>
              </Card>
            )}
          </>
        )}

        {/* User details */}
        {userDetails && (
          <>
            <button
              onClick={() => { setUserDetails(null); setSearchId(""); }}
              className="mb-3 text-xs font-semibold text-purple-500 flex items-center gap-1"
            >
              <ArrowLeft size={14} /> Back to list
            </button>
            {detailLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="w-8 h-8 border-3 border-purple-200 border-t-purple-500 rounded-full animate-spin" />
              </div>
            ) : (
              <UserDetailPanel details={userDetails} />
            )}
          </>
        )}
      </div>
    </div>
  );
}