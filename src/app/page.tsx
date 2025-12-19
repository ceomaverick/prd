"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Zap, Shield, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  const handleStart = () => {
    const newId = `spec-${Date.now()}`;
    router.push(`/generate/${newId}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="px-6 lg:px-12 h-16 flex items-center justify-between border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <div className="bg-primary text-primary-foreground p-1 rounded-md">
            <FileText className="h-5 w-5" />
          </div>
          <span>PRD Gen</span>
        </div>
        <nav className="hidden md:flex gap-6 text-sm font-medium text-muted-foreground">
          <Link href="#features" className="hover:text-primary transition-colors">Features</Link>
          <Link href="#how-it-works" className="hover:text-primary transition-colors">How it Works</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-sm font-medium hover:underline hidden sm:block">
            Log in
          </Link>
          <Button onClick={handleStart}>Start Free</Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-32 px-6 lg:px-12 text-center max-w-5xl mx-auto space-y-8">
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary hover:bg-primary/20">
            For Solo Developers & Indie Hackers
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Generate Technical Specs <br className="hidden md:block" />
            <span className="text-primary">in 10 Minutes.</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stop mid-sprint surprises. Get implementation-ready PRDs with database schemas, API patterns, and integration configs—without the fluff.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button size="lg" className="h-12 px-8 text-base" onClick={handleStart}>
              Start Building Now <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <p className="text-sm text-muted-foreground">No signup required for first draft</p>
          </div>
          
          <div className="pt-12">
            <div className="p-4 bg-muted/30 rounded-xl border shadow-sm max-w-4xl mx-auto">
              <div className="flex items-center gap-2 border-b pb-4 mb-4 px-2">
                 <div className="w-3 h-3 rounded-full bg-red-400"></div>
                 <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                 <div className="w-3 h-3 rounded-full bg-green-400"></div>
                 <div className="text-xs text-muted-foreground ml-2 font-mono">technical-spec-v1.md</div>
              </div>
              <pre className="text-left font-mono text-sm overflow-x-auto p-4 pt-0 text-muted-foreground">
                <span className="text-primary">## 1. Authentication (Clerk)</span>
                - Webhook Endpoint: /api/webhooks/clerk
                - Required Events: user.created, user.updated
                
                <span className="text-primary">## 2. Database Schema (PostgreSQL)</span>
                - Table: Users (id, email, stripe_customer_id, created_at)
                - Indexes: email (unique), stripe_customer_id
                
                <span className="text-primary">## 3. API Rate Limits</span>
                - Default: 100 req/min per IP
                - Header: X-RateLimit-Remaining
              </pre>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-20 bg-muted/30 border-y">
          <div className="px-6 lg:px-12 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight mb-12 text-center">Implementation Details, Not Just "Ideas"</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-background p-8 rounded-xl border shadow-sm">
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6 text-blue-600">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Pre-Configured Stacks</h3>
                <p className="text-muted-foreground">
                  Don't just say "Stripe". We give you the webhook signatures, retry logic (exponential backoff), and required events.
                </p>
              </div>
              <div className="bg-background p-8 rounded-xl border shadow-sm">
                <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6 text-green-600">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Security Defaults</h3>
                <p className="text-muted-foreground">
                  RLS policies, CORS configurations, and CSP headers included by default based on your chosen framework.
                </p>
              </div>
              <div className="bg-background p-8 rounded-xl border shadow-sm">
                <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6 text-purple-600">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Schema Generation</h3>
                <p className="text-muted-foreground">
                  We generate the initial Prism/SQL schema for your core tables based on the features you select.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-12 bg-muted/10">
        <div className="px-6 lg:px-12 max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 font-bold text-lg">
             <FileText className="h-5 w-5" />
             PRD Gen
          </div>
          <p className="text-sm text-muted-foreground">
            © 2025 PRD Generator. Built for builders.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-foreground">Twitter</Link>
            <Link href="#" className="hover:text-foreground">GitHub</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}