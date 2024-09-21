import { Input } from "@nextui-org/input";
import map from "lodash/map";
import startCase from "lodash/startCase";

import {
  certificationFormStore,
} from "./certification-form-store.ts";

type StoreKey = keyof typeof certificationFormStore.state;

export const UpsertCertificationInputs = () => {
  return (
    <>
      {map(certificationFormStore.state, (_, key) => {
        if ("id" === key) {
          return null;
        }

        return (
          <Input
            onValueChange={
              (_value) => {
                certificationFormStore.setState((state) => {
                  state[key as StoreKey] = _value;
                });
              }
            }
            ref={certificationFormStore.bindRef((state, element) => {
              element.value = String(state[key as StoreKey]);
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
