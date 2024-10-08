import { observer, useObservable } from "@legendapp/state/react";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { Spinner } from "@nextui-org/spinner";
import { getKeyValue, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table";
import { useQuery } from "@tanstack/react-query";
import isArray from "lodash/isArray";
import isString from "lodash/isString";
import orderBy from "lodash/orderBy";

import { MainLayout, type MainLayoutProperties } from "../../layouts/main-layout.tsx";
import { queryClient } from "../../layouts/react-providers.tsx";
import { queryFunctions } from "../../query/query-functions.ts";
import { useIsMe } from "../../util/user.ts";
import { ResumeDownloadButtons } from "../resume/resume-download-buttons.tsx";
import { JobActions } from "./job-actions.tsx";
import { columns } from "./jobs-store.ts";

export const Jobs = ({ currentPathname }: MainLayoutProperties) => {
  return (
    <MainLayout
      currentPathname={currentPathname}
    >
      <JobsWithProviders />
    </MainLayout>
  );
};

const JobsWithProviders = observer(() => {
  const isMe = useIsMe();
  const { data } = useQuery(queryFunctions.jobs());
  const store = useObservable({
    column: "endDate",
    direction: "descending",
  });

  return (
    <div>
      <ResumeDownloadButtons />
      {/* @ts-expect-error unhelpful types */}
      <Table
        onSortChange={({ column, direction }) => {
          const sorted = orderBy(data, String(column), "ascending" === direction
            ? "asc"
            : "desc");
          queryClient.setQueryData(queryFunctions.jobs().queryKey, sorted);
          store.set({
            column: String(column),
            direction: direction ?? "ascending",
          });
        }}
        aria-label="Jobs"
        sortDescriptor={store.get() as Parameters<typeof Table>[0]["sortDescriptor"]}
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
