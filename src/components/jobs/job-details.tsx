import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { useStore } from "@tanstack/react-store";
import includes from "lodash/includes";
import { twMerge } from "tailwind-merge";

import type { GetJobsJson } from "../../pages/api/job.ts";

import { jobStore } from "./jobs-store.ts";

type JobDetailsProperties = {
  readonly job: GetJobsJson[0];
  readonly label: string;
};

const listFormatter = new Intl.ListFormat();

export function JobDetails({ job, label }: JobDetailsProperties) {
  const expandedItems = useStore(jobStore, (state) => {
    return state.expandedItems;
  });

  return (
    <Accordion
      itemClasses={{
        content: "p-0",
        heading: "hidden",
      }}
      className={twMerge(includes(expandedItems, job.id) && "px-3 py-0")}
      selectedKeys={new Set(expandedItems)}
    >
      <AccordionItem
        aria-label={label}
        className="prose max-w-full text-foreground"
        key={job.id}
      >
        <h2 className="my-2 text-foreground">
          Short Description
        </h2>
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
      </AccordionItem>
    </Accordion>
  );
}
