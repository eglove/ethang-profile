import { Button } from "@nextui-org/button";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";

type JobDeleteModalProperties = {
  readonly company: string;
  readonly isOpen: boolean;
  readonly isPending: boolean;
  readonly mutate: () => void;
  readonly onOpenChange: (isOpen: boolean) => void;
  readonly title: string;
};

export function JobDeleteModal({
  company, isOpen, isPending, mutate, onOpenChange, title,
}: JobDeleteModalProperties) {
  return (
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
                {`${title}, ${company}`}
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
                >
                  Delete
                </Button>
                <Button
                  color="primary"
                  isLoading={isPending}
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
  );
}
