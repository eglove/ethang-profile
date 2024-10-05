import { For, observer } from "@legendapp/state/react";
import { Input } from "@nextui-org/input";
import isNil from "lodash/isNil";
import startCase from "lodash/startCase";

import {
  certificationStore,
} from "./certification-form-store.ts";

export const UpsertCertificationInputs = observer(() => {
  return (
    <For each={certificationStore}>
      {(item, key) => {
        if ("id" === key) {
          return <span />;
        }

        return (
          <Input
            onValueChange={
              (_value) => {
                if (!isNil(key)) {
                  // @ts-expect-error ignore for now
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
                  certificationStore[key].set(_value);
                }
              }
            }
            type={"expires" === key || "issuedOn" === key
              ? "date"
              : "text"}
            key={key}
            label={startCase(key)}
            value={item.get() ?? ""}
          />
        );
      }}
    </For>
  );
});
