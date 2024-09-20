import { preventDefault } from "@ethang/toolbelt/js/prevent-default";
import { PencilIcon } from "@heroicons/react/24/solid";
import { Button } from "@nextui-org/button";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";

import type { GetProjectJson } from "../../../../pages/api/project.ts";

import { ProjectFormInputs } from "../project-form-inputs.tsx";
import { projectStore } from "../project-store.ts";
import { useUpdateProject } from "./use-update-project.ts";

type ProjectUpdateProperties = {
  readonly project: GetProjectJson[0];
};

export const ProjectUpdate = ({
  project,
}: ProjectUpdateProperties) => {
  const { isOpen, onClose: closeModal, onOpen, onOpenChange } = useDisclosure();
  const { isPending, mutate } = useUpdateProject({ onSuccess: closeModal });

  const handleOpen = () => {
    projectStore.setState((state) => {
      state.description = project.description;
      state.id = project.id;
      state.name = project.name;
      state.url = project.url;
    });
    onOpen();
  };


  return (
    <>
      <Button
        isIconOnly
        onPress={handleOpen}
      >
        <PencilIcon className="size-6" />
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
                  {project.name}
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
                      Update
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
};
