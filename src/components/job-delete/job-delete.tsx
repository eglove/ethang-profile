import { TrashIcon } from "@heroicons/react/24/solid";
import { Button } from "@nextui-org/button";

import { JobDeleteModal } from "./job-delete-modal.tsx";
import { useJobDelete } from "./use-job-delete.ts";

type JobDeleteProperties = {
  readonly company: string;
  readonly id: string;
  readonly title: string;
};

export const JobDelete = ({ company, id, title }: JobDeleteProperties) => {
  const { isOpen, isPending, mutate, onOpen, onOpenChange } = useJobDelete(id);

  return (
    <>
      <Button
        isIconOnly
        onPress={onOpen}
      >
        <TrashIcon className="size-6 text-red-500" />
      </Button>
      <JobDeleteModal
        company={company}
        isOpen={isOpen}
        isPending={isPending}
        mutate={mutate}
        onOpenChange={onOpenChange}
        title={title}
      />
    </>
  );
};
