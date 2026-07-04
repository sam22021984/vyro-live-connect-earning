import { useState, useCallback } from "react";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";

/**
 * VYRO AI Safety Monitor — Real-time AI-powered content analysis,
 * spam detection, live stream protection, age verification, and incident management.
 */
export function useAiSafetyMonitor() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  const call = useCallback(async (payload) => {
    setLoading(true);
    try {
      const res = await base44.functions.invoke("aiSafetyMonitor", payload);
      const data = res.data || res;
      if (data.error) {
        toast({ title: data.error, variant: "destructive" });
        return null;
      }
      return data;
    } catch (err) {
      toast({ title: "AI Safety Monitor error", description: err.message, variant: "destructive" });
      return null;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  // 1. Real-time text content analysis (chat, comments, messages)
  const analyzeText = useCallback(async (params) => {
    setAnalyzing(true);
    const result = await call({ action: "analyzeText", ...params });
    setAnalyzing(false);

    // Show user-facing notifications for violations
    if (result && !result.approved) {
      const sev = result.severity;
      if (sev === 'critical' || sev === 'high') {
        toast({
          title: "⚠️ Content Violation Detected",
          description: `Your message was flagged for: ${result.violations?.join(', ')}. Action: ${result.action_taken}`,
          variant: "destructive",
        });
      } else if (sev === 'medium') {
        toast({
          title: "⚠️ Warning",
          description: `Your message was flagged. Please be respectful.`,
          variant: "destructive",
        });
      }
    }

    return result;
  }, [call, toast]);

  // 2. Voice/audio content analysis
  const analyzeVoice = useCallback(async (params) =>
    call({ action: "analyzeVoice", ...params }), [call]);

  // 3. Spam detection & anti-bot
  const checkSpam = useCallback(async (params) =>
    call({ action: "checkSpam", ...params }), [call]);

  // 4. Live stream protection (admin)
  const protectLiveSession = useCallback(async (params) =>
    call({ action: "protectLiveSession", ...params }), [call]);

  // 5. Age verification & child safety
  const verifyAge = useCallback(async (params) =>
    call({ action: "verifyAge", ...params }), [call]);

  // 6. Account recovery
  const initiateRecovery = useCallback(async (params) =>
    call({ action: "initiateRecovery", ...params }), [call]);

  // 7. Get violation history
  const getViolationHistory = useCallback(async (targetUserId, limit) =>
    call({ action: "getViolationHistory", target_user_id: targetUserId, limit }), [call]);

  // 8. Appeal a violation
  const appealViolation = useCallback(async (violationId, appealNotes) =>
    call({ action: "appealViolation", violation_id: violationId, appeal_notes: appealNotes }), [call]);

  // 9. Review appeal (admin)
  const reviewAppeal = useCallback(async (violationId, decision, notes) =>
    call({ action: "reviewAppeal", violation_id: violationId, decision, notes }), [call]);

  // 10. Log screenshot attempt
  const logScreenshotAttempt = useCallback(async (params) =>
    call({ action: "logScreenshotAttempt", ...params }), [call]);

  // 11. Search logs (admin)
  const searchLogs = useCallback(async (params) =>
    call({ action: "searchLogs", ...params }), [call]);

  // 12. Get AI safety dashboard (admin)
  const getSafetyDashboard = useCallback(async () =>
    call({ action: "getSafetyDashboard" }), [call]);

  return {
    loading,
    analyzing,
    // User actions
    analyzeText,
    analyzeVoice,
    checkSpam,
    verifyAge,
    initiateRecovery,
    getViolationHistory,
    appealViolation,
    logScreenshotAttempt,
    // Admin actions
    protectLiveSession,
    reviewAppeal,
    searchLogs,
    getSafetyDashboard,
  };
}