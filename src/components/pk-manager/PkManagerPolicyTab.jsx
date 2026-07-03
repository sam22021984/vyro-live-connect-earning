import React, { useState } from "react";
import { ChevronDown, Check, X, Swords } from "lucide-react";

const DARK = "#0F1B3D";
const RED = "#EF4444";
const PURPLE = "#8B5CF6";
const WHITE = "#FFFFFF";
const GRAY = "#6B7280";

const POLICY = {
  position: "PK Manager (PM)",
  department: "Management Department",
  reporting: "Business Manager (BM)",
  purpose: "The PK Manager is responsible for managing all PK (Player Knockout / Performance Knockout) activities within the platform. This includes PK battles, rankings, competitions, seasonal championships, fairness monitoring, and PK reward coordination. The PK Manager ensures competitive activities remain fair, engaging, transparent, and aligned with platform rules.",
  authority: {
    may: [
      "Manage PK events and battles",
      "Organize PK seasons and tournaments",
      "Monitor PK rankings",
      "Verify PK results",
      "Recommend PK rewards",
      "Coordinate with Reward Manager for PK incentives",
      "Monitor PK fairness and anti-cheat systems",
      "Review PK performance reports",
      "Submit PK reports to Business Manager",
    ],
    mayNot: [
      "Change platform financial system",
      "Modify commission structures",
      "Approve withdrawals or payments",
      "Access Owner-level controls",
      "Manipulate PK results",
      "Override Business Manager decisions",
      "Change core ranking algorithms without approval",
      "Create unauthorized tournaments",
    ],
  },
  responsibilities: [
    { icon: "⚔️", title: "PK Event Management", items: ["Organize PK battles and competitions", "Schedule PK tournaments", "Manage seasonal PK events", "Ensure smooth execution of PK matches"] },
    { icon: "🏆", title: "Ranking System Management", items: ["Maintain PK rankings", "Update leaderboard systems", "Monitor performance scoring", "Ensure ranking fairness"] },
    { icon: "🛡️", title: "Fair Play Monitoring", items: ["Detect cheating or manipulation", "Enforce anti-fraud rules", "Review suspicious PK activity", "Maintain competitive integrity"] },
    { icon: "🤝", title: "Coordination", items: ["Work with Reward Manager for PK rewards", "Coordinate with Event Manager for PK events", "Align with Business Manager for strategy"] },
    { icon: "📈", title: "Reporting", items: ["Submit PK reports", "Provide performance analysis", "Report system issues"] },
  ],
  expectations: ["Ensure fair competition", "Maintain accurate rankings", "Increase user participation", "Improve PK engagement rates", "Prevent cheating and abuse", "Support platform growth"],
  kpis: ["PK participation rate", "Match completion rate", "Fair play accuracy", "Ranking system stability", "Event success rate", "User engagement growth", "Fraud detection efficiency"],
  financial: {
    responsible: ["Monitoring PK reward distribution", "Ensuring fair reward eligibility", "Reviewing PK campaign budgets", "Supporting reward transparency"],
    note: "PK Managers do NOT control funds or payments. PK Managers do NOT approve withdrawals.",
  },
  pkComponents: [
    { icon: "⚔️", title: "PK Battles", items: ["1v1 competitions", "Team battles", "Ranked matches"] },
    { icon: "🏆", title: "PK Seasons", items: ["Weekly seasons", "Monthly tournaments", "Championship cycles"] },
    { icon: "🎁", title: "PK Rewards", items: ["Win-based rewards", "Ranking rewards", "Seasonal bonuses"] },
    { icon: "📊", title: "PK Leaderboard", items: ["Live ranking system", "Performance tracking", "Global visibility"] },
  ],
  prohibited: [
    { icon: "⚠️", title: "Fair Play Violations", items: ["Match fixing", "Fake wins", "Ranking manipulation", "Cheating or bot usage"] },
    { icon: "⚡", title: "Authority Misuse", items: ["Unfair decisions", "Bias in rankings", "Unauthorized rule changes"] },
    { icon: "💰", title: "Financial Violations", items: ["Unauthorized reward claims", "Fake PK rewards", "Data manipulation"] },
    { icon: "📋", title: "Compliance Violations", items: ["Ignoring platform rules", "Concealing fraud", "Misreporting results"] },
  ],
  compensation: ["Management commission", "PK performance bonuses", "Tournament incentives", "Seasonal rewards", "Leadership bonuses", "Annual PK excellence awards"],
  benefits: ["PK Manager Badge", "Premium Profile Frame", "Exclusive Chat Bubble", "VIP Benefits", "PK Event Access", "Leadership Recognition", "Priority Support", "Competitive Achievement Awards"],
  disciplinary: [
    { level: 1, action: "Official Warning", color: "#F59E0B" },
    { level: 2, action: "Performance Review", color: "#FB923C" },
    { level: 3, action: "Authority Restriction", color: "#F97316" },
    { level: 4, action: "Position Suspension", color: "#EF4444" },
    { level: 5, action: "Position Termination", color: "#DC2626" },
  ],
  confidentiality: ["Share PK system logic", "Share ranking algorithms", "Share internal reports", "Share confidential competition data", "Disclose fraud investigation details"],
  conduct: ["Ensure fair competition", "Maintain transparency", "Support platform integrity", "Follow company policies", "Treat all users equally", "Act professionally"],
};

export default function PkManagerPolicyTab() {
  const [expanded, setExpanded] = useState("authority");
  const toggle = (id) => setExpanded(expanded === id ? null : id);

  return (
    <div className="space-y-3 animate-fadeIn">
      {/* Hero */}
      <div className="rounded-2xl p-4 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0F1B3D 0%, #1A2952 50%, #7F1D1D 100%)" }}>
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #EF4444, transparent 70%)", transform: "translate(30%, -30%)" }} />
        <div className="relative text-center">
          <div className="text-3xl mb-1">🌐</div>
          <h2 className="text-base font-bold text-white">VYRO LIVE CONNECT</h2>
          <p className="text-[11px] mt-1" style={{ color: RED }}>PK Manager (PM) Policy, Authority, Responsibilities & Terms</p>
        </div>
      </div>

      {/* Position info */}
      <div className="rounded-2xl p-4 space-y-3" style={{ background: WHITE, border: "1px solid #E5E7EB", boxShadow: "0 4px 12px rgba(0,0,0,0.04)" }}>
        <div className="flex items-center gap-2">
          <Swords size={14} style={{ color: RED }} />
          <h3 className="text-xs font-bold" style={{ color: DARK }}>Position & Department</h3>
        </div>
        <div className="space-y-2">
          <div>
            <p className="text-[9px]" style={{ color: GRAY }}>POSITION TITLE</p>
            <p className="text-xs font-bold" style={{ color: RED }}>{POLICY.position}</p>
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

      <CollapsibleCard id="authority" title="Authority Level" icon="🔐" expanded={expanded} toggle={toggle} accent={RED}>
        <p className="text-[11px] mb-3" style={{ color: GRAY }}>PK Manager has operational authority over PK system activities.</p>
        <div className="space-y-3">
          <div>
            <p className="text-[10px] font-bold mb-2" style={{ color: "#27AE60" }}>✅ PK Manager MAY:</p>
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
            <p className="text-[10px] font-bold mb-2" style={{ color: "#EB5757" }}>❌ PK Manager MAY NOT:</p>
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

      <CollapsibleCard id="expectations" title="Performance Expectations" icon="📈" expanded={expanded} toggle={toggle} accent={RED}>
        <div className="space-y-2">
          {POLICY.expectations.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <Check size={11} style={{ color: RED }} />
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

      <CollapsibleCard id="financial" title="Financial Responsibilities" icon="💰" expanded={expanded} toggle={toggle} accent={RED}>
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
            <div className="rounded-xl p-3" style={{ background: "#EB575708", border: "1px solid #EB575710" }}>
              <p className="text-[11px]" style={{ color: "#EB5757" }}>{POLICY.financial.note}</p>
            </div>
          </div>
        </div>
      </CollapsibleCard>

      <CollapsibleCard id="pkComponents" title="PK System Components" icon="🎁" expanded={expanded} toggle={toggle} accent={PURPLE}>
        <div className="space-y-3">
          {POLICY.pkComponents.map((r, i) => (
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

      <CollapsibleCard id="compensation" title="Compensation & Benefits" icon="💰" expanded={expanded} toggle={toggle} accent={RED}>
        <p className="text-[11px] mb-3" style={{ color: GRAY }}>Eligible PK Managers may receive:</p>
        <div className="space-y-2">
          {POLICY.compensation.map((item, i) => (
            <div key={i} className="flex items-center gap-2 rounded-xl p-2.5" style={{ background: "#EF444408" }}>
              <span className="text-sm">💰</span>
              <span className="text-[11px]" style={{ color: GRAY }}>{item}</span>
            </div>
          ))}
        </div>
      </CollapsibleCard>

      <CollapsibleCard id="benefits" title="Benefits" icon="🎁" expanded={expanded} toggle={toggle} accent={RED}>
        <p className="text-[11px] mb-3" style={{ color: GRAY }}>Qualified PK Managers may receive:</p>
        <div className="space-y-2">
          {POLICY.benefits.map((item, i) => (
            <div key={i} className="flex items-center gap-2 rounded-xl p-2.5" style={{ background: "#EF444408" }}>
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
        <p className="text-[11px] mb-3" style={{ color: GRAY }}>PK Managers must not:</p>
        <div className="space-y-2">
          {POLICY.confidentiality.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <X size={11} style={{ color: "#EB5757" }} />
              <span className="text-[11px]" style={{ color: GRAY }}>{item}</span>
            </div>
          ))}
        </div>
      </CollapsibleCard>

      <CollapsibleCard id="conduct" title="Professional Conduct" icon="🤝" expanded={expanded} toggle={toggle} accent={RED}>
        <p className="text-[11px] mb-3" style={{ color: GRAY }}>PK Managers must:</p>
        <div className="space-y-2">
          {POLICY.conduct.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <Check size={11} style={{ color: RED }} />
              <span className="text-[11px]" style={{ color: GRAY }}>{item}</span>
            </div>
          ))}
        </div>
      </CollapsibleCard>

      {/* Agreement */}
      <div className="rounded-2xl p-4 text-center" style={{ background: "linear-gradient(135deg, #0F1B3D 0%, #1A2952 50%, #7F1D1D 100%)" }}>
        <div className="text-2xl mb-2">📜</div>
        <h3 className="text-sm font-bold text-white mb-2">Agreement</h3>
        <p className="text-[11px] text-white/60 leading-relaxed">
          By serving as a PK Manager on VYRO Live Connect, the PK Manager agrees to comply with all platform policies, competition rules, operational procedures, compliance standards, confidentiality requirements, and future updates.
        </p>
      </div>

      <div className="text-center pt-1">
        <p className="text-[10px] font-bold tracking-wider" style={{ color: `${RED}99` }}>END OF PK MANAGER POLICY DOCUMENT</p>
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