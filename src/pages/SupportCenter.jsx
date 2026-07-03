import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft, Search, RefreshCw, MoreHorizontal, Book, MessageCircle,
  Headset, Bell, Smartphone, Ban, ChevronRight, X, Flag, AlertTriangle,
  UserX, CreditCard, Copyright, ShieldAlert, Ticket, MessageSquare,
  Megaphone, Wrench, Download, Send, Paperclip, Mic, Smile, LifeBuoy,
  CheckCircle, Clock,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  SUPPORT_OPTIONS, SUPPORT_FAQS, SUPPORT_ANNOUNCEMENTS,
  SUPPORT_SECURITY_REPORTS, SUPPORT_NOTIFICATIONS,
} from "@/components/support-center/supportCenterData";
import { useServicesData } from "@/hooks/useServicesData";

const ICONS = {
  Book, MessageCircle, Headset, Bell, Smartphone, Ban, Flag, AlertTriangle,
  UserX, CreditCard, Copyright, ShieldAlert, Ticket, MessageSquare,
  Megaphone, Wrench, Download, ChevronRight, X, Send, Paperclip, Mic,
  Smile, LifeBuoy, CheckCircle, Clock, Search, RefreshCw, MoreHorizontal,
  ArrowLeft,
};

const WHITE = "#FFFFFF";
const SOFT_BG = "#F7F9FC";
const DARK = "#0F1B3D";
const GRAY = "#6B7280";

function Card({ children, className = "" }) {
  return <div className={`rounded-2xl p-4 ${className}`} style={{ background: WHITE, border: "1px solid #E5E7EB", boxShadow: "0 4px 12px rgba(0,0,0,0.04)" }}>{children}</div>;
}

export default function SupportCenter() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data, createSupportTicket } = useServicesData();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeOption, setActiveOption] = useState(null);
  const [feedbackSubject, setFeedbackSubject] = useState("");
  const [feedbackDesc, setFeedbackDesc] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const ticketStats = data?.support?.stats || { total: 0, open: 0, pending: 0, resolved: 0, closed: 0 };

  const handleSubmitFeedback = async () => {
    if (!feedbackSubject.trim() || !feedbackDesc.trim()) {
      toast({ title: "Please fill in all fields", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    try {
      await createSupportTicket(feedbackSubject, feedbackDesc, "feedback", "medium");
      toast({ title: "✅ Feedback Submitted", description: "Our team will review your feedback." });
      setFeedbackSubject("");
      setFeedbackDesc("");
      setActiveOption(null);
    } catch (err) {
      toast({ title: "Failed to submit", description: err.message, variant: "destructive" });
    }
    setSubmitting(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast({ title: "Searching...", description: `Searching support articles for "${searchQuery}"` });
    }
  };

  const filteredFaqs = searchQuery.trim()
    ? SUPPORT_FAQS.filter(f => f.q.toLowerCase().includes(searchQuery.toLowerCase()) || f.a.toLowerCase().includes(searchQuery.toLowerCase()))
    : SUPPORT_FAQS;

  const handleAction = (action) => {
    toast({ title: action, description: "This feature will be available soon." });
  };

  return (
    <div className="min-h-screen" style={{ background: SOFT_BG }}>
      <div className="max-w-md mx-auto pb-8">
        {/* Header */}
        <div className="sticky top-0 z-30 px-4 py-3 flex items-center gap-3" style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid #E5E7EB" }}>
          <button onClick={() => navigate("/more-services")} className="w-9 h-9 rounded-full flex items-center justify-center active:scale-95 transition" style={{ background: "#F7F9FC" }}>
            <ArrowLeft size={18} style={{ color: DARK }} />
          </button>
          <div className="flex-1">
            <h1 className="text-base font-bold" style={{ color: DARK }}>Support Center</h1>
            <p className="text-[10px]" style={{ color: GRAY }}>How can we help you?</p>
          </div>
          <button onClick={() => handleAction("Refresh")} className="w-9 h-9 rounded-full flex items-center justify-center active:scale-95 transition" style={{ background: "#F7F9FC" }}>
            <RefreshCw size={16} style={{ color: DARK }} />
          </button>
          <button onClick={() => handleAction("More Options")} className="w-9 h-9 rounded-full flex items-center justify-center active:scale-95 transition" style={{ background: "#F7F9FC" }}>
            <MoreHorizontal size={18} style={{ color: DARK }} />
          </button>
        </div>

        {/* Search Bar */}
        <div className="px-4 pt-4">
          <form onSubmit={handleSearch} className="flex items-center gap-2 rounded-2xl p-3" style={{ background: WHITE, border: "1px solid #E5E7EB" }}>
            <Search size={18} style={{ color: GRAY }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search FAQ, articles, tickets, updates..."
              className="flex-1 bg-transparent text-sm outline-none"
              style={{ color: DARK }}
            />
            {searchQuery && (
              <button type="button" onClick={() => setSearchQuery("")} className="w-6 h-6 rounded-full flex items-center justify-center">
                <X size={14} style={{ color: GRAY }} />
              </button>
            )}
          </form>
        </div>

        {/* Hero Banner */}
        <div className="px-4 pt-4">
          <div className="rounded-2xl p-4 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #2F80ED 0%, #56CCF2 100%)", boxShadow: "0 8px 24px rgba(47,128,237,0.2)" }}>
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #FFFFFF, transparent 70%)", transform: "translate(30%, -30%)" }} />
            <div className="relative">
              <div className="flex items-center gap-2 mb-2">
                <LifeBuoy size={20} className="text-white" />
                <h2 className="text-base font-bold text-white">We're Here to Help</h2>
              </div>
              <p className="text-[11px] text-white/90 mb-3 leading-relaxed">
                Browse help articles, submit feedback, or reach our support team directly. Find solutions for common problems, account issues, payments, security, and technical support.
              </p>
              <div className="flex flex-wrap gap-2">
                <button onClick={() => setActiveOption("help")} className="text-[10px] px-3 py-1.5 rounded-full font-bold active:scale-95 transition" style={{ background: "rgba(255,255,255,0.2)", color: "white" }}>
                  Browse Help Center
                </button>
                <button onClick={() => setActiveOption("support")} className="text-[10px] px-3 py-1.5 rounded-full font-bold active:scale-95 transition" style={{ background: "rgba(255,255,255,0.2)", color: "white" }}>
                  Contact Support
                </button>
                <button onClick={() => setActiveOption("help")} className="text-[10px] px-3 py-1.5 rounded-full font-bold active:scale-95 transition" style={{ background: "rgba(255,255,255,0.2)", color: "white" }}>
                  View FAQs
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Options Grid */}
        <div className="px-4 pt-4">
          <h3 className="text-xs font-bold mb-3" style={{ color: DARK }}>Support Services</h3>
          <div className="grid grid-cols-2 gap-2.5">
            {SUPPORT_OPTIONS.map((opt) => {
              const Icon = ICONS[opt.icon] || Book;
              return (
                <button
                  key={opt.id}
                  onClick={() => setActiveOption(opt.id)}
                  className="rounded-2xl p-3 flex flex-col items-center gap-2 active:scale-95 transition text-center"
                  style={{ background: WHITE, border: "1px solid #E5E7EB", boxShadow: "0 4px 10px rgba(0,0,0,0.04)" }}
                >
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: opt.gradient, boxShadow: `0 4px 12px ${opt.color}30` }}>
                    <Icon size={22} className="text-white" />
                  </div>
                  <span className="text-[11px] font-bold" style={{ color: DARK }}>{opt.title}</span>
                  <p className="text-[9px] leading-tight" style={{ color: GRAY }}>{opt.description}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* New Updates Section */}
        <div className="px-4 pt-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold" style={{ color: DARK }}>New Updates & Announcements</h3>
            <button onClick={() => setActiveOption("updates")} className="text-[10px] font-semibold" style={{ color: "#2F80ED" }}>View All</button>
          </div>
          <Card className="space-y-3">
            {SUPPORT_ANNOUNCEMENTS.map((a, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${a.color}10` }}>
                  <Bell size={14} style={{ color: a.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs font-semibold truncate" style={{ color: DARK }}>{a.title}</p>
                    {a.isNew && <span className="text-[7px] px-1 py-0.5 rounded-full font-bold text-white" style={{ background: "#EB5757" }}>NEW</span>}
                  </div>
                  <p className="text-[10px]" style={{ color: GRAY }}>{a.type} • {a.time}</p>
                </div>
                <ChevronRight size={14} style={{ color: GRAY }} />
              </div>
            ))}
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="px-4 pt-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold" style={{ color: DARK }}>Frequently Asked Questions</h3>
            <button onClick={() => setActiveOption("help")} className="text-[10px] font-semibold" style={{ color: "#2F80ED" }}>View All</button>
          </div>
          <div className="space-y-2">
            {filteredFaqs.map((faq, i) => (
              <Card key={i} className="py-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "#2F80ED10" }}>
                    <Book size={14} style={{ color: "#2F80ED" }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold mb-1" style={{ color: DARK }}>{faq.q}</p>
                    <p className="text-[11px] leading-relaxed" style={{ color: GRAY }}>{faq.a}</p>
                    <span className="inline-block mt-1.5 text-[8px] px-1.5 py-0.5 rounded-full font-semibold" style={{ background: "#2F80ED08", color: "#2F80ED" }}>{faq.category}</span>
                  </div>
                </div>
              </Card>
            ))}
            {filteredFaqs.length === 0 && (
              <Card className="text-center py-6">
                <p className="text-xs" style={{ color: GRAY }}>No articles found for "{searchQuery}"</p>
              </Card>
            )}
          </div>
        </div>

        {/* Security & Reports */}
        <div className="px-4 pt-4">
          <h3 className="text-xs font-bold mb-3" style={{ color: DARK }}>Security & Reports</h3>
          <Card>
            <div className="grid grid-cols-3 gap-2">
              {SUPPORT_SECURITY_REPORTS.map((s, i) => {
                const Icon = ICONS[s.icon] || Flag;
                return (
                  <button key={i} onClick={() => handleAction(s.label)} className="rounded-xl p-2.5 flex flex-col items-center gap-1.5 active:scale-95 transition" style={{ background: `${s.color}08`, border: `1px solid ${s.color}15` }}>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${s.color}15` }}>
                      <Icon size={14} style={{ color: s.color }} />
                    </div>
                    <span className="text-[9px] font-semibold text-center leading-tight" style={{ color: DARK }}>{s.label}</span>
                  </button>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Notifications */}
        <div className="px-4 pt-4">
          <h3 className="text-xs font-bold mb-3" style={{ color: DARK }}>Support Notifications</h3>
          <Card>
            <div className="space-y-2">
              {SUPPORT_NOTIFICATIONS.map((n, i) => {
                const Icon = ICONS[n.icon] || Bell;
                return (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${n.color}10` }}>
                      <Icon size={14} style={{ color: n.color }} />
                    </div>
                    <span className="text-xs flex-1" style={{ color: DARK }}>{n.label}</span>
                    <ChevronRight size={14} style={{ color: GRAY }} />
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Support Chat CTA */}
        <div className="px-4 pt-4">
          <button onClick={() => handleAction("Live Chat")} className="w-full rounded-2xl p-4 flex items-center gap-3 active:scale-95 transition" style={{ background: "linear-gradient(135deg, #27AE60, #2ECC71)", boxShadow: "0 8px 24px rgba(39,174,96,0.2)" }}>
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.2)" }}>
              <MessageSquare size={20} className="text-white" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-bold text-white">Live Chat Support</p>
              <p className="text-[10px] text-white/80">Chat with our AI assistant or human agent</p>
            </div>
            <ChevronRight size={20} className="text-white" />
          </button>
        </div>
      </div>

      {/* Bottom Sheet / Modal */}
      {activeOption && (
        <OptionSheet
          option={SUPPORT_OPTIONS.find(o => o.id === activeOption)}
          onClose={() => setActiveOption(null)}
          onAction={handleAction}
          feedbackSubject={feedbackSubject}
          setFeedbackSubject={setFeedbackSubject}
          feedbackDesc={feedbackDesc}
          setFeedbackDesc={setFeedbackDesc}
          onSubmitFeedback={handleSubmitFeedback}
          submitting={submitting}
        />
      )}
    </div>
  );
}

function OptionSheet({ option, onClose, onAction, feedbackSubject, setFeedbackSubject, feedbackDesc, setFeedbackDesc, onSubmitFeedback, submitting }) {
  if (!option) return null;
  const Icon = ICONS[option.icon] || Book;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white rounded-t-3xl max-h-[85vh] overflow-y-auto animate-fadeIn">
        <div className="sticky top-0 bg-white pt-3 pb-2 z-10">
          <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-3" />
          <div className="flex items-center justify-between px-4">
            <h2 className="text-base font-bold" style={{ color: DARK }}>{option.title}</h2>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center active:scale-95 transition">
              <X size={16} className="text-gray-500" />
            </button>
          </div>
        </div>

        <div className="px-4 pb-6 space-y-4">
          {/* Icon + Description */}
          <div className="flex flex-col items-center py-3">
            <div className="w-16 h-16 rounded-3xl flex items-center justify-center mb-2" style={{ background: option.gradient, boxShadow: `0 6px 20px ${option.color}30` }}>
              <Icon size={28} className="text-white" />
            </div>
            <p className="text-xs text-center leading-relaxed" style={{ color: GRAY, maxWidth: "280px" }}>{option.description}</p>
          </div>

          {/* Features */}
          <div className="rounded-2xl p-3 border border-gray-100">
            <h3 className="text-xs font-bold mb-2" style={{ color: DARK }}>{option.id === "feedback" ? "Feedback Categories" : option.id === "support" ? "Contact Methods" : option.id === "updates" ? "Update Types" : option.id === "appupdate" ? "Features" : option.id === "blacklist" ? "Features" : "Topics"}</h3>
            <div className="flex flex-wrap gap-1.5">
              {option.features.map((f, i) => (
                <span key={i} className="text-[9px] px-2 py-1 rounded-full font-medium" style={{ background: `${option.color}08`, color: option.color }}>{f}</span>
              ))}
            </div>
          </div>

          {/* Ticket Statuses (support only) */}
          {option.ticketStatuses && (
            <div className="rounded-2xl p-3 border border-gray-100">
              <h3 className="text-xs font-bold mb-2" style={{ color: DARK }}>Ticket Status</h3>
              <div className="flex flex-wrap gap-1.5">
                {option.ticketStatuses.map((s, i) => {
                  const statusColor = s === "Resolved" || s === "Closed" ? "#27AE60" : s === "Pending" ? "#F2994A" : "#2F80ED";
                  return (
                    <span key={i} className="text-[9px] px-2 py-1 rounded-full font-medium" style={{ background: `${statusColor}10`, color: statusColor }}>{s}</span>
                  );
                })}
              </div>
            </div>
          )}

          {/* Input Fields (feedback only) */}
          {option.fields && (
            <div className="rounded-2xl p-3 border border-gray-100">
              <h3 className="text-xs font-bold mb-2" style={{ color: DARK }}>Input Fields</h3>
              <div className="space-y-2">
                {option.fields.map((f, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `${option.color}20` }}>
                      <CheckCircle size={12} style={{ color: option.color }} />
                    </div>
                    <span className="text-xs" style={{ color: GRAY }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div>
            <h3 className="text-xs font-bold mb-2" style={{ color: DARK }}>Actions</h3>
            <div className="flex flex-wrap gap-2">
              {option.actions.map((a, i) => (
                <button key={i} onClick={() => onAction(a)} className="text-[10px] px-3 py-1.5 rounded-full font-semibold active:scale-95 transition" style={{ background: `${option.color}10`, color: option.color }}>{a}</button>
              ))}
            </div>
          </div>

          {/* Special content for App Update */}
          {option.id === "appupdate" && (
            <div className="rounded-2xl p-4" style={{ background: `${option.color}08`, border: `1px solid ${option.color}20` }}>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-[10px]" style={{ color: GRAY }}>Current Version</p>
                  <p className="text-sm font-bold" style={{ color: DARK }}>v3.4.2</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px]" style={{ color: GRAY }}>Latest Version</p>
                  <p className="text-sm font-bold" style={{ color: option.color }}>v3.5.0</p>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Clock size={12} style={{ color: option.color }} />
                <span className="text-[10px]" style={{ color: GRAY }}>Update size: 24.8 MB</span>
              </div>
              <button onClick={() => onAction("Download Update")} className="w-full py-2.5 rounded-xl text-white text-xs font-bold active:scale-95 transition" style={{ background: option.gradient }}>
                Download Update
              </button>
            </div>
          )}

          {/* Special content for Blacklist */}
          {option.id === "blacklist" && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold" style={{ color: DARK }}>Blocked Users (3)</h3>
              {[
                { name: "User-3847", reason: "Harassment", date: "2026-06-28", color: "#EB5757" },
                { name: "User-1923", reason: "Spam", date: "2026-06-15", color: "#F2994A" },
                { name: "User-2841", reason: "Fraud", date: "2026-05-30", color: "#EB5757" },
              ].map((u, i) => (
                <div key={i} className="rounded-2xl p-3 border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xs" style={{ background: `linear-gradient(135deg, ${u.color}, ${u.color}cc)` }}>
                      {u.name.slice(-2)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold" style={{ color: DARK }}>{u.name}</p>
                      <p className="text-[10px]" style={{ color: GRAY }}>Blocked: {u.reason} • {u.date}</p>
                    </div>
                    <button onClick={() => onAction("Unblock")} className="text-[10px] px-3 py-1.5 rounded-full font-bold" style={{ background: "#27AE6010", color: "#27AE60" }}>
                      Unblock
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Special content for Feedback form */}
          {option.id === "feedback" && (
            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-bold mb-1 block" style={{ color: DARK }}>Subject</label>
                <input type="text" value={feedbackSubject} onChange={(e) => setFeedbackSubject(e.target.value)} placeholder="Brief description of your feedback" className="w-full rounded-xl px-3 py-2.5 text-xs outline-none" style={{ background: "#F7F9FC", border: "1px solid #E5E7EB", color: DARK }} />
              </div>
              <div>
                <label className="text-[10px] font-bold mb-1 block" style={{ color: DARK }}>Description</label>
                <textarea rows={4} value={feedbackDesc} onChange={(e) => setFeedbackDesc(e.target.value)} placeholder="Tell us more about your experience..." className="w-full rounded-xl px-3 py-2.5 text-xs outline-none resize-none" style={{ background: "#F7F9FC", border: "1px solid #E5E7EB", color: DARK }} />
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => onAction("Attach Screenshot")} className="flex items-center gap-1.5 text-[10px] px-3 py-2 rounded-xl font-semibold" style={{ background: `${option.color}08`, color: option.color }}>
                  <Paperclip size={12} /> Screenshot
                </button>
                <button onClick={() => onAction("Attach Recording")} className="flex items-center gap-1.5 text-[10px] px-3 py-2 rounded-xl font-semibold" style={{ background: `${option.color}08`, color: option.color }}>
                  <Paperclip size={12} /> Recording
                </button>
              </div>
              <button onClick={onSubmitFeedback} disabled={submitting} className="w-full py-2.5 rounded-xl text-white text-xs font-bold active:scale-95 transition disabled:opacity-50" style={{ background: option.gradient }}>
                {submitting ? "Submitting..." : "Submit Feedback"}
              </button>
            </div>
          )}

          {/* Special content for Customer Support */}
          {option.id === "support" && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold" style={{ color: DARK }}>Quick Contact</h3>
              <div className="grid grid-cols-1 gap-2">
                {option.features.map((f, i) => {
                  const contactIcons = { "Live Chat": MessageSquare, "Email Support": Send, "WhatsApp Support": MessageCircle, "Telegram Support": Send, "Phone Support": Headset };
                  const CIcon = contactIcons[f] || Headset;
                  return (
                    <button key={i} onClick={() => onAction(f)} className="rounded-xl p-3 flex items-center gap-3 active:scale-95 transition text-left" style={{ background: `${option.color}08`, border: `1px solid ${option.color}15` }}>
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${option.color}15` }}>
                        <CIcon size={16} style={{ color: option.color }} />
                      </div>
                      <span className="text-xs font-semibold flex-1" style={{ color: DARK }}>{f}</span>
                      <ChevronRight size={16} style={{ color: option.color }} />
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}