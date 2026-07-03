import React, { useState } from "react";
import { ChevronDown, Check, X, Crown, Shield } from "lucide-react";

const DARK = "#0F1B3D";
const GOLD = "#D4AF37";
const GRAY = "#6B7280";
const WHITE = "#FFFFFF";
const TEAL = "#2F80ED";

const POLICY = {
  position: "VIP Manager (VM)",
  department: "Management Department",
  reporting: "Business Manager (BM)",
  purpose: "The VIP Manager is responsible for managing all VIP tiers, VIP user experience, VIP benefits distribution, VIP engagement programs, and VIP performance systems across the platform. The role ensures that VIP users receive premium services, exclusive features, and high-quality engagement experience according to their membership level.",
  authority: {
    may: [
      "Manage VIP tier benefits",
      "Monitor VIP user activity",
      "Design VIP engagement programs",
      "Coordinate VIP rewards with Reward Manager",
      "Track VIP performance and retention",
      "Suggest VIP upgrades and improvements",
      "Handle VIP-related user concerns",
      "Submit VIP reports to Business Manager",
    ],
    mayNot: [
      "Change financial systems or pricing",
      "Approve withdrawals or payments",
      "Modify commission structures",
      "Access Owner-level controls",
      "Override Business Manager decisions",
      "Change core platform rules",
      "Manipulate VIP status unfairly",
      "Create unauthorized VIP tiers",
    ],
  },
  responsibilities: [
    { icon: "👑", title: "VIP Management", items: ["Manage VIP tiers and levels", "Ensure correct VIP benefit delivery", "Maintain VIP system stability", "Monitor VIP upgrades and downgrades"] },
    { icon: "🎁", title: "VIP Benefits Execution", items: ["Ensure VIP badges and frames are active", "Manage VIP exclusive features", "Coordinate VIP rewards distribution", "Maintain VIP experience quality"] },
    { icon: "📊", title: "VIP Engagement", items: ["Increase VIP user retention", "Improve VIP participation in events", "Track VIP activity levels", "Enhance VIP satisfaction"] },
    { icon: "🤝", title: "Coordination", items: ["Work with Reward Manager for VIP rewards", "Work with Event Manager for VIP events", "Coordinate with Marketing Manager for VIP promotions", "Report to Business Manager"] },
    { icon: "📈", title: "Reporting", items: ["Prepare VIP performance reports", "Track VIP revenue contribution", "Monitor VIP growth trends", "Submit insights to management"] },
  ],
  expectations: ["Improve VIP retention", "Increase VIP engagement", "Maintain premium service quality", "Ensure accurate VIP benefit delivery", "Support VIP revenue growth", "Enhance user satisfaction"],
  kpis: ["VIP retention rate", "VIP upgrade rate", "VIP engagement level", "VIP revenue contribution", "User satisfaction score", "VIP benefit utilization", "VIP event participation"],
  financial: {
    responsible: ["Monitoring VIP subscription performance", "Tracking VIP revenue impact", "Ensuring benefit cost efficiency", "Supporting VIP monetization strategy"],
    notResponsible: ["Control funds", "Approve payments", "Modify financial rules", "Handle withdrawals"],
  },
  prohibited: [
    { icon: "⚠️", title: "VIP System Abuse", items: ["Fake VIP activation", "Unauthorized VIP upgrades", "Manipulation of VIP status"] },
    { icon: "💰", title: "Financial Violations", items: ["Misreporting VIP revenue", "Fake benefit distribution claims", "Unauthorized financial changes"] },
    { icon: "⚡", title: "Authority Abuse", items: ["Favoritism in VIP treatment", "Unauthorized benefit extension", "Ignoring company rules"] },
  ],
  compensation: ["Management commission", "VIP system performance bonuses", "User engagement incentives", "VIP growth rewards", "Annual recognition bonuses"],
  benefits: ["VIP Manager Badge", "Premium Profile Frame", "Exclusive Chat Bubble", "VIP Access Privileges", "Leadership Recognition", "Priority Support", "Event Invitations", "Performance Awards"],
  disciplinary: [
    { level: 1, action: "Official Warning", color: "#F59E0B" },
    { level: 2, action: "Performance Review", color: "#FB923C" },
    { level: 3, action: "Access Restriction", color: "#F97316" },
    { level: 4, action: "Position Suspension", color: "#EF4444" },
    { level: 5, action: "Position Termination", color: "#DC2626" },
  ],
  confidentiality: ["Share VIP system logic", "Leak VIP revenue data", "Disclose VIP user details", "Share internal VIP strategy", "Reveal confidential benefits structure"],
  conduct: ["Maintain fairness", "Ensure premium user experience", "Follow company policies", "Protect VIP integrity", "Act professionally", "Support platform growth"],
};

export default function VipManagerPolicyTab() {
  const [expanded, setExpanded] = useState("authority");
  const toggle = (id) => setExpanded(expanded === id ? null : id);

  return (
    <div className="space-y-3 animate-fadeIn">
      {/* Hero */}
      <div className="rounded-2xl p-4 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0F1B3D 0%, #1A2952 50%, #2D1B69 100%)" }}>
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #D4AF37, transparent 70%)", transform: "translate(30%, -30%)" }} />
        <div className="relative text-center">
          <div className="text-3xl mb-1">🌐</div>
          <h2 className="text-base font-bold text-white">VYRO LIVE CONNECT</h2>
          <p className="text-[11px] mt-1" style={{ color: GOLD }}>VIP Manager (VM) Policy, Authority, Responsibilities & Terms</p>
        </div>
      </div>

      {/* Position info */}
      <div className="rounded-2xl p-4 space-y-3" style={{ background: WHITE, border: "1px solid #E5E7EB", boxShadow: "0 4px 12px rgba(0,0,0,0.04)" }}>
        <div className="flex items-center gap-2">
          <Crown size={14} style={{ color: GOLD }} />
          <h3 className="text-xs font-bold" style={{ color: DARK }}>Position & Department</h3>
        </div>
        <div className="space-y-2">
          <div>
            <p className="text-[9px]" style={{ color: GRAY }}>POSITION TITLE</p>
            <p className="text-xs font-bold" style={{ color: GOLD }}>{POLICY.position}</p>
          </div>
          <div>
            <p className="text-[9px]" style={{ color: GRAY }}>DEPARTMENT</p>
            <p className="text-xs font-bold" style={{ color: DARK }}>{POLICY.department}</p>
          </div>
          <div>
            <p className="text-[9px]" style={{ color: GRAY }}>REPORTING TO</p>
            <p className="text-[11px] font-semibold" style={{ color: TEAL }}>🏢 {POLICY.reporting}</p>
          </div>
          <div className="pt-2 border-t" style={{ borderColor: "#F3F4F6" }}>
            <p className="text-[9px] mb-1" style={{ color: GRAY }}>ROLE PURPOSE</p>
            <p className="text-[11px] leading-relaxed" style={{ color: GRAY }}>{POLICY.purpose}</p>
          </div>
        </div>
      </div>

      <CollapsibleCard id="authority" title="Authority Level" icon="🔐" expanded={expanded} toggle={toggle} accent={GOLD}>
        <p className="text-[11px] mb-3" style={{ color: GRAY }}>VIP Manager has operational authority over VIP systems only.</p>
        <div className="space-y-3">
          <div>
            <p className="text-[10px] font-bold mb-2" style={{ color: "#27AE60" }}>✅ VIP Manager MAY:</p>
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
            <p className="text-[10px] font-bold mb-2" style={{ color: "#EB5757" }}>❌ VIP Manager MAY NOT:</p>
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

      <CollapsibleCard id="responsibilities" title="Primary Responsibilities" icon="📋" expanded={expanded} toggle={toggle} accent={TEAL}>
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
                    <Check size={10} style={{ color: TEAL }} />
                    <span className="text-[11px]" style={{ color: GRAY }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CollapsibleCard>

      <CollapsibleCard id="expectations" title="Performance Expectations" icon="📈" expanded={expanded} toggle={toggle} accent={GOLD}>
        <div className="space-y-2">
          {POLICY.expectations.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <Check size={11} style={{ color: GOLD }} />
              <span className="text-[11px]" style={{ color: GRAY }}>{item}</span>
            </div>
          ))}
        </div>
      </CollapsibleCard>

      <CollapsibleCard id="kpis" title="Key Performance Indicators (KPIs)" icon="📊" expanded={expanded} toggle={toggle} accent={TEAL}>
        <div className="grid grid-cols-2 gap-2">
          {POLICY.kpis.map((item, i) => (
            <div key={i} className="rounded-xl p-2.5 text-center" style={{ background: "#2F80ED08", border: "1px solid #2F80ED15" }}>
              <p className="text-[10px]" style={{ color: GRAY }}>{item}</p>
            </div>
          ))}
        </div>
      </CollapsibleCard>

      <CollapsibleCard id="financial" title="Financial Responsibilities" icon="💰" expanded={expanded} toggle={toggle} accent={GOLD}>
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
            <p className="text-[10px] font-bold mb-2" style={{ color: "#EB5757" }}>❌ DO NOT:</p>
            <div className="space-y-1.5">
              {POLICY.financial.notResponsible.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <X size={10} style={{ color: "#EB5757" }} />
                  <span className="text-[11px]" style={{ color: GRAY }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
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

      <CollapsibleCard id="compensation" title="Compensation & Benefits" icon="💰" expanded={expanded} toggle={toggle} accent={GOLD}>
        <p className="text-[11px] mb-3" style={{ color: GRAY }}>Eligible VIP Managers may receive:</p>
        <div className="space-y-2">
          {POLICY.compensation.map((item, i) => (
            <div key={i} className="flex items-center gap-2 rounded-xl p-2.5" style={{ background: "#D4AF3708" }}>
              <span className="text-sm">💰</span>
              <span className="text-[11px]" style={{ color: GRAY }}>{item}</span>
            </div>
          ))}
        </div>
      </CollapsibleCard>

      <CollapsibleCard id="benefits" title="Benefits" icon="🎁" expanded={expanded} toggle={toggle} accent={GOLD}>
        <p className="text-[11px] mb-3" style={{ color: GRAY }}>Qualified VIP Managers may receive:</p>
        <div className="space-y-2">
          {POLICY.benefits.map((item, i) => (
            <div key={i} className="flex items-center gap-2 rounded-xl p-2.5" style={{ background: "#D4AF3708" }}>
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

      <CollapsibleCard id="confidentiality" title="Confidentiality" icon="🔒" expanded={expanded} toggle={toggle} accent={TEAL}>
        <p className="text-[11px] mb-3" style={{ color: GRAY }}>VIP Managers must not:</p>
        <div className="space-y-2">
          {POLICY.confidentiality.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <X size={11} style={{ color: "#EB5757" }} />
              <span className="text-[11px]" style={{ color: GRAY }}>{item}</span>
            </div>
          ))}
        </div>
      </CollapsibleCard>

      <CollapsibleCard id="conduct" title="Professional Conduct" icon="🤝" expanded={expanded} toggle={toggle} accent={GOLD}>
        <p className="text-[11px] mb-3" style={{ color: GRAY }}>VIP Managers must:</p>
        <div className="space-y-2">
          {POLICY.conduct.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <Check size={11} style={{ color: GOLD }} />
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
          By serving as a VIP Manager on VYRO Live Connect, the VIP Manager agrees to comply with all platform policies, VIP system rules, operational standards, confidentiality requirements, and future updates.
        </p>
      </div>

      <div className="text-center pt-1">
        <p className="text-[10px] font-bold tracking-wider" style={{ color: `${GOLD}99` }}>END OF VIP MANAGER POLICY DOCUMENT</p>
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