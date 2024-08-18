import { DateTime } from "luxon";
import { describe, expect, it } from "vitest";

import { getExperienceBreakdown } from "./get-experience-breakdown.ts";

describe("getExperienceBreakdown", () => {
  it("should work", () => {
    const { max, sorted } = getExperienceBreakdown([
    // @ts-expect-error allow for test
      {
        endDate: DateTime.fromJSDate(new Date(0)).plus({ years: 2 })
          .toJSDate(),
        methodologiesUsed: ["1", "2", "3"],
        startDate: new Date(0),
        techUsed: ["a", "b", "c"],
      },
      // @ts-expect-error allow for test
      {
        endDate: DateTime.fromJSDate(new Date(0)).plus({ years: 4 })
          .toJSDate(),
        methodologiesUsed: ["1"],
        startDate: new Date(0),
        techUsed: ["a", "b", "c", "d"],
      },
    ]);

    expect(max).toBe(6);
    expect(sorted).toStrictEqual({
      1: 6,
      2: 2,
      3: 2,
      a: 6,
      b: 6,
      c: 6,
      d: 4,
    });
  });
});
