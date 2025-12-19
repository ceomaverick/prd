"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Check, X, Lightbulb, AlertTriangle, ArrowRight, Minus, Terminal, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const SECTIONS = [
  { id: "elevator-pitch", label: "Elevator Pitch" },
  { id: "target-audience", label: "Target Audience" },
  { id: "problem-statement", label: "Problem Statement" },
  { id: "killer-features", label: "Killer Feature(s)" },
  { id: "secondary-features", label: "Secondary Features" },
  { id: "pro-tips", label: "Pro Tips" },
];

export default function ExamplesPage() {
  const [activeTab, setActiveTab] = useState("elevator-pitch");

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] p-6 w-full gap-6 bg-muted/5">
      
      {/* Tabs Navigation */}
      <div className="flex overflow-x-auto pb-0 gap-8 shrink-0 border-b px-2">
        {SECTIONS.map((section) => (
          <button
            key={section.id}
            className={cn(
              "relative pb-3 text-sm font-medium transition-all outline-none select-none",
              activeTab === section.id 
                ? "text-primary font-semibold" 
                : "text-muted-foreground hover:text-foreground"
            )}
            onClick={() => setActiveTab(section.id)}
          >
            {section.label}
            {activeTab === section.id && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary rounded-t-full" />
            )}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="flex-1 min-h-0 overflow-y-auto px-1">
        <div className="w-full pb-10">
          
          {activeTab === "elevator-pitch" && (
            <GuideSection
              title="Elevator Pitch"
              description="Defines your core value proposition in one sentence."
              vagueExamples={[
                "A platform to help people be more productive",
                "An app for managing tasks better",
                "A tool that makes collaboration easier"
              ]}
              vagueReason="Too generic. Could describe 1,000 different products."
              clearExamples={[
                "A browser extension that automatically blocks meeting invites during your designated deep work hours and suggests alternative times to the sender",
                "A Kanban board where tasks auto-prioritize based on dependencies, deadlines, and team capacity - no manual sorting",
                "A shared workspace where designers drop Figma files and developers instantly see component specs, CSS values, and implementation status in split-view"
              ]}
              clearReason="Describes the specific mechanism, the user action, and the unique outcome."
              formula="[What it is] that [unique mechanism] so that [specific outcome]"
              formulaExample="A meal planning app that generates recipes from your actual pantry inventory (via photo scan) so you waste less food."
            />
          )}

          {activeTab === "target-audience" && (
            <GuideSection
              title="Target Audience"
              description="Defines who will use this and what they're currently struggling with."
              vagueExamples={[
                "Small business owners",
                "Students and professionals",
                "Anyone who needs to organize information"
              ]}
              vagueReason="Too broad. Needs specific role + experience level + current pain."
              clearExamples={[
                "Freelance developers (1-3 years experience) who juggle 3-5 clients simultaneously, miss invoice deadlines, and currently track projects in a messy combination of Notion, email, and spreadsheets",
                "High school teachers (ages 35-55) managing 4-6 classes of 25+ students, who spend 10+ hours/week on grading and struggle to give personalized feedback at scale",
                "E-commerce Shopify store owners (doing $10k-$100k/month) who manually copy-paste product data between Shopify, Google Sheets, and social media."
              ]}
              clearReason="Specific role + experience level + current pain + current broken workflow."
              formula="[Specific role/title] ([detail about experience/size]) who [specific pain point] and currently [their broken workaround]"
            />
          )}

          {activeTab === "problem-statement" && (
            <GuideSection
              title="Problem Statement"
              description="Explains what's broken in the current world. This drives feature prioritization."
              vagueExamples={[
                "Project management is difficult and time-consuming",
                "There's no good way to track customer feedback",
                "Communication between teams is broken"
              ]}
              vagueReason="No specifics about WHY it's broken or WHAT happens as a result."
              clearExamples={[
                "Design agencies lose 15-20% of billable hours because clients request changes in email, Slack, Figma comments, and calls - forcing designers to manually consolidate feedback before each revision.",
                "SaaS founders manually check Stripe, Google Analytics, and their database every morning to calculate MRR, churn, and runway - a 45-minute ritual that's error-prone and prevents real-time decision making.",
                "Remote teams run daily standups where 8 people listen to 7 people's updates that don't affect them. The average person speaks for 90 seconds but sits in a 15-minute meeting, wasting 13.5 minutes daily."
              ]}
              clearReason="Quantifies the pain (time, money, frequency), describes the messy current state, and explains consequences."
              formula="[User group] loses/wastes [quantified impact] because [broken process]. This causes [specific negative outcome]."
            />
          )}

          {activeTab === "killer-features" && (
            <GuideSection
              title="Killer Feature(s)"
              description="The 1-3 features that make users say 'holy shit, I need this.'"
              vagueExamples={[
                "Smart recommendations",
                "AI-powered insights",
                "Real-time collaboration",
                "Advanced analytics dashboard"
              ]}
              vagueReason="These are buzzwords, not features. What EXACTLY does it do?"
              clearExamples={[
                "**Smart Screenshot Search:** 'Drop any screenshot into the search bar. AI extracts text, UI elements, and layout patterns - then finds similar screens across your library.'",
                "**Dependency Auto-Scheduling:** 'When you mark a task as blocked, the system automatically pushes it to `waiting` status, notifies the blocker, and recalculates your timeline.'",
                "**Invoice Auto-Send with Context:** 'System detects when you push code to GitHub, logs hours from commit timestamps, generates itemized invoice, and sends it automatically.'"
              ]}
              clearReason="Describes exact user interaction, the behind-the-scenes magic, and tangible pain saved."
              formula='[Feature Name]: "[User does X]. [System does Y automatically]. [User saves Z time/achieves specific outcome]."'
            />
          )}

          {activeTab === "secondary-features" && (
            <GuideSection
              title="Secondary Features"
              description="The supporting features that complete the experience."
              vagueExamples={[
                "User management",
                "Notifications",
                "Search functionality",
                "Export options"
              ]}
              vagueReason="AI will create generic versions. You'll get basic CRUD with no thought to your specific workflow."
              clearExamples={[
                "**Team Permissions:** 'Admins assign roles. Editors can modify tasks in assigned projects only. Viewers see everything but can't edit.'",
                "**Smart Notifications:** 'Only notify when: (1) You're @mentioned, (2) A task assigned to you gets unblocked, (3) A deadline is 24hrs away. Batch into digests.'",
                "**CSV Export with Filters:** 'Export button generates CSV with current view's filters applied. Include: Task name, Assignee, Status, Time tracked. Automatically email the CSV.'"
              ]}
              clearReason="Specifies the exact behavior, edge cases, and integration points."
              formula='[Feature Name]: "[Specific behavior]. [Edge case handling]. [Integration with other features]."'
            />
          )}

          {activeTab === "pro-tips" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
               <ProTipCard
                  icon={<Terminal className="h-5 w-5 text-indigo-500" />}
                  title="Use Concrete Numbers"
                  bad="Fast performance"
                  good="Page loads in under 2s with 10k items"
               />
               <ProTipCard
                  icon={<Check className="h-5 w-5 text-emerald-500" />}
                  title="Name Specific Tools"
                  bad="Like existing tools but better"
                  good="Linear's shortcuts + Notion's DBs"
               />
               <ProTipCard
                  icon={<AlertTriangle className="h-5 w-5 text-amber-500" />}
                  title="Describe Failure States"
                  bad="Users can upload files"
                  good="Show 'File too large' if >50MB"
               />
               <ProTipCard
                  icon={<Lightbulb className="h-5 w-5 text-yellow-500" />}
                  title="Include the 'Why'"
                  bad="Add a dark mode"
                  good="Dark mode for night coding"
               />
               
               <div className="md:col-span-2 lg:col-span-2 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6">
                  <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 flex items-center gap-2 mb-2">
                     <AlertTriangle className="h-4 w-4" />
                     When to Break the Rules
                  </h3>
                  <p className="text-sm text-yellow-700/80 dark:text-yellow-300/80">
                     Vague is okay if you explicitly ask AI to suggest options.
                     <br/>
                     <span className="italic mt-1 block">"I'm not sure what events should trigger notifications. Suggest options based on the user flows above."</span>
                  </p>
               </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

// --- SUBCOMPONENTS ---

function GuideSection({ 
  title, 
  description, 
  vagueExamples, 
  vagueReason, 
  clearExamples, 
  clearReason, 
  formula,
  formulaExample
}: {
  title: string;
  description: string;
  vagueExamples: string[];
  vagueReason: string;
  clearExamples: string[];
  clearReason: string;
  formula?: string;
  formulaExample?: string;
}) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 w-full pt-4">
      
      {/* UNIFIED CONTAINER */}
      <div className="bg-background rounded-xl border shadow-sm overflow-hidden flex flex-col md:flex-row min-h-[500px]">
        
        {/* COLUMN 1: VAGUE (30%) */}
        <div className="flex-[3] border-r border-border/50 p-8 bg-red-50/10 dark:bg-red-950/5 flex flex-col gap-6">
           <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-medium text-sm">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              Vague (Avoid)
           </div>
           
           <div className="flex-1 space-y-6">
              {vagueExamples.map((ex, i) => (
                <div key={i} className="text-sm text-muted-foreground leading-relaxed pl-4 border-l-2 border-red-100 dark:border-red-900/30">
                   {ex}
                </div>
              ))}
           </div>

           <div className="text-xs text-red-600/70 dark:text-red-400/70 font-medium bg-red-50 dark:bg-red-900/10 p-3 rounded-lg">
              {vagueReason}
           </div>
        </div>

        {/* COLUMN 2: CLEAR (40%) */}
        <div className="flex-[4] border-r border-border/50 p-8 flex flex-col gap-6 bg-background">
           <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-medium text-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Precise (Preferred)
           </div>

           <div className="flex-1 space-y-6">
              {clearExamples.map((ex, i) => (
                <div key={i} className="text-sm text-foreground leading-relaxed pl-4 border-l-2 border-emerald-100 dark:border-emerald-900/30">
                   <span dangerouslySetInnerHTML={{ __html: ex.replace(/\*\*(.*?)\*\*/g, '<span class="font-semibold text-emerald-700 dark:text-emerald-300">$1</span>') }} />
                </div>
              ))}
           </div>

           <div className="text-xs text-emerald-600/70 dark:text-emerald-400/70 font-medium bg-emerald-50 dark:bg-emerald-900/10 p-3 rounded-lg">
              {clearReason}
           </div>
        </div>

        {/* COLUMN 3: FORMULA (30%) */}
        <div className="flex-[3] p-8 bg-muted/20 flex flex-col gap-6">
           <div className="flex items-center gap-2 text-primary font-medium text-sm">
              <span className="w-2 h-2 rounded-full bg-primary" />
              Formula
           </div>

           <div className="bg-background border rounded-lg p-5 shadow-sm space-y-4 relative group">
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <CopyButton text={formula} />
              </div>
              <p className="font-mono text-xs font-medium text-foreground leading-relaxed pr-6">
                 {formula}
              </p>
           </div>
           
           {formulaExample && (
              <div className="space-y-2">
                 <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Example</span>
                 <p className="text-xs text-muted-foreground italic leading-relaxed">
                    &quot;{formulaExample}&quot;
                 </p>
              </div>
           )}

           <div className="mt-auto pt-6 border-t border-dashed">
              <p className="text-[11px] text-muted-foreground/80 leading-relaxed">
                 <span className="font-semibold text-foreground">Why this matters:</span> Structuring your request this way forces the AI to output implementation details instead of generic ideas.
              </p>
           </div>
        </div>

      </div>
    </div>
  );
}

function ProTipCard({ icon, title, bad, good }: { icon: any, title: string, bad: string, good: string }) {
  return (
    <div className="bg-background border rounded-xl p-6 shadow-sm flex flex-col gap-4">
      <div className="flex items-center gap-2 text-sm font-semibold">
         {icon}
         {title}
      </div>
      <div className="space-y-3 pt-2">
         <div className="flex items-start gap-3 text-xs opacity-60">
            <Minus className="h-4 w-4 text-red-500 shrink-0" />
            <span className="line-through">{bad}</span>
         </div>
         <div className="flex items-start gap-3 text-sm font-medium">
            <Check className="h-4 w-4 text-emerald-500 shrink-0" />
            <span>{good}</span>
         </div>
      </div>
    </div>
  );
}

function CopyButton({ text }: { text?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-6 w-6 text-muted-foreground hover:text-foreground bg-background/80 backdrop-blur-sm shadow-sm"
      onClick={handleCopy}
    >
      {copied ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
    </Button>
  );
}
