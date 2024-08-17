import { queryOptions } from "@tanstack/react-query";

import type { GetJobsJson } from "../pages/api/job.ts";

import { queryKeys } from "./query-keys.ts";

export const queryFunctions = {
  jobs: () => {
    return queryOptions<GetJobsJson>({
      async queryFn() {
        const response = await fetch("/api/job");
        return response.json();
      },
      queryKey: queryKeys.jobs,
    });
  },
};
