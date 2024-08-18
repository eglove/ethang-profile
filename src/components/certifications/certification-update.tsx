import { PencilIcon } from "@heroicons/react/24/solid";
import { Button } from "@nextui-org/button";
import { Modal, useDisclosure } from "@nextui-org/modal";
import { useMutation } from "@tanstack/react-query";
import { useStore } from "@tanstack/react-store";
import { useEffect } from "react";

import type { GetCertificationsJson } from "../../pages/api/certification.ts";

import { queryClient } from "../../layouts/react-providers.tsx";
import { queryKeys } from "../../query/query-keys.ts";
import {
  certificationFormStore, serializeCertificationDataForForm,
  serializeCertificationsForPost,
} from "./certification-form-store.ts";
import { UpsertCertificationModalContent } from "./upsert-certification-modal-content.tsx";

type CertificationUpdateProperties = {
  readonly certification: GetCertificationsJson[0];
};

export function CertificationUpdate({
  certification,
}: CertificationUpdateProperties) {
  const { isOpen, onClose: closeModal, onOpen, onOpenChange } = useDisclosure();
  const store = useStore(certificationFormStore);

  useEffect(() => {
    if (isOpen) {
      serializeCertificationDataForForm(certification);
    }
  }, [isOpen, certification]);


  const { isPending, mutate } = useMutation({
    async mutationFn() {
      const response = await fetch("/api/certification", {
        body: JSON.stringify(serializeCertificationsForPost(store)),
        method: "PUT",
      });

      await queryClient.invalidateQueries({
        queryKey: queryKeys.certifications,
      });

      if (response.ok) {
        closeModal();
      }
    },
  });

  return (
    <>
      <Button
        isIconOnly
        className="my-4"
        onPress={onOpen}
      >
        <PencilIcon className="size-6" />
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <UpsertCertificationModalContent
          isPending={isPending}
          mutate={mutate}
        />
      </Modal>
    </>
  );
}
