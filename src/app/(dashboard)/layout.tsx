"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FileText, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  const handleNewProject = () => {
    const newId = `spec-${Date.now()}`;
    router.push(`/generate/${newId}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Top Navbar */}
      <header className="border-b bg-background sticky top-0 z-50">
        <div className="flex h-16 items-center px-8 max-w-[1800px] mx-auto justify-between">
          
          {/* Left: Logo Area */}
          <Link href="/" className="flex items-center gap-2 font-semibold min-w-[200px]">
             <div className="bg-primary text-primary-foreground p-1 rounded-md">
                <FileText className="h-4 w-4" />
             </div>
             <span>PRD Gen</span>
          </Link>

          {/* Center: Navigation */}
          <nav className="flex items-center justify-center flex-1 gap-6">
             <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
               Dashboard
             </Link>
             <Link href="/landing" className="text-sm font-medium transition-colors hover:text-primary text-muted-foreground">
               Landing
             </Link>
             <Link href="/examples" className="text-sm font-medium transition-colors hover:text-primary text-muted-foreground">
               Examples
             </Link>
          </nav>

          {/* Right: Actions & User */}
          <div className="flex items-center gap-4 min-w-[200px] justify-end">
             <Button size="sm" onClick={handleNewProject}>
               <Plus className="h-4 w-4 mr-2" /> New PRD
             </Button>

             <div className="flex items-center gap-3 pl-2 border-l ml-2">
                <span className="text-sm font-medium hidden md:block">Neil</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8 border">
                        <AvatarFallback>N</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">Log out</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
             </div>
          </div>

        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-muted">
         {children}
      </main>
    </div>
  );
}