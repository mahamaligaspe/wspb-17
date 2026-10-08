import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		// Point every test at the TEST database, never the dev one.
		env: {
			PGHOST: "localhost",
			PGPORT: "5432",
			PGUSER: "app",
			PGPASSWORD: "app_pw",
			PGDATABASE: "app_test_db",
		},
		// Run test files one at a time. They share a database, and each file
		// manages its own connection pool — running them in parallel would let
		// one file's writes and teardown collide with another's.
		fileParallelism: false,
	},
});
