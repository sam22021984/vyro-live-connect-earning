import { useState, useCallback } from "react";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";

/**
 * VYRO ESTSFP V2.0 — Enterprise Security, Trust, Safety & Fraud Prevention System
 * Frontend hook that connects to the securitySystem backend function.
 */
export function useSecuritySystem() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const call = useCallback(async (payload) => {
    setLoading(true);
    try {
      const res = await base44.functions.invoke("securitySystem", payload);
      const data = res.data || res;
      if (data.error) {
        toast({ title: data.error, variant: "destructive" });
        return null;
      }
      return data;
    } catch (err) {
      toast({ title: "Security system error", description: err.message, variant: "destructive" });
      return null;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  // 1. Log security event
  const logSecurityEvent = useCallback((params) =>
    call({ action: "logSecurityEvent", ...params }), [call]);

  // 2. Record verification (face, phone, email, identity, age)
  const recordVerification = useCallback((params) =>
    call({ action: "recordVerification", ...params }), [call]);

  // 3. Get verification status
  const getVerificationStatus = useCallback((targetUserId) =>
    call({ action: "getVerificationStatus", target_user_id: targetUserId }), [call]);

  // 4. Register / validate device
  const registerDevice = useCallback((params) =>
    call({ action: "registerDevice", ...params }), [call]);

  // 5. Check user risk score
  const checkUserRisk = useCallback((targetUserId) =>
    call({ action: "checkUserRisk", target_user_id: targetUserId }), [call]);

  // 6. Detect fraud (admin)
  const detectFraud = useCallback((params) =>
    call({ action: "detectFraud", ...params }), [call]);

  // 7. Issue enforcement (admin)
  const issueEnforcement = useCallback((params) =>
    call({ action: "issueEnforcement", ...params }), [call]);

  // 8. Lift enforcement (admin)
  const liftEnforcement = useCallback((enforcementId, liftReason) =>
    call({ action: "liftEnforcement", enforcement_id: enforcementId, lift_reason: liftReason }), [call]);

  // 9. Create alert (admin)
  const createAlert = useCallback((params) =>
    call({ action: "createAlert", ...params }), [call]);

  // 10. Resolve alert (admin)
  const resolveAlert = useCallback((alertId, resolution, status) =>
    call({ action: "resolveAlert", alert_id: alertId, resolution, status }), [call]);

  // 11. Create incident (admin)
  const createIncident = useCallback((params) =>
    call({ action: "createIncident", ...params }), [call]);

  // 12. Add investigation note (admin)
  const addInvestigationNote = useCallback((incidentId, note, evidence) =>
    call({ action: "addInvestigationNote", incident_id: incidentId, note, evidence }), [call]);

  // 13. Owner security access (owner only)
  const ownerSecurityAccess = useCallback((targetUserId, accessType) =>
    call({ action: "ownerSecurityAccess", target_user_id: targetUserId, access_type: accessType }), [call]);

  // 14. Get security dashboard (admin)
  const getSecurityDashboard = useCallback(() =>
    call({ action: "getSecurityDashboard" }), [call]);

  // 15. Review fraud case (admin)
  const reviewFraud = useCallback((fraudId, reviewStatus, actionTaken) =>
    call({ action: "reviewFraud", fraud_id: fraudId, review_status: reviewStatus, action_taken: actionTaken }), [call]);

  // 16. Block device (admin)
  const blockDevice = useCallback((deviceId, blockReason) =>
    call({ action: "blockDevice", device_id: deviceId, block_reason: blockReason }), [call]);

  // 17. Unblock device (admin)
  const unblockDevice = useCallback((deviceId) =>
    call({ action: "unblockDevice", device_id: deviceId }), [call]);

  // 18. Get audit logs (admin)
  const getAuditLogs = useCallback((params = {}) =>
    call({ action: "getAuditLogs", ...params }), [call]);

  // 19. Log content violation (admin)
  const logContentViolation = useCallback((params) =>
    call({ action: "logContentViolation", ...params }), [call]);

  // 20. Resolve incident (admin)
  const resolveIncident = useCallback((incidentId, resolution, status) =>
    call({ action: "resolveIncident", incident_id: incidentId, resolution, status }), [call]);

  return {
    loading,
    // User actions
    logSecurityEvent,
    recordVerification,
    getVerificationStatus,
    registerDevice,
    checkUserRisk,
    // Admin actions
    detectFraud,
    issueEnforcement,
    liftEnforcement,
    createAlert,
    resolveAlert,
    createIncident,
    addInvestigationNote,
    reviewFraud,
    blockDevice,
    unblockDevice,
    getAuditLogs,
    logContentViolation,
    resolveIncident,
    getSecurityDashboard,
    // Owner actions
    ownerSecurityAccess,
  };
}