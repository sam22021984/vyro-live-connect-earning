import { useState, useEffect, useCallback } from "react";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";

import { backendGateway } from "@/lib/backendGateway";
export function useTrustReputation() {
  const { user: authUser } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!authUser?.id) return;
    try {
      const [securityEvents, enforcementActions, verificationRecords, badges, achievements, profile] = await Promise.all([
        backendGateway.readTable("security_events", { filter: { user_id: authUser.id }, limit: 50, order: "created_date", ascending: false }).catch(() => []),
        backendGateway.readTable("enforcement_actions", { filter: { user_id: authUser.id }, limit: 50, order: "created_date", ascending: false }).catch(() => []),
        backendGateway.readTable("verification_records", { filter: { user_id: authUser.id }, limit: 50, order: "created_date", ascending: false }).catch(() => []),
        backendGateway.readTable("badges", { limit: 100, order: "created_at", ascending: true }).catch(() => []),
        backendGateway.readTable("achievements", { filter: { created_by: authUser.id }, limit: 100, order: "created_at", ascending: true }).catch(() => []),
        backendGateway.readTable("user_profiles", { filter: { user_id: authUser.id }, limit: 100, order: "created_at", ascending: true }).catch(() => []),
      ]);

      const userProfile = profile?.[0] || {};
      const trustScore = userProfile.trust_score || 0;

      // Build trust history from real events
      const history = [];

      // Security events → history entries
      (securityEvents || []).forEach((e) => {
        const isPositive = !["suspicious_activity", "fraud_detected", "account_takeover", "policy_violation", "bot_detected", "spam_detected", "content_violation", "harassment", "hate_speech", "threat", "child_safety"].includes(e.event_type);
        history.push({
          type: isPositive ? "Score Increased" : "Warning Issued",
          title: e.description || e.event_type?.replace(/_/g, " "),
          detail: `${e.event_type?.replace(/_/g, " ") || "Event"} • ${e.severity || "low"} severity`,
          date: e.created_date ? new Date(e.created_date).toLocaleDateString() : "—",
          time: e.created_date ? new Date(e.created_date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "—",
          icon: isPositive ? "TrendingUp" : "AlertTriangle",
          color: isPositive ? "#10B981" : "#EF4444",
        });
      });

      // Enforcement actions → history entries
      (enforcementActions || []).forEach((a) => {
        const isLifted = a.status === "lifted" || a.status === "expired";
        history.push({
          type: isLifted ? "Action Lifted" : "Enforcement Issued",
          title: `${a.action_type?.replace(/_/g, " ") || "Action"} ${isLifted ? "lifted" : "issued"}`,
          detail: a.reason || a.violation_type || "—",
          date: a.start_date || (a.created_date ? new Date(a.created_date).toLocaleDateString() : "—"),
          time: a.created_date ? new Date(a.created_date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "—",
          icon: isLifted ? "CheckCircle" : "AlertTriangle",
          color: isLifted ? "#10B981" : "#F59E0B",
        });
      });

      // Verification records → history entries
      (verificationRecords || []).forEach((v) => {
        const isVerified = v.status === "verified";
        history.push({
          type: isVerified ? "Verification Approved" : "Verification Update",
          title: `${v.verification_type?.replace(/_/g, " ") || "Verification"} ${v.status}`,
          detail: v.failure_reason || `Status: ${v.status}`,
          date: v.verified_date || (v.created_date ? new Date(v.created_date).toLocaleDateString() : "—"),
          time: v.created_date ? new Date(v.created_date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "—",
          icon: isVerified ? "BadgeCheck" : "AlertTriangle",
          color: isVerified ? "#2F80ED" : "#EF4444",
        });
      });

      // Sort by date descending
      history.sort((a, b) => new Date(b.date + " " + b.time) - new Date(a.date + " " + a.time));

      // Build score breakdown from real data
      const phoneVerified = (verificationRecords || []).some((v) => v.verification_type === "phone" && v.status === "verified");
      const emailVerified = (verificationRecords || []).some((v) => v.verification_type === "email" && v.status === "verified");
      const identityVerified = (verificationRecords || []).some((v) => v.verification_type === "identity" && v.status === "verified");
      const faceVerified = (verificationRecords || []).some((v) => v.verification_type === "face" && v.status === "verified");

      const accountVerifScore = (phoneVerified ? 10 : 0) + (emailVerified ? 10 : 0);
      const identityVerifScore = (identityVerified ? 10 : 0) + (faceVerified ? 10 : 0);

      const profileFields = [userProfile.avatar_url, userProfile.bio, userProfile.username, userProfile.full_name, userProfile.country, userProfile.gender, userProfile.dob].filter(Boolean);
      const profileCompletionPct = Math.round((profileFields.length / 7) * 100);
      const profileScore = Math.round((profileCompletionPct / 100) * 15);

      const eventCount = (securityEvents || []).length;
      const activityScore = Math.min(15, Math.round(eventCount * 1.5));

      const violationCount = (enforcementActions || []).filter((a) => a.status === "active").length;
      const behaviorScore = Math.max(0, 10 - violationCount * 2);

      const contentScore = Math.min(10, Math.round(((securityEvents || []).filter((e) => !["content_violation", "spam_detected", "harassment"].includes(e.event_type)).length / Math.max(1, eventCount)) * 10));

      const hasTransactions = userProfile.coins > 0 || userProfile.gifts_sent > 0 || userProfile.gifts_received > 0;
      const paymentScore = hasTransactions ? 5 : 0;

      const securityScore = (securityEvents || []).filter((e) => e.severity === "critical" || e.severity === "high").length === 0 ? 5 : 2;

      const scoreBreakdown = [
        { label: "Account Verification", weight: 20, score: accountVerifScore, max: 20, suggestion: phoneVerified && emailVerified ? "Fully verified!" : "Complete phone and email verification for full marks." },
        { label: "Identity Verification", weight: 20, score: identityVerifScore, max: 20, suggestion: identityVerified && faceVerified ? "Identity fully verified!" : "Upload a government-issued ID and complete face verification." },
        { label: "Profile Completion", weight: 15, score: profileScore, max: 15, suggestion: profileCompletionPct >= 100 ? "Profile complete!" : `Profile ${profileCompletionPct}% complete. Add more details.` },
        { label: "Activity & Engagement", weight: 15, score: activityScore, max: 15, suggestion: activityScore >= 15 ? "Highly active!" : "Log in daily and join live rooms to increase engagement." },
        { label: "Community Behavior", weight: 10, score: behaviorScore, max: 10, suggestion: violationCount === 0 ? "Clean record!" : `${violationCount} active violation${violationCount !== 1 ? "s" : ""}. Maintain good behavior.` },
        { label: "Content Quality", weight: 10, score: contentScore, max: 10, suggestion: contentScore >= 10 ? "Excellent content!" : "Host more quality live streams." },
        { label: "Payment Reliability", weight: 5, score: paymentScore, max: 5, suggestion: paymentScore >= 5 ? "Active payment history." : "Make your first recharge to build payment reliability." },
        { label: "Security Status", weight: 5, score: securityScore, max: 5, suggestion: securityScore >= 5 ? "No security issues!" : "Resolve security alerts to improve your score." },
      ];

      const computedScore = scoreBreakdown.reduce((sum, b) => sum + b.score, 0);

      // Map badges to display format
      const badgeRecords = (badges || []).map((b) => ({
        name: b.name,
        icon: b.icon || "Award",
        color: b.color || "#2F80ED",
        description: b.description || "",
        category: b.category || "special",
        unlocked: true,
        requirement: b.description || "",
        benefits: b.description || "",
        date: b.created_date ? new Date(b.created_date).toLocaleDateString() : null,
      }));

      // Add locked badges from achievements that aren't unlocked
      const lockedAchievements = (achievements || []).filter((a) => !a.is_unlocked).map((a) => ({
        name: a.name,
        icon: a.icon || "Lock",
        color: a.color || "#9CA3AF",
        description: a.description || "",
        category: "achievement",
        unlocked: false,
        requirement: a.description || "",
        benefits: a.description || "",
        date: null,
      }));

      const allBadges = [...badgeRecords, ...lockedAchievements];

      // Trust tier based on score
      const trustTier = trustScore >= 92 ? "Diamond Tier" : trustScore >= 85 ? "Platinum Tier" : trustScore >= 75 ? "Gold Tier" : trustScore >= 60 ? "Silver Tier" : "Bronze Tier";

      // Reputation rank (approximate based on user position)
      const reputationRank = userProfile.id ? `#${Math.max(1, 1000 - trustScore * 10)}` : "—";

      const summary = [
        { label: "Badges", value: String(allBadges.filter((b) => b.unlocked).length), icon: "Award", color: "#F59E0B" },
        { label: "Warnings", value: String(violationCount), icon: "AlertTriangle", color: "#EF4444" },
        { label: "Trust Tier", value: trustTier.replace(" Tier", ""), icon: "Crown", color: "#D4AF37" },
        { label: "Account Age", value: userProfile.created_date ? `${Math.floor((Date.now() - new Date(userProfile.created_date).getTime()) / (1000 * 60 * 60 * 24))}d` : "0d", icon: "Calendar", color: "#2F80ED" },
        { label: "Verifications", value: String((verificationRecords || []).filter((v) => v.status === "verified").length), icon: "BadgeCheck", color: "#10B981" },
        { label: "Active Alerts", value: String((securityEvents || []).filter((e) => e.status === "active").length), icon: "AlertTriangle", color: "#EF4444" },
        { label: "Security Events", value: String(eventCount), icon: "Shield", color: "#3B8266" },
        { label: "Verification", value: identityVerified ? "Verified" : "Pending", icon: "BadgeCheck", color: identityVerified ? "#2F80ED" : "#F59E0B" },
      ];

      setData({
        trustScore: trustScore || computedScore,
        trustScoreMax: 100,
        trustPercentage: trustScore || computedScore,
        reputationLevel: getTrustLevel(trustScore || computedScore),
        trustTier,
        communityStatus: violationCount === 0 ? "Trusted by the community" : `${violationCount} active warning${violationCount !== 1 ? "s" : ""}`,
        reputationRank,
        overallPerformance: (trustScore || computedScore) >= 75 ? "Excellent" : (trustScore || computedScore) >= 50 ? "Good" : "Needs Improvement",
        summary,
        scoreBreakdown,
        badges: allBadges,
        history,
        verificationStatus: userProfile.verification_status || "unverified",
        safetyStatus: userProfile.safety_status || "medium",
        isVerified: userProfile.is_verified || false,
        profileCompletion: profileCompletionPct,
        activityScore: userProfile.activity_score || activityScore,
        reputationRating: userProfile.reputation_rating || 0,
      });
    } catch (err) {
      console.error("useTrustReputation error:", err);
    } finally {
      setLoading(false);
    }
  }, [authUser?.id]);

  useEffect(() => {
    load();
    const unsubs = [
      base44.entities.SecurityEvent?.subscribe?.(load),
      base44.entities.EnforcementAction?.subscribe?.(load),
      base44.entities.VerificationRecord?.subscribe?.(load),
      base44.entities.Badge?.subscribe?.(load),
      base44.entities.Achievement?.subscribe?.(load),
    ];
    return () => unsubs.forEach((u) => u && u());
  }, [load]);

  return { data, loading, refetch: load };
}

function getTrustLevel(score) {
  if (score >= 99) return "Legend Trusted";
  if (score >= 96) return "Royal Trusted";
  if (score >= 92) return "Diamond Trusted";
  if (score >= 85) return "Platinum Trusted";
  if (score >= 75) return "Gold Trusted";
  if (score >= 60) return "Silver Trusted";
  return "Bronze Trusted";
}