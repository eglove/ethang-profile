import { PencilIcon } from "@heroicons/react/24/solid";
import { Button } from "@nextui-org/button";
import { Modal, ModalContent, useDisclosure } from "@nextui-org/modal";

import type { GetJobsJson } from "../../pages/api/job.ts";

import { jobUpdateSerialize } from "../job-form/job-utils.ts";
import { useJobForm } from "../job-form/use-job-form.ts";
import { JobUpdateModalForm } from "./job-update-modal-form.tsx";
import { JobUpdateModalHeader } from "./job-update-modal-header.tsx";

type JobUpdateProperties = {
  readonly job: GetJobsJson[0];
};

export const JobUpdate = ({ job }: JobUpdateProperties) => {
  const { isOpen, onClose: closeModal, onOpen, onOpenChange } = useDisclosure();
  const {
    formState, handleChange, handleSetChange, isPending, mutate,
  } = useJobForm({
    job: jobUpdateSerialize(job),
    onSuccess: closeModal,
  });

  return (
    <>
      <Button
        isIconOnly
        onPress={onOpen}
      >
        <PencilIcon className="size-6" />
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
                <JobUpdateModalHeader
                  company={job.company}
                  title={job.title}
                />
                <JobUpdateModalForm
                  formState={formState}
                  handleChange={handleChange}
                  handleSetChange={handleSetChange}
                  id={job.id}
                  isPending={isPending}
                  mutate={mutate}
                  onClose={onClose}
                />
              </>
            );
          }}
        </ModalContent>
      </Modal>
    </>
  );
};
