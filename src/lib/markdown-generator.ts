
import { BLUEPRINTS } from "./blueprints";
import { MASTER_QUESTIONS } from "./questions";

export function generateTechnicalSpec(answers: Record<string, any>): string {
  const sections: string[] = [];

  // --- HELPER: Find Blueprint Data ---
  const getBlueprint = (field: string, value: string) => {
    return BLUEPRINTS[field]?.[value];
  };

  // --- HELPER: Collect Tech Constraints ---
  const allConstraints: string[] = [];
  const allEnvVars: Set<string> = new Set();
  const allPackages: Set<string> = new Set();

  Object.entries(answers).forEach(([key, value]) => {
    if (!value || (Array.isArray(value) && value.length === 0)) return;

    if (typeof value === "string") {
      const bp = getBlueprint(key, value);
      if (bp) {
        if (bp.technicalConstraints) allConstraints.push(...bp.technicalConstraints);
        if (bp.envVars) bp.envVars.forEach(v => allEnvVars.add(v));
        if (bp.packages) bp.packages.forEach(p => allPackages.add(p));
      }
    } else if (Array.isArray(value)) {
      value.forEach(v => {
        const bp = getBlueprint(key, v);
        if (bp) {
          if (bp.technicalConstraints) allConstraints.push(...bp.technicalConstraints);
          if (bp.envVars) bp.envVars.forEach(v => allEnvVars.add(v));
          if (bp.packages) bp.packages.forEach(p => allPackages.add(p));
        }
      });
    }
  });

  // --- HEADER ---
  sections.push(`# Technical Specification: ${answers.projectName || "Untitled Project"}`);
  sections.push(`**Date:** ${new Date().toLocaleDateString()} | **Status:** Draft`);
  if (answers.elevatorPitch) {
    sections.push(`> ${answers.elevatorPitch}`);
  }

  // --- 1. OVERVIEW ---
  sections.push(`## 1. Executive Summary`);
  sections.push(`**Problem:** ${answers.problemStatement || "N/A"}`);
  sections.push(`**Target Audience:** ${answers.targetAudience || "N/A"}`);
  // (Success Metrics question was removed from Master Questions, handling gracefully)
  
  // --- 2. SCOPE ---
  sections.push(`## 2. Scope & Constraints`);
  sections.push(`- **Stage:** ${answers.projectStage || "N/A"}`);
  sections.push(`- **Timeline:** ${answers.timeline || "N/A"}`);
  sections.push(`- **Platforms:** ${Array.isArray(answers.platforms) ? answers.platforms.join(", ") : (answers.platforms || "N/A")}`);

  // --- 3. UI/UX SYSTEM ---
  sections.push(`## 3. Design System`);
  sections.push(`- **Aesthetic:** ${answers.designAesthetic || "N/A"}`);
  sections.push(`- **Primary Color:** \`${answers.colorPalette || "N/A"}\``);
  sections.push(`- **Typography:** ${answers.typography || "N/A"}`);
  sections.push(`- **Icons:** ${answers.iconSet || "N/A"}`);
  sections.push(`- **Component Library:** ${answers.componentSystem || "N/A"}`);

  // --- 4. FUNCTIONAL REQUIREMENTS ---
  sections.push(`## 4. Functional Specifications`);
  sections.push(`### 4.1 Core User Flow`);
  sections.push(`${answers.userFlow || "To be defined."}`);
  
  if (answers.secondaryFeatures) {
    sections.push(`### 4.2 Secondary Features`);
    sections.push(`${answers.secondaryFeatures}`);
  }

  // --- 5. TECH STACK ---
  sections.push(`## 5. Technical Architecture`);
  
  sections.push(`### 5.1 Frontend`);
  sections.push(`- **Framework:** ${answers.feFramework || "N/A"}`);
  sections.push(`- **Styling:** ${answers.stylingEngine || "N/A"}`);
  sections.push(`- **State Management:** ${answers.stateManagement || "N/A"}`);
  
  sections.push(`### 5.2 Backend`);
  sections.push(`- **Runtime:** ${answers.beRuntime || "N/A"}`);
  sections.push(`- **API Style:** ${answers.apiStyle || "N/A"}`);
  sections.push(`- **Auth Provider:** ${answers.authStrategy || "N/A"}`);
  
  sections.push(`### 5.3 Database`);
  sections.push(`- **Engine:** ${answers.dbEngine || "N/A"}`);
  sections.push(`- **ORM:** ${answers.orm || "N/A"}`);
  sections.push(`- **Strategy:** ${answers.multiTenancy || "N/A"}`);

  // ... (Data Schema section remains similar) ...

  // --- 7. INFRASTRUCTURE & OPS ---
  sections.push(`## 7. Infrastructure & Security`);
  sections.push(`- **Hosting:** ${answers.hosting || "N/A"}`);
  if (answers.compliance && answers.compliance.length > 0) {
     sections.push(`- **Compliance:** ${answers.compliance.join(", ")}`);
  }
  
  // --- 8. IMPLEMENTATION GUIDE ---
  sections.push(`## 8. Implementation Guide`);
  
  if (allPackages.size > 0) {
    sections.push(`### 8.1 Required Packages`);
    sections.push("```bash");
    sections.push(`npm install ${Array.from(allPackages).join(" ")}`);
    sections.push("```");
  }

  if (allEnvVars.size > 0) {
    sections.push(`### 8.2 Environment Variables`);
    sections.push("```env");
    allEnvVars.forEach(v => sections.push(`${v}=`));
    sections.push("```");
  }

  if (allConstraints.length > 0) {
    sections.push(`### 8.3 Technical Constraints & Standards`);
    allConstraints.forEach(c => sections.push(`- [ ] ${c}`));
  }

  return sections.join("\n\n");
}
