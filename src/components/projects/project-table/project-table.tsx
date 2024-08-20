import { Link } from "@nextui-org/link";
import { Spinner } from "@nextui-org/spinner";
import { getKeyValue, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table";
import { useQuery } from "@tanstack/react-query";
import isArray from "lodash/isArray";

import { queryFunctions } from "../../../query/query-functions.ts";
import { ProjectActions } from "./project-actions.tsx";

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
      <TableBody
        items={isArray(data)
          ? data
          : []}
        emptyContent={<Spinner />}
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
                        href={getKeyValue(item, columnKey) as string}
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
