
export type QuestionType = "text" | "textarea" | "select" | "multiselect" | "boolean";

export interface Question {
  id: string;
  section: string;
  label: string;
  description?: string;
  type: QuestionType;
  options?: string[];
  placeholder?: string;
  optional?: boolean;
  condition?: {
    field: string;
    value: string | boolean | string[];
    operator: "equals" | "contains" | "not_equals";
  };
}

export const SECTIONS = [
  "Identity & Context",
  "Scope & Strategy",
  "UI/UX & Design System",
  "Features & Functional Specs",
  "Frontend Architecture",
  "Backend & API Architecture",
  "Data Modeling",
  "Integrations",
  "Security & Infrastructure",
] as const;

export const MASTER_QUESTIONS: Question[] = [
  // --- SECTION 1: IDENTITY & CONTEXT ---
  {
    id: "projectName",
    section: "Identity & Context",
    label: "Project Name",
    type: "text",
    placeholder: "e.g., Axistrack",
  },
  {
    id: "elevatorPitch",
    section: "Identity & Context",
    label: "Elevator Pitch",
    description: "Describe the app in 2-3 sentences focusing on the problem and solution.",
    type: "textarea",
    placeholder: "A fleet management system that reduces fuel costs using AI-driven routing...",
    optional: true,
  },
  {
    id: "targetAudience",
    section: "Identity & Context",
    label: "Target Audience",
    description: "Who are the primary users? (e.g., Logistic Managers, Solo Founders).",
    type: "text",
    placeholder: "e.g., Small business owners in the shipping industry",
  },
  {
    id: "problemStatement",
    section: "Identity & Context",
    label: "Problem Statement",
    description: "What is the specific pain point this app eliminates?",
    type: "textarea",
    placeholder: "Manual route planning takes 4 hours daily and results in 15% wasted fuel.",
    optional: true,
  },

  // --- SECTION 2: SCOPE & STRATEGY ---
  {
    id: "projectStage",
    section: "Scope & Strategy",
    label: "Project Stage",
    type: "select",
    options: ["Proof of Concept (PoC)", "MVP (Minimum Viable Product)", "Scalable V1 Production"],
  },
  {
    id: "timeline",
    section: "Scope & Strategy",
    label: "Timeline Constraints",
    description: "What is the absolute 'must-ship' date?",
    type: "text",
    placeholder: "e.g., 3 months from kickoff",
    optional: true,
  },
  {
    id: "platforms",
    section: "Scope & Strategy",
    label: "Target Platforms",
    type: "multiselect",
    options: ["Web (Desktop)", "Web (Mobile Responsive)", "Native iOS", "Native Android"],
  },

  // --- SECTION 3: UI/UX & DESIGN SYSTEM ---
  {
    id: "designAesthetic",
    section: "UI/UX & Design System",
    label: "Design Aesthetic",
    type: "select",
    options: ["Clean/Enterprise (Stripe-like)", "Playful/Bouncy (Duolingo-like)", "Brutalist/Bold", "Minimalist/SaaS"],
  },
  {
    id: "colorPalette",
    section: "UI/UX & Design System",
    label: "Brand Color & Mode",
    description: "Primary brand color and theme preference.",
    type: "text",
    placeholder: "e.g., #3b82f6 (Blue) | System/Dark Mode support",
    optional: true,
  },
  {
    id: "typography",
    section: "UI/UX & Design System",
    label: "Typography Style",
    type: "select",
    options: ["Sans-serif (Inter/Geist)", "Serif (Playfair/Merriweather)", "Monospace (JetBrains/Roboto Mono)"],
  },
  {
    id: "iconSet",
    section: "UI/UX & Design System",
    label: "Iconography Set",
    type: "select",
    options: ["Lucide React", "Heroicons", "FontAwesome", "Phosphor Icons"],
  },
  {
    id: "layoutStructure",
    section: "UI/UX & Design System",
    label: "Layout Structure",
    type: "select",
    options: ["Sidebar Navigation", "Top Navbar Only", "Dashboard Grid", "Hybrid"],
  },
  {
    id: "componentSystem",
    section: "UI/UX & Design System",
    label: "Component System Strategy",
    type: "select",
    options: ["shadcn/ui (Tailwind + Radix)", "Chakra UI", "Mantine", "Tailwind UI (Custom)"],
  },

  // --- SECTION 4: FEATURES & FUNCTIONAL SPECS ---
  {
    id: "killerFeature",
    section: "Features & Functional Specs",
    label: "The 'Killer' Feature",
    description: "The core value prop that makes the app unique.",
    type: "textarea",
    placeholder: "e.g., Automatic invoice generation from GPS logs.",
    optional: true,
  },
  {
    id: "userFlow",
    section: "Features & Functional Specs",
    label: "Primary User Flow",
    description: "Describe the 'Happy Path' for the core feature.",
    type: "textarea",
    placeholder: "1. Login -> 2. Connect Vehicle -> 3. Start Trip -> 4. Receive Report",
    optional: true,
  },
  {
    id: "secondaryFeatures",
    section: "Features & Functional Specs",
    label: "Secondary Feature List",
    type: "textarea",
    placeholder: "User profile management, Export to CSV, Trip history filters",
    optional: true,
  },
  {
    id: "adminNeeds",
    section: "Features & Functional Specs",
    label: "Admin/Internal Requirements",
    type: "textarea",
    placeholder: "Global dashboard to view all active vehicles and ban users.",
    optional: true,
  },

  // --- SECTION 5: FRONTEND ARCHITECTURE ---
  {
    id: "feFramework",
    section: "Frontend Architecture",
    label: "Frontend Framework",
    type: "select",
    options: ["Next.js (App Router)", "Next.js (Pages Router)", "React (Vite)", "Remix"],
  },
  {
    id: "stylingEngine",
    section: "Frontend Architecture",
    label: "Styling Engine",
    type: "select",
    options: ["Tailwind CSS", "CSS Modules", "Styled Components", "SCSS"],
  },
  {
    id: "stateManagement",
    section: "Frontend Architecture",
    label: "State Management Strategy",
    type: "select",
    options: ["Zustand (Global)", "TanStack Query (Server State Only)", "React Context", "Redux Toolkit"],
  },
  {
    id: "formHandling",
    section: "Frontend Architecture",
    label: "Form Handling & Validation",
    type: "select",
    options: ["React Hook Form + Zod", "Formik + Yup", "Native Forms"],
  },

  // --- SECTION 6: BACKEND & API ARCHITECTURE ---
  {
    id: "beRuntime",
    section: "Backend & API Architecture",
    label: "Backend Runtime",
    type: "select",
    options: ["Node.js (TypeScript)", "Node.js (JavaScript)", "Go", "Python (FastAPI)", "Edge Runtime"],
  },
  {
    id: "apiStyle",
    section: "Backend & API Architecture",
    label: "API Architecture",
    type: "select",
    options: ["REST (OpenAPI/JSON)", "tRPC (Type-safe)", "GraphQL", "Server Actions Only"],
  },
  {
    id: "authStrategy",
    section: "Backend & API Architecture",
    label: "Authentication Strategy",
    type: "select",
    options: ["Clerk (Managed)", "Auth.js/NextAuth (Self-hosted)", "Supabase Auth", "Custom JWT"],
  },
  {
    id: "realtimeNeeds",
    section: "Backend & API Architecture",
    label: "Real-time Requirements",
    type: "boolean",
  },

  // --- SECTION 7: DATA MODELING ---
  {
    id: "dbEngine",
    section: "Data Modeling",
    label: "Database Engine",
    type: "select",
    options: ["PostgreSQL", "MySQL", "SQLite", "MongoDB"],
  },
  {
    id: "orm",
    section: "Data Modeling",
    label: "ORM / Query Builder",
    type: "select",
    options: ["Drizzle ORM", "Prisma", "Kysely", "Raw SQL"],
  },
  {
    id: "multiTenancy",
    section: "Data Modeling",
    label: "Multi-Tenancy Model",
    type: "select",
    options: ["User-only data", "Team/Org isolation", "Public platform"],
  },
  {
    id: "dataRetention",
    section: "Data Modeling",
    label: "Data Retention Strategy",
    type: "select",
    options: ["Hard Delete", "Soft Delete (is_deleted flag)", "Archive Table"],
  },

  // --- SECTION 8: INTEGRATIONS ---
  {
    id: "integrationList",
    section: "Integrations",
    label: "Required Third-Party Modules",
    type: "multiselect",
    options: ["Payments (Stripe/Lemon)", "File Storage (S3/R2)", "Email (Resend/SendGrid)", "None"],
  },
  {
    id: "paymentDetail",
    section: "Integrations",
    label: "Billing Model",
    type: "select",
    options: ["One-time purchase", "Recurring Subscriptions (SaaS)", "Marketplace/Split"],
    condition: { field: "integrationList", operator: "contains", value: "Payments (Stripe/Lemon)" },
  },
  {
    id: "storageDetail",
    section: "Integrations",
    label: "Storage Types",
    type: "multiselect",
    options: ["Public Avatars", "Encrypted Documents", "Large Video Assets"],
    condition: { field: "integrationList", operator: "contains", value: "File Storage (S3/R2)" },
  },

  // --- SECTION 9: SECURITY & INFRASTRUCTURE ---
  {
    id: "hosting",
    section: "Security & Infrastructure",
    label: "Deployment Platform",
    type: "select",
    options: ["Vercel", "AWS", "Fly.io", "Railway", "DigitalOcean"],
  },
  {
    id: "rateLimiting",
    section: "Security & Infrastructure",
    label: "API Rate Limiting Needed?",
    type: "boolean",
  },
  {
    id: "compliance",
    section: "Security & Infrastructure",
    label: "Compliance Requirements",
    type: "multiselect",
    options: ["GDPR", "SOC2", "HIPAA", "None"],
  },
  {
    id: "monitoring",
    section: "Security & Infrastructure",
    label: "Monitoring & Error Tracking",
    type: "multiselect",
    options: ["Sentry (Errors)", "Axiom (Logs)", "PostHog (Analytics)", "Datadog"],
  },
  {
    id: "cicd",
    section: "Security & Infrastructure",
    label: "CI/CD Pipeline",
    type: "select",
    options: ["GitHub Actions", "Vercel Auto-deploy", "GitLab CI", "Manual"],
  },
];
