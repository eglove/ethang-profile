import type { GetJobsJson } from "../../pages/api/job.ts";

import { useIsMe } from "../../util/user.ts";
import { JobDelete } from "../job-delete/job-delete.tsx";
import { JobUpdate } from "../job-update/job-update.tsx";
import { JobDetails } from "./job-details.tsx";

type JobActionsProperties = {
  readonly job: GetJobsJson[0];
};

export function JobActions({ job }: JobActionsProperties) {
  const isMe = useIsMe();

  return (
    <>
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
    </>
  );
}
