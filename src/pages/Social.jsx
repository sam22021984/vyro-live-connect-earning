import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { SOCIAL_MODULES } from "@/components/relationship/relationshipData";
import { useToast } from "@/components/ui/use-toast";

export default function Social() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleClick = (mod) => {
    if (mod.path) {
      navigate(mod.path);
    } else {
      toast({ title: mod.name + " coming soon" });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FC]">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-4 py-3 flex items-center gap-3">
          <button onClick={() => navigate("/more-services")} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center active:scale-95 transition">
            <ArrowLeft size={18} className="text-gray-700" />
          </button>
          <div className="flex-1">
            <h1 className="text-base font-bold text-gray-800">Social</h1>
            <p className="text-[10px] text-gray-400">Connect with your community</p>
          </div>
        </div>

        {/* Modules grid */}
        <div className="p-4">
          <div className="grid grid-cols-2 gap-3">
            {SOCIAL_MODULES.map((mod, i) => (
              <button
                key={i}
                onClick={() => handleClick(mod)}
                className={"relative flex flex-col items-center justify-center gap-2.5 p-5 rounded-3xl transition-all duration-200 active:scale-95 " + (mod.highlight ? "text-white" : "bg-white border border-gray-100")}
                style={mod.highlight
                  ? { background: "linear-gradient(135deg, #EC4899 0%, #A855F7 100%)", boxShadow: "0 8px 24px rgba(236,72,153,0.35), inset 0 1px 0 rgba(255,255,255,0.2)" }
                  : { boxShadow: "0 4px 12px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)" }
                }
              >
                {mod.highlight && (
                  <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[8px] font-bold text-white" style={{ background: "rgba(255,255,255,0.2)" }}>
                    NEW
                  </span>
                )}
                <div
                  className={"w-14 h-14 rounded-2xl flex items-center justify-center " + (mod.highlight ? "" : "bg-gradient-to-br " + mod.gradient)}
                  style={mod.highlight
                    ? { background: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)" }
                    : { boxShadow: "0 3px 8px rgba(0,0,0,0.12), inset 0 1px 1px rgba(255,255,255,0.35)" }
                  }
                >
                  <span className="text-2xl" style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.15))" }}>{mod.icon}</span>
                </div>
                <span className={"text-sm font-bold " + (mod.highlight ? "text-white" : "text-gray-700")}>{mod.name}</span>
              </button>
            ))}
          </div>

          {/* Info banner */}
          <div className="mt-4 rounded-2xl p-4 text-center" style={{ background: "linear-gradient(135deg, #FDF2F8, #FAF5FF)" }}>
            <span className="text-2xl">❤️</span>
            <p className="text-xs font-semibold text-gray-600 mt-1">Find your special someone</p>
            <p className="text-[10px] text-gray-400 mt-0.5">Send a relationship request and connect meaningfully</p>
          </div>
        </div>
      </div>
    </div>
  );
}