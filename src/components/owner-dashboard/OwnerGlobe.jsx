import React from "react";

export default function OwnerGlobe() {
  return (
    <div className="relative w-full flex items-center justify-center py-6">
      {/* Outer rings */}
      <div className="absolute w-48 h-48 rounded-full border" style={{ borderColor: "rgba(47,128,237,0.12)" }} />
      <div className="absolute w-56 h-56 rounded-full border" style={{ borderColor: "rgba(86,204,242,0.08)" }} />
      <div className="absolute w-64 h-64 rounded-full border-2 border-dashed" style={{ borderColor: "rgba(167,139,250,0.1)", animation: "spin 30s linear infinite" }} />

      {/* Orbiting dots */}
      <div className="absolute w-48 h-48" style={{ animation: "spin 12s linear infinite" }}>
        <div className="absolute top-0 left-1/2 w-2 h-2 rounded-full" style={{ background: "#2F80ED", boxShadow: "0 0 8px #2F80ED" }} />
      </div>
      <div className="absolute w-56 h-56" style={{ animation: "spin 18s linear infinite reverse" }}>
        <div className="absolute bottom-0 left-1/2 w-1.5 h-1.5 rounded-full" style={{ background: "#27AE60", boxShadow: "0 0 8px #27AE60" }} />
      </div>

      {/* Globe core */}
      <div
        className="relative w-36 h-36 rounded-full flex items-center justify-center"
        style={{
          background: "radial-gradient(circle at 30% 30%, #FFFFFF, #EEF2F7 50%, #D6E4F5 100%)",
          boxShadow: "0 20px 60px rgba(47,128,237,0.25), 0 8px 24px rgba(167,139,250,0.15), inset 0 -8px 16px rgba(47,128,237,0.08)",
        }}
      >
        {/* Latitude/longitude lines */}
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <div className="absolute inset-0 rounded-full border-2" style={{ borderColor: "rgba(47,128,237,0.12)" }} />
          <div className="absolute top-1/2 left-0 right-0 h-px" style={{ background: "rgba(47,128,237,0.12)" }} />
          <div className="absolute left-1/2 top-0 bottom-0 w-px" style={{ background: "rgba(47,128,237,0.12)" }} />
          <div className="absolute top-1/4 left-0 right-0 h-px" style={{ background: "rgba(86,204,242,0.08)" }} />
          <div className="absolute top-3/4 left-0 right-0 h-px" style={{ background: "rgba(86,204,242,0.08)" }} />
        </div>
        {/* Pulsing activity points */}
        <div className="absolute w-2 h-2 rounded-full" style={{ top: "25%", left: "30%", background: "#27AE60", boxShadow: "0 0 10px #27AE60", animation: "pulse 2s ease-in-out infinite" }} />
        <div className="absolute w-2 h-2 rounded-full" style={{ top: "45%", right: "25%", background: "#EB5757", boxShadow: "0 0 10px #EB5757", animation: "pulse 2.5s ease-in-out infinite" }} />
        <div className="absolute w-1.5 h-1.5 rounded-full" style={{ bottom: "30%", left: "40%", background: "#F2994A", boxShadow: "0 0 10px #F2994A", animation: "pulse 3s ease-in-out infinite" }} />
        <div className="absolute w-1.5 h-1.5 rounded-full" style={{ bottom: "40%", right: "35%", background: "#A78BFA", boxShadow: "0 0 10px #A78BFA", animation: "pulse 2.2s ease-in-out infinite" }} />

        {/* Center label */}
        <div className="relative z-10 text-center">
          <p className="text-[9px] font-bold" style={{ color: "#2F80ED" }}>GLOBAL</p>
          <p className="text-[8px]" style={{ color: "#6B7280" }}>NETWORK</p>
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.4; transform: scale(1.5); } }
      `}</style>
    </div>
  );
}