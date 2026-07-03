import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronDown, Check, X, Shield, Crown, AlertTriangle } from "lucide-react";

const POLICY = {
  header: {
    title: "VYRO LIVE CONNECT",
    subtitle: "Official Coin Seller Policy, Authority, Responsibilities & Terms",
    position: "Official Coin Seller (OCS)",
    department: "Revenue Distribution & Sales Network",
    reporting: "Admin (Indirect oversight: Super Admin → Business Manager → Country Manager)",
    purpose: "The Official Coin Seller is an authorized distribution partner responsible for selling platform coins to users through approved channels. Their role is to ensure safe, verified, and controlled coin distribution while increasing platform liquidity and user purchasing activity.",
  },
  authority: {
    may: [
      "Sell platform coins to users",
      "Use approved pricing system",
      "Receive commission on sales",
      "Promote coin purchase packages",
      "Report sales activity",
      "Maintain verified transaction records",
      "Work under assigned Agent/Admin supervision",
    ],
    mayNot: [
      "Create fake coin balances",
      "Modify coin rates without approval",
      "Process unauthorized transactions",
      "Access user wallets or backend system",
      "Change platform financial rules",
      "Manipulate coin supply or circulation",
      "Bypass Admin verification",
    ],
  },
  responsibilities: [
    {
      icon: "🪙",
      title: "Coin Distribution",
      items: [
        "Sell official platform coins",
        "Follow fixed pricing structure",
        "Ensure secure transactions",
        "Provide correct coin delivery confirmation",
      ],
    },
    {
      icon: "📊",
      title: "Sales Reporting",
      items: [
        "Maintain daily sales records",
        "Submit reports to Admin/Agent",
        "Track purchase volumes",
        "Record transaction history",
      ],
    },
    {
      icon: "🤝",
      title: "User Support",
      items: [
        "Assist users in coin purchase process",
        "Explain purchase packages",
        "Guide users on official methods only",
      ],
    },
  ],
  revenue: [
    "Fixed percentage commission per sale",
    "Volume-based performance bonuses",
    "Monthly sales incentives",
    "Target achievement rewards",
  ],
  saleRules: [
    "All sales must use official rates only",
    "No private or hidden pricing allowed",
    "No off-platform transactions allowed",
    "All payments must be traceable",
    "Every sale must be recorded in system logs",
  ],
  prohibited: [
    {
      icon: "⚠️",
      title: "Financial Abuse",
      items: ["Selling fake coins", "Creating unauthorized discounts", "Manipulating coin value"],
    },
    {
      icon: "⚙️",
      title: "System Abuse",
      items: ["Unauthorized wallet access", "Fake transaction entries", "Misreporting sales data"],
    },
    {
      icon: "🚫",
      title: "Fraud & Misconduct",
      items: ["Scamming users", "Off-platform coin trading", "Identity misuse"],
    },
  ],
  expectations: [
    "Maintain consistent sales volume",
    "Follow pricing policy strictly",
    "Ensure user trust and satisfaction",
    "Achieve monthly targets",
    "Maintain clean transaction records",
  ],
  kpis: [
    "Total coin sales volume",
    "Revenue generated",
    "User conversion rate",
    "Transaction accuracy",
    "Complaint rate",
    "Target achievement percentage",
  ],
  benefits: [
    "Official Seller Badge",
    "Commission earnings",
    "Performance bonuses",
    "Priority listing in network",
    "Sales achievement rewards",
    "Seasonal incentives",
  ],
  disciplinary: [
    { level: 1, action: "Warning", color: "#F59E0B" },
    { level: 2, action: "Commission reduction", color: "#FB923C" },
    { level: 3, action: "Suspension of selling rights", color: "#F97316" },
    { level: 4, action: "Permanent removal", color: "#EF4444" },
    { level: 5, action: "Account termination", color: "#DC2626" },
  ],
  confidentiality: [
    "Share internal pricing logic",
    "Leak financial structure",
    "Modify coin value externally",
    "Misuse user financial data",
    "Operate unofficial sales channels",
  ],
  conduct: [
    "Maintain honesty and transparency",
    "Follow all platform financial rules",
    "Protect user trust",
    "Report all transactions accurately",
    "Avoid any fraudulent activity",
  ],
};

export default function OfficialCoinSellerPolicy() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState("authority");

  const toggle = (id) => setExpanded(expanded === id ? null : id);

  return (
    <div className="min-h-screen" style={{ background: "#0A0E1A" }}>
      <div className="max-w-md mx-auto pb-8">
        {/* Header */}
        <div className="sticky top-0 z-30 px-4 py-3 flex items-center gap-3" style={{ background: "rgba(10,14,26,0.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,215,0,0.15)" }}>
          <button onClick={() => navigate("/creator-center")} className="w-9 h-9 rounded-full flex items-center justify-center active:scale-95 transition" style={{ background: "rgba(255,215,0,0.1)" }}>
            <ArrowLeft size={18} style={{ color: "#FFD700" }} />
          </button>
          <div className="flex-1">
            <h1 className="text-base font-bold" style={{ color: "#FFD700" }}>Official Coin Seller</h1>
            <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.5)" }}>Policy, Authority & Terms</p>
          </div>
          <Shield size={18} style={{ color: "#FFD700" }} />
        </div>

        <div className="px-4 pt-4 space-y-3">
          {/* Hero */}
          <div className="rounded-2xl p-4 relative overflow-hidden" style={{ background: "linear-gradient(135deg, rgba(255,215,0,0.12), rgba(34,211,238,0.08))", border: "1px solid rgba(255,215,0,0.2)" }}>
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #FFD700, transparent 70%)", transform: "translate(30%, -30%)" }} />
            <div className="relative text-center">
              <div className="text-3xl mb-1">🌐</div>
              <h2 className="text-base font-bold text-white">VYRO LIVE CONNECT</h2>
              <p className="text-[11px] mt-1" style={{ color: "#FFD700" }}>Official Coin Seller Policy, Authority, Responsibilities & Terms</p>
            </div>
          </div>

          {/* Position info */}
          <div className="rounded-2xl p-4 space-y-3" style={{ background: "#111827", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="flex items-center gap-2">
              <Crown size={14} style={{ color: "#FFD700" }} />
              <h3 className="text-xs font-bold text-white">Position & Department</h3>
            </div>
            <div className="space-y-2">
              <div>
                <p className="text-[9px] text-white/40">POSITION TITLE</p>
                <p className="text-xs font-bold" style={{ color: "#FFD700" }}>{POLICY.header.position}</p>
              </div>
              <div>
                <p className="text-[9px] text-white/40">DEPARTMENT</p>
                <p className="text-xs font-bold text-white">{POLICY.header.department}</p>
              </div>
              <div>
                <p className="text-[9px] text-white/40">REPORTING TO</p>
                <p className="text-[11px] text-white/70">{POLICY.header.reporting}</p>
              </div>
              <div className="pt-2 border-t border-white/5">
                <p className="text-[9px] text-white/40 mb-1">ROLE PURPOSE</p>
                <p className="text-[11px] text-white/60 leading-relaxed">{POLICY.header.purpose}</p>
              </div>
            </div>
          </div>

          {/* Authority */}
          <CollapsibleCard id="authority" title="Authority Level" icon="🔐" expanded={expanded} toggle={toggle} accent="#FFD700">
            <div className="space-y-3">
              <div>
                <p className="text-[10px] font-bold text-green-400 mb-2">✅ Official Coin Seller MAY:</p>
                <div className="space-y-1.5">
                  {POLICY.authority.may.map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(16,185,129,0.15)" }}>
                        <Check size={10} className="text-green-400" />
                      </div>
                      <span className="text-[11px] text-white/70">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pt-2 border-t border-white/5">
                <p className="text-[10px] font-bold text-red-400 mb-2">❌ Official Coin Seller MAY NOT:</p>
                <div className="space-y-1.5">
                  {POLICY.authority.mayNot.map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(239,68,68,0.15)" }}>
                        <X size={10} className="text-red-400" />
                      </div>
                      <span className="text-[11px] text-white/70">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CollapsibleCard>

          {/* Responsibilities */}
          <CollapsibleCard id="responsibilities" title="Primary Responsibilities" icon="📋" expanded={expanded} toggle={toggle} accent="#22D3EE">
            <div className="space-y-3">
              {POLICY.responsibilities.map((r, i) => (
                <div key={i} className="rounded-xl p-3" style={{ background: "rgba(255,255,255,0.03)" }}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">{r.icon}</span>
                    <p className="text-xs font-bold text-white">{r.title}</p>
                  </div>
                  <div className="space-y-1.5">
                    {r.items.map((item, j) => (
                      <div key={j} className="flex items-center gap-2">
                        <Check size={10} style={{ color: "#22D3EE" }} />
                        <span className="text-[11px] text-white/60">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CollapsibleCard>

          {/* Revenue & Commission */}
          <CollapsibleCard id="revenue" title="Revenue & Commission Model" icon="💰" expanded={expanded} toggle={toggle} accent="#FFD700">
            <p className="text-[11px] text-white/50 mb-3">Official Coin Sellers earn based on:</p>
            <div className="space-y-2">
              {POLICY.revenue.map((item, i) => (
                <div key={i} className="flex items-center gap-2 rounded-xl p-2.5" style={{ background: "rgba(255,215,0,0.06)" }}>
                  <span className="text-sm">💰</span>
                  <span className="text-[11px] text-white/70">{item}</span>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-white/40 mt-3 leading-relaxed">
              Commission percentage is defined by platform management and may vary by region, tier, or campaign.
            </p>
          </CollapsibleCard>

          {/* Sale Rules */}
          <CollapsibleCard id="saleRules" title="Coin Sale Rules" icon="💳" expanded={expanded} toggle={toggle} accent="#22D3EE">
            <div className="space-y-2">
              {POLICY.saleRules.map((item, i) => (
                <div key={i} className="flex items-center gap-2 rounded-xl p-2.5" style={{ background: "rgba(255,255,255,0.03)" }}>
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(34,211,238,0.15)" }}>
                    <Check size={10} style={{ color: "#22D3EE" }} />
                  </div>
                  <span className="text-[11px] text-white/70">{item}</span>
                </div>
              ))}
            </div>
          </CollapsibleCard>

          {/* Prohibited Activities */}
          <CollapsibleCard id="prohibited" title="Prohibited Activities" icon="🚫" expanded={expanded} toggle={toggle} accent="#EF4444">
            <div className="space-y-3">
              {POLICY.prohibited.map((p, i) => (
                <div key={i} className="rounded-xl p-3" style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.1)" }}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">{p.icon}</span>
                    <p className="text-xs font-bold text-white">{p.title}</p>
                  </div>
                  <div className="space-y-1.5">
                    {p.items.map((item, j) => (
                      <div key={j} className="flex items-center gap-2">
                        <X size={10} className="text-red-400" />
                        <span className="text-[11px] text-white/60">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CollapsibleCard>

          {/* Performance Expectations */}
          <CollapsibleCard id="expectations" title="Performance Expectations" icon="📈" expanded={expanded} toggle={toggle} accent="#FFD700">
            <div className="space-y-2">
              {POLICY.expectations.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Check size={11} style={{ color: "#FFD700" }} />
                  <span className="text-[11px] text-white/70">{item}</span>
                </div>
              ))}
            </div>
          </CollapsibleCard>

          {/* KPIs */}
          <CollapsibleCard id="kpis" title="Key Performance Indicators" icon="📊" expanded={expanded} toggle={toggle} accent="#22D3EE">
            <div className="grid grid-cols-2 gap-2">
              {POLICY.kpis.map((item, i) => (
                <div key={i} className="rounded-xl p-2.5 text-center" style={{ background: "rgba(34,211,238,0.06)", border: "1px solid rgba(34,211,238,0.1)" }}>
                  <p className="text-[10px] text-white/70">{item}</p>
                </div>
              ))}
            </div>
          </CollapsibleCard>

          {/* Benefits */}
          <CollapsibleCard id="benefits" title="Benefits" icon="🎁" expanded={expanded} toggle={toggle} accent="#FFD700">
            <div className="space-y-2">
              {POLICY.benefits.map((item, i) => (
                <div key={i} className="flex items-center gap-2 rounded-xl p-2.5" style={{ background: "rgba(255,215,0,0.06)" }}>
                  <span className="text-sm">🎁</span>
                  <span className="text-[11px] text-white/70">{item}</span>
                </div>
              ))}
            </div>
          </CollapsibleCard>

          {/* Disciplinary Actions */}
          <CollapsibleCard id="disciplinary" title="Disciplinary Actions" icon="⚠️" expanded={expanded} toggle={toggle} accent="#EF4444">
            <div className="space-y-2">
              {POLICY.disciplinary.map((d) => (
                <div key={d.level} className="rounded-xl p-3 flex items-center gap-3" style={{ background: `${d.color}10`, border: `1px solid ${d.color}20` }}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ background: d.color }}>
                    {d.level}
                  </div>
                  <div className="flex-1">
                    <p className="text-[9px] text-white/40">Level {d.level}</p>
                    <p className="text-xs font-bold" style={{ color: d.color }}>{d.action}</p>
                  </div>
                </div>
              ))}
            </div>
          </CollapsibleCard>

          {/* Confidentiality */}
          <CollapsibleCard id="confidentiality" title="Confidentiality" icon="🔒" expanded={expanded} toggle={toggle} accent="#22D3EE">
            <p className="text-[11px] text-white/50 mb-3">Official Coin Sellers must not:</p>
            <div className="space-y-2">
              {POLICY.confidentiality.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <X size={11} className="text-red-400" />
                  <span className="text-[11px] text-white/70">{item}</span>
                </div>
              ))}
            </div>
          </CollapsibleCard>

          {/* Professional Conduct */}
          <CollapsibleCard id="conduct" title="Professional Conduct" icon="🤝" expanded={expanded} toggle={toggle} accent="#FFD700">
            <p className="text-[11px] text-white/50 mb-3">Official Coin Sellers must:</p>
            <div className="space-y-2">
              {POLICY.conduct.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Check size={11} style={{ color: "#FFD700" }} />
                  <span className="text-[11px] text-white/70">{item}</span>
                </div>
              ))}
            </div>
          </CollapsibleCard>

          {/* Agreement */}
          <div className="rounded-2xl p-4 text-center" style={{ background: "linear-gradient(135deg, rgba(255,215,0,0.12), rgba(34,211,238,0.08))", border: "1px solid rgba(255,215,0,0.2)" }}>
            <div className="text-2xl mb-2">📜</div>
            <h3 className="text-sm font-bold text-white mb-2">Agreement</h3>
            <p className="text-[11px] text-white/60 leading-relaxed">
              By becoming an Official Coin Seller on VYRO Live Connect, the user agrees to follow all financial policies, distribution rules, compliance requirements, and future platform updates.
            </p>
          </div>

          {/* End of document */}
          <div className="text-center pt-2">
            <p className="text-[10px] font-bold tracking-wider" style={{ color: "rgba(255,215,0,0.4)" }}>END OF OFFICIAL COIN SELLER POLICY DOCUMENT</p>
          </div>

          {/* Accept Button */}
          <button
            onClick={() => navigate("/seller-dashboard")}
            className="w-full py-3.5 rounded-2xl text-sm font-bold text-black active:scale-[0.98] transition flex items-center justify-center gap-2"
            style={{ background: "linear-gradient(135deg, #FFD700, #22D3EE)", boxShadow: "0 8px 24px rgba(255,215,0,0.3)" }}
          >
            <Shield size={16} /> Accept & Go to Seller Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

function CollapsibleCard({ id, title, icon, expanded, toggle, accent, children }) {
  const isOpen = expanded === id;
  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: "#111827", border: `1px solid ${accent}20` }}>
      <button
        onClick={() => toggle(id)}
        className="w-full p-4 flex items-center gap-3 active:scale-[0.98] transition"
      >
        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg" style={{ background: `${accent}15` }}>
          {icon}
        </div>
        <h3 className="flex-1 text-left text-sm font-bold text-white">{title}</h3>
        <ChevronDown size={18} className={`text-white/40 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && <div className="px-4 pb-4 animate-fadeIn">{children}</div>}
    </div>
  );
}