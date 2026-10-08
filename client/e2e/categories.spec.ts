import { expect, test } from "@playwright/test";

test("a user can add and delete a category", async ({ page }) => {
	const name = `Travel ${Date.now()}`;

	// Arrange: open the app, then switch to the categories view — the app
	// opens on expenses, so the category form isn't on the page yet.
	await page.goto("/");
	await page.getByRole("button", { name: "Categories" }).click();

	// --- ADD ---
	await page.getByPlaceholder("Category name").fill(name);
	await page.getByRole("button", { name: "Add" }).click();

	const row = page.getByRole("listitem").filter({ hasText: name });
	await expect(row).toBeVisible();

	// --- DELETE ---
	await row.getByRole("button", { name: "Delete" }).click();
	await expect(page.getByText(name)).toBeHidden();
});
