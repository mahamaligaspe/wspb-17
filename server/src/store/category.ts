import { randomUUID } from "node:crypto";
import type { Category, NewCategory } from "../types/category.js";

// In-memory storage: resets whenever the server restarts. Seeded with a
// couple of sample categories so the app has something to show on first run.
const categories: Category[] = [
	{ id: randomUUID(), name: "Groceries" },
	{ id: randomUUID(), name: "Transport" },
];

export function getCategories(): Category[] {
	return categories;
}

export function addCategory(newCategory: NewCategory): Category {
	const category: Category = { id: randomUUID(), ...newCategory };
	categories.push(category);
	return category;
}

// Returns the updated category, or null if no category has this id.
export function updateCategory(
	id: string,
	update: NewCategory,
): Category | null {
	const category = categories.find((category) => category.id === id);
	if (!category) return null;
	Object.assign(category, update);
	return category;
}

// Returns true if a category was removed, false if no category has this id.
export function deleteCategory(id: string): boolean {
	const index = categories.findIndex((category) => category.id === id);
	if (index === -1) return false;
	categories.splice(index, 1);
	return true;
}
