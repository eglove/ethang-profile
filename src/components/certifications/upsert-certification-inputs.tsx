import { Input } from "@nextui-org/input";
import { useStore } from "@tanstack/react-store";
import map from "lodash/map";
import startCase from "lodash/startCase";

import { certificationFormStore } from "./certification-form-store.ts";
import { handleSetCertificationStoreValue } from "./certification-form-store.ts";


export function UpsertCertificationInputs() {
  const formState = useStore(certificationFormStore);

  return (
    <>
      {map(formState, (value, key) => {
        if ("id" === key) {
          return null;
        }

        return (
          <Input
            onValueChange={
              handleSetCertificationStoreValue(
                key as keyof typeof certificationFormStore.state,
              )
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
}
