import React, { useState } from "react";
import { ChevronDown, Check, X, PartyPopper } from "lucide-react";

const DARK = "#0F1B3D";
const PINK = "#EC4899";
const PURPLE = "#8B5CF6";
const WHITE = "#FFFFFF";
const GRAY = "#6B7280";

const POLICY = {
  position: "Event Manager (EM)",
  department: "Management Department",
  reporting: "Business Manager (BM)",
  purpose: "The Event Manager is responsible for planning, organizing, executing, and managing all platform events, live campaigns, seasonal programs, competitions, and engagement activities. The role ensures maximum user participation, engagement growth, and successful execution of all official events on the platform.",
  authority: {
    may: [
      "Plan and execute events",
      "Schedule live campaigns",
      "Manage event timelines",
      "Coordinate with PK Manager for competitions",
      "Coordinate with Reward Manager for event rewards",
      "Monitor event performance",
      "Suggest new event ideas",
      "Submit event reports to Business Manager",
      "Track user engagement during events",
    ],
    mayNot: [
      "Approve financial transactions",
      "Change platform policies",
      "Modify commission systems",
      "Access Owner or Country Manager systems",
      "Change reward rules independently",
      "Override Business Manager decisions",
      "Manipulate event results",
      "Create unauthorized events without approval",
    ],
  },
  responsibilities: [
    { icon: "🎯", title: "Event Planning", items: ["Design new platform events", "Create event schedules", "Define event objectives", "Plan seasonal campaigns"] },
    { icon: "🎬", title: "Event Execution", items: ["Launch official events", "Manage live event operations", "Ensure smooth execution", "Handle real-time event issues"] },
    { icon: "🤝", title: "Coordination", items: ["Work with PK Manager for competitions", "Work with Reward Manager for incentives", "Coordinate with Marketing Manager for promotions", "Coordinate with Support Manager for user issues"] },
    { icon: "📊", title: "Event Monitoring", items: ["Track participation rates", "Monitor engagement levels", "Analyze event performance", "Improve future events"] },
    { icon: "📢", title: "Communication", items: ["Announce event details", "Provide updates during events", "Ensure clear user communication"] },
  ],
  expectations: ["Successfully execute events", "Increase user participation", "Improve engagement metrics", "Deliver smooth event operations", "Maintain event quality standards", "Ensure timely execution"],
  kpis: ["Event participation rate", "Event success rate", "User engagement growth", "Event completion rate", "Campaign performance", "User satisfaction", "Error-free execution rate"],
  financial: {
    responsible: ["Monitoring event reward budgets", "Ensuring reward alignment with approved structure", "Tracking campaign performance", "Supporting financial transparency in events"],
    note: "Event Managers do NOT control company funds, approve payments, or modify financial rules.",
  },
  eventComponents: [
    { icon: "🎉", title: "Live Events", items: ["Live streaming events", "Special guest events", "Interactive sessions"] },
    { icon: "🏆", title: "Competitions", items: ["PK battles", "Ranking competitions", "Seasonal tournaments"] },
    { icon: "🎯", title: "Campaign Events", items: ["Marketing campaigns", "Growth campaigns", "User engagement campaigns"] },
    { icon: "🌟", title: "Seasonal Events", items: ["Festival events", "Holiday campaigns", "Special promotions"] },
  ],
  prohibited: [
    { icon: "⚠️", title: "Event Abuse", items: ["Fake events", "Unauthorized campaigns", "Manipulated participation"] },
    { icon: "⚡", title: "Authority Misuse", items: ["Personal use of events", "Bias in event results", "Unauthorized event creation"] },
    { icon: "💰", title: "Financial Violations", items: ["Fake reward distribution", "Unauthorized reward claims", "Budget manipulation"] },
    { icon: "📋", title: "Compliance Violations", items: ["Ignoring company policies", "Concealing issues", "Misreporting event results"] },
  ],
  compensation: ["Management commission", "Event performance bonuses", "Campaign success rewards", "Engagement incentives", "Seasonal bonuses", "Annual performance awards"],
  benefits: ["Event Manager Badge", "Premium Profile Frame", "Exclusive Chat Bubble", "VIP Event Access", "Leadership Recognition", "Priority Support", "Event Hosting Privileges", "Performance Awards"],
  disciplinary: [
    { level: 1, action: "Official Warning", color: "#F59E0B" },
    { level: 2, action: "Performance Review", color: "#FB923C" },
    { level: 3, action: "Authority Restriction", color: "#F97316" },
    { level: 4, action: "Position Suspension", color: "#EF4444" },
    { level: 5, action: "Position Termination", color: "#DC2626" },
  ],
  confidentiality: ["Share internal event plans", "Share confidential reports", "Leak campaign strategies", "Disclose reward structures", "Share user engagement data"],
  conduct: ["Maintain fairness", "Ensure transparency", "Follow company policies", "Support engagement growth", "Act professionally", "Respect users and teams"],
};

export default function EventManagerPolicyTab() {
  const [expanded, setExpanded] = useState("authority");
  const toggle = (id) => setExpanded(expanded === id ? null : id);

  return (
    <div className="space-y-3 animate-fadeIn">
      {/* Hero */}
      <div className="rounded-2xl p-4 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0F1B3D 0%, #1A2952 50%, #831843 100%)" }}>
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #EC4899, transparent 70%)", transform: "translate(30%, -30%)" }} />
        <div className="relative text-center">
          <div className="text-3xl mb-1">🌐</div>
          <h2 className="text-base font-bold text-white">VYRO LIVE CONNECT</h2>
          <p className="text-[11px] mt-1" style={{ color: PINK }}>Event Manager (EM) Policy, Authority, Responsibilities & Terms</p>
        </div>
      </div>

      {/* Position info */}
      <div className="rounded-2xl p-4 space-y-3" style={{ background: WHITE, border: "1px solid #E5E7EB", boxShadow: "0 4px 12px rgba(0,0,0,0.04)" }}>
        <div className="flex items-center gap-2">
          <PartyPopper size={14} style={{ color: PINK }} />
          <h3 className="text-xs font-bold" style={{ color: DARK }}>Position & Department</h3>
        </div>
        <div className="space-y-2">
          <div>
            <p className="text-[9px]" style={{ color: GRAY }}>POSITION TITLE</p>
            <p className="text-xs font-bold" style={{ color: PINK }}>{POLICY.position}</p>
          </div>
          <div>
            <p className="text-[9px]" style={{ color: GRAY }}>DEPARTMENT</p>
            <p className="text-xs font-bold" style={{ color: DARK }}>{POLICY.department}</p>
          </div>
          <div>
            <p className="text-[9px]" style={{ color: GRAY }}>REPORTING TO</p>
            <p className="text-[11px] font-semibold" style={{ color: PURPLE }}>🏢 {POLICY.reporting}</p>
          </div>
          <div className="pt-2 border-t" style={{ borderColor: "#F3F4F6" }}>
            <p className="text-[9px] mb-1" style={{ color: GRAY }}>ROLE PURPOSE</p>
            <p className="text-[11px] leading-relaxed" style={{ color: GRAY }}>{POLICY.purpose}</p>
          </div>
        </div>
      </div>

      <CollapsibleCard id="authority" title="Authority Level" icon="🔐" expanded={expanded} toggle={toggle} accent={PINK}>
        <p className="text-[11px] mb-3" style={{ color: GRAY }}>Event Manager has operational authority over event-related activities only.</p>
        <div className="space-y-3">
          <div>
            <p className="text-[10px] font-bold mb-2" style={{ color: "#27AE60" }}>✅ Event Manager MAY:</p>
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
            <p className="text-[10px] font-bold mb-2" style={{ color: "#EB5757" }}>❌ Event Manager MAY NOT:</p>
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

      <CollapsibleCard id="responsibilities" title="Primary Responsibilities" icon="📋" expanded={expanded} toggle={toggle} accent={PURPLE}>
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
                    <Check size={10} style={{ color: PURPLE }} />
                    <span className="text-[11px]" style={{ color: GRAY }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CollapsibleCard>

      <CollapsibleCard id="expectations" title="Performance Expectations" icon="📈" expanded={expanded} toggle={toggle} accent={PINK}>
        <div className="space-y-2">
          {POLICY.expectations.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <Check size={11} style={{ color: PINK }} />
              <span className="text-[11px]" style={{ color: GRAY }}>{item}</span>
            </div>
          ))}
        </div>
      </CollapsibleCard>

      <CollapsibleCard id="kpis" title="Key Performance Indicators (KPIs)" icon="📊" expanded={expanded} toggle={toggle} accent={PURPLE}>
        <div className="grid grid-cols-2 gap-2">
          {POLICY.kpis.map((item, i) => (
            <div key={i} className="rounded-xl p-2.5 text-center" style={{ background: "#8B5CF608", border: "1px solid #8B5CF615" }}>
              <p className="text-[10px]" style={{ color: GRAY }}>{item}</p>
            </div>
          ))}
        </div>
      </CollapsibleCard>

      <CollapsibleCard id="financial" title="Financial Responsibilities" icon="💰" expanded={expanded} toggle={toggle} accent={PINK}>
        <div className="space-y-3">
          <div>
            <p className="text-[10px] font-bold mb-2" style={{ color: "#27AE60" }}>✅ Responsible for:</p>
            <div className="space-y-1.5">
              {POLICY.financial.responsible.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Check size={10} style={{ color: "#27AE60" }} />
                  <span className="text-[11px]" style={{ color: GRAY }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="pt-2 border-t" style={{ borderColor: "#F3F4F6" }}>
            <p className="text-[10px] font-bold mb-2" style={{ color: "#EB5757" }}>❌ Do NOT:</p>
            <div className="rounded-xl p-3" style={{ background: "#EB575708", border: "1px solid #EB575710" }}>
              <p className="text-[11px]" style={{ color: "#EB5757" }}>{POLICY.financial.note}</p>
            </div>
          </div>
        </div>
      </CollapsibleCard>

      <CollapsibleCard id="eventComponents" title="Event System Components" icon="🎁" expanded={expanded} toggle={toggle} accent={PURPLE}>
        <div className="space-y-3">
          {POLICY.eventComponents.map((r, i) => (
            <div key={i} className="rounded-xl p-3" style={{ background: "#F7F9FC" }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{r.icon}</span>
                <p className="text-xs font-bold" style={{ color: DARK }}>{r.title}</p>
              </div>
              <div className="space-y-1.5">
                {r.items.map((item, j) => (
                  <div key={j} className="flex items-center gap-2">
                    <Check size={10} style={{ color: PURPLE }} />
                    <span className="text-[11px]" style={{ color: GRAY }}>{item}</span>
                  </div>
                ))}
              </div>
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

      <CollapsibleCard id="compensation" title="Compensation & Benefits" icon="💰" expanded={expanded} toggle={toggle} accent={PINK}>
        <p className="text-[11px] mb-3" style={{ color: GRAY }}>Eligible Event Managers may receive:</p>
        <div className="space-y-2">
          {POLICY.compensation.map((item, i) => (
            <div key={i} className="flex items-center gap-2 rounded-xl p-2.5" style={{ background: "#EC489908" }}>
              <span className="text-sm">💰</span>
              <span className="text-[11px]" style={{ color: GRAY }}>{item}</span>
            </div>
          ))}
        </div>
      </CollapsibleCard>

      <CollapsibleCard id="benefits" title="Benefits" icon="🎁" expanded={expanded} toggle={toggle} accent={PINK}>
        <p className="text-[11px] mb-3" style={{ color: GRAY }}>Qualified Event Managers may receive:</p>
        <div className="space-y-2">
          {POLICY.benefits.map((item, i) => (
            <div key={i} className="flex items-center gap-2 rounded-xl p-2.5" style={{ background: "#EC489908" }}>
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

      <CollapsibleCard id="confidentiality" title="Confidentiality" icon="🔒" expanded={expanded} toggle={toggle} accent={PURPLE}>
        <p className="text-[11px] mb-3" style={{ color: GRAY }}>Event Managers must not:</p>
        <div className="space-y-2">
          {POLICY.confidentiality.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <X size={11} style={{ color: "#EB5757" }} />
              <span className="text-[11px]" style={{ color: GRAY }}>{item}</span>
            </div>
          ))}
        </div>
      </CollapsibleCard>

      <CollapsibleCard id="conduct" title="Professional Conduct" icon="🤝" expanded={expanded} toggle={toggle} accent={PINK}>
        <p className="text-[11px] mb-3" style={{ color: GRAY }}>Event Managers must:</p>
        <div className="space-y-2">
          {POLICY.conduct.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <Check size={11} style={{ color: PINK }} />
              <span className="text-[11px]" style={{ color: GRAY }}>{item}</span>
            </div>
          ))}
        </div>
      </CollapsibleCard>

      {/* Agreement */}
      <div className="rounded-2xl p-4 text-center" style={{ background: "linear-gradient(135deg, #0F1B3D 0%, #1A2952 50%, #831843 100%)" }}>
        <div className="text-2xl mb-2">📜</div>
        <h3 className="text-sm font-bold text-white mb-2">Agreement</h3>
        <p className="text-[11px] text-white/60 leading-relaxed">
          By serving as an Event Manager on VYRO Live Connect, the Event Manager agrees to comply with all platform policies, event procedures, operational standards, compliance requirements, and future updates.
        </p>
      </div>

      <div className="text-center pt-1">
        <p className="text-[10px] font-bold tracking-wider" style={{ color: `${PINK}99` }}>END OF EVENT MANAGER POLICY DOCUMENT</p>
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