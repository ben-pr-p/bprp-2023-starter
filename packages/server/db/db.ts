import { DB } from "./types.ts"; // this is the Database interface we defined earlier
import { Kysely, PostgresDialect } from "kysely";
import { pool } from "./connection.ts";

const dialect = new PostgresDialect({
  pool,
});

// Database interface is passed to Kysely's constructor, and from now on, Kysely
// knows your database structure.
// Dialect is passed to Kysely's constructor, and from now on, Kysely knows how
// to communicate with your database.
export const db = new Kysely<DB>({
  dialect,
});
