import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, FileText, Clock, CheckCircle, XCircle, Search, Loader2 } from "lucide-react";
import { applicationTypes, statusTypes } from "@/components/apply/applyData";
import { base44 } from "@/api/base44Client";

export default function ApplyCenter() {
  const navigate = useNavigate();
  const [view, setView] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const me = await base44.auth.me();
        if (!me?.id) { setLoading(false); return; }
        const apps = await base44.entities.RoleApplication.filter(
          { user_id: me.id },
          "-created_date",
          50
        );
        setApplications(apps);
      } catch (e) {
        console.error("Failed to load applications:", e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const getStatus = (key) => statusTypes.find((s) => s.key === key) || statusTypes[0];

  const stats = {
    pending: applications.filter((a) => a.status === "pending" || a.status === "verification").length,
    approved: applications.filter((a) => a.status === "approved").length,
    rejected: applications.filter((a) => a.status === "rejected").length,
  };

  if (view === "status") {
    return (
      <div className="min-h-screen bg-[#F8F9FC]">
        <div className="max-w-md mx-auto">
          <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-4 py-3 flex items-center gap-3">
            <button onClick={() => setView("home")} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center active:scale-95 transition">
              <ArrowLeft size={18} className="text-gray-700" />
            </button>
            <h1 className="text-base font-bold text-gray-800">Application Status</h1>
          </div>

          <div className="p-4 space-y-3">
            {/* Status legend */}
            <div className="bg-white rounded-2xl p-4 border border-gray-50 shadow-sm">
              <h3 className="text-xs font-bold text-gray-700 mb-3">Status Types</h3>
              <div className="grid grid-cols-2 gap-2">
                {statusTypes.map((s) => (
                  <div key={s.key} className={`flex items-center gap-2 p-2 rounded-lg ${s.bg} border ${s.border}`}>
                    <span className="text-sm">{s.icon}</span>
                    <span className={`text-[10px] font-semibold ${s.color}`}>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* My applications */}
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider px-1 pt-2">My Applications</h3>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-indigo-400" />
              </div>
            ) : applications.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 border border-gray-50 shadow-sm text-center">
                <FileText size={32} className="text-gray-300 mx-auto mb-2" />
                <p className="text-xs text-gray-400">No applications yet</p>
                <button onClick={() => setView("home")} className="mt-3 text-xs font-bold text-indigo-500">Browse Applications</button>
              </div>
            ) : (
              applications.map((app) => {
                const status = getStatus(app.status);
                const date = app.submitted_date ? new Date(app.submitted_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—";
                return (
                  <div key={app.id} className="bg-white rounded-2xl p-4 border border-gray-50 shadow-sm">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="text-sm font-bold text-gray-800">{app.application_type_name}</h4>
                        <p className="text-[10px] text-gray-400 font-mono">{app.id.slice(-8).toUpperCase()}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${status.bg} ${status.color} border ${status.border} flex items-center gap-1`}>
                        {status.icon} {status.label}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <p className="text-gray-400 text-[10px]">Submitted</p>
                        <p className="text-gray-700 font-semibold">{date}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-[10px]">Reviewing Authority</p>
                        <p className="text-gray-700 font-semibold">{app.reviewing_authority || "—"}</p>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
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
          <div className="flex-1">
            <h1 className="text-base font-bold text-gray-800">Apply Center</h1>
            <p className="text-[10px] text-gray-400">Application & Approval Workflow</p>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {/* Hero banner */}
          <div className="rounded-2xl p-4 bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-200">
            <div className="flex items-center gap-2 mb-1">
              <FileText size={16} />
              <h2 className="text-sm font-bold">Application Hierarchy</h2>
            </div>
            <p className="text-xs text-white/80">Apply for roles within the VYRO Live Connect ecosystem. Each application follows a structured approval workflow.</p>
          </div>

          {/* Quick stats — live */}
          <div className="grid grid-cols-3 gap-2.5">
            <div className="bg-white rounded-xl p-3 border border-gray-50 shadow-sm text-center">
              <Clock size={16} className="text-amber-500 mx-auto mb-1" />
              <p className="text-lg font-bold text-gray-800">{loading ? "—" : stats.pending}</p>
              <p className="text-[10px] text-gray-400">Pending</p>
            </div>
            <div className="bg-white rounded-xl p-3 border border-gray-50 shadow-sm text-center">
              <CheckCircle size={16} className="text-green-500 mx-auto mb-1" />
              <p className="text-lg font-bold text-gray-800">{loading ? "—" : stats.approved}</p>
              <p className="text-[10px] text-gray-400">Approved</p>
            </div>
            <div className="bg-white rounded-xl p-3 border border-gray-50 shadow-sm text-center">
              <XCircle size={16} className="text-red-500 mx-auto mb-1" />
              <p className="text-lg font-bold text-gray-800">{loading ? "—" : stats.rejected}</p>
              <p className="text-[10px] text-gray-400">Rejected</p>
            </div>
          </div>

          {/* Application types */}
          <div>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-1">Application Modules</h3>
            <div className="grid grid-cols-2 gap-2.5">
              {applicationTypes.map((app) => (
                <button
                  key={app.id}
                  onClick={() => navigate(`/apply-center/${app.id}`)}
                  className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white border border-gray-50 active:scale-95 transition shadow-sm hover:shadow-md text-center"
                >
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${app.gradient} flex items-center justify-center`}
                    style={{ boxShadow: "0 3px 8px rgba(0,0,0,0.15), inset 0 1px 1px rgba(255,255,255,0.3)" }}
                  >
                    <span className="text-xl">{app.icon}</span>
                  </div>
                  <span className="text-[11px] font-semibold text-gray-700 leading-tight">{app.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Track status button */}
          <button
            onClick={() => setView("status")}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-bold shadow-lg shadow-indigo-200 active:scale-95 transition flex items-center justify-center gap-2"
          >
            <Search size={16} />
            Track Application Status
          </button>
        </div>
      </div>
    </div>
  );
}