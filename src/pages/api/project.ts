import type { PrismaClient } from "@prisma/client";
import type { APIRoute } from "astro";
import type { Jsonify } from "type-fest";

import { jsonHeaders } from "@ethang/toolbelt/constants/http";
import { DateTime } from "luxon";
import { v4 } from "uuid";

import { neonSql } from "../../clients/neon.ts";

export type GetProjectJson = Jsonify<Awaited<ReturnType<PrismaClient["project"]["findMany"]>>>;

export async function GET() {
  const projects = await neonSql`SELECT * FROM "Project"`;

  return new Response(JSON.stringify(projects), {
    headers: jsonHeaders,
  });
}

export async function POST({ request }: Parameters<APIRoute>[0]) {
  const data: Parameters<PrismaClient["project"]["create"]>[0]["data"] = await request.json();

  const project = await neonSql`insert into "Project" (
    "id", "name", "url", "description", "updatedAt"
    ) values (
        ${v4()},
        ${data.name},
        ${data.url},
        ${data.description},
        ${DateTime.now().toISO()}
    )`;

  return new Response(JSON.stringify(project), {
    headers: jsonHeaders,
  });
}

export async function PUT({ request }: Parameters<APIRoute>[0]) {
  const data: { id: string } & Parameters<PrismaClient["project"]["update"]>[0]["data"] = await request.json();

  const project = await neonSql`update "Project" set
        "name" = ${data.name},
        "url" = ${data.url},
        "description" = ${data.description},
        "updatedAt" = ${DateTime.now().toISO()}
    where "id" = ${data.id}
  `;

  return new Response(JSON.stringify(project), {
    headers: jsonHeaders,
  });
}

export async function DELETE({ request }: Parameters<APIRoute>[0]) {
  const data: { id: string } = await request.json();

  const project = await neonSql`delete from "Project"
    where "id" = ${data.id}`;

  return new Response(JSON.stringify(project), {
    headers: jsonHeaders,
  });
}
