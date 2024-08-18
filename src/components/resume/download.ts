import { useMutation } from "@tanstack/react-query";

function downloadBlob(blob: Blob) {
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
}

export function useDownloadResume() {
  const { mutate } = useMutation({
    async mutationFn() {
      const response = await fetch("/ethan-glover-resume");
      const blob = await response.blob();
      downloadBlob(blob);
    },
  });

  return { mutate };
}

