"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function generateSpecWithAI(prompt: string, techStack: Record<string, any>, appName?: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

    const systemPrompt = `
      You are a battle-tested full-stack product designer & engineer (15+ years, 50+ shipped apps, 8-figure exits).
      Your only job is to turn the user’s raw app idea + chosen tech stack into a laser-focused, production-ready specification document.

      User's app idea: ${prompt}

      Output rules  
      1. Markdown only.  
      2. No prose outside the 4 sections below.  
      3. Be terse, specific, and actionable—write like you’re handing the doc to a senior team tomorrow morning.

      ## 1. App Idea & Features
      - Clear, concise description of the core concept
      - Unique value proposition (what makes it stand out)
      - What Problem is it solving
      - What Target audience is it serving
      - Suggested monetization strategy (e.g., freemium, subscription, ads, one-time purchase)  

      ## 2. Core Features 
      - 5 to 6 key features (prioritized, with brief explanations)

      ## 3. UI/UX Design Specifications
      - Overall aesthetic and vibe: ${techStack.vibe || "Clean & Modern"} (Enforce Light Mode only)
      - Primary color palette (Fallback: Shadcn default theme)
      - Key screens and user flow 
      - Important UI components and patterns to use (Enforce Lucide React for all icons)
      - Typography (Fallback: Plus Jakarta Sans for headings and Inter for body text)

      ## 4. Technical Specifications
      - Selected Tech Stack:
      ${Object.entries(techStack).filter(([key]) => key !== 'vibe').map(([key, value]) => `  - ${key}: ${Array.isArray(value) ? value.join(", ") : value}`).join("\n")}
      - High-level architecture & API route structure (Enforce Next.js optimizations: next/image, next/font, SEO Metadata API, and Server Components for performance)
      - Key third-party services or APIs needed
      - Main data models/entities with core fields
      - Security, privacy, and technical risk mitigation (bottlenecks)

      Write in clear, professional, actionable language. Be specific but concise. Do not include introductions, conclusions, or any text outside these sections.
    `;

    const result = await model.generateContent(systemPrompt);
    const response = await result.response;
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
  } catch (error) {
    console.error("AI Generation failed:", error);
    return { success: false, error: "Failed to generate spec" };
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
