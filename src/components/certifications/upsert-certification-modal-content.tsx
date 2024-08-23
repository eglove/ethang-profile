import { preventDefault } from "@ethang/toolbelt/js/prevent-default";
import { Button } from "@nextui-org/button";
import { ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";

import { UpsertCertificationInputs } from "./upsert-certification-inputs.tsx";

type UpsertCertificationModalContentProperties = {
  readonly isPending: boolean;
  readonly mutate: () => void;
};

export const UpsertCertificationModalContent = ({
  isPending, mutate,
}: UpsertCertificationModalContentProperties) => {
  return (
    <ModalContent>
      {(onClose) => {
        return (
          <>
            <ModalHeader>
              Add Certification
            </ModalHeader>
            <form onSubmit={preventDefault(mutate)}>
              <ModalBody>
                <UpsertCertificationInputs />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  isLoading={isPending}
                  type="submit"
                >
                  Submit
                </Button>
                <Button
                  color="danger"
                  isLoading={isPending}
                  onPress={onClose}
                >
                  Cancel
                </Button>
              </ModalFooter>
            </form>
          </>
        );
      }}
    </ModalContent>
  );
};
