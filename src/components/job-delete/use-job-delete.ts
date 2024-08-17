import { useDisclosure } from "@nextui-org/modal";
import { useMutation } from "@tanstack/react-query";

import { queryClient } from "../../layouts/react-providers.tsx";
import { queryKeys } from "../../query/query-keys.ts";

export function useJobDelete(id: string) {
  const { isOpen, onClose: close, onOpen, onOpenChange } = useDisclosure();

  const { isPending, mutate } = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/job", {
        body: JSON.stringify({ id }),
        method: "DELETE",
      });

      await queryClient.invalidateQueries({ queryKey: queryKeys.jobs });

      if (response.ok) {
        close();
      }
    },
  });

  return {
    isOpen,
    isPending,
    mutate,
    onOpen,
    onOpenChange,
  };
}
