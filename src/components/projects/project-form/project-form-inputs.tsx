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
              projectStore.setState((state) => {
                state[key] = text;
              });
            }}
            ref={projectStore.bindRef([{
              options: { accessor: "value" },
              selector: (state) => {
                return state[key];
              },
            }])}
            key={key}
            label={projectFormStoreLabels[key]}
          />
        );
      })}
    </>
  );
};
