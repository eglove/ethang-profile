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

export const CertificationsTable = () => {
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
                const value = getKeyValue(item, columnKey) as string;

                switch (columnKey) {
                  case "expires":
                  case "issuedOn": {
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

                  case "actions": {
                    return (
                      <TableCell>
                        <CertificationActions certification={item} />
                      </TableCell>
                    );
                  }

                  case "issuedBy": {
                    return (
                      <TableCell>
                        <Link
                          isExternal
                          showAnchorIcon
                          color="foreground"
                          href={item.url}
                          underline="always"
                        >
                          {value}
                        </Link>
                      </TableCell>
                    );
                  }

                  default: {
                    return (
                      <TableCell>
                        {value}
                      </TableCell>
                    );
                  }
                }
              }}
            </TableRow>
          );
        }}
      </TableBody>
    </Table>
  );
};
