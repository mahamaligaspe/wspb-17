import { defineConfig, devices } from "@playwright/test";

// The environment the E2E tests run against. Defaults to the local Compose
// stack, but can be pointed at any deployed environment by setting
// E2E_BASE_URL — the tests themselves never change.
const baseURL = process.env.E2E_BASE_URL ?? "http://localhost:8080";

export default defineConfig({
	// Where the E2E tests live.
	testDir: "./e2e",
	// Give each test a sensible timeout.
	timeout: 30_000,
	use: {
		// Tests navigate with relative paths (page.goto("/")), resolved
		// against this base URL.
		baseURL,
		// Capture a trace on failure so you can see what the browser did.
		trace: "on-first-retry",
	},
	projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});
