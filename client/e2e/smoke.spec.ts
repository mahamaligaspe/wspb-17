import { expect, test } from "@playwright/test";

test("the app loads and shows its heading", async ({ page }) => {
	// Arrange + Act: open the running app in a real browser
	await page.goto("/");

	// Assert: the main heading is visible
	await expect(
		page.getByRole("heading", { name: "Expense tracker" }),
	).toBeVisible();
});
