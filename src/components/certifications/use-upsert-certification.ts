import { useMutation } from "@tanstack/react-query";
import { useStore } from "@tanstack/react-store";

import { queryClient } from "../../layouts/react-providers.tsx";
import { queryKeys } from "../../query/query-keys.ts";
import { certificationFormStore, serializeCertificationsForPost } from "./certification-form-store.ts";

type UseUpsertCertification = {
  onSuccess?: () => void;
};

export function useUpsertCertification({ onSuccess }: UseUpsertCertification) {
  const store = useStore(certificationFormStore);

  const { isPending, mutate } = useMutation({
    async mutationFn() {
      const response = await fetch("/api/certification", {
        body: JSON.stringify(serializeCertificationsForPost(store)),
        method: "POST",
      });

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
}
