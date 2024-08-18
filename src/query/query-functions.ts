import { queryOptions } from "@tanstack/react-query";

import type { GetCertificationsJson } from "../pages/api/certification.ts";
import type { GetJobsJson } from "../pages/api/job.ts";
import type { GetProjectJson } from "../pages/api/project.ts";

import { queryKeys } from "./query-keys.ts";

export const queryFunctions = {
  certifications: () => {
    return queryOptions<GetCertificationsJson>({
      async queryFn() {
        const response = await fetch("/api/certification");
        return response.json();
      },
      queryKey: queryKeys.certifications,
    });
  },
  jobs: () => {
    return queryOptions<GetJobsJson>({
      async queryFn() {
        const response = await fetch("/api/job");
        return response.json();
      },
      queryKey: queryKeys.jobs,
    });
  },
  projects: () => {
    return queryOptions<GetProjectJson>({
      async queryFn() {
        const response = await fetch("/api/project");
        return response.json();
      },
      queryKey: queryKeys.projects,
    });
  },
};
