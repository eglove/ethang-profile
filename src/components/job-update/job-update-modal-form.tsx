import { preventDefault } from "@ethang/toolbelt/js/prevent-default";
import { Button } from "@nextui-org/button";
import { ModalBody, ModalFooter } from "@nextui-org/modal";

import type { useJobForm } from "../job-form/use-job-form.ts";

import { JobInputs } from "../job-form/job-inputs.tsx";

type JobUpdateModalFormProperties = {
  readonly formState: ReturnType<typeof useJobForm>["formState"];
  readonly handleChange: ReturnType<typeof useJobForm>["handleChange"];
  readonly handleSetChange: ReturnType<typeof useJobForm>["handleSetChange"];
  readonly id: string;
  readonly isPending: boolean;
  readonly mutate: () => void;
  readonly onClose: () => void;
};

export function JobUpdateModalForm({
  formState, handleChange, handleSetChange, isPending, mutate, onClose,
}: JobUpdateModalFormProperties) {
  return (
    <form onSubmit={preventDefault(mutate)}>
      <ModalBody>
        <JobInputs
          formState={formState}
          handleChange={handleChange}
          handleSetChange={handleSetChange}
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
