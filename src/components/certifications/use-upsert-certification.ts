import { attemptAsync } from "@ethang/toolbelt/functional/attempt-async";
import { useMutation } from "@tanstack/react-query";
import isError from "lodash/isError";

import { queryClient } from "../../layouts/react-providers.tsx";
import { queryKeys } from "../../query/query-keys.ts";
import {
  certificationFormStore,
  serializeCertificationsForPost,
} from "./certification-form-store.ts";

type UseUpsertCertification = {
  onSuccess?: () => void;
};

export const useUpsertCertification = ({
  onSuccess,
}: UseUpsertCertification) => {
  const { isPending, mutate } = useMutation({
    async mutationFn() {
      const response = await attemptAsync(fetch, "/api/certification", {
        body: JSON.stringify(
          serializeCertificationsForPost(certificationFormStore.get()),
        ),
        method: "POST",
      });

      if (isError(response)) {
        return;
      }

      await queryClient.invalidateQueries({
        queryKey: queryKeys.certifications,
      });

      if (response.ok) {
        onSuccess?.();
      }
    },
  });

  return {
    isPending,
    mutate,
  };
};
