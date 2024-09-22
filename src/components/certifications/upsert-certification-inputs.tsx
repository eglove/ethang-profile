import { Input } from "@nextui-org/input";
import map from "lodash/map";
import startCase from "lodash/startCase";

import {
  certificationFormStore,
} from "./certification-form-store.ts";

export const UpsertCertificationInputs = () => {
  return (
    <>
      {map(certificationFormStore.get(), (_, key) => {
        if ("id" === key) {
          return null;
        }

        return (
          <Input
            onValueChange={
              (_value) => {
                certificationFormStore.set((state) => {
                  state[key as keyof typeof state] = _value;
                });
              }
            }
            ref={certificationFormStore.bind((state, element) => {
              element.value = String(state[key as keyof typeof state]);
            })}
            type={"expires" === key || "issuedOn" === key
              ? "date"
              : "text"}
            key={key}
            label={startCase(key)}
          />
        );
      })}
    </>
  );
};
