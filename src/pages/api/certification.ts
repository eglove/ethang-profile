import type { PrismaClient } from "@prisma/client";
import type { APIRoute } from "astro";
import type { Jsonify } from "type-fest";

import { jsonHeaders } from "@ethang/toolbelt/constants/http";
import { DateTime } from "luxon";
import { v4 } from "uuid";

import { neonSql } from "../../clients/neon.ts";

export type GetCertificationsJson =
    Jsonify<Awaited<ReturnType<PrismaClient["certification"]["findMany"]>>>;


export async function GET() {
  const certifications = await neonSql`
    select * from "Certification"
    order by "issuedOn" DESC
  `;

  return new Response(JSON.stringify(certifications), {
    headers: jsonHeaders,
  });
}

export async function POST({ request }: Parameters<APIRoute>[0]) {
  const data: Parameters<PrismaClient["certification"]["create"]>[0]["data"] = await request.json();

  const cert = await neonSql`insert into "Certification" (
    "id",
    "updatedAt",
    "name",
    "issuedBy",
    "description",
    "url",
    "issuedOn",
    "expires"
  ) values (
    ${v4()},
    ${data.updatedAt},
    ${data.name},
    ${data.issuedBy},
    ${data.description},
    ${data.url},
    ${data.issuedOn},
    ${data.expires}
  )`;

  return new Response(JSON.stringify(cert), {
    headers: jsonHeaders,
  });
}

export async function PUT({ request }: Parameters<APIRoute>[0]) {
  const data: { id: string } & Parameters<PrismaClient["certification"]["update"]>[0]["data"] = await request.json();

  const cert = await neonSql`update "Certification" set
    "updatedAt" = ${DateTime.now().toISO()},
    "name" = ${data.name},
    "issuedBy" = ${data.issuedBy},
    "description" = ${data.description},
    "url" = ${data.url},
    "issuedOn" = ${data.issuedOn},
    "expires" = ${data.expires}
  where "id" = ${data.id}`;

  return new Response(JSON.stringify(cert), {
    headers: jsonHeaders,
  });
}

export async function DELETE({ request }: Parameters<APIRoute>[0]) {
  const data: { id: string } = await request.json();

  const cert = await neonSql`delete from "Certification" where "id" = "${data.id}"`;

  return new Response(JSON.stringify(cert), {
    headers: jsonHeaders,
  });
}
