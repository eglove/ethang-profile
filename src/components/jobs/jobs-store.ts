import { Store } from "@tanstack/react-store";
import filter from "lodash/filter";
import includes from "lodash/includes";

export const jobStore = new Store({
  expandedItems: [] as string[],
});

export const jobStoreAddOrRemove = (id: string) => {
  jobStore.setState((previous) => {
    if (includes(previous.expandedItems, id)) {
      return {
        ...previous,
        expandedItems: filter(previous.expandedItems, id),
      };
    }
    return {
      ...previous,
      expandedItems: [...previous.expandedItems, id],
    };
  });
};

export const columns = [
  {
    key: "title",
    label: "Title",
  },
  {
    key: "company",
    label: "Company",
  },
  {
    key: "startDate",
    label: "Start Date",
  },
  {
    key: "endDate",
    label: "End Date",
  },
  {
    key: "actions",
    label: "Details",
  },
];
