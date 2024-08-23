import { PencilIcon } from "@heroicons/react/24/solid";
import { Button } from "@nextui-org/button";
import { Modal } from "@nextui-org/modal";

import type { GetCertificationsJson } from "../../pages/api/certification.ts";

import { UpsertCertificationModalContent } from "./upsert-certification-modal-content.tsx";
import { useCertificationUpdate } from "./use-certification-update.ts";

type CertificationUpdateProperties = {
  readonly certification: GetCertificationsJson[0];
};

export const CertificationUpdate = ({
  certification,
}: CertificationUpdateProperties) => {
  const {
    isOpen, isPending, mutate, onOpen, onOpenChange,
  } = useCertificationUpdate({ certification });

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
        scrollBehavior="inside"
      >
        <UpsertCertificationModalContent
          isPending={isPending}
          mutate={mutate}
        />
      </Modal>
    </>
  );
};
