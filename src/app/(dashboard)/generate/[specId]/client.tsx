"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm, Controller } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Check, CheckCircle2 } from "lucide-react";
import { MASTER_QUESTIONS, Question, SECTIONS } from "@/lib/questions";
import { cn } from "@/lib/utils";
import { saveSpec } from "@/app/actions";
import { toast } from "sonner";

// Debounce helper
function useDebounce(callback: Function, delay: number) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  return useCallback((...args: any[]) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, delay]);
}

interface GenerateSpecClientProps {
  specId: string;
  initialData: any;
}

export default function GenerateSpecClient({ specId, initialData }: GenerateSpecClientProps) {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Initialize form with proper default values derived from schema
  const defaultValues = useMemo(() => {
    const defaults: Record<string, any> = {};
    MASTER_QUESTIONS.forEach(q => {
      if (q.type === "multiselect") {
        defaults[q.id] = [];
      } else if (q.type === "boolean") {
        defaults[q.id] = null;
      } else {
        defaults[q.id] = "";
      }
    });
    return { ...defaults, ...initialData };
  }, [initialData]);

  const form = useForm<Record<string, any>>({
    defaultValues
  });

  const { control, watch } = form;
  const formValues = watch();

  // Save to DB
  const saveToDb = async (values: any) => {
    // Determine template name from the first question or just use default
    // Usually the first question is "What are you building?" or similar
    // We can just pass a generic name or try to extract it.
    // For now, let's keep it simple.
    
    // Check if we have a title/name in values?
    const title = values["projectName"] || "Product Spec"; 

    const result = await saveSpec(specId, values, title);
    if (!result.success) {
      toast.error("Failed to save draft");
    }
  };

  const debouncedSave = useDebounce(saveToDb, 1000);

  // --- 2. Derived State ---
  const filteredQuestions = useMemo(() => {
    return MASTER_QUESTIONS.filter((q) => {
      if (!q.condition) return true;
      const parentValue = formValues[q.condition.field];
      if (q.condition.operator === "contains") {
        return Array.isArray(parentValue) && parentValue.includes(q.condition.value);
      }
      if (q.condition.operator === "equals") {
        return parentValue === q.condition.value;
      }
      if (q.condition.operator === "not_equals") {
        return parentValue !== q.condition.value;
      }
      return true;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(formValues)]);

  // --- 3. Index Clamping ---
  useEffect(() => {
    if (currentQuestionIndex >= filteredQuestions.length && filteredQuestions.length > 0) {
      setCurrentQuestionIndex(Math.max(0, filteredQuestions.length - 1));
    }
  }, [filteredQuestions.length, currentQuestionIndex]);

  const currentQuestion = filteredQuestions[currentQuestionIndex] || filteredQuestions[0];
  
  // --- 4. Sidebar Stats ---
  const sectionStats = useMemo(() => {
    const stats: Record<string, { total: number; answered: number; isComplete: boolean }> = {};
    
    SECTIONS.forEach(section => {
      // Use MASTER_QUESTIONS to show the full scope of the section
      const sectionQuestions = MASTER_QUESTIONS.filter(q => q.section === section);
      
      // Calculate total *relevant* questions
      const visibleSectionQuestions = sectionQuestions.filter(q => {
        if (!q.condition) return true;
        const parentValue = formValues[q.condition.field];
        if (q.condition.operator === "contains") return Array.isArray(parentValue) && parentValue.includes(q.condition.value);
        if (q.condition.operator === "equals") return parentValue === q.condition.value;
        if (q.condition.operator === "not_equals") return parentValue !== q.condition.value;
        return true;
      });

      const total = visibleSectionQuestions.length;
      
      const answered = visibleSectionQuestions.filter(q => {
        const val = formValues[q.id];
        if (Array.isArray(val)) return val.length > 0;
        if (typeof val === "boolean") return val !== null;
        if (typeof val === "string") return val.trim().length > 0;
        return !!val;
      }).length;
      
      stats[section] = {
        total,
        answered,
        isComplete: total === 0 || answered === total
      };
    });
    return stats;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(formValues)]);

  const handleNext = async () => {
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Save immediately on finish
      await saveToDb(formValues);
      router.push(`/preview/${specId}`);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const renderInput = (field: any, question: Question) => {
    const handleChange = (val: any) => {
        field.onChange(val);
        // Trigger debounced save
        debouncedSave({ ...formValues, [question.id]: val });
    };

    switch (question.type) {
      case "text":
        return <Input {...field} onChange={(e) => handleChange(e.target.value)} className="text-base p-3 h-10 bg-background" placeholder={question.placeholder} />;
      case "textarea":
        return <Textarea {...field} onChange={(e) => handleChange(e.target.value)} className="min-h-[120px] text-base p-3 bg-background" placeholder={question.placeholder} />;
      case "select":
        return (
          <RadioGroup onValueChange={handleChange} value={field.value} className="grid grid-cols-1 gap-2">
            {question.options?.map((option) => (
              <div key={option} className="relative">
                 <RadioGroupItem value={option} id={option} className="peer sr-only" />
                 <Label htmlFor={option} className="flex items-center justify-between p-4 rounded-lg border bg-background hover:bg-muted/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 transition-all cursor-pointer">
                   <span className="text-sm font-medium">{option}</span>
                   {field.value === option && <Check className="h-4 w-4 text-primary" />}
                 </Label>
              </div>
            ))}
          </RadioGroup>
        );
      case "multiselect":
        return (
          <div className="grid grid-cols-1 gap-2">
            {question.options?.map((option) => {
              const currentValues = Array.isArray(field.value) ? field.value : [];
              const isChecked = currentValues.includes(option);
              return (
                <div key={option} onClick={() => {
                    const newValue = isChecked ? currentValues.filter((v: string) => v !== option) : [...currentValues, option];
                    handleChange(newValue);
                  }} className={`flex items-center justify-between p-4 rounded-lg border transition-all cursor-pointer ${isChecked ? "border-primary bg-primary/5" : "border-muted bg-background hover:bg-muted/50"}`}>
                  <span className="text-sm font-medium">{option}</span>
                  <div className={`h-4 w-4 rounded border flex items-center justify-center transition-all ${isChecked ? "bg-primary border-primary" : "border-muted"}`}>
                    {isChecked && <Check className="h-3 w-3 text-white" />}
                  </div>
                </div>
              );
            })}
          </div>
        );
      case "boolean":
        return (
          <RadioGroup onValueChange={(val) => handleChange(val === "yes")} value={field.value === true ? "yes" : field.value === false ? "no" : undefined} className="grid grid-cols-2 gap-4">
             <div className="relative">
                 <RadioGroupItem value="yes" id="yes" className="peer sr-only" />
                 <Label htmlFor="yes" className="flex flex-col items-center justify-center p-6 rounded-lg border bg-background hover:bg-muted/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 transition-all cursor-pointer">
                   <span className="text-lg font-semibold">Yes</span>
                 </Label>
             </div>
             <div className="relative">
                 <RadioGroupItem value="no" id="no" className="peer sr-only" />
                 <Label htmlFor="no" className="flex flex-col items-center justify-center p-6 rounded-lg border bg-background hover:bg-muted/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 transition-all cursor-pointer">
                   <span className="text-lg font-semibold">No</span>
                 </Label>
             </div>
          </RadioGroup>
        );
      default: return <div>Unsupported type</div>;
    }
  };

  if (!currentQuestion) return <div className="p-8 text-center text-xl">Loading...</div>;

  return (
    <div className="flex min-h-[calc(100vh-4rem)] max-w-[1800px] mx-auto">
      {/* Sidebar Navigation */}
      <aside className="w-[300px] border-r bg-background hidden lg:block sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
        <div className="p-6 space-y-6">
          <div className="flex items-center gap-2 mb-8">
            <Badge variant="outline" className="text-xs font-mono uppercase tracking-widest">
              Spec Builder
            </Badge>
          </div>
          
          <nav className="space-y-1">
            {SECTIONS.map((section, idx) => {
              const stats = sectionStats[section];
              const isActive = currentQuestion.section === section;
              
              if (!stats || stats.total === 0) return null;

              return (
                <div 
                  key={section}
                  className={cn(
                    "flex items-center justify-between p-3 rounded-lg text-sm transition-colors",
                    isActive ? "bg-muted font-medium text-foreground" : "text-muted-foreground"
                  )}
                >
                  <div className="flex items-center gap-3">
                    {stats.isComplete ? (
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    ) : (
                      <div className={cn("h-4 w-4 rounded-full border-2", isActive ? "border-primary" : "border-muted-foreground/30")} />
                    )}
                    <span className="truncate max-w-[160px]">{section}</span>
                  </div>
                  {stats.total > 0 && (
                     <span className="text-xs text-muted-foreground/60 font-mono">
                       {stats.answered}/{stats.total}
                     </span>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 p-8 md:p-12 overflow-y-auto">
        <div className="max-w-3xl mx-auto space-y-8">
          
          {/* Question Header (No Progress Bar) */}
          <div className="space-y-3">
             <div className="flex items-center gap-3">
               <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">
                  {currentQuestion.section}
               </div>
               <Badge variant={currentQuestion.optional ? "secondary" : "default"} className="text-[10px] h-5 px-1.5 uppercase tracking-wider">
                  {currentQuestion.optional ? "Optional" : "Required"}
               </Badge>
             </div>
             <h1 className="text-3xl font-bold tracking-tight text-foreground leading-tight">
                {currentQuestion.label}
             </h1>
             {currentQuestion.description && (
               <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">
                 {currentQuestion.description}
               </p>
             )}
          </div>

          {/* Input Area */}
          <div className="py-2" key={currentQuestion.id}>
            <Controller 
              control={control} 
              name={currentQuestion.id} 
              render={({ field }) => renderInput(field, currentQuestion)} 
            />
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center pt-8 mt-auto border-t">
            <Button 
              variant="ghost" 
              onClick={handleBack} 
              disabled={currentQuestionIndex === 0}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <Button 
              onClick={handleNext}
              disabled={(() => {
                const val = formValues[currentQuestion.id];
                let hasValue = false;
                if (Array.isArray(val)) hasValue = val.length > 0;
                else if (typeof val === "boolean") hasValue = val !== null;
                else if (typeof val === "string") hasValue = val.trim().length > 0;
                else hasValue = (val !== undefined && val !== null);
                
                return !hasValue && !currentQuestion.optional;
              })()}
            >
              {currentQuestionIndex === filteredQuestions.length - 1 ? "Generate Spec" : "Next Question"} 
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
}
