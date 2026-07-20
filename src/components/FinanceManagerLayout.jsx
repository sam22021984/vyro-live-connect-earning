import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useRoleGuard } from "@/hooks/useRoleGuard";

/**
 * FinanceManagerLayout — separate shell for all /finance-manager/* routes.
 *
 * Removes the normal user app shell (bottom nav, party/community/go-live/
 * inbox/profile navigation) and restricts access to Finance Manager roles.
 *
 * Access is restricted to:
 *   - AO  (Application Owner)  → role "owner"
 *   - SAM (Super Admin Manager) → role "admin" / "owner"
 *   - FM  (Finance Manager)     → role "admin"
 *
 * Unauthorized users are redirected to /access-denied.
 */
const ALLOWED_ROLES = ["admin", "owner"];

export default function FinanceManagerLayout() {
  const { role, loading } = useRoleGuard();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F9FC]">
        <div className="w-8 h-8 border-4 border-amber-200 border-t-amber-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!ALLOWED_ROLES.includes(role)) {
    return <Navigate to="/access-denied" replace />;
  }

  return <Outlet />;
}