"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

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
