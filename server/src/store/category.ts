import { pool } from "../db/pool.js";
import type { Category, NewCategory } from "../types/category.js";

// The id and name columns match the Category type exactly, so rows can be
// returned as-is — no mapper needed, unlike expenses.
export async function getCategories(): Promise<Category[]> {
	const { rows } = await pool.query(
		"SELECT id, name FROM categories ORDER BY name",
	);
	return rows;
}

export async function addCategory(newCategory: NewCategory): Promise<Category> {
	const { rows } = await pool.query(
		"INSERT INTO categories (name) VALUES ($1) RETURNING id, name",
		[newCategory.name],
	);
	return rows[0];
}

// Returns the updated category, or null if no category has this id.
export async function updateCategory(
	id: string,
	update: NewCategory,
): Promise<Category | null> {
	const { rows } = await pool.query(
		"UPDATE categories SET name = $1 WHERE id = $2 RETURNING id, name",
		[update.name, id],
	);
	return rows[0] ?? null;
}

// Returns true if a category was removed, false if no category has this id.
export async function deleteCategory(id: string): Promise<boolean> {
	const { rowCount } = await pool.query(
		"DELETE FROM categories WHERE id = $1",
		[id],
	);
	return rowCount !== null && rowCount > 0;
}
