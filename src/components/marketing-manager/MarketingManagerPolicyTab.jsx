import React, { useState } from "react";
import { ChevronDown, Check, X, Crown } from "lucide-react";

const DARK = "#0F1B3D";
const BLUE = "#3B82F6";
const TEAL = "#2F80ED";
const WHITE = "#FFFFFF";
const GRAY = "#6B7280";

const POLICY = {
  position: "Marketing Manager (MM)",
  department: "Management Department",
  reporting: "Business Manager (BM)",
  purpose: "The Marketing Manager is responsible for planning, executing, and optimizing all marketing activities of the platform, including user acquisition, branding campaigns, promotions, and growth strategies. The role focuses on increasing platform visibility, attracting new users, and improving engagement and retention.",
  authority: {
    may: [
      "Plan marketing campaigns",
      "Execute promotional strategies",
      "Manage user acquisition campaigns",
      "Coordinate with Event Manager for promotions",
      "Collaborate with Business Manager for growth strategies",
      "Analyze marketing performance",
      "Optimize ad campaigns",
      "Submit marketing reports",
      "Recommend promotional improvements",
    ],
    mayNot: [
      "Access financial systems",
      "Approve payments or withdrawals",
      "Modify platform rules",
      "Change commission structures",
      "Access Owner or Country Manager controls",
      "Manipulate user data",
      "Approve unauthorized campaigns",
      "Override Business Manager decisions",
    ],
  },
  responsibilities: [
    { icon: "📈", title: "User Acquisition", items: ["Attract new users to the platform", "Run advertising campaigns", "Improve conversion rates", "Expand user base"] },
    { icon: "📢", title: "Branding & Promotion", items: ["Build platform brand awareness", "Design promotional strategies", "Promote events and features", "Increase platform visibility"] },
    { icon: "🎯", title: "Campaign Management", items: ["Manage marketing campaigns", "Run seasonal promotions", "Coordinate launch campaigns", "Support event promotions"] },
    { icon: "📊", title: "Performance Analysis", items: ["Track campaign performance", "Measure ROI of campaigns", "Analyze user growth trends", "Optimize marketing strategy"] },
    { icon: "🤝", title: "Coordination", items: ["Work with Event Manager for campaigns", "Work with Business Manager for strategy", "Coordinate with Support Manager for user feedback"] },
  ],
  expectations: ["Increase user growth", "Improve campaign performance", "Achieve acquisition targets", "Enhance brand visibility", "Optimize marketing ROI", "Support platform expansion"],
  kpis: ["User acquisition rate", "Campaign conversion rate", "Cost per acquisition (CPA)", "Engagement growth", "Brand visibility metrics", "Retention improvement", "Marketing ROI"],
  financial: {
    responsible: ["Monitoring campaign budgets", "Tracking marketing spend", "Analyzing campaign profitability", "Supporting revenue growth through marketing"],
    note: "Marketing Managers do NOT control company funds, approve financial transactions, or manage withdrawals or payments.",
  },
  prohibited: [
    { icon: "⚠️", title: "Marketing Abuse", items: ["Fake advertising claims", "Misleading promotions", "Unauthorized campaigns"] },
    { icon: "🔒", title: "Data Misuse", items: ["User data exploitation", "Unauthorized tracking misuse", "Privacy violations"] },
    { icon: "⚡", title: "Authority Abuse", items: ["Running unapproved campaigns", "Misrepresentation of platform features", "Ignoring company guidelines"] },
  ],
  compensation: ["Management commission", "Campaign performance bonuses", "User acquisition incentives", "Marketing achievement rewards", "Seasonal bonuses"],
  benefits: ["Marketing Manager Badge", "Premium Profile Frame", "Exclusive Chat Bubble", "VIP Benefits", "Priority Support", "Leadership Recognition", "Campaign Rewards", "Performance Awards"],
  disciplinary: [
    { level: 1, action: "Official Warning", color: "#F59E0B" },
    { level: 2, action: "Performance Review", color: "#FB923C" },
    { level: 3, action: "Campaign Restriction", color: "#F97316" },
    { level: 4, action: "Position Suspension", color: "#EF4444" },
    { level: 5, action: "Position Termination", color: "#DC2626" },
  ],
  confidentiality: ["Share marketing strategies", "Leak campaign data", "Disclose user acquisition methods", "Share internal analytics", "Reveal confidential business plans"],
  conduct: ["Act ethically", "Follow company policies", "Ensure truthful advertising", "Respect user privacy", "Maintain professionalism", "Support platform growth"],
};

export default function MarketingManagerPolicyTab() {
  const [expanded, setExpanded] = useState("authority");
  const toggle = (id) => setExpanded(expanded === id ? null : id);

  return (
    <div className="space-y-3 animate-fadeIn">
      {/* Hero */}
      <div className="rounded-2xl p-4 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0F1B3D 0%, #1A2952 50%, #1E3A8A 100%)" }}>
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #3B82F6, transparent 70%)", transform: "translate(30%, -30%)" }} />
        <div className="relative text-center">
          <div className="text-3xl mb-1">🌐</div>
          <h2 className="text-base font-bold text-white">VYRO LIVE CONNECT</h2>
          <p className="text-[11px] mt-1" style={{ color: BLUE }}>Marketing Manager (MM) Policy, Authority, Responsibilities & Terms</p>
        </div>
      </div>

      {/* Position info */}
      <div className="rounded-2xl p-4 space-y-3" style={{ background: WHITE, border: "1px solid #E5E7EB", boxShadow: "0 4px 12px rgba(0,0,0,0.04)" }}>
        <div className="flex items-center gap-2">
          <Crown size={14} style={{ color: BLUE }} />
          <h3 className="text-xs font-bold" style={{ color: DARK }}>Position & Department</h3>
        </div>
        <div className="space-y-2">
          <div>
            <p className="text-[9px]" style={{ color: GRAY }}>POSITION TITLE</p>
            <p className="text-xs font-bold" style={{ color: BLUE }}>{POLICY.position}</p>
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

      <CollapsibleCard id="authority" title="Authority Level" icon="🔐" expanded={expanded} toggle={toggle} accent={BLUE}>
        <p className="text-[11px] mb-3" style={{ color: GRAY }}>Marketing Manager has operational authority over marketing activities only.</p>
        <div className="space-y-3">
          <div>
            <p className="text-[10px] font-bold mb-2" style={{ color: "#27AE60" }}>✅ Marketing Manager MAY:</p>
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
            <p className="text-[10px] font-bold mb-2" style={{ color: "#EB5757" }}>❌ Marketing Manager MAY NOT:</p>
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

      <CollapsibleCard id="expectations" title="Performance Expectations" icon="📈" expanded={expanded} toggle={toggle} accent={BLUE}>
        <div className="space-y-2">
          {POLICY.expectations.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <Check size={11} style={{ color: BLUE }} />
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

      <CollapsibleCard id="financial" title="Financial Responsibilities" icon="💰" expanded={expanded} toggle={toggle} accent={BLUE}>
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

      <CollapsibleCard id="compensation" title="Compensation & Benefits" icon="💰" expanded={expanded} toggle={toggle} accent={BLUE}>
        <p className="text-[11px] mb-3" style={{ color: GRAY }}>Eligible Marketing Managers may receive:</p>
        <div className="space-y-2">
          {POLICY.compensation.map((item, i) => (
            <div key={i} className="flex items-center gap-2 rounded-xl p-2.5" style={{ background: "#3B82F608" }}>
              <span className="text-sm">💰</span>
              <span className="text-[11px]" style={{ color: GRAY }}>{item}</span>
            </div>
          ))}
        </div>
      </CollapsibleCard>

      <CollapsibleCard id="benefits" title="Benefits" icon="🎁" expanded={expanded} toggle={toggle} accent={BLUE}>
        <p className="text-[11px] mb-3" style={{ color: GRAY }}>Qualified Marketing Managers may receive:</p>
        <div className="space-y-2">
          {POLICY.benefits.map((item, i) => (
            <div key={i} className="flex items-center gap-2 rounded-xl p-2.5" style={{ background: "#3B82F608" }}>
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
        <p className="text-[11px] mb-3" style={{ color: GRAY }}>Marketing Managers must not:</p>
        <div className="space-y-2">
          {POLICY.confidentiality.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <X size={11} style={{ color: "#EB5757" }} />
              <span className="text-[11px]" style={{ color: GRAY }}>{item}</span>
            </div>
          ))}
        </div>
      </CollapsibleCard>

      <CollapsibleCard id="conduct" title="Professional Conduct" icon="🤝" expanded={expanded} toggle={toggle} accent={BLUE}>
        <p className="text-[11px] mb-3" style={{ color: GRAY }}>Marketing Managers must:</p>
        <div className="space-y-2">
          {POLICY.conduct.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <Check size={11} style={{ color: BLUE }} />
              <span className="text-[11px]" style={{ color: GRAY }}>{item}</span>
            </div>
          ))}
        </div>
      </CollapsibleCard>

      {/* Agreement */}
      <div className="rounded-2xl p-4 text-center" style={{ background: "linear-gradient(135deg, #0F1B3D 0%, #1A2952 50%, #1E3A8A 100%)" }}>
        <div className="text-2xl mb-2">📜</div>
        <h3 className="text-sm font-bold text-white mb-2">Agreement</h3>
        <p className="text-[11px] text-white/60 leading-relaxed">
          By serving as a Marketing Manager on VYRO Live Connect, the Marketing Manager agrees to comply with all platform policies, marketing procedures, compliance standards, confidentiality requirements, and future updates.
        </p>
      </div>

      <div className="text-center pt-1">
        <p className="text-[10px] font-bold tracking-wider" style={{ color: `${BLUE}99` }}>END OF MARKETING MANAGER POLICY DOCUMENT</p>
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