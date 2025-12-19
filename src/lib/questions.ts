
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
  validation?: string; // Regex string
  default?: string | boolean | string[];
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
    label: "Objective", // Renamed label to Objective based on sample output preference
    description: "Describe the app's core objective in 2-3 sentences.",
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
    // Compulsory now (removed optional: true)
  },

  // --- SECTION 2: SCOPE & STRATEGY ---
  {
    id: "projectStage",
    section: "Scope & Strategy",
    label: "Project Stage",
    type: "select",
    options: ["MVP (Minimum Viable Product)", "Scalable V1 Production"],
  },
  {
    id: "platforms",
    section: "Scope & Strategy",
    label: "Target Platforms",
    type: "select",
    options: ["Web Application", "Web + Android and iOS Apps", "Only Android App", "Only iOS App"],
    default: "Web Application",
  },
  {
    id: "mobileTech",
    section: "Scope & Strategy",
    label: "Mobile Technology Stack",
    type: "multiselect",
    options: ["React Native", "Flutter", "Native Jetpack based Kotlin App"],
    condition: { field: "platforms", operator: "contains", value: "Android" }, 
  },

  // --- SECTION 3: UI/UX & DESIGN SYSTEM ---
  {
    id: "designIntent",
    section: "UI/UX & Design System",
    label: "Design Intent",
    description: "Overall product feel and audience expectation.",
    type: "select",
    options: ["Consumer-grade", "Enterprise-grade", "Developer-first", "Brand-first"],
    default: "Consumer-grade",
  },
  {
    id: "visualRiskTolerance",
    section: "UI/UX & Design System",
    label: "Visual Risk Tolerance (VRT)",
    description: "How conservative or expressive the UI can be.",
    type: "select",
    options: ["Conservative", "Balanced", "Experimental"],
    default: "Balanced",
  },
  {
    id: "primaryColor",
    section: "UI/UX & Design System",
    label: "Primary Color",
    type: "text",
    placeholder: "#3b82f6",
    validation: "^#([0-9a-fA-F]{6})$",
    description: "Hexadecimal code (e.g., #3b82f6)",
  },
  {
    id: "secondaryColor",
    section: "UI/UX & Design System",
    label: "Secondary Color",
    type: "text",
    placeholder: "#22c55e",
    validation: "^#([0-9a-fA-F]{6})$",
    description: "Used for accents, highlights, and secondary actions.",
  },
  {
    id: "themeMode",
    section: "UI/UX & Design System",
    label: "Theme Mode",
    type: "select",
    options: ["Light only", "Dark only", "Light and Dark Modes"],
    default: "Light only",
  },
  {
    id: "headlineFont",
    section: "UI/UX & Design System",
    label: "Headline Font",
    type: "select",
    options: ["Plus Jakarta Sans", "Roboto", "Merriweather"],
    default: "Plus Jakarta Sans",
  },
  {
    id: "bodyFont",
    section: "UI/UX & Design System",
    label: "Body Font",
    type: "select",
    options: ["Inter", "Roboto", "Open Sans"],
    default: "Inter",
  },
  {
    id: "iconSet",
    section: "UI/UX & Design System",
    label: "Icon Set",
    type: "select",
    options: ["Lucide React", "Heroicons", "Material Icons"],
    default: "Lucide React",
  },
  {
    id: "layoutRequirement",
    section: "UI/UX & Design System",
    label: "Layout Requirement",
    type: "select",
    options: [
      "Sidebar navigation with main content area",
      "Top navigation with dashboard-style main content",
      "Content-first layout",
    ],
    default: "Sidebar navigation with main content area",
  },
  {
    id: "componentLibrary",
    section: "UI/UX & Design System",
    label: "Component Library",
    type: "select",
    options: ["shadcn/ui", "Chakra UI", "Tailwind UI"],
    default: "shadcn/ui",
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
    options: ["Next.js (App Router)", "Next.js (Pages Router)", "React (Vite)"],
    default: "Next.js (App Router)",
  },
  {
    id: "stylingEngine",
    section: "Frontend Architecture",
    label: "Styling Engine",
    type: "select",
    options: ["Tailwind CSS", "CSS Modules", "Styled Components", "SCSS"],
    default: "Tailwind CSS",
  },
  {
    id: "stateManagement",
    section: "Frontend Architecture",
    label: "State Management Strategy",
    type: "select",
    options: ["React Standard", "Zustand (Global)", "React Context", "Redux Toolkit"],
    default: "React Standard",
  },
  {
    id: "formHandling",
    section: "Frontend Architecture",
    label: "Form Handling & Validation",
    type: "select",
    options: ["React Hook Form + Zod", "Formik + Yup", "Native Forms"],
    default: "React Hook Form + Zod",
  },

  // --- SECTION 6: BACKEND & API ARCHITECTURE ---
  {
    id: "beRuntime",
    section: "Backend & API Architecture",
    label: "Backend Runtime",
    type: "select",
    options: ["Node.js (TypeScript)", "Go", "Python (FastAPI)", "Edge Runtime"],
    default: "Node.js (TypeScript)",
  },
  {
    id: "apiStyle",
    section: "Backend & API Architecture",
    label: "API Architecture",
    type: "select",
    options: ["REST (OpenAPI/JSON)", "tRPC (Type-safe)", "GraphQL", "Server Actions Only"],
    default: "REST (OpenAPI/JSON)",
  },
  {
    id: "authStrategy",
    section: "Backend & API Architecture",
    label: "Authentication Strategy",
    type: "select",
    options: ["Clerk (Managed)", "Auth.js/NextAuth (Self-hosted)", "Supabase Auth", "Simple Username and Password"],
    default: "Simple Username and Password",
  },

  // --- SECTION 7: DATA MODELING ---
  {
    id: "dbEngine",
    section: "Data Modeling",
    label: "Database Engine",
    type: "select",
    options: ["Neon DB", "Supabase DB", "MongoDB"],
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
    default: ["None"],
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
    id: "compliance",
    section: "Security & Infrastructure",
    label: "Compliance Requirements",
    type: "multiselect",
    options: ["GDPR", "SOC2", "HIPAA", "None"],
    default: ["GDPR"],
  },
  {
    id: "cicd",
    section: "Security & Infrastructure",
    label: "CI/CD Pipeline",
    type: "select",
    options: ["GitHub Actions", "Vercel Auto-deploy", "GitLab CI", "Manual"],
    default: "Vercel Auto-deploy",
  },
];
