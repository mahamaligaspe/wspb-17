import { Router } from "express";
import {
	addExpense,
	deleteExpense,
	getExpenses,
	updateExpense,
} from "../store/expense.js";
import type { NewExpense } from "../types/expense.js";

// Validates and narrows an unknown request body into a NewExpense,
// or returns null if any required field is missing/wrong type.
function parseNewExpense(body: unknown): NewExpense | null {
	const { description, amount, date } = body as Partial<NewExpense>;

	if (
		typeof description !== "string" ||
		typeof amount !== "number" ||
		typeof date !== "string"
	) {
		return null;
	}

	return { description, amount, date };
}

// Mounted at /api/expenses in app.ts, so routes here are relative
// (e.g. "/" is GET /api/expenses, "/:id" is GET /api/expenses/:id).
export const expenseRouter = Router();

expenseRouter.get("/", (_req, res) => {
	res.json(getExpenses());
});

expenseRouter.post("/", (req, res) => {
	const newExpense = parseNewExpense(req.body);
	if (!newExpense) {
		res
			.status(400)
			.json({ error: "description, amount and date are required" });
		return;
	}

	const expense = addExpense(newExpense);
	res.status(201).json(expense);
});

expenseRouter.put("/:id", (req, res) => {
	const update = parseNewExpense(req.body);
	if (!update) {
		res
			.status(400)
			.json({ error: "description, amount and date are required" });
		return;
	}

	const expense = updateExpense(req.params.id, update);
	if (!expense) {
		res.status(404).json({ error: "Expense not found" });
		return;
	}
	res.json(expense);
});

expenseRouter.delete("/:id", (req, res) => {
	const deleted = deleteExpense(req.params.id);
	if (!deleted) {
		res.status(404).json({ error: "Expense not found" });
		return;
	}
	res.status(204).send();
});
