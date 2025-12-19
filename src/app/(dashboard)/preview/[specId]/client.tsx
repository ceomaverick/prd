"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Download, Copy, Check, Pencil, FileText, Sparkles } from "lucide-react";
import { generateTechnicalSpec } from "@/lib/markdown-generator";
import { Badge } from "@/components/ui/badge";
import { calculateCompleteness } from "@/lib/completeness";

interface PreviewClientProps {
  specId: string;
  projectData: any;
}

export default function PreviewClient({ specId, projectData }: PreviewClientProps) {
  const [markdown, setMarkdown] = useState<string>("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (projectData && Object.keys(projectData).length > 0) {
      try {
        const generated = generateTechnicalSpec(projectData);
        setMarkdown(generated);
      } catch (e) {
        console.error("Failed to generate spec markdown", e);
        setMarkdown("Error generating specification.");
      }
    } else {
        setMarkdown("No data found. Please go back and generate a spec.");
    }
  }, [projectData]);

  const handleDownload = () => {
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${specId}-spec.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const completeness = calculateCompleteness(projectData);

  return (
    <div className="flex flex-col gap-8 p-6 md:p-8 max-w-[1600px] mx-auto h-[calc(100vh-4rem)]">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
           <div className="flex items-center gap-3">
             <h1 className="text-3xl font-bold tracking-tight">Technical Specification</h1>
             <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
               <Sparkles className="w-3 h-3 mr-1" /> Ready for Dev
             </Badge>
           </div>
           <p className="text-muted-foreground mt-1">
             Generated based on {projectData ? Object.keys(projectData).length : 0} architectural decisions.
           </p>
        </div>
        <div className="flex gap-2">
          <Link href={`/generate/${specId}`}>
            <Button variant="outline">
              <Pencil className="w-4 h-4 mr-2" /> Continue Editing
            </Button>
          </Link>
          <Button variant="outline" onClick={handleCopy}>
            {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
            {copied ? "Copied" : "Copy Markdown"}
          </Button>
          <Button onClick={handleDownload}>
            <Download className="w-4 h-4 mr-2" />
            Download .md
          </Button>
        </div>
      </div>

      {/* Main Preview Area */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 overflow-hidden">
        {/* Sidebar Summary */}
        <Card className="hidden lg:flex flex-col h-full col-span-1 border-none shadow-none bg-white">
          <CardHeader>
            <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Spec Health
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
             <div>
               <div className="flex justify-between text-sm mb-2 font-medium">
                 <span>Completeness</span>
                 <span>{completeness}%</span>
               </div>
               <div className="h-2 bg-muted rounded-full overflow-hidden">
                 <div 
                   className="h-full bg-primary transition-all duration-500" 
                   style={{ width: `${completeness}%` }} 
                 />
               </div>
             </div>
             
             <div className="space-y-4 pt-4 border-t">
               <div className="flex items-center gap-3 text-sm">
                 <div className="p-2 bg-blue-100 text-blue-700 rounded-md">
                   <FileText className="w-4 h-4" />
                 </div>
                 <div>
                   <p className="font-medium text-foreground">Format</p>
                   <p className="text-muted-foreground text-xs">GitHub Flavored Markdown</p>
                 </div>
               </div>
             </div>
          </CardContent>
        </Card>

        {/* Markdown Viewer */}
        <Card className="flex flex-col col-span-3 overflow-hidden border-none shadow-none bg-white">
          <CardHeader className="bg-muted/30 border-b py-3 px-6 flex flex-row items-center justify-between">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
              <div className="w-3 h-3 rounded-full bg-green-400/80" />
            </div>
            <span className="font-mono text-xs text-muted-foreground">{specId}-spec.md</span>
          </CardHeader>
          <CardContent className="flex-1 p-0 overflow-y-auto bg-white">
            <div className="p-8 md:p-12 max-w-4xl mx-auto">
               <div className="prose prose-slate dark:prose-invert max-w-none">
                  <div className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-foreground">
                    {markdown}
                  </div>
               </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}