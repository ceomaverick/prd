import { MASTER_QUESTIONS } from "@/lib/questions";

export function calculateCompleteness(data: any): number {
  if (!data) return 0;

  // Filter questions that are currently relevant based on conditions
  const relevantQuestions = MASTER_QUESTIONS.filter((q) => {
    if (!q.condition) return true;
    
    const parentValue = data[q.condition.field];
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

  if (relevantQuestions.length === 0) return 0;

  const validCount = relevantQuestions.reduce((acc, q) => {
     const val = data[q.id];
     let hasValue = false;
     
     if (Array.isArray(val)) hasValue = val.length > 0;
     else if (typeof val === "boolean") hasValue = val !== null;
     else if (typeof val === "string") hasValue = val.trim().length > 0;
     else hasValue = (val !== undefined && val !== null);

     // If it has a value OR it is optional, we count it towards completion.
     if (hasValue || q.optional) {
       return acc + 1;
     }
     return acc;
  }, 0);

  return Math.min(100, Math.round((validCount / relevantQuestions.length) * 100));
}
