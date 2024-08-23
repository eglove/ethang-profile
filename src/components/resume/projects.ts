import { ExternalHyperlink, Paragraph, TextRun } from "docx";
import map from "lodash/map";

import type { GetProjectJson } from "../../pages/api/project.ts";

import { neonSql } from "../../clients/neon.ts";

export const projectHeader = new Paragraph({
  children: [
    new TextRun({
      bold: true,
      size: 20,
      text: "Projects",
    }),
  ],
  heading: "Heading2",
});

export const getProjects = async () => {
  const projects = await neonSql`SELECT * FROM "Project" order by "name"` as GetProjectJson;

  return map(projects, (project) => {
    return [
      new Paragraph({
        bullet: {
          level: 0,
        },
        children: [
          new TextRun({
            bold: true,
            text: project.name,
          }),
        ],
      }),
      new Paragraph({
        bullet: {
          level: 1,
        },
        children: [
          new TextRun({
            text: project.description,
          }),
        ],
      }),
      new Paragraph({
        bullet: {
          level: 1,
        },
        children: [
          new ExternalHyperlink({
            children: [
              new TextRun({
                text: project.url,
              }),
            ],
            link: project.url,
          }),
        ],
      }),
    ];
  }).flat();
};
