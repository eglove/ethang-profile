import type { APIRoute } from "astro";
import type { Jsonify } from "type-fest";

import { jsonHeaders } from "@ethang/toolbelt/constants/http";

import prisma from "../../clients/prisma.ts";

export type GetCertificationsJson =
    Jsonify<Awaited<ReturnType<typeof getCertifications>>>;

export async function getCertifications() {
  return prisma.certification.findMany({
    orderBy: {
      issuedOn: "desc",
    },
  });
}

export async function GET() {
  const certifications = await getCertifications();

  return new Response(JSON.stringify(certifications), {
    headers: jsonHeaders,
  });
}

export async function POST({ request }: Parameters<APIRoute>[0]) {
  const data: Parameters<(typeof prisma)["certification"]["create"]>[0]["data"] = await request.json();

  const cert = await prisma.certification.create({
    data,
  });

  return new Response(JSON.stringify(cert), {
    headers: jsonHeaders,
  });
}

export async function PUT({ request }: Parameters<APIRoute>[0]) {
  const data: { id: string } & Parameters<(typeof prisma)["certification"]["update"]>[0]["data"] = await request.json();


  const cert = await prisma.certification.update({
    data,
    where: { id: data.id },
  });

  return new Response(JSON.stringify(cert), {
    headers: jsonHeaders,
  });
}

export async function DELETE({ request }: Parameters<APIRoute>[0]) {
  const data: { id: string } = await request.json();

  const cert = await prisma.certification.delete({
    where: {
      id: data.id,
    },
  });

  return new Response(JSON.stringify(cert), {
    headers: jsonHeaders,
  });
}
