import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

const ROLES = [
  {
    role_key: 'owner',
    title: 'Application Owner (AO)',
    short_code: 'AO',
    icon: '👑',
    reports_to: '',
    reports_to_label: 'None (Highest Authority)',
    position_level: 'Founder & Chief Executive Authority',
    responsibilities: [
      "Owns the entire VYRO Live Connect platform.",
      "Defines the company's vision, mission, and long-term strategy.",
      "Holds final authority over all business, financial, legal, technical, and operational decisions.",
      "Approves or rejects all executive-level appointments.",
      "Oversees all departments, countries, and global operations.",
      "Controls company assets, intellectual property, and platform ownership.",
      "Approves company policies, regulations, and strategic initiatives.",
    ],
    authority: [
      "Full platform access.",
      "Full financial authority.",
      "Final approval authority.",
      "Final security authority.",
      "Can appoint, suspend, terminate, or remove any role.",
      "Can override any decision made by subordinate roles.",
    ],
    reports_received_from: ["Super Admin Manager (SAM)", "Country Manager (CM)"],
    hierarchy_order: 1,
    dashboard_path: '/owner-dashboard',
  },
  {
    role_key: 'sam',
    title: 'Super Admin Manager (SAM)',
    short_code: 'SAM',
    icon: '👨‍💼',
    reports_to: 'owner',
    reports_to_label: 'Application Owner (AO)',
    position_level: 'Executive Administration Head',
    responsibilities: [
      "Manage all Super Admin operations.",
      "Supervise administrative departments.",
      "Implement Application Owner directives.",
      "Monitor platform security and administration.",
      "Manage Coin Packages.",
      "Manage VIP Membership Packages.",
      "Manage PK Battle Events.",
      "Approve operational administrative requests.",
      "Supervise platform moderation.",
      "Coordinate with Country Managers.",
    ],
    authority: [
      "Administrative authority delegated by AO.",
      "Can assign or revoke administrative permissions.",
      "Can suspend or recommend dismissal of staff according to company policy.",
      "Can manage system settings delegated by AO.",
    ],
    reports_received_from: ["Super Admin (SA)", "Offline Coin Seller (OCS)"],
    hierarchy_order: 2,
    dashboard_path: '/sam-dashboard',
  },
  {
    role_key: 'country',
    title: 'Country Manager (CM)',
    short_code: 'CM',
    icon: '🌍',
    reports_to: 'owner',
    reports_to_label: 'Application Owner (AO)',
    position_level: 'National Operations Head',
    responsibilities: [
      "Manage all operations within assigned country.",
      "Monitor business performance.",
      "Supervise country departments.",
      "Develop country growth strategy.",
      "Ensure legal and regulatory compliance.",
      "Submit reports to Application Owner.",
    ],
    authority: [
      "Manage all country-level departments.",
      "Approve country operational activities.",
      "Recommend promotions and disciplinary actions.",
    ],
    reports_received_from: ["Business Developer (BD)"],
    hierarchy_order: 3,
    dashboard_path: '/country-manager-dashboard',
  },
  {
    role_key: 'business-developer',
    title: 'Business Developer (BD)',
    short_code: 'BD',
    icon: '📈',
    reports_to: 'country',
    reports_to_label: 'Country Manager (CM)',
    position_level: 'Business Development Executive',
    responsibilities: [
      "Develop partnerships.",
      "Expand business.",
      "Increase revenue.",
      "Identify new opportunities.",
      "Build agency networks.",
    ],
    authority: [],
    reports_received_from: ["Business Manager (BM)"],
    hierarchy_order: 4,
    dashboard_path: '/business-developer-dashboard',
  },
  {
    role_key: 'business-manager',
    title: 'Business Manager (BM)',
    short_code: 'BM',
    icon: '🏢',
    reports_to: 'business-developer',
    reports_to_label: 'Business Developer (BD)',
    position_level: 'Business Operations Manager',
    responsibilities: [
      "Manage daily operations.",
      "Supervise departmental managers.",
      "Monitor KPIs.",
      "Improve operational efficiency.",
      "Coordinate departments.",
    ],
    authority: [],
    reports_received_from: ["Reward Manager (RM)", "PK Manager (PM)", "Event Manager (EM)", "Support Manager (SM)", "Marketing Manager (MM)", "Finance Manager (FM)"],
    hierarchy_order: 5,
    dashboard_path: '/business-manager-dashboard',
  },
  {
    role_key: 'reward-manager',
    title: 'Reward Manager (RM)',
    short_code: 'RM',
    icon: '🎁',
    reports_to: 'business-manager',
    reports_to_label: 'Business Manager (BM)',
    position_level: 'Department Manager — Rewards',
    responsibilities: [
      "Reward programs.",
      "Bonus management.",
      "Incentive distribution.",
      "Reward verification.",
      "Campaign rewards.",
    ],
    authority: [],
    reports_received_from: [],
    hierarchy_order: 6,
    dashboard_path: '/reward-manager-dashboard',
  },
  {
    role_key: 'pk-manager',
    title: 'PK Manager (PM)',
    short_code: 'PM',
    icon: '⚔️',
    reports_to: 'business-manager',
    reports_to_label: 'Business Manager (BM)',
    position_level: 'Department Manager — PK Battles',
    responsibilities: [
      "PK Battle management.",
      "PK rankings.",
      "PK scheduling.",
      "Competition monitoring.",
      "PK reward distribution.",
    ],
    authority: [],
    reports_received_from: [],
    hierarchy_order: 7,
    dashboard_path: '/pk-manager-dashboard',
  },
  {
    role_key: 'event-manager',
    title: 'Event Manager (EM)',
    short_code: 'EM',
    icon: '🎉',
    reports_to: 'business-manager',
    reports_to_label: 'Business Manager (BM)',
    position_level: 'Department Manager — Events',
    responsibilities: [
      "Plan platform events.",
      "Execute campaigns.",
      "Organize seasonal activities.",
      "Manage live events.",
      "Prepare event reports.",
    ],
    authority: [],
    reports_received_from: [],
    hierarchy_order: 8,
    dashboard_path: '/event-manager-dashboard',
  },
  {
    role_key: 'support-manager',
    title: 'Support Manager (SM)',
    short_code: 'SM',
    icon: '🛠️',
    reports_to: 'business-manager',
    reports_to_label: 'Business Manager (BM)',
    position_level: 'Department Manager — Support',
    responsibilities: [
      "Customer support.",
      "Complaint resolution.",
      "Ticket management.",
      "User satisfaction.",
      "Service quality monitoring.",
    ],
    authority: [],
    reports_received_from: [],
    hierarchy_order: 9,
    dashboard_path: '/support-manager-dashboard',
  },
  {
    role_key: 'marketing-manager',
    title: 'Marketing Manager (MM)',
    short_code: 'MM',
    icon: '📢',
    reports_to: 'business-manager',
    reports_to_label: 'Business Manager (BM)',
    position_level: 'Department Manager — Marketing',
    responsibilities: [
      "Marketing campaigns.",
      "Brand promotion.",
      "User acquisition.",
      "Advertising strategy.",
      "Market research.",
    ],
    authority: [],
    reports_received_from: [],
    hierarchy_order: 10,
    dashboard_path: '/marketing-manager-dashboard',
  },
  {
    role_key: 'finance-manager',
    title: 'Finance Manager (FM)',
    short_code: 'FM',
    icon: '💳',
    reports_to: 'business-manager',
    reports_to_label: 'Business Manager (BM)',
    position_level: 'Department Manager — Finance',
    responsibilities: [
      "Revenue management.",
      "Financial reporting.",
      "Withdrawal monitoring.",
      "Budget planning.",
      "Payment verification.",
    ],
    authority: [],
    reports_received_from: [],
    hierarchy_order: 11,
    dashboard_path: '/finance-manager-dashboard',
  },
  {
    role_key: 'super-admin',
    title: 'Super Admin (SA)',
    short_code: 'SA',
    icon: '🧠',
    reports_to: 'sam',
    reports_to_label: 'Super Admin Manager (SAM)',
    position_level: 'Platform Administrator',
    responsibilities: [
      "Platform administration.",
      "User verification.",
      "Security monitoring.",
      "Technical supervision.",
      "Moderation.",
    ],
    authority: [],
    reports_received_from: ["Admin (AN)"],
    hierarchy_order: 12,
    dashboard_path: '/super-admin-dashboard',
  },
  {
    role_key: 'admin',
    title: 'Admin (AN)',
    short_code: 'AN',
    icon: '🏢',
    reports_to: 'super-admin',
    reports_to_label: 'Super Admin (SA)',
    position_level: 'Administrator',
    responsibilities: [
      "User management.",
      "Daily administration.",
      "Account monitoring.",
      "Reports handling.",
      "Operational support.",
    ],
    authority: [],
    reports_received_from: ["Agent"],
    hierarchy_order: 13,
    dashboard_path: '/admin-dashboard',
  },
  {
    role_key: 'agent',
    title: 'Agent',
    short_code: 'AGT',
    icon: '🧑',
    reports_to: 'admin',
    reports_to_label: 'Admin (AN)',
    position_level: 'Agent',
    responsibilities: [
      "Recruit Hosts.",
      "Manage Hosts.",
      "Community growth.",
      "Performance monitoring.",
      "Team development.",
    ],
    authority: [],
    reports_received_from: ["Host"],
    hierarchy_order: 14,
    dashboard_path: '/agent-dashboard',
  },
  {
    role_key: 'host',
    title: 'Host',
    short_code: 'HST',
    icon: '🎤',
    reports_to: 'agent',
    reports_to_label: 'Agent',
    position_level: 'Host',
    responsibilities: [
      "Live streaming.",
      "Audience engagement.",
      "Content creation.",
      "Community interaction.",
      "Gift revenue generation.",
      "Platform policy compliance.",
    ],
    authority: [],
    reports_received_from: [],
    hierarchy_order: 15,
    dashboard_path: '/host-dashboard',
  },
  {
    role_key: 'seller',
    title: 'Offline Coin Seller (OCS)',
    short_code: 'OCS',
    icon: '🪙',
    reports_to: 'sam',
    reports_to_label: 'Super Admin Manager (SAM) Only',
    position_level: 'Authorized Offline Coin Sales Representative',
    responsibilities: [
      "Sell official VYRO Coin Packages through approved offline channels.",
      "Verify customer payment before coin delivery.",
      "Maintain offline sales records.",
      "Submit daily, weekly, and monthly sales reports.",
      "Prevent fraud and unauthorized coin sales.",
      "Follow company pricing and policies.",
      "Keep customer transaction records.",
      "Coordinate with Finance when required.",
      "Maintain confidentiality of customer information.",
    ],
    authority: [],
    reports_received_from: [],
    hierarchy_order: 16,
    dashboard_path: '/seller-dashboard',
  },
];

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json().catch(() => ({}));
    const { action } = body;

    // Seed roles into Supabase (admin only)
    if (action === 'seed') {
      if (user.role !== 'admin') return Response.json({ error: 'Forbidden' }, { status: 403 });

      const existing = await base44.asServiceRole.entities.EnterpriseRole.list();
      const existingKeys = new Set(existing.map((r: any) => r.role_key));

      const toCreate = ROLES.filter(r => !existingKeys.has(r.role_key));
      if (toCreate.length > 0) {
        await base44.asServiceRole.entities.EnterpriseRole.bulkCreate(toCreate as any);
      }

      return Response.json({
        success: true,
        created: toCreate.length,
        total: ROLES.length,
        already_existed: existing.length,
      });
    }

    // Get all roles (sorted by hierarchy)
    if (action === 'getAll') {
      const roles = await base44.asServiceRole.entities.EnterpriseRole.filter(
        { is_active: true },
        'hierarchy_order'
      );
      return Response.json({ roles });
    }

    // Get single role by key
    if (action === 'getRole') {
      const { role_key } = body;
      if (!role_key) return Response.json({ error: 'role_key is required' }, { status: 400 });
      const roles = await base44.asServiceRole.entities.EnterpriseRole.filter({ role_key });
      if (roles.length === 0) return Response.json({ error: 'Role not found' }, { status: 404 });
      return Response.json({ role: roles[0] });
    }

    // Get subordinates of a role (who reports to this role)
    if (action === 'getSubordinates') {
      const { role_key } = body;
      if (!role_key) return Response.json({ error: 'role_key is required' }, { status: 400 });
      const subordinates = await base44.asServiceRole.entities.EnterpriseRole.filter(
        { reports_to: role_key, is_active: true },
        'hierarchy_order'
      );
      return Response.json({ subordinates });
    }

    // Get full reporting chain from a role up to the top
    if (action === 'getChain') {
      const { role_key } = body;
      if (!role_key) return Response.json({ error: 'role_key is required' }, { status: 400 });

      const chain: any[] = [];
      let currentKey = role_key;
      const allRoles = await base44.asServiceRole.entities.EnterpriseRole.filter({ is_active: true });

      const roleMap = new Map(allRoles.map((r: any) => [r.role_key, r]));
      let attempts = 0;
      while (currentKey && roleMap.has(currentKey) && attempts < 20) {
        const role = roleMap.get(currentKey);
        chain.push(role);
        currentKey = role.reports_to;
        attempts++;
      }

      return Response.json({ chain });
    }

    return Response.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});