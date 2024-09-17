import { Button } from "@nextui-org/button";
import { Modal, useDisclosure } from "@nextui-org/modal";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

import { certificationStore } from "./certification-form-store.ts";
import { UpsertCertificationModalContent } from "./upsert-certification-modal-content.tsx";
import { useUpsertCertification } from "./use-upsert-certification.ts";

export const CertificationCreate = observer(() => {
  const { isOpen, onClose: closeModal, onOpen, onOpenChange } = useDisclosure();
  const { isPending, mutate } = useUpsertCertification({
    onSuccess: closeModal,
  });

  useEffect(() => {
    if (isOpen) {
      certificationStore.reset();
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
        scrollBehavior="inside"
      >
        <UpsertCertificationModalContent
          isPending={isPending}
          mutate={mutate}
        />
      </Modal>
    </>
  );
});
