import React from "react";
import PreviewClient from "./client";
import { getSpec } from "@/app/actions";

interface PageProps {
  params: {
    specId: string;
  };
}

export default async function PreviewPage({ params }: PageProps) {
  const { specId } = await params;
  const spec = await getSpec(specId);

  // If spec exists, pass its content. If not, pass empty object.
  const projectData = spec?.content || {};

  return <PreviewClient specId={specId} projectData={projectData} />;
}
