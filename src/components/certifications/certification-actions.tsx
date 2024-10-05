import type { Certification } from "../../query/query-functions.ts";

import { useIsMe } from "../../util/user.ts";
import { CertificationDetails } from "./certifciation-details.tsx";
import { CertificationDelete } from "./certification-delete.tsx";
import { CertificationUpdate } from "./certification-update.tsx";

type CertificationActionsProperties = {
  readonly certification: Certification;
};

export const CertificationActions = ({
  certification,
}: CertificationActionsProperties) => {
  const isMe = useIsMe();

  return (
    <div className="flex items-center gap-2">
      <CertificationDetails certification={certification} />
      {isMe && <CertificationUpdate certification={certification} />}
      {isMe && <CertificationDelete certification={certification} />}
    </div>
  );
};
