import React, { useState } from "react";
import { RELATIONSHIP_COLORS, SAFETY_OPTIONS, SAFETY_GUIDELINES, COMMUNITY_STANDARDS } from "./relationshipData";
import { useToast } from "@/components/ui/use-toast";
import { X } from "lucide-react";

export default function SafetyTab() {
  const { toast } = useToast();
  const [modal, setModal] = useState(null);

  const handleAction = (key) => {
    if (key === "guidelines") setModal("guidelines");
    else if (key === "standards") setModal("standards");
    else if (key === "report") toast({ title: "Report User", description: "Opening report form..." });
    else if (key === "block") toast({ title: "Block User", description: "Opening block list..." });
    else if (key === "unblock") toast({ title: "Unblock User", description: "Opening unblock list..." });
  };

  return (
    <div className="space-y-3">
      <div className="rounded-2xl p-4 text-center backdrop-blur-xl" style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)" }}>
        <span className="text-3xl">🛡️</span>
        <h3 className="text-sm font-bold mt-1" style={{ color: RELATIONSHIP_COLORS.textLight }}>Safety & Reporting</h3>
        <p className="text-[11px] mt-0.5" style={{ color: RELATIONSHIP_COLORS.textMuted }}>Maintain a secure and respectful environment</p>
      </div>

      <div className="space-y-2">
        {SAFETY_OPTIONS.map((opt) => (
          <button
            key={opt.key}
            onClick={() => handleAction(opt.key)}
            className="w-full rounded-2xl p-3 backdrop-blur-xl flex items-center gap-3 transition active:scale-95"
            style={{ background: RELATIONSHIP_COLORS.glassBg, border: `1px solid ${RELATIONSHIP_COLORS.glassBorder}` }}
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ background: `${opt.color}20` }}>
              {opt.icon}
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-bold" style={{ color: RELATIONSHIP_COLORS.textLight }}>{opt.label}</p>
              <p className="text-[10px]" style={{ color: RELATIONSHIP_COLORS.textMuted }}>{opt.desc}</p>
            </div>
          </button>
        ))}
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setModal(null)} />
          <div className="relative w-full max-w-md rounded-t-3xl max-h-[75vh] flex flex-col animate-fadeIn" style={{ background: "#2D1B4E" }}>
            <div className="flex items-center justify-between px-4 pt-4 pb-2 border-b" style={{ borderColor: RELATIONSHIP_COLORS.glassBorder }}>
              <h3 className="text-sm font-bold" style={{ color: RELATIONSHIP_COLORS.textLight }}>
                {modal === "guidelines" ? "🛡️ Safety Guidelines" : "📜 Community Standards"}
              </h3>
              <button onClick={() => setModal(null)} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: RELATIONSHIP_COLORS.glassBg }}>
                <X size={15} style={{ color: RELATIONSHIP_COLORS.textMuted }} />
              </button>
            </div>
            <div className="overflow-y-auto p-4 space-y-2.5">
              {(modal === "guidelines" ? SAFETY_GUIDELINES : COMMUNITY_STANDARDS).map((text, i) => (
                <div key={i} className="flex items-start gap-2.5 rounded-xl p-3" style={{ background: RELATIONSHIP_COLORS.glassBg }}>
                  <span className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0" style={{ background: "linear-gradient(135deg, #EC4899, #A855F7)", color: "#fff" }}>{i + 1}</span>
                  <span className="text-xs leading-relaxed" style={{ color: RELATIONSHIP_COLORS.textLight }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}