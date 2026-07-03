import React, { useState } from "react";
import { ChevronDown, Check, X, Gift } from "lucide-react";

const DARK = "#0F1B3D";
const AMBER = "#F59E0B";
const PURPLE = "#8B5CF6";
const WHITE = "#FFFFFF";
const GRAY = "#6B7280";

const POLICY = {
  position: "Reward Manager (RM)",
  department: "Management Department",
  reporting: "Business Manager (BM)",
  purpose: "The Reward Manager is responsible for managing, monitoring, and optimizing the platform's reward ecosystem. This includes weekly targets, monthly targets, achievement rewards, campaign rewards, seasonal rewards, VIP rewards, and performance incentive programs. The Reward Manager ensures that all rewards are distributed fairly, accurately, transparently, and according to approved company policies.",
  authority: {
    may: [
      "Manage reward campaigns",
      "Monitor reward distribution",
      "Verify reward eligibility",
      "Review reward performance reports",
      "Recommend new reward programs",
      "Manage target reward structures",
      "Coordinate with Finance Manager regarding approved reward payouts",
      "Monitor reward abuse and suspicious activities",
      "Submit reward reports to Business Manager",
    ],
    mayNot: [
      "Change company commission structures",
      "Directly approve financial withdrawals",
      "Modify VIP policies without approval",
      "Create unauthorized reward campaigns",
      "Alter reward records without documentation",
      "Access Owner-level controls",
      "Override Business Manager decisions",
      "Issue rewards outside approved policies",
    ],
  },
  responsibilities: [
    { icon: "🎁", title: "Reward Program Management", items: ["Manage weekly reward programs", "Manage monthly reward programs", "Manage event-based reward campaigns", "Manage performance reward systems"] },
    { icon: "🎯", title: "Target Achievement Rewards", items: ["Monitor target completion", "Verify eligibility requirements", "Ensure accurate reward calculations", "Prevent reward manipulation"] },
    { icon: "🔍", title: "Reward Verification", items: ["Review reward claims", "Validate achievement records", "Monitor suspicious activities", "Escalate fraud cases when necessary"] },
    { icon: "📣", title: "Campaign Support", items: ["Support marketing reward campaigns", "Support seasonal reward programs", "Support VIP reward initiatives"] },
    { icon: "📈", title: "Reporting", items: ["Prepare reward performance reports", "Submit reports to Business Manager", "Recommend reward improvements"] },
  ],
  expectations: ["Ensure reward accuracy", "Maintain reward transparency", "Prevent reward abuse", "Improve user engagement through incentives", "Support business growth objectives", "Deliver efficient reward operations"],
  kpis: ["Reward distribution accuracy", "Reward claim processing efficiency", "Fraud prevention effectiveness", "User participation rates", "Campaign performance", "Target completion growth", "Reward system reliability"],
  financial: {
    responsible: ["Monitoring reward allocations", "Reviewing reward budgets", "Tracking reward program performance", "Supporting financial transparency"],
    note: "Reward Managers do NOT directly control company funds. Reward Managers do NOT approve withdrawals. Reward Managers do NOT process payments.",
  },
  rewardCategories: [
    { icon: "📅", title: "Weekly Target Rewards", items: ["Host Target Rewards", "Agent Target Rewards", "Agency Target Rewards"] },
    { icon: "🏆", title: "Monthly Achievement Rewards", items: ["Performance Awards", "Growth Awards", "Activity Awards"] },
    { icon: "💎", title: "VIP Reward Programs", items: ["VIP Bonuses", "VIP Event Rewards", "VIP Campaign Incentives"] },
    { icon: "🎉", title: "Seasonal Rewards", items: ["Holiday Rewards", "Festival Rewards", "Special Event Rewards"] },
    { icon: "📢", title: "Platform Campaign Rewards", items: ["Marketing Campaign Rewards", "Referral Rewards", "Achievement Rewards"] },
  ],
  prohibited: [
    { icon: "⚠️", title: "Reward Abuse", items: ["Fake reward claims", "Reward manipulation", "Artificial target inflation", "Unauthorized reward approvals"] },
    { icon: "💰", title: "Financial Misconduct", items: ["Unauthorized payments", "False reward reporting", "Budget manipulation"] },
    { icon: "⚡", title: "Administrative Violations", items: ["Abuse of authority", "Unfair reward distribution", "Favoritism"] },
    { icon: "📋", title: "Compliance Violations", items: ["Ignoring reward policies", "Concealing fraud", "Failure to report suspicious activities"] },
  ],
  compensation: ["Management commission", "Performance bonuses", "Reward program incentives", "Leadership bonuses", "Annual achievement awards"],
  benefits: ["Reward Manager Badge", "Premium Profile Frame", "Exclusive Chat Bubble", "VIP Benefits", "Priority Support", "Leadership Recognition", "Event Access", "Achievement Awards"],
  disciplinary: [
    { level: 1, action: "Official Warning", color: "#F59E0B" },
    { level: 2, action: "Performance Review", color: "#FB923C" },
    { level: 3, action: "Authority Restriction", color: "#F97316" },
    { level: 4, action: "Position Suspension", color: "#EF4444" },
    { level: 5, action: "Position Termination", color: "#DC2626" },
  ],
  confidentiality: ["Share reward calculations", "Share internal reports", "Share financial data", "Share confidential company information", "Disclose reward investigation details"],
  conduct: ["Maintain fairness", "Ensure transparency", "Follow company policies", "Protect company interests", "Support platform growth", "Act professionally at all times"],
};

export default function RewardManagerPolicyTab() {
  const [expanded, setExpanded] = useState("authority");
  const toggle = (id) => setExpanded(expanded === id ? null : id);

  return (
    <div className="space-y-3 animate-fadeIn">
      {/* Hero */}
      <div className="rounded-2xl p-4 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0F1B3D 0%, #1A2952 50%, #78350F 100%)" }}>
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #F59E0B, transparent 70%)", transform: "translate(30%, -30%)" }} />
        <div className="relative text-center">
          <div className="text-3xl mb-1">🌐</div>
          <h2 className="text-base font-bold text-white">VYRO LIVE CONNECT</h2>
          <p className="text-[11px] mt-1" style={{ color: AMBER }}>Reward Manager (RM) Policy, Authority, Responsibilities & Terms</p>
        </div>
      </div>

      {/* Position info */}
      <div className="rounded-2xl p-4 space-y-3" style={{ background: WHITE, border: "1px solid #E5E7EB", boxShadow: "0 4px 12px rgba(0,0,0,0.04)" }}>
        <div className="flex items-center gap-2">
          <Gift size={14} style={{ color: AMBER }} />
          <h3 className="text-xs font-bold" style={{ color: DARK }}>Position & Department</h3>
        </div>
        <div className="space-y-2">
          <div>
            <p className="text-[9px]" style={{ color: GRAY }}>POSITION TITLE</p>
            <p className="text-xs font-bold" style={{ color: AMBER }}>{POLICY.position}</p>
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

      <CollapsibleCard id="authority" title="Authority Level" icon="🔐" expanded={expanded} toggle={toggle} accent={AMBER}>
        <p className="text-[11px] mb-3" style={{ color: GRAY }}>Reward Manager has operational authority over the rewards system.</p>
        <div className="space-y-3">
          <div>
            <p className="text-[10px] font-bold mb-2" style={{ color: "#27AE60" }}>✅ Reward Manager MAY:</p>
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
            <p className="text-[10px] font-bold mb-2" style={{ color: "#EB5757" }}>❌ Reward Manager MAY NOT:</p>
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

      <CollapsibleCard id="expectations" title="Performance Expectations" icon="📈" expanded={expanded} toggle={toggle} accent={AMBER}>
        <div className="space-y-2">
          {POLICY.expectations.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <Check size={11} style={{ color: AMBER }} />
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

      <CollapsibleCard id="financial" title="Financial Responsibilities" icon="💰" expanded={expanded} toggle={toggle} accent={AMBER}>
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

      <CollapsibleCard id="rewardCategories" title="Reward Categories Under Management" icon="🎁" expanded={expanded} toggle={toggle} accent={PURPLE}>
        <div className="space-y-3">
          {POLICY.rewardCategories.map((r, i) => (
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

      <CollapsibleCard id="compensation" title="Compensation & Benefits" icon="💰" expanded={expanded} toggle={toggle} accent={AMBER}>
        <p className="text-[11px] mb-3" style={{ color: GRAY }}>Eligible Reward Managers may receive:</p>
        <div className="space-y-2">
          {POLICY.compensation.map((item, i) => (
            <div key={i} className="flex items-center gap-2 rounded-xl p-2.5" style={{ background: "#F59E0B08" }}>
              <span className="text-sm">💰</span>
              <span className="text-[11px]" style={{ color: GRAY }}>{item}</span>
            </div>
          ))}
        </div>
      </CollapsibleCard>

      <CollapsibleCard id="benefits" title="Benefits" icon="🎁" expanded={expanded} toggle={toggle} accent={AMBER}>
        <p className="text-[11px] mb-3" style={{ color: GRAY }}>Qualified Reward Managers may receive:</p>
        <div className="space-y-2">
          {POLICY.benefits.map((item, i) => (
            <div key={i} className="flex items-center gap-2 rounded-xl p-2.5" style={{ background: "#F59E0B08" }}>
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
        <p className="text-[11px] mb-3" style={{ color: GRAY }}>Reward Managers must not:</p>
        <div className="space-y-2">
          {POLICY.confidentiality.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <X size={11} style={{ color: "#EB5757" }} />
              <span className="text-[11px]" style={{ color: GRAY }}>{item}</span>
            </div>
          ))}
        </div>
      </CollapsibleCard>

      <CollapsibleCard id="conduct" title="Professional Conduct" icon="🤝" expanded={expanded} toggle={toggle} accent={AMBER}>
        <p className="text-[11px] mb-3" style={{ color: GRAY }}>Reward Managers must:</p>
        <div className="space-y-2">
          {POLICY.conduct.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <Check size={11} style={{ color: AMBER }} />
              <span className="text-[11px]" style={{ color: GRAY }}>{item}</span>
            </div>
          ))}
        </div>
      </CollapsibleCard>

      {/* Agreement */}
      <div className="rounded-2xl p-4 text-center" style={{ background: "linear-gradient(135deg, #0F1B3D 0%, #1A2952 50%, #78350F 100%)" }}>
        <div className="text-2xl mb-2">📜</div>
        <h3 className="text-sm font-bold text-white mb-2">Agreement</h3>
        <p className="text-[11px] text-white/60 leading-relaxed">
          By serving as a Reward Manager on VYRO Live Connect, the Reward Manager agrees to comply with all company policies, reward procedures, operational standards, compliance requirements, confidentiality obligations, and future organizational updates.
        </p>
      </div>

      <div className="text-center pt-1">
        <p className="text-[10px] font-bold tracking-wider" style={{ color: `${AMBER}99` }}>END OF REWARD MANAGER POLICY DOCUMENT</p>
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