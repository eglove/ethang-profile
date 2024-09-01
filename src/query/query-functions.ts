import { attemptAsync } from "@ethang/toolbelt/functional/attempt-async";
import { queryOptions } from "@tanstack/react-query";
import isError from "lodash/isError";

import type { GetCertificationsJson } from "../pages/api/certification.ts";
import type { GetJobsJson } from "../pages/api/job.ts";
import type { GetProjectJson } from "../pages/api/project.ts";

import { queryKeys } from "./query-keys.ts";

export const queryFunctions = {
  certifications: () => {
    return queryOptions<GetCertificationsJson | undefined>({
      async queryFn() {
        const response = await attemptAsync(fetch, "/api/certification");

        if (isError(response)) {
          return;
        }

        return response.json();
      },
      queryKey: [...queryKeys.certifications, fetch],
    });
  },
  jobs: () => {
    return queryOptions<GetJobsJson | undefined>({
      async queryFn() {
        const response = await attemptAsync(fetch, "/api/job");

        if (isError(response)) {
          return;
        }

        return response.json();
      },
      queryKey: [...queryKeys.jobs, fetch],
    });
  },
  projects: () => {
    return queryOptions<GetProjectJson | undefined>({
      async queryFn() {
        const response = await attemptAsync(fetch, "/api/project");

        if (isError(response)) {
          return;
        }

        return response.json();
      },
      queryKey: [...queryKeys.projects, fetch],
    });
  },
};
