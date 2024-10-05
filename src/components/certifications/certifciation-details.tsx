import { EyeIcon } from "@heroicons/react/24/solid";
import { Button } from "@nextui-org/button";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";

import type { Certification } from "../../query/query-functions.ts";

type CertificationDetailsProperties = {
  readonly certification: Certification;
};

export const CertificationDetails = ({
  certification,
}: CertificationDetailsProperties) => {
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
        scrollBehavior="inside"
      >
        <ModalContent className="overflow-auto">
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
};
