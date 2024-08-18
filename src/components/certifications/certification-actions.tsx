import { TrashIcon } from "@heroicons/react/24/solid";
import { Button } from "@nextui-org/button";

import type { GetCertificationsJson } from "../../pages/api/certification.ts";

import { CertificationUpdate } from "./certification-update.tsx";

type CertificationActionsProperties = {
  readonly certification: GetCertificationsJson[0];
};


export function CertificationActions({
  certification,
}: CertificationActionsProperties) {
  return (
    <div className="flex items-center gap-2">
      <CertificationUpdate certification={certification} />
      <Button
        isIconOnly
      >
        <TrashIcon className="size-6 text-red-500" />
      </Button>
    </div>
  );
}
