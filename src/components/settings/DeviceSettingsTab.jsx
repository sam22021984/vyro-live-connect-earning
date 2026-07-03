import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Phone, Shield, Smartphone, Bell, Wifi, Check } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";

export default function DeviceSettingsTab() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [phoneInput, setPhoneInput] = useState("");
  const [otpInput, setOtpInput] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const fetchSettings = async () => {
    try {
      const res = await base44.functions.invoke("deviceSettings", { action: "get" });
      setSettings(res.data.settings);
      setPhoneInput(res.data.settings?.phone_number || "");
    } catch (err) {
      toast({ title: "Failed to load settings", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleToggle = async (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    try {
      const res = await base44.functions.invoke("deviceSettings", { action: "update", [key]: value });
      setSettings(res.data.settings);
    } catch (err) {
      setSettings((prev) => ({ ...prev, [key]: !value }));
      toast({ title: "Update failed", variant: "destructive" });
    }
  };

  const handleSendOtp = async () => {
    if (!phoneInput.trim()) {
      toast({ title: "Enter phone number", variant: "destructive" });
      return;
    }
    setSaving(true);
    try {
      const res = await base44.functions.invoke("deviceSettings", { action: "send_otp", phone_number: phoneInput.trim() });
      setOtpSent(true);
      toast({ title: `OTP sent: ${res.data.otp}`, description: "(demo mode — OTP shown in toast)" });
    } catch (err) {
      toast({ title: "Failed to send OTP", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otpInput.trim()) {
      toast({ title: "Enter OTP", variant: "destructive" });
      return;
    }
    setVerifying(true);
    try {
      const res = await base44.functions.invoke("deviceSettings", { action: "verify_otp", phone_number: phoneInput.trim(), otp: otpInput.trim() });
      setSettings(res.data.settings);
      setOtpSent(false);
      setOtpInput("");
      toast({ title: "Phone verified ✓" });
    } catch (err) {
      toast({ title: "Verification failed", variant: "destructive" });
    } finally {
      setVerifying(false);
    }
  };

  const handleFieldUpdate = async (field, value) => {
    try {
      const res = await base44.functions.invoke("deviceSettings", { action: "update", [field]: value });
      setSettings(res.data.settings);
    } catch (err) {
      toast({ title: "Update failed", variant: "destructive" });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  const ToggleRow = ({ icon: Icon, label, desc, fieldKey, value, color = "#3B82F6" }) => (
    <div className="flex items-center gap-3 px-4 py-3">
      <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${color}15` }}>
        <Icon size={18} style={{ color }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-800">{label}</p>
        {desc && <p className="text-[11px] text-gray-400 leading-tight">{desc}</p>}
      </div>
      <button
        onClick={() => handleToggle(fieldKey, !value)}
        className="relative w-11 h-6 rounded-full transition flex-shrink-0"
        style={{ background: value ? "#22C55E" : "#E5E7EB" }}
      >
        <div
          className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform"
          style={{ transform: value ? "translateX(22px)" : "translateX(2px)" }}
        />
      </button>
    </div>
  );

  const InputRow = ({ icon: Icon, label, fieldKey, value, placeholder, color = "#8B5CF6" }) => (
    <div className="flex items-center gap-3 px-4 py-3">
      <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${color}15` }}>
        <Icon size={18} style={{ color }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-800">{label}</p>
      </div>
      <input
        defaultValue={value || ""}
        placeholder={placeholder}
        onBlur={(e) => e.target.value !== (value || "") && handleFieldUpdate(fieldKey, e.target.value)}
        className="text-sm text-gray-600 text-right bg-transparent outline-none w-32"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8F9FC]">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-4 py-3 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center active:scale-95 transition">
            <ArrowLeft size={18} className="text-gray-700" />
          </button>
          <h1 className="text-base font-bold text-gray-800">Device Settings</h1>
        </div>

        <div className="p-4 space-y-4">
          {/* Phone Number Section */}
          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide px-2 mb-2">📱 Mobile Phone</p>
            <div className="bg-white rounded-2xl border border-gray-50 shadow-sm overflow-hidden">
              <div className="flex items-center gap-3 px-4 py-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#3B82F615" }}>
                  <Phone size={18} className="text-blue-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800">Phone Number</p>
                  <p className="text-[11px] text-gray-400">{settings?.phone_verified ? "Verified ✓" : "Not verified"}</p>
                </div>
                {settings?.phone_verified && (
                  <span className="flex items-center gap-1 text-[11px] font-bold text-green-600">
                    <Check size={12} /> Verified
                  </span>
                )}
              </div>
              {!settings?.phone_verified && (
                <div className="px-4 pb-3 space-y-2">
                  <input
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    placeholder="+92 300 1234567"
                    className="w-full py-2.5 px-3 rounded-xl text-sm border border-gray-200 outline-none focus:border-blue-400"
                  />
                  {!otpSent ? (
                    <button
                      onClick={handleSendOtp}
                      disabled={saving}
                      className="w-full py-2.5 rounded-xl text-sm font-bold text-white bg-blue-500 active:scale-95 transition disabled:opacity-50"
                    >
                      {saving ? "Sending..." : "Send OTP"}
                    </button>
                  ) : (
                    <div className="space-y-2">
                      <input
                        value={otpInput}
                        onChange={(e) => setOtpInput(e.target.value)}
                        placeholder="Enter 6-digit OTP"
                        maxLength={6}
                        className="w-full py-2.5 px-3 rounded-xl text-sm border border-gray-200 outline-none focus:border-green-400 tracking-widest text-center"
                      />
                      <button
                        onClick={handleVerifyOtp}
                        disabled={verifying}
                        className="w-full py-2.5 rounded-xl text-sm font-bold text-white bg-green-500 active:scale-95 transition disabled:opacity-50"
                      >
                        {verifying ? "Verifying..." : "Verify OTP"}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Security Section */}
          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide px-2 mb-2">🛡️ Security</p>
            <div className="bg-white rounded-2xl border border-gray-50 shadow-sm overflow-hidden">
              <ToggleRow
                icon={Shield}
                label="SMS Two-Factor Auth"
                desc="Require OTP for login"
                fieldKey="sms_2fa_enabled"
                value={settings?.sms_2fa_enabled}
                color="#EF4444"
              />
            </div>
          </div>

          {/* Device Info Section */}
          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide px-2 mb-2">📲 Device Info</p>
            <div className="bg-white rounded-2xl border border-gray-50 shadow-sm overflow-hidden">
              <InputRow icon={Smartphone} label="Device Name" fieldKey="device_name" value={settings?.device_name} placeholder="My Device" color="#8B5CF6" />
              <div className="border-t border-gray-50" />
              <InputRow icon={Smartphone} label="Device Model" fieldKey="device_model" value={settings?.device_model} placeholder="iPhone 15 Pro" color="#8B5CF6" />
              <div className="border-t border-gray-50" />
              <InputRow icon={Smartphone} label="OS Version" fieldKey="os_version" value={settings?.os_version} placeholder="iOS 17.4" color="#8B5CF6" />
              <div className="border-t border-gray-50" />
              <InputRow icon={Smartphone} label="SIM Carrier" fieldKey="sim_carrier" value={settings?.sim_carrier} placeholder="Jazz / Telenor" color="#8B5CF6" />
            </div>
          </div>

          {/* Notifications Section */}
          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide px-2 mb-2">🔔 Notifications</p>
            <div className="bg-white rounded-2xl border border-gray-50 shadow-sm overflow-hidden">
              <ToggleRow icon={Bell} label="SMS Notifications" desc="Receive alerts via SMS" fieldKey="sms_notifications" value={settings?.sms_notifications} color="#F59E0B" />
              <div className="border-t border-gray-50" />
              <ToggleRow icon={Bell} label="Ringtone" desc="Play sound on notifications" fieldKey="ringtone_enabled" value={settings?.ringtone_enabled} color="#F59E0B" />
              <div className="border-t border-gray-50" />
              <ToggleRow icon={Bell} label="Vibration" desc="Vibrate on notifications" fieldKey="vibration_enabled" value={settings?.vibration_enabled} color="#F59E0B" />
            </div>
          </div>

          {/* Data Section */}
          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide px-2 mb-2">💾 Data & Connectivity</p>
            <div className="bg-white rounded-2xl border border-gray-50 shadow-sm overflow-hidden">
              <ToggleRow icon={Wifi} label="Auto-fill OTP" desc="Auto-detect OTP from SMS" fieldKey="auto_fill_otp" value={settings?.auto_fill_otp} color="#06B6D4" />
              <div className="border-t border-gray-50" />
              <ToggleRow icon={Wifi} label="Low Data Mode" desc="Reduce background data usage" fieldKey="low_data_mode" value={settings?.low_data_mode} color="#06B6D4" />
              <div className="border-t border-gray-50" />
              <ToggleRow icon={Wifi} label="Background App Refresh" desc="Refresh content in background" fieldKey="background_app_refresh" value={settings?.background_app_refresh} color="#06B6D4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}