"use client";

import Link from "next/link";
import { FileText, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Top Navbar */}
      <header className="border-b bg-background sticky top-0 z-50">
        <div className="flex h-16 items-center px-8 max-w-[1800px] mx-auto justify-between">
          
          {/* Left: Brand */}
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <div className="bg-primary text-primary-foreground p-1 rounded-md">
              <FileText className="h-5 w-5" />
            </div>
            <span>SpeckAI</span>
          </Link>

          {/* Right: Navigation Links */}
          <nav className="flex items-center gap-6">
            <Link href="/dashboard" className="text-sm font-medium transition-colors hover:text-primary">
              Dashboard
            </Link>
            <Button size="sm" variant="ghost" asChild>
              <Link href="/">
                <Plus className="h-4 w-4 mr-2" /> New Spec
              </Link>
            </Button>
          </nav>

        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-muted/30">
        {children}
      </main>
    </div>
  );
}
