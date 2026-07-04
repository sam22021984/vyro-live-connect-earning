import React, { useState, useEffect, useCallback } from "react";
import { base44 } from "@/api/base44Client";
import {
  Search, Smartphone, Globe, MapPin, Shield, ShieldCheck, ShieldAlert,
  Camera, Eye, AlertTriangle, Fingerprint, Wifi, Monitor, Clock,
  ChevronLeft, Radio, Gift, DollarSign, Ban, MessageSquare, Activity,
  CheckCircle, XCircle, User,
} from "lucide-react";

const WHITE = "#FFFFFF";
const SOFT_BG = "#F7F9FC";
const PANEL = "#EEF2F7";
const DARK = "#0F1B3D";
const GRAY = "#6B7280";
const RED = "#EB5757";
const GREEN = "#27AE60";
const BLUE = "#2F80ED";
const ORANGE = "#F2994A";
const PURPLE = "#A78BFA";

function Card({ children, className = "" }) {
  return (
    <div className={`rounded-2xl p-3 ${className}`} style={{ background: WHITE, border: "1px solid #E5E7EB", boxShadow: "0 4px 12px rgba(0,0,0,0.04)" }}>
      {children}
    </div>
  );
}

function Badge({ label, color }) {
  return (
    <span className="text-[8px] px-1.5 py-0.5 rounded-full font-bold whitespace-nowrap" style={{ background: `${color}15`, color }}>
      {label}
    </span>
  );
}

function InfoRow({ icon: Icon, label, value, color = DARK }) {
  return (
    <div className="flex items-center gap-2 py-1.5 border-b last:border-0" style={{ borderColor: "#F0F0F0" }}>
      {Icon && <Icon size={12} style={{ color: GRAY, flexShrink: 0 }} />}
      <span className="text-[9px]" style={{ color: GRAY, minWidth: "70px" }}>{label}</span>
      <span className="text-[10px] font-bold flex-1 text-right truncate" style={{ color }}>{value || "—"}</span>
    </div>
  );
}

function severityColor(sev) {
  const s = (sev || "").toLowerCase();
  if (s === "critical" || s === "high") return RED;
  if (s === "medium") return ORANGE;
  if (s === "low") return BLUE;
  return GREEN;
}

export default function UserDataSection() {
  const [view, setView] = useState("list"); // list | detail
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [detection, setDetection] = useState(null);
  const [loadingDetection, setLoadingDetection] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const loadUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await base44.functions.invoke("userData", { action: "listUsers", search, limit: 100 });
      setUsers(res.data?.users || []);
    } catch (e) {
      console.error("Failed to load users:", e);
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    const t = setTimeout(() => loadUsers(), 300);
    return () => clearTimeout(t);
  }, [loadUsers]);

  const loadDetection = async (userId) => {
    setLoadingDetection(true);
    setDetection(null);
    try {
      const res = await base44.functions.invoke("userData", { action: "getDetection", target_user_id: userId });
      setDetection(res.data);
    } catch (e) {
      console.error("Failed to load detection:", e);
    } finally {
      setLoadingDetection(false);
    }
  };

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setView("detail");
    setActiveTab("overview");
    loadDetection(user.id);
  };

  const handleBack = () => {
    setView("list");
    setSelectedUser(null);
    setDetection(null);
  };

  // ===== LIST VIEW =====
  if (view === "list") {
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2 mb-1 px-1">
          <Smartphone size={16} style={{ color: BLUE }} />
          <h3 className="text-base font-bold" style={{ color: DARK }}>User Data & Detection</h3>
        </div>
        <p className="text-[11px] px-1" style={{ color: GRAY }}>
          Complete CISF-level detection for every signed-up user — IP, device, location, live streams, verification pictures, and security history.
        </p>

        {/* Search */}
        <div className="flex items-center gap-2 rounded-xl px-3 py-2.5" style={{ background: WHITE, border: "1px solid #E5E7EB" }}>
          <Search size={16} style={{ color: GRAY }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by username, ID, email, country..."
            className="flex-1 bg-transparent text-[11px] outline-none"
            style={{ color: DARK }}
          />
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-6 h-6 border-3 border-blue-200 border-t-blue-500 rounded-full animate-spin" />
          </div>
        ) : users.length === 0 ? (
          <Card className="text-center py-8">
            <User size={32} className="mx-auto mb-2" style={{ color: GRAY }} />
            <p className="text-[11px]" style={{ color: GRAY }}>No users found</p>
          </Card>
        ) : (
          <>
            <p className="text-[10px] px-1" style={{ color: GRAY }}>{users.length} users found</p>
            {users.map((u) => (
              <button key={u.id} onClick={() => handleSelectUser(u)} className="w-full text-left active:scale-[0.98] transition">
                <Card>
                  <div className="flex items-center gap-3">
                    <div className="relative flex-shrink-0">
                      {u.avatar_url ? (
                        <img src={u.avatar_url} className="w-10 h-10 rounded-full object-cover" alt={u.username} />
                      ) : (
                        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: `${BLUE}15` }}>
                          <User size={16} style={{ color: BLUE }} />
                        </div>
                      )}
                      {u.is_online && (
                        <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white" style={{ background: GREEN }} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-xs font-bold truncate" style={{ color: DARK }}>{u.username || u.full_name || "Unknown"}</h4>
                        {u.is_verified && <ShieldCheck size={11} style={{ color: GREEN, flexShrink: 0 }} />}
                      </div>
                      <p className="text-[9px] truncate" style={{ color: GRAY }}>
                        {u.global_id || u.user_id || "—"} · {u.country || "—"}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <Badge label={(u.role || "user").toUpperCase()} color={u.role === "owner" ? "#D4AF37" : u.role === "admin" ? ORANGE : BLUE} />
                      <span className="text-[8px]" style={{ color: GRAY }}>{u.verification_status}</span>
                    </div>
                  </div>
                </Card>
              </button>
            ))}
          </>
        )}
      </div>
    );
  }

  // ===== DETAIL VIEW =====
  const p = detection?.profile || selectedUser;
  const devices = detection?.devices || [];
  const securityEvents = detection?.security_events || [];
  const verifications = detection?.verifications || [];
  const fraudRecords = detection?.fraud_records || [];
  const spamRecords = detection?.spam_records || [];
  const enforcement = detection?.enforcement || [];
  const transactions = detection?.transactions || [];
  const roomSessions = detection?.room_sessions || [];

  const latestDevice = devices[0];
  const latestVerification = verifications.find((v) => v.verification_type === "face") || verifications[0];

  const TABS = [
    { id: "overview", label: "Overview", icon: Activity },
    { id: "device", label: "Devices", icon: Smartphone, count: devices.length },
    { id: "security", label: "Security", icon: Shield, count: securityEvents.length },
    { id: "verification", label: "Verification", icon: Camera, count: verifications.length },
    { id: "fraud", label: "Fraud", icon: AlertTriangle, count: fraudRecords.length },
    { id: "spam", label: "Spam", icon: MessageSquare, count: spamRecords.length },
    { id: "enforcement", label: "Enforcement", icon: Ban, count: enforcement.length },
    { id: "live", label: "Live Streams", icon: Radio, count: roomSessions.length },
    { id: "transactions", label: "Transactions", icon: DollarSign, count: transactions.length },
  ];

  return (
    <div className="space-y-3">
      {/* Back button */}
      <button onClick={handleBack} className="flex items-center gap-1.5 text-[11px] font-bold active:scale-95 transition" style={{ color: BLUE }}>
        <ChevronLeft size={16} /> Back to Users
      </button>

      {/* User Header Card */}
      <Card>
        <div className="flex items-center gap-3 mb-3">
          <div className="relative flex-shrink-0">
            {p?.avatar_url ? (
              <img src={p.avatar_url} className="w-14 h-14 rounded-full object-cover" alt={p.username} />
            ) : (
              <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: `${BLUE}15` }}>
                <User size={24} style={{ color: BLUE }} />
              </div>
            )}
            {p?.is_online && (
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white" style={{ background: GREEN }} />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h3 className="text-sm font-bold truncate" style={{ color: DARK }}>{p?.username || p?.full_name || "Unknown"}</h3>
              {p?.is_verified && <ShieldCheck size={13} style={{ color: GREEN }} />}
              {p?.is_vip && <Badge label="VIP" color="#D4AF37" />}
            </div>
            <p className="text-[10px]" style={{ color: GRAY }}>{p?.global_id || "—"}</p>
            <div className="flex items-center gap-1.5 mt-1 flex-wrap">
              <Badge label={(p?.role || "user").toUpperCase()} color={p?.role === "owner" ? "#D4AF37" : p?.role === "admin" ? ORANGE : BLUE} />
              <Badge label={(p?.verification_status || "unverified").toUpperCase()} color={p?.verification_status === "verified" ? GREEN : ORANGE} />
              <Badge label={`SAFETY: ${(p?.safety_status || "medium").toUpperCase()}`} color={p?.safety_status === "high" ? GREEN : p?.safety_status === "low" ? RED : ORANGE} />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2">
          <div className="text-center rounded-lg p-1.5" style={{ background: SOFT_BG }}>
            <p className="text-[8px]" style={{ color: GRAY }}>Coins</p>
            <p className="text-xs font-bold" style={{ color: DARK }}>{p?.coins ?? 0}</p>
          </div>
          <div className="text-center rounded-lg p-1.5" style={{ background: SOFT_BG }}>
            <p className="text-[8px]" style={{ color: GRAY }}>Followers</p>
            <p className="text-xs font-bold" style={{ color: DARK }}>{p?.followers ?? 0}</p>
          </div>
          <div className="text-center rounded-lg p-1.5" style={{ background: SOFT_BG }}>
            <p className="text-[8px]" style={{ color: GRAY }}>Trust</p>
            <p className="text-xs font-bold" style={{ color: p?.trust_score >= 70 ? GREEN : p?.trust_score >= 40 ? ORANGE : RED }}>{p?.trust_score ?? 0}</p>
          </div>
          <div className="text-center rounded-lg p-1.5" style={{ background: SOFT_BG }}>
            <p className="text-[8px]" style={{ color: GRAY }}>Level</p>
            <p className="text-xs font-bold" style={{ color: DARK }}>{p?.user_level ?? 1}</p>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <div className="flex gap-1.5 overflow-x-auto scrollbar-hide">
        {TABS.map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[9px] font-bold whitespace-nowrap transition active:scale-95"
              style={activeTab === t.id ? { background: BLUE, color: "#fff" } : { background: SOFT_BG, color: GRAY }}
            >
              <Icon size={11} /> {t.label}
              {t.count != null && t.count > 0 && (
                <span className="text-[7px] px-1 rounded-full" style={activeTab === t.id ? { background: "rgba(255,255,255,0.3)" } : { background: `${BLUE}20` }}>
                  {t.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {loadingDetection ? (
        <div className="flex items-center justify-center py-12">
          <div className="w-6 h-6 border-3 border-blue-200 border-t-blue-500 rounded-full animate-spin" />
        </div>
      ) : (
        <>
          {/* ===== OVERVIEW TAB ===== */}
          {activeTab === "overview" && (
            <div className="space-y-3">
              {/* Location & IP */}
              <Card>
                <h4 className="text-[11px] font-bold mb-2 flex items-center gap-1.5" style={{ color: DARK }}>
                  <MapPin size={12} style={{ color: BLUE }} /> Location & Network
                </h4>
                <InfoRow icon={Globe} label="Country" value={p?.country || "—"} />
                <InfoRow icon={MapPin} label="City" value={latestDevice?.city || "—"} />
                <InfoRow icon={Globe} label="Region" value={latestDevice?.region || "—"} />
                <InfoRow icon={Wifi} label="IP Address" value={latestDevice?.ip_address || "—"} color={BLUE} />
                <InfoRow icon={Clock} label="Timezone" value={latestDevice?.timezone || "—"} />
                <InfoRow icon={Activity} label="Language" value={latestDevice?.language || p?.language || "—"} />
              </Card>

              {/* Device Info */}
              <Card>
                <h4 className="text-[11px] font-bold mb-2 flex items-center gap-1.5" style={{ color: DARK }}>
                  <Smartphone size={12} style={{ color: PURPLE }} /> Device System
                </h4>
                <InfoRow icon={Monitor} label="Platform" value={latestDevice?.platform || "—"} />
                <InfoRow icon={Smartphone} label="OS" value={latestDevice?.os ? `${latestDevice.os} ${latestDevice.os_version || ""}`.trim() : "—"} />
                <InfoRow icon={Globe} label="Browser" value={latestDevice?.browser ? `${latestDevice.browser} ${latestDevice.browser_version || ""}`.trim() : "—"} />
                <InfoRow icon={Monitor} label="Screen" value={latestDevice?.screen_resolution || "—"} />
                <InfoRow icon={Fingerprint} label="Fingerprint" value={latestDevice?.device_fingerprint ? latestDevice.device_fingerprint.substring(0, 20) + "..." : "—"} color={PURPLE} />
                <InfoRow icon={Smartphone} label="Device Name" value={latestDevice?.device_name || "—"} />
              </Card>

              {/* Risk Flags */}
              <Card>
                <h4 className="text-[11px] font-bold mb-2 flex items-center gap-1.5" style={{ color: DARK }}>
                  <ShieldAlert size={12} style={{ color: ORANGE }} /> Risk Detection Flags
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-lg p-2 text-center" style={{ background: latestDevice?.is_vpn ? `${RED}10` : SOFT_BG }}>
                    <p className="text-[8px]" style={{ color: GRAY }}>VPN</p>
                    <p className="text-[10px] font-bold" style={{ color: latestDevice?.is_vpn ? RED : GREEN }}>
                      {latestDevice?.is_vpn ? "DETECTED" : "None"}
                    </p>
                  </div>
                  <div className="rounded-lg p-2 text-center" style={{ background: latestDevice?.is_proxy ? `${RED}10` : SOFT_BG }}>
                    <p className="text-[8px]" style={{ color: GRAY }}>Proxy</p>
                    <p className="text-[10px] font-bold" style={{ color: latestDevice?.is_proxy ? RED : GREEN }}>
                      {latestDevice?.is_proxy ? "DETECTED" : "None"}
                    </p>
                  </div>
                  <div className="rounded-lg p-2 text-center" style={{ background: latestDevice?.is_emulator ? `${RED}10` : SOFT_BG }}>
                    <p className="text-[8px]" style={{ color: GRAY }}>Emulator</p>
                    <p className="text-[10px] font-bold" style={{ color: latestDevice?.is_emulator ? RED : GREEN }}>
                      {latestDevice?.is_emulator ? "DETECTED" : "None"}
                    </p>
                  </div>
                  <div className="rounded-lg p-2 text-center" style={{ background: latestDevice?.is_rooted ? `${RED}10` : SOFT_BG }}>
                    <p className="text-[8px]" style={{ color: GRAY }}>Rooted</p>
                    <p className="text-[10px] font-bold" style={{ color: latestDevice?.is_rooted ? RED : GREEN }}>
                      {latestDevice?.is_rooted ? "DETECTED" : "None"}
                    </p>
                  </div>
                </div>
              </Card>

              {/* Face Verification Summary */}
              {latestVerification && (
                <Card>
                  <h4 className="text-[11px] font-bold mb-2 flex items-center gap-1.5" style={{ color: DARK }}>
                    <Camera size={12} style={{ color: BLUE }} /> Face Verification
                  </h4>
                  <div className="flex items-center gap-2 mb-2">
                    {latestVerification.status === "verified" ? (
                      <CheckCircle size={16} style={{ color: GREEN }} />
                    ) : latestVerification.status === "failed" ? (
                      <XCircle size={16} style={{ color: RED }} />
                    ) : (
                      <Clock size={16} style={{ color: ORANGE }} />
                    )}
                    <span className="text-[10px] font-bold uppercase" style={{ color: severityColor(latestVerification.status === "verified" ? "low" : latestVerification.status === "failed" ? "critical" : "medium") }}>
                      {latestVerification.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    <InfoRow label="Face Detect" value={latestVerification.face_detection_passed ? "PASS" : "FAIL"} color={latestVerification.face_detection_passed ? GREEN : RED} />
                    <InfoRow label="Eye Blink" value={latestVerification.eye_blink_verified ? "PASS" : "FAIL"} color={latestVerification.eye_blink_verified ? GREEN : RED} />
                    <InfoRow label="Head Move" value={latestVerification.head_movement_verified ? "PASS" : "FAIL"} color={latestVerification.head_movement_verified ? GREEN : RED} />
                    <InfoRow label="Anti-Spoof" value={latestVerification.anti_spoof_passed ? "PASS" : "FAIL"} color={latestVerification.anti_spoof_passed ? GREEN : RED} />
                    <InfoRow label="Anti-Replay" value={latestVerification.anti_replay_passed ? "PASS" : "FAIL"} color={latestVerification.anti_replay_passed ? GREEN : RED} />
                    <InfoRow label="AI Fraud" value={latestVerification.ai_fraud_check_passed ? "PASS" : "FAIL"} color={latestVerification.ai_fraud_check_passed ? GREEN : RED} />
                  </div>
                  <InfoRow label="Risk Score" value={latestVerification.risk_score ?? 0} color={latestVerification.risk_score > 50 ? RED : latestVerification.risk_score > 25 ? ORANGE : GREEN} />
                  <InfoRow label="Attempts" value={latestVerification.attempt_count ?? 1} />
                </Card>
              )}
            </div>
          )}

          {/* ===== DEVICES TAB ===== */}
          {activeTab === "device" && (
            <div className="space-y-3">
              {devices.length === 0 ? (
                <Card className="text-center py-6"><p className="text-[10px]" style={{ color: GRAY }}>No device records</p></Card>
              ) : devices.map((d, i) => (
                <Card key={d.id || i}>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-[11px] font-bold" style={{ color: DARK }}>{d.device_name || d.platform || "Unknown Device"}</h4>
                    <Badge label={(d.device_category || "new").toUpperCase()} color={d.device_category === "trusted" ? GREEN : d.device_category === "suspicious" ? ORANGE : d.device_category === "blocked" ? RED : BLUE} />
                  </div>
                  <InfoRow icon={Globe} label="IP" value={d.ip_address} color={BLUE} />
                  <InfoRow icon={MapPin} label="Location" value={[d.city, d.region, d.country].filter(Boolean).join(", ") || "—"} />
                  <InfoRow icon={Smartphone} label="Platform" value={d.platform} />
                  <InfoRow icon={Smartphone} label="OS" value={d.os ? `${d.os} ${d.os_version || ""}`.trim() : "—"} />
                  <InfoRow icon={Globe} label="Browser" value={d.browser ? `${d.browser} ${d.browser_version || ""}`.trim() : "—"} />
                  <InfoRow icon={Fingerprint} label="Fingerprint" value={d.device_fingerprint?.substring(0, 24) + "..." || "—"} color={PURPLE} />
                  <InfoRow icon={Monitor} label="Screen" value={d.screen_resolution} />
                  <InfoRow icon={Clock} label="Timezone" value={d.timezone} />
                  <InfoRow icon={Activity} label="Login Count" value={d.login_count ?? 1} />
                  <InfoRow icon={Clock} label="First Seen" value={d.first_seen || d.created_date?.substring(0, 16)} />
                  <InfoRow icon={Clock} label="Last Seen" value={d.last_seen || d.last_active} />
                  <InfoRow icon={ShieldCheck} label="Trust Score" value={d.trust_score ?? 50} color={d.trust_score >= 70 ? GREEN : d.trust_score >= 40 ? ORANGE : RED} />
                  {(d.is_vpn || d.is_proxy || d.is_emulator || d.is_rooted) && (
                    <div className="flex gap-1.5 mt-2 flex-wrap">
                      {d.is_vpn && <Badge label="VPN" color={RED} />}
                      {d.is_proxy && <Badge label="PROXY" color={RED} />}
                      {d.is_emulator && <Badge label="EMULATOR" color={RED} />}
                      {d.is_rooted && <Badge label="ROOTED" color={RED} />}
                    </div>
                  )}
                </Card>
              ))}
            </div>
          )}

          {/* ===== SECURITY TAB ===== */}
          {activeTab === "security" && (
            <div className="space-y-3">
              {securityEvents.length === 0 ? (
                <Card className="text-center py-6"><p className="text-[10px]" style={{ color: GRAY }}>No security events</p></Card>
              ) : securityEvents.map((e, i) => (
                <Card key={e.id || i}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                      {e.severity === "critical" || e.severity === "high" ? (
                        <ShieldAlert size={14} style={{ color: RED }} />
                      ) : (
                        <Shield size={14} style={{ color: severityColor(e.severity) }} />
                      )}
                      <h4 className="text-[10px] font-bold uppercase" style={{ color: DARK }}>{e.event_type?.replace(/_/g, " ")}</h4>
                    </div>
                    <Badge label={(e.severity || "low").toUpperCase()} color={severityColor(e.severity)} />
                  </div>
                  {e.description && <p className="text-[10px] mb-1" style={{ color: DARK }}>{e.description}</p>}
                  <div className="grid grid-cols-2 gap-1.5">
                    <InfoRow icon={Globe} label="IP" value={e.ip_address} />
                    <InfoRow icon={MapPin} label="Location" value={[e.city, e.country].filter(Boolean).join(", ") || "—"} />
                    <InfoRow icon={Fingerprint} label="Fingerprint" value={e.device_fingerprint?.substring(0, 16) + "..." || "—"} />
                    <InfoRow icon={Shield} label="Risk" value={`${e.risk_score ?? 0}`} color={severityColor(e.risk_level)} />
                  </div>
                  <InfoRow icon={Clock} label="Date" value={e.created_date?.substring(0, 16)} />
                  <InfoRow icon={Activity} label="Status" value={e.status} color={e.status === "resolved" ? GREEN : ORANGE} />
                </Card>
              ))}
            </div>
          )}

          {/* ===== VERIFICATION TAB ===== */}
          {activeTab === "verification" && (
            <div className="space-y-3">
              {verifications.length === 0 ? (
                <Card className="text-center py-6"><p className="text-[10px]" style={{ color: GRAY }}>No verification records</p></Card>
              ) : verifications.map((v, i) => (
                <Card key={v.id || i}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                      <Camera size={14} style={{ color: BLUE }} />
                      <h4 className="text-[10px] font-bold uppercase" style={{ color: DARK }}>{v.verification_type}</h4>
                    </div>
                    {(() => {
                      if (v.status === "verified") return <CheckCircle size={14} style={{ color: GREEN }} />;
                      if (v.status === "failed") return <XCircle size={14} style={{ color: RED }} />;
                      return <Clock size={14} style={{ color: ORANGE }} />;
                    })()}
                  </div>
                  <InfoRow label="Status" value={v.status?.toUpperCase()} color={v.status === "verified" ? GREEN : v.status === "failed" ? RED : ORANGE} />
                  <InfoRow label="Method" value={v.method} />
                  {v.verification_type === "face" && (
                    <div className="grid grid-cols-2 gap-1.5 mt-1">
                      <InfoRow label="Face Detect" value={v.face_detection_passed ? "✓ PASS" : "✗ FAIL"} color={v.face_detection_passed ? GREEN : RED} />
                      <InfoRow label="Eye Blink" value={v.eye_blink_verified ? "✓ PASS" : "✗ FAIL"} color={v.eye_blink_verified ? GREEN : RED} />
                      <InfoRow label="Head Move" value={v.head_movement_verified ? "✓ PASS" : "✗ FAIL"} color={v.head_movement_verified ? GREEN : RED} />
                      <InfoRow label="Anti-Spoof" value={v.anti_spoof_passed ? "✓ PASS" : "✗ FAIL"} color={v.anti_spoof_passed ? GREEN : RED} />
                      <InfoRow label="Anti-Replay" value={v.anti_replay_passed ? "✓ PASS" : "✗ FAIL"} color={v.anti_replay_passed ? GREEN : RED} />
                      <InfoRow label="AI Fraud Check" value={v.ai_fraud_check_passed ? "✓ PASS" : "✗ FAIL"} color={v.ai_fraud_check_passed ? GREEN : RED} />
                    </div>
                  )}
                  <InfoRow label="Risk Score" value={v.risk_score ?? 0} color={(v.risk_score ?? 0) > 50 ? RED : (v.risk_score ?? 0) > 25 ? ORANGE : GREEN} />
                  <InfoRow label="Attempts" value={v.attempt_count ?? 1} />
                  {v.failure_reason && <InfoRow label="Failure" value={v.failure_reason} color={RED} />}
                  <InfoRow label="Verified By" value={v.verified_by} />
                  <InfoRow label="Verified Date" value={v.verified_date?.substring(0, 16)} />
                  <InfoRow label="Expires" value={v.expires_date?.substring(0, 16)} />
                  <InfoRow icon={Clock} label="Created" value={v.created_date?.substring(0, 16)} />
                </Card>
              ))}
            </div>
          )}

          {/* ===== FRAUD TAB ===== */}
          {activeTab === "fraud" && (
            <div className="space-y-3">
              {fraudRecords.length === 0 ? (
                <Card className="text-center py-6"><p className="text-[10px]" style={{ color: GRAY }}>No fraud records</p></Card>
              ) : fraudRecords.map((f, i) => (
                <Card key={f.id || i}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                      <AlertTriangle size={14} style={{ color: severityColor(f.risk_level) }} />
                      <h4 className="text-[10px] font-bold uppercase" style={{ color: DARK }}>{f.fraud_type?.replace(/_/g, " ")}</h4>
                    </div>
                    <Badge label={(f.risk_level || "low").toUpperCase()} color={severityColor(f.risk_level)} />
                  </div>
                  <InfoRow label="Risk Score" value={f.risk_score ?? 0} color={severityColor(f.risk_level)} />
                  <InfoRow label="Status" value={f.status} color={f.status === "false_positive" ? GREEN : f.status === "confirmed" ? RED : ORANGE} />
                  <InfoRow label="Detected By" value={f.detected_by?.replace(/_/g, " ")} />
                  {f.indicators?.length > 0 && (
                    <div className="mt-1">
                      <p className="text-[9px] mb-1" style={{ color: GRAY }}>Indicators:</p>
                      <div className="flex gap-1 flex-wrap">
                        {f.indicators.map((ind, idx) => <Badge key={idx} label={ind} color={ORANGE} />)}
                      </div>
                    </div>
                  )}
                  <InfoRow icon={Globe} label="IP" value={f.ip_address} />
                  <InfoRow icon={Fingerprint} label="Fingerprint" value={f.device_fingerprint?.substring(0, 16) + "..." || "—"} />
                  <InfoRow icon={Clock} label="Date" value={f.created_date?.substring(0, 16)} />
                </Card>
              ))}
            </div>
          )}

          {/* ===== SPAM TAB ===== */}
          {activeTab === "spam" && (
            <div className="space-y-3">
              {spamRecords.length === 0 ? (
                <Card className="text-center py-6"><p className="text-[10px]" style={{ color: GRAY }}>No spam records</p></Card>
              ) : spamRecords.map((s, i) => (
                <Card key={s.id || i}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                      <MessageSquare size={14} style={{ color: severityColor(s.severity) }} />
                      <h4 className="text-[10px] font-bold uppercase" style={{ color: DARK }}>{s.spam_type?.replace(/_/g, " ")}</h4>
                    </div>
                    <Badge label={(s.severity || "low").toUpperCase()} color={severityColor(s.severity)} />
                  </div>
                  <InfoRow label="Confidence" value={`${s.confidence_score ?? 0}%`} color={severityColor(s.severity)} />
                  <InfoRow label="Action" value={s.action_taken} color={s.action_taken === "banned" || s.action_taken === "blocked" ? RED : ORANGE} />
                  <InfoRow label="Status" value={s.status} />
                  <InfoRow label="Detected By" value={s.detected_by?.replace(/_/g, " ")} />
                  <InfoRow label="Messages" value={s.message_count ?? 1} />
                  {s.content_sample && <p className="text-[9px] mt-1 p-2 rounded-lg" style={{ background: SOFT_BG, color: DARK }}>"{s.content_sample}"</p>}
                  <InfoRow icon={Clock} label="Date" value={s.created_date?.substring(0, 16)} />
                </Card>
              ))}
            </div>
          )}

          {/* ===== ENFORCEMENT TAB ===== */}
          {activeTab === "enforcement" && (
            <div className="space-y-3">
              {enforcement.length === 0 ? (
                <Card className="text-center py-6"><p className="text-[10px]" style={{ color: GRAY }}>No enforcement actions</p></Card>
              ) : enforcement.map((e, i) => (
                <Card key={e.id || i}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                      <Ban size={14} style={{ color: severityColor(e.severity) }} />
                      <h4 className="text-[10px] font-bold uppercase" style={{ color: DARK }}>{e.action_type?.replace(/_/g, " ")}</h4>
                    </div>
                    <Badge label={(e.severity || "low").toUpperCase()} color={severityColor(e.severity)} />
                  </div>
                  <p className="text-[10px] mb-1" style={{ color: DARK }}>{e.reason}</p>
                  <InfoRow label="Status" value={e.status} color={e.status === "active" ? RED : e.status === "lifted" ? GREEN : GRAY} />
                  <InfoRow label="Step" value={`Step ${e.step_number ?? 1}`} />
                  <InfoRow label="Duration" value={e.duration_hours ? `${e.duration_hours}h` : "—"} />
                  <InfoRow label="Issued By" value={e.issued_by_role || e.issued_by} />
                  <InfoRow label="Start" value={e.start_date?.substring(0, 16)} />
                  <InfoRow label="End" value={e.end_date?.substring(0, 16)} />
                  {e.appeal_status !== "none" && <InfoRow label="Appeal" value={e.appeal_status} color={e.appeal_status === "approved" ? GREEN : ORANGE} />}
                </Card>
              ))}
            </div>
          )}

          {/* ===== LIVE STREAMS TAB ===== */}
          {activeTab === "live" && (
            <div className="space-y-3">
              {roomSessions.length === 0 ? (
                <Card className="text-center py-6"><p className="text-[10px]" style={{ color: GRAY }}>No live stream sessions</p></Card>
              ) : roomSessions.map((r, i) => (
                <Card key={r.id || i}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                      <Radio size={14} style={{ color: r.status === "live" ? RED : GRAY}} />
                      <h4 className="text-[10px] font-bold" style={{ color: DARK }}>{r.party_name || r.room_id}</h4>
                    </div>
                    {r.status === "live" && (
                      <span className="flex items-center gap-1 text-[8px] font-bold" style={{ color: RED }}>
                        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: RED }} /> LIVE
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-3 gap-2 mb-2">
                    <div className="text-center rounded-lg p-1.5" style={{ background: SOFT_BG }}>
                      <p className="text-[7px]" style={{ color: GRAY }}>Viewers</p>
                      <p className="text-[10px] font-bold" style={{ color: DARK }}>{r.current_viewers ?? 0}</p>
                    </div>
                    <div className="text-center rounded-lg p-1.5" style={{ background: SOFT_BG }}>
                      <p className="text-[7px]" style={{ color: GRAY }}>Peak</p>
                      <p className="text-[10px] font-bold" style={{ color: DARK }}>{r.peak_viewers ?? 0}</p>
                    </div>
                    <div className="text-center rounded-lg p-1.5" style={{ background: SOFT_BG }}>
                      <p className="text-[7px]" style={{ color: GRAY }}>Gifts</p>
                      <p className="text-[10px] font-bold" style={{ color: DARK }}>{r.total_gifts ?? 0}</p>
                    </div>
                  </div>
                  <InfoRow icon={Gift} label="Coins" value={r.total_coins ?? 0} color={ORANGE} />
                  <InfoRow icon={DollarSign} label="Host Earn" value={`${r.host_earnings_coins ?? 0} coins`} color={GREEN} />
                  <InfoRow label="Duration" value={r.duration_seconds ? `${Math.floor(r.duration_seconds / 60)}m` : "—"} />
                  <InfoRow label="Category" value={r.category} />
                  <InfoRow icon={MapPin} label="Country" value={r.country} />
                  <InfoRow icon={Clock} label="Started" value={r.started_at?.substring(0, 16)} />
                  <InfoRow icon={Clock} label="Ended" value={r.ended_at?.substring(0, 16)} />
                  {r.is_force_closed && <Badge label="FORCE CLOSED" color={RED} />}
                  {r.security_flags?.length > 0 && (
                    <div className="flex gap-1 mt-2 flex-wrap">
                      {r.security_flags.map((fl, idx) => <Badge key={idx} label={fl} color={RED} />)}
                    </div>
                  )}
                </Card>
              ))}
            </div>
          )}

          {/* ===== TRANSACTIONS TAB ===== */}
          {activeTab === "transactions" && (
            <div className="space-y-3">
              {transactions.length === 0 ? (
                <Card className="text-center py-6"><p className="text-[10px]" style={{ color: GRAY }}>No transactions</p></Card>
              ) : transactions.map((t, i) => (
                <Card key={t.id || i}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                      <DollarSign size={14} style={{ color: t.type === "recharge" ? GREEN : t.type === "withdraw" ? ORANGE : BLUE }} />
                      <h4 className="text-[10px] font-bold uppercase" style={{ color: DARK }}>{t.type}</h4>
                    </div>
                    <Badge label={t.status?.toUpperCase()} color={t.status === "completed" ? GREEN : t.status === "failed" ? RED : ORANGE} />
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    <InfoRow label="Amount" value={`$${t.amount_usd ?? 0}`} color={GREEN} />
                    <InfoRow label="Coins" value={t.coins ?? 0} color={ORANGE} />
                  </div>
                  {t.gift_name && <InfoRow icon={Gift} label="Gift" value={`${t.gift_icon || ""} ${t.gift_name} ×${t.gift_quantity ?? 1}`} />}
                  {t.recipient_name && <InfoRow label="Recipient" value={t.recipient_name} />}
                  {t.paypal_email && <InfoRow label="PayPal" value={t.paypal_email} />}
                  <InfoRow icon={Clock} label="Date" value={t.created_date?.substring(0, 16)} />
                </Card>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}