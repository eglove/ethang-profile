import { MainLayout, type MainLayoutProperties } from "../../layouts/main-layout.tsx";
import { ProjectCreate } from "./project-form/create/project-create.tsx";
import { ProjectTable } from "./project-table/project-table.tsx";

export function ProjectLayout({
  currentPathname,
}: MainLayoutProperties) {
  return (
    <MainLayout
      currentPathname={currentPathname}
    >
      <ProjectLayoutWithProviders />
    </MainLayout>
  );
}

function ProjectLayoutWithProviders() {
  return (
    <div className="grid gap-4">
      <ProjectTable />
      <ProjectCreate />
    </div>
  );
}
