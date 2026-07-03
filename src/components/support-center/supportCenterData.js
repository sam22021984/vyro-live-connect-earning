// Support Center data — VYRO Live Connect

export const SUPPORT_OPTIONS = [
  {
    id: "help",
    title: "Help Center",
    description: "A complete knowledge base containing guides and tutorials.",
    icon: "Book",
    color: "#2F80ED",
    gradient: "linear-gradient(135deg, #2F80ED, #56CCF2)",
    features: [
      "Frequently Asked Questions", "Getting Started Guide", "Account Management",
      "Wallet Guide", "Coins Guide", "Recharge Guide", "Withdrawal Guide",
      "Live Streaming Guide", "Host Guide", "Agency Guide", "Safety Tips",
      "Privacy Information", "Community Guidelines", "Troubleshooting", "Search Articles",
    ],
    actions: ["Search Articles", "Read Guides", "Bookmark", "Share", "Report Issue"],
  },
  {
    id: "feedback",
    title: "Feedback",
    description: "Submit ideas, suggestions, complaints, and feature requests.",
    icon: "MessageCircle",
    color: "#8B5CF6",
    gradient: "linear-gradient(135deg, #8B5CF6, #A78BFA)",
    features: [
      "App Experience", "Bug Report", "Feature Request", "Payment Issue",
      "Live Streaming", "Audio Room", "Video Call", "Coins", "Wallet",
      "Host Experience", "Agency Experience", "Customer Service", "Other",
    ],
    fields: ["Subject", "Description", "Screenshot Upload", "Screen Recording", "Device Info", "App Version"],
    actions: ["Submit Feedback", "Save Draft", "Cancel"],
  },
  {
    id: "support",
    title: "Customer Support",
    description: "Direct communication with the support team.",
    icon: "Headset",
    color: "#27AE60",
    gradient: "linear-gradient(135deg, #27AE60, #2ECC71)",
    features: [
      "Live Chat", "Email Support", "WhatsApp Support", "Telegram Support", "Phone Support",
    ],
    ticketStatuses: ["Pending", "Open", "In Progress", "Waiting for User", "Resolved", "Closed"],
    actions: ["Create Ticket", "View History", "Track Status", "Upload Files", "Priority Support", "Emergency"],
  },
  {
    id: "updates",
    title: "New Updates",
    description: "Latest announcements and application updates.",
    icon: "Bell",
    color: "#F2994A",
    gradient: "linear-gradient(135deg, #F2994A, #FBB040)",
    features: [
      "New Features", "Bug Fixes", "Maintenance Notices", "Security Updates",
      "Server Maintenance", "Event Announcements", "VIP Updates", "Coin Promotions", "Agency Updates",
    ],
    actions: ["Read Details", "Mark as Read", "Share", "View History"],
  },
  {
    id: "appupdate",
    title: "App Update",
    description: "Manage application versions and updates.",
    icon: "Smartphone",
    color: "#3B82F6",
    gradient: "linear-gradient(135deg, #3B82F6, #60A5FA)",
    features: [
      "Current Version", "Latest Version", "Update Size", "Release Notes",
      "Download Progress", "Automatic Update", "Check for Updates", "Update History",
    ],
    actions: ["Download", "Install", "Remind Me Later", "Enable Auto Update"],
  },
  {
    id: "blacklist",
    title: "Blacklist",
    description: "Manage blocked users.",
    icon: "Ban",
    color: "#EB5757",
    gradient: "linear-gradient(135deg, #EB5757, #F87171)",
    features: [
      "View Blocked Users", "Search User", "Unblock User", "Block Reason",
      "Block Date", "User Profile", "Report User",
    ],
    actions: ["Remove from Blacklist", "View Profile", "Report Abuse"],
  },
];

export const SUPPORT_FAQS = [
  { q: "How do I recharge coins?", a: "Go to Finance > Recharge, select a package, and complete payment via your preferred method.", category: "Coins" },
  { q: "How do I become a host?", a: "Visit Apply Center and submit a Host Application with required documents for verification.", category: "Host" },
  { q: "How do I withdraw earnings?", a: "Navigate to Finance > Withdrawal, enter your payment details, and submit your withdrawal request.", category: "Wallet" },
  { q: "How do I update my profile?", a: "Go to Settings > Profile to update your username, bio, avatar, and personal information.", category: "Account" },
  { q: "How do I report a user?", a: "Visit the user's profile, tap More, and select Report. Choose a reason and provide details.", category: "Safety" },
  { q: "How do I join a live room?", a: "Open Party Center, browse rooms, and tap Join on any room you'd like to enter.", category: "Live" },
];

export const SUPPORT_ANNOUNCEMENTS = [
  { title: "New VIP Benefits Released", type: "VIP Update", time: "2h ago", color: "#D4AF37", isNew: true },
  { title: "Coin Recharge Bonus +20%", type: "Coin Promotion", time: "5h ago", color: "#F59E0B", isNew: true },
  { title: "Server Maintenance Scheduled", type: "Maintenance", time: "1d ago", color: "#6B7280", isNew: false },
  { title: "PK Battle Championship Live", type: "Event", time: "2d ago", color: "#EF4444", isNew: false },
  { title: "New Gift Collection Available", type: "New Feature", time: "3d ago", color: "#2F80ED", isNew: false },
];

export const SUPPORT_SECURITY_REPORTS = [
  { label: "Report Abuse", icon: "Flag", color: "#EB5757" },
  { label: "Report Fraud", icon: "AlertTriangle", color: "#F2994A" },
  { label: "Report Fake Account", icon: "UserX", color: "#EB5757" },
  { label: "Report Payment Issue", icon: "CreditCard", color: "#F2994A" },
  { label: "Report Copyright", icon: "Copyright", color: "#2F80ED" },
  { label: "Report Harassment", icon: "ShieldAlert", color: "#EB5757" },
];

export const SUPPORT_NOTIFICATIONS = [
  { label: "Ticket Updates", icon: "Ticket", color: "#2F80ED" },
  { label: "New Replies", icon: "MessageSquare", color: "#27AE60" },
  { label: "Announcements", icon: "Megaphone", color: "#F2994A" },
  { label: "Maintenance Alerts", icon: "Wrench", color: "#6B7280" },
  { label: "Security Alerts", icon: "ShieldAlert", color: "#EB5757" },
  { label: "Update Available", icon: "Download", color: "#3B82F6" },
];