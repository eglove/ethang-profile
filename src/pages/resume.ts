import { Document, Packer } from "docx";

import { getJobPositions } from "../components/resume/job-positions.ts";
import { experienceHeader, resumeBasicInfo, resumeHeader, resumeSummary } from "../components/resume/resume.ts";


export async function GET() {
  const jobDescriptions = await getJobPositions();

  const document = new Document({
    sections: [
      {
        children: [
          resumeHeader,
          ...resumeBasicInfo,
          resumeSummary(),
          experienceHeader,
          ...jobDescriptions,
        ],
        properties: {},
      },
    ],
  });

  const blog = await Packer.toBlob(document);
  return new Response(blog);
}
