
import type { SharedSelection } from "@nextui-org/react";

import isNil from "lodash/isNil";
import values from "lodash/values";
import { useCallback, useState } from "react";

import { methodologyMap, techMap } from "./skill-maps.ts";
import { useJobUpsert } from "./use-job-upsert.ts";

export type JobUpsertForm = {
  company: string;
  endDate: string;
  methodologiesUsed: Set<string>;
  shortDescription: string;
  startDate: string;
  techUsed: Set<string>;
  title: string;
};

export const jobCreateStringInputs = [
  {
    isRequired: true,
    key: "title",
    label: "Title",
    type: "text",
  },
  {
    isRequired: true,
    key: "company",
    label: "Company",
    type: "text",
  },
  {
    isRequired: true,
    key: "startDate",
    label: "Start Date",
    type: "date",
  },
  {
    isRequired: false,
    key: "endDate",
    label: "End Date",
    type: "date",
  },
] as const;

export const setInputs = [
  {
    key: "methodologiesUsed",
    label: "Methodologies Used",
    values: values(methodologyMap),
  },
  {
    key: "techUsed",
    label: "Tech Used",
    values: values(techMap),
  },
] as const;

type UseJobFormProperties = {
  job?: JobUpsertForm;
  onSuccess: () => void;
};

export function useJobForm({ job, onSuccess }: UseJobFormProperties) {
  const [formState, setFormState] = useState<JobUpsertForm>(isNil(job)
    ? {
      company: "",
      endDate: "",
      methodologiesUsed: new Set(),
      shortDescription: "",
      startDate: "",
      techUsed: new Set(),
      title: "",
    }
    : job);


  const handleChange = useCallback((key: keyof Omit<JobUpsertForm, "methodologiesUsed" | "techUsed">) => {
    return (value: string) => {
      setFormState((previousState) => {
        return {
          ...previousState,
          [key]: value,
        };
      });
    };
  }, []);

  const handleSetChange = useCallback((key: keyof Pick<JobUpsertForm, "methodologiesUsed" | "techUsed">) => {
    return (keys: SharedSelection) => {
      setFormState((previousState) => {
        return {
          ...previousState,
          [key]: [...keys],
        };
      });
    };
  }, []);

  const { isPending, mutate } = useJobUpsert({
    formState,
    job,
    onSuccess,
  });

  return {
    formState,
    handleChange,
    handleSetChange,
    isPending,
    mutate,
  };
}
