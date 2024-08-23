import { Input } from "@nextui-org/input";
import { useStore } from "@tanstack/react-store";
import map from "lodash/map";

import {
  handleProjectFormStoreValue,
  projectFormStore,
  projectFormStoreInputOrder,
  projectFormStoreLabels,
} from "./project-store.ts";

export const ProjectFormInputs = () => {
  const state = useStore(projectFormStore);

  return (
    <>
      {map(projectFormStoreInputOrder, (value) => {
        return (
          <Input
            key={value}
            label={projectFormStoreLabels[value]}
            onValueChange={handleProjectFormStoreValue(value)}
            value={state[value]}
          />
        );
      })}
    </>
  );
};
