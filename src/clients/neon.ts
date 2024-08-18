import { neon } from "@neondatabase/serverless";

import { getEnvironmentVariable } from "../util/environment.ts";

export const neonSql = neon(getEnvironmentVariable("DATABASE_URL"));

