import React, { useState } from "react";
import {
  Shield, Fingerprint, Bell, Clock, Lock, AlertTriangle,
  KeyRound, Mail, Smartphone, X,
} from "lucide-react";
import { useMobileSettings } from "@/hooks/useMobileSettings";
import { useToast } from "@/components/ui/use-toast";
import {
  SettingsShell, SettingsCard, ToggleRow, InfoRow, ActionRow,
} from "@/components/settings/SettingsUI";

export default function SecuritySettingsTab() {
  const { settings, loading, updateSetting, changePassword } = useMobileSettings();
  const { toast } = useToast();
  const s = settings.security || {};
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const handle = async (key, value, label) => {
    try {
      await updateSetting("security", { [key]: value });
      toast({ title: `${label} updated` });
    } catch (e) {
      toast({ title: "Update failed", description: e.message, variant: "destructive" });
    }
  };

  return (
    <SettingsShell title="Security Settings" subtitle="Protect your account" loading={loading}>
      <SettingsCard title="Authentication">
        <ToggleRow
          icon={KeyRound} label="Two-Factor Authentication" description="Extra layer of security"
          value={s.two_factor_enabled ?? false} color="#10B981"
          onChange={(v) => handle("two_factor_enabled", v, "2FA")}
        />
        <ToggleRow
          icon={Fingerprint} label="Biometric Login" description="Use fingerprint or face ID"
          value={s.biometric_login ?? false} color="#3B82F6"
          onChange={(v) => handle("biometric_login", v, "Biometric login")}
        />
        <ActionRow
          icon={KeyRound} label="Change Password" description="Update your password"
          color="#8B5CF6" onClick={() => setShowPasswordModal(true)}
          isLast
        />
      </SettingsCard>

      <SettingsCard title="App Lock">
        <ToggleRow
          icon={Lock} label="App Lock" description="Require authentication to open app"
          value={s.app_lock_enabled ?? false} color="#EF4444"
          onChange={(v) => handle("app_lock_enabled", v, "App lock")}
        />
        {s.app_lock_enabled && (
          <div className="flex items-center justify-between px-4 py-3.5" style={{ borderBottom: "1px solid #F0F1F5" }}>
            <p className="text-sm font-semibold text-gray-800">Auto-Lock Timeout</p>
            <select
              value={s.app_lock_timeout_minutes || 5}
              onChange={(e) => handle("app_lock_timeout_minutes", parseInt(e.target.value), "Timeout")}
              className="text-xs font-semibold bg-gray-50 rounded-lg px-3 py-2 outline-none"
              style={{ border: "1px solid #E5E7EB", color: "#1A1B3A" }}
            >
              <option value={1}>1 minute</option>
              <option value={5}>5 minutes</option>
              <option value={15}>15 minutes</option>
              <option value={30}>30 minutes</option>
            </select>
          </div>
        )}
        <div className="flex items-center justify-between px-4 py-3.5">
          <p className="text-sm font-semibold text-gray-800">Session Timeout</p>
          <select
            value={s.session_timeout_minutes || 30}
            onChange={(e) => handle("session_timeout_minutes", parseInt(e.target.value), "Session timeout")}
            className="text-xs font-semibold bg-gray-50 rounded-lg px-3 py-2 outline-none"
            style={{ border: "1px solid #E5E7EB", color: "#1A1B3A" }}
          >
            <option value={15}>15 minutes</option>
            <option value={30}>30 minutes</option>
            <option value={60}>1 hour</option>
            <option value={240}>4 hours</option>
          </select>
        </div>
      </SettingsCard>

      <SettingsCard title="Security Alerts">
        <ToggleRow
          icon={Bell} label="Login Alerts" description="Get notified on new logins"
          value={s.login_alerts ?? true} color="#F59E0B"
          onChange={(v) => handle("login_alerts", v, "Login alerts")}
        />
        <ToggleRow
          icon={AlertTriangle} label="Suspicious Activity" description="Alert on unusual activity"
          value={s.suspicious_activity_alerts ?? true} color="#EF4444"
          onChange={(v) => handle("suspicious_activity_alerts", v, "Suspicious activity alerts")}
          isLast
        />
      </SettingsCard>

      <SettingsCard title="Recovery Options">
        <InfoRow
          icon={Mail} label="Recovery Email" value={s.recovery_email || "Not set"} color="#3B82F6"
          onClick={() => toast({ title: "Edit recovery email" })}
        />
        <InfoRow
          icon={Smartphone} label="Recovery Phone" value={s.recovery_phone || "Not set"} color="#10B981"
          isLast
        />
      </SettingsCard>

      {s.last_password_change && (
        <p className="text-[10px] text-gray-400 text-center mt-2">
          Last password change: {new Date(s.last_password_change).toLocaleDateString()}
        </p>
      )}

      {/* Password Modal */}
      {showPasswordModal && (
        <PasswordModal
          onClose={() => setShowPasswordModal(false)}
          changePassword={changePassword}
          toast={toast}
        />
      )}
    </SettingsShell>
  );
}

function PasswordModal({ onClose, changePassword, toast }) {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!current || !next) return;
    if (next !== confirm) {
      toast({ title: "Passwords don't match", variant: "destructive" });
      return;
    }
    if (next.length < 6) {
      toast({ title: "Password too short", description: "Minimum 6 characters", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    try {
      await changePassword(current, next);
      toast({ title: "Password updated successfully" });
      onClose();
    } catch (e) {
      toast({ title: "Failed", description: e.message, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" style={{ background: "rgba(0,0,0,0.4)" }}>
      <div className="w-full max-w-md bg-white rounded-t-3xl p-6 animate-fadeIn">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-gray-800">Change Password</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
            <X size={16} className="text-gray-500" />
          </button>
        </div>
        <div className="space-y-3">
          <div>
            <label className="text-[10px] font-bold mb-1 block text-gray-600">Current Password</label>
            <input type="password" value={current} onChange={(e) => setCurrent(e.target.value)}
              className="w-full rounded-xl px-3 py-2.5 text-xs outline-none"
              style={{ background: "#F7F9FC", border: "1px solid #E5E7EB", color: "#1A1B3A" }} />
          </div>
          <div>
            <label className="text-[10px] font-bold mb-1 block text-gray-600">New Password</label>
            <input type="password" value={next} onChange={(e) => setNext(e.target.value)}
              className="w-full rounded-xl px-3 py-2.5 text-xs outline-none"
              style={{ background: "#F7F9FC", border: "1px solid #E5E7EB", color: "#1A1B3A" }} />
          </div>
          <div>
            <label className="text-[10px] font-bold mb-1 block text-gray-600">Confirm New Password</label>
            <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)}
              className="w-full rounded-xl px-3 py-2.5 text-xs outline-none"
              style={{ background: "#F7F9FC", border: "1px solid #E5E7EB", color: "#1A1B3A" }} />
          </div>
          <div className="flex gap-2 pt-2">
            <button onClick={onClose} className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-gray-100 text-gray-600">
              Cancel
            </button>
            <button onClick={handleSubmit} disabled={submitting} className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-purple-500 text-white active:scale-95 disabled:opacity-50">
              {submitting ? "Updating..." : "Update"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}