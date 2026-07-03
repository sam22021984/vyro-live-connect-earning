import React, { useState } from "react";
import {
  FileText, Shield, Users, FileCheck, AlertCircle, X,
  ScrollText, Lock, Gavel, Heart,
} from "lucide-react";
import { SettingsShell, SettingsCard, ActionRow } from "@/components/settings/SettingsUI";

const DOCUMENTS = [
  {
    id: "terms",
    title: "Terms & Conditions",
    description: "Rules and conditions for using VYRO Live Connect",
    icon: FileText,
    color: "#8B5CF6",
    lastUpdated: "July 1, 2026",
    content: `Terms & Conditions

1. Acceptance of Terms
By accessing and using VYRO Live Connect, you accept and agree to be bound by these Terms and Conditions.

2. User Responsibilities
- Users must be at least 18 years old
- Users must provide accurate registration information
- Users are responsible for maintaining account security
- Users must not share inappropriate or harmful content

3. Prohibited Activities
- Harassment or hate speech
- Sharing copyrighted material without permission
- Impersonating other users
- Using bots or automated systems
- Engaging in fraudulent activities

4. Virtual Currency
- Coins are virtual currency with no cash value unless explicitly stated
- Coins are non-refundable except where required by law
- The platform reserves the right to adjust coin balances for fraudulent activity

5. Content License
By posting content, you grant VYRO a worldwide, non-exclusive license to use, display, and distribute your content within the platform.

6. Account Termination
The platform reserves the right to suspend or terminate accounts that violate these terms.`,
  },
  {
    id: "privacy",
    title: "Privacy Policy",
    description: "How we collect, use, and protect your data",
    icon: Shield,
    color: "#3B82F6",
    lastUpdated: "July 1, 2026",
    content: `Privacy Policy

1. Information We Collect
- Account information (name, email, phone number)
- Profile data (avatar, bio, country)
- Usage data (rooms visited, interactions)
- Device information (model, OS version)

2. How We Use Your Information
- To provide and improve our services
- To send notifications and updates
- To ensure platform security
- To comply with legal obligations

3. Data Sharing
We do not sell your personal information. We may share data with:
- Service providers who support our platform
- Law enforcement when legally required
- Other users based on your privacy settings

4. Data Security
We implement industry-standard security measures including encryption, access controls, and regular security audits.

5. Your Rights
- Access your personal data
- Request data deletion
- Opt-out of certain data collection
- Modify privacy settings at any time`,
  },
  {
    id: "community",
    title: "Community Guidelines",
    description: "Rules for maintaining a safe community",
    icon: Users,
    color: "#10B981",
    lastUpdated: "June 15, 2026",
    content: `Community Guidelines

1. Be Respectful
Treat all community members with respect. No harassment, bullying, or hate speech.

2. No Inappropriate Content
- No adult content or nudity
- No violent or graphic content
- No illegal activities or substances

3. Protect Privacy
- Do not share others' personal information
- Do not record or screenshot without consent

4. Authentic Interaction
- No spam or promotional flooding
- No fake accounts or impersonation
- No manipulation of engagement metrics

5. Report Violations
Use the report feature to flag inappropriate behavior. Our moderation team reviews all reports within 24 hours.

6. Consequences
Violations may result in content removal, temporary suspension, or permanent ban depending on severity.`,
  },
  {
    id: "agreement",
    title: "User Agreement",
    description: "Your agreement with VYRO Technologies",
    icon: FileCheck,
    color: "#F59E0B",
    lastUpdated: "July 1, 2026",
    content: `User Agreement

This agreement constitutes a legally binding contract between you and VYRO Technologies.

1. Service Description
VYRO Live Connect provides live streaming, social interaction, and virtual gifting services.

2. Eligibility
You must be 18+ and legally capable of entering into binding agreements.

3. Fees and Payments
- Some features require coin purchases
- All payments are processed through approved payment providers
- Refunds are subject to our refund policy

4. Intellectual Property
All platform content, branding, and features are owned by VYRO Technologies.

5. Limitation of Liability
VYRO is not liable for indirect, incidental, or consequential damages arising from platform use.

6. Governing Law
This agreement is governed by the laws of Qatar.`,
  },
  {
    id: "cookie",
    title: "Cookie Policy",
    description: "How we use cookies and tracking",
    icon: ScrollText,
    color: "#EC4899",
    lastUpdated: "June 1, 2026",
    content: `Cookie Policy

1. What Are Cookies
Cookies are small text files stored on your device to improve your browsing experience.

2. Types of Cookies We Use
- Essential: Required for core functionality
- Performance: Help us understand usage patterns
- Functional: Remember your preferences
- Targeting: Personalize your experience

3. Managing Cookies
You can control cookies through your device settings. Disabling some cookies may affect functionality.

4. Third-Party Cookies
We may use third-party cookies for analytics and advertising. These are governed by their respective privacy policies.`,
  },
];

export default function LegalPoliciesTab() {
  const [selected, setSelected] = useState(null);

  if (selected) {
    return (
      <div className="min-h-screen bg-[#F8F9FC]">
        <div className="max-w-md mx-auto">
          <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-4 py-3 flex items-center gap-3">
            <button
              onClick={() => setSelected(null)}
              className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center active:scale-95 transition"
            >
              <X size={18} className="text-gray-700" />
            </button>
            <h1 className="text-base font-bold text-gray-800 flex-1 truncate">{selected.title}</h1>
          </div>
          <div className="p-4 pb-24">
            <div className="mb-4 p-3 rounded-xl bg-gray-50 flex items-center gap-2">
              <AlertCircle size={14} className="text-gray-400 flex-shrink-0" />
              <span className="text-[10px] text-gray-400">Last updated: {selected.lastUpdated}</span>
            </div>
            <div className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
              {selected.content}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <SettingsShell title="Legal & Policies" subtitle="Official documents and policies">
      <SettingsCard title="Legal Documents">
        {DOCUMENTS.map((doc, i) => (
          <ActionRow
            key={doc.id}
            icon={doc.icon}
            label={doc.title}
            description={doc.description}
            color={doc.color}
            isLast={i === DOCUMENTS.length - 1}
            onClick={() => setSelected(doc)}
          />
        ))}
      </SettingsCard>

      <SettingsCard title="Additional Resources">
        <ActionRow
          icon={Lock} label="Data Protection" description="GDPR and data rights"
          color="#3B82F6" onClick={() => setSelected(DOCUMENTS[1])}
        />
        <ActionRow
          icon={Gavel} label="Dispute Resolution" description="How disputes are handled"
          color="#8B5CF6" onClick={() => setSelected(DOCUMENTS[3])}
        />
        <ActionRow
          icon={Heart} label="Safety Center" description="Stay safe on VYRO"
          color="#EC4899" isLast
        />
      </SettingsCard>

      <p className="text-[10px] text-gray-400 text-center mt-4 px-4">
        For legal inquiries, contact our legal team through Support Center.
      </p>
    </SettingsShell>
  );
}