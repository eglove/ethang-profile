import { attemptAsync } from "@ethang/toolbelt/functional/attempt-async";
import { useMutation } from "@tanstack/react-query";
import isError from "lodash/isError";
import isNil from "lodash/isNil";

import type { JobUpsertForm } from "./use-job-form.ts";

import { queryClient } from "../../layouts/react-providers.tsx";
import { queryKeys } from "../../query/query-keys.ts";
import { jobUpsertSerialize } from "./job-utils.ts";

type UseJobUpsertProperties = {
  formState: JobUpsertForm;
  job: JobUpsertForm | undefined;
  onSuccess: () => void;
};

export const useJobUpsert = ({
  formState, job, onSuccess,
}: UseJobUpsertProperties) => {
  const { isPending, mutate } = useMutation({
    mutationFn: async () => {
      const response = await attemptAsync(async () => {
        return fetch("/api/job", {
          body: jobUpsertSerialize(formState),
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
    isPending,
    mutate,
  };
};
