import { Input } from "@nextui-org/input";
import map from "lodash/map";
import { observer } from "mobx-react-lite";

import {
  projectFormStore,
  projectFormStoreInputOrder,
  projectFormStoreLabels,
} from "./project-store.ts";

export const ProjectFormInputs = observer(() => {
  return (
    <>
      {map(projectFormStoreInputOrder, (key) => {
        return (
          <Input
            onValueChange={(text) => {
              projectFormStore.setValue(key, text);
            }}
            key={key}
            label={projectFormStoreLabels[key]}
            value={projectFormStore.formState[key]}
          />
        );
      })}
    </>
  );
});
