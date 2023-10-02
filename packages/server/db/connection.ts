import { Pool } from "pg";

export const connectionConfig = {
  connectionString: process.env.DATABASE_URL,
};

export const pool = new Pool(connectionConfig);
