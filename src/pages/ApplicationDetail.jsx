import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Check, Upload, Search, ChevronRight } from "lucide-react";
import { applicationTypes } from "@/components/apply/applyData";

export default function ApplicationDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const app = applicationTypes.find((a) => a.id === id);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({});
  const [agencyMode, setAgencyMode] = useState("manual");

  if (!app) {
    return (
      <div className="min-h-screen bg-[#F8F9FC] flex items-center justify-center">
        <p className="text-sm text-gray-400">Application not found</p>
      </div>
    );
  }

  const handleFieldChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#F8F9FC]">
        <div className="max-w-md mx-auto">
          <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-4 py-3 flex items-center gap-3">
            <button onClick={() => navigate("/more-services")} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center active:scale-95 transition">
              <ArrowLeft size={18} className="text-gray-700" />
            </button>
            <h1 className="text-base font-bold text-gray-800">{app.name}</h1>
          </div>

          <div className="p-4">
            <div className="bg-white rounded-3xl p-8 border border-gray-50 shadow-sm text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <Check size={32} className="text-green-500" />
              </div>
              <h2 className="text-base font-bold text-gray-800 mb-1">Application Submitted!</h2>
              <p className="text-xs text-gray-400 mb-4">Your application has been sent to the {app.route} for review.</p>

              <div className="bg-gray-50 rounded-2xl p-4 text-left space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-xs text-gray-400">Application ID</span>
                  <span className="text-xs font-bold text-gray-700 font-mono">APP-{Date.now().toString().slice(-6)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-400">Status</span>
                  <span className="text-xs font-bold text-amber-500">Pending Review</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-400">Reviewing Authority</span>
                  <span className="text-xs font-bold text-gray-700">{app.route}</span>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <p className="text-xs font-semibold text-gray-600">After Approval:</p>
                {app.afterApproval.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 justify-center">
                    <Check size={12} className="text-green-500" />
                    <span className="text-xs text-gray-600">{item}</span>
                  </div>
                ))}
              </div>

              <button onClick={() => navigate("/more-services")} className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-bold active:scale-95 transition">
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FC]">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-4 py-3 flex items-center gap-3">
          <button onClick={() => navigate("/more-services")} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center active:scale-95 transition">
            <ArrowLeft size={18} className="text-gray-700" />
          </button>
          <h1 className="text-base font-bold text-gray-800 truncate">{app.name}</h1>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* App icon + eligibility */}
          <div className="bg-white rounded-2xl p-4 border border-gray-50 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${app.gradient} flex items-center justify-center`}
                style={{ boxShadow: "0 3px 8px rgba(0,0,0,0.15), inset 0 1px 1px rgba(255,255,255,0.3)" }}
              >
                <span className="text-xl">{app.icon}</span>
              </div>
              <div>
                <h2 className="text-sm font-bold text-gray-800">{app.name}</h2>
                <p className="text-[10px] text-gray-400">Routes to: {app.route}</p>
              </div>
            </div>
            <div className="bg-amber-50 rounded-xl p-3 border border-amber-100">
              <p className="text-[10px] font-bold text-amber-600 mb-0.5">Eligibility</p>
              <p className="text-xs text-amber-700">{app.eligibility}</p>
            </div>
          </div>

          {/* Form fields */}
          <div className="bg-white rounded-2xl p-4 border border-gray-50 shadow-sm space-y-3">
            <h3 className="text-xs font-bold text-gray-700">Application Form</h3>
            {app.fields.map((field) => (
              <div key={field}>
                <label className="text-xs font-semibold text-gray-600 mb-1 block">{field}</label>
                {field.includes("Document") ? (
                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 flex flex-col items-center gap-1 cursor-pointer hover:border-indigo-300 transition">
                    <Upload size={18} className="text-gray-400" />
                    <span className="text-[10px] text-gray-400">Tap to upload document</span>
                  </div>
                ) : field.includes("Experience") ? (
                  <textarea
                    value={formData[field] || ""}
                    onChange={(e) => handleFieldChange(field, e.target.value)}
                    placeholder={`Enter ${field.toLowerCase()}`}
                    rows={3}
                    className="w-full text-xs rounded-xl border border-gray-200 px-3 py-2 focus:outline-none focus:border-indigo-400 resize-none"
                  />
                ) : (
                  <input
                    type="text"
                    value={formData[field] || ""}
                    onChange={(e) => handleFieldChange(field, e.target.value)}
                    placeholder={`Enter ${field.toLowerCase()}`}
                    className="w-full text-xs rounded-xl border border-gray-200 px-3 py-2.5 focus:outline-none focus:border-indigo-400"
                  />
                )}
              </div>
            ))}

            {/* Agency/Agent selection for Host Application */}
            {app.hasAgencySelection && (
              <div className="pt-2">
                <label className="text-xs font-semibold text-gray-600 mb-2 block">Agency / Agent Selection</label>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <button
                    type="button"
                    onClick={() => setAgencyMode("manual")}
                    className={`py-2 rounded-xl text-xs font-semibold transition ${agencyMode === "manual" ? "bg-indigo-500 text-white" : "bg-gray-50 text-gray-500 border border-gray-200"}`}
                  >
                    Option A: Enter ID
                  </button>
                  <button
                    type="button"
                    onClick={() => setAgencyMode("search")}
                    className={`py-2 rounded-xl text-xs font-semibold transition ${agencyMode === "search" ? "bg-indigo-500 text-white" : "bg-gray-50 text-gray-500 border border-gray-200"}`}
                  >
                    Option B: Search List
                  </button>
                </div>
                {agencyMode === "manual" ? (
                  <div className="space-y-2">
                    <input type="text" placeholder="Enter Agency ID" className="w-full text-xs rounded-xl border border-gray-200 px-3 py-2.5 focus:outline-none focus:border-indigo-400" />
                    <input type="text" placeholder="Enter Agent ID" className="w-full text-xs rounded-xl border border-gray-200 px-3 py-2.5 focus:outline-none focus:border-indigo-400" />
                  </div>
                ) : (
                  <div className="relative">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" placeholder="Search approved agencies & agents..." className="w-full text-xs rounded-xl border border-gray-200 pl-9 pr-3 py-2.5 focus:outline-none focus:border-indigo-400" />
                    <div className="mt-2 space-y-1.5">
                      {["Elite Agency (AG-001)", "Prime Agency (AG-002)", "Agent Khan (AGT-101)", "Agent Ahmed (AGT-102)"].map((item) => (
                        <button key={item} type="button" className="w-full flex items-center justify-between p-2.5 rounded-xl bg-gray-50 hover:bg-indigo-50 transition">
                          <span className="text-xs text-gray-600">{item}</span>
                          <ChevronRight size={14} className="text-gray-400" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Workflow info */}
          <div className="bg-white rounded-2xl p-4 border border-gray-50 shadow-sm">
            <h3 className="text-xs font-bold text-gray-700 mb-2">Approval Workflow</h3>
            <div className="space-y-2">
              {["Submit Application", `${app.route} Reviews`, "Approval Decision", "Role Activation"].map((step, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center text-[10px] font-bold text-indigo-500">{i + 1}</div>
                  <span className="text-xs text-gray-600">{step}</span>
                </div>
              ))}
            </div>
          </div>

          <button type="submit" className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-bold shadow-lg shadow-indigo-200 active:scale-95 transition">
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
}