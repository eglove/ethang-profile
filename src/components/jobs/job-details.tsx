import { EyeIcon } from "@heroicons/react/24/solid";
import { Button } from "@nextui-org/button";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";

import type { GetJobsJson } from "../../pages/api/job.ts";

import { JobDetailsBody } from "./job-details-body.tsx";


type JobDetailsProperties = {
  readonly job: GetJobsJson[0];
};

export function JobDetails({ job }: JobDetailsProperties) {
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
        <ModalContent>
          {(onClose) => {
            return (
              <>
                <ModalHeader>
                  {job.title}
                </ModalHeader>
                <ModalBody>
                  <JobDetailsBody job={job} />
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
}
