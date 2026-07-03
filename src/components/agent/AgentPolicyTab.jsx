import React, { useState } from "react";
import { ChevronDown, Check, X, User } from "lucide-react";

const DARK = "#0F1B3D";
const PURPLE = "#8B5CF6";
const BLUE = "#3B82F6";
const WHITE = "#FFFFFF";
const GRAY = "#6B7280";

const POLICY = {
  position: "Agent",
  department: "Agency & Host Management",
  reporting: "Admin (AN)",
  manages: ["Hosts"],
  purpose: "An Agent is responsible for recruiting, guiding, supporting, monitoring, and developing Hosts. The Agent acts as the primary communication bridge between Hosts and the platform's administrative structure. The Agent is responsible for helping Hosts grow, remain active, follow platform policies, and achieve performance targets.",
  authority: {
    may: [
      "Recruit new Hosts",
      "Manage assigned Hosts",
      "Monitor Host performance",
      "Assist Hosts with platform guidance",
      "Recommend Hosts for rewards",
      "Submit reports to Admin",
      "Support platform campaigns and events",
      "Help resolve basic Host issues",
    ],
    mayNot: [
      "Access Admin systems",
      "Access financial systems",
      "Approve withdrawals",
      "Approve rewards directly",
      "Modify commission structures",
      "Change platform settings",
      "Create fake accounts",
      "Manipulate Host earnings",
      "Suspend or terminate accounts",
    ],
  },
  responsibilities: [
    { icon: "🎯", title: "Host Recruitment", items: ["Recruit quality Hosts", "Verify Host information before submission", "Support onboarding of new Hosts"] },
    { icon: "👥", title: "Host Management", items: ["Monitor Host activity", "Guide Hosts on platform rules", "Improve Host retention", "Encourage consistent participation"] },
    { icon: "📊", title: "Performance Monitoring", items: ["Track Host performance", "Monitor weekly and monthly targets", "Identify inactive Hosts", "Report performance concerns"] },
    { icon: "💬", title: "Communication", items: ["Act as the first support point for Hosts", "Escalate unresolved issues to Admin", "Maintain professional communication"] },
    { icon: "🎉", title: "Event Participation", items: ["Inform Hosts about events", "Encourage participation", "Support event engagement"] },
  ],
  expectations: ["Maintain active Host networks", "Support Host growth", "Achieve recruitment targets", "Improve Host retention rates", "Ensure policy compliance", "Submit accurate reports"],
  kpis: ["Active Hosts count", "Host retention rate", "Host performance results", "Weekly target achievements", "Event participation levels", "Platform growth contribution"],
  prohibited: [
    { icon: "⚠️", title: "Fraud & Abuse", items: ["Fake Host registrations", "Fake gifting activity", "Self-generated transactions", "Revenue manipulation", "Artificial performance inflation"] },
    { icon: "🎯", title: "Recruitment Violations", items: ["Recruiting fake users", "Duplicate account creation", "Identity manipulation"] },
    { icon: "💰", title: "Financial Violations", items: ["Unauthorized collection of funds", "Unauthorized commission requests", "False financial claims"] },
    { icon: "⚡", title: "Administrative Violations", items: ["Impersonating Admin staff", "Misusing platform authority", "Sharing internal system information"] },
  ],
  compensation: ["Agent commissions", "Performance bonuses", "Recruitment rewards", "Event incentives", "Special campaign rewards", "Seasonal bonuses"],
  benefits: ["Agent Badge", "Exclusive Profile Frame", "Agent Recognition Status", "Special Event Access", "Priority Support", "Performance Rewards", "VIP Benefits (based on achievements)", "Leadership Recognition Programs"],
  disciplinary: [
    { level: 1, action: "Official Warning", color: "#F59E0B" },
    { level: 2, action: "Temporary Restrictions", color: "#FB923C" },
    { level: 3, action: "Commission Suspension", color: "#F97316" },
    { level: 4, action: "Agent Status Removal", color: "#EF4444" },
    { level: 5, action: "Permanent Account Termination", color: "#DC2626" },
  ],
  confidentiality: ["Share internal reports", "Share Host private information", "Share commission structures", "Leak platform business information", "Disclose administrative decisions"],
  conduct: ["Treat all Hosts fairly", "Maintain professionalism", "Avoid discrimination", "Follow platform policies", "Respect user privacy"],
};

export default function AgentPolicyTab() {
  const [expanded, setExpanded] = useState("authority");
  const toggle = (id) => setExpanded(expanded === id ? null : id);

  return (
    <div className="space-y-3 animate-fadeIn">
      {/* Hero */}
      <div className="rounded-2xl p-4 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0F1B3D 0%, #1A2952 50%, #2D1B69 100%)" }}>
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #8B5CF6, transparent 70%)", transform: "translate(30%, -30%)" }} />
        <div className="relative text-center">
          <div className="text-3xl mb-1">🌐</div>
          <h2 className="text-base font-bold text-white">VYRO LIVE CONNECT</h2>
          <p className="text-[11px] mt-1" style={{ color: PURPLE }}>Agent Policy, Authority, Responsibilities & Terms</p>
        </div>
      </div>

      {/* Position info */}
      <div className="rounded-2xl p-4 space-y-3" style={{ background: WHITE, border: "1px solid #E5E7EB", boxShadow: "0 4px 12px rgba(0,0,0,0.04)" }}>
        <div className="flex items-center gap-2">
          <User size={14} style={{ color: PURPLE }} />
          <h3 className="text-xs font-bold" style={{ color: DARK }}>Position & Department</h3>
        </div>
        <div className="space-y-2">
          <div>
            <p className="text-[9px]" style={{ color: GRAY }}>POSITION TITLE</p>
            <p className="text-xs font-bold" style={{ color: PURPLE }}>{POLICY.position}</p>
          </div>
          <div>
            <p className="text-[9px]" style={{ color: GRAY }}>DEPARTMENT</p>
            <p className="text-xs font-bold" style={{ color: DARK }}>{POLICY.department}</p>
          </div>
          <div>
            <p className="text-[9px]" style={{ color: GRAY }}>REPORTING TO</p>
            <p className="text-[11px] font-semibold" style={{ color: BLUE }}>{POLICY.reporting}</p>
          </div>
          <div className="pt-2 border-t" style={{ borderColor: "#F3F4F6" }}>
            <p className="text-[9px] mb-2" style={{ color: GRAY }}>👥 MANAGES</p>
            <div className="flex flex-wrap gap-1.5">
              {POLICY.manages.map((m, i) => (
                <span key={i} className="text-[10px] px-2 py-1 rounded-full" style={{ background: `${PURPLE}10`, color: PURPLE }}>{m}</span>
              ))}
            </div>
          </div>
          <div className="pt-2 border-t" style={{ borderColor: "#F3F4F6" }}>
            <p className="text-[9px] mb-1" style={{ color: GRAY }}>ROLE PURPOSE</p>
            <p className="text-[11px] leading-relaxed" style={{ color: GRAY }}>{POLICY.purpose}</p>
          </div>
        </div>
      </div>

      <CollapsibleCard id="authority" title="Authority Level" icon="🔐" expanded={expanded} toggle={toggle} accent={PURPLE}>
        <p className="text-[11px] mb-3" style={{ color: GRAY }}>Agents have limited management authority over their assigned Hosts.</p>
        <div className="space-y-3">
          <div>
            <p className="text-[10px] font-bold mb-2" style={{ color: "#27AE60" }}>✅ Agents MAY:</p>
            <div className="space-y-1.5">
              {POLICY.authority.may.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#27AE6015" }}>
                    <Check size={10} style={{ color: "#27AE60" }} />
                  </div>
                  <span className="text-[11px]" style={{ color: GRAY }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="pt-2 border-t" style={{ borderColor: "#F3F4F6" }}>
            <p className="text-[10px] font-bold mb-2" style={{ color: "#EB5757" }}>❌ Agents MAY NOT:</p>
            <div className="space-y-1.5">
              {POLICY.authority.mayNot.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#EB575715" }}>
                    <X size={10} style={{ color: "#EB5757" }} />
                  </div>
                  <span className="text-[11px]" style={{ color: GRAY }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CollapsibleCard>

      <CollapsibleCard id="responsibilities" title="Primary Responsibilities" icon="📋" expanded={expanded} toggle={toggle} accent={BLUE}>
        <div className="space-y-3">
          {POLICY.responsibilities.map((r, i) => (
            <div key={i} className="rounded-xl p-3" style={{ background: "#F7F9FC" }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{r.icon}</span>
                <p className="text-xs font-bold" style={{ color: DARK }}>{r.title}</p>
              </div>
              <div className="space-y-1.5">
                {r.items.map((item, j) => (
                  <div key={j} className="flex items-center gap-2">
                    <Check size={10} style={{ color: BLUE }} />
                    <span className="text-[11px]" style={{ color: GRAY }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CollapsibleCard>

      <CollapsibleCard id="expectations" title="Performance Expectations" icon="📈" expanded={expanded} toggle={toggle} accent={PURPLE}>
        <div className="space-y-2">
          {POLICY.expectations.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <Check size={11} style={{ color: PURPLE }} />
              <span className="text-[11px]" style={{ color: GRAY }}>{item}</span>
            </div>
          ))}
        </div>
      </CollapsibleCard>

      <CollapsibleCard id="kpis" title="Key Performance Indicators (KPIs)" icon="📊" expanded={expanded} toggle={toggle} accent={BLUE}>
        <div className="grid grid-cols-2 gap-2">
          {POLICY.kpis.map((item, i) => (
            <div key={i} className="rounded-xl p-2.5 text-center" style={{ background: "#3B82F608", border: "1px solid #3B82F615" }}>
              <p className="text-[10px]" style={{ color: GRAY }}>{item}</p>
            </div>
          ))}
        </div>
      </CollapsibleCard>

      <CollapsibleCard id="prohibited" title="Prohibited Activities" icon="🚫" expanded={expanded} toggle={toggle} accent="#EB5757">
        <div className="space-y-3">
          {POLICY.prohibited.map((p, i) => (
            <div key={i} className="rounded-xl p-3" style={{ background: "#EB575706", border: "1px solid #EB575710" }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{p.icon}</span>
                <p className="text-xs font-bold" style={{ color: DARK }}>{p.title}</p>
              </div>
              <div className="space-y-1.5">
                {p.items.map((item, j) => (
                  <div key={j} className="flex items-center gap-2">
                    <X size={10} style={{ color: "#EB5757" }} />
                    <span className="text-[11px]" style={{ color: GRAY }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CollapsibleCard>

      <CollapsibleCard id="compensation" title="Commission & Rewards" icon="💰" expanded={expanded} toggle={toggle} accent={PURPLE}>
        <p className="text-[11px] mb-3" style={{ color: GRAY }}>Eligible Agents may receive:</p>
        <div className="space-y-2">
          {POLICY.compensation.map((item, i) => (
            <div key={i} className="flex items-center gap-2 rounded-xl p-2.5" style={{ background: "#8B5CF608" }}>
              <span className="text-sm">💰</span>
              <span className="text-[11px]" style={{ color: GRAY }}>{item}</span>
            </div>
          ))}
        </div>
        <p className="text-[10px] mt-3" style={{ color: GRAY }}>All rewards and commissions are subject to platform verification and approval.</p>
      </CollapsibleCard>

      <CollapsibleCard id="benefits" title="Benefits" icon="🎁" expanded={expanded} toggle={toggle} accent={PURPLE}>
        <p className="text-[11px] mb-3" style={{ color: GRAY }}>Qualified Agents may receive:</p>
        <div className="space-y-2">
          {POLICY.benefits.map((item, i) => (
            <div key={i} className="flex items-center gap-2 rounded-xl p-2.5" style={{ background: "#8B5CF608" }}>
              <span className="text-sm">🎁</span>
              <span className="text-[11px]" style={{ color: GRAY }}>{item}</span>
            </div>
          ))}
        </div>
      </CollapsibleCard>

      <CollapsibleCard id="disciplinary" title="Disciplinary Actions" icon="⚠️" expanded={expanded} toggle={toggle} accent="#EB5757">
        <div className="space-y-2">
          {POLICY.disciplinary.map((d) => (
            <div key={d.level} className="rounded-xl p-3 flex items-center gap-3" style={{ background: `${d.color}10`, border: `1px solid ${d.color}20` }}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ background: d.color }}>
                {d.level}
              </div>
              <div className="flex-1">
                <p className="text-[9px]" style={{ color: GRAY }}>Level {d.level}</p>
                <p className="text-xs font-bold" style={{ color: d.color }}>{d.action}</p>
              </div>
            </div>
          ))}
        </div>
      </CollapsibleCard>

      <CollapsibleCard id="confidentiality" title="Confidentiality" icon="🔒" expanded={expanded} toggle={toggle} accent={BLUE}>
        <p className="text-[11px] mb-3" style={{ color: GRAY }}>Agents must not:</p>
        <div className="space-y-2">
          {POLICY.confidentiality.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <X size={11} style={{ color: "#EB5757" }} />
              <span className="text-[11px]" style={{ color: GRAY }}>{item}</span>
            </div>
          ))}
        </div>
      </CollapsibleCard>

      <CollapsibleCard id="conduct" title="Professional Conduct" icon="🤝" expanded={expanded} toggle={toggle} accent={PURPLE}>
        <p className="text-[11px] mb-3" style={{ color: GRAY }}>Agents must:</p>
        <div className="space-y-2">
          {POLICY.conduct.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <Check size={11} style={{ color: PURPLE }} />
              <span className="text-[11px]" style={{ color: GRAY }}>{item}</span>
            </div>
          ))}
        </div>
      </CollapsibleCard>

      {/* Agreement */}
      <div className="rounded-2xl p-4 text-center" style={{ background: "linear-gradient(135deg, #0F1B3D 0%, #1A2952 50%, #2D1B69 100%)" }}>
        <div className="text-2xl mb-2">📜</div>
        <h3 className="text-sm font-bold text-white mb-2">Agreement</h3>
        <p className="text-[11px] text-white/60 leading-relaxed">
          By serving as an Agent on VYRO Live Connect, the Agent agrees to comply with all platform policies, reporting requirements, operational procedures, compliance standards, and future platform updates.
        </p>
      </div>

      <div className="text-center pt-1">
        <p className="text-[10px] font-bold tracking-wider" style={{ color: `${PURPLE}99` }}>END OF AGENT POLICY DOCUMENT</p>
      </div>
    </div>
  );
}

function CollapsibleCard({ id, title, icon, expanded, toggle, accent, children }) {
  const isOpen = expanded === id;
  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: WHITE, border: `1px solid ${accent}20` }}>
      <button onClick={() => toggle(id)} className="w-full p-4 flex items-center gap-3 active:scale-[0.98] transition">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg" style={{ background: `${accent}15` }}>
          {icon}
        </div>
        <h3 className="flex-1 text-left text-sm font-bold" style={{ color: DARK }}>{title}</h3>
        <ChevronDown size={18} style={{ color: GRAY }} className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && <div className="px-4 pb-4 animate-fadeIn">{children}</div>}
    </div>
  );
}