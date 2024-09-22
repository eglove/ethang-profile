import { Input } from "@nextui-org/input";
import map from "lodash/map";

import {
  projectFormStoreInputOrder,
  projectFormStoreLabels, projectStore,
} from "./project-store.ts";

export const ProjectFormInputs = () => {
  return (
    <>
      {map(projectFormStoreInputOrder, (key) => {
        return (
          <Input
            onValueChange={(text) => {
              projectStore.set((state) => {
                state[key] = text;
              });
            }}
            ref={projectStore.bind((state, element) => {
              element.value = state[key];
            })}
            key={key}
            label={projectFormStoreLabels[key]}
          />
        );
      })}
    </>
  );
};
