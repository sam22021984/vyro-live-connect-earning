import React, { useState } from "react";
import { FileText, Shield, Users, ArrowRight, Check, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DOCUMENTS = [
  { icon: FileText, name: "Terms of Service", desc: "The terms and conditions for using VYRO", color: "#6F35E0", route: "/settings/9" },
  { icon: Shield, name: "Privacy Policy", desc: "How we collect, use, and protect your data", color: "#3B82F6", route: "/settings/9" },
  { icon: Users, name: "Community Guidelines", desc: "Rules to keep VYRO safe and respectful", color: "#10B981", route: "/settings/9" },
];

export default function TermsStep({ onContinue }) {
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);

  return (
    <div>
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-purple-200 to-blue-200 flex items-center justify-center">
          <Shield size={32} className="text-purple-500" />
        </div>
      </div>

      <div className="space-y-3 mb-6">
        {DOCUMENTS.map((doc) => (
          <div key={doc.name} className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-gray-100 shadow-sm">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${doc.color}15` }}>
              <doc.icon size={18} style={{ color: doc.color }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-700">{doc.name}</p>
              <p className="text-[10px] text-gray-400">{doc.desc}</p>
            </div>
            <button
              onClick={() => navigate(doc.route)}
              className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center active:scale-95"
            >
              <ExternalLink size={14} className="text-gray-400" />
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={() => setAgreed(!agreed)}
        className={`w-full flex items-center gap-3 p-4 rounded-2xl border-2 transition active:scale-[0.98] ${
          agreed ? "border-purple-400 bg-purple-50" : "border-gray-100 bg-white"
        }`}
      >
        <div className={`w-6 h-6 rounded-md flex items-center justify-center transition ${agreed ? "bg-purple-500" : "bg-gray-200"}`}>
          {agreed && <Check size={14} className="text-white" />}
        </div>
        <span className={`text-sm font-semibold ${agreed ? "text-purple-700" : "text-gray-600"}`}>
          I Agree to all Terms, Privacy Policy, and Community Guidelines
        </span>
      </button>

      <p className="text-[10px] text-gray-300 mt-3 mb-6 text-center">
        You cannot continue until you agree to the terms.
      </p>

      <button
        onClick={onContinue}
        disabled={!agreed}
        className="w-full rounded-2xl bg-gradient-to-r from-[#6F35E0] to-[#C135E0] text-white font-bold text-sm shadow-lg shadow-purple-200 transition-all active:scale-[0.98] disabled:opacity-40 flex items-center justify-center gap-2"
        style={{ height: "52px" }}
      >
        Continue <ArrowRight size={16} />
      </button>
    </div>
  );
}