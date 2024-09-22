import { jsonHeaders } from "@ethang/toolbelt/constants/http";
import { attemptAsync } from "@ethang/toolbelt/functional/attempt-async";
import { useMutation } from "@tanstack/react-query";
import isError from "lodash/isError";

import { queryClient } from "../../../../layouts/react-providers.tsx";
import { queryKeys } from "../../../../query/query-keys.ts";
import { projectStore } from "../project-store.ts";

type UseUpdateProjectProperties = {
  onSuccess: () => void;
};

export const useUpdateProject = ({ onSuccess }: UseUpdateProjectProperties) => {
  const { isPending, mutate } = useMutation({
    async mutationFn() {
      const response = await attemptAsync(fetch, "/api/project", {
        body: JSON.stringify(projectStore.get()),
        headers: jsonHeaders,
        method: "PUT",
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
