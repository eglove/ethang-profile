import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { Spinner } from "@nextui-org/spinner";
import { getKeyValue, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table";
import { useQuery } from "@tanstack/react-query";
import endsWith from "lodash/endsWith";
import isArray from "lodash/isArray";
import isNil from "lodash/isNil";
import isString from "lodash/isString";
import orderBy from "lodash/orderBy";
import { makeAutoObservable } from "mobx";
import { observer } from "mobx-react-lite";

import { MainLayout, type MainLayoutProperties } from "../../layouts/main-layout.tsx";
import { queryClient } from "../../layouts/react-providers.tsx";
import { queryFunctions } from "../../query/query-functions.ts";
import { useIsMe } from "../../util/user.ts";
import { ResumeDownloadButtons } from "../resume/resume-download-buttons.tsx";
import { JobActions } from "./job-actions.tsx";
import { columns, jobStore } from "./jobs-store.ts";


export const Jobs = ({ currentPathname }: MainLayoutProperties) => {
  return (
    <MainLayout
      currentPathname={currentPathname}
    >
      <JobsWithProviders />
    </MainLayout>
  );
};

class JobsStore {
  public constructor(public column: string, public direction: "ascending" | "descending") {
    makeAutoObservable(this);
    this.column = "endDate";
    this.direction = "descending";
  }

  update(column: string, direction: "ascending" | "descending") {
    this.column = column;
    this.direction = direction;
  }
}

const jobsStore = new JobsStore("endDate", "descending");

const JobsWithProviders = observer(() => {
  const isMe = useIsMe();
  const { data } = useQuery(queryFunctions.jobs());

  return (
    <div>
      <ResumeDownloadButtons />
      <Table
        onSelectionChange={(keys) => {
          const [first] = keys;

          if (isNil(keys) || endsWith(String(first), "detail")) {
            return;
          }

          jobStore.setState((state) => {
            return {
              ...state,
              expandedItems: [String(first)],
            };
          });
        }}
        onSortChange={({ column, direction }) => {
          const sorted = orderBy(data, String(column), "ascending" === direction
            ? "asc"
            : "desc");
          queryClient.setQueryData(queryFunctions.jobs().queryKey, sorted);
          jobsStore.update(String(column), direction ?? "ascending");
        }}
        sortDescriptor={{
          column: jobsStore.column,
          direction: jobsStore.direction,
        }}
        aria-label="Jobs"
      >
        <TableHeader columns={columns}>
          {(column) => {
            return (
              <TableColumn
                allowsSorting
                key={column.key}
              >
                {column.label}
              </TableColumn>
            );
          }}
        </TableHeader>
        <TableBody
          emptyContent={
            <Spinner />
          }
          items={isArray(data)
            ? data
            : []}
        >
          { }
          {(item) => {
            return (
              <TableRow key={item.id}>
                {(columnKey) => {
                  if ("startDate" === columnKey || "endDate" === columnKey) {
                    return (
                      <TableCell key={columnKey}>
                        {isString(getKeyValue(item, columnKey))
                          ? new Date(getKeyValue(item, columnKey) as string)
                            .toLocaleDateString(undefined, {
                              month: "long",
                              year: "numeric",
                            })
                          : "(Current)"}
                      </TableCell>
                    );
                  }

                  if ("actions" === columnKey) {
                    return (
                      <TableCell>
                        <JobActions
                          job={item}
                        />
                      </TableCell>
                    );
                  }

                  return (
                    <TableCell key={columnKey}>
                      {getKeyValue(item, columnKey)}
                    </TableCell>
                  );
                }}
              </TableRow>
            );
          }}
        </TableBody>
      </Table>
      {isMe && (
        <Button
          as={Link}
          className="m-4"
          color="primary"
          href="/job/create"
        >
          Create New
        </Button>
      )}
    </div>
  );
});
