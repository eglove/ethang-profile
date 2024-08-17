import { attemptAsync } from "@ethang/toolbelt/functional/attempt-async";
import { useMutation } from "@tanstack/react-query";
import isError from "lodash/isError";
import isNil from "lodash/isNil";
import { useCallback, useState } from "react";

import { queryClient } from "../../layouts/react-providers.tsx";
import { queryKeys } from "../../query/query-keys.ts";
import { jobCreateSerialize } from "./job-utils.ts";

export type JobUpsert = {
  company: string;
  endDate: string;
  shortDescription: string;
  startDate: string;
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

type UseJobFormProperties = {
  job?: JobUpsert;
  onSuccess: () => void;
};

export function useJobForm({ job, onSuccess }: UseJobFormProperties) {
  const [formState, setFormState] = useState<JobUpsert>(isNil(job)
    ? {
      company: "",
      endDate: "",
      shortDescription: "",
      startDate: "",
      title: "",
    }
    : job);

  const handleChange = useCallback((key: keyof typeof formState) => {
    return (value: string) => {
      setFormState((previousState) => {
        return {
          ...previousState,
          [key]: value,
        };
      });
    };
  }, []);

  const { isPending, mutate } = useMutation({
    mutationFn: async () => {
      const response = await attemptAsync(async () => {
        return fetch("/api/job", {
          body: jobCreateSerialize(formState),
          method: isNil(job)
            ? "POST"
            : "PUT",
        });
      });


      await queryClient.invalidateQueries({ queryKey: queryKeys.jobs });
      if (!isError(response)) {
        onSuccess();
      }
    },
  });

  return {
    formState,
    handleChange,
    isPending,
    mutate,
  };
}
