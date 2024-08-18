import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import isSet from "lodash/isSet";
import mapValues from "lodash/mapValues";
import omitBy from "lodash/omitBy";
import { DateTime } from "luxon";

import type { GetJobsJson } from "../../pages/api/job.ts";
import type { JobUpsertForm } from "./use-job-form.ts";

import { americaChicago, dateInputFormat } from "../../constants/constants.ts";


export function jobUpsertSerialize(job: JobUpsertForm) {
  const structured = mapValues(omitBy(job, isEmpty), (value) => {
    if (isSet(value)) {
      return [...value];
    }

    return value;
  });

  return JSON.stringify({
    ...structured,
    endDate: isEmpty(job.endDate)
      ? undefined
      : DateTime
        .fromFormat(job.endDate, dateInputFormat, { zone: americaChicago })
        .toISO(),
    startDate: DateTime
      .fromFormat(job.startDate, dateInputFormat, { zone: americaChicago })
      .toISO(),
  });
}

export function jobUpdateSerialize(job: GetJobsJson[0]) {
  return {
    company: job.company,
    endDate: isNil(job.endDate)
      ? ""
      : DateTime
        .fromJSDate(new Date(job.endDate))
        .toFormat(dateInputFormat),
    id: job.id,
    methodologiesUsed: new Set(job.methodologiesUsed),
    shortDescription: job.shortDescription,
    startDate: DateTime
      .fromJSDate(new Date(job.startDate))
      .toFormat(dateInputFormat),
    techUsed: new Set(job.techUsed),
    title: job.title,
  } satisfies { id: string } & JobUpsertForm;
}
