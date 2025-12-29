import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import AIForm from "./ai-form";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="px-6 lg:px-12 h-16 flex items-center justify-between border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <div className="bg-primary text-primary-foreground p-1 rounded-md">
            <FileText className="h-5 w-5" />
          </div>
          <span>SpeckAI</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-sm font-medium hover:underline hidden sm:block">
            Dashboard
          </Link>
          <Button variant="outline" asChild>
            <Link href="#generate">Get Started</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-8 pb-20 px-6 lg:px-12 text-center max-w-5xl mx-auto space-y-12">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
              Get a production-ready technical spec <span className="text-primary">in 60 seconds.</span>
            </h1>
          </div>
          
          <div id="generate" className="scroll-mt-24 pt-4">
            <AIForm />
          </div>

          <div className="pt-12 text-center">
             <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-6">Built-in support for</p>
             <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-semibold text-muted-foreground/60">
                <span>Clerk</span>
                <span>Supabase</span>
                <span>Stripe</span>
                <span>Next.js</span>
                <span>Resend</span>
                <span>Prisma</span>
             </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-12 bg-muted/10">
        <div className="px-6 lg:px-12 max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2 font-bold text-foreground">
             <FileText className="h-4 w-4" />
             SpeckAI
          </div>
          <p>
            © 2025 SpeckAI. The zero-fluff PRD generator.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-foreground transition-colors">Twitter</Link>
            <Link href="#" className="hover:text-foreground transition-colors">GitHub</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
