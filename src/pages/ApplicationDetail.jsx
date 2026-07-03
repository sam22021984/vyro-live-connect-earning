import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Check, Upload, Search, ChevronRight, Loader2, FileText, X } from "lucide-react";
import { applicationTypes } from "@/components/apply/applyData";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";

export default function ApplicationDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const app = applicationTypes.find((a) => a.id === id);
  const [submitted, setSubmitted] = useState(false);
  const [submittedAppId, setSubmittedAppId] = useState("");
  const [formData, setFormData] = useState({});
  const [agencyMode, setAgencyMode] = useState("manual");
  const [agencyId, setAgencyId] = useState("");
  const [agentId, setAgentId] = useState("");
  const [documents, setDocuments] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [allResults, setAllResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searching, setSearching] = useState(false);

  // Fetch real agencies/agents when in search mode
  useEffect(() => {
    if (agencyMode !== "search") return;
    let cancelled = false;
    const fetchAgenciesAgents = async () => {
      setSearching(true);
      try {
        const res = await base44.functions.invoke("roleApplications", {
          action: "searchAgenciesAgents",
          query: "",
        });
        if (!cancelled && res.data?.results) {
          setAllResults(res.data.results);
        }
      } catch {
        // fallback to empty
      } finally {
        if (!cancelled) setSearching(false);
      }
    };
    fetchAgenciesAgents();
    return () => { cancelled = true; };
  }, [agencyMode]);

  // Filter locally without destroying source data
  const filteredResults = searchQuery
    ? allResults.filter(r =>
        r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (r.global_id || "").toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allResults;

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

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    setUploading(true);
    try {
      const uploaded = [];
      for (const file of files) {
        const file_base64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result.split(",")[1]);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
        const res = await base44.functions.invoke("uploadFile", {
          file_base64,
          filename: file.name,
          content_type: file.type,
        });
        const file_url = res.data?.file_url;
        if (file_url) {
          uploaded.push({ name: file.name, url: file_url });
        }
      }
      setDocuments((prev) => [...prev, ...uploaded]);
      toast({ title: `${uploaded.length} file(s) uploaded` });
    } catch (err) {
      toast({ title: "Upload failed", description: err.message, variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const removeDocument = (idx) => {
    setDocuments((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await base44.functions.invoke("roleApplications", {
        action: "submit",
        application_type: id,
        application_type_name: app.name,
        form_data: formData,
        document_urls: documents.map((d) => d.url),
        agency_id: agencyId || undefined,
        agent_id: agentId || undefined,
        reviewing_authority: app.route,
      });
      const appId = res.data?.application?.id || "";
      setSubmittedAppId(appId);
      setSubmitted(true);
    } catch (err) {
      toast({ title: "Submission failed", description: err.message, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
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
                  <span className="text-xs font-bold text-gray-700 font-mono">{submittedAppId.slice(-8).toUpperCase()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-400">Status</span>
                  <span className="text-xs font-bold text-amber-500">Pending Review</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-400">Reviewing Authority</span>
                  <span className="text-xs font-bold text-gray-700">{app.route}</span>
                </div>
                {documents.length > 0 && (
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-400">Documents</span>
                    <span className="text-xs font-bold text-green-500">{documents.length} uploaded</span>
                  </div>
                )}
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
                  <div>
                    <label className="border-2 border-dashed border-gray-200 rounded-xl p-4 flex flex-col items-center gap-1 cursor-pointer hover:border-indigo-300 transition">
                      {uploading ? (
                        <>
                          <Loader2 size={18} className="text-indigo-400 animate-spin" />
                          <span className="text-[10px] text-indigo-400">Uploading...</span>
                        </>
                      ) : (
                        <>
                          <Upload size={18} className="text-gray-400" />
                          <span className="text-[10px] text-gray-400">Tap to upload document</span>
                          <span className="text-[9px] text-gray-300">PDF, JPG, PNG — max 10MB</span>
                        </>
                      )}
                      <input type="file" multiple accept="image/*,application/pdf" onChange={handleFileUpload} className="hidden" disabled={uploading} />
                    </label>
                    {documents.length > 0 && (
                      <div className="mt-2 space-y-1.5">
                        {documents.map((doc, idx) => (
                          <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-green-50 border border-green-100">
                            <FileText size={12} className="text-green-500 flex-shrink-0" />
                            <span className="text-[10px] text-gray-600 flex-1 truncate">{doc.name}</span>
                            <button type="button" onClick={() => removeDocument(idx)}>
                              <X size={12} className="text-gray-400 hover:text-red-400" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
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
                    <input type="text" value={agencyId} onChange={(e) => setAgencyId(e.target.value)} placeholder="Enter Agency ID" className="w-full text-xs rounded-xl border border-gray-200 px-3 py-2.5 focus:outline-none focus:border-indigo-400" />
                    <input type="text" value={agentId} onChange={(e) => setAgentId(e.target.value)} placeholder="Enter Agent ID" className="w-full text-xs rounded-xl border border-gray-200 px-3 py-2.5 focus:outline-none focus:border-indigo-400" />
                  </div>
                ) : (
                  <div className="relative">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      placeholder="Search approved agencies & agents..."
                      className="w-full text-xs rounded-xl border border-gray-200 pl-9 pr-3 py-2.5 focus:outline-none focus:border-indigo-400"
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <div className="mt-2 space-y-1.5">
                      {searching ? (
                        <div className="flex items-center justify-center py-3">
                          <Loader2 size={14} className="text-indigo-400 animate-spin" />
                        </div>
                      ) : filteredResults.length === 0 ? (
                        <p className="text-[10px] text-gray-400 text-center py-2">No approved agencies or agents found</p>
                      ) : (
                        filteredResults.map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => {
                              if (item.role === 'agency') setAgencyId(item.global_id);
                              else setAgentId(item.global_id);
                            }}
                            className={`w-full flex items-center justify-between p-2.5 rounded-xl transition ${(item.role === 'agency' ? agencyId : agentId) === item.global_id ? 'bg-indigo-100 border border-indigo-300' : 'bg-gray-50 hover:bg-indigo-50'}`}
                          >
                            <span className="text-xs text-gray-600">{item.name} ({item.global_id})</span>
                            <ChevronRight size={14} className="text-gray-400" />
                          </button>
                        ))
                      )}
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

          <button type="submit" disabled={submitting} className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-bold shadow-lg shadow-indigo-200 active:scale-95 transition disabled:opacity-50 flex items-center justify-center gap-2">
            {submitting ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
            {submitting ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      </div>
    </div>
  );
}