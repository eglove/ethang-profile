import { Button } from "@nextui-org/button";

import { useDownloadResume } from "./download.ts";

export const ResumeDownloadButtons = () => {
  const { mutate } = useDownloadResume();

  return (
    <div className="flex items-center gap-4 ">
      <div className="text-xl">
        Download Resume:
      </div>
      {" "}
      <Button
        onPress={() => {
          mutate();
        }}
        className="my-4 text-base"
        color="primary"
        size="sm"
      >
        .docx
      </Button>
    </div>
  );
};
