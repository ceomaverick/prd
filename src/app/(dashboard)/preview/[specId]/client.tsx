"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Download, Copy, Check } from "lucide-react";
import { generateTechnicalSpec } from "@/lib/markdown-generator";

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
        if (projectData.generatedMarkdown) {
          setMarkdown(projectData.generatedMarkdown);
        } else {
          const generated = generateTechnicalSpec(projectData);
          setMarkdown(generated);
        }
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

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-muted/30 p-4 md:p-8">
      {/* Centered Container */}
      <div className="w-full max-w-5xl mx-auto flex-1 flex flex-col overflow-hidden shadow-lg rounded-xl border bg-background">
        
        {/* Artifact Header */}
        <div className="bg-muted/30 border-b py-3 px-4 md:px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
             {/* Window Controls */}
             <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                <div className="w-3 h-3 rounded-full bg-green-400/80" />
             </div>
             <span className="font-mono text-sm text-muted-foreground">{specId}.md</span>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-8 text-xs font-medium" onClick={handleCopy}>
              {copied ? <Check className="w-3.5 h-3.5 mr-2" /> : <Copy className="w-3.5 h-3.5 mr-2" />}
              {copied ? "Copied" : "Copy"}
            </Button>
            <Button variant="ghost" size="sm" className="h-8 text-xs font-medium" onClick={handleDownload}>
              <Download className="w-3.5 h-3.5 mr-2" />
              Download
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-12 bg-white">
           <div className="prose prose-slate dark:prose-invert max-w-none">
              <div className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-foreground">
                {markdown}
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}
