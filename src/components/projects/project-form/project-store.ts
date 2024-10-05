import { observable } from "@legendapp/state";

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

export const projectFormStore = observable(initialState);

export const resetProjectFormStore = () => {
  projectFormStore.set(initialState);
};
