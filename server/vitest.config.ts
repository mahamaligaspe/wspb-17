import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		// Point every test at the TEST database, never the dev one.
		// Read connection details from the environment so CI can point the
		// tests at its own Postgres service, falling back to the local
		// values a developer uses when running the suite by hand.
		env: {
			PGHOST: process.env.PGHOST ?? "localhost",
			PGPORT: process.env.PGPORT ?? "5432",
			PGUSER: process.env.PGUSER ?? "app",
			PGPASSWORD: process.env.PGPASSWORD ?? "app_pw",
			PGDATABASE: process.env.PGDATABASE ?? "app_test_db",
		},
		// Run test files one at a time. They share a database, and each file
		// manages its own connection pool — running them in parallel would let
		// one file's writes and teardown collide with another's.
		fileParallelism: false,
	},
});
