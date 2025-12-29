import React from "react";
import DashboardClient from "../client"; // Adjusted import path
import { getSpecs } from "@/app/actions";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const projects = await getSpecs();

  return <DashboardClient initialProjects={projects} />;
}
