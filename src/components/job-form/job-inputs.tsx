import { Input, Textarea } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import map from "lodash/map";

import { setInputs, type useJobForm } from "./use-job-form.ts";
import { jobCreateStringInputs } from "./use-job-form.ts";

type JobInputsProperties = {
  readonly formState: ReturnType<typeof useJobForm>["formState"];
  readonly handleChange: ReturnType<typeof useJobForm>["handleChange"];
  readonly handleSetChange: ReturnType<typeof useJobForm>["handleSetChange"];
};

export const JobInputs = ({
  formState, handleChange, handleSetChange,
}: JobInputsProperties) => {
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
      {map(setInputs, (input) => {
        return (
          <Select
            key={input.key}
            label={input.label}
            name={input.key}
            onSelectionChange={handleSetChange(input.key)}
            selectedKeys={formState[input.key]}
            selectionMode="multiple"
          >
            {map(input.values, (item) => {
              return (
                <SelectItem key={item}>
                  {item}
                </SelectItem>
              );
            })}
          </Select>
        );
      })}
      <Textarea
        isRequired
        label="Description"
        name="shortDescription"
        onValueChange={handleChange("shortDescription")}
        value={formState.shortDescription}
      />
    </>
  );
};
