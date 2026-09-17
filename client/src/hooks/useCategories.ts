import { useEffect, useState } from "react";
import * as categoriesApi from "../api/categories";
import type { Category, NewCategory } from "../types/category";

// Owns the categories list and keeps it in sync with the API. Components
// only see the resulting state and these action functions — they never
// call the api/ layer directly.
export function useCategories() {
	const [categories, setCategories] = useState<Category[]>([]);

	// Load the initial list once, on mount.
	useEffect(() => {
		categoriesApi.fetchCategories().then(setCategories);
	}, []);

	// Each action calls the API, then patches local state from the response
	// rather than refetching the whole list.
	async function addCategory(category: NewCategory) {
		const created = await categoriesApi.createCategory(category);
		setCategories((current) => [...current, created]);
	}

	async function editCategory(id: string, category: NewCategory) {
		const updated = await categoriesApi.updateCategory(id, category);
		setCategories((current) =>
			current.map((existing) => (existing.id === id ? updated : existing)),
		);
	}

	async function removeCategory(id: string) {
		await categoriesApi.deleteCategory(id);
		setCategories((current) =>
			current.filter((category) => category.id !== id),
		);
	}

	return { categories, addCategory, editCategory, removeCategory };
}
