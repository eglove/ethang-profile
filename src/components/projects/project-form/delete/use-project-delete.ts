import { attemptAsync } from "@ethang/toolbelt/functional/attempt-async";
import { useMutation } from "@tanstack/react-query";
import isError from "lodash/isError";

import { queryClient } from "../../../../layouts/react-providers.tsx";
import { queryKeys } from "../../../../query/query-keys.ts";

type UseProjectDeleteProperties = {
  id: string;
  onSuccess: () => void;
};

export const useProjectDelete = ({
  id, onSuccess,
}: UseProjectDeleteProperties) => {
  const { isPending, mutate } = useMutation({
    async mutationFn() {
      const response = await attemptAsync(fetch, "/api/project", {
        body: JSON.stringify({ id }),
        method: "DELETE",
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
