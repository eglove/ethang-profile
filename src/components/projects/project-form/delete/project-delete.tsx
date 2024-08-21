import { preventDefault } from "@ethang/toolbelt/js/prevent-default";
import { TrashIcon } from "@heroicons/react/24/solid";
import { Button } from "@nextui-org/button";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";

import { useProjectDelete } from "./use-project-delete.ts";

type DeleteProjectProperties = {
  readonly id: string;
  readonly name: string;
};

// eslint-disable-next-line max-lines-per-function
export function ProjectDelete({
  id, name,
}: DeleteProjectProperties) {
  const { isOpen, onClose: closeModal, onOpen, onOpenChange } = useDisclosure();
  const { isPending, mutate } = useProjectDelete({
    id,
    onSuccess: closeModal,
  });

  return (
    <>
      <Button
        isIconOnly
        onPress={onOpen}
      >
        <TrashIcon className="size-6 text-danger" />
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => {
            return (
              <>
                <ModalHeader>
                  Delete
                  {" "}
                  {name}
                </ModalHeader>
                <form onSubmit={preventDefault(mutate)}>
                  <ModalBody>
                    Are you sure?
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="primary"
                      isLoading={isPending}
                      onPress={onClose}
                    >
                      Cancel
                    </Button>
                    <Button
                      color="danger"
                      isLoading={isPending}
                      type="submit"
                    >
                      Delete
                    </Button>
                  </ModalFooter>
                </form>
              </>
            );
          }}
        </ModalContent>
      </Modal>
    </>
  );
}
