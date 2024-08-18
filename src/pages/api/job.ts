import type { PrismaClient } from "@prisma/client";
import type { APIRoute } from "astro";
import type { Jsonify } from "type-fest";

import { jsonHeaders } from "@ethang/toolbelt/constants/http";
import { DateTime } from "luxon";
import { v4 } from "uuid";

import { neonSql } from "../../clients/neon.ts";

export type GetJobsJson = Jsonify<Awaited<ReturnType<PrismaClient["job"]["findMany"]>>>;

export async function GET() {
  const jobs = await neonSql`select * from "Job"
    order by "endDate" DESC`;

  return new Response(JSON.stringify(jobs), {
    headers: jsonHeaders,
  });
}

export async function POST({ request }: Parameters<APIRoute>[0]) {
  const data: Parameters<PrismaClient["job"]["create"]>[0]["data"] = await request.json();

  const job = await neonSql`insert into "Job" (
    "id", 
    "updatedAt", 
    "title", 
    "company", 
    "startDate", 
    "endDate", 
    "shortDescription",
    "techUsed",
    "methodologiesUsed"
  ) values (
    ${v4()},
    ${DateTime.now().toISO()},
    ${data.title},
    ${data.company},
    ${data.startDate},
    ${data.endDate},
    ${data.shortDescription},
    ${data.techUsed},
    ${data.methodologiesUsed}
  )`;

  return new Response(JSON.stringify(job), {
    headers: jsonHeaders,
  });
}

export async function PUT({ request }: Parameters<APIRoute>[0]) {
  const data: { id: string } & Parameters<PrismaClient["job"]["update"]>[0]["data"] = await request.json();

  const job = await neonSql`update "Job" set
    "updatedAt" = ${DateTime.now().toISO()},
    "title" = ${data.title},
    "company" = ${data.company},
    "startDate" = ${data.startDate},
    "endDate" = ${data.endDate},
    "shortDescription" = ${data.shortDescription},
    "techUsed" = ${data.techUsed},
    "methodologiesUsed" = ${data.methodologiesUsed}
  where "id" = ${data.id}`;

  return new Response(JSON.stringify(job), {
    headers: jsonHeaders,
  });
}

export async function DELETE({ request }: Parameters<APIRoute>[0]) {
  const data: { id: string } = await request.json();

  const job = await neonSql`delete from "Job" where "id" = ${data.id}`;

  return new Response(JSON.stringify(job), {
    headers: jsonHeaders,
  });
}
