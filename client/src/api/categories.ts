import type { Category, NewCategory } from "../types/category";
import { API_URL } from "./config";

// Thin wrapper around the backend REST API — one function per endpoint.
// Nothing else in the app should call `fetch` directly.
const ENDPOINT = `${API_URL}/api/categories`;

export async function fetchCategories(): Promise<Category[]> {
	const res = await fetch(ENDPOINT);
	return res.json();
}

export async function createCategory(category: NewCategory): Promise<Category> {
	const res = await fetch(ENDPOINT, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(category),
	});
	return res.json();
}

export async function updateCategory(
	id: string,
	category: NewCategory,
): Promise<Category> {
	const res = await fetch(`${ENDPOINT}/${id}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(category),
	});
	return res.json();
}

export async function deleteCategory(id: string): Promise<void> {
	await fetch(`${ENDPOINT}/${id}`, { method: "DELETE" });
}
