import { FormStore } from "../../../util/form-store.ts";

export const projectFormStoreLabels = {
  description: "Description",
  name: "Name",
  url: "URL",
} as const;

export const projectFormStoreInputOrder = [
  "name", "url", "description",
] as const;

const initialState = {
  description: "",
  id: undefined as string | undefined,
  name: "",
  url: "",
};

export const projectFormStore = new FormStore({ initialState });
