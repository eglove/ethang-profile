import { TrashIcon } from "@heroicons/react/24/solid";
import { Button } from "@nextui-org/button";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { useMutation } from "@tanstack/react-query";

import type { GetCertificationsJson } from "../../pages/api/certification.ts";

import { queryClient } from "../../layouts/react-providers.tsx";
import { queryKeys } from "../../query/query-keys.ts";

type CertificationDeleteProperties = {
  readonly certification: GetCertificationsJson[0];
};

export function CertificationDelete({
  certification,
}: CertificationDeleteProperties) {
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
      >
        <ModalContent>
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
}
