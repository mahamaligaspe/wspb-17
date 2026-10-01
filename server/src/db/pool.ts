import { Pool } from "pg";

// One shared connection pool for the whole server. Connection details come
// from the environment, so the same image works in every environment.
export const pool = new Pool({
	host: process.env.PGHOST,
	port: Number(process.env.PGPORT),
	user: process.env.PGUSER,
	password: process.env.PGPASSWORD,
	database: process.env.PGDATABASE,
});
