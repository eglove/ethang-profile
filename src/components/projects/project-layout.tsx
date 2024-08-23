import { MainLayout, type MainLayoutProperties } from "../../layouts/main-layout.tsx";
import { ProjectCreate } from "./project-form/create/project-create.tsx";
import { ProjectTable } from "./project-table/project-table.tsx";

export const ProjectLayout = ({
  currentPathname,
}: MainLayoutProperties) => {
  return (
    <MainLayout
      currentPathname={currentPathname}
    >
      <ProjectLayoutWithProviders />
    </MainLayout>
  );
};

const ProjectLayoutWithProviders = () => {
  return (
    <div className="grid gap-4">
      <ProjectTable />
      <ProjectCreate />
    </div>
  );
};
