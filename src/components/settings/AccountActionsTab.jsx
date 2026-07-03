import React, { useState } from "react";
import {
  UserCog, Pause, Trash2, Download, AlertTriangle, X,
  ShieldCheck, LogOut, KeyRound, Mail,
} from "lucide-react";
import { useMobileSettings } from "@/hooks/useMobileSettings";
import { useToast } from "@/components/ui/use-toast";
import { base44 } from "@/api/base44Client";
import { SettingsShell, SettingsCard, ActionRow } from "@/components/settings/SettingsUI";

export default function AccountActionsTab() {
  const { deactivateAccount, deleteAccount } = useMobileSettings();
  const { toast } = useToast();
  const [confirmAction, setConfirmAction] = useState(null);

  const handleLogout = async () => {
    await base44.auth.logout("/login");
  };

  const handleDeactivate = async () => {
    try {
      await deactivateAccount();
      toast({ title: "Deactivation request submitted", description: "Your account will be reviewed." });
      setConfirmAction(null);
    } catch (e) {
      toast({ title: "Failed", description: e.message, variant: "destructive" });
    }
  };

  const handleDelete = async () => {
    try {
      await deleteAccount();
      toast({ title: "Deletion request submitted", description: "You will be contacted within 48 hours." });
      setConfirmAction(null);
    } catch (e) {
      toast({ title: "Failed", description: e.message, variant: "destructive" });
    }
  };

  return (
    <SettingsShell title="Account Actions" subtitle="Manage your account lifecycle">
      <SettingsCard title="Account Management">
        <ActionRow
          icon={UserCog} label="Edit Profile" description="Update your profile information"
          color="#8B5CF6" onClick={() => window.location.href = "/edit-profile"}
        />
        <ActionRow
          icon={KeyRound} label="Change Password" description="Update your account password"
          color="#3B82F6" onClick={() => setConfirmAction("password")}
        />
        <ActionRow
          icon={Mail} label="Verify Email" description="Confirm your email address"
          color="#10B981"
        />
        <ActionRow
          icon={Download} label="Download My Data" description="Export your account data"
          color="#F59E0B"
          isLast
        />
      </SettingsCard>

      <SettingsCard title="Account Status">
        <ActionRow
          icon={Pause} label="Deactivate Account" description="Temporarily disable your account"
          color="#F59E0B" onClick={() => setConfirmAction("deactivate")}
        />
        <ActionRow
          icon={Trash2} label="Delete Account" description="Permanently remove your account"
          color="#EF4444" danger onClick={() => setConfirmAction("delete")}
          isLast
        />
      </SettingsCard>

      <SettingsCard title="Session">
        <ActionRow
          icon={LogOut} label="Logout" description="Sign out from this device"
          color="#EF4444" danger onClick={handleLogout}
        />
      </SettingsCard>

      {/* Confirmation Modal */}
      {confirmAction && (
        <div className="fixed inset-0 z-50 flex items-end justify-center" style={{ background: "rgba(0,0,0,0.4)" }}>
          <div className="w-full max-w-md bg-white rounded-t-3xl p-6 animate-fadeIn">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-gray-800">
                {confirmAction === "delete" ? "Delete Account" :
                 confirmAction === "deactivate" ? "Deactivate Account" : "Change Password"}
              </h3>
              <button onClick={() => setConfirmAction(null)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                <X size={16} className="text-gray-500" />
              </button>
            </div>

            {confirmAction === "delete" && (
              <div>
                <div className="flex items-center gap-2 mb-4 p-3 rounded-xl bg-red-50">
                  <AlertTriangle size={18} className="text-red-500 flex-shrink-0" />
                  <p className="text-xs text-red-700 font-medium">
                    This will permanently delete your account, profile, and all associated data. This action cannot be undone.
                  </p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setConfirmAction(null)} className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-gray-100 text-gray-600">
                    Cancel
                  </button>
                  <button onClick={handleDelete} className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-red-500 text-white active:scale-95">
                    Delete Forever
                  </button>
                </div>
              </div>
            )}

            {confirmAction === "deactivate" && (
              <div>
                <div className="flex items-center gap-2 mb-4 p-3 rounded-xl bg-amber-50">
                  <ShieldCheck size={18} className="text-amber-500 flex-shrink-0" />
                  <p className="text-xs text-amber-700 font-medium">
                    Your account will be temporarily disabled. You can reactivate by logging in again.
                  </p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setConfirmAction(null)} className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-gray-100 text-gray-600">
                    Cancel
                  </button>
                  <button onClick={handleDeactivate} className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-amber-500 text-white active:scale-95">
                    Deactivate
                  </button>
                </div>
              </div>
            )}

            {confirmAction === "password" && (
              <PasswordForm onClose={() => setConfirmAction(null)} />
            )}
          </div>
        </div>
      )}
    </SettingsShell>
  );
}

function PasswordForm({ onClose }) {
  const { changePassword } = useMobileSettings();
  const { toast } = useToast();
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
          {submitting ? "Updating..." : "Update Password"}
        </button>
      </div>
    </div>
  );
}