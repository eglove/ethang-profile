import { Button } from "@nextui-org/button";
import { Modal, useDisclosure } from "@nextui-org/modal";
import { useEffect } from "react";

import { resetCertificationStore } from "./certification-form-store.ts";
import { UpsertCertificationModalContent } from "./upsert-certification-modal-content.tsx";
import { useUpsertCertification } from "./use-upsert-certification.ts";

export function CreateCertification() {
  const { isOpen, onClose: closeModal, onOpen, onOpenChange } = useDisclosure();
  const { isPending, mutate } = useUpsertCertification({
    onSuccess: closeModal,
  });

  useEffect(() => {
    if (isOpen) {
      resetCertificationStore();
    }
  }, [isOpen]);


  return (
    <>
      <Button
        className="my-4"
        color="primary"
        onPress={onOpen}
      >
        Add Cert
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
