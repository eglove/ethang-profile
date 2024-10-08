import { TrashIcon } from "@heroicons/react/24/solid";
import { Button } from "@nextui-org/button";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";

import type { Certification } from "../../query/query-functions.ts";

import { useCertificationDelete } from "./use-certification-delete.ts";

type CertificationDeleteProperties = {
  readonly certification: Certification;
};

export const CertificationDelete = ({
  certification,
}: CertificationDeleteProperties) => {
  const {
    isOpen, isPending, mutate, onOpen, onOpenChange,
  } = useCertificationDelete({ certification });

  return (
    <>
      <Button
        isIconOnly
        onPress={onOpen}
      >
        <TrashIcon className="size-6 text-red-500" />
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
                  Delete
                  {" "}
                  {certification.name}
                </ModalHeader>
                <ModalBody>
                  Are you sure?
                </ModalBody>
                <ModalFooter>
                  <Button
                    onPress={() => {
                      mutate();
                    }}
                    color="danger"
                    isLoading={isPending}
                    type="submit"
                  >
                    Delete
                  </Button>
                  <Button
                    color="primary"
                    isLoading={isPending}
                    onPress={onClose}
                  >
                    Cancel
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
