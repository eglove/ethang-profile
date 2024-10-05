import { attemptAsync } from "@ethang/toolbelt/functional/attempt-async";
import { useDisclosure } from "@nextui-org/modal";
import { useMutation } from "@tanstack/react-query";
import isError from "lodash/isError";

import type { Certification } from "../../query/query-functions.ts";

import { queryClient } from "../../layouts/react-providers.tsx";
import { queryKeys } from "../../query/query-keys.ts";

type UseCertificationDeleteProperties = {
  readonly certification: Certification;
};

export const useCertificationDelete = ({
  certification,
}: UseCertificationDeleteProperties) => {
  const { isOpen, onClose: closeModal, onOpen, onOpenChange } = useDisclosure();

  const { isPending, mutate } = useMutation({
    async mutationFn() {
      const response = await attemptAsync(fetch, "/api/certification", {
        body: JSON.stringify({ id: certification.id }),
        method: "DELETE",
      });

      if (isError(response)) {
        return;
      }

      await queryClient.invalidateQueries({
        queryKey: queryKeys.certifications,
      });

      if (response.ok) {
        closeModal();
      }
    },
  });

  return {
    isOpen,
    isPending,
    mutate,
    onOpen,
    onOpenChange,
  };
};
