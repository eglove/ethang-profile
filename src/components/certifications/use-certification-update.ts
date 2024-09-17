import { attemptAsync } from "@ethang/toolbelt/functional/attempt-async";
import { useDisclosure } from "@nextui-org/modal";
import { useMutation } from "@tanstack/react-query";
import isError from "lodash/isError";
import { useEffect } from "react";

import type { GetCertificationsJson } from "../../pages/api/certification.ts";

import { queryClient } from "../../layouts/react-providers.tsx";
import { queryKeys } from "../../query/query-keys.ts";
import {
  certificationStore,
  serializeCertificationDataForForm,
  serializeCertificationsForPost,
} from "./certification-form-store.ts";

type UseCertificationUpdateProperties = {
  readonly certification: GetCertificationsJson[0];
};

export const useCertificationUpdate = ({
  certification,
}: UseCertificationUpdateProperties) => {
  const { isOpen, onClose: closeModal, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    if (isOpen) {
      serializeCertificationDataForForm(certification);
    }
  }, [isOpen, certification]);


  const { isPending, mutate } = useMutation({
    async mutationFn() {
      const response = await attemptAsync(fetch, "/api/certification", {
        body: JSON.stringify(
          serializeCertificationsForPost(certificationStore.formState),
        ),
        method: "PUT",
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
