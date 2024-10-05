import { Document, Packer } from "docx";

import { certificationHeader, getCertifications } from "../components/resume/certifications.ts";
import { getJobPositions } from "../components/resume/job-positions.ts";
import { getProjects, projectHeader } from "../components/resume/projects.ts";
import { experienceHeader, resumeBasicInfo, resumeHeader, resumeSummary } from "../components/resume/resume.ts";

export const GET = async () => {
  const jobDescriptions = await getJobPositions();
  const certifications = await getCertifications();
  const projects = await getProjects();

  const document = new Document({
    sections: [
      {
        children: [
          resumeHeader,
          ...resumeBasicInfo,
          resumeSummary(),
          experienceHeader,
          ...jobDescriptions,
          certificationHeader,
          ...certifications,
          projectHeader,
          ...projects,
        ],
        properties: {},
      },
    ],
  });

  const blog = await Packer.toBlob(document);
  return new Response(blog);
};
