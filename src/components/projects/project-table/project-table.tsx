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
    key: "actions",
    label: "Details",
  },
];

export const ProjectTable = () => {
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
                if ("name" === columnKey) {
                  return (
                    <TableCell>
                      <Link
                        isExternal
                        showAnchorIcon
                        color="foreground"
                        href={item.url}
                        underline="always"
                      >
                        {getKeyValue(item, columnKey)}
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
};
