import { preventDefault } from "@ethang/toolbelt/js/prevent-default";
import { Button } from "@nextui-org/button";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";

import { ProjectFormInputs } from "../project-form-inputs.tsx";
import { resetProjectFormStore } from "../project-store.ts";
import { useCreateProject } from "./use-create-project.ts";

// eslint-disable-next-line max-lines-per-function
export function ProjectCreate() {
  const { isOpen, onClose: closeModal, onOpen, onOpenChange } = useDisclosure();
  const { isPending, mutate } = useCreateProject({
    onSuccess: closeModal,
  });

  const handleOpen = () => {
    resetProjectFormStore();
    onOpen();
  };


  return (
    <>
      <Button
        className="w-max"
        color="primary"
        onPress={handleOpen}
      >
        Add Project
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
                  Add Project
                </ModalHeader>
                <form onSubmit={preventDefault(mutate)}>
                  <ModalBody>
                    <ProjectFormInputs />
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="danger"
                      isLoading={isPending}
                      onPress={onClose}
                    >
                      Cancel
                    </Button>
                    <Button
                      color="primary"
                      isLoading={isPending}
                      type="submit"
                    >
                      Submit
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
