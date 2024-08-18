import { Store } from "@tanstack/react-store";

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
  name: "",
  url: "",
};

export const projectFormStore = new Store(initialState);

export function resetProjectFormStore() {
  projectFormStore.setState(() => {
    return initialState;
  });
}

export const handleProjectFormStoreValue = (
  key: keyof typeof projectFormStore.state,
) => {
  return (value: string) => {
    projectFormStore.setState((previous) => {
      return {
        ...previous,
        [key]: value,
      };
    });
  };
};
