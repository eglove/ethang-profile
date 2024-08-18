import { ExternalHyperlink, Paragraph, TabStopPosition, TabStopType, TextRun } from "docx";
import { DateTime } from "luxon";

export const resumeHeader = new Paragraph({
  children: [
    new TextRun({
      bold: true,
      size: 48,
      text: "Ethan Glover",
    }),
  ],
  heading: "Heading1",
  spacing: {
    after: 200,
  },
});

export const experienceHeader = new Paragraph({
  children: [
    new TextRun({
      bold: true,
      size: 20,
      text: "Software Engineer - Contractor/Consultant",
    }),
    new TextRun({
      text: "\t",
    }),
    new TextRun({
      size: 20,
      text: "Nov 2018 - (Current)",
    }),
  ],
  heading: "Heading2",
  spacing: {
    after: 100,
  },
  tabStops: [
    {
      position: TabStopPosition.MAX,
      type: TabStopType.RIGHT,
    },
  ],
});

export const resumeBasicInfo = [new Paragraph({
  children: [
    new TextRun({
      size: 24,
      text: "St. Louis, MO 63017 | ",
    }),
    new ExternalHyperlink({
      children: [
        new TextRun({
          style: "Hyperlink",
          text: "(816) 542-0568",
        }),
      ],
      link: "tel:8165420568",
    }),
  ],
}),
new Paragraph({
  children: [
    new ExternalHyperlink({
      children: [
        new TextRun({
          style: "Hyperlink",
          text: "hello@ethang.email",
        }),
      ],
      link: "mailto:hello@ethang.email",
    }),
    new TextRun({
      size: 24,
      text: " | ",
    }),
    new ExternalHyperlink({
      children: [
        new TextRun({
          style: "Hyperlink",
          text: "https://ethang.dev",
        }),
      ],
      link: "https://ethang.dev",
    }),
  ],
  spacing: {
    after: 100,
  },
})];

export function resumeSummary() {
  const start = DateTime.fromObject({
    month: 11,
    year: 2018,
  }, { zone: "America/Chicago" });
  const now = DateTime.now();
  const totalExperience = now.diff(start, "years");

  return new Paragraph({
    text: `Software engineer with ${totalExperience.years.toFixed(2)} yrs experience across many different technologies. I have been writing code and working with the web for most of my life. I built my first website at around 9 years old, it was a green neon background with 10 pictures of monkeys written in HTML/CSS. I've continued to learn through my life by getting into the advantages/disadvantages of different perspectives like OOP, functional programming, hybrid paradigms, test-driven development and behavior-driven development. I am constantly working on side projects and love jumping in and learning new things.`,
  });
}
