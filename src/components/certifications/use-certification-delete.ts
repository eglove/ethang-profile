import { useDisclosure } from "@nextui-org/modal";
import { useMutation } from "@tanstack/react-query";

import type { GetCertificationsJson } from "../../pages/api/certification.ts";

import { queryClient } from "../../layouts/react-providers.tsx";
import { queryKeys } from "../../query/query-keys.ts";

type UseCertificationDeleteProperties = {
  readonly certification: GetCertificationsJson[0];
};

export function useCertificationDelete({
  certification,
}: UseCertificationDeleteProperties) {
  const { isOpen, onClose: closeModal, onOpen, onOpenChange } = useDisclosure();

  const { isPending, mutate } = useMutation({
    async mutationFn() {
      const response = await fetch("/api/certification", {
        body: JSON.stringify({ id: certification.id }),
        method: "DELETE",
      });
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
}
