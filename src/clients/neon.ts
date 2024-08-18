import { neon } from "@neondatabase/serverless";

export const neonSql = neon(import.meta.env.DATABASE_URL as string);

