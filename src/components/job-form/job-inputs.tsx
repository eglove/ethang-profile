import { Input, Textarea } from "@nextui-org/react";
import map from "lodash/map";

import type { useJobForm } from "./use-job-form.ts";

import { jobCreateStringInputs } from "./use-job-form.ts";

type JobInputsProperties = {
  readonly formState: ReturnType<typeof useJobForm>["formState"];
  readonly handleChange: ReturnType<typeof useJobForm>["handleChange"];
};

export function JobInputs({
  formState, handleChange,
}: JobInputsProperties) {
  return (
    <>
      {map(jobCreateStringInputs, (input) => {
        return (
          <Input
            isRequired={input.isRequired}
            key={input.key}
            label={input.label}
            name={input.key}
            onValueChange={handleChange(input.key)}
            type={input.type}
            value={formState[input.key]}
          />
        );
      })}
      <Textarea
        isRequired
        label="Short Desription"
        name="shortDescription"
        onValueChange={handleChange("shortDescription")}
        value={formState.shortDescription}
      />
    </>
  );
}
