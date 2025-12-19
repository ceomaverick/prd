import React from "react";
import GenerateSpecClient from "./client";
import { getSpec } from "@/app/actions";

interface PageProps {
  params: {
    specId: string;
  };
}

export default async function GenerateSpecPage({ params }: PageProps) {
  const { specId } = await params;
  const spec = await getSpec(specId);

  // If spec exists, pass its content. If not, pass empty object (new draft).
  const initialData = spec?.content || {};

  return <GenerateSpecClient specId={specId} initialData={initialData} />;
}