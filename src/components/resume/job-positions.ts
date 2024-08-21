import { Paragraph, TextRun } from "docx";
import isNil from "lodash/isNil";
import map from "lodash/map";
import { DateTime } from "luxon";

import type { GetJobsJson } from "../../pages/api/job.ts";

import { neonSql } from "../../clients/neon.ts";

const listFormatter = new Intl.ListFormat(undefined, {
  type: "unit",
});

export async function getJobPositions() {
  const jobs = await neonSql`select * from "Job"
    order by "endDate" DESC` as GetJobsJson;


  return map(jobs, (job) => {
    const startDate = DateTime.fromJSDate(new Date(job.startDate)).toFormat("MM/yy");
    let endDate = "(Current)";
    if (!isNil(job.endDate)) {
      endDate = DateTime.fromJSDate(new Date(job.endDate)).toFormat("MM/yy");
    }

    return new Paragraph({
      bullet: {
        level: 0,
      },
      children: [
        new TextRun({
          bold: true,
          text: `${job.company}, ${startDate}-${endDate}:`,
        }),
        new TextRun({
          text: ` ${job.shortDescription}`,
        }),
        new TextRun({ text: "\n" }),
        new TextRun({
          bold: true,
          text: "Tech Used:",
        }),
        new TextRun(` ${listFormatter.format(job.techUsed)}`),
        new TextRun({ text: "\n" }),
        new TextRun({
          bold: true,
          text: "Methodologies Used:",
        }),
        new TextRun(` ${listFormatter.format(job.methodologiesUsed)}`),
      ],
    });
  });
}
