import { attemptAsync } from "@ethang/toolbelt/functional/attempt-async";
import { useMutation } from "@tanstack/react-query";
import isError from "lodash/isError";

const downloadBlob = (blob: Blob) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "EthanGloverResume.docx";
  a.style.display = "none";
  // @ts-expect-error allow element
  document.body.append(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
};

export const useDownloadResume = () => {
  const { mutate } = useMutation({
    async mutationFn() {
      const response = await attemptAsync(fetch, "/ethan-glover-resume");

      if (isError(response)) {
        return;
      }

      const blob = await response.blob();
      downloadBlob(blob);
    },
  });

  return { mutate };
};

