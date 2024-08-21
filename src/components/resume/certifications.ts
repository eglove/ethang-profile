import { ExternalHyperlink, Paragraph, TextRun } from "docx";
import map from "lodash/map";

import type { GetCertificationsJson } from "../../pages/api/certification.ts";

import { neonSql } from "../../clients/neon.ts";

export const certificationHeader = new Paragraph({
  children: [
    new TextRun({
      bold: true,
      size: 20,
      text: "Certifications",
    }),
  ],
  heading: "Heading2",
  spacing: {
    after: 100,
  },
});


// eslint-disable-next-line max-lines-per-function
export async function getCertifications() {
  const certifications = await neonSql`
    select * from "Certification"
    order by "issuedOn" DESC
  ` as GetCertificationsJson;

  return map(certifications, (certification) => {
    return [new Paragraph({
      bullet: {
        level: 0,
      },
      children: [
        new TextRun({
          bold: true,
          text: certification.name,
        }),
      ],
    }),
    new Paragraph({
      bullet: {
        level: 1,
      },
      children: [
        new TextRun({
          text: `Issued By: ${certification.issuedBy}`,
        }),
      ],
    }),
    new Paragraph({
      bullet: { level: 1 },
      children: [
        new TextRun({
          text: certification.description,
        }),
      ],
    }),
    new Paragraph({
      bullet: { level: 1 },
      children: [
        new ExternalHyperlink({
          children: [
            new TextRun({
              text: certification.url,
            }),
          ],
          link: certification.url,
        }),
      ],
    })];
  }).flat();
}
