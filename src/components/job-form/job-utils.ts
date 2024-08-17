import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { DateTime } from "luxon";

import type { GetJobsJson } from "../../pages/api/job.ts";
import type { JobUpsertForm } from "./use-job-form.ts";

export function jobCreateSerialize(job: JobUpsertForm) {
  return JSON.stringify({
    ...job,
    endDate: isEmpty(job.endDate)
      ? undefined
      : new Date(job.endDate).toISOString(),
    startDate: new Date(job.startDate).toISOString(),
  });
}

export function jobUpdateSerialize(job: GetJobsJson[0]) {
  return {
    company: job.company,
    endDate: isNil(job.endDate)
      ? ""
      : DateTime.fromJSDate(new Date(job.endDate)).toFormat("yyyy-MM-dd"),
    id: job.id,
    methodologiesUsed: new Set(job.methodologiesUsed),
    shortDescription: job.shortDescription,
    startDate: DateTime.fromJSDate(new Date(job.startDate)).toFormat("yyyy-MM-dd"),
    techUsed: new Set(job.techUsed),
    title: job.title,
  } satisfies { id: string } & JobUpsertForm;
}
