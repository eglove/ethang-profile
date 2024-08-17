import { useQuery } from "@tanstack/react-query";
import { Store } from "@tanstack/react-store";

import type { getJobs } from "../pages/api/job.ts";

import { ReactProviders } from "../layouts/react-providers.tsx";

type JobsProperties = {
  readonly jobs: Awaited<ReturnType<typeof getJobs>>;
};

const jobStore = new Store({
  expandedItems: [] as string[],
});

const columns = [
  {
    key: "title",
    label: "Title",
  },
  {
    key: "company",
    label: "Company",
  },
  {
    key: "startDate",
    label: "Start Date",
  },
  {
    key: "endDate",
    label: "End Date",
  },
  {
    key: "actions",
    label: "Details",
  },
];


export function Jobs({ jobs }: JobsProperties) {
  return (
    <ReactProviders>
      <JobsWithProviders jobs={jobs} />
    </ReactProviders>
  );
}

function JobsWithProviders({ jobs }: JobsProperties) {
  const { data } = useQuery({
    initialData: jobs,
    async queryFn() {
      const response = await fetch("/api/job");
      return response.json();
    },
    queryKey: ["jobs"],
  });


  return (
    <div>
      <p className="h-96 bg-red-500 text-white">
        {JSON.stringify(data)}
      </p>
    </div>
  );
}
