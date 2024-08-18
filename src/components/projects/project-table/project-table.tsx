import { Link } from "@nextui-org/link";
import { getKeyValue, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table";
import { useQuery } from "@tanstack/react-query";
import isArray from "lodash/isArray";

import { queryFunctions } from "../../../query/query-functions.ts";
import { ProjectActions } from "./project-actions.tsx";
import {Spinner} from "@nextui-org/spinner";

const columns = [
  {
    key: "name",
    label: "Name",
  },
  {
    key: "url",
    label: "Url",
  },
  {
    key: "actions",
    label: "Details",
  },
];

// eslint-disable-next-line max-lines-per-function
export function ProjectTable() {
  const { data } = useQuery(queryFunctions.projects());


  return (
    <Table aria-label="Projects">
      <TableHeader columns={columns}>
        {(column) => {
          return (
            <TableColumn key={column.key}>
              {column.label}
            </TableColumn>
          );
        }}
      </TableHeader>
      <TableBody emptyContent={<Spinner />} items={isArray(data)
        ? data
        : []}
      >
        {(item) => {
          return (
            <TableRow key={item.id}>
              {(columnKey) => {
                if ("url" === columnKey) {
                  return (
                    <TableCell>
                      <Link
                        isExternal
                        showAnchorIcon
                        color="foreground"
                        href={getKeyValue(item, columnKey) as string}
                        underline="always"
                      >
                        Link
                      </Link>
                    </TableCell>
                  );
                }

                if ("actions" === columnKey) {
                  return (
                    <TableCell>
                      <ProjectActions project={item} />
                    </TableCell>
                  );
                }

                return (
                  <TableCell>
                    {getKeyValue(item, columnKey)}
                  </TableCell>
                );
              }}
            </TableRow>
          );
        }}
      </TableBody>
    </Table>
  );
}
