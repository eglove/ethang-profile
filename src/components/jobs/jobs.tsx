import { Button } from "@nextui-org/button";
import { Link, type SortDescriptor, Spinner } from "@nextui-org/react";
import { getKeyValue, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table";
import { useQuery } from "@tanstack/react-query";
import endsWith from "lodash/endsWith";
import isArray from "lodash/isArray";
import isNil from "lodash/isNil";
import isString from "lodash/isString";
import orderBy from "lodash/orderBy";
import { useState } from "react";

import { queryClient, ReactProviders } from "../../layouts/react-providers.tsx";
import { queryFunctions } from "../../query/query-functions.ts";
import { JobActions } from "./job-actions.tsx";
import { JobDetails } from "./job-details.tsx";
import { columns, jobStore } from "./jobs-store.ts";


export function Jobs() {
  return (
    <ReactProviders>
      <JobsWithProviders />
    </ReactProviders>
  );
}

// eslint-disable-next-line max-lines-per-function
function JobsWithProviders() {
  const { data } = useQuery(queryFunctions.jobs());
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "endDate",
    direction: "descending",
  });


  return (
    <div>
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
          setSortDescriptor({
            column: String(column),
            direction: direction ?? "ascending",
          });
        }}
        aria-label="Jobs"
        sortDescriptor={sortDescriptor}
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
          {/* eslint-disable-next-line max-lines-per-function */}
          {(item) => {
            if (item.isDetail) {
              return (
                <TableRow key={`${item.id}detail`}>
                  <TableCell
                    className="p-0"
                    colSpan={5}
                  >
                    <JobDetails
                      job={item}
                      label={`${item.title}, ${item.company}`}
                    />
                  </TableCell>
                  <TableCell className="hidden">
                    {null}
                  </TableCell>
                  <TableCell className="hidden">
                    {null}
                  </TableCell>
                  <TableCell className="hidden">
                    {null}
                  </TableCell>
                  <TableCell className="hidden">
                    {null}
                  </TableCell>
                </TableRow>
              );
            }

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
      <Button
        as={Link}
        className="m-4"
        color="primary"
        href="/job/create"
      >
        Create New
      </Button>
    </div>
  );
}
