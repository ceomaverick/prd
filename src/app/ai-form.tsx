"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TECH_STACK_OPTIONS } from "@/lib/ai-options";
import { generateSpecWithAI } from "@/app/actions";
import { toast } from "sonner";
import { Loader2, Sparkles, LayoutGrid } from "lucide-react";

export default function AIForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [appName, setAppName] = useState("");
  const [prompt, setPrompt] = useState("");
  const [techStack, setTechStack] = useState<Record<string, any>>(
    TECH_STACK_OPTIONS.reduce((acc, opt) => ({
      ...acc,
      [opt.id]: opt.default || (opt.type === "multiselect" ? [] : "")
    }), {})
  );

  const handleSelectChange = (id: string, value: string) => {
    setTechStack(prev => ({ ...prev, [id]: value }));
  };

  const handleMultiSelectChange = (id: string, value: string) => {
    setTechStack(prev => {
      const current = prev[id] || [];
      const updated = current.includes(value)
        ? current.filter((v: string) => v !== value)
        : [...current, value];
      return { ...prev, [id]: updated };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) {
      toast.error("Please describe your app idea first");
      return;
    }

    setLoading(true);
    try {
      const result = await generateSpecWithAI(prompt, techStack, appName);
      if (result.success && result.specId) {
        toast.success("Specification generated successfully!");
        router.push(`/preview/${result.specId}`);
      } else {
        toast.error(result.error || "Generation failed. Please try again.");
      }
    } catch (err) {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto space-y-8 bg-card p-6 md:p-8 rounded-2xl border shadow-xl">
      <div className="space-y-4">
        <Label htmlFor="prompt" className="text-lg font-semibold flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          What are you building?
        </Label>
        <Textarea
          id="prompt"
          placeholder="e.g., A subscription-based platform for personal trainers to manage clients and workouts..."
          className="min-h-[120px] text-base resize-none"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <Label htmlFor="appName" className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            App Name
          </Label>
          <Input
            id="appName"
            placeholder="e.g., FitTrack Pro"
            className="w-full bg-background"
            value={appName}
            onChange={(e) => setAppName(e.target.value)}
          />
        </div>

        {TECH_STACK_OPTIONS.map((opt) => (
          <div key={opt.id} className="space-y-3">
            <Label className="text-sm font-medium text-muted-foreground">{opt.label}</Label>
            {opt.type === "select" ? (
              <Select
                value={techStack[opt.id]}
                onValueChange={(val) => handleSelectChange(opt.id, val)}
              >
                <SelectTrigger className="w-full bg-background">
                  <SelectValue placeholder={`Select ${opt.label}`} />
                </SelectTrigger>
                <SelectContent>
                  {opt.options.map((o) => (
                    <SelectItem key={o} value={o}>{o}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <div className="flex flex-wrap gap-2">
                {opt.options.map((o) => {
                  const isChecked = techStack[opt.id]?.includes(o);
                  return (
                    <div
                      key={o}
                      onClick={() => handleMultiSelectChange(opt.id, o)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs cursor-pointer transition-colors ${
                        isChecked
                          ? "bg-primary border-primary text-primary-foreground"
                          : "bg-background hover:bg-muted"
                      }`}
                    >
                      {o}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full h-14 text-lg font-bold shadow-lg shadow-primary/20"
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Generating Your Technical Spec...
          </>
        ) : (
          <>
            Generate Technical Spec <Sparkles className="ml-2 h-5 w-5" />
          </>
        )}
      </Button>
    </form>
  );
}
