// This file acts as the knowledge base for generating technical specs.
// It maps specific choices to technical implementation details.

export interface TechBlueprint {
  title: string;
  description: string;
  envVars: string[];
  packages: string[];
  requiredFiles: string[];
  technicalConstraints: string[];
  schemaSnippet?: string; // Optional DB schema related to this tech
}

export const BLUEPRINTS: Record<string, Record<string, TechBlueprint>> = {
  // --- FRONTEND FRAMEWORKS ---
  feFramework: {
    "Next.js (App Router)": {
      title: "Next.js 14+ App Router",
      description: "React framework with Server Components and Streaming.",
      envVars: ["NEXT_PUBLIC_API_URL"],
      packages: ["next", "react", "react-dom"],
      requiredFiles: ["app/layout.tsx", "app/page.tsx", "middleware.ts"],
      technicalConstraints: [
        "Use 'use client' directive only for interactive leaves.",
        "Implement metadata API for SEO.",
        "Use Server Actions for mutations where possible.",
      ],
    },
    "React (Vite)": {
      title: "React SPA (Vite)",
      description: "Standard Single Page Application.",
      envVars: ["VITE_API_URL"],
      packages: ["react", "react-dom", "react-router-dom"],
      requiredFiles: ["src/main.tsx", "src/App.tsx"],
      technicalConstraints: [
        "Use React Query for server state management.",
        "Ensure lazy loading for route splitting.",
      ],
    },
  },

  // --- STYLING ---
  stylingEngine: {
    "Tailwind CSS": {
      title: "Tailwind CSS",
      description: "Utility-first CSS framework.",
      envVars: [],
      packages: ["tailwindcss", "postcss", "autoprefixer", "clsx", "tailwind-merge"],
      requiredFiles: ["tailwind.config.ts", "globals.css"],
      technicalConstraints: [
        "Use 'clsx' and 'tailwind-merge' for dynamic class composition.",
        "Define theme colors in tailwind.config.ts for consistency.",
      ],
    },
  },

  // --- BACKEND RUNTIME ---
  beRuntime: {
    "Node.js (TypeScript)": {
      title: "Node.js (LTS) with TypeScript",
      description: "Standard backend runtime.",
      envVars: ["PORT", "NODE_ENV"],
      packages: ["tsx", "typescript", "@types/node"],
      requiredFiles: ["tsconfig.json", "src/index.ts"],
      technicalConstraints: [
        "Enforce strict type checking.",
        "Use async/await for all I/O operations.",
      ],
    },
    "Go": {
      title: "Go (Golang)",
      description: "High-performance compiled language.",
      envVars: ["PORT", "GO_ENV"],
      packages: [], // Go uses go.mod, not npm
      requiredFiles: ["go.mod", "main.go"],
      technicalConstraints: [
        "Use 'net/http' or 'gin/echo' for routing.",
        "Implement graceful shutdown for the server.",
      ],
    },
    "Python (FastAPI)": {
      title: "Python FastAPI",
      description: "Modern, fast (high-performance), web framework for building APIs with Python.",
      envVars: ["PORT", "PYTHON_ENV"],
      packages: [], // Python uses requirements.txt
      requiredFiles: ["requirements.txt", "main.py"],
      technicalConstraints: [
        "Use Pydantic models for data validation.",
        "Leverage async/await for non-blocking I/O.",
      ],
    },
  },

  // --- AUTHENTICATION ---
  authStrategy: {
    "Clerk (Managed)": {
      title: "Clerk Authentication",
      description: "Managed User Management & Auth.",
      envVars: [
        "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY",
        "CLERK_SECRET_KEY",
        "CLERK_WEBHOOK_SECRET",
      ],
      packages: ["@clerk/nextjs"],
      requiredFiles: ["middleware.ts", "app/api/webhooks/clerk/route.ts"],
      technicalConstraints: [
        "Protect routes using Clerk Middleware matcher.",
        "Sync user data to local DB via Webhooks (user.created, user.updated).",
        "Do NOT store sensitive auth data locally; rely on Clerk session token.",
      ],
      schemaSnippet: `
// Recommended User Table for Clerk Sync
model User {
  id        String   @id // Matches Clerk ID
  email     String   @unique
  firstName String?
  lastName  String?
  imageUrl  String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
      `,
    },
    "Auth.js/NextAuth (Self-hosted)": {
      title: "Auth.js (NextAuth v5)",
      description: "Self-hosted, database-backed authentication.",
      envVars: ["AUTH_SECRET", "AUTH_URL", "GITHUB_ID", "GITHUB_SECRET"],
      packages: ["next-auth@beta"],
      requiredFiles: ["auth.ts", "app/api/auth/[...nextauth]/route.ts"],
      technicalConstraints: [
        "Use 'jose' for edge-compatible JWT handling.",
        "Configure 'trustHost' for production deployment.",
      ],
      schemaSnippet: `
// NextAuth Standard Schema
model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  emailVerified DateTime?
  image         String?
  accounts      Account[]
  sessions      Session[]
}
      `,
    },
    "Simple Username and Password": {
      title: "Basic JWT Authentication",
      description: "Custom implementation using bcrypt and JWT.",
      envVars: ["JWT_SECRET"],
      packages: ["jsonwebtoken", "bcryptjs", "zod"],
      requiredFiles: ["lib/auth.ts", "middleware.ts"],
      technicalConstraints: [
        "Hash passwords using bcrypt (salt rounds >= 10).",
        "Store JWT in HTTP-Only cookies for security.",
        "Implement rate limiting on login endpoints.",
      ],
      schemaSnippet: `
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String   // Hashed
  createdAt DateTime @default(now())
}
      `,
    },
  },

  // --- DATABASE ---
  dbEngine: {
    "Neon DB": {
      title: "Neon (Serverless Postgres)",
      description: "Serverless Postgres with branching.",
      envVars: ["DATABASE_URL", "DIRECT_URL (for migration)"],
      packages: ["pg", "@neondatabase/serverless"],
      requiredFiles: [],
      technicalConstraints: [
        "Use connection pooling for Serverless environments.",
        "Use '@neondatabase/serverless' driver for Edge compatibility.",
      ],
    },
    "Supabase DB": {
      title: "Supabase (Postgres)",
      description: "Open source Firebase alternative.",
      envVars: ["DATABASE_URL", "NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY"],
      packages: ["@supabase/supabase-js"],
      requiredFiles: ["lib/supabase.ts"],
      technicalConstraints: [
        "Enable Row Level Security (RLS) on all tables.",
        "Use the Supabase client for client-side data fetching where appropriate.",
      ],
    },
    "MongoDB": {
      title: "MongoDB",
      description: "NoSQL Database.",
      envVars: ["MONGODB_URI"],
      packages: ["mongoose", "mongodb"],
      requiredFiles: ["lib/db.ts"],
      technicalConstraints: [
        "Define Mongoose schemas for type safety.",
        "Handle connection caching in Serverless environments (e.g. Next.js).",
      ],
    },
  },

  // --- INTEGRATIONS ---
  paymentDetail: {
    "Recurring Subscriptions (SaaS)": {
      title: "Stripe Subscriptions",
      description: "Recurring billing logic.",
      envVars: [
        "STRIPE_SECRET_KEY",
        "STRIPE_WEBHOOK_SECRET",
        "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY",
      ],
      packages: ["stripe"],
      requiredFiles: ["app/api/webhooks/stripe/route.ts", "lib/stripe.ts"],
      technicalConstraints: [
        "Implement 'portal' session for user billing management.",
        "Handle 'invoice.payment_failed' events to revoke access.",
        "Store 'stripeCustomerId' and 'subscriptionId' on the User model.",
      ],
      schemaSnippet: `
// Subscription Fields
model User {
  // ... other fields
  stripeCustomerId String? @unique
  subscriptionId   String?
  planStatus       String  @default("active") // active, past_due, canceled
  currentPeriodEnd DateTime?
}
      `,
    },
  },
  
  // --- STORAGE ---
  storageDetail: {
    "Public Avatars": {
      title: "Object Storage (Public Read)",
      description: "S3/R2 Bucket for user assets.",
      envVars: [
        "AWS_ACCESS_KEY_ID",
        "AWS_SECRET_ACCESS_KEY",
        "AWS_REGION",
        "BUCKET_NAME",
      ],
      packages: ["@aws-sdk/client-s3", "@aws-sdk/s3-request-presigner"],
      requiredFiles: ["lib/s3.ts"],
      technicalConstraints: [
        "Configure CORS to allow Uploads from your domain.",
        "Use Presigned URLs for uploads to avoid passing files through the server.",
        "Set Cache-Control headers (max-age=31536000) for immutable assets.",
      ],
    },
  },
};