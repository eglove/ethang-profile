import { adder } from "@ethang/toolbelt/number/adder";
import forEach from "lodash/forEach";
import fromPairs from "lodash/fromPairs";
import get from "lodash/get";
import isNil from "lodash/isNil";
import reverse from "lodash/reverse";
import set from "lodash/set";
import sortBy from "lodash/sortBy";
import toPairs from "lodash/toPairs";
import values from "lodash/values";
import { DateTime } from "luxon";

import type { GetJobsJson } from "../../pages/api/job.ts";

import { americaChicago } from "../../constants/constants.ts";

const getDiff = (startDate: string, endDate?: null | string) => {
  const start = DateTime.fromJSDate(new Date(startDate));
  const end = isNil(endDate)
    ? DateTime.now().setZone(americaChicago)
    : DateTime.fromJSDate(new Date(endDate));
  return end.diff(start, "years");
};

const incrementSkill = (
  experiences: Record<string, number>, skills: string[], years: number,
) => {
  forEach(skills, (skill) => {
    const current = get(experiences, [skill], 0);
    set(experiences, [skill], Number(adder([String(current), String(years)])));
  });
};

export const getExperienceBreakdown = (
  jobs: GetJobsJson,
) => {
  const experiences: Record<string, number> = {};

  forEach(jobs, (job) => {
    const diff = getDiff(job.startDate, job.endDate);

    incrementSkill(experiences, job.techUsed, diff.years);
    incrementSkill(experiences, job.methodologiesUsed, diff.years);
  });

  const sorted = fromPairs(reverse(sortBy(toPairs(experiences), [1])));
  const max = Math.max(...values(experiences));

  return {
    max,
    sorted,
  };
};
