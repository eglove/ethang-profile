import { EyeIcon } from "@heroicons/react/24/solid";
import { Button } from "@nextui-org/button";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";

import type { GetProjectJson } from "../../../pages/api/project.ts";

import { ProjectDetailsBody } from "./project-details-body.tsx";

type ProjectDetailsProperties = {
  readonly project: GetProjectJson[0];
};

export const ProjectDetails = ({
  project,
}: ProjectDetailsProperties) => {
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
                  {project.name}
                </ModalHeader>
                <ModalBody>
                  <ProjectDetailsBody project={project} />
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="danger"
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
