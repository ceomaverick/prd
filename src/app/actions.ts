"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { GoogleGenerativeAI, FinishReason } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function generateSpecWithAI(prompt: string, techStack: Record<string, any>, appName?: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

    const systemPrompt = `
You are a battle-tested full-stack product designer & engineer (15+ years, 50+ shipped apps, 8-figure exits). Your only job is to turn the user’s raw app idea + chosen tech stack into a laser-focused, production-ready specification document.

User's app idea: ${prompt}

Output rules  
1. Markdown only.  
2. No prose outside the sections defined below.  
3. Be terse, specific, and actionable—write like you’re handing the doc to a senior team tomorrow morning.  
4. Do not include introductions, conclusions, explanations, or any text outside these sections.  
5. Make reasonable professional assumptions to fill in missing details from the raw idea. If the core concept is completely unintelligible, output ONLY a numbered list of exactly 3 precise questions and nothing else.

# Technical Specifications
- **App Name:** <infer or leave placeholder>
- **Date:** ${new Date().toLocaleDateString()}
- **Author:** SpeckAi
- **Description:** 1–2 sentence, precise description of what the app does and who it is for.

## 1. Executive Summary

- Core Objective: Single, outcome-focused statement of what the app is meant to achieve.
- Unique Value Proposition: What clearly differentiates this app from existing alternatives.
- Problem Statement: Specific problem(s) faced by the target user that this app solves.
- Target Audience: Primary and secondary user personas.
- Monetization Strategy: (e.g., freemium, subscription, ads, one-time purchase).

## 2. Core Features
- 5–6 prioritized features.
- Each feature described in 1–2 implementation-oriented lines.

## 3. UI/UX Design Specifications
- Overall aesthetic and vibe: ${
      techStack.vibe || "Clean & Modern"
    } (Default to Light Mode unless the vibe explicitly dictates otherwise).
- Primary color palette (Fallback: shadcn/ui default theme).
- Key screens and user flow.
- Important UI components and patterns to use (Enforce Lucide React for all icons).
- Typography (Default: Plus Jakarta Sans for headings, Inter for body text, unless the vibe suggests a more suitable pair).

## 4. Tech Specifications
- Selected Tech Stack:
${Object.entries(techStack)
  .filter(([key]) => key !== "vibe")
  .map(
    ([key, value]) =>
      `  - ${key}: ${Array.isArray(value) ? value.join(", ") : value}`
  )
  .join("\n")}
- High-level architecture & API route structure  
  (Enforce Next.js optimizations: next/image, next/font, SEO Metadata API, Server Components).
- Key third-party services or APIs needed.
- Main data models/entities with core fields.
- Security, privacy, and technical risk mitigation (bottlenecks).

--- END OF SPEC ---
`;

    const result = await model.generateContent(systemPrompt);
    const response = await result.response;
    
    // Check if generation stopped due to token limit
    if (response.candidates?.[0]?.finishReason === FinishReason.MAX_TOKENS) {
      return { success: false, error: "Generation stopped: Token limit reached. Please try a shorter prompt." };
    }

    const text = response.text();

    const specId = `spec-${Date.now()}`;
    await prisma.spec.create({
      data: {
        id: specId,
        templateName: appName || "AI Generated Spec",
        content: {
          generatedMarkdown: text,
          userPrompt: prompt,
          techStack: techStack
        },
      },
    });

    return { success: true, specId };
  } catch (error: any) {
    console.error("AI Generation failed:", error);
    return { success: false, error: error.message || "Failed to generate spec" };
  }
}

export async function getSpecs() {
  try {
    const specs = await prisma.spec.findMany({
      orderBy: { createdAt: "desc" },
    });
    return specs;
  } catch (error) {
    console.error("Failed to fetch specs:", error);
    return [];
  }
}

export async function getSpec(id: string) {
  try {
    const spec = await prisma.spec.findUnique({
      where: { id },
    });
    return spec;
  } catch (error) {
    console.error("Failed to fetch spec:", error);
    return null;
  }
}

export async function saveSpec(id: string, content: any, templateName: string = "Product Spec") {
  try {
    await prisma.spec.upsert({
      where: { id },
      update: {
        content,
        templateName,
      },
      create: {
        id,
        content,
        templateName,
      },
    });
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Failed to save spec:", error);
    return { success: false, error };
  }
}

export async function deleteSpec(id: string) {
  try {
    await prisma.spec.delete({
      where: { id },
    });
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete spec:", error);
    return { success: false, error };
  }
}
