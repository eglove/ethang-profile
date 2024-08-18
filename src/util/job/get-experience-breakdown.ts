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

import type { getJobs } from "../../pages/api/job.ts";

import { americaChicago } from "../../constants/constants.ts";

function getDiff(startDate: Date, endDate?: Date | null) {
  const start = DateTime.fromJSDate(startDate);
  const end = isNil(endDate)
    ? DateTime.now().setZone(americaChicago)
    : DateTime.fromJSDate(endDate);
  return end.diff(start, "years");
}

function incrementSkill(
  experiences: Record<string, number>, skills: string[], years: number,
) {
  forEach(skills, (skill) => {
    const current = get(experiences, [skill], 0);
    set(experiences, [skill], current + years);
  });
}

export function getExperienceBreakdown(
  jobs: Awaited<ReturnType<typeof getJobs>>,
) {
  const experiences: Record<string, number> = {};

  forEach(jobs, (job) => {
    if (job.isDetail) {
      return;
    }

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
}
