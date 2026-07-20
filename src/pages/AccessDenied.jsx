import React from "react";
import { useNavigate } from "react-router-dom";
import { ShieldAlert, ArrowLeft } from "lucide-react";

export default function AccessDenied() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F7F9FC] flex flex-col items-center justify-center px-6 text-center">
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
        style={{ background: "rgba(239,68,68,0.1)" }}
      >
        <ShieldAlert size={32} className="text-red-500" />
      </div>
      <h1 className="text-lg font-bold text-gray-800 mb-1">Access Denied</h1>
      <p className="text-xs text-gray-500 mb-6 max-w-xs leading-relaxed">
        You don't have permission to view this page. Finance Manager access is
        restricted to authorized administrators (AO, SAM, FM) only.
      </p>
      <button
        onClick={() => navigate("/")}
        className="px-6 py-2.5 rounded-xl text-xs font-bold text-white active:scale-95 transition inline-flex items-center gap-1.5"
        style={{ background: "linear-gradient(135deg, #0F1B3D, #1A2952)" }}
      >
        <ArrowLeft size={14} /> Back to Home
      </button>
    </div>
  );
}