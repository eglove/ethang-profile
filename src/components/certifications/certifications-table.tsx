import { getKeyValue, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table";
import { useQuery } from "@tanstack/react-query";
import isArray from "lodash/isArray";

import { queryFunctions } from "../../query/query-functions.ts";
import { CertificationActions } from "./certification-actions.tsx";

const columns = [
  {
    key: "name",
    label: "Name",
  },
  {
    key: "issuedBy",
    label: "Issued By",
  },
  {
    key: "description",
    label: "Description",
  },
  {
    key: "url",
    label: "URL",
  },
  {
    key: "issuedOn",
    label: "Issued On",
  },
  {
    key: "expires",
    label: "Expires",
  },
  {
    key: "actions",
    label: "Actions",
  },
];

// eslint-disable-next-line max-lines-per-function
export function CertificationsTable() {
  const { data } = useQuery(queryFunctions.certifications());

  return (
    <Table
      aria-label="Certifications"
      className="my-4"
    >
      <TableHeader columns={columns}>
        {(column) => {
          return (
            <TableColumn key={column.key}>
              {column.label}
            </TableColumn>
          );
        }}
      </TableHeader>
      <TableBody items={isArray(data)
        ? data
        : []}
      >
        {(item) => {
          return (
            <TableRow key={item.id}>
              {(columnKey) => {
                if ("issuedOn" === columnKey || "expires" === columnKey) {
                  return (
                    <TableCell>
                      {new Date(getKeyValue(item, columnKey) as string)
                        .toLocaleString(undefined, {
                          month: "long",
                          year: "numeric",
                        })}
                    </TableCell>
                  );
                }

                if ("actions" === columnKey) {
                  return (
                    <TableCell>
                      <CertificationActions certification={item} />
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
