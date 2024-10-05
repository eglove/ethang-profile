import { observer, useObservable } from "@legendapp/state/react";
import { Input } from "@nextui-org/input";
import map from "lodash/map";

import {
  projectFormStore,
  projectFormStoreInputOrder,
  projectFormStoreLabels,
} from "./project-store.ts";

export const ProjectFormInputs = observer(() => {
  const store = useObservable(projectFormStore);

  return (
    <>
      {map(projectFormStoreInputOrder, (key) => {
        return (
          <Input
            onValueChange={(text) => {
              store[key].set(text);
            }}
            key={key}
            label={projectFormStoreLabels[key]}
            value={store[key].get()}
          />
        );
      })}
    </>
  );
});
