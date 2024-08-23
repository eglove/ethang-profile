import type { GetProjectJson } from "../../../pages/api/project.ts";

import { useIsMe } from "../../../util/user.ts";
import { ProjectDelete } from "../project-form/delete/project-delete.tsx";
import { ProjectUpdate } from "../project-form/update/project-update.tsx";
import { ProjectDetails } from "./project-details.tsx";

type ProjectActionsProperties = {
  readonly project: GetProjectJson[0];
};

export const ProjectActions = ({ project }: ProjectActionsProperties) => {
  const isMe = useIsMe();

  return (
    <div className="flex gap-2">
      <ProjectDetails project={project} />
      {isMe && <ProjectUpdate project={project} />}
      {isMe &&
        <ProjectDelete
          id={project.id}
          name={project.name}
        />}
    </div>
  );
};
