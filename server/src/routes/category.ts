import { Router } from "express";
import {
	addCategory,
	deleteCategory,
	getCategories,
	updateCategory,
} from "../store/category.js";
import type { NewCategory } from "../types/category.js";

// Validates and narrows an unknown request body into a NewCategory,
// or returns null if the name is missing/wrong type.
function parseNewCategory(body: unknown): NewCategory | null {
	const { name } = body as Partial<NewCategory>;

	if (typeof name !== "string") {
		return null;
	}

	return { name };
}

// Mounted at /api/categories in app.ts, so routes here are relative.
export const categoryRouter = Router();

categoryRouter.get("/", async (_req, res) => {
	res.json(await getCategories());
});

categoryRouter.post("/", async (req, res) => {
	const newCategory = parseNewCategory(req.body);
	if (!newCategory) {
		res.status(400).json({ error: "name is required" });
		return;
	}

	const category = await addCategory(newCategory);
	res.status(201).json(category);
});

categoryRouter.put("/:id", async (req, res) => {
	const update = parseNewCategory(req.body);
	if (!update) {
		res.status(400).json({ error: "name is required" });
		return;
	}

	const category = await updateCategory(req.params.id, update);
	if (!category) {
		res.status(404).json({ error: "Category not found" });
		return;
	}
	res.json(category);
});

categoryRouter.delete("/:id", async (req, res) => {
	const deleted = await deleteCategory(req.params.id);
	if (!deleted) {
		res.status(404).json({ error: "Category not found" });
		return;
	}
	res.status(204).send();
});
