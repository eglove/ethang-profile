import { attemptAsync } from "@ethang/toolbelt/functional/attempt-async";
import { queryOptions } from "@tanstack/react-query";
import fromPairs from "lodash/fromPairs";
import isError from "lodash/isError";
import reverse from "lodash/reverse";
import sortBy from "lodash/sortBy";
import toPairs from "lodash/toPairs";

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
  experience: () => {
    return queryOptions({
      async queryFn() {
        const response = await attemptAsync(fetch, "https://staging-ethang-api-izt2.encr.app/jobs/experience");

        if (isError(response)) {
          return;
        }

        const data: {
          max: number;
          skills: Record<string, number>;
        } = await response.json();

        return {
          max: data.max,
          skills: fromPairs(reverse(sortBy(toPairs(data.skills), 1))),
        };
      },
      queryKey: [...queryKeys.experience, fetch],
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
