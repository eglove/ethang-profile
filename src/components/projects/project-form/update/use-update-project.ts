import { jsonHeaders } from "@ethang/toolbelt/constants/http";
import { useMutation } from "@tanstack/react-query";
import { useStore } from "@tanstack/react-store";

import { queryClient } from "../../../../layouts/react-providers.tsx";
import { queryKeys } from "../../../../query/query-keys.ts";
import { projectFormStore } from "../project-store.ts";

type UseUpdateProjectProperties = {
  onSuccess: () => void;
};

export function useUpdateProject({ onSuccess }: UseUpdateProjectProperties) {
  const state = useStore(projectFormStore);

  const { isPending, mutate } = useMutation({
    async mutationFn() {
      const response = await fetch("/api/project", {
        body: JSON.stringify(state),
        headers: jsonHeaders,
        method: "PUT",
      });

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
}
