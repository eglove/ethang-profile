import type { APIRoute } from "astro";
import type { Jsonify } from "type-fest";

import { jsonHeaders } from "@ethang/toolbelt/constants/http";

import prisma from "../../clients/prisma.ts";

export type GetJobsJson = Jsonify<Awaited<ReturnType<typeof getJobs>>>;

export async function getJobs() {
  return prisma.job.findMany({
    orderBy: {
      endDate: "desc",
    },
  });
}

export async function GET() {
  const jobs = await getJobs();

  return new Response(JSON.stringify(jobs), {
    headers: jsonHeaders,
  });
}

export async function POST({ request }: Parameters<APIRoute>[0]) {
  const data: Parameters<(typeof prisma)["job"]["create"]>[0]["data"] = await request.json();

  const job = await prisma.job.create({
    data,
  });

  return new Response(JSON.stringify(job), {
    headers: jsonHeaders,
  });
}

export async function PUT({ request }: Parameters<APIRoute>[0]) {
  const data: { id: string } & Parameters<(typeof prisma)["job"]["update"]>[0]["data"] = await request.json();

  const job = await prisma.job.update({
    data,
    where: {
      id: data.id,
    },
  });

  return new Response(JSON.stringify(job), {
    headers: jsonHeaders,
  });
}

export async function DELETE({ request }: Parameters<APIRoute>[0]) {
  const data: { id: string } = await request.json();

  const job = await prisma.job.delete({
    where: {
      id: data.id,
    },
  });

  return new Response(JSON.stringify(job), {
    headers: jsonHeaders,
  });
}
