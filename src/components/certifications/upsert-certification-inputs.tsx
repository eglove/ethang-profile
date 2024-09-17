import { Input } from "@nextui-org/input";
import map from "lodash/map";
import startCase from "lodash/startCase";
import { observer } from "mobx-react-lite";

import {
  certificationStore,
} from "./certification-form-store.ts";

export const UpsertCertificationInputs = observer(() => {
  return (
    <>
      {map(certificationStore.formState, (value, key) => {
        if ("id" === key) {
          return null;
        }

        return (
          <Input
            onValueChange={
              (_value) => {
                certificationStore.setValue(
                  key as keyof typeof certificationStore.formState, _value,
                );
              }
            }
            type={"expires" === key || "issuedOn" === key
              ? "date"
              : "text"}
            key={key}
            label={startCase(key)}
            value={value}
          />
        );
      })}
    </>
  );
});
