import { preventDefault } from "@ethang/toolbelt/js/prevent-default";
import { Button } from "@nextui-org/button";
import { ModalBody, ModalFooter } from "@nextui-org/modal";

import type { useJobForm } from "../job-form/use-job-form.ts";

import { JobInputs } from "../job-form/job-inputs.tsx";

type JobUpdateModalFormProperties = {
  readonly formState: ReturnType<typeof useJobForm>["formState"];
  readonly handleChange: ReturnType<typeof useJobForm>["handleChange"];
  readonly id: string;
  readonly isPending: boolean;
  readonly mutate: () => void;
  readonly onClose: () => void;
};

export function JobUpdateModalForm({
  formState, handleChange, isPending, mutate, onClose,
}: JobUpdateModalFormProperties) {
  return (
    <form onSubmit={preventDefault(mutate)}>
      <ModalBody>
        <JobInputs
          formState={formState}
          handleChange={handleChange}
        />
      </ModalBody>
      <ModalFooter>
        <Button
          onPress={() => {
            mutate();
          }}
          color="primary"
          isLoading={isPending}
        >
          Submit
        </Button>
        <Button
          color="danger"
          isLoading={isPending}
          onPress={onClose}
        >
          Close
        </Button>
      </ModalFooter>
    </form>
  );
}
