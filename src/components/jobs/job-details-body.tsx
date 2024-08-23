import type { GetJobsJson } from "../../pages/api/job.ts";

type JobDetailsBodyProperties = {
  readonly job: GetJobsJson[0];
};

const listFormatter = new Intl.ListFormat(undefined, {
  type: "unit",
});

export const JobDetailsBody = ({ job }: JobDetailsBodyProperties) => {
  return (
    <div className="prose text-foreground">
      <p>
        {job.shortDescription}
      </p>
      <h3 className="my-0 text-foreground">
        Tech Used
      </h3>
      <p>
        {listFormatter.format(job.techUsed)}
      </p>
      <h3 className="my-0 text-foreground">
        Methodologies Used
      </h3>
      <p>
        {listFormatter.format(job.methodologiesUsed)}
      </p>
    </div>
  );
};
