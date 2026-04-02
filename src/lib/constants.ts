export const HELP_TYPES = ["Food", "Education", "Medical", "Shelter"] as const;
export type HelpType = typeof HELP_TYPES[number];

export const URGENCY_LEVELS = ["Critical", "High", "Medium", "Low"] as const;
export type UrgencyLevel = typeof URGENCY_LEVELS[number];

export const REQUEST_STATUSES = [
  "pending",
  "verified",
  "rejected",
  "funded",
  "delivered",
  "impact_proof",
] as const;
export type RequestStatus = typeof REQUEST_STATUSES[number];

export const USER_ROLES = ["donor", "ngo_admin", "volunteer", "beneficiary"] as const;
export type UserRole = typeof USER_ROLES[number];

export const TIMELINE_STAGES = [
  { key: "pending", label: "Request Raised", icon: "FileText" },
  { key: "verified", label: "NGO Verified", icon: "CheckCircle" },
  { key: "funded", label: "Donation Received", icon: "Heart" },
  { key: "delivered", label: "Help Delivered", icon: "Package" },
  { key: "impact_proof", label: "Impact Proof", icon: "Camera" },
] as const;

export const GRATITUDE_QUOTES = [
  "Your heart so kind, your gift so true,\nA world of hope, because of you! 💖",
  "With every rupee, love takes flight,\nYou turned someone's dark into light! ✨",
  "A generous soul, a caring mind,\nYou're the best of humankind! 🌟",
  "Your kindness flows like rivers wide,\nBringing joy to every side! 🌊",
  "Seeds of hope you chose to sow,\nWatch a garden of smiles grow! 🌸",
  "In this world of give and take,\nYou chose to give, for kindness' sake! 💝",
  "Like sunshine after pouring rain,\nYour gift has eased someone's pain! ☀️",
  "A hand extended, warm and true,\nThe world is brighter thanks to you! 🌈",
  "From your heart to theirs, love flew,\nMaking dreams come wonderfully true! 🕊️",
  "Not all heroes wear a cape,\nSome just give and help reshape! 🦸",
];

export const MOCK_NGOS = [
  { id: "1", name: "Hope Foundation", mission: "Empowering underprivileged children through education", location: "Mumbai, Maharashtra", verified: true, causes: ["Education", "Food"], image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400" },
  { id: "2", name: "Green Earth Trust", mission: "Sustainable development and environmental conservation", location: "Delhi, NCR", verified: true, causes: ["Shelter", "Medical"], image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400" },
  { id: "3", name: "Smile India", mission: "Healthcare access for rural communities", location: "Bangalore, Karnataka", verified: true, causes: ["Medical", "Food"], image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=400" },
  { id: "4", name: "Asha Kiran", mission: "Shelter and rehabilitation for homeless families", location: "Chennai, Tamil Nadu", verified: true, causes: ["Shelter", "Education"], image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=400" },
];

export const MOCK_HELP_REQUESTS = [
  { id: "1", title: "School supplies for 50 children", type: "Education" as HelpType, urgency: "High" as UrgencyLevel, status: "verified" as RequestStatus, location: "Mumbai", ngo: "Hope Foundation", amount: 25000, raised: 15000, description: "50 children in Dharavi need school supplies including books, bags, and uniforms." },
  { id: "2", title: "Emergency medical aid for flood victims", type: "Medical" as HelpType, urgency: "Critical" as UrgencyLevel, status: "verified" as RequestStatus, location: "Kerala", ngo: "Smile India", amount: 100000, raised: 72000, description: "Urgent medical supplies and first-aid kits needed for flood-affected families." },
  { id: "3", title: "Monthly food rations for 100 families", type: "Food" as HelpType, urgency: "High" as UrgencyLevel, status: "funded" as RequestStatus, location: "Delhi", ngo: "Green Earth Trust", amount: 50000, raised: 50000, description: "Monthly food rations including rice, dal, oil and vegetables for 100 families." },
  { id: "4", title: "Shelter repair after cyclone", type: "Shelter" as HelpType, urgency: "Critical" as UrgencyLevel, status: "verified" as RequestStatus, location: "Odisha", ngo: "Asha Kiran", amount: 200000, raised: 85000, description: "Rebuilding homes destroyed by the recent cyclone for 30 families." },
  { id: "5", title: "Scholarship fund for girls' education", type: "Education" as HelpType, urgency: "Medium" as UrgencyLevel, status: "verified" as RequestStatus, location: "Rajasthan", ngo: "Hope Foundation", amount: 75000, raised: 30000, description: "Annual scholarships for 25 girls to continue their education." },
];

export const MOCK_IMPACT_STORIES = [
  { id: "1", title: "From Hunger to Hope", description: "How monthly food drives transformed a village in Bihar", image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600", ngo: "Green Earth Trust", beneficiaries: 500, donations: 250000 },
  { id: "2", title: "Education Changes Everything", description: "30 children graduated with top marks thanks to our tutoring program", image: "https://images.unsplash.com/photo-1497375638960-ca368c7231e4?w=600", ngo: "Hope Foundation", beneficiaries: 30, donations: 150000 },
  { id: "3", title: "New Homes, New Beginnings", description: "15 families moved into rebuilt homes after the floods", image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600", ngo: "Asha Kiran", beneficiaries: 75, donations: 500000 },
];
