import { MainLayout, type MainLayoutProperties } from "../../layouts/main-layout.tsx";
import { useIsMe } from "../../util/user.ts";
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
  const isMe = useIsMe();

  return (
    <div className="grid gap-4">
      <ProjectTable />
      {isMe && <ProjectCreate />}
    </div>
  );
};
