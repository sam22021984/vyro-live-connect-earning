import React, { useState } from "react";
import { ChevronDown, Check, X, Mic } from "lucide-react";

const DARK = "#0F1B3D";
const PINK = "#EC4899";
const PURPLE = "#8B5CF6";
const WHITE = "#FFFFFF";
const GRAY = "#6B7280";

const POLICY = {
  position: "Host",
  department: "Live Streaming & User Engagement",
  reporting: "Agent",
  purpose: "A Host is responsible for creating live content, engaging with users, building audience relationships, participating in platform events, and generating platform activity through entertainment, communication, and community interaction.",
  authority: {
    may: [
      "Go live", "Receive gifts", "Join platform events", "Participate in PK battles",
      "Earn rewards and commissions", "Build and manage their follower community",
      "Apply for VIP programs and special campaigns",
    ],
    mayNot: [
      "Access administrative systems", "Access financial systems", "Modify platform settings",
      "Approve users", "Approve withdrawals", "Manage agents", "Manage agencies",
      "Create fake accounts", "Manipulate rewards or rankings",
    ],
  },
  responsibilities: [
    { icon: "🎬", title: "Content Creation", items: ["Conduct live broadcasts regularly", "Create engaging and appropriate content", "Maintain a professional image"] },
    { icon: "💬", title: "Audience Engagement", items: ["Interact respectfully with viewers", "Respond to audience comments", "Encourage community participation"] },
    { icon: "📈", title: "Platform Growth", items: ["Attract new users", "Increase viewer retention", "Promote positive platform activity"] },
    { icon: "🎉", title: "Event Participation", items: ["Join official events", "Participate in PK competitions", "Support platform campaigns"] },
    { icon: "🛡️", title: "Compliance", items: ["Follow all platform rules", "Follow local laws and regulations", "Maintain account security"] },
  ],
  expectations: ["Maintain regular activity", "Meet assigned performance goals", "Maintain positive user ratings", "Avoid policy violations", "Support platform growth"],
  prohibited: [
    { icon: "⚠️", title: "Fraud & Abuse", items: ["Fake gifting", "Self-gifting", "Coin manipulation", "Revenue manipulation", "Fake transactions"] },
    { icon: "👤", title: "Account Violations", items: ["Multiple unauthorized accounts", "Account sharing", "Selling accounts", "Buying accounts"] },
    { icon: "👥", title: "Community Violations", items: ["Harassment", "Threats", "Hate speech", "Bullying", "Discrimination"] },
    { icon: "🎬", title: "Content Violations", items: ["Illegal content", "Copyright violations", "Fraudulent promotions", "Misleading claims"] },
  ],
  earnings: ["Gift earnings", "Target rewards", "Event rewards", "VIP rewards", "Seasonal bonuses", "Performance bonuses"],
  benefits: ["Profile Frames", "Entrance Effects", "Chat Bubbles", "VIP Access", "Event Invitations", "Exclusive Campaign Access", "Recognition Badges", "Performance Rewards"],
  disciplinary: [
    { level: 1, action: "Warning", color: "#F59E0B" },
    { level: 2, action: "Temporary restrictions", color: "#FB923C" },
    { level: 3, action: "Reward suspension", color: "#F97316" },
    { level: 4, action: "Account suspension", color: "#EF4444" },
    { level: 5, action: "Permanent account termination", color: "#DC2626" },
  ],
  confidentiality: ["Share internal platform information", "Share user data", "Share administrative instructions", "Leak confidential business information"],
};

export default function HostPolicyTab() {
  const [expanded, setExpanded] = useState("authority");
  const toggle = (id) => setExpanded(expanded === id ? null : id);

  return (
    <div className="space-y-3 animate-fadeIn">
      {/* Hero */}
      <div className="rounded-2xl p-4 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0F1B3D 0%, #1A2952 60%, #831843 100%)" }}>
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #EC4899, transparent 70%)", transform: "translate(30%, -30%)" }} />
        <div className="relative text-center">
          <div className="text-3xl mb-1">🌐</div>
          <h2 className="text-base font-bold text-white">VYRO LIVE CONNECT</h2>
          <p className="text-[11px] mt-1" style={{ color: "#F472B6" }}>Host Policy, Authority, Responsibilities & Terms</p>
        </div>
      </div>

      {/* Position info */}
      <div className="rounded-2xl p-4 space-y-3" style={{ background: WHITE, border: "1px solid #E5E7EB", boxShadow: "0 4px 12px rgba(0,0,0,0.04)" }}>
        <div className="flex items-center gap-2">
          <Mic size={14} style={{ color: PINK }} />
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
            <p className="text-[11px] font-semibold" style={{ color: PURPLE }}>{POLICY.reporting}</p>
          </div>
          <div className="pt-2 border-t" style={{ borderColor: "#F3F4F6" }}>
            <p className="text-[9px] mb-1" style={{ color: GRAY }}>ROLE PURPOSE</p>
            <p className="text-[11px] leading-relaxed" style={{ color: GRAY }}>{POLICY.purpose}</p>
          </div>
        </div>
      </div>

      <CollapsibleCard id="authority" title="Authority Level" icon="🔐" expanded={expanded} toggle={toggle} accent={PINK}>
        <p className="text-[11px] mb-3" style={{ color: GRAY }}>Hosts have limited platform authority.</p>
        <div className="space-y-3">
          <div>
            <p className="text-[10px] font-bold mb-2" style={{ color: "#27AE60" }}>✅ Hosts MAY:</p>
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
            <p className="text-[10px] font-bold mb-2" style={{ color: "#EB5757" }}>❌ Hosts MAY NOT:</p>
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

      <CollapsibleCard id="earnings" title="Earnings & Rewards" icon="💰" expanded={expanded} toggle={toggle} accent={PINK}>
        <div className="space-y-2 mb-3">
          {POLICY.earnings.map((item, i) => (
            <div key={i} className="flex items-center gap-2 rounded-xl p-2.5" style={{ background: "#EC489908" }}>
              <span className="text-sm">💰</span>
              <span className="text-[11px]" style={{ color: GRAY }}>{item}</span>
            </div>
          ))}
        </div>
        <p className="text-[10px]" style={{ color: GRAY }}>All earnings are subject to platform verification and compliance review.</p>
      </CollapsibleCard>

      <CollapsibleCard id="benefits" title="Benefits" icon="🎁" expanded={expanded} toggle={toggle} accent={PINK}>
        <p className="text-[11px] mb-3" style={{ color: GRAY }}>Eligible hosts may receive:</p>
        <div className="space-y-2">
          {POLICY.benefits.map((item, i) => (
            <div key={i} className="flex items-center gap-2 rounded-xl p-2.5" style={{ background: "#EC489908" }}>
              <span className="text-sm">🎁</span>
              <span className="text-[11px]" style={{ color: GRAY }}>{item}</span>
            </div>
          ))}
        </div>
        <p className="text-[10px] mt-3" style={{ color: GRAY }}>Benefits are awarded based on activity and performance.</p>
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
        <p className="text-[11px] mb-3" style={{ color: GRAY }}>Hosts must not:</p>
        <div className="space-y-2">
          {POLICY.confidentiality.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <X size={11} style={{ color: "#EB5757" }} />
              <span className="text-[11px]" style={{ color: GRAY }}>{item}</span>
            </div>
          ))}
        </div>
      </CollapsibleCard>

      {/* Agreement */}
      <div className="rounded-2xl p-4 text-center" style={{ background: "linear-gradient(135deg, #0F1B3D 0%, #1A2952 60%, #831843 100%)" }}>
        <div className="text-2xl mb-2">📜</div>
        <h3 className="text-sm font-bold text-white mb-2">Agreement</h3>
        <p className="text-[11px] text-white/60 leading-relaxed">
          By operating as a Host on VYRO Live Connect, the Host agrees to follow all platform policies, operational guidelines, compliance requirements, and future updates issued by the platform.
        </p>
      </div>

      <div className="text-center pt-1">
        <p className="text-[10px] font-bold tracking-wider" style={{ color: `${PINK}99` }}>END OF HOST POLICY DOCUMENT</p>
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