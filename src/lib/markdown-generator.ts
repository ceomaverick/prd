
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
  sections.push(`# Technical Specifications: `);
  sections.push(`**App Name**: ${answers.projectName || "Untitled Project"} | **Date:** ${new Date().toLocaleDateString()} | **Status:** Draft`);
  
  // --- 1. OVERVIEW ---
  sections.push(`## 1. Executive Summary`);
  if (answers.elevatorPitch) {
    sections.push(`**Objective:** ${answers.elevatorPitch}`);
  }
  sections.push(`**Problem:** ${answers.problemStatement || "N/A"}`);
  sections.push(`**Target Audience:** ${answers.targetAudience || "N/A"}`);
  
  // --- 2. SCOPE ---
  sections.push(`## 2. Scope & Constraints`);
  sections.push(`- **Stage:** ${answers.projectStage || "N/A"}`);
  sections.push(`- **Platforms:** ${answers.platforms || "N/A"}`);

  // --- 3. UI/UX SYSTEM ---
  sections.push(`## 3. Design System`);
  sections.push(`- **Design Intent:** ${answers.designIntent || "N/A"}`);
  sections.push(`- **Visual Risk Tolerance:** ${answers.visualRiskTolerance || "N/A"}`);
  sections.push(`- **Theme Mode:** ${answers.themeMode || "N/A"}`);
  sections.push(`- **Primary Color:** \`${answers.primaryColor || "N/A"}\``);
  sections.push(`- **Secondary Color:** \`${answers.secondaryColor || "N/A"}\``);
  sections.push(`- **Typography:** Headlines: ${answers.headlineFont || "N/A"} / Body: ${answers.bodyFont || "N/A"}`);
  sections.push(`- **Icons:** ${answers.iconSet || "N/A"}`);
  sections.push(`- **Component Library:** ${answers.componentLibrary || "N/A"}`);
  sections.push(`- **Layout:** ${answers.layoutRequirement || "N/A"}`);

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
  sections.push(`- **Strategy:** ${answers.multiTenancy || "N/A"}`);
  sections.push(`- **Retention:** ${answers.dataRetention || "N/A"}`);

  // ... (Data Schema section remains similar) ...

  // --- 7. INFRASTRUCTURE & OPS ---
  sections.push(`## 7. Infrastructure & Security`);
  sections.push(`- **CI/CD:** ${answers.cicd || "N/A"}`);
  
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
