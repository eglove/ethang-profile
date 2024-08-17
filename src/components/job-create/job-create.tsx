import { preventDefault } from "@ethang/toolbelt/js/prevent-default";
import { Button } from "@nextui-org/button";

import { ReactProviders } from "../../layouts/react-providers.tsx";
import { JobInputs } from "../job-form/job-inputs.tsx";
import { useJobForm } from "../job-form/use-job-form.ts";

export function JobCreate() {
  return (
    <ReactProviders>
      <JobCreateWithProviders />
    </ReactProviders>
  );
}


function JobCreateWithProviders() {
  const { formState, handleChange, isPending, mutate } = useJobForm({
    onSuccess() {
      // eslint-disable-next-line lodash/prefer-lodash-method
      location.replace("/job");
    },
  });

  return (
    <div className="m-4">
      <h1 className="my-4 text-3xl">
        Create Job
      </h1>
      <form
        className="grid max-w-md gap-4"
        onSubmit={preventDefault(mutate)}
      >
        <JobInputs
          formState={formState}
          handleChange={handleChange}
        />
        <div className="flex justify-end">
          <Button
            className="w-max"
            color="primary"
            isLoading={isPending}
            type="submit"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
