import { Link } from "@nextui-org/link";

import type { GetProjectJson } from "../../../pages/api/project.ts";

type ProjectDetailsBodyProperties = {
  readonly project: GetProjectJson[0];
};

export const ProjectDetailsBody = ({
  project,
}: ProjectDetailsBodyProperties) => {
  return (
    <>
      <p>
        {project.description}
      </p>
      <p>
        <Link
          isExternal
          color="foreground"
          href={project.url}
          underline="always"
        >
          {project.url}
        </Link>
      </p>
    </>
  );
};
