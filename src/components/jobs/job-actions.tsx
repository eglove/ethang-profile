import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { Button } from "@nextui-org/button";
import { useStore } from "@tanstack/react-store";
import includes from "lodash/includes";
import { useCallback, useMemo } from "react";

import type { GetJobsJson } from "../../pages/api/job.ts";

import { JobDelete } from "../job-delete/job-delete.tsx";
import { JobUpdate } from "../job-update/job-update.tsx";
import { jobStore, jobStoreAddOrRemove } from "./jobs-store.ts";

type JobActionsProperties = {
  readonly job: GetJobsJson[0];
};

export function JobActions({ job }: JobActionsProperties) {
  const expandedItems = useStore(jobStore, (state) => {
    return state.expandedItems;
  });

  const isOpen = useMemo(() => {
    return includes(expandedItems, job.id);
  }, [job.id, expandedItems]);


  const handleAddOrRemove = useCallback(() => {
    jobStoreAddOrRemove(job.id);
  }, [job.id]);

  return (
    <div className="flex gap-2">
      <Button
        isIconOnly
        onPress={handleAddOrRemove}
      >
        {isOpen
          ? <EyeIcon className="size-6" />
          : <EyeSlashIcon className="size-6" />}
      </Button>
      <JobUpdate job={job} />
      <JobDelete
        company={job.company}
        id={job.id}
        title={job.title}
      />
    </div>
  );
}
