import { attemptAsync } from "@ethang/toolbelt/functional/attempt-async";
import { queryOptions } from "@tanstack/react-query";
import fromPairs from "lodash/fromPairs";
import isError from "lodash/isError";
import reverse from "lodash/reverse";
import sortBy from "lodash/sortBy";
import toPairs from "lodash/toPairs";

import { queryKeys } from "./query-keys.ts";

export type Certification = {
  createdAt: string;
  description: string;
  expires?: string;
  id: string;
  issuedBy: string;
  issuedOn: string;
  name: string;
  updatedAt: string;
  url: string;
};

type Job = {
  company: string;
  createdAt: string;
  descriptionBullets: string[];
  endDate: null | string;
  id: string;
  methodologiesUsed: string[];
  shortDescription: string;
  startDate: string;
  techUsed: string[];
  title: string;
  updatedAt: string;
};

type Project = {
  createdAt: string;
  description: string;
  id: string;
  name: string;
  updatedAt: string;
  url: string;
};

export const queryFunctions = {
  certifications: () => {
    return queryOptions({
      async queryFn() {
        const response = await attemptAsync(fetch, "https://staging-ethang-api-izt2.encr.app/certification");

        if (isError(response)) {
          return;
        }

        const data: {
          count: number;
          data: Certification[];
        } = await response.json();

        return data.data;
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
    return queryOptions({
      async queryFn() {
        const response = await attemptAsync(fetch, "https://staging-ethang-api-izt2.encr.app/jobs");

        if (isError(response)) {
          return;
        }

        const data: { data: Job[] } = await response.json();

        return data.data;
      },
      queryKey: [...queryKeys.jobs, fetch],
    });
  },
  projects: () => {
    return queryOptions({
      async queryFn() {
        const response = await attemptAsync(fetch, "https://staging-ethang-api-izt2.encr.app/project");

        if (isError(response)) {
          return;
        }

        const data: { data: Project[] } = await response.json();

        return data.data;
      },
      queryKey: [...queryKeys.projects, fetch],
    });
  },
};
