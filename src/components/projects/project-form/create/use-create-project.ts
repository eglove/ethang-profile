import { attemptAsync } from "@ethang/toolbelt/functional/attempt-async";
import { useMutation } from "@tanstack/react-query";
import isError from "lodash/isError";

import { queryClient } from "../../../../layouts/react-providers.tsx";
import { queryKeys } from "../../../../query/query-keys.ts";
import { projectFormStore } from "../project-store.ts";

type UseCreateProjectProperties = {
  onSuccess: () => void;
};

export const useCreateProject = ({ onSuccess }: UseCreateProjectProperties) => {
  const { isPending, mutate } = useMutation({
    async mutationFn() {
      const state = projectFormStore.get();

      const body = {
        description: state.description,
        name: state.name,
        url: state.url,
      };

      const response = await attemptAsync(fetch, "/api/project", {
        body: JSON.stringify(body),
        method: "POST",
      });

      if (isError(response)) {
        return;
      }

      await queryClient.invalidateQueries({ queryKey: queryKeys.projects });

      if (response.ok) {
        onSuccess();
      }
    },
  });

  return {
    isPending,
    mutate,
  };
};
