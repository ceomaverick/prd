"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  FileText, 
  MoreHorizontal, 
  Clock, 
  Eye, 
  Pencil,
  Sparkles,
  Trash2
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteSpec } from "@/app/actions";
import { toast } from "sonner";
import { calculateCompleteness } from "@/lib/completeness";

interface Project {
  id: string;
  templateName: string;
  createdAt: Date;
  content: any;
}

interface DashboardClientProps {
  initialProjects: Project[];
}

export default function DashboardClient({ initialProjects }: DashboardClientProps) {
  const router = useRouter();
  // We use initialProjects for rendering. If real-time updates are needed, we'd use state + effect or revalidation.
  // Since deleteSpec calls revalidatePath, the server component will re-render with new data.
  // But for immediate feedback, optimistically updating local state is good.
  // However, with revalidatePath, the page should reload. 
  // Let's just use the props.

  const handleNewProject = () => {
    // Generate ID on client or server? 
    // Existing logic used `spec-${Date.now()}`. 
    // We can keep this pattern or use UUIDs.
    const newId = `spec-${Date.now()}`;
    router.push(`/generate/${newId}`);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      const result = await deleteSpec(id);
      if (result.success) {
        toast.success("Project deleted");
      } else {
        toast.error("Failed to delete project");
      }
    }
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Left Column: Stats Cards */}
      <div className="flex flex-col gap-6 lg:col-span-1">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Specs</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{initialProjects.length}</div>
            <p className="text-xs text-muted-foreground">Generated documents</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Time Saved</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{initialProjects.length * 2}h</div>
            <p className="text-xs text-muted-foreground">Estimated savings</p>
          </CardContent>
        </Card>
      </div>

      {/* Right Column: Projects Table */}
      <Card className="lg:col-span-3 h-fit">
        <CardHeader>
          <CardTitle>Your Documents</CardTitle>
          <CardDescription>
            A list of all your generated product requirement documents.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Document Name</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {initialProjects.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="h-24 text-center text-muted-foreground">
                    No specs found. Create one to get started!
                  </TableCell>
                </TableRow>
              ) : (
                initialProjects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <div className="p-2 bg-primary/10 rounded mr-3 text-primary">
                           <FileText className="h-4 w-4" />
                        </div>
                        <span className="capitalize">{project.templateName.replace(/-/g, " ")}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(project.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <Link href={`/generate/${project.id}`}>
                            <DropdownMenuItem>
                              <Pencil className="mr-2 h-4 w-4" /> Edit
                            </DropdownMenuItem>
                          </Link>
                          <Link href={`/preview/${project.id}`}>
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" /> Preview
                            </DropdownMenuItem>
                          </Link>
                          <DropdownMenuItem 
                            onClick={() => handleDelete(project.id)}
                            className="text-red-600 focus:text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
