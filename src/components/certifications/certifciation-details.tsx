import { EyeIcon } from "@heroicons/react/24/solid";
import { Button } from "@nextui-org/button";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";

import type { GetCertificationsJson } from "../../pages/api/certification.ts";


type CertificationDetailsProperties = {
  readonly certification: GetCertificationsJson[0];
};

// eslint-disable-next-line stylistic/max-len
export function CertificationDetails({ certification }: CertificationDetailsProperties) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        isIconOnly
        onPress={onOpen}
      >
        <EyeIcon className="size-6" />
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => {
            return (
              <>
                <ModalHeader>
                  {certification.name}
                </ModalHeader>
                <ModalBody>
                  {certification.description}
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="primary"
                    onPress={onClose}
                  >
                    Close
                  </Button>
                </ModalFooter>
              </>
            );
          }}
        </ModalContent>
      </Modal>
    </>
  );
}