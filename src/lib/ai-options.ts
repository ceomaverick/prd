
export interface TechOption {
  id: string;
  label: string;
  type: "select" | "multiselect";
  options: string[];
  default?: string | string[];
}

export const TECH_STACK_OPTIONS: TechOption[] = [
  {
    id: "auth",
    label: "Authentication",
    type: "select",
    options: ["Clerk", "NextAuth (Auth.js)", "Supabase Auth", "Firebase Auth", "Custom JWT"],
    default: "Clerk"
  },
  {
    id: "database",
    label: "Database",
    type: "select",
    options: ["PostgreSQL (Supabase)", "PostgreSQL (Neon)", "MongoDB", "MySQL", "DynamoDB"],
    default: "PostgreSQL (Supabase)"
  },
  {
    id: "backend",
    label: "Backend Framework",
    type: "select",
    options: ["Next.js Server Actions", "Node.js (Express)", "NestJS", "Python (FastAPI)", "Go (Fiber)"],
    default: "Next.js Server Actions"
  },
  {
    id: "ui",
    label: "UI Library",
    type: "select",
    options: ["shadcn/ui", "Tailwind UI"],
    default: "shadcn/ui"
  },
  {
    id: "mobile",
    label: "Mobile App Strategy",
    type: "multiselect",
    options: ["React Native (Expo)", "Flutter", "iOS (SwiftUI)", "Android (Kotlin)", "PWA"],
    default: []
  },
  {
    id: "payments",
    label: "Payment Gateway",
    type: "select",
    options: ["Stripe", "Lemon Squeezy", "PayPal", "Paddle", "None"],
    default: "None"
  },
  {
    id: "notifications",
    label: "Notifications",
    type: "multiselect",
    options: ["Email (Resend)", "Email (SendGrid)", "Push (OneSignal)", "SMS (Twilio)", "In-app Feed"],
    default: ["Email (Resend)"]
  },
  {
    id: "storage",
    label: "File Storage",
    type: "select",
    options: ["AWS S3", "Cloudflare R2", "Supabase Storage", "UploadThing", "None"],
    default: "None"
  },
  {
    id: "vibe",
    label: "Aesthetic Vibe",
    type: "select",
    options: ["Clean & Modern", "Minimalist", "Playful & Vibrant", "Professional & Enterprise", "Futuristic & Tech-focused"],
    default: "Clean & Modern"
  }
];
