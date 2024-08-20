import { Link } from "@nextui-org/link";
import { Spinner } from "@nextui-org/spinner";
import { getKeyValue, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table";
import { useQuery } from "@tanstack/react-query";
import isArray from "lodash/isArray";
import isString from "lodash/isString";

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
    label: "Details",
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
                if ("issuedOn" === columnKey || "expires" === columnKey) {
                  const value = getKeyValue(item, columnKey) as string;

                  return (
                    <TableCell>
                      {isString(value)
                        ? new Date(value)
                          .toLocaleString(undefined, {
                            month: "long",
                            year: "numeric",
                          })
                        : null}
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
