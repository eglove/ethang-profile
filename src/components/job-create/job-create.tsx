import { preventDefault } from "@ethang/toolbelt/js/prevent-default";
import { Button } from "@nextui-org/button";

import { MainLayout, type MainLayoutProperties } from "../../layouts/main-layout.tsx";
import { JobInputs } from "../job-form/job-inputs.tsx";
import { useJobForm } from "../job-form/use-job-form.ts";

export function JobCreate({ currentPathname }: MainLayoutProperties) {
  return (
    <MainLayout
      currentPathname={currentPathname}
    >
      <JobCreateWithProviders />
    </MainLayout>
  );
}


function JobCreateWithProviders() {
  const {
    formState, handleChange, handleSetChange, isPending, mutate,
  } = useJobForm({
    onSuccess() {
      // eslint-disable-next-line lodash/prefer-lodash-method
      location.replace("/resume");
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
          handleSetChange={handleSetChange}
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
