import type { GetJobsJson } from "../../pages/api/job.ts";

import { useIsMe } from "../../util/user.ts";
import { JobDelete } from "../job-delete/job-delete.tsx";
import { JobUpdate } from "../job-update/job-update.tsx";
import { JobDetails } from "./job-details.tsx";

type JobActionsProperties = {
  readonly job: GetJobsJson[0];
};

export const JobActions = ({ job }: JobActionsProperties) => {
  const isMe = useIsMe();

  return (
    <div className="flex gap-2">
      <JobDetails job={job} />
      {isMe &&
        <JobUpdate job={job} />}
      {isMe && (
        <JobDelete
          company={job.company}
          id={job.id}
          title={job.title}
        />
      )}
    </div>
  );
};
